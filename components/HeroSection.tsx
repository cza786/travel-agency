"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { MapPin, ShieldCheck, Gem, Users } from "lucide-react";

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative w-full overflow-hidden min-h-[320px] sm:min-h-[360px] lg:min-h-[400px] xl:min-h-[440px] flex items-center">
      {/* 1. Panoramic Background Scene with Lake Zell & Mercedes-Benz V-Class VIP */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <Image
          src="/images/hero-clean-bg.jpg"
          alt="First Class Drive Mercedes-Benz V-Class VIP Zell am See"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_45%] lg:object-[center_48%]"
        />

        {/* Directional Vignette: Deep atmospheric dark on text side, transparent over the luxury van & lake */}
        <div className="absolute inset-0 bg-gradient-to-r rtl:bg-gradient-to-l from-obsidian/95 via-obsidian/75 md:via-obsidian/45 to-transparent z-[1]" />

        {/* Smooth bottom gradient fade into page background */}
        <div className="absolute inset-x-0 bottom-0 h-10 sm:h-16 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent z-[1]" />
      </div>

      {/* 2. Left-Aligned Hero Content Matching Desktop Screenshot */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-8 lg:py-10 flex flex-col justify-center">
        <div className="max-w-xl lg:max-w-2xl text-left rtl:text-right">
          {/* Location Pin & Name */}
          <div className="inline-flex items-center gap-2 text-white/95 text-xs sm:text-sm font-medium mb-2 sm:mb-2.5">
            <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white shrink-0" strokeWidth={1.8} />
            <span className="tracking-wide text-platinum-light">{t("badge")}</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] xl:text-[48px] font-extrabold tracking-tight text-white leading-[1.1] mb-2 sm:mb-3">
            <span className="block text-white font-extrabold">{t("titleLine1")}</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#DFBA73] via-[#F5E2B3] to-[#C89E50] font-extrabold">
              {t("titleLine2")}
            </span>
          </h1>

          {/* Subheadline Paragraph */}
          <p className="text-xs sm:text-sm text-silver-muted font-normal leading-relaxed mb-4 sm:mb-6 max-w-md sm:max-w-lg">
            {t("description")}
          </p>

          {/* Three Feature Badges (Horizontal Row on Desktop matching Screenshot) */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 lg:gap-7">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-white/95">
              <ShieldCheck className="w-4 h-4 text-white/90 shrink-0" strokeWidth={1.6} />
              <span className="tracking-wide">{t("uspReliable")}</span>
            </div>

            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-white/95">
              <Gem className="w-4 h-4 text-white/90 shrink-0" strokeWidth={1.6} />
              <span className="tracking-wide">{t("uspComfort")}</span>
            </div>

            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-white/95">
              <Users className="w-4 h-4 text-white/90 shrink-0" strokeWidth={1.6} />
              <span className="tracking-wide">{t("uspCapacity")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
