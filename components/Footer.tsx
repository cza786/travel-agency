"use client";

import React from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Phone, Mail } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tContact = useTranslations("contact");

  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-obsidian-soft border-t border-hairline pt-12 pb-16 text-platinum-mid safe-area-bottom">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mb-12 items-start">
          {/* Column 1: Brand Logo */}
          <div className="flex flex-col items-start">
            <Link href="/" className="inline-block group py-1">
              <Logo size="footer" className="origin-left transition-transform group-hover:scale-[1.02]" />
            </Link>
          </div>

          {/* Column 2: Schnellzugriff (Quick Links) */}
          <div className="flex flex-col gap-2.5">
            <h4 className="text-xs sm:text-sm font-semibold tracking-wider text-white mb-1">
              {t("quickLinks")}
            </h4>
            <Link
              href="/"
              className="text-xs sm:text-sm text-silver-muted hover:text-white transition-colors"
            >
              {tNav("home")}
            </Link>
            <Link
              href="/services"
              className="text-xs sm:text-sm text-silver-muted hover:text-white transition-colors"
            >
              {tNav("services")}
            </Link>
            <Link
              href="/prices"
              className="text-xs sm:text-sm text-silver-muted hover:text-white transition-colors"
            >
              {tNav("prices")}
            </Link>
            <Link
              href="/about"
              className="text-xs sm:text-sm text-silver-muted hover:text-white transition-colors"
            >
              {tNav("about")}
            </Link>
            <Link
              href="/contact"
              className="text-xs sm:text-sm text-silver-muted hover:text-white transition-colors"
            >
              {tNav("contact")}
            </Link>
          </div>

          {/* Column 3: Kontakt */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs sm:text-sm font-semibold tracking-wider text-white mb-0.5">
              {t("contact")}
            </h4>
            <a
              href="tel:+436542122456"
              className="flex items-center gap-2.5 text-xs sm:text-sm text-silver-muted hover:text-[#DFBA73] transition-colors group"
            >
              <Phone className="w-4 h-4 text-silver-muted group-hover:text-[#DFBA73] shrink-0" strokeWidth={1.7} />
              <span>+43 6542 122456</span>
            </a>
            <a
              href="mailto:info@firstclassdrive.at"
              className="flex items-center gap-2.5 text-xs sm:text-sm text-silver-muted hover:text-[#DFBA73] transition-colors group"
            >
              <Mail className="w-4 h-4 text-silver-muted group-hover:text-[#DFBA73] shrink-0" strokeWidth={1.7} />
              <span>info@firstclassdrive.at</span>
            </a>
          </div>

          {/* Column 4: Social Icons */}
          <div className="flex items-center gap-3.5 sm:justify-end">
            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full bg-graphite/60 hover:bg-white/15 border border-hairline flex items-center justify-center text-white/80 hover:text-white transition-all hover:scale-105"
            >
              <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>

            {/* Snapchat */}
            <a
              href="https://snapchat.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Snapchat"
              className="w-9 h-9 rounded-full bg-graphite/60 hover:bg-white/15 border border-hairline flex items-center justify-center text-white/80 hover:text-white transition-all hover:scale-105"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12.004 2c-3.328 0-5.467 2.37-5.467 5.253 0 1.096.34 2.052.88 2.766.11.144.13.34.05.498-.104.208-.432.55-1.134.814-.52.196-.948.303-1.277.321-.318.017-.545.283-.497.599.088.583.565 1.157 1.42 1.439.734.242 1.22.127 1.408.064.15-.05.318-.01.428.104.228.236.713.754.713 1.488 0 .428-.21.802-.533 1.14-.537.562-1.35 1.056-2.176 1.385-.306.122-.457.447-.348.75.163.454.67 1.026 1.705 1.223.778.148 1.498-.014 2.007-.221.18-.073.385-.027.52.115.556.582 1.624 1.085 2.87 1.085 1.246 0 2.314-.503 2.87-1.085.135-.142.34-.188.52-.115.509.207 1.229.369 2.007.221 1.035-.197 1.542-.769 1.705-1.223.109-.303-.042-.628-.348-.75-.826-.329-1.639-.823-2.176-1.385-.323-.338-.533-.712-.533-1.14 0-.734.485-1.252.713-1.488.11-.114.278-.154.428-.104.188.063.674.178 1.408-.064.855-.282 1.332-.856 1.42-1.439.048-.316-.179-.582-.497-.599-.329-.018-.757-.125-1.277-.321-.702-.264-1.03-.606-1.134-.814-.08-.158-.06-.354.05-.498.54-.714.88-1.67.88-2.766C17.471 4.37 15.332 2 12.004 2z"/>
              </svg>
            </a>

            {/* TikTok */}
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="w-9 h-9 rounded-full bg-graphite/60 hover:bg-white/15 border border-hairline flex items-center justify-center text-white/80 hover:text-white transition-all hover:scale-105"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.46V10.15a8.27 8.27 0 0 0 5.77 2.12v-3.46a4.85 4.85 0 0 1-3.77-2.12z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-hairline/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-silver-muted">
          <div>
            © {currentYear} First Class Drive. {t("rights")}
          </div>
          <div className="flex items-center gap-3">
            <span className="hover:text-white cursor-pointer transition-colors">{t("privacy")}</span>
            <span className="text-hairline">|</span>
            <span className="hover:text-white cursor-pointer transition-colors">{t("imprint")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
