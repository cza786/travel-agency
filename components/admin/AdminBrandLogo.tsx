import React from "react";
import Image from "next/image";

interface AdminBrandLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  priority?: boolean;
}

export function AdminBrandLogo({
  className = "",
  size = "md",
  priority = true,
}: AdminBrandLogoProps) {
  let sizeClasses = "h-11";
  let width = 160;
  let height = 63;

  if (size === "sm") {
    sizeClasses = "h-8";
    width = 115;
    height = 45;
  } else if (size === "lg") {
    sizeClasses = "h-14 sm:h-16";
    width = 220;
    height = 87;
  }

  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
      <Image
        src="/images/logo.png"
        alt="First Class Drive - VIP Chauffeur & Transfers Zell am See"
        width={width}
        height={height}
        priority={priority}
        className={`w-auto ${sizeClasses} max-w-full object-contain filter drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]`}
      />
    </div>
  );
}

