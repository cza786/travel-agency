"use server";

import { Resend } from "resend";
import { bookingFormSchema, BookingResponse } from "@/lib/bookingSchema";
import { createAdminClient } from "@/lib/supabase/admin";

export async function submitBookingInquiry(formData: unknown): Promise<BookingResponse> {
  const result = bookingFormSchema.safeParse(formData);

  if (!result.success) {
    const errorMsg = result.error.issues.map((e) => `${e.path.join(".")}: ${e.message}`).join(", ");
    return {
      success: false,
      error: errorMsg || "Invalid form data",
    };
  }

  const data = result.data;
  const referenceId = `FCD-${Math.floor(100000 + Math.random() * 900000)}`;

  // Construct WhatsApp dispatch message
  const waMessage = [
    `*First Class Drive – Buchungsanfrage #${referenceId}*`,
    `----------------------------------------`,
    `👤 *Kunde:* ${data.fullName}`,
    `📞 *Tel:* ${data.phone}`,
    `✉️ *E-Mail:* ${data.email}`,
    `📍 *Von:* ${data.pickup}`,
    `🏁 *Nach:* ${data.dropoff}`,
    `📅 *Datum & Zeit:* ${data.date} um ${data.time}`,
    data.flightNumber ? `✈️ *Flugnummer:* ${data.flightNumber}` : null,
    `👥 *Passagiere:* ${data.passengers} | 🧳 *Gepäck:* ${data.luggage}`,
    `🚘 *Fahrzeug:* ${data.vehicle}`,
    data.notes ? `📝 *Notizen:* ${data.notes}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const whatsappPhone = "436641234567"; // Austrian dispatch number
  const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(waMessage)}`;

  // Persist to Supabase Database
  try {
    const supabase = createAdminClient();
    const { error: dbError } = await supabase.from("bookings").insert({
      reference_id: referenceId,
      full_name: data.fullName,
      email: data.email,
      phone: data.phone,
      pickup: data.pickup,
      dropoff: data.dropoff,
      date: data.date,
      time: data.time,
      flight_number: data.flightNumber || null,
      passengers: data.passengers,
      luggage: data.luggage,
      vehicle: data.vehicle,
      notes: data.notes || null,
      locale: data.locale,
      status: "pending",
    });
    if (dbError) {
      console.error("Supabase booking insert error:", dbError);
    }
  } catch (dbErr) {
    console.error("Supabase connection error:", dbErr);
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
            <p style="color: #9CA3AF; font-size: 13px; margin: 0;">Zell am See, Österreich • Buchungsanfrage #${referenceId}</p>
          </div>
          
          <div style="padding: 24px 0;">
            <h2 style="color: #FFFFFF; font-size: 16px; margin-top: 0;">Fahrtdaten</h2>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 8px 0; color: #9CA3AF; width: 140px;">Abholadresse:</td>
                <td style="padding: 8px 0; color: #FFFFFF; font-weight: 600;">${data.pickup}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #9CA3AF;">Zieladresse:</td>
                <td style="padding: 8px 0; color: #FFFFFF; font-weight: 600;">${data.dropoff}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #9CA3AF;">Datum & Uhrzeit:</td>
                <td style="padding: 8px 0; color: #FFFFFF;">${data.date} um ${data.time} Uhr</td>
              </tr>
              ${data.flightNumber ? `<tr><td style="padding: 8px 0; color: #9CA3AF;">Flugnummer:</td><td style="padding: 8px 0; color: #FFFFFF;">${data.flightNumber}</td></tr>` : ""}
              <tr>
                <td style="padding: 8px 0; color: #9CA3AF;">Fahrgäste & Gepäck:</td>
                <td style="padding: 8px 0; color: #FFFFFF;">${data.passengers} Personen · ${data.luggage} Gepäckstücke</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #9CA3AF;">Gewünschtes Fahrzeug:</td>
                <td style="padding: 8px 0; color: #FFFFFF;">${data.vehicle}</td>
              </tr>
            </table>

            <h2 style="color: #FFFFFF; font-size: 16px; margin-top: 24px;">Kontaktdaten</h2>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 8px 0; color: #9CA3AF; width: 140px;">Name:</td>
                <td style="padding: 8px 0; color: #FFFFFF; font-weight: 600;">${data.fullName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #9CA3AF;">Telefon:</td>
                <td style="padding: 8px 0; color: #FFFFFF;">${data.phone}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #9CA3AF;">E-Mail:</td>
                <td style="padding: 8px 0; color: #FFFFFF;">${data.email}</td>
              </tr>
            </table>

            ${data.notes ? `
              <h2 style="color: #FFFFFF; font-size: 16px; margin-top: 24px;">Anmerkungen / Sondergepäck</h2>
              <div style="background-color: #14171C; border: 1px solid #2E343E; border-radius: 8px; padding: 12px; font-size: 14px; color: #B8BFC9;">
                ${data.notes}
              </div>
            ` : ""}
          </div>

          <div style="text-align: center; padding-top: 20px; border-top: 1px solid #2E343E; font-size: 12px; color: #9CA3AF;">
            First Class Drive Zell am See • 24/7 VIP Chauffeur & Transfers
          </div>
        </div>
      `;

      await resend.emails.send({
        from: "First Class Drive <reservations@firstclassdrive.at>",
        to: ["office@firstclassdrive.at"],
        replyTo: data.email,
        subject: `Neue Buchungsanfrage #${referenceId} – ${data.pickup} -> ${data.dropoff}`,
        html: htmlContent,
      });

      // Also confirmation copy to customer
      try {
        await resend.emails.send({
          from: "First Class Drive <reservations@firstclassdrive.at>",
          to: [data.email],
          subject: `Ihre Buchungsanfrage #${referenceId} – First Class Drive Zell am See`,
          html: htmlContent,
        });
      } catch {
        // Customer copy fail shouldn't fail the submission
      }
    } catch (err) {
      console.error("Resend delivery notice:", err);
      // Fallback gracefully so customer inquiry is still preserved
    }
  } else {
    console.log(`[SIMULATION MODE] Booking inquiry #${referenceId} received for ${data.fullName} (${data.pickup} -> ${data.dropoff}). Set RESEND_API_KEY in .env to send live emails.`);
  }

  return {
    success: true,
    referenceId,
    whatsappUrl,
    message: "Booking inquiry received successfully",
  };
}
