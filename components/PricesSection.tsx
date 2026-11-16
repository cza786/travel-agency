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
      from: "Salzburg Flughafen",
      to: "Zell am See / Kaprun",
      price: "220 €",
      numericPrice: 220,
      iconType: "plane",
      distanceKm: 80,
    },
    {
      id: "szg-saalbach",
      from: "Salzburg Flughafen",
      to: "Saalbach",
      price: "240 €",
      numericPrice: 240,
      iconType: "plane",
      distanceKm: 88,
    },
    {
      id: "muc-zas",
      from: "München Flughafen",
      to: "Zell am See / Kaprun",
      price: "480 €",
      numericPrice: 480,
      iconType: "plane",
      distanceKm: 215,
    },
    {
      id: "muc-saalbach",
      from: "München Flughafen",
      to: "Saalbach",
      price: "500 €",
      numericPrice: 500,
      iconType: "plane",
      distanceKm: 225,
    },
    {
      id: "vie-zas",
      from: "Wien Flughafen",
      to: "Zell am See / Kaprun",
      price: "800 €",
      numericPrice: 800,
      iconType: "plane",
      distanceKm: 395,
    },
    {
      id: "mil-zas",
      from: "Mailand",
      to: "Zell am See / Kaprun",
      price: "1.200 €",
      numericPrice: 1200,
      iconType: "city",
      distanceKm: 480,
    },
    {
      id: "inl-zas",
      from: "Interlaken",
      to: "Zell am See",
      price: "1.200 €",
      numericPrice: 1200,
      iconType: "mountain",
      distanceKm: 490,
    },
    {
      id: "inn-zas",
      from: "Innsbruck Flughafen",
      to: "Zell am See / Kaprun",
      price: "320 €",
      numericPrice: 320,
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
    </div>
  );
}
