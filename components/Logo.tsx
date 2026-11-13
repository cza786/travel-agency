import React from "react";
import Image from "next/image";

interface LogoProps {
  className?: string;
  variant?: "full" | "icon";
  width?: number;
  height?: number;
  priority?: boolean;
}

export function Logo({
  className = "",
  variant = "full",
  width,
  height,
  priority = true,
}: LogoProps) {
  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
      <Image
        src="/images/logo.png"
        alt="First Class Drive - VIP Chauffeur & Transfers Zell am See"
        width={width || 170}
        height={height || 67}
        priority={priority}
        className="w-auto h-7 sm:h-8 md:h-9 max-w-full object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
      />
    </div>
  );
}
