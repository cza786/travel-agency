"use client";

import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import {
  Gem,
  ShieldCheck,
  Handshake,
  ChevronRight,
} from "lucide-react";
import { useBookingModal } from "./BookingModal";

function CustomerSupportIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Headset Arc */}
      <path
        d="M4 12a8 8 0 0 1 16 0"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      {/* Left Earpad */}
      <rect
        x="2.5"
        y="11"
        width="3"
        height="6"
        rx="1.5"
        fill="currentColor"
      />
      {/* Right Earpad */}
      <rect
        x="18.5"
        y="11"
        width="3"
        height="6"
        rx="1.5"
        fill="currentColor"
      />
      {/* Smile */}
      <path
        d="M9.5 13.5c.7 1.2 1.6 1.8 2.5 1.8s1.8-.6 2.5-1.8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      {/* Microphone Boom */}
      <path
        d="M20 17v1.5a2 2 0 0 1-2 2h-3"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      {/* Microphone Tip */}
      <circle cx="14" cy="20.5" r="1.25" fill="currentColor" />
    </svg>
  );
}

function Clock24Icon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
      <path d="M16 21h5v-5" />
      <text
        x="12"
        y="14.5"
        textAnchor="middle"
        fontSize="7"
        fontWeight="bold"
        fill="currentColor"
        stroke="none"
      >
        24
      </text>
    </svg>
  );
}

export function AboutSection() {
  const t = useTranslations("about");
  const { openBooking } = useBookingModal();

  const values = [
    {
      id: "premium",
      icon: Gem,
      title: t("value1Title"),
    },
    {
      id: "safety",
      icon: ShieldCheck,
      title: t("value2Title"),
    },
    {
      id: "availability",
      customIcon: true,
      title: t("value3Title"),
    },
    {
      id: "trust",
      icon: Handshake,
      title: t("value4Title"),
    },
  ];

  return (
    <div className="w-full space-y-8 sm:space-y-12 lg:space-y-16">
      {/* 1. Hero Section matching mobile screenshot */}
      <section className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-hairline/80 bg-obsidian-soft shadow-2xl min-h-[340px] sm:min-h-[400px] md:min-h-[440px] flex items-center">
        {/* Background Luxury V-Class Scene */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <Image
            src="/images/about-hero-van.jpg"
            alt="First Class Drive Mercedes-Benz V-Class VIP"
            fill
            priority
            sizes="100vw"
            className="object-cover object-right sm:object-center"
          />

          {/* Directional Vignette: Deep dark over text area, crystal clear over van and alpine backdrop */}
          <div className="absolute inset-0 bg-gradient-to-r rtl:bg-gradient-to-l from-obsidian via-obsidian/90 sm:via-obsidian/75 md:via-obsidian/45 to-transparent z-[1]" />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent z-[1]" />

          {/* Golden accent lighting glow */}
          <div className="absolute -bottom-8 right-0 sm:right-1/4 w-72 sm:w-96 h-28 bg-[#DFBA73]/15 blur-3xl pointer-events-none rounded-full z-[1]" />
        </div>

        {/* Hero Text Content */}
        <div className="relative z-10 w-full p-6 sm:p-10 md:p-12 lg:p-16 max-w-xl lg:max-w-2xl">
          {/* Badge with Line */}
          <div className="inline-flex items-center gap-2.5 mb-3 sm:mb-4">
            <span className="text-xs sm:text-sm font-bold tracking-widest text-[#DFBA73] uppercase">
              {t("badge")}
            </span>
            <span className="w-8 sm:w-12 h-[1.5px] bg-gradient-to-r from-[#DFBA73] to-transparent inline-block" />
          </div>

          {/* Main Headline */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-extrabold tracking-tight text-white leading-[1.18] sm:leading-[1.15]">
            <span className="block">{t("heroTitlePart1")}</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#DFBA73] via-[#F5E2B3] to-[#C89E50] my-0.5 sm:my-1">
              {t("heroTitlePart2")}
            </span>
            <span className="block">{t("heroTitlePart3")}</span>
          </h1>

          {/* Subtitle Paragraph */}
          <p className="mt-3 sm:mt-5 text-xs sm:text-sm md:text-base text-silver-muted font-normal leading-relaxed max-w-md sm:max-w-lg">
            {t("heroSubtitle")}
          </p>
        </div>
      </section>

      {/* 2. Unsere Geschichte (Our Story) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
        {/* Lake Zell am See Photo Card */}
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-hairline/80 shadow-xl group aspect-[4/3] sm:aspect-video md:aspect-[4/3] bg-graphite">
          <Image
            src="/images/about-zell-lake.jpg"
            alt="Zell am See Lake and Mountain Panorama"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Story Text */}
        <div className="flex flex-col justify-center space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2">
            <span className="text-xs sm:text-sm font-bold tracking-wider text-[#DFBA73]">
              {t("storyBadge")}
            </span>
            <span className="w-8 sm:w-10 h-[1.5px] bg-gradient-to-r from-[#DFBA73] to-transparent inline-block" />
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-snug">
            {t("storyTitle")}
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-silver-muted leading-relaxed">
            {t("storyText")}
          </p>
        </div>
      </section>

      {/* 3. Feature / Value Icons Card (4 columns with gold icons) */}
      <section className="rounded-2xl sm:rounded-3xl bg-graphite/40 border border-hairline/80 p-4 sm:p-6 shadow-xl backdrop-blur-sm">
        <div className="grid grid-cols-4 divide-x divide-hairline/40 rtl:divide-x-reverse">
          {values.map((v) => (
            <div
              key={v.id}
              className="flex flex-col items-center text-center px-1 sm:px-3"
            >
              {v.customIcon ? (
                <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 mx-auto mb-1.5 sm:mb-2 flex items-center justify-center text-[#DFBA73] shrink-0">
                  <Clock24Icon className="w-full h-full" />
                </div>
              ) : (
                v.icon && (
                  <v.icon
                    className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#DFBA73] mx-auto mb-1.5 sm:mb-2 shrink-0"
                    strokeWidth={1.6}
                  />
                )
              )}
              <span className="text-[10px] sm:text-xs md:text-sm font-semibold text-white/95 leading-tight px-0.5 sm:px-1">
                {v.title}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Unser Team (Our Team) */}
      <section className="relative rounded-2xl sm:rounded-3xl bg-graphite/60 border border-hairline overflow-hidden p-6 sm:p-8 md:p-10 shadow-2xl min-h-[220px] sm:min-h-[260px] flex items-center">
        {/* Chauffeur & Van Image on Right */}
        <div className="absolute right-0 rtl:right-auto rtl:left-0 top-0 bottom-0 w-1/2 sm:w-5/12 lg:w-4/12 z-0 pointer-events-none overflow-hidden">
          <Image
            src="/images/about-chauffeur-team.jpg"
            alt="First Class Drive Team Chauffeur"
            fill
            sizes="(max-width: 768px) 50vw, 35vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r rtl:bg-gradient-to-l from-graphite via-graphite/85 sm:via-graphite/40 to-transparent" />
        </div>

        {/* Team Content on Left */}
        <div className="relative z-10 max-w-xs sm:max-w-md lg:max-w-lg">
          <div className="inline-flex items-center gap-2 mb-2 sm:mb-3">
            <span className="text-xs sm:text-sm font-bold tracking-wider text-[#DFBA73]">
              {t("teamBadge")}
            </span>
            <span className="w-8 sm:w-10 h-[1.5px] bg-gradient-to-r from-[#DFBA73] to-transparent inline-block" />
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-snug">
            {t("teamTitle")}
          </h2>

          <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base text-silver-muted leading-relaxed">
            {t("teamText")}
          </p>

          <Link
            href="/contact"
            className="mt-4 sm:mt-6 inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-black/70 hover:bg-black/90 border border-hairline hover:border-white/40 text-white text-xs sm:text-sm font-semibold shadow-md transition-all group"
          >
            <span>{t("teamCta")}</span>
            <ChevronRight className="w-3.5 h-3.5 text-white group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </section>

      {/* 5. Bottom CTA Banner ("Wir sind für Sie da") */}
      <section className="relative rounded-2xl sm:rounded-3xl border border-white/[0.18] bg-[#0A0C0E] overflow-hidden p-3 sm:p-4 md:p-5 flex items-center justify-between gap-3 sm:gap-6 shadow-2xl">
        {/* Exact Alpine Mountain Range Background with Snow Peaks */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
          <Image
            src="/images/cta-mountain-exact.jpg"
            alt="Alpine Mountain Range"
            fill
            sizes="(max-width: 768px) 100vw, 1200px"
            className="object-cover object-top opacity-95 brightness-110"
            priority
          />
          {/* Subtle bottom fade to obsidian */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C0E] via-transparent to-transparent opacity-65" />
          <div className="absolute inset-0 bg-gradient-to-r rtl:bg-gradient-to-l from-[#0A0C0E]/60 via-transparent to-[#0A0C0E]/30" />
        </div>

        {/* Left Side: Circular Support Badge + Text */}
        <div className="relative z-10 flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
          {/* Circular Badge with Smile Support Headset */}
          <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full border border-[#DFBA73]/35 bg-black/60 flex items-center justify-center shrink-0 shadow-lg ring-1 ring-white/5">
            <CustomerSupportIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[#DFBA73]" />
          </div>

          {/* Text Content */}
          <div className="min-w-0 flex-1">
            <h4 className="text-xs sm:text-base md:text-lg font-bold text-white tracking-tight leading-tight drop-shadow truncate sm:whitespace-normal">
              {t("ctaBannerTitle")}
            </h4>
            <p className="text-[10px] sm:text-xs md:text-sm text-silver-muted font-normal mt-0.5 leading-snug drop-shadow line-clamp-1 sm:line-clamp-none">
              {t("ctaBannerSubtitle")}
            </p>
          </div>
        </div>

        {/* Right Side: Exact Metallic Champagne Gold Button */}
        <div className="relative z-10 shrink-0">
          <button
            type="button"
            onClick={() => openBooking()}
            className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-[#DFBA73] via-[#E8CD90] to-[#DFBA73] hover:brightness-105 active:scale-95 text-[#181612] font-semibold text-[11px] sm:text-xs md:text-sm tracking-normal shadow-lg transition-all"
          >
            <span>{t("ctaBannerButton")}</span>
            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#181612]" strokeWidth={2.5} />
          </button>
        </div>
      </section>
    </div>
  );
}

