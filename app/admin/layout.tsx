import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Admin Portal | First Class Drive Zell am See",
  description: "Executive Administration & Fleet Management Portal",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#090C12] text-[#E4E7EC] font-sans antialiased min-h-screen selection:bg-[#DFBA73]/30 selection:text-white">
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
