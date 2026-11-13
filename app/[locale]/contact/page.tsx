import React from "react";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Phone, Mail, MapPin } from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { BookingForm } from "@/components/BookingForm";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  return (
    <div className="w-full max-w-xl sm:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 sm:space-y-12 pb-12 sm:pb-20">
      {/* Header */}
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-hairline bg-graphite p-6 sm:p-8 md:p-10 shadow-xl">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2">
          {t("pageTitle")}
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-silver-muted max-w-xl leading-relaxed">
          {t("pageSubtitle")}
        </p>
      </div>

      {/* Contact Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {/* Telephone */}
        <a
          href="tel:+436641234567"
          className="p-5 sm:p-6 rounded-2xl bg-graphite hover:bg-graphite-elevated border border-hairline hover:border-platinum-dark/60 transition-all group shadow-sm flex flex-col justify-between gap-3"
        >
          <div className="w-10 h-10 rounded-xl bg-obsidian border border-hairline flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <Phone className="w-5 h-5 text-platinum-light" strokeWidth={1.5} />
          </div>
          <div>
            <div className="text-[10px] sm:text-[11px] text-silver-muted uppercase tracking-wider">{t("phoneLabel")}</div>
            <div className="text-sm sm:text-base font-bold text-white mt-0.5">{t("phoneValue")}</div>
            <div className="text-[11px] text-emerald-400 mt-1 font-medium">{t("callNowAction")} ➔</div>
          </div>
        </a>

        {/* WhatsApp */}
        <a
          href="https://wa.me/436641234567"
          target="_blank"
          rel="noopener noreferrer"
          className="p-5 sm:p-6 rounded-2xl bg-graphite hover:bg-graphite-elevated border border-hairline hover:border-whatsapp/60 transition-all group shadow-sm flex flex-col justify-between gap-3"
        >
          <div className="w-10 h-10 rounded-xl bg-whatsapp/20 border border-whatsapp/40 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <WhatsAppIcon className="w-5 h-5 text-whatsapp fill-current" />
          </div>
          <div>
            <div className="text-[10px] sm:text-[11px] text-silver-muted uppercase tracking-wider">{t("whatsAppDispatch")}</div>
            <div className="text-sm sm:text-base font-bold text-white mt-0.5">{t("chatCentral")}</div>
            <div className="text-[11px] text-whatsapp font-medium mt-1">{t("openChat")} ➔</div>
          </div>
        </a>

        {/* Email */}
        <a
          href="mailto:office@firstclassdrive.at"
          className="p-5 sm:p-6 rounded-2xl bg-graphite hover:bg-graphite-elevated border border-hairline hover:border-platinum-dark/60 transition-all group shadow-sm flex flex-col justify-between gap-3"
        >
          <div className="w-10 h-10 rounded-xl bg-obsidian border border-hairline flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <Mail className="w-5 h-5 text-platinum-light" strokeWidth={1.5} />
          </div>
          <div>
            <div className="text-[10px] sm:text-[11px] text-silver-muted uppercase tracking-wider">{t("emailInquiries")}</div>
            <div className="text-sm sm:text-base font-bold text-white mt-0.5 truncate">{t("emailValue")}</div>
            <div className="text-[11px] text-silver-muted mt-1">{t("fastReply")}</div>
          </div>
        </a>

        {/* Location */}
        <div className="p-5 sm:p-6 rounded-2xl bg-graphite border border-hairline shadow-sm flex flex-col justify-between gap-3">
          <div className="w-10 h-10 rounded-xl bg-obsidian border border-hairline flex items-center justify-center shrink-0">
            <MapPin className="w-5 h-5 text-platinum-light" strokeWidth={1.5} />
          </div>
          <div>
            <div className="text-[10px] sm:text-[11px] text-silver-muted uppercase tracking-wider">{t("locationConcession")}</div>
            <div className="text-sm sm:text-base font-bold text-white mt-0.5">{t("locationValue")}</div>
            <div className="text-[11px] text-silver-muted mt-1">{t("locationArea")}</div>
          </div>
        </div>
      </div>

      {/* Embedded Booking Form */}
      <div className="pt-2 sm:pt-4">
        <h2 className="text-base sm:text-lg md:text-xl font-bold text-white mb-4 uppercase tracking-wider">
          {t("inquireNonBinding")}
        </h2>
        <BookingForm />
      </div>
    </div>
  );
}
