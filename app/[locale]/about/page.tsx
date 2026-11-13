import React from "react";
import { setRequestLocale } from "next-intl/server";
import { AboutSection } from "@/components/AboutSection";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-10 md:py-12 pb-16 sm:pb-24">
      <AboutSection />
    </div>
  );
}
