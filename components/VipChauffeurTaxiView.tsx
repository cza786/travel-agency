"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import {
  MapPin,
  Car,
  Utensils,
  Mountain,
  Gem,
  ShieldCheck,
  Clock,
  Calendar,
  Users,
  Flag,
  ArrowRight,
  ChevronRight,
  CheckCircle,
  X,
  Crown,
  Plane,
  Sparkles,
} from "lucide-react";
import { useBookingModal } from "./BookingModal";

interface ServiceCardItem {
  id: string;
  titleKey: string;
  subtextKey: string;
  descKey: string;
  icon: React.ReactNode;
  image: string;
  defaultPickup: string;
  defaultDropoff: string;
}

export function VipChauffeurTaxiView() {
  const t = useTranslations("vipTaxiPage");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const { openBooking } = useBookingModal();

  // Booking Widget State
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [passengers, setPassengers] = useState("1 Person");
  const [activeModal, setActiveModal] = useState<ServiceCardItem | null>(null);

  const serviceCards: ServiceCardItem[] = [
    {
      id: "city",
      titleKey: "services.city.title",
      subtextKey: "services.city.subtext",
      descKey: "services.city.desc",
      icon: <Car className="w-5 h-5 text-obsidian" strokeWidth={2} />,
      image: "/images/vip-taxi/salzburg-night-hd.jpg",
      defaultPickup: "Salzburg Altstadt / Hotel",
      defaultDropoff: "Salzburg Stadtrundfahrt & Sightseeing",
    },
    {
      id: "restaurant",
      titleKey: "services.restaurant.title",
      subtextKey: "services.restaurant.subtext",
      descKey: "services.restaurant.desc",
      icon: <Utensils className="w-5 h-5 text-obsidian" strokeWidth={2} />,
      image: "/images/vip-taxi/restaurant-hd.jpg",
      defaultPickup: "Hotel / Residenz Salzburg",
      defaultDropoff: "Gourmet-Restaurant Transfer",
    },
    {
      id: "ski",
      titleKey: "services.ski.title",
      subtextKey: "services.ski.subtext",
      descKey: "services.ski.desc",
      icon: <Mountain className="w-5 h-5 text-obsidian" strokeWidth={2} />,
      image: "/images/vip-taxi/ski-hd.jpg",
      defaultPickup: "Salzburg / Zell am See / Kaprun",
      defaultDropoff: "Skigebiet Kitzsteinhorn / Schmittenhöhe / Saalbach",
    },
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openBooking({
      pickup: pickup || "Salzburg Altstadt",
      dropoff: dropoff || "VIP Transfer Wunschziel",
    });
  };

  const handleCardClick = (card: ServiceCardItem) => {
    openBooking({
      pickup: card.defaultPickup,
      dropoff: card.defaultDropoff,
    });
  };

  return (
    <div className="w-full max-w-5xl xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 sm:space-y-12 pb-16 sm:pb-24">
      {/* =========================================================================
          HERO CARD (Matching /services/car-rental Style, Home Screen Picture)
          ========================================================================= */}
      <section className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-hairline bg-graphite p-6 sm:p-8 md:p-10 shadow-xl min-h-[170px] sm:min-h-[200px] md:min-h-[225px] flex items-center">
        {/* Background Image: The exact image from the Home Screen (/images/clean-taxi.jpg) */}
        <div className="absolute inset-0 pointer-events-none select-none">
          <Image
            src="/images/clean-taxi.jpg"
            alt="First Class Drive VIP Chauffeur Taxi"
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

      {/* 2. THREE PILLS / USPs */}
      <section className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 sm:gap-3">
        <div className="flex-1 min-w-[120px] flex items-center justify-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#15181f]/90 border border-hairline text-white shadow-xs backdrop-blur-xs">
          <Gem className="w-4 h-4 text-[#DFBA73] shrink-0" strokeWidth={2} />
          <span className="text-xs sm:text-sm font-medium tracking-tight whitespace-nowrap">{t("usps.premium")}</span>
        </div>
        <div className="flex-1 min-w-[140px] flex items-center justify-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#15181f]/90 border border-hairline text-white shadow-xs backdrop-blur-xs">
          <ShieldCheck className="w-4 h-4 text-[#DFBA73] shrink-0" strokeWidth={2} />
          <span className="text-xs sm:text-sm font-medium tracking-tight whitespace-nowrap">{t("usps.discreet")}</span>
        </div>
        <div className="flex-1 min-w-[140px] flex items-center justify-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#15181f]/90 border border-hairline text-white shadow-xs backdrop-blur-xs">
          <Clock className="w-4 h-4 text-[#DFBA73] shrink-0" strokeWidth={2} />
          <span className="text-xs sm:text-sm font-medium tracking-tight whitespace-nowrap">{t("usps.punctual")}</span>
        </div>
      </section>

      {/* 3. THREE SERVICE CARDS (Stadtfahrten, Restaurant, Ski) */}
      <section className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
          {serviceCards.map((card) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card)}
              className="group cursor-pointer rounded-3xl bg-graphite border border-hairline/90 overflow-hidden shadow-xl hover:shadow-2xl hover:border-[#DFBA73]/50 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Photo & Golden Icon */}
              <div className="relative w-full h-44 sm:h-48 overflow-hidden bg-slate-900">
                <Image
                  src={card.image}
                  alt={t(card.titleKey)}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-graphite via-transparent to-black/20" />

                {/* Golden Circular Icon at Bottom Left of Image */}
                <div className="absolute bottom-3 left-4 w-10 h-10 rounded-full bg-gradient-to-r from-[#ECC880] via-[#DFBA73] to-[#C59B4B] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  {card.icon}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight group-hover:text-[#DFBA73] transition-colors">
                    {t(card.titleKey)}
                  </h3>
                  <p className="text-xs sm:text-sm text-silver-muted leading-relaxed mt-1.5">
                    {t(card.subtextKey)}
                  </p>
                </div>

                {/* Link */}
                <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-[#DFBA73] group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                  <span>{t("services.city.cta")}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" strokeWidth={2} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. BOOKING WIDGET (Matching /services/car-rental Form Layout) */}
      <section className="relative rounded-2xl sm:rounded-3xl border border-hairline bg-gradient-to-b from-graphite via-[#14161c] to-obsidian p-6 sm:p-8 md:p-10 shadow-xl w-full">
        {/* Header */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/[0.04] border border-hairline flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5 text-[#DFBA73]" strokeWidth={1.75} />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight">
              {t("bookingWidget.title")}
            </h2>
            <p className="text-xs sm:text-sm text-silver-muted font-normal">
              {t("heroSubtitle")}
            </p>
          </div>
        </div>

        <form onSubmit={handleBookingSubmit} className="space-y-3 sm:space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
            {/* Field 1: Abholort */}
            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-silver-muted uppercase tracking-wider">
                {t("bookingWidget.pickup")}
              </label>
              <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-obsidian-soft/90 border border-hairline focus-within:border-[#DFBA73] transition-colors">
                <MapPin className="w-4 h-4 text-[#DFBA73] shrink-0" strokeWidth={1.8} />
                <input
                  type="text"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  placeholder={t("bookingWidget.pickupPlaceholder")}
                  className="w-full text-xs text-white placeholder:text-silver-muted/60 bg-transparent outline-none"
                />
              </div>
            </div>

            {/* Field 2: Zielort */}
            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-silver-muted uppercase tracking-wider">
                {t("bookingWidget.dropoff")}
              </label>
              <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-obsidian-soft/90 border border-hairline focus-within:border-[#DFBA73] transition-colors">
                <Flag className="w-4 h-4 text-[#DFBA73] shrink-0" strokeWidth={1.8} />
                <input
                  type="text"
                  value={dropoff}
                  onChange={(e) => setDropoff(e.target.value)}
                  placeholder={t("bookingWidget.dropoffPlaceholder")}
                  className="w-full text-xs text-white placeholder:text-silver-muted/60 bg-transparent outline-none"
                />
              </div>
            </div>

            {/* Field 3: Datum */}
            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-silver-muted uppercase tracking-wider">
                {t("bookingWidget.date")}
              </label>
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-obsidian-soft/90 border border-hairline focus-within:border-[#DFBA73] transition-colors">
                <Calendar className="w-3.5 h-3.5 text-[#DFBA73] shrink-0" strokeWidth={1.8} />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full text-xs text-white bg-transparent outline-none cursor-pointer"
                />
              </div>
            </div>

            {/* Field 4: Uhrzeit */}
            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-silver-muted uppercase tracking-wider">
                {t("bookingWidget.time")}
              </label>
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-obsidian-soft/90 border border-hairline focus-within:border-[#DFBA73] transition-colors">
                <Clock className="w-3.5 h-3.5 text-[#DFBA73] shrink-0" strokeWidth={1.8} />
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full text-xs text-white bg-transparent outline-none cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Field 5: Personen */}
          <div className="space-y-1">
            <label className="block text-[10px] font-bold text-silver-muted uppercase tracking-wider">
              {t("bookingWidget.passengers")}
            </label>
            <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-obsidian-soft/90 border border-hairline focus-within:border-[#DFBA73] transition-colors">
              <Users className="w-4 h-4 text-[#DFBA73] shrink-0" strokeWidth={1.8} />
              <select
                value={passengers}
                onChange={(e) => setPassengers(e.target.value)}
                className="w-full text-xs text-white bg-transparent outline-none cursor-pointer"
              >
                <option value="1 Person" className="bg-graphite text-white">{t("bookingWidget.passengersOption1")}</option>
                <option value="2 Personen" className="bg-graphite text-white">{t("bookingWidget.passengersOption2")}</option>
                <option value="3-4 Personen" className="bg-graphite text-white">{t("bookingWidget.passengersOption3")}</option>
                <option value="5-8 Personen" className="bg-graphite text-white">{t("bookingWidget.passengersOption4")}</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 sm:py-4 px-6 rounded-xl sm:rounded-2xl bg-silver-metallic hover:brightness-105 active:scale-[0.99] text-obsidian font-extrabold text-xs sm:text-sm tracking-wider uppercase shadow-[0_4px_24px_rgba(255,255,255,0.18)] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{t("bookingWidget.cta")}</span>
              <ChevronRight className="w-4 h-4 text-obsidian stroke-[2.5] rtl:rotate-180" />
            </button>
          </div>
        </form>
      </section>

      {/* 3. WHY FIRST CLASS DRIVE SECTION */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 md:p-10 rounded-3xl bg-graphite border border-hairline shadow-2xl space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-[#DFBA73] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>{t("whyUs.title")}</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              {t("whyUs.subtitle")}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {[1, 2, 3, 4, 5].map((idx) => {
              const pKey = `whyUs.p${idx}` as const;
              return (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-obsidian-soft border border-hairline/80 flex items-start gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" strokeWidth={2} />
                  <span className="text-xs sm:text-sm font-semibold text-platinum-mid leading-relaxed">
                    {t(pKey)}
                  </span>
                </div>
              );
            })}
          </div>

          {/* CTA Box inside */}
          <div className="pt-4 border-t border-hairline/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                {t("cta.title")}
              </h3>
              <p className="text-xs text-silver-muted max-w-md">
                {t("cta.desc")}
              </p>
            </div>
            <button
              type="button"
              onClick={() => openBooking({ pickup: pickup || "Salzburg", dropoff: dropoff || "VIP Chauffeur Taxi" })}
              className="py-3 px-6 rounded-full bg-gradient-to-r from-[#ECC880] via-[#DFBA73] to-[#C59B4B] hover:brightness-105 active:scale-[0.98] text-obsidian font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all shrink-0 cursor-pointer"
            >
              <span>{t("cta.btn")}</span>
              <ChevronRight className="w-4 h-4 rtl:rotate-180" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </section>

      {/* 4. BOTTOM SIGNATURE BAR (Matching Mockup) */}
      <section className="w-full">
        <div className="rounded-2xl lg:rounded-full bg-graphite-elevated border border-hairline/90 p-4 sm:p-5 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* 5 Badges on Left */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 sm:gap-7 text-xs sm:text-sm font-semibold text-platinum-mid">
            <div className="flex items-center gap-2">
              <Crown className="w-4 h-4 text-[#DFBA73]" strokeWidth={2} />
              <span>{t("signature.vipService")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Plane className="w-4 h-4 text-[#DFBA73]" strokeWidth={2} />
              <span>{t("signature.airportTransfer")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Gem className="w-4 h-4 text-[#DFBA73]" strokeWidth={2} />
              <span>{t("signature.luxuryVehicles")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#DFBA73]" strokeWidth={2} />
              <span>{t("signature.service247")}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#DFBA73]" strokeWidth={2} />
              <span>{t("signature.localExpertise")}</span>
            </div>
          </div>

          {/* Elegant Cursive Golden Motto on Right */}
          <div className="font-serif italic text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFF1D2] via-[#E8CD90] to-[#C59B4B] tracking-wide shrink-0">
            {t("signature.motto")}
          </div>
        </div>
      </section>

      {/* 5. SERVICE DETAIL MODAL WHEN "MEHR ERFAHREN" IS CLICKED */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div
            className="fixed inset-0 bg-black/85 backdrop-blur-sm transition-opacity"
            onClick={() => setActiveModal(null)}
          />

          <div className="relative w-full max-w-lg bg-graphite-elevated border border-hairline rounded-3xl p-6 sm:p-8 shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200 space-y-4">
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-2 rounded-lg text-silver-muted hover:text-white hover:bg-hairline transition-colors"
            >
              <X className="w-5 h-5" strokeWidth={1.5} />
            </button>

            <div className="relative w-full h-40 rounded-2xl overflow-hidden bg-slate-900">
              <Image
                src={activeModal.image}
                alt={t(activeModal.titleKey)}
                fill
                className="object-cover"
              />
              <div className="absolute top-3 left-3 w-9 h-9 rounded-full bg-gradient-to-r from-[#ECC880] to-[#C59B4B] flex items-center justify-center shadow-lg">
                {activeModal.icon}
              </div>
            </div>

            <h3 className="text-xl font-bold text-white">
              {t(activeModal.titleKey)}
            </h3>

            <p className="text-xs sm:text-sm text-platinum-dark leading-relaxed">
              {t(activeModal.descKey)}
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  const s = activeModal;
                  setActiveModal(null);
                  handleCardClick(s);
                }}
                className="w-full py-3 px-5 rounded-full bg-gradient-to-r from-[#ECC880] via-[#DFBA73] to-[#C59B4B] text-obsidian font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-105 transition-all flex items-center justify-center gap-2"
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
