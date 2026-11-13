"use client";

import React from "react";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function FloatingContact() {
  return (
    <>
      {/* Floating WhatsApp Action (Always accessible, adapts to LTR/RTL) */}
      <a
        href="https://wa.me/436641234567"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp Chauffeur VIP"
        className="fixed bottom-6 right-6 rtl:right-auto rtl:left-6 z-40 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-whatsapp text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200 group ring-4 ring-whatsapp/20"
      >
        <WhatsAppIcon className="w-6 h-6 text-black fill-current group-hover:scale-110 transition-transform" />
        {/* Tooltip on desktop */}
        <span className="hidden sm:group-hover:inline-block absolute right-16 rtl:right-auto rtl:left-16 px-3 py-1.5 rounded-lg bg-obsidian-soft border border-hairline text-white text-xs font-semibold whitespace-nowrap shadow-xl">
          WhatsApp 24/7 VIP
        </span>
      </a>
    </>
  );
}
