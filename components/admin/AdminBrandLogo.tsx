import React from "react";

interface AdminBrandLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function AdminBrandLogo({ className = "", size = "md" }: AdminBrandLogoProps) {
  const scale = size === "sm" ? 0.8 : size === "lg" ? 1.3 : 1;

  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      {/* Mountain Peaks SVG */}
      <svg
        width={100 * scale}
        height={32 * scale}
        viewBox="0 0 100 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
      >
        {/* Outer and inner stylized mountain ridges */}
        <path
          d="M10 26L34 6L50 20L64 4L90 26"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M34 6L39 12L46 10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M64 4L68 12L76 9"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Subtle ridge crease */}
        <path
          d="M64 4V24"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="2 2"
          strokeOpacity="0.4"
        />
      </svg>

      {/* Typography */}
      <span
        style={{ letterSpacing: "0.22em" }}
        className="text-white font-extrabold text-[13px] tracking-[0.22em] uppercase mt-1"
      >
        First Class
      </span>
      <span
        style={{ letterSpacing: "0.35em" }}
        className="text-[#9CA3AF] font-medium text-[9px] tracking-[0.35em] uppercase -mt-0.5"
      >
        Drive
      </span>
    </div>
  );
}
