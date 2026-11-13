import React from "react";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { ServicesGrid } from "@/components/ServicesGrid";
import { Sparkles, CheckCircle } from "lucide-react";

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services");

  return (
    <div className="w-full max-w-5xl xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 sm:space-y-12 pb-12 sm:pb-20">
      {/* Header */}
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-hairline bg-graphite p-6 sm:p-8 md:p-10 shadow-xl">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2">
          {t("sectionTitle")}
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-silver-muted max-w-xl leading-relaxed">
          {t("sectionSubtitle")}
        </p>
      </div>

      {/* Services Grid */}
      <ServicesGrid />

      {/* VIP Standards Box */}
      <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-graphite border border-hairline space-y-6 shadow-xl">
        <h3 className="text-base sm:text-lg md:text-xl font-bold text-white flex items-center gap-2.5">
          <Sparkles className="w-5 h-5 text-platinum-light" strokeWidth={1.5} />
          <span>{t("qualityTitle")}</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs sm:text-sm text-silver-muted">
          <div className="p-3.5 rounded-xl bg-obsidian-soft border border-hairline/60 flex flex-col gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" strokeWidth={1.5} />
            <strong className="text-platinum-light block font-semibold">{t("flightMonitoring")}</strong>
            <span className="text-[11px] sm:text-xs leading-relaxed">{t("flightMonitoringDesc")}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-obsidian-soft border border-hairline/60 flex flex-col gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" strokeWidth={1.5} />
            <strong className="text-platinum-light block font-semibold">{t("meetGreet")}</strong>
            <span className="text-[11px] sm:text-xs leading-relaxed">{t("meetGreetDesc")}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-obsidian-soft border border-hairline/60 flex flex-col gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" strokeWidth={1.5} />
            <strong className="text-platinum-light block font-semibold">{t("allWheelFleet")}</strong>
            <span className="text-[11px] sm:text-xs leading-relaxed">{t("allWheelFleetDesc")}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-obsidian-soft border border-hairline/60 flex flex-col gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" strokeWidth={1.5} />
            <strong className="text-platinum-light block font-semibold">{t("discreteDrivers")}</strong>
            <span className="text-[11px] sm:text-xs leading-relaxed">{t("discreteDriversDesc")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
