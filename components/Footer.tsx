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
              <Logo className="origin-left transition-transform group-hover:scale-[1.02]" />
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
            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-9 h-9 rounded-full bg-graphite/60 hover:bg-white/15 border border-hairline flex items-center justify-center text-white/80 hover:text-white transition-all hover:scale-105"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>

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

            {/* X / Twitter */}
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className="w-9 h-9 rounded-full bg-graphite/60 hover:bg-white/15 border border-hairline flex items-center justify-center text-white/80 hover:text-white transition-all hover:scale-105"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
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
