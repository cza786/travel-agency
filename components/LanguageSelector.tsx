"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { ChevronDown, Globe, Check } from "lucide-react";

interface LanguageOption {
  code: "de" | "en" | "ar";
  label: string;
  short: string;
  flag: React.ReactNode;
}

/* Crisp Vector Flags (Guaranteed to render identically across Windows, macOS, iOS & Android) */
function FlagDE({ className = "w-[19px] h-[13px]" }: { className?: string }) {
  return (
    <svg
      className={`${className} rounded-[2.5px] overflow-hidden shrink-0 shadow-xs ring-1 ring-white/10`}
      viewBox="0 0 640 480"
      aria-label="Deutsch"
    >
      <path fill="#000000" d="M0 0h640v160H0z" />
      <path fill="#DD0000" d="M0 160h640v160H0z" />
      <path fill="#FFCE00" d="M0 320h640v160H0z" />
    </svg>
  );
}

function FlagEN({ className = "w-[19px] h-[13px]" }: { className?: string }) {
  return (
    <svg
      className={`${className} rounded-[2.5px] overflow-hidden shrink-0 shadow-xs ring-1 ring-white/10`}
      viewBox="0 0 640 480"
      aria-label="English"
    >
      <path fill="#012169" d="M0 0h640v480H0z" />
      <path
        fill="#FFFFFF"
        d="m75 0 244 181L562 0h78v62L435 240l205 153v87h-75L320 300 75 480H0v-62l205-153L0 112V0z"
      />
      <path
        fill="#C8102E"
        d="m424 288 216 162v30h-35L392 318zm108-288 108 81V0zM0 480l135-101H95L0 450zm0-480 216 162h-40L0 54z"
      />
      <path fill="#FFFFFF" d="M240 0v480h160V0zM0 160v160h640V160z" />
      <path fill="#C8102E" d="M267 0v480h106V0zM0 187v106h640V187z" />
    </svg>
  );
}

function FlagAR({ className = "w-[19px] h-[13px]" }: { className?: string }) {
  return (
    <svg
      className={`${className} rounded-[2.5px] overflow-hidden shrink-0 shadow-xs ring-1 ring-white/10`}
      viewBox="0 0 640 480"
      aria-label="العربية"
    >
      <path fill="#00732F" d="M0 0h640v160H0z" />
      <path fill="#FFFFFF" d="M0 160h640v160H0z" />
      <path fill="#000000" d="M0 320h640v160H0z" />
      <path fill="#FF0000" d="M0 0h175v480H0z" />
    </svg>
  );
}

const languages: LanguageOption[] = [
  { code: "de", label: "Deutsch", short: "DE", flag: <FlagDE /> },
  { code: "en", label: "English", short: "EN", flag: <FlagEN /> },
  { code: "ar", label: "العربية", short: "AR", flag: <FlagAR /> },
];

export function LanguageSelector({ variant = "default" }: { variant?: "default" | "compact" | "drawer" }) {
  const currentLocale = useLocale() as "de" | "en" | "ar";
  const tCommon = useTranslations("common");
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = languages.find((l) => l.code === currentLocale) || languages[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (locale: "de" | "en" | "ar") => {
    setIsOpen(false);
    router.replace(pathname, { locale });
  };

  if (variant === "drawer") {
    return (
      <div className="flex items-center gap-2 w-full pt-3 border-t border-hairline/60">
        <span className="text-xs text-silver-muted flex items-center gap-1.5">
          <Globe className="w-3.5 h-3.5 text-platinum-dark" strokeWidth={1.5} />
          {tCommon("language")}:
        </span>
        <div className="flex items-center gap-1.5 ml-auto">
          {languages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => handleSelect(lang.code)}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full border transition-all ${
                currentLocale === lang.code
                  ? "bg-graphite-elevated text-platinum-light border-platinum-mid font-semibold shadow-sm"
                  : "bg-obsidian-soft text-silver-muted border-hairline hover:text-platinum-light hover:border-hairline"
              }`}
            >
              {lang.flag}
              <span>{lang.short}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Pill Button matching reference screenshot */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-graphite/90 border border-hairline/90 text-white text-xs font-semibold hover:border-platinum-dark/70 hover:bg-graphite transition-all shadow-sm focus:outline-none cursor-pointer"
      >
        <div className="shrink-0 flex items-center">{currentLang.flag}</div>
        <span className="leading-none text-white tracking-wide font-medium">{currentLang.label}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-silver-muted transition-transform duration-200 shrink-0 ${isOpen ? "rotate-180" : ""}`}
          strokeWidth={1.8}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 rtl:right-auto rtl:left-0 mt-2 w-38 rounded-xl bg-graphite-elevated border border-hairline shadow-2xl z-50 overflow-hidden py-1 backdrop-blur-md animate-in fade-in zoom-in-95 duration-150">
          {languages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => handleSelect(lang.code)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs text-left rtl:text-right transition-colors cursor-pointer ${
                currentLocale === lang.code
                  ? "bg-hairline/60 text-white font-semibold"
                  : "text-platinum-mid hover:bg-hairline/30 hover:text-white"
              }`}
            >
              <div className="shrink-0 flex items-center">{lang.flag}</div>
              <span className="flex-1 font-medium">{lang.label}</span>
              {currentLocale === lang.code && (
                <Check className="w-3.5 h-3.5 text-white shrink-0" strokeWidth={2} />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
