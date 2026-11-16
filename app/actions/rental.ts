"use server";

import { Resend } from "resend";
import { rentalFormSchema, RentalResponse } from "@/lib/rentalSchema";
import { createAdminClient } from "@/lib/supabase/admin";

export async function submitRentalInquiry(formData: unknown): Promise<RentalResponse> {
  const result = rentalFormSchema.safeParse(formData);

  if (!result.success) {
    const errorMsg = result.error.issues.map((e) => `${e.path.join(".")}: ${e.message}`).join(", ");
    return {
      success: false,
      error: errorMsg || "Invalid form data",
    };
  }

  const data = result.data;
  const referenceId = `FCD-RENT-${Math.floor(100000 + Math.random() * 900000)}`;

  // Construct WhatsApp dispatch message
  const waMessage = [
    `*First Class Drive – Mietwagenanfrage #${referenceId}*`,
    `----------------------------------------`,
    `👤 *Name:* ${data.name}`,
    `✉️ *E-Mail:* ${data.email}`,
    `📞 *Telefon:* ${data.phone}`,
    `📍 *Abholort / Zustelladresse:* ${data.pickup}`,
    `📅 *Mietbeginn:* ${data.startDate}`,
    `⏱️ *Mietende:* ${data.endDate}`,
    data.notes ? `📝 *Gewünschtes Fahrzeug / Notizen:* ${data.notes}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const whatsappPhone = "436542122456"; // Austrian dispatch phone
  const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(waMessage)}`;

  // Persist to Supabase Database
  try {
    const supabase = createAdminClient();
    const { error: dbError } = await supabase.from("rentals").insert({
      reference_id: referenceId,
      name: data.name,
      email: data.email,
      phone: data.phone,
      pickup: data.pickup,
      start_date: data.startDate,
      end_date: data.endDate,
      notes: data.notes || null,
      locale: data.locale,
      status: "pending",
    });
    if (dbError) {
      console.error("Supabase rental insert error:", dbError);
    }
  } catch (dbErr) {
    console.error("Supabase rental connection error:", dbErr);
  }

  // Resend Email Dispatch
  const resendApiKey = process.env.RESEND_API_KEY;

  if (resendApiKey) {
    try {
      const resend = new Resend(resendApiKey);

      const htmlContent = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background-color: #080A0C; color: #E4E7EC; border: 1px solid #2E343E; border-radius: 12px; overflow: hidden; padding: 24px;">
          <div style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #2E343E;">
            <h1 style="color: #FFFFFF; font-size: 20px; letter-spacing: 2px; margin: 0 0 6px 0;">FIRST CLASS DRIVE</h1>
            <p style="color: #DFBA73; font-size: 13px; font-weight: 600; margin: 0 0 4px 0;">MIETWAGEN & EXKLUSIVE FAHRZEUGVERMIETUNG</p>
            <p style="color: #9CA3AF; font-size: 12px; margin: 0;">Zell am See, Österreich • Mietwagenanfrage #${referenceId}</p>
          </div>
          
          <div style="padding: 24px 0;">
            <h2 style="color: #FFFFFF; font-size: 16px; margin-top: 0;">Mietdaten</h2>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 8px 0; color: #9CA3AF; width: 160px;">Abholort / Zustellung:</td>
                <td style="padding: 8px 0; color: #FFFFFF; font-weight: 600;">${data.pickup}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #9CA3AF;">Mietbeginn:</td>
                <td style="padding: 8px 0; color: #FFFFFF;">${data.startDate}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #9CA3AF;">Mietende:</td>
                <td style="padding: 8px 0; color: #FFFFFF;">${data.endDate}</td>
              </tr>
              ${data.notes ? `
              <tr>
                <td style="padding: 8px 0; color: #9CA3AF; vertical-align: top;">Fahrzeug / Notizen:</td>
                <td style="padding: 8px 0; color: #FFFFFF;">${data.notes}</td>
              </tr>
              ` : ""}
            </table>

            <h2 style="color: #FFFFFF; font-size: 16px; margin-top: 24px;">Kontaktdaten</h2>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 8px 0; color: #9CA3AF; width: 160px;">Name:</td>
                <td style="padding: 8px 0; color: #FFFFFF; font-weight: 600;">${data.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #9CA3AF;">E-Mail:</td>
                <td style="padding: 8px 0; color: #FFFFFF;">${data.email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #9CA3AF;">Telefonnummer:</td>
                <td style="padding: 8px 0; color: #FFFFFF;">${data.phone}</td>
              </tr>
            </table>
          </div>

          <div style="text-align: center; padding-top: 20px; border-top: 1px solid #2E343E; color: #6B7280; font-size: 12px;">
            <p style="margin: 0;">First Class Drive • Zell am See, Österreich</p>
          </div>
        </div>
      `;

      await resend.emails.send({
        from: "First Class Drive <onboarding@resend.dev>",
        to: "info@firstclassdrive.at",
        subject: `Neue Mietwagenanfrage #${referenceId} - ${data.name}`,
        html: htmlContent,
      });
    } catch (err) {
      console.error("Resend rental email error (non-fatal):", err);
    }
  }

  return {
    success: true,
    referenceId,
    whatsappUrl,
    message: "Ihre Mietwagenanfrage wurde erfolgreich übermittelt.",
  };
}
