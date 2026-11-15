import React from "react";
import Image from "next/image";

interface LogoProps {
  className?: string;
  variant?: "full" | "icon";
  size?: "default" | "navbar" | "footer" | "large";
  imgClassName?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export function Logo({
  className = "",
  variant = "full",
  size = "default",
  imgClassName = "",
  width,
  height,
  priority = true,
}: LogoProps) {
  // Size presets for prominent brand visibility
  let sizeClasses = "h-9 sm:h-10 md:h-11 lg:h-12";
  let defaultWidth = 190;
  let defaultHeight = 75;

  if (size === "navbar") {
    sizeClasses = "h-9 sm:h-10 md:h-11 lg:h-12";
    defaultWidth = 190;
    defaultHeight = 75;
  } else if (size === "footer") {
    sizeClasses = "h-12 sm:h-14 md:h-16 lg:h-18";
    defaultWidth = 240;
    defaultHeight = 95;
  } else if (size === "large") {
    sizeClasses = "h-14 sm:h-16 md:h-20";
    defaultWidth = 280;
    defaultHeight = 110;
  }

  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
      <Image
        src="/images/logo.png"
        alt="First Class Drive - VIP Chauffeur & Transfers Zell am See"
        width={width || defaultWidth}
        height={height || defaultHeight}
        priority={priority}
        className={`w-auto ${imgClassName || sizeClasses} max-w-full object-contain filter drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]`}
      />
    </div>
  );
}
