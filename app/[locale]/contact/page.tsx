import React from "react";
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { BookingForm } from "@/components/BookingForm";
import { GoogleMapSection } from "@/components/GoogleMapSection";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  return (
    <div className="w-full bg-obsidian">
      {/* 1. Hero Section with Ultra-High Resolution Panoramic Dusk Image */}
      <section className="relative w-full h-[280px] sm:h-[340px] md:h-[400px] lg:h-[440px] overflow-hidden flex items-center">
        {/* Panoramic Sunset Lake Background */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <Image
            src="/images/contact-hero-ultra.jpg"
            alt="First Class Drive Zell am See"
            fill
            priority
            quality={95}
            sizes="100vw"
            className="object-cover object-[center_55%]"
          />
          {/* Directional dark gradient on text side for crisp legibility */}
          <div className="absolute inset-0 bg-gradient-to-r rtl:bg-gradient-to-l from-obsidian/95 via-obsidian/60 to-transparent z-[1]" />
          {/* Smooth bottom gradient fade into solid dark background */}
          <div className="absolute inset-x-0 bottom-0 h-24 sm:h-32 bg-gradient-to-t from-obsidian via-obsidian/70 to-transparent z-[1]" />
        </div>

        {/* Hero Content (Left-aligned) */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-6">
          <div className="max-w-xl text-left rtl:text-right">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-white tracking-tight leading-tight drop-shadow-md">
              {t("pageTitle")}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-platinum-light/95 font-normal mt-2 sm:mt-3 drop-shadow-sm">
              {t("pageSubtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Main Content Area (Two Columns) */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-8 sm:pt-12 pb-10 sm:pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Kontaktinformationen, Öffnungszeiten, Social Icons */}
          <div className="lg:col-span-5 space-y-8 sm:space-y-10 text-left rtl:text-right">
            {/* Kontaktinformationen */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-6">
                {t("infoTitle")}
              </h2>

              <div className="space-y-5">
                {/* Telephone */}
                <a
                  href="tel:+436542122456"
                  className="flex items-center gap-4 text-platinum-light hover:text-white transition-colors group"
                >
                  <div className="w-9 h-9 rounded-full bg-graphite/60 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-[#DFBA73]/60 transition-colors">
                    <Phone className="w-4 h-4 text-[#DFBA73] shrink-0" strokeWidth={1.8} />
                  </div>
                  <span className="text-sm sm:text-base font-medium tracking-wide">
                    {t("phone")}
                  </span>
                </a>

                {/* Email */}
                <a
                  href="mailto:info@firstclassdrive.at"
                  className="flex items-center gap-4 text-platinum-light hover:text-white transition-colors group"
                >
                  <div className="w-9 h-9 rounded-full bg-graphite/60 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-[#DFBA73]/60 transition-colors">
                    <Mail className="w-4 h-4 text-[#DFBA73] shrink-0" strokeWidth={1.8} />
                  </div>
                  <span className="text-sm sm:text-base font-medium tracking-wide">
                    {t("email")}
                  </span>
                </a>

                {/* Location */}
                <div className="flex items-center gap-4 text-platinum-light">
                  <div className="w-9 h-9 rounded-full bg-graphite/60 border border-white/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-[#DFBA73] shrink-0" strokeWidth={1.8} />
                  </div>
                  <span className="text-sm sm:text-base font-medium tracking-wide">
                    {t("location")}
                  </span>
                </div>
              </div>
            </div>

            {/* Öffnungszeiten */}
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-4">
                {t("openingHoursTitle")}
              </h3>

              <div className="flex items-center gap-4 text-platinum-light">
                <div className="w-9 h-9 rounded-full bg-graphite/60 border border-white/10 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-[#DFBA73] shrink-0" strokeWidth={1.8} />
                </div>
                <span className="text-sm sm:text-base font-medium tracking-wide">
                  {t("openingHoursValue")}
                </span>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="pt-2 flex items-center gap-3">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-graphite/60 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-all hover:scale-105"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>

              {/* X / Twitter */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="w-10 h-10 rounded-full bg-graphite/60 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-all hover:scale-105"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-graphite/60 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-all hover:scale-105"
              >
                <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>

              {/* TikTok */}
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-10 h-10 rounded-full bg-graphite/60 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-all hover:scale-105"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.46V10.15a8.27 8.27 0 0 0 5.77 2.12v-3.46a4.85 4.85 0 0 1-3.77-2.12z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Column: VIP Ride Request Form */}
          <div className="lg:col-span-7 w-full">
            <BookingForm />
          </div>
        </div>
      </section>

      {/* 3. Live Google Map Section (Razor Sharp, Interactive, Direct from Google Maps) */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pb-16 sm:pb-24">
        <GoogleMapSection />
      </section>
    </div>
  );
}
