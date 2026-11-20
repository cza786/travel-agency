"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  Plane,
  Building2,
  Mountain,
  Info,
  Route,
  MapPin,
  Gauge,
  Clock,
  Coins,
  ShieldCheck,
  ArrowRight,
  Link2,
  Users,
} from "lucide-react";
import { useBookingModal } from "./BookingModal";
import { useLivePricing } from "@/lib/useLivePricing";

interface FixedPriceRoute {
  id: string;
  from: string;
  to: string;
  price: string;
  numericPrice: number;
  iconType: "plane" | "city" | "mountain";
  distanceKm: number;
}

export function PricesSection() {
  const t = useTranslations("prices");
  const tCommon = useTranslations("common");
  const { openBooking } = useBookingModal();
  const { getPrice } = useLivePricing();

  const fixedRoutes: FixedPriceRoute[] = [
    {
      id: "szg-zas",
      from: t("routeSalzburgAirport"),
      to: t("routeZellAmSeeKaprun"),
      price: "220 €",
      numericPrice: 220,
      iconType: "plane",
      distanceKm: 80,
    },
    {
      id: "szg-saalbach",
      from: t("routeSalzburgAirport"),
      to: t("routeSaalbach"),
      price: "240 €",
      numericPrice: 240,
      iconType: "plane",
      distanceKm: 88,
    },
    {
      id: "muc-zas",
      from: t("routeMunichAirport"),
      to: t("routeZellAmSeeKaprun"),
      price: "480 €",
      numericPrice: 480,
      iconType: "plane",
      distanceKm: 215,
    },
    {
      id: "muc-saalbach",
      from: t("routeMunichAirport"),
      to: t("routeSaalbach"),
      price: "500 €",
      numericPrice: 500,
      iconType: "plane",
      distanceKm: 225,
    },
    {
      id: "vie-zas",
      from: t("routeViennaAirport"),
      to: t("routeZellAmSeeKaprun"),
      price: "800 €",
      numericPrice: 800,
      iconType: "plane",
      distanceKm: 395,
    },
    {
      id: "mil-zas",
      from: t("routeMilan"),
      to: t("routeZellAmSeeKaprun"),
      price: "1.200 €",
      numericPrice: 1200,
      iconType: "city",
      distanceKm: 480,
    },
    {
      id: "inl-zas",
      from: t("routeInterlaken"),
      to: t("routeZellAmSee"),
      price: "1.200 €",
      numericPrice: 1200,
      iconType: "mountain",
      distanceKm: 490,
    },
    {
      id: "inn-zas",
      from: t("routeInnsbruckAirport"),
      to: t("routeZellAmSeeKaprun"),
      price: "400 €",
      numericPrice: 400,
      iconType: "plane",
      distanceKm: 145,
    },
  ];

  const getRouteIcon = (type: "plane" | "city" | "mountain") => {
    switch (type) {
      case "plane":
        return <Plane className="w-4 h-4 sm:w-5 sm:h-5 text-platinum-light" strokeWidth={1.5} />;
      case "city":
        return <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-platinum-light" strokeWidth={1.5} />;
      case "mountain":
        return <Mountain className="w-4 h-4 sm:w-5 sm:h-5 text-platinum-light" strokeWidth={1.5} />;
    }
  };

  return (
    <div className="w-full space-y-8 sm:space-y-12">
      {/* 1. Fixed Price Table matching Screenshot 2 (Responsive: 1 col on mobile, 2 cols on tablet/desktop) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-graphite border border-hairline flex items-center justify-center shrink-0">
            <span className="text-xs">🏷️</span>
          </div>
          <div>
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-white">
              {t("fixedSectionTitle")}
            </h3>
            <p className="text-xs sm:text-sm text-silver-muted">
              {t("fixedSectionSubtitle")}
            </p>
          </div>
        </div>

        {/* Route Cards List matching Screenshot 2 (clean single column stack) */}
        <div className="flex flex-col gap-2.5 sm:gap-3">
          {fixedRoutes.map((route) => (
            <div
              key={route.id}
              onClick={() => openBooking({ pickup: route.from, dropoff: route.to })}
              className="group relative flex items-center justify-between bg-graphite hover:bg-graphite-elevated border border-hairline rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 hover:border-platinum-dark/60 hover:shadow-lg shadow-sm"
            >
              {/* Left Route Info */}
              <div className="flex items-center gap-2.5 sm:gap-3.5 py-3 sm:py-3.5 pl-3 sm:pl-4 pr-2 flex-1 min-w-0">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-obsidian-soft border border-hairline/80 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  {getRouteIcon(route.iconType)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs sm:text-sm font-semibold text-platinum-light truncate group-hover:text-white transition-colors">
                    <span>{route.from}</span>
                    <span className="text-silver-muted font-normal mx-1">↔</span>
                    <span>{route.to}</span>
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-silver-muted flex items-center gap-2 mt-0.5">
                    <span>{tCommon("approx")} {route.distanceKm} km</span>
                    <span>•</span>
                    <span className="text-platinum-mid/90 group-hover:text-platinum-light font-medium">
                      {t("directInquiry")} ➔
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Slanted Brushed Silver Metallic Badge */}
              <div className="relative shrink-0 flex items-center justify-center pl-4 sm:pl-6 pr-3 sm:pr-5 py-3 sm:py-3.5 bg-silver-metallic text-obsidian font-extrabold text-xs sm:text-sm md:text-base tracking-tight shadow-md clip-diagonal transition-transform group-hover:brightness-105 min-w-[76px] sm:min-w-[90px] text-right">
                <span>{getPrice(route.id, route.price)}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Info Note Box matching Screenshot 2 */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-graphite/70 border border-hairline flex items-start gap-3 text-xs sm:text-sm text-silver-muted">
          <Info className="w-5 h-5 text-platinum-dark shrink-0 mt-0.5" strokeWidth={1.5} />
          <p className="leading-relaxed">
            {t("note")}
          </p>
        </div>
      </section>

      {/* 2. Kilometertarife — Premium single-tile horizontal row with respective background pictures */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-graphite border border-hairline flex items-center justify-center shrink-0">
            <Route className="w-4 h-4 text-platinum-light" strokeWidth={1.5} />
          </div>
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-white">
            {t("kmSectionTitle")}
          </h3>
        </div>

        <div
          onClick={() => openBooking({ pickup: "Zell am See", dropoff: t("calculateTrip") })}
          className="group relative rounded-2xl bg-graphite border border-hairline overflow-hidden cursor-pointer hover:border-[#DFBA73]/40 transition-all duration-300 hover:shadow-2xl shadow-sm"
        >
          <div className="flex items-stretch flex-col sm:flex-row">
            {/* Column 1: Short trips (< 50 km) — City / Salzburg Background */}
            <div className="relative flex-1 p-4 sm:p-5 flex items-center gap-3 sm:gap-4 border-b sm:border-b-0 sm:border-r border-hairline/60 overflow-hidden min-h-[96px] sm:min-h-[118px]">
              {/* Respective Background Image: City / Salzburg luxury sedan */}
              <div className="absolute inset-0 pointer-events-none select-none">
                <Image
                  src="/images/tariffs/col1-city-short.jpg"
                  alt="City and short trip luxury transfers"
                  fill
                  quality={90}
                  sizes="(max-width: 640px) 100vw, 400px"
                  className="object-cover object-right opacity-35 group-hover:opacity-45 transition-opacity duration-500"
                />
                {/* Soft directional gradient: dark on text side, subtle fade over vehicle */}
                <div className="absolute inset-0 bg-gradient-to-r rtl:bg-gradient-to-l from-obsidian via-obsidian/80 to-obsidian/30" />
              </div>

              {/* Foreground Content */}
              <div className="relative z-10 flex items-center gap-3 sm:gap-4 min-w-0">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-obsidian/80 backdrop-blur-md border border-[#DFBA73]/30 flex items-center justify-center shrink-0 shadow-md group-hover:border-[#DFBA73]/60 transition-colors">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#DFBA73]" strokeWidth={1.8} />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] sm:text-[11px] text-[#DFBA73] font-bold uppercase tracking-wider mb-0.5">
                    {t("kmTierShort")}
                  </div>
                  <div className="text-base sm:text-lg md:text-xl font-extrabold text-white tracking-tight leading-tight">
                    {getPrice("km-short", "3.10 € / km")}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-silver-muted mt-0.5 font-normal">
                    {t("kmTierShortDesc")}
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2: Longer journeys (>= 50 km) — Alpine Mountain Highway Background */}
            <div className="relative flex-1 p-4 sm:p-5 flex items-center gap-3 sm:gap-4 overflow-hidden min-h-[96px] sm:min-h-[118px]">
              {/* Respective Background Image: Alpine mountain highway Mercedes SUV */}
              <div className="absolute inset-0 pointer-events-none select-none">
                <Image
                  src="/images/tariffs/col2-alpine-long.jpg"
                  alt="Alpine mountain highway transfers"
                  fill
                  quality={90}
                  sizes="(max-width: 640px) 100vw, 400px"
                  className="object-cover object-right opacity-35 group-hover:opacity-45 transition-opacity duration-500"
                />
                {/* Soft directional gradient: dark on text side, subtle fade over vehicle */}
                <div className="absolute inset-0 bg-gradient-to-r rtl:bg-gradient-to-l from-obsidian via-obsidian/80 to-obsidian/30" />
              </div>

              {/* Foreground Content with soft, muted luxury tones (no sharp neon colors) */}
              <div className="relative z-10 flex items-center gap-3 sm:gap-4 min-w-0">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-obsidian/80 backdrop-blur-md border border-white/15 flex items-center justify-center shrink-0 shadow-md group-hover:border-[#DFBA73]/40 transition-colors">
                  <Route className="w-4 h-4 sm:w-5 sm:h-5 text-platinum-light" strokeWidth={1.8} />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] sm:text-[11px] text-platinum-light font-bold uppercase tracking-wider mb-0.5">
                    {t("kmTierLong")}
                  </div>
                  <div className="text-base sm:text-lg md:text-xl font-extrabold text-white tracking-tight leading-tight">
                    {getPrice("km-long", "2.80 € / km")}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-silver-muted mt-0.5 font-normal">
                    {t("kmTierLongDesc")}
                  </div>
                </div>
              </div>
            </div>

            {/* Column 3: Threshold Board (50 km) — Alpine Road / Horizon Milestone Background */}
            <div className="relative hidden sm:flex flex-col items-center justify-center px-5 sm:px-7 md:px-9 border-l border-hairline/60 shrink-0 min-w-[130px] sm:min-w-[150px] overflow-hidden">
              {/* Respective Background Image: Scenic alpine highway curving towards mountains */}
              <div className="absolute inset-0 pointer-events-none select-none">
                <Image
                  src="/images/tariffs/col3-threshold-road.jpg"
                  alt="50 km distance threshold route"
                  fill
                  quality={90}
                  sizes="200px"
                  className="object-cover object-center opacity-30 group-hover:opacity-40 transition-opacity duration-500"
                />
                {/* Soft gradient overlay for smooth visual depth */}
                <div className="absolute inset-0 bg-gradient-to-b from-obsidian/85 via-obsidian/70 to-obsidian/90" />
              </div>

              {/* Foreground Content */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="text-[9.5px] sm:text-[10px] text-silver-muted font-semibold uppercase tracking-widest mb-1.5 drop-shadow-sm">
                  {t("kmThresholdLabel")}
                </div>

                {/* Road sign style circular board with subtle warm gold border */}
                <div className="w-16 h-16 sm:w-[70px] sm:h-[70px] rounded-full border-2 border-[#DFBA73]/80 bg-obsidian/90 backdrop-blur-md flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.6)] group-hover:shadow-[0_0_24px_rgba(223,186,115,0.22)] transition-shadow">
                  <div className="text-center">
                    <span className="text-lg sm:text-xl font-black text-white leading-none">50</span>
                    <div className="text-[9px] sm:text-[10px] font-bold text-[#DFBA73] uppercase tracking-wider -mt-0.5">km</div>
                  </div>
                </div>

                <div className="text-[9px] sm:text-[10px] text-silver-muted/80 mt-1.5 text-center leading-tight">
                  {t("kmNote")}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile: 50 km board + CTA row */}
          <div className="relative flex sm:hidden items-center justify-between px-4 py-3 border-t border-hairline/60 bg-graphite-elevated/80 overflow-hidden">
            {/* Background image for mobile footer */}
            <div className="absolute inset-0 pointer-events-none select-none">
              <Image
                src="/images/tariffs/col3-threshold-road.jpg"
                alt="50 km distance threshold"
                fill
                quality={85}
                sizes="100vw"
                className="object-cover object-center opacity-20"
              />
              <div className="absolute inset-0 bg-obsidian/70" />
            </div>

            <div className="relative z-10 flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full border-2 border-[#DFBA73]/80 bg-obsidian/90 flex items-center justify-center shadow-md">
                <div className="text-center">
                  <span className="text-xs font-black text-white leading-none">50</span>
                  <div className="text-[7.5px] font-bold text-[#DFBA73] uppercase -mt-0.5">km</div>
                </div>
              </div>
              <span className="text-[10px] text-silver-muted">{t("kmNote")}</span>
            </div>
            <span className="relative z-10 text-[11px] font-bold text-[#DFBA73] flex items-center gap-1">
              {t("calculateTrip")} ➔
            </span>
          </div>

          {/* Desktop: subtle CTA at bottom-right */}
          <div className="hidden sm:flex items-center justify-end px-5 py-2.5 border-t border-hairline/40 bg-graphite-elevated/40 backdrop-blur-xs">
            <span className="text-[11px] sm:text-xs font-bold text-[#DFBA73] group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform flex items-center gap-1.5">
              {t("calculateTrip")} <span className="text-sm">➔</span>
            </span>
          </div>
        </div>
      </section>

      {/* 3. Official Municipal Taximeter Tariffs (Saalbach-Hinterglemm & Zell am See/Kaprun) */}
      <section className="space-y-4 pt-1">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-graphite border border-hairline flex items-center justify-center shrink-0">
            <Gauge className="w-4 h-4 text-[#DFBA73]" strokeWidth={1.75} />
          </div>
          <div>
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-white tracking-tight">
              {t("taximeterSectionTitle")}
            </h3>
            <p className="text-xs sm:text-sm text-silver-muted">
              {t("taximeterSubtitle")}
            </p>
          </div>
        </div>

        {/* 2 Regional Tariff Cards (1 col on mobile/tablet, 2 cols on lg desktop screens) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Card 1: Saalbach-Hinterglemm */}
          <div className="relative rounded-2xl sm:rounded-3xl bg-[#0F1318] border border-hairline/80 overflow-hidden shadow-xl flex flex-col justify-between hover:border-[#DFBA73]/40 transition-colors duration-300">
            {/* Header with alpine village / cable car scenery */}
            <div className="relative min-h-[96px] sm:min-h-[104px] px-5 sm:px-7 py-4 sm:py-5 flex items-center justify-between overflow-hidden border-b border-[#DFBA73]/30">
              <div className="absolute right-0 rtl:right-auto rtl:left-0 top-0 bottom-0 w-3/5 sm:w-1/2 pointer-events-none select-none">
                <Image
                  src="/images/tariffs/saalbach-clean-2x.jpg"
                  alt="Saalbach-Hinterglemm"
                  fill
                  quality={95}
                  sizes="(max-width: 1024px) 60vw, 400px"
                  className="object-cover object-right rtl:object-left"
                />
                <div className="absolute inset-0 bg-gradient-to-r rtl:bg-gradient-to-l from-[#0F1318] via-[#0F1318]/75 to-transparent" />
              </div>

              <div className="relative z-10 flex items-center gap-3.5 sm:gap-4 min-w-0">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-obsidian/85 backdrop-blur-md border border-[#DFBA73]/40 flex items-center justify-center shrink-0 shadow-md">
                  <MapPin className="w-5 h-5 text-[#DFBA73]" strokeWidth={2} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-white tracking-tight drop-shadow-sm truncate">
                    {t("saalbachTitle")}
                  </h3>
                  <p className="text-xs sm:text-sm text-silver-muted drop-shadow-sm truncate">
                    {t("saalbachSubtitle")}
                  </p>
                </div>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-5 sm:p-7 space-y-4 sm:space-y-5 flex-1 flex flex-col justify-between">
              {/* Item 1: Als Grundtaxe */}
              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-[#DFBA73] text-obsidian font-extrabold text-xs flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                  1
                </div>
                <div className="flex-1 min-w-0 space-y-2.5">
                  <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
                    {t("baseFareTitle")}
                  </h4>
                  <div className="space-y-1.5">
                    {/* Bullet 1 */}
                    <div className="flex items-baseline justify-between gap-3 text-xs sm:text-sm">
                      <div className="flex items-baseline gap-2 min-w-0">
                        <span className="text-[#DFBA73] font-bold shrink-0">•</span>
                        <span className="text-platinum-mid leading-relaxed">{t("baseFareDay")}</span>
                      </div>
                      <span className="font-extrabold text-white text-sm sm:text-base shrink-0 whitespace-nowrap">
                        {getPrice("saalbach-base-day", "€ 8,80")}
                      </span>
                    </div>
                    {/* Bullet 2 */}
                    <div className="flex items-baseline justify-between gap-3 text-xs sm:text-sm">
                      <div className="flex items-baseline gap-2 min-w-0">
                        <span className="text-[#DFBA73] font-bold shrink-0">•</span>
                        <span className="text-platinum-mid leading-relaxed">{t("baseFareNight")}</span>
                      </div>
                      <span className="font-extrabold text-white text-sm sm:text-base shrink-0 whitespace-nowrap">
                        {getPrice("saalbach-base-night", "€ 9,80")}
                      </span>
                    </div>
                  </div>

                  {/* Info Callout */}
                  <div className="mt-2.5 p-3 sm:p-3.5 rounded-xl bg-graphite-elevated/70 border border-hairline/70 flex items-start gap-3 text-xs text-silver-muted leading-relaxed">
                    <Info className="w-4 h-4 text-[#DFBA73]/80 shrink-0 mt-0.5" strokeWidth={1.75} />
                    <p className="leading-relaxed">{t("saalbachBaseFareInfo")}</p>
                  </div>
                </div>
              </div>

              {/* Item 2: Als Streckentaxe I */}
              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-[#DFBA73] text-obsidian font-extrabold text-xs flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                  2
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-3">
                    <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
                      {t("saalbachDistanceFare1Title")}
                    </h4>
                    <span className="font-extrabold text-white text-sm sm:text-base shrink-0 whitespace-nowrap">
                      {getPrice("saalbach-dist-1", "€ 0,30")}
                    </span>
                  </div>
                  <p className="text-xs sm:text-[13px] text-silver-muted leading-relaxed mt-1">
                    {t("saalbachDistanceFare1Desc")}
                  </p>
                </div>
              </div>

              {/* Item 3: Als Streckentaxe II */}
              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-[#DFBA73] text-obsidian font-extrabold text-xs flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                  3
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-3">
                    <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
                      {t("saalbachDistanceFare2Title")}
                    </h4>
                    <span className="font-extrabold text-white text-sm sm:text-base shrink-0 whitespace-nowrap">
                      {getPrice("saalbach-dist-2", "€ 0,30")}
                    </span>
                  </div>
                  <p className="text-xs sm:text-[13px] text-silver-muted leading-relaxed mt-1">
                    {t("saalbachDistanceFare2Desc")}
                  </p>
                </div>
              </div>

              {/* Item 4: Als Zeittaxe */}
              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-[#DFBA73] text-obsidian font-extrabold text-xs flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                  4
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-3">
                    <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
                      {t("saalbachTimeFareTitle")}
                    </h4>
                    <span className="font-extrabold text-white text-sm sm:text-base shrink-0 whitespace-nowrap">
                      {getPrice("saalbach-time", "€ 0,30")}
                    </span>
                  </div>
                  <p className="text-xs sm:text-[13px] text-silver-muted leading-relaxed mt-1">
                    {t("saalbachTimeFareDesc")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Zell am See/Kaprun */}
          <div className="relative rounded-2xl sm:rounded-3xl bg-[#0F1318] border border-hairline/80 overflow-hidden shadow-xl flex flex-col justify-between hover:border-[#DFBA73]/40 transition-colors duration-300">
            {/* Header with Zell lake & church scenery */}
            <div className="relative min-h-[96px] sm:min-h-[104px] px-5 sm:px-7 py-4 sm:py-5 flex items-center justify-between overflow-hidden border-b border-[#DFBA73]/30">
              <div className="absolute right-0 rtl:right-auto rtl:left-0 top-0 bottom-0 w-3/5 sm:w-1/2 pointer-events-none select-none">
                <Image
                  src="/images/tariffs/zell-clean-2x.jpg"
                  alt="Zell am See/Kaprun"
                  fill
                  quality={95}
                  sizes="(max-width: 1024px) 60vw, 400px"
                  className="object-cover object-right rtl:object-left"
                />
                <div className="absolute inset-0 bg-gradient-to-r rtl:bg-gradient-to-l from-[#0F1318] via-[#0F1318]/75 to-transparent" />
              </div>

              <div className="relative z-10 flex items-center gap-3.5 sm:gap-4 min-w-0">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-obsidian/85 backdrop-blur-md border border-[#DFBA73]/40 flex items-center justify-center shrink-0 shadow-md">
                  <MapPin className="w-5 h-5 text-[#DFBA73]" strokeWidth={2} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-white tracking-tight drop-shadow-sm truncate">
                    {t("zellTitle")}
                  </h3>
                  <p className="text-xs sm:text-sm text-silver-muted drop-shadow-sm truncate">
                    {t("zellSubtitle")}
                  </p>
                </div>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-5 sm:p-7 space-y-4 sm:space-y-5 flex-1 flex flex-col justify-between">
              {/* Item 1: Als Grundtaxe */}
              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-[#DFBA73] text-obsidian font-extrabold text-xs flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                  1
                </div>
                <div className="flex-1 min-w-0 space-y-2.5">
                  <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
                    {t("baseFareTitle")}
                  </h4>
                  <div className="space-y-1.5">
                    {/* Bullet 1 */}
                    <div className="flex items-baseline justify-between gap-3 text-xs sm:text-sm">
                      <div className="flex items-baseline gap-2 min-w-0">
                        <span className="text-[#DFBA73] font-bold shrink-0">•</span>
                        <span className="text-platinum-mid leading-relaxed">{t("baseFareDay")}</span>
                      </div>
                      <span className="font-extrabold text-white text-sm sm:text-base shrink-0 whitespace-nowrap">
                        {getPrice("zell-base-day", "€ 7,60")}
                      </span>
                    </div>
                    {/* Bullet 2 */}
                    <div className="flex items-baseline justify-between gap-3 text-xs sm:text-sm">
                      <div className="flex items-baseline gap-2 min-w-0">
                        <span className="text-[#DFBA73] font-bold shrink-0">•</span>
                        <span className="text-platinum-mid leading-relaxed">{t("baseFareNight")}</span>
                      </div>
                      <span className="font-extrabold text-white text-sm sm:text-base shrink-0 whitespace-nowrap">
                        {getPrice("zell-base-night", "€ 8,80")}
                      </span>
                    </div>
                  </div>

                  {/* Info Callout */}
                  <div className="mt-2.5 p-3 sm:p-3.5 rounded-xl bg-graphite-elevated/70 border border-hairline/70 flex items-start gap-3 text-xs text-silver-muted leading-relaxed">
                    <Info className="w-4 h-4 text-[#DFBA73]/80 shrink-0 mt-0.5" strokeWidth={1.75} />
                    <p className="leading-relaxed">{t("zellBaseFareInfo")}</p>
                  </div>
                </div>
              </div>

              {/* Item 2: Als Streckentaxe */}
              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-[#DFBA73] text-obsidian font-extrabold text-xs flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                  2
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-3">
                    <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
                      {t("zellDistanceFareTitle")}
                    </h4>
                    <span className="font-extrabold text-white text-sm sm:text-base shrink-0 whitespace-nowrap">
                      {getPrice("zell-dist", "€ 0,30")}
                    </span>
                  </div>
                  <p className="text-xs sm:text-[13px] text-silver-muted leading-relaxed mt-1">
                    {t("zellDistanceFareDesc")}
                  </p>
                </div>
              </div>

              {/* Item 3: Als Zeittaxe */}
              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-[#DFBA73] text-obsidian font-extrabold text-xs flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                  3
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-3">
                    <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
                      {t("zellTimeFareTitle")}
                    </h4>
                    <span className="font-extrabold text-white text-sm sm:text-base shrink-0 whitespace-nowrap">
                      {getPrice("zell-time", "€ 0,30")}
                    </span>
                  </div>
                  <p className="text-xs sm:text-[13px] text-silver-muted leading-relaxed mt-1">
                    {t("zellTimeFareDesc")}
                  </p>
                </div>
              </div>

              {/* Item 4: Als Zuschlag */}
              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-[#DFBA73] text-obsidian font-extrabold text-xs flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                  4
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-3">
                    <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
                      {t("zellSurchargeTitle")}
                    </h4>
                    <span className="font-extrabold text-white text-sm sm:text-base shrink-0 whitespace-nowrap">
                      {getPrice("zell-surcharge", "€ 3,70")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Surcharges Section matching the reference layout & fully responsive */}
        <div className="rounded-2xl sm:rounded-3xl bg-[#0F1318] border border-hairline/80 px-5 sm:px-7 md:px-8 py-4 sm:py-5 shadow-xl">
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-5 xl:gap-0">
            {/* 1. Left: Title & Condition */}
            <div className="flex items-center gap-3.5 shrink-0 xl:pr-6">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-obsidian/85 border border-[#DFBA73]/30 flex items-center justify-center shrink-0 shadow-sm">
                <Coins className="w-5 h-5 text-[#DFBA73]" strokeWidth={1.75} />
              </div>
              <div className="min-w-0">
                <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {t("surchargesTitle")}
                </h4>
                <p className="text-[11px] sm:text-xs text-silver-muted leading-tight">
                  {t("surchargesCondition")}
                </p>
              </div>
            </div>

            {/* Vertical Divider 1 */}
            <div className="hidden xl:block w-px h-12 bg-hairline/70 shrink-0 self-center" />

            {/* 2. Middle: 3 Conditions with dividers & natural flowing text */}
            <div className="flex flex-col sm:flex-row sm:items-center flex-1 justify-between gap-4 sm:gap-6 xl:px-6">
              {/* Condition 1: Montage von Ketten */}
              <div className="flex items-start gap-3 min-w-0 sm:flex-1">
                <Link2 className="w-4 h-4 text-[#DFBA73] shrink-0 mt-0.5 rotate-45" strokeWidth={2} />
                <div className="min-w-0 text-xs sm:text-[13px] leading-snug">
                  <span className="text-platinum-mid font-medium block">
                    {t("surchargeChains")}
                  </span>
                  <span className="text-[#DFBA73] font-bold mt-0.5 block">
                    {t("surchargeChainsValue")}
                  </span>
                </div>
              </div>

              {/* Vertical Divider 2 */}
              <div className="hidden sm:block w-px h-10 bg-hairline/60 shrink-0 self-center" />

              {/* Condition 2: Beförderung von mehr als 4 Personen */}
              <div className="flex items-start gap-3 min-w-0 sm:flex-1">
                <Users className="w-4 h-4 text-[#DFBA73] shrink-0 mt-0.5" strokeWidth={2} />
                <div className="min-w-0 text-xs sm:text-[13px] leading-snug">
                  <span className="text-platinum-mid font-medium block">
                    {t("surchargePassengers")}
                  </span>
                  <span className="text-[#DFBA73] font-bold mt-0.5 block">
                    {t("surchargePassengersValue")}
                  </span>
                </div>
              </div>

              {/* Vertical Divider 3 */}
              <div className="hidden sm:block w-px h-10 bg-hairline/60 shrink-0 self-center" />

              {/* Condition 3: Bergfahrten */}
              <div className="flex items-start gap-3 min-w-0 sm:flex-none">
                <Mountain className="w-4 h-4 text-[#DFBA73] shrink-0 mt-0.5" strokeWidth={2} />
                <div className="min-w-0 text-xs sm:text-[13px] leading-snug">
                  <span className="text-platinum-mid font-medium block whitespace-nowrap">
                    {t("surchargeMountain")}
                  </span>
                </div>
              </div>
            </div>

            {/* Vertical Divider 4 */}
            <div className="hidden xl:block w-px h-12 bg-hairline/70 shrink-0 self-center" />

            {/* 3. Right: Book Your Ride CTA */}
            <div className="shrink-0 flex items-center justify-end xl:pl-6 pt-2 xl:pt-0">
              <button
                type="button"
                onClick={() => openBooking({ pickup: t("saalbachOrZell"), dropoff: t("taximeterTripDropoff") })}
                className="w-full sm:w-auto px-6 py-2.5 sm:py-3 rounded-full bg-obsidian-soft hover:bg-obsidian border border-[#DFBA73]/50 hover:border-[#DFBA73] text-white hover:text-[#DFBA73] font-bold text-xs sm:text-sm tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer group whitespace-nowrap"
              >
                <span>{t("bookYourRide")}</span>
                <ArrowRight className="w-4 h-4 text-[#DFBA73] group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform rtl:rotate-180" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
