"use server";

import { Resend } from "resend";
import { createAdminClient } from "@/lib/supabase/admin";
import { escapeHtml } from "@/lib/sanitize";

export interface ContactFormState {
  success: boolean;
  message?: string;
  error?: string;
}

export async function submitContactMessage(formData: FormData): Promise<ContactFormState> {
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const message = formData.get("message")?.toString().trim();
  const locale = formData.get("locale")?.toString() || "de";

  if (!name || name.length < 2) {
    return {
      success: false,
      error: locale === "de" ? "Bitte geben Sie Ihren Namen ein." : locale === "ar" ? "يرجى إدخال اسمك." : "Please enter your name.",
    };
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {
      success: false,
      error: locale === "de" ? "Bitte geben Sie eine gültige E-Mail-Adresse ein." : locale === "ar" ? "يرجى إدخال بريد إلكتروني صحيح." : "Please enter a valid email address.",
    };
  }

  if (!message || message.length < 5) {
    return {
      success: false,
      error: locale === "de" ? "Bitte verfassen Sie eine kurze Nachricht." : locale === "ar" ? "يرجى كتابة رسالتك." : "Please write a brief message.",
    };
  }

  // Persist to Supabase Database
  try {
    const supabase = createAdminClient();
    const { error: dbError } = await supabase.from("contact_messages").insert({
      name,
      email,
      message,
      locale,
      status: "unread",
    });
    if (dbError) {
      console.error("Supabase contact insert error:", dbError);
    }
  } catch (dbErr) {
    console.error("Supabase contact connection error:", dbErr);
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    try {
      const resend = new Resend(resendApiKey);
      const safeName = escapeHtml(name);
      const safeEmail = escapeHtml(email);
      const safeLocale = escapeHtml(locale);
      const safeMessage = escapeHtml(message);

      await resend.emails.send({
        from: "First Class Drive <onboarding@resend.dev>",
        to: "info@firstclassdrive.at",
        replyTo: email,
        subject: `Neue Kontaktanfrage von ${safeName}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #080A0C; color: #E4E7EC; padding: 24px; border-radius: 12px; border: 1px solid #2E343E;">
            <h2 style="color: #DFBA73; margin-top: 0;">Neue Kontaktanfrage</h2>
            <p><strong>Name:</strong> ${safeName}</p>
            <p><strong>E-Mail:</strong> ${safeEmail}</p>
            <p><strong>Sprache:</strong> ${safeLocale}</p>
            <hr style="border: 0; border-top: 1px solid #2E343E; margin: 20px 0;" />
            <p><strong>Nachricht:</strong></p>
            <div style="background: #101318; padding: 16px; border-radius: 8px; border: 1px solid #2E343E; white-space: pre-wrap;">${safeMessage}</div>
          </div>
        `,
      });
    } catch (err) {
      console.error("Resend contact email error:", err);
    }
  }

  return {
    success: true,
    message: locale === "de" 
      ? "Vielen Dank! Ihre Nachricht wurde erfolgreich übermittelt. Wir melden uns in Kürze bei Ihnen."
      : locale === "ar"
      ? "شكراً لتواصلك معنا! تم إرسال رسالتك بنجاح وسنقوم بالرد عليك في أقرب وقت."
      : "Thank you! Your message has been sent successfully. We will get back to you shortly.",
  };
}

