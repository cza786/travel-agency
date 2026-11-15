"use client";

import React, { useState, useRef, useEffect } from "react";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { Menu, X, Phone, ShieldCheck, Calendar, ChevronRight, ChevronDown } from "lucide-react";
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
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [drawerServicesOpen, setDrawerServicesOpen] = useState(false);
  const { openBooking } = useBookingModal();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Top-level nav items (Services is handled separately with a dropdown)
  const topNavItems = [
    { href: "/", label: t("home") },
    { href: "/prices", label: t("prices") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
  ];

  // Service sub-pages for the dropdown
  const serviceSubItems = [
    { href: "/services/airport-transfers", label: t("airportTransfers") },
    { href: "/services/panoramic-excursions", label: t("panoramicExcursions") },
    { href: "/services/bicycle-transfers", label: t("bicycleTransfers") },
    { href: "/services/vip-chauffeur-taxi", label: t("vipChauffeurTaxi") },
    { href: "/services/car-rental", label: t("carRental") },
  ];

  // All items flat for mobile sub-nav bar
  const mobileNavItems = [
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
    if (href === "/services") {
      return pathname === "/services";
    }
    return pathname.startsWith(href);
  };

  const isServicesActive = pathname.startsWith("/services");

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto-expand drawer services section if on a services page
  useEffect(() => {
    if (drawerOpen && isServicesActive) {
      setDrawerServicesOpen(true);
    }
  }, [drawerOpen, isServicesActive]);

  const handleDropdownEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setServicesDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 150);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-obsidian/85 backdrop-blur-md border-b border-white/[0.12] shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
        {/* Main Header Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-16 sm:h-18 lg:h-20 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center group py-1">
              <Logo size="navbar" className="transition-transform group-hover:scale-[1.02]" />
            </Link>
          </div>

          {/* Desktop Center: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-8">
            {/* Home */}
            <Link
              href="/"
              className={`text-xs sm:text-sm tracking-wide transition-all ${
                isActive("/")
                  ? "px-4 py-1.5 rounded-full bg-gradient-to-r from-[#DFBA73] via-[#E8CD90] to-[#DFBA73] text-obsidian font-bold shadow-md"
                  : "text-white/85 hover:text-white font-medium px-1 py-1.5"
              }`}
            >
              {t("home")}
            </Link>

            {/* Services with Dropdown */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={handleDropdownEnter}
              onMouseLeave={handleDropdownLeave}
            >
              <Link
                href="/services"
                className={`inline-flex items-center gap-1 text-xs sm:text-sm tracking-wide transition-all ${
                  isServicesActive
                    ? "px-4 py-1.5 rounded-full bg-gradient-to-r from-[#DFBA73] via-[#E8CD90] to-[#DFBA73] text-obsidian font-bold shadow-md"
                    : "text-white/85 hover:text-white font-medium px-1 py-1.5"
                }`}
              >
                <span>{t("services")}</span>
                <ChevronDown
                  className={`w-3 h-3 transition-transform duration-200 ${
                    servicesDropdownOpen ? "rotate-180" : ""
                  } ${isServicesActive ? "text-obsidian" : "text-white/60"}`}
                  strokeWidth={2}
                />
              </Link>

              {/* Dropdown Panel */}
              {servicesDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50">
                  <div className="w-64 rounded-xl bg-graphite-elevated/95 backdrop-blur-xl border border-hairline shadow-2xl overflow-hidden">
                    {/* Dropdown Header */}
                    <Link
                      href="/services"
                      className="block px-4 py-3 text-xs font-bold text-[#DFBA73] uppercase tracking-wider border-b border-hairline/60 hover:bg-white/[0.04] transition-colors"
                      onClick={() => setServicesDropdownOpen(false)}
                    >
                      {t("allServices")}
                    </Link>

                    {/* Service Sub-Items */}
                    {serviceSubItems.map((item) => {
                      const active = isActive(item.href);
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setServicesDropdownOpen(false)}
                          className={`flex items-center justify-between px-4 py-3 text-sm transition-colors ${
                            active
                              ? "bg-white/[0.06] text-white font-semibold border-l-2 border-[#DFBA73]"
                              : "text-platinum-mid hover:bg-white/[0.04] hover:text-white"
                          }`}
                        >
                          <span>{item.label}</span>
                          <ChevronRight
                            className={`w-3.5 h-3.5 rtl:rotate-180 ${
                              active ? "text-[#DFBA73]" : "text-silver-muted"
                            }`}
                            strokeWidth={1.5}
                          />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Prices, About, Contact */}
            {topNavItems.slice(1).map((item) => {
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

          {/* Right: Language Selector, Desktop Buchungsanfrage & Mobile Menu Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile inline text language switcher matching mockup */}
            <div className="sm:hidden">
              <LanguageSelector variant="text" />
            </div>

            {/* Desktop / Tablet dropdown language selector */}
            <div className="hidden sm:block">
              <LanguageSelector />
            </div>

            <button
              type="button"
              onClick={() => openBooking()}
              className="hidden sm:inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-gradient-to-r from-[#DFBA73] via-[#E8CD90] to-[#DFBA73] hover:brightness-105 active:scale-[0.98] text-obsidian font-bold text-xs uppercase tracking-wider shadow-md transition-all"
            >
              <Calendar className="w-3.5 h-3.5 text-obsidian" strokeWidth={1.8} />
              <span>{tCommon("bookNow")}</span>
              <ChevronRight className="w-3.5 h-3.5 text-obsidian" strokeWidth={2} />
            </button>

            {/* Mobile Right: Hamburger Button */}
            <div className="flex lg:hidden items-center ml-1">
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                className="p-1.5 rounded-lg text-platinum-mid hover:text-white hover:bg-graphite transition-colors focus:outline-none"
                aria-label="Navigation Menu"
              >
                <Menu className="w-6 h-6 text-white" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Horizontal Sub-Navigation Bar */}
        <div className="flex lg:hidden items-center justify-around px-2 py-2 border-t border-white/[0.08] bg-obsidian/95 overflow-x-auto no-scrollbar">
          {mobileNavItems.map((item) => {
            const active = item.href === "/services" ? isServicesActive : isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-2 py-1 text-xs transition-all whitespace-nowrap relative ${
                  active
                    ? "text-white font-semibold after:content-[''] after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-[#DFBA73] after:to-[#C89E50]"
                    : "text-silver-muted hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
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
              {/* Home */}
              <Link
                href="/"
                onClick={() => setDrawerOpen(false)}
                className={`flex items-center justify-between px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive("/")
                    ? "bg-graphite-elevated text-platinum-light border-l-2 border-platinum-light font-semibold"
                    : "text-platinum-dark hover:bg-graphite hover:text-white"
                }`}
              >
                <span>{t("home")}</span>
                <ChevronRight className="w-4 h-4 text-silver-muted" strokeWidth={1.5} />
              </Link>

              {/* Services (Collapsible with sub-items) */}
              <div>
                <button
                  type="button"
                  onClick={() => setDrawerServicesOpen(!drawerServicesOpen)}
                  className={`w-full flex items-center justify-between px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isServicesActive
                      ? "bg-graphite-elevated text-platinum-light border-l-2 border-platinum-light font-semibold"
                      : "text-platinum-dark hover:bg-graphite hover:text-white"
                  }`}
                >
                  <span>{t("services")}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-silver-muted transition-transform duration-200 ${
                      drawerServicesOpen ? "rotate-180" : ""
                    }`}
                    strokeWidth={1.5}
                  />
                </button>

                {/* Collapsible sub-items */}
                {drawerServicesOpen && (
                  <div className="ml-3 mt-1 flex flex-col gap-0.5 border-l border-hairline/60 pl-3">
                    {/* All Services link */}
                    <Link
                      href="/services"
                      onClick={() => setDrawerOpen(false)}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                        isActive("/services")
                          ? "bg-graphite text-[#DFBA73] font-semibold"
                          : "text-platinum-dark hover:bg-graphite hover:text-white"
                      }`}
                    >
                      <span>{t("allServices")}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-silver-muted rtl:rotate-180" strokeWidth={1.5} />
                    </Link>

                    {serviceSubItems.map((item) => {
                      const active = isActive(item.href);
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setDrawerOpen(false)}
                          className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                            active
                              ? "bg-graphite text-[#DFBA73] font-semibold"
                              : "text-platinum-dark hover:bg-graphite hover:text-white"
                          }`}
                        >
                          <span>{item.label}</span>
                          <ChevronRight className="w-3.5 h-3.5 text-silver-muted rtl:rotate-180" strokeWidth={1.5} />
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Prices, About, Contact */}
              {topNavItems.slice(1).map((item) => {
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
