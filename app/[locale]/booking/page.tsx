import React from "react";
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { BookingForm } from "@/components/BookingForm";
import { Plane, Mountain, Bike, Car, Key } from "lucide-react";

export default async function BookingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("booking");

  return (
    <div className="w-full max-w-xl sm:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6 sm:space-y-8 pb-12 sm:pb-20">
      {/* Mini Hero */}
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-hairline bg-graphite p-5 sm:p-8 md:p-10 shadow-xl">
        <div className="relative z-10 max-w-xl">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-1 sm:mb-2">
            {t("pageTitle")}
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-silver-muted mb-4 sm:mb-6">
            {t("pageSubtitle")}
          </p>

          {/* Quick Service Categories Bar */}
          <div className="flex items-center justify-between gap-1 sm:gap-4 pt-3 border-t border-hairline/60 overflow-x-auto no-scrollbar">
            <div className="flex flex-col items-center text-center p-1.5 sm:p-2 min-w-[65px] sm:min-w-[80px]">
              <Plane className="w-4 h-4 sm:w-5 sm:h-5 text-platinum-light mb-1" strokeWidth={1.5} />
              <span className="text-[9px] sm:text-[11px] text-silver-muted leading-tight">{t("catAirport")}</span>
            </div>

            <div className="flex flex-col items-center text-center p-1.5 sm:p-2 min-w-[65px] sm:min-w-[80px]">
              <Mountain className="w-4 h-4 sm:w-5 sm:h-5 text-platinum-light mb-1" strokeWidth={1.5} />
              <span className="text-[9px] sm:text-[11px] text-silver-muted leading-tight">{t("catExcursions")}</span>
            </div>

            <div className="flex flex-col items-center text-center p-1.5 sm:p-2 min-w-[65px] sm:min-w-[80px]">
              <Bike className="w-4 h-4 sm:w-5 sm:h-5 text-platinum-light mb-1" strokeWidth={1.5} />
              <span className="text-[9px] sm:text-[11px] text-silver-muted leading-tight">{t("catBikes")}</span>
            </div>

            <div className="flex flex-col items-center text-center p-1.5 sm:p-2 min-w-[65px] sm:min-w-[80px]">
              <Car className="w-4 h-4 sm:w-5 sm:h-5 text-platinum-light mb-1" strokeWidth={1.5} />
              <span className="text-[9px] sm:text-[11px] text-silver-muted leading-tight">{t("catTaxi")}</span>
            </div>

            <div className="flex flex-col items-center text-center p-1.5 sm:p-2 min-w-[65px] sm:min-w-[80px]">
              <Key className="w-4 h-4 sm:w-5 sm:h-5 text-platinum-light mb-1" strokeWidth={1.5} />
              <span className="text-[9px] sm:text-[11px] text-silver-muted leading-tight">{t("catRental")}</span>
            </div>
          </div>
        </div>

        {/* Mercedes V-Class snippet in top right */}
        <div className="absolute right-0 rtl:right-auto rtl:left-0 top-0 bottom-0 w-2/5 sm:w-1/2 opacity-25 sm:opacity-35 pointer-events-none">
          <Image
            src="/images/clean-hero-van.jpg"
            alt="Mercedes-Benz V-Class"
            fill
            className="object-cover object-right rtl:object-left"
          />
          <div className="absolute inset-0 bg-gradient-to-r rtl:bg-gradient-to-l from-graphite via-graphite/70 to-transparent" />
        </div>
      </div>

      {/* Booking Form */}
      <BookingForm />
    </div>
  );
}
