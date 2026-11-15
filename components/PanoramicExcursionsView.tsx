"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import {
  MapPin,
  Mountain,
  Gem,
  Camera,
  ShieldCheck,
  Calendar,
  Users,
  Search,
  ChevronRight,
  Sparkles,
  CheckCircle,
  X,
  Compass,
  ArrowRight,
  Waves,
  Landmark,
} from "lucide-react";
import { useBookingModal } from "./BookingModal";

interface DestinationItem {
  id: string;
  tagKey: string;
  badge: string;
  badgeIcon: React.ReactNode;
  titleKey: string;
  descKey: string;
  fullDescKey: string;
  image: string;
  defaultDropoff: string;
}

export function PanoramicExcursionsView() {
  const t = useTranslations("excursionsPage");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const { openBooking } = useBookingModal();

  // Quick Tour Bar State
  const [startLocation, setStartLocation] = useState("Zell am See / Kaprun");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState("1 - 4");
  const [activeModal, setActiveModal] = useState<DestinationItem | null>(null);

  const destinations: DestinationItem[] = [
    {
      id: "grossglockner",
      tagKey: "grossglockner.tag",
      badge: "3.798 m",
      badgeIcon: <Mountain className="w-3.5 h-3.5 text-[#DFBA73]" strokeWidth={2} />,
      titleKey: "grossglockner.title",
      descKey: "grossglockner.desc",
      fullDescKey: "grossglockner.fullDesc",
      image: "/images/excursions/grossglockner-hd.jpg",
      defaultDropoff: "Großglockner Hochalpenstraße / Franz-Josefs-Höhe",
    },
    {
      id: "krimml",
      tagKey: "krimml.tag",
      badge: "380 m",
      badgeIcon: <Waves className="w-3.5 h-3.5 text-[#DFBA73]" strokeWidth={2} />,
      titleKey: "krimml.title",
      descKey: "krimml.desc",
      fullDescKey: "krimml.fullDesc",
      image: "/images/excursions/krimml-hd.jpg",
      defaultDropoff: "Krimmler Wasserfälle Nationalpark Hohe Tauern",
    },
    {
      id: "hallstatt",
      tagKey: "hallstatt.tag",
      badge: "UNESCO",
      badgeIcon: <Landmark className="w-3.5 h-3.5 text-[#DFBA73]" strokeWidth={2} />,
      titleKey: "hallstatt.title",
      descKey: "hallstatt.desc",
      fullDescKey: "hallstatt.fullDesc",
      image: "/images/excursions/hallstatt-hd.jpg",
      defaultDropoff: "Hallstatt UNESCO Welterbe & Hallstätter See",
    },
  ];

  const handleQuickBarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openBooking({
      pickup: startLocation,
      dropoff: "Großglockner / Krimml / Hallstatt Panoramatour",
    });
  };

  const handleBookDestination = (dest: DestinationItem) => {
    openBooking({
      pickup: startLocation,
      dropoff: dest.defaultDropoff,
    });
  };

  return (
    <div className="w-full max-w-5xl xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 sm:space-y-12 pb-16 sm:pb-24">
      {/* =========================================================================
          HERO CARD (Matching /services/car-rental Style, Home Screen Picture)
          ========================================================================= */}
      <section className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-hairline bg-graphite p-6 sm:p-8 md:p-10 shadow-xl min-h-[170px] sm:min-h-[200px] md:min-h-[225px] flex items-center">
        {/* Background Image: The exact image from the Home Screen (/images/clean-excursions.jpg) */}
        <div className="absolute inset-0 pointer-events-none select-none">
          <Image
            src="/images/clean-excursions.jpg"
            alt="First Class Drive Panoramic Excursions"
            fill
            priority
            quality={95}
            sizes="(max-width: 1024px) 100vw, 1400px"
            className="object-cover object-left rtl:object-right opacity-90 transition-transform duration-700 ease-out"
          />
          {/* Subtle horizontal gradient to ensure the visual on left is visible while text on right is crisp */}
          <div className="absolute inset-0 bg-gradient-to-r rtl:bg-gradient-to-l from-obsidian/75 via-obsidian/85 to-obsidian sm:from-transparent sm:via-obsidian/75 sm:to-obsidian pointer-events-none" />
        </div>

        {/* Foreground Content:
            Only:
            1. Location pin & text
            2. Gold badge pill
            3. Large bold Title
        */}
        <div className="relative z-10 w-full flex items-center justify-between gap-4 sm:gap-6">
          {/* Left spacer for unobstructed visual visibility on tablet/desktop */}
          <div className="hidden sm:block w-[32%] md:w-[38%] lg:w-[42%] shrink-0 pointer-events-none" />

          {/* Text Area */}
          <div className="flex-1 space-y-2 sm:space-y-2.5 min-w-0">
            {/* Location Tag */}
            <div className="flex items-center gap-1.5 text-xs sm:text-[13px] text-silver-muted font-medium tracking-wide">
              <MapPin className="w-3.5 h-3.5 text-silver-muted shrink-0" strokeWidth={1.75} />
              <span>{tCommon("location")}</span>
            </div>

            {/* Badge */}
            <div>
              <span className="inline-flex items-center px-2.5 py-0.5 sm:py-1 rounded-full border border-[#C59B4B]/70 bg-[#DFBA73]/10 text-[#DFBA73] text-[9.5px] sm:text-[11px] font-semibold uppercase tracking-wider shadow-xs">
                {t("badge")}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
              {t("heroTitleLine1")} {t("heroTitleLine2")}
            </h1>
          </div>
        </div>
      </section>

      {/* 2. FOUR USPs PILL BAR */}
      <section className="w-full">
        <div className="rounded-2xl lg:rounded-full bg-white/95 text-obsidian shadow-xl border border-white/40 p-3 sm:p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 items-center">
            {/* USP 1 */}
            <div className="flex items-center justify-center sm:justify-start gap-2.5 px-2">
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                <Gem className="w-4 h-4 text-obsidian" strokeWidth={2} />
              </div>
              <span className="text-xs sm:text-sm font-bold text-obsidian tracking-tight">
                {t("usps.comfort")}
              </span>
            </div>

            {/* USP 2 */}
            <div className="flex items-center justify-center sm:justify-start gap-2.5 px-2">
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                <Mountain className="w-4 h-4 text-obsidian" strokeWidth={2} />
              </div>
              <span className="text-xs sm:text-sm font-bold text-obsidian tracking-tight">
                {t("usps.guided")}
              </span>
            </div>

            {/* USP 3 */}
            <div className="flex items-center justify-center sm:justify-start gap-2.5 px-2">
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                <Camera className="w-4 h-4 text-obsidian" strokeWidth={2} />
              </div>
              <span className="text-xs sm:text-sm font-bold text-obsidian tracking-tight">
                {t("usps.panoramas")}
              </span>
            </div>

            {/* USP 4 */}
            <div className="flex items-center justify-center sm:justify-start gap-2.5 px-2">
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 text-obsidian" strokeWidth={2} />
              </div>
              <span className="text-xs sm:text-sm font-bold text-obsidian tracking-tight">
                {t("usps.reliable")}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THREE DESTINATIONS SHOWCASE */}
      <section className="w-full space-y-6 sm:space-y-8">
        {/* Section Header Capsule */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-obsidian-soft border border-hairline shadow-lg">
            <Sparkles className="w-4 h-4 text-[#DFBA73]" strokeWidth={1.8} />
            <h2 className="text-sm sm:text-base font-bold text-white tracking-wide">
              {t("destinationsTitle")}
            </h2>
          </div>
        </div>

        {/* 3 Destination Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
          {destinations.map((dest) => (
            <div
              key={dest.id}
              className="rounded-3xl bg-white/95 text-obsidian shadow-xl border border-white/30 overflow-hidden flex flex-col justify-between hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Photo & Badges */}
              <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-slate-900 group">
                <Image
                  src={dest.image}
                  alt={t(dest.titleKey)}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                {/* Top Right Scalloped Altitude/UNESCO Badge */}
                <div className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-obsidian/90 border border-white/20 text-white backdrop-blur-xs flex items-center gap-1.5 shadow-lg">
                  {dest.badgeIcon}
                  <span className="text-xs font-extrabold tracking-wider">{dest.badge}</span>
                </div>

                {/* Bottom Left Pin Tag */}
                <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/75 border border-white/10 text-white backdrop-blur-xs flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#DFBA73]" strokeWidth={2} />
                  <span className="text-xs font-bold">{t(dest.tagKey)}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-obsidian tracking-tight mb-2">
                    {t(dest.titleKey)}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {t(dest.descKey)}
                  </p>
                </div>

                {/* Actions */}
                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveModal(dest)}
                    className="flex-1 py-2.5 px-4 rounded-full bg-gradient-to-r from-[#ECC880] via-[#DFBA73] to-[#C59B4B] hover:brightness-105 active:scale-[0.98] text-obsidian font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <span>{t("grossglockner.cta")}</span>
                    <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" strokeWidth={2.5} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleBookDestination(dest)}
                    className="py-2.5 px-4 rounded-full bg-slate-100 hover:bg-slate-200 text-obsidian font-bold text-xs uppercase tracking-wider transition-all"
                  >
                    {tCommon("bookNow")}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. QUICK TOUR FINDER BAR */}
      <section className="w-full">
        <form
          onSubmit={handleQuickBarSubmit}
          className="rounded-2xl lg:rounded-full bg-graphite-elevated border border-hairline/90 p-3 sm:p-4 shadow-2xl"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 items-center">
            {/* Field 1: Startort */}
            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-obsidian-soft border border-hairline hover:border-[#DFBA73]/50 transition-colors">
              <MapPin className="w-4 h-4 text-[#DFBA73] shrink-0" strokeWidth={2} />
              <div className="flex-1 min-w-0">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-silver-muted">
                  {t("quickBar.startLocation")}
                </label>
                <select
                  value={startLocation}
                  onChange={(e) => setStartLocation(e.target.value)}
                  className="w-full text-xs font-semibold text-white bg-transparent border-0 p-0 focus:ring-0 cursor-pointer outline-none truncate"
                >
                  <option value="Salzburg Zentrum / Flughafen" className="bg-graphite text-white">Salzburg</option>
                  <option value="Zell am See / Kaprun" className="bg-graphite text-white">Zell am See / Kaprun</option>
                  <option value="Saalbach-Hinterglemm" className="bg-graphite text-white">Saalbach-Hinterglemm</option>
                  <option value="Kitzbühel" className="bg-graphite text-white">Kitzbühel</option>
                  <option value="München" className="bg-graphite text-white">München</option>
                </select>
              </div>
            </div>

            {/* Field 2: Datum */}
            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-obsidian-soft border border-hairline hover:border-[#DFBA73]/50 transition-colors">
              <Calendar className="w-4 h-4 text-[#DFBA73] shrink-0" strokeWidth={2} />
              <div className="flex-1 min-w-0">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-silver-muted">
                  {t("quickBar.date")}
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full text-xs font-semibold text-white bg-transparent border-0 p-0 focus:ring-0 cursor-pointer outline-none"
                />
              </div>
            </div>

            {/* Field 3: Personen */}
            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-obsidian-soft border border-hairline hover:border-[#DFBA73]/50 transition-colors">
              <Users className="w-4 h-4 text-[#DFBA73] shrink-0" strokeWidth={2} />
              <div className="flex-1 min-w-0">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-silver-muted">
                  {t("quickBar.passengers")}
                </label>
                <select
                  value={passengers}
                  onChange={(e) => setPassengers(e.target.value)}
                  className="w-full text-xs font-semibold text-white bg-transparent border-0 p-0 focus:ring-0 cursor-pointer outline-none"
                >
                  <option value="1 - 4" className="bg-graphite text-white">1 – 4 {t("quickBar.passengers")}</option>
                  <option value="5 - 8" className="bg-graphite text-white">5 – 8 {t("quickBar.passengers")} (VIP Van)</option>
                </select>
              </div>
            </div>

            {/* Field 4: Button */}
            <div>
              <button
                type="submit"
                className="w-full py-3 px-6 rounded-xl lg:rounded-full bg-gradient-to-r from-[#ECC880] via-[#DFBA73] to-[#C59B4B] hover:brightness-105 active:scale-[0.98] text-obsidian font-bold text-xs sm:text-sm tracking-wide shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Search className="w-4 h-4" strokeWidth={2.5} />
                <span>{t("quickBar.cta")}</span>
                <ChevronRight className="w-4 h-4 rtl:rotate-180" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </form>
      </section>

      {/* 5. CHAUFFEUR BENEFITS & HIGHLIGHTS SECTION */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 md:p-10 rounded-3xl bg-graphite border border-hairline shadow-2xl space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-[#DFBA73] text-xs font-bold uppercase tracking-wider">
              <Compass className="w-4 h-4" />
              <span>First Class Drive Standard</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              {t("chauffeurSection.title")}
            </h2>
            <p className="text-xs sm:text-sm text-silver-muted leading-relaxed max-w-2xl">
              {t("chauffeurSection.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {[1, 2, 3, 4, 5].map((idx) => {
              const pointKey = `chauffeurSection.point${idx}` as const;
              return (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-obsidian-soft border border-hairline/80 flex items-start gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" strokeWidth={2} />
                  <span className="text-xs sm:text-sm font-semibold text-platinum-mid leading-relaxed">
                    {t(pointKey)}
                  </span>
                </div>
              );
            })}
          </div>

          {/* CTA Box inside */}
          <div className="pt-4 border-t border-hairline/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                {t("ctaSection.title")}
              </h3>
              <p className="text-xs text-silver-muted">
                {t("ctaSection.desc")}
              </p>
            </div>
            <button
              type="button"
              onClick={() => openBooking({ pickup: startLocation, dropoff: "Wunsch-Panoramatour" })}
              className="py-3 px-6 rounded-full bg-gradient-to-r from-[#ECC880] via-[#DFBA73] to-[#C59B4B] hover:brightness-105 active:scale-[0.98] text-obsidian font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all shrink-0 cursor-pointer"
            >
              <span>{t("ctaSection.btn")}</span>
              <ChevronRight className="w-4 h-4 rtl:rotate-180" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </section>

      {/* 6. DETAIL MODAL WHEN "MEHR ERFAHREN" IS CLICKED */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div
            className="fixed inset-0 bg-black/85 backdrop-blur-sm transition-opacity"
            onClick={() => setActiveModal(null)}
          />

          <div className="relative w-full max-w-lg sm:max-w-xl bg-graphite-elevated border border-hairline rounded-3xl p-6 sm:p-8 shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200 space-y-5">
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-2 rounded-lg text-silver-muted hover:text-white hover:bg-hairline transition-colors"
            >
              <X className="w-5 h-5" strokeWidth={1.5} />
            </button>

            <div className="relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden bg-slate-900">
              <Image
                src={activeModal.image}
                alt={t(activeModal.titleKey)}
                fill
                className="object-cover"
              />
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 border border-white/20 text-white backdrop-blur-xs flex items-center gap-1.5 text-xs font-bold">
                <MapPin className="w-3.5 h-3.5 text-[#DFBA73]" />
                <span>{t(activeModal.tagKey)}</span>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                {t(activeModal.titleKey)}
              </h3>
              <p className="text-xs sm:text-sm text-platinum-dark leading-relaxed">
                {t(activeModal.fullDescKey)}
              </p>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                type="button"
                onClick={() => {
                  const dest = activeModal;
                  setActiveModal(null);
                  handleBookDestination(dest);
                }}
                className="flex-1 py-3 px-5 rounded-full bg-gradient-to-r from-[#ECC880] via-[#DFBA73] to-[#C59B4B] text-obsidian font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-105 transition-all flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-obsidian" strokeWidth={1.8} />
                <span>{tCommon("bookNow")}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
