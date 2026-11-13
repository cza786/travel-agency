"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  Plane,
  Mountain,
  Bike,
  Car,
  ChevronRight,
  X,
  CheckCircle,
  Calendar,
} from "lucide-react";
import { useBookingModal } from "./BookingModal";

interface ServiceItem {
  id: string;
  image: string;
  icon: React.ReactNode;
  titleKey: string;
  shortDescKey: string;
  longDescKey: string;
  badgeKey?: string;
  defaultPickup?: string;
  defaultDropoff?: string;
}

export function ServicesGrid() {
  const t = useTranslations("services");
  const tHero = useTranslations("hero");
  const tCommon = useTranslations("common");
  const { openBooking } = useBookingModal();
  const [activeModal, setActiveModal] = useState<ServiceItem | null>(null);

  const services: ServiceItem[] = [
    {
      id: "airport",
      image: "/images/clean-airport.jpg",
      icon: <Plane className="w-4 h-4 sm:w-5 sm:h-5 text-white shrink-0 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" strokeWidth={1.6} />,
      titleKey: "airport.title",
      shortDescKey: "airport.shortDesc",
      longDescKey: "airport.longDesc",
      defaultPickup: "Flughafen Salzburg (SZG)",
      defaultDropoff: "Zell am See",
    },
    {
      id: "excursions",
      image: "/images/clean-excursions.jpg",
      icon: <Mountain className="w-4 h-4 sm:w-5 sm:h-5 text-white shrink-0 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" strokeWidth={1.6} />,
      titleKey: "excursions.title",
      shortDescKey: "excursions.shortDesc",
      longDescKey: "excursions.longDesc",
      defaultPickup: "Zell am See",
      defaultDropoff: "Großglockner Hochalpenstraße",
    },
    {
      id: "bike",
      image: "/images/clean-bikes.jpg",
      icon: <Bike className="w-4 h-4 sm:w-5 sm:h-5 text-white shrink-0 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" strokeWidth={1.6} />,
      titleKey: "bike.title",
      shortDescKey: "bike.shortDesc",
      longDescKey: "bike.longDesc",
      defaultPickup: "Zell am See / Tauernradweg",
      defaultDropoff: "Krimml / Kaprun",
    },
    {
      id: "taxi",
      image: "/images/clean-taxi.jpg",
      icon: <Car className="w-4 h-4 sm:w-5 sm:h-5 text-white shrink-0 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" strokeWidth={1.6} />,
      titleKey: "taxi.title",
      shortDescKey: "taxi.shortDesc",
      longDescKey: "taxi.longDesc",
      defaultPickup: "Zell am See",
      defaultDropoff: "Kaprun Tauern Spa / Kitzsteinhorn",
    },
    {
      id: "rental",
      image: "/images/clean-rental.jpg",
      icon: <Car className="w-4 h-4 sm:w-5 sm:h-5 text-white shrink-0 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" strokeWidth={1.6} />,
      titleKey: "rental.title",
      shortDescKey: "rental.shortDesc",
      longDescKey: "rental.longDesc",
      badgeKey: "rental.badge",
      defaultPickup: "Mietwagenübergabe Zell am See",
      defaultDropoff: "Mietwagenrückgabe Zell am See",
    },
  ];

  return (
    <section className="w-full max-w-5xl xl:max-w-6xl mx-auto space-y-4 sm:space-y-6 md:space-y-8">
      {/* Refined Section Header with hairline divider lines and subtitle */}
      <div className="text-center space-y-1.5 sm:space-y-2">
        <div className="flex items-center justify-center gap-3 sm:gap-5">
          <span className="h-[1px] w-8 sm:w-16 md:w-24 bg-gradient-to-r from-transparent to-hairline/90 inline-block" />
          <h2 className="text-sm sm:text-base md:text-lg font-bold text-white tracking-widest uppercase drop-shadow-sm">
            {t("sectionTitle")}
          </h2>
          <span className="h-[1px] w-8 sm:w-16 md:w-24 bg-gradient-to-l from-transparent to-hairline/90 inline-block" />
        </div>
        <p className="text-xs sm:text-sm text-silver-muted max-w-xl mx-auto leading-relaxed px-4">
          {t("sectionSubtitle")}
        </p>
      </div>

      {/* Grid of Services: 2 columns on mobile/tablet/desktop, with 5th card as full-width VIP banner */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-4 md:gap-5">
        {/* Cards 1 to 4 */}
        {services.slice(0, 4).map((service) => (
          <div
            key={service.id}
            onClick={() => setActiveModal(service)}
            className="group relative h-[120px] sm:h-[155px] md:h-[185px] lg:h-[210px] xl:h-[225px] rounded-2xl overflow-hidden border border-hairline/80 bg-obsidian-soft cursor-pointer transition-all duration-300 hover:border-zinc-400/50 hover:scale-[1.012] hover:shadow-[0_12px_36px_rgba(0,0,0,0.65)] shadow-md"
          >
            {/* Photographic Scene */}
            <div className="absolute inset-0">
              <Image
                src={service.image}
                alt={t(service.titleKey)}
                fill
                quality={90}
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 800px"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
              />
              {/* Deep obsidian bottom fade for optimal text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/60 to-transparent pointer-events-none" />
            </div>

            {/* Bottom Content Bar */}
            <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-4 md:p-5 flex items-end sm:items-center justify-between z-10 gap-2">
              <div className="flex items-center gap-2 sm:gap-3 md:gap-3.5 min-w-0 pr-1 rtl:pr-0 rtl:pl-1">
                <div className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg sm:rounded-xl bg-obsidian/85 backdrop-blur-md border border-white/10 group-hover:border-white/30 flex items-center justify-center shrink-0 text-white shadow-lg group-hover:scale-105 transition-all">
                  {service.icon}
                </div>
                <div className="min-w-0">
                  <h3 className="text-[11px] sm:text-sm md:text-base lg:text-lg font-bold text-white tracking-tight leading-tight sm:leading-snug drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] line-clamp-1">
                    {t(service.titleKey)}
                  </h3>
                  <p className="hidden sm:block text-[11px] md:text-xs lg:text-[13px] text-platinum-dark/90 leading-relaxed line-clamp-1 lg:line-clamp-2 mt-0.5 sm:mt-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] font-normal">
                    {t(service.shortDescKey)}
                  </p>
                </div>
              </div>

              {/* Action chevron / button */}
              <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full bg-white/5 sm:bg-white/10 sm:group-hover:bg-silver-metallic sm:group-hover:text-obsidian border border-white/10 flex items-center justify-center text-silver-muted group-hover:text-white sm:group-hover:text-obsidian transition-all duration-300 group-hover:scale-105 shrink-0 shadow-md">
                <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" strokeWidth={1.8} />
              </div>
            </div>
          </div>
        ))}

        {/* Card 5 (Rental Car - Spanning full 2 columns as VIP Banner) */}
        {services.slice(4).map((service) => (
          <div
            key={service.id}
            onClick={() => setActiveModal(service)}
            className="col-span-2 group relative h-[74px] sm:h-[95px] md:h-[110px] lg:h-[125px] xl:h-[135px] rounded-2xl overflow-hidden border border-hairline/80 bg-obsidian-soft cursor-pointer transition-all duration-300 hover:border-zinc-400/50 hover:scale-[1.006] hover:shadow-[0_12px_36px_rgba(0,0,0,0.65)] shadow-md"
          >
            {/* Clean Photographic Scene with Mercedes Key on Left */}
            <div className="absolute inset-0">
              <Image
                src={service.image}
                alt={t(service.titleKey)}
                fill
                quality={90}
                sizes="(max-width: 1024px) 100vw, 1400px"
                className="object-cover object-left rtl:object-right transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
              />
              {/* Horizontal fade from key to dark right area */}
              <div className="absolute inset-0 bg-gradient-to-r rtl:bg-gradient-to-l from-transparent via-obsidian/70 to-obsidian pointer-events-none" />
            </div>

            {/* Content Bar Matching Desktop Screenshot */}
            <div className="absolute inset-0 px-3 sm:px-5 md:px-6 flex items-center justify-between z-10 gap-2 sm:gap-4">
              {/* Left spacer for unobstructed Mercedes key visibility */}
              <div className="w-[32%] sm:w-[36%] md:w-[40%] shrink-0 pointer-events-none" />

              {/* Center/right icon + title + subtitle */}
              <div className="flex items-center gap-2 sm:gap-3 md:gap-3.5 min-w-0 flex-1">
                <div className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg sm:rounded-xl bg-obsidian/85 backdrop-blur-md border border-white/10 group-hover:border-white/30 flex items-center justify-center shrink-0 text-white shadow-lg group-hover:scale-105 transition-all">
                  {service.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2.5">
                    <h3 className="text-[11px] sm:text-sm md:text-base lg:text-lg font-bold text-white tracking-tight leading-tight sm:leading-snug drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] line-clamp-1">
                      {t(service.titleKey)}
                    </h3>
                    {service.badgeKey && (
                      <span className="inline-flex items-center px-1.5 sm:px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] md:text-xs font-semibold bg-amber-400/15 text-amber-300 border border-amber-400/30 uppercase tracking-wider shrink-0">
                        {t(service.badgeKey)}
                      </span>
                    )}
                  </div>
                  <p className="hidden sm:block text-[11px] md:text-xs lg:text-[13px] text-platinum-dark/90 leading-relaxed line-clamp-1 mt-0.5 sm:mt-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] font-normal">
                    {t(service.shortDescKey)}
                  </p>
                </div>
              </div>

              {/* Right action indicator */}
              <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full bg-white/5 sm:bg-white/10 sm:group-hover:bg-silver-metallic sm:group-hover:text-obsidian border border-white/10 flex items-center justify-center text-silver-muted group-hover:text-white sm:group-hover:text-obsidian transition-all duration-300 group-hover:scale-105 shrink-0 shadow-md">
                <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" strokeWidth={1.8} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile-only Quick Booking Action */}
      <div className="pt-1 block sm:hidden">
        <button
          type="button"
          onClick={() => openBooking()}
          className="w-full flex items-center justify-center gap-2.5 py-3 px-5 rounded-2xl bg-silver-metallic hover:brightness-105 active:scale-[0.98] text-obsidian font-extrabold text-xs uppercase tracking-wider shadow-xl transition-all cursor-pointer"
        >
          <Calendar className="w-4 h-4 text-obsidian shrink-0" strokeWidth={1.5} />
          <span className="tracking-wide">{tCommon("bookNow")}</span>
          <ChevronRight className="w-4 h-4 text-obsidian shrink-0" strokeWidth={1.5} />
        </button>
      </div>

      {/* Service Detail Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setActiveModal(null)}
          />

          <div className="relative w-full max-w-md sm:max-w-lg bg-graphite-elevated border border-hairline rounded-2xl p-6 sm:p-8 shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-2 rounded-lg text-silver-muted hover:text-white hover:bg-hairline transition-colors"
            >
              <X className="w-5 h-5" strokeWidth={1.5} />
            </button>

            <div className="w-12 h-12 rounded-xl bg-obsidian border border-hairline flex items-center justify-center mb-4 text-white">
              {activeModal.icon}
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
              {t(activeModal.titleKey)}
            </h3>

            <p className="text-xs sm:text-sm text-platinum-dark leading-relaxed mb-6">
              {t(activeModal.longDescKey)}
            </p>

            <div className="space-y-2.5 mb-6 text-xs text-silver-muted">
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" strokeWidth={1.5} />
                <span>{tHero("uspReliable")}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" strokeWidth={1.5} />
                <span>{tHero("uspComfort")}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" strokeWidth={1.5} />
                <span>{tHero("uspLocal")}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  const s = activeModal;
                  setActiveModal(null);
                  openBooking({
                    pickup: s.defaultPickup,
                    dropoff: s.defaultDropoff,
                  });
                }}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-silver-metallic text-obsidian font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:brightness-105 transition-all"
              >
                <Calendar className="w-4 h-4 text-obsidian" strokeWidth={1.5} />
                <span>{tCommon("inquire")}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
