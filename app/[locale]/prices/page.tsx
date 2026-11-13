import React from "react";
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PricesSection } from "@/components/PricesSection";

export default async function PricesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("prices");

  return (
    <div className="w-full max-w-xl sm:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6 sm:space-y-8 pb-12 sm:pb-20">
      {/* Header */}
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-hairline bg-graphite p-6 sm:p-8 md:p-10 shadow-xl">
        <div className="relative z-10 max-w-lg">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2">
            {t("title")}
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-silver-muted leading-relaxed">
            {t("pageSubtitle")}
          </p>
        </div>

        {/* Lake hero background snippet */}
        <div className="absolute right-0 rtl:right-auto rtl:left-0 top-0 bottom-0 w-1/2 opacity-25 sm:opacity-35 pointer-events-none">
          <Image
            src="/images/clean-hero-van.jpg"
            alt="Mercedes-Benz V-Class"
            fill
            className="object-cover object-right rtl:object-left"
          />
          <div className="absolute inset-0 bg-gradient-to-r rtl:bg-gradient-to-l from-graphite via-graphite/80 to-transparent" />
        </div>
      </div>

      {/* Main Prices Section */}
      <PricesSection />
    </div>
  );
}
