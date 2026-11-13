"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { MapPin, ExternalLink, Loader2 } from "lucide-react";

export function GoogleMapSection() {
  const t = useTranslations("contact");
  const [isLoading, setIsLoading] = useState(true);

  // Exact coordinates and search query for Zell am See, Austria
  const embedUrl =
    "https://maps.google.com/maps?q=Zell%20am%20See,%20Austria&t=&z=13&ie=UTF8&iwloc=&output=embed";
  const directMapsUrl =
    "https://www.google.com/maps/place/Zell+am+See,+Austria/@47.323522,12.796853,13z";

  return (
    <div className="relative w-full h-[260px] sm:h-[320px] md:h-[380px] lg:h-[420px] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-[#0F1216]">
      {/* Background loading skeleton */}
      {isLoading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#0F1216] text-silver-muted gap-3">
          <Loader2 className="w-7 h-7 text-[#DFBA73] animate-spin" />
          <span className="text-xs sm:text-sm font-medium tracking-wide">
            Google Maps wird geladen...
          </span>
        </div>
      )}

      {/* Live Google Map Iframe */}
      <iframe
        src={embedUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Map Zell am See, Austria"
        onLoad={() => setIsLoading(false)}
        className="w-full h-full border-0 transition-opacity duration-500"
      />

      {/* Floating Google Maps Action Button (Matches Screenshot) */}
      <a
        href={directMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="In Google Maps öffnen"
        className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-20 bg-obsidian/90 hover:bg-obsidian backdrop-blur-md border border-white/20 hover:border-[#DFBA73] rounded-lg px-3 py-1.5 text-xs text-white/95 hover:text-[#DFBA73] transition-all shadow-xl flex items-center gap-1.5 group cursor-pointer"
      >
        <span className="font-medium text-[11px] sm:text-xs tracking-wide">Google Maps</span>
        <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </a>
    </div>
  );
}

