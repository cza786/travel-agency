"use client";

import React, { useState } from "react";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { Menu, X, Phone, ShieldCheck, Calendar, ChevronRight } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { Logo } from "./Logo";
import { LanguageSelector } from "./LanguageSelector";
import { useBookingModal } from "./BookingModal";

export function Navbar() {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const pathname = usePathname();
  const locale = useLocale();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { openBooking } = useBookingModal();

  const navItems = [
    { href: "/", label: t("home") },
    { href: "/services", label: t("services") },
    { href: "/prices", label: t("prices") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/" || pathname === "";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-obsidian/85 backdrop-blur-md border-b border-white/[0.12] shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
        {/* Main Header Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-14 sm:h-16 flex items-center justify-between gap-4">
          {/* Mobile Left: Hamburger Button (Only on mobile/tablet) */}
          <div className="flex lg:hidden items-center">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="p-2 -ml-2 rounded-lg text-platinum-mid hover:text-white hover:bg-graphite transition-colors focus:outline-none"
              aria-label="Navigation Menu"
            >
              <Menu className="w-6 h-6 text-white" strokeWidth={1.5} />
            </button>
          </div>

          {/* Brand Logo (Left on desktop, centered on mobile) */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center group py-1">
              <Logo className="transition-transform group-hover:scale-[1.02]" />
            </Link>
          </div>

          {/* Desktop Center: Navigation Links (Matching Screenshot Exactly) */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-8">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-xs sm:text-sm tracking-wide transition-all ${
                    active
                      ? "px-4 py-1.5 rounded-full bg-gradient-to-r from-[#DFBA73] via-[#E8CD90] to-[#DFBA73] text-obsidian font-bold shadow-md"
                      : "text-white/85 hover:text-white font-medium px-1 py-1.5"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right: Language Selector & Desktop Buchungsanfrage Button */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <LanguageSelector />

            <button
              type="button"
              onClick={() => openBooking()}
              className="hidden sm:inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-gradient-to-r from-[#DFBA73] via-[#E8CD90] to-[#DFBA73] hover:brightness-105 active:scale-[0.98] text-obsidian font-bold text-xs uppercase tracking-wider shadow-md transition-all"
            >
              <Calendar className="w-3.5 h-3.5 text-obsidian" strokeWidth={1.8} />
              <span>{tCommon("bookNow")}</span>
              <ChevronRight className="w-3.5 h-3.5 text-obsidian" strokeWidth={2} />
            </button>
          </div>
        </div>
      </header>

      {/* Slide-Out Drawer (Accessible via hamburger) */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setDrawerOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative w-full max-w-xs sm:max-w-sm bg-obsidian-soft border-r border-hairline h-full flex flex-col p-6 shadow-2xl z-10 overflow-y-auto">
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-6 border-b border-hairline">
              <Logo className="scale-90 origin-left" />
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="p-2 rounded-lg text-silver-muted hover:text-white hover:bg-graphite transition-colors"
                aria-label="Close Menu"
              >
                <X className="w-5 h-5 text-white" strokeWidth={1.5} />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col gap-1 py-6 flex-1">
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setDrawerOpen(false)}
                    className={`flex items-center justify-between px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                      active
                        ? "bg-graphite-elevated text-platinum-light border-l-2 border-platinum-light font-semibold"
                        : "text-platinum-dark hover:bg-graphite hover:text-white"
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-4 h-4 text-silver-muted" strokeWidth={1.5} />
                  </Link>
                );
              })}

              <button
                type="button"
                onClick={() => {
                  setDrawerOpen(false);
                  openBooking();
                }}
                className="mt-4 w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-silver-metallic text-obsidian font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-105 transition-all"
              >
                <Calendar className="w-4 h-4 text-obsidian" strokeWidth={1.5} />
                <span>{tCommon("bookNow")}</span>
              </button>
            </div>

            {/* Quick Contact & Dispatch Info */}
            <div className="pt-6 border-t border-hairline flex flex-col gap-3">
              <a
                href="tel:+436641234567"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-graphite border border-hairline text-platinum-light text-xs font-medium hover:border-platinum-dark transition-colors"
              >
                <Phone className="w-4 h-4 text-platinum-mid" strokeWidth={1.5} />
                <span>+43 664 123 4567 (24/7)</span>
              </a>

              <a
                href="https://wa.me/436641234567"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-whatsapp/15 border border-whatsapp/30 text-white text-xs font-medium hover:bg-whatsapp/25 transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4 text-whatsapp fill-current shrink-0" />
                <span className="text-whatsapp font-semibold">{t("vipChauffeurWhatsApp")}</span>
              </a>

              <div className="pt-3">
                <LanguageSelector variant="drawer" />
              </div>

              <div className="pt-4 flex items-center gap-2 text-[11px] text-silver-muted">
                <ShieldCheck className="w-3.5 h-3.5 text-platinum-mid shrink-0" strokeWidth={1.5} />
                <span>{t("licensedVIPService")}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
