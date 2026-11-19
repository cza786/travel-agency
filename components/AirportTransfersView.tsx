"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import {
  Plane,
  MapPin,
  Calendar,
  Clock,
  Users,
  ShieldCheck,
  Handshake,
  ArrowRight,
  ChevronRight,
  ChevronDown,
  Phone,
  Mail,
  CheckCircle,
  HelpCircle,
  Sparkles,
} from "lucide-react";
import { useBookingModal } from "./BookingModal";
import { useLivePricing } from "@/lib/useLivePricing";

interface AirportInfo {
  id: string;
  nameKey: string;
  codeKey: string;
  distKey: string;
  image: string;
  pickupValue: string;
}

export function AirportTransfersView() {
  const t = useTranslations("airportPage");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const { openBooking } = useBookingModal();
  const { prices, getPrice } = useLivePricing();

  // Helper to map destination image based on service name or id
  const getRouteImage = (service: string, id: string): string => {
    const s = service.toLowerCase();
    if (s.includes("salzburg") || id === "air-r1" || id === "r1") return "/images/routes/salzburg.jpg";
    if (s.includes("münchen") || s.includes("munich") || id === "air-r2" || id === "r2") return "/images/routes/munich.jpg";
    if (s.includes("innsbruck") || id === "air-r3" || id === "r3") return "/images/routes/innsbruck.jpg";
    if (s.includes("wien") || s.includes("vienna") || id === "air-r4" || id === "r4") return "/images/routes/vienna.jpg";
    return "/images/clean-airport.jpg";
  };

  const getRoutePickupDropoff = (service: string) => {
    const s = service.toLowerCase();
    if (s.includes("salzburg")) {
      return { pickup: "Zell am See / Kaprun", dropoff: "Flughafen Salzburg (SZG)" };
    }
    if (s.includes("münchen") || s.includes("munich")) {
      return { pickup: "Zell am See / Kaprun", dropoff: "Flughafen München (MUC)" };
    }
    if (s.includes("innsbruck")) {
      return { pickup: "Zell am See / Kaprun", dropoff: "Flughafen Innsbruck (INN)" };
    }
    if (s.includes("wien") || s.includes("vienna")) {
      return { pickup: "Zell am See / Kaprun", dropoff: "Flughafen Wien (VIE)" };
    }
    const parts = service.split(/[↔→-]/);
    if (parts.length >= 2) {
      return { pickup: parts[0].trim(), dropoff: parts[1].trim() };
    }
    return { pickup: "Zell am See / Kaprun", dropoff: service };
  };

  const getRouteTitle = (id: string, service: string): string => {
    if (id === "air-r1" || id === "r1") return t("routes.r1");
    if (id === "air-r2" || id === "r2") return t("routes.r2");
    if (id === "air-r3" || id === "r3") return t("routes.r3");
    if (id === "air-r4" || id === "r4") return t("routes.r4");
    return service;
  };

  // Live airport routes managed by admin from /admin/pricing
  const liveAirportRoutes = prices.filter(
    (p) => p.category === "airport_route" && p.status === "Active"
  );

  const fallbackRoutes = [
    { id: "air-r1", service: "Zell am See ↔ Salzburg", price: "220 €" },
    { id: "air-r2", service: "Zell am See ↔ München", price: "480 €" },
    { id: "air-r3", service: "Zell am See ↔ Innsbruck", price: "450 €" },
    { id: "air-r4", service: "Zell am See ↔ Wien", price: "800 €" },
  ];

  // State for the interactive Quick Bar
  const [selectedAirport, setSelectedAirport] = useState("Flughafen Salzburg (SZG)");
  const [selectedDestination, setSelectedDestination] = useState("Zell am See");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [passengers, setPassengers] = useState("1");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const airports: AirportInfo[] = [
    {
      id: "salzburg",
      nameKey: "salzburgAirport",
      codeKey: "salzburgCode",
      distKey: "salzburgDist",
      image: "/images/airports/salzburg-mockup.jpg",
      pickupValue: "Flughafen Salzburg (SZG)",
    },
    {
      id: "munich",
      nameKey: "munichAirport",
      codeKey: "munichCode",
      distKey: "munichDist",
      image: "/images/airports/munich-mockup.jpg",
      pickupValue: "Flughafen München (MUC)",
    },
    {
      id: "vienna",
      nameKey: "viennaAirport",
      codeKey: "viennaCode",
      distKey: "viennaDist",
      image: "/images/airports/vienna-mockup.jpg",
      pickupValue: "Flughafen Wien-Schwechat (VIE)",
    },
    {
      id: "innsbruck",
      nameKey: "innsbruckAirport",
      codeKey: "innsbruckCode",
      distKey: "innsbruckDist",
      image: "/images/airports/innsbruck-mockup.jpg",
      pickupValue: "Flughafen Innsbruck (INN)",
    },
  ];

  const handleAirportCardClick = (airport: AirportInfo) => {
    setSelectedAirport(airport.pickupValue);
    openBooking({ pickup: airport.pickupValue, dropoff: selectedDestination });
  };

  const handleQuickBarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openBooking({
      pickup: selectedAirport,
      dropoff: selectedDestination,
    });
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="w-full max-w-5xl xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 sm:space-y-12 pb-16 sm:pb-24">
      {/* =========================================================================
          HERO CARD (Matching /services/car-rental Style, Home Screen Picture)
          ========================================================================= */}
      <section className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-hairline bg-graphite p-6 sm:p-8 md:p-10 shadow-xl min-h-[170px] sm:min-h-[200px] md:min-h-[225px] flex items-center">
        {/* Background Image: The exact image from the Home Screen (/images/clean-airport.jpg) */}
        <div className="absolute inset-0 pointer-events-none select-none">
          <Image
            src="/images/clean-airport.jpg"
            alt="First Class Drive Airport Transfers"
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

      {/* 2. FOUR AIRPORT CARDS (Salzburg, München, Wien, Innsbruck) */}
      <section className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 md:gap-5">
          {airports.map((airport) => (
            <div
              key={airport.id}
              onClick={() => handleAirportCardClick(airport)}
              className="group cursor-pointer rounded-2xl bg-white/95 hover:bg-white text-obsidian shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border border-white/20 flex flex-col"
            >
              {/* Terminal Thumbnail */}
              <div className="relative w-full h-24 sm:h-28 overflow-hidden bg-slate-900">
                <Image
                  src={airport.image}
                  alt={`${t(airport.nameKey)} (${t(airport.codeKey)})`}
                  fill
                  sizes="(max-width: 640px) 100vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <span className="absolute bottom-2 right-2 text-[10px] font-semibold text-white/90 bg-black/60 px-2 py-0.5 rounded-full backdrop-blur-xs">
                  {t(airport.distKey)}
                </span>
              </div>

              {/* Card Footer Info */}
              <div className="p-3 sm:p-3.5 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 group-hover:bg-[#DFBA73] transition-colors">
                  <Plane className="w-4 h-4 text-obsidian transform -rotate-45" strokeWidth={2} />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-xs sm:text-sm font-bold text-obsidian tracking-tight truncate">
                    {t(airport.nameKey)}
                  </h3>
                  <p className="text-[11px] font-semibold text-slate-500">
                    ({t(airport.codeKey)})
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-obsidian group-hover:translate-x-0.5 transition-all rtl:rotate-180" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. INTERACTIVE BOOKING / INQUIRY QUICK BAR */}
      <section className="w-full">
        <form
          onSubmit={handleQuickBarSubmit}
          className="rounded-2xl lg:rounded-full bg-white text-obsidian shadow-2xl p-3 sm:p-4 border border-white/40"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4 items-center">
            {/* Field 1: Abholflughafen */}
            <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-400 transition-colors">
              <Plane className="w-4 h-4 text-slate-600 shrink-0 transform -rotate-45" strokeWidth={2} />
              <div className="flex-1 min-w-0">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  {t("quickBar.pickupAirport")}
                </label>
                <select
                  value={selectedAirport}
                  onChange={(e) => setSelectedAirport(e.target.value)}
                  className="w-full text-xs font-semibold text-obsidian bg-transparent border-0 p-0 focus:ring-0 cursor-pointer outline-none truncate"
                >
                  <option value="Flughafen Salzburg (SZG)">Salzburg Airport (SZG)</option>
                  <option value="Flughafen München (MUC)">München Airport (MUC)</option>
                  <option value="Flughafen Wien-Schwechat (VIE)">Wien Airport (VIE)</option>
                  <option value="Flughafen Innsbruck (INN)">Innsbruck Airport (INN)</option>
                  <option value="Flughafen Zürich (ZRH)">Zürich Airport (ZRH)</option>
                  <option value="Flughafen Linz (LNZ)">Linz Airport (LNZ)</option>
                </select>
              </div>
            </div>

            {/* Field 2: Zielort */}
            <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-400 transition-colors">
              <MapPin className="w-4 h-4 text-slate-600 shrink-0" strokeWidth={2} />
              <div className="flex-1 min-w-0">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  {t("quickBar.destination")}
                </label>
                <select
                  value={selectedDestination}
                  onChange={(e) => setSelectedDestination(e.target.value)}
                  className="w-full text-xs font-semibold text-obsidian bg-transparent border-0 p-0 focus:ring-0 cursor-pointer outline-none truncate"
                >
                  <option value="Zell am See">Zell am See</option>
                  <option value="Kaprun / Kitzsteinhorn">Kaprun / Kitzsteinhorn</option>
                  <option value="Saalbach-Hinterglemm">Saalbach-Hinterglemm</option>
                  <option value="Kitzbühel">Kitzbühel</option>
                  <option value="Bad Gastein">Bad Gastein</option>
                  <option value="Maria Alm">Maria Alm</option>
                  <option value="Leogang">Leogang</option>
                  <option value="Mittersill">Mittersill</option>
                </select>
              </div>
            </div>

            {/* Field 3: Datum */}
            <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-400 transition-colors">
              <Calendar className="w-4 h-4 text-slate-600 shrink-0" strokeWidth={2} />
              <div className="flex-1 min-w-0">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  {t("quickBar.date")}
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full text-xs font-semibold text-obsidian bg-transparent border-0 p-0 focus:ring-0 cursor-pointer outline-none"
                />
              </div>
            </div>

            {/* Field 4: Uhrzeit */}
            <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-400 transition-colors">
              <Clock className="w-4 h-4 text-slate-600 shrink-0" strokeWidth={2} />
              <div className="flex-1 min-w-0">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  {t("quickBar.time")}
                </label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full text-xs font-semibold text-obsidian bg-transparent border-0 p-0 focus:ring-0 cursor-pointer outline-none"
                />
              </div>
            </div>

            {/* Field 5: Personen */}
            <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-400 transition-colors">
              <Users className="w-4 h-4 text-slate-600 shrink-0" strokeWidth={2} />
              <div className="flex-1 min-w-0">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  {t("quickBar.passengers")}
                </label>
                <select
                  value={passengers}
                  onChange={(e) => setPassengers(e.target.value)}
                  className="w-full text-xs font-semibold text-obsidian bg-transparent border-0 p-0 focus:ring-0 cursor-pointer outline-none"
                >
                  <option value="1">1 {t("quickBar.person")}</option>
                  <option value="2">2 {t("quickBar.persons")}</option>
                  <option value="3">3 {t("quickBar.persons")}</option>
                  <option value="4">4 {t("quickBar.persons")}</option>
                  <option value="5-8">5–8 {t("quickBar.persons")} (VIP Van)</option>
                </select>
              </div>
            </div>

            {/* Field 6: CTA Button */}
            <div className="w-full sm:col-span-2 lg:col-span-1">
              <button
                type="submit"
                className="w-full py-3 px-5 rounded-xl lg:rounded-full bg-gradient-to-r from-[#ECC880] via-[#DFBA73] to-[#C59B4B] hover:brightness-105 active:scale-[0.98] text-obsidian font-bold text-xs sm:text-sm tracking-wide shadow-lg flex items-center justify-center gap-2 transition-all"
              >
                <span>{t("quickBar.cta")}</span>
                <ChevronRight className="w-4 h-4 rtl:rotate-180" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </form>
      </section>

      {/* 4. FOUR QUALITY USPs (Flugüberwachung, Meet & Greet, Festpreise, Bis 8 Personen) */}
      <section className="w-full">
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 md:gap-8">
          {/* USP 1 */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-graphite/90 border border-hairline/80 shadow-md">
            <div className="w-6 h-6 rounded-full bg-[#1B2330] flex items-center justify-center shrink-0">
              <Plane className="w-3.5 h-3.5 text-[#DFBA73] transform -rotate-45" strokeWidth={2} />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-platinum-mid">
              {t("usps.flightMonitoring")}
            </span>
          </div>

          {/* USP 2 */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-graphite/90 border border-hairline/80 shadow-md">
            <div className="w-6 h-6 rounded-full bg-[#1B2330] flex items-center justify-center shrink-0">
              <Handshake className="w-3.5 h-3.5 text-[#DFBA73]" strokeWidth={2} />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-platinum-mid">
              {t("usps.meetGreet")}
            </span>
          </div>

          {/* USP 3 */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-graphite/90 border border-hairline/80 shadow-md">
            <div className="w-6 h-6 rounded-full bg-[#1B2330] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 text-[#DFBA73]" strokeWidth={2} />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-platinum-mid">
              {t("usps.fixedPrice")}
            </span>
          </div>

          {/* USP 4 */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-graphite/90 border border-hairline/80 shadow-md">
            <div className="w-6 h-6 rounded-full bg-[#1B2330] flex items-center justify-center shrink-0">
              <Users className="w-3.5 h-3.5 text-[#DFBA73]" strokeWidth={2} />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-platinum-mid">
              {t("usps.upTo8")}
            </span>
          </div>
        </div>
      </section>

      {/* 5. BELIEBTE ROUTEN (POPULAR ROUTES SECTION) */}
      <section className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Section Header on Left */}
          <div className="lg:col-span-3 space-y-1.5 text-left rtl:text-right">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-serif sm:font-sans">
              {t("routes.title")}
            </h2>
            <p className="text-xs sm:text-sm text-silver-muted font-normal">
              {t("routes.subtitle")}
            </p>
          </div>

          {/* Route Cards on Right - Live updated, edited or deleted from /admin/pricing */}
          <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5 sm:gap-4">
            {(liveAirportRoutes.length > 0 ? liveAirportRoutes : fallbackRoutes).map((route) => {
              const routeImage = getRouteImage(route.service, route.id);
              const routeTitle = getRouteTitle(route.id, route.service);
              const { pickup, dropoff } = getRoutePickupDropoff(route.service);

              return (
                <div
                  key={route.id}
                  onClick={() => openBooking({ pickup, dropoff })}
                  className="group cursor-pointer rounded-2xl bg-white/95 hover:bg-white text-obsidian shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border border-white/20 flex flex-col justify-between"
                >
                  <div className="p-3.5 sm:p-4">
                    <h3 className="text-xs sm:text-sm font-bold text-obsidian tracking-tight truncate">
                      {routeTitle}
                    </h3>
                    <div className="mt-2 flex items-center gap-2">
                      {route.price ? (
                        <>
                          <span className="text-xs font-semibold text-slate-500">
                            {t("routes.fromPrice")}
                          </span>
                          <span className="text-sm font-extrabold text-obsidian">
                            {route.price}
                          </span>
                        </>
                      ) : (
                        <span className="text-xs font-semibold text-slate-500">
                          {tCommon("onDemand")}
                        </span>
                      )}
                      <div className="w-6 h-6 rounded-full bg-[#ECC880] flex items-center justify-center shrink-0 ml-auto group-hover:scale-110 transition-transform">
                        <ArrowRight className="w-3.5 h-3.5 text-obsidian rtl:rotate-180" strokeWidth={2.5} />
                      </div>
                    </div>
                  </div>

                  {/* Clean city photography (no baked-in prices or text) */}
                  <div className="relative w-full h-24 sm:h-28 bg-slate-900 overflow-hidden">
                    <Image
                      src={routeImage}
                      alt={routeTitle}
                      fill
                      sizes="(max-width: 640px) 100vw, 25vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. BOTTOM CONTACT / REGION BAR (Matching Mockup) */}
      <section className="w-full">
        <div className="rounded-2xl lg:rounded-full bg-graphite-elevated border border-hairline/90 p-4 sm:p-5 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 sm:gap-8">
            {/* Phone */}
            <a
              href="tel:+436601234567"
              className="flex items-center gap-3 text-left rtl:text-right group"
            >
              <div className="w-9 h-9 rounded-full bg-obsidian-soft border border-hairline flex items-center justify-center group-hover:border-[#DFBA73] transition-colors">
                <Phone className="w-4 h-4 text-[#DFBA73]" strokeWidth={1.8} />
              </div>
              <div>
                <span className="block text-xs sm:text-sm font-bold text-white group-hover:text-[#DFBA73] transition-colors">
                  {t("contactBar.phone")}
                </span>
                <span className="block text-[11px] text-silver-muted">
                  {t("contactBar.phoneLabel")}
                </span>
              </div>
            </a>

            {/* Email */}
            <a
              href="mailto:info@firstclass-drive.at"
              className="flex items-center gap-3 text-left rtl:text-right group"
            >
              <div className="w-9 h-9 rounded-full bg-obsidian-soft border border-hairline flex items-center justify-center group-hover:border-[#DFBA73] transition-colors">
                <Mail className="w-4 h-4 text-[#DFBA73]" strokeWidth={1.8} />
              </div>
              <div>
                <span className="block text-xs sm:text-sm font-bold text-white group-hover:text-[#DFBA73] transition-colors">
                  {t("contactBar.email")}
                </span>
                <span className="block text-[11px] text-silver-muted">
                  {t("contactBar.emailLabel")}
                </span>
              </div>
            </a>

            {/* Location */}
            <div className="flex items-center gap-3 text-left rtl:text-right">
              <div className="w-9 h-9 rounded-full bg-obsidian-soft border border-hairline flex items-center justify-center">
                <MapPin className="w-4 h-4 text-[#DFBA73]" strokeWidth={1.8} />
              </div>
              <div>
                <span className="block text-xs sm:text-sm font-bold text-white">
                  {t("contactBar.location")}
                </span>
                <span className="block text-[11px] text-silver-muted">
                  {t("contactBar.locationLabel")}
                </span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button
            type="button"
            onClick={() => openBooking({ pickup: selectedAirport, dropoff: selectedDestination })}
            className="w-full sm:w-auto py-2.5 px-6 rounded-full bg-gradient-to-r from-[#ECC880] via-[#DFBA73] to-[#C59B4B] hover:brightness-105 active:scale-[0.98] text-obsidian font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all"
          >
            <span>{t("contactBar.cta")}</span>
            <ChevronRight className="w-4 h-4 text-obsidian rtl:rotate-180" strokeWidth={2.5} />
          </button>
        </div>
      </section>

      {/* 7. ACCORDION FAQ SECTION (FOR RICH GOOGLE SNIPPETS) */}
      <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-graphite border border-hairline space-y-6 shadow-xl">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center gap-2 text-[#DFBA73] text-xs font-bold uppercase tracking-wider">
              <HelpCircle className="w-4 h-4" />
              <span>FAQ</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              {t("faq.title")}
            </h2>
          </div>

          <div className="space-y-3 pt-2">
            {[1, 2, 3, 4].map((idx) => {
              const qKey = `faq.q${idx}` as const;
              const aKey = `faq.a${idx}` as const;
              const isOpen = openFaq === idx;

              return (
                <div
                  key={idx}
                  className="rounded-xl bg-obsidian-soft border border-hairline/70 overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left rtl:text-right text-sm sm:text-base font-bold text-white hover:text-[#DFBA73] transition-colors"
                  >
                    <span>{t(qKey)}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-silver-muted shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-[#DFBA73]" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-silver-muted leading-relaxed border-t border-hairline/40 pt-3">
                      {t(aKey)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
