import React from "react";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { ShieldCheck, Snowflake, HeartHandshake, Users, Car } from "lucide-react";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  return (
    <div className="w-full max-w-xl sm:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 sm:space-y-12 pb-12 sm:pb-20">
      {/* Header */}
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-hairline bg-graphite p-6 sm:p-8 md:p-10 shadow-xl">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2">
          {t("title")}
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-silver-muted max-w-xl leading-relaxed">
          {t("pageSubtitle")}
        </p>
      </div>

      {/* Story */}
      <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-graphite border border-hairline space-y-4 text-xs sm:text-sm md:text-base text-platinum-dark leading-relaxed shadow-lg">
        <p>{t("story1")}</p>
        <p>{t("story2")}</p>
      </div>

      {/* Fleet Showcase */}
      <div className="space-y-4 sm:space-y-6">
        <h2 className="text-base sm:text-lg md:text-xl font-bold text-white uppercase tracking-wider">
          {t("fleetTitle")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* V-Class Card */}
          <div className="p-6 rounded-2xl bg-graphite border border-hairline space-y-3 shadow-md hover:border-platinum-dark/50 transition-colors">
            <div className="w-11 h-11 rounded-xl bg-obsidian border border-hairline flex items-center justify-center">
              <Users className="w-5 h-5 text-platinum-light" strokeWidth={1.5} />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-white">{t("vClassTitle")}</h3>
            <p className="text-xs sm:text-sm text-silver-muted leading-relaxed">
              {t("vClassDesc")}
            </p>
          </div>

          {/* S-Class Card */}
          <div className="p-6 rounded-2xl bg-graphite border border-hairline space-y-3 shadow-md hover:border-platinum-dark/50 transition-colors">
            <div className="w-11 h-11 rounded-xl bg-obsidian border border-hairline flex items-center justify-center">
              <Car className="w-5 h-5 text-platinum-light" strokeWidth={1.5} />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-white">{t("sClassTitle")}</h3>
            <p className="text-xs sm:text-sm text-silver-muted leading-relaxed">
              {t("sClassDesc")}
            </p>
          </div>
        </div>
      </div>

      {/* Key Values */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-5">
        <div className="p-5 sm:p-6 rounded-2xl bg-graphite border border-hairline text-center">
          <Snowflake className="w-6 h-6 text-platinum-light mx-auto mb-2.5" strokeWidth={1.5} />
          <div className="text-xs sm:text-sm font-semibold text-white">{t("winterTitle")}</div>
          <div className="text-[11px] sm:text-xs text-silver-muted mt-1">{t("winterDesc")}</div>
        </div>

        <div className="p-5 sm:p-6 rounded-2xl bg-graphite border border-hairline text-center">
          <ShieldCheck className="w-6 h-6 text-platinum-light mx-auto mb-2.5" strokeWidth={1.5} />
          <div className="text-xs sm:text-sm font-semibold text-white">{t("discretionTitle")}</div>
          <div className="text-[11px] sm:text-xs text-silver-muted mt-1">{t("discretionDesc")}</div>
        </div>

        <div className="p-5 sm:p-6 rounded-2xl bg-graphite border border-hairline text-center">
          <HeartHandshake className="w-6 h-6 text-platinum-light mx-auto mb-2.5" strokeWidth={1.5} />
          <div className="text-xs sm:text-sm font-semibold text-white">{t("fairTitle")}</div>
          <div className="text-[11px] sm:text-xs text-silver-muted mt-1">{t("fairDesc")}</div>
        </div>
      </div>
    </div>
  );
}
