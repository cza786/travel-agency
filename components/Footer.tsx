"use client";

import React from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Phone, Mail, MapPin, Shield, Clock, Car } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { Logo } from "./Logo";

export function Footer() {
  const t = useTranslations("footer");
  const tCommon = useTranslations("common");
  const tNav = useTranslations("nav");
  const tContact = useTranslations("contact");

  return (
    <footer className="w-full bg-obsidian-soft border-t border-hairline pt-12 pb-28 sm:pb-16 text-platinum-mid safe-area-bottom">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-1 flex flex-col items-start">
            <Logo className="scale-90 origin-left mb-4" />
            <p className="text-xs text-silver-muted leading-relaxed mb-4">
              {tCommon("subtagline")}
            </p>
            <div className="flex items-center gap-2 text-xs text-platinum-dark">
              <MapPin className="w-4 h-4 text-silver-muted" strokeWidth={1.5} />
              <span>Zell am See • Kaprun • Salzburg</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-platinum-light mb-1">
              {tNav("navSection")}
            </h4>
            <Link href="/" className="text-xs text-silver-muted hover:text-platinum-light transition-colors">
              {tNav("home")}
            </Link>
            <Link href="/services" className="text-xs text-silver-muted hover:text-platinum-light transition-colors">
              {tNav("services")}
            </Link>
            <Link href="/prices" className="text-xs text-silver-muted hover:text-platinum-light transition-colors">
              {tNav("prices")}
            </Link>
            <Link href="/about" className="text-xs text-silver-muted hover:text-platinum-light transition-colors">
              {tNav("about")}
            </Link>
            <Link href="/booking" className="text-xs text-silver-muted hover:text-platinum-light transition-colors">
              {tNav("booking")}
            </Link>
          </div>

          {/* Premium Features */}
          <div className="flex flex-col gap-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-platinum-light mb-1">
              {t("vipStandards")}
            </h4>
            <div className="flex items-center gap-2 text-xs text-silver-muted">
              <Car className="w-3.5 h-3.5 text-platinum-dark shrink-0" strokeWidth={1.5} />
              <span>{t("fleet4Matic")}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-silver-muted">
              <Clock className="w-3.5 h-3.5 text-platinum-dark shrink-0" strokeWidth={1.5} />
              <span>{t("transfers247")}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-silver-muted">
              <Shield className="w-3.5 h-3.5 text-platinum-dark shrink-0" strokeWidth={1.5} />
              <span>{t("certifiedLicense")}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-silver-muted">
              <span className="text-xs shrink-0">❄️</span>
              <span>{t("alpineWinterExpertise")}</span>
            </div>
          </div>

          {/* Contact Direct */}
          <div className="flex flex-col gap-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-platinum-light mb-1">
              {tNav("contact")} 24/7
            </h4>
            <a
              href="tel:+436641234567"
              className="flex items-center gap-2 text-xs text-silver-muted hover:text-platinum-light transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-platinum-dark shrink-0" strokeWidth={1.5} />
              <span>+43 664 123 4567</span>
            </a>
            <a
              href="https://wa.me/436641234567"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs text-whatsapp hover:underline transition-colors"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 fill-current shrink-0" />
              <span>{t("whatsAppService")}</span>
            </a>
            <a
              href="mailto:office@firstclassdrive.at"
              className="flex items-center gap-2 text-xs text-silver-muted hover:text-platinum-light transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-platinum-dark" strokeWidth={1.5} />
              <span>office@firstclassdrive.at</span>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-hairline/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-silver-muted">
          <div>
            © {new Date().getFullYear()} First Class Drive (firstclassdrive.at). {t("rights")}
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-platinum-light cursor-pointer">{t("imprint")}</span>
            <span className="hover:text-platinum-light cursor-pointer">{t("privacy")}</span>
            <span className="hover:text-platinum-light cursor-pointer">{t("terms")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

