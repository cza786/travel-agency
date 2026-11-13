"use client";

import React, { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import {
  Plane,
  Building2,
  Mountain,
  Info,
  Route,
  MapPin,
  Calculator,
  ArrowRight,
  Users,
  CheckCircle2,
} from "lucide-react";
import { useBookingModal } from "./BookingModal";

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
  const locale = useLocale();
  const { openBooking } = useBookingModal();

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

  // Calculator states
  const [calcDistance, setCalcDistance] = useState<number>(85);
  const [calcPax, setCalcPax] = useState<number>(4);
  const [calcRoundTrip, setCalcRoundTrip] = useState<boolean>(false);

  // Pricing formula: <= 50km is 3.10 EUR/km, > 50km is 2.80 EUR/km, baseline min charge 75 EUR
  const calculateRate = (km: number, pax: number, roundTrip: boolean) => {
    let ratePerKm = km <= 50 ? 3.10 : 2.80;
    let base = km * ratePerKm;
    if (base < 75) base = 75;
    // Van surcharge for 5-8 persons (+20%)
    if (pax > 4) {
      base = base * 1.2;
    }
    if (roundTrip) {
      // 10% discount on return trip
      base = base + base * 0.9;
    }
    return Math.round(base);
  };

  const estimatedTotal = calculateRate(calcDistance, calcPax, calcRoundTrip);

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
                <span>{route.price}</span>
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

      {/* 2. Kilometertarife matching Screenshot 2 */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-graphite border border-hairline flex items-center justify-center shrink-0">
            <Route className="w-4 h-4 text-platinum-light" strokeWidth={1.5} />
          </div>
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-white">
            {t("kmSectionTitle")}
          </h3>
        </div>

        <div className="p-4 sm:p-6 rounded-2xl bg-graphite border border-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-obsidian border border-hairline flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-platinum-light" strokeWidth={1.5} />
            </div>
            <div>
              <div className="text-xs sm:text-sm md:text-base font-semibold text-platinum-light">
                {t("kmRates")}
              </div>
              <div className="text-[11px] sm:text-xs text-silver-muted mt-0.5">
                {t("kmNote")}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => openBooking({ pickup: "Zell am See", dropoff: t("calculateTrip") })}
            className="self-start sm:self-auto px-4 py-2 rounded-xl bg-obsidian hover:bg-graphite-elevated border border-hairline text-platinum-light text-xs font-semibold transition-colors"
          >
            {t("calculateTrip")} ➔
          </button>
        </div>
      </section>

      {/* 3. Interactive Route & Price Calculator (Adaptive 2-column layout on desktop) */}
      <section className="p-5 sm:p-7 md:p-8 rounded-2xl bg-graphite-elevated border border-hairline shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-hairline pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-obsidian border border-hairline flex items-center justify-center shrink-0">
              <Calculator className="w-5 h-5 text-platinum-light" strokeWidth={1.5} />
            </div>
            <div>
              <h4 className="text-sm sm:text-base md:text-lg font-bold text-white">
                {t("calculatorTitle")}
              </h4>
              <p className="text-[11px] sm:text-xs text-silver-muted">
                {t("calculatorSubtitle")}
              </p>
            </div>
          </div>
        </div>

        {/* Grid for Calculator: 1 column on mobile, 2 columns on md/lg desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Left Column: Interactive Inputs */}
          <div className="space-y-4">
            {/* Distance Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-silver-muted">{t("distanceLabel")}</span>
                <span className="text-white font-mono font-bold text-base">{calcDistance} km</span>
              </div>
              <input
                type="range"
                min={10}
                max={500}
                step={5}
                value={calcDistance}
                onChange={(e) => setCalcDistance(parseInt(e.target.value) || 10)}
                className="w-full h-2.5 bg-obsidian rounded-lg appearance-none cursor-pointer accent-white"
              />
              <div className="flex justify-between text-[10px] sm:text-[11px] text-silver-muted/70 font-mono">
                <span>10 km ({t("local")})</span>
                <span>80 km (SZG)</span>
                <span>215 km (MUC)</span>
                <span>500 km</span>
              </div>
            </div>

            {/* Passenger Selector & Roundtrip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {/* Passenger Selector */}
              <div className="flex items-center justify-between px-3.5 py-2.5 bg-obsidian border border-hairline rounded-xl">
                <div className="flex items-center gap-2 text-xs text-silver-muted">
                  <Users className="w-4 h-4" strokeWidth={1.5} />
                  <span>{t("passengersLabel")}</span>
                </div>
                <select
                  value={calcPax}
                  onChange={(e) => setCalcPax(parseInt(e.target.value) || 1)}
                  className="bg-transparent text-platinum-light text-xs font-semibold focus:outline-none cursor-pointer"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <option key={num} value={num} className="bg-obsidian text-white">
                      {num} {tCommon("persons")} {num > 4 ? "(VIP Van)" : ""}
                    </option>
                  ))}
                </select>
              </div>

              {/* Round-trip checkbox */}
              <label className="flex items-center gap-2.5 px-3.5 py-2.5 bg-obsidian border border-hairline rounded-xl cursor-pointer hover:border-hairline transition-colors">
                <input
                  type="checkbox"
                  checked={calcRoundTrip}
                  onChange={(e) => setCalcRoundTrip(e.target.checked)}
                  className="w-4 h-4 rounded border-hairline bg-graphite text-white accent-white cursor-pointer"
                />
                <span className="text-xs text-silver-muted font-medium select-none truncate">
                  {t("roundTrip")}
                </span>
              </label>
            </div>
          </div>

          {/* Right Column: Live Price Quote Card */}
          <div className="p-5 sm:p-6 rounded-2xl bg-obsidian border border-hairline flex flex-col justify-between gap-4 shadow-xl">
            <div>
              <div className="text-[11px] uppercase tracking-wider text-silver-muted font-medium">
                {t("calculatedEstimate")}
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white mt-1">
                {tCommon("approx")} {estimatedTotal} €
              </div>
              <div className="text-[11px] text-silver-muted mt-1">
                {t("taxMautIncluded")}
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-silver-muted/90 border-t border-hairline/60 pt-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" strokeWidth={1.5} />
                <span>{t("allWheelVehicle")}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" strokeWidth={1.5} />
                <span>{t("noHiddenFees")}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                openBooking({
                  pickup: `Zell am See (${calcDistance} km)`,
                  dropoff: t("customDestination"),
                })
              }
              className="w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-silver-metallic text-obsidian font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:brightness-105 active:scale-[0.98] transition-all"
            >
              <span>{t("requestThisRoute")}</span>
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
