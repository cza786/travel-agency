import React from "react";
import { setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/HeroSection";
import { ServicesGrid } from "@/components/ServicesGrid";
import { PricesSection } from "@/components/PricesSection";
import { BookingForm } from "@/components/BookingForm";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="w-full pb-16 sm:pb-24">
      {/* 1. Full-Width Panoramic Hero Section matching Desktop Reference */}
      <HeroSection />

      {/* 2. Containerized Page Sections */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-10 sm:pt-16 lg:pt-20 space-y-12 sm:space-y-16 lg:space-y-24">
        {/* Services Showcase */}
        <ServicesGrid />

        {/* Transparent Fixed Tariffs & Calculator */}
        <section className="w-full max-w-5xl xl:max-w-6xl mx-auto pt-2 sm:pt-4">
          <PricesSection />
        </section>

        {/* VIP Booking Request Flow */}
        <section className="w-full max-w-4xl mx-auto pt-2 sm:pt-4">
          <BookingForm />
        </section>
      </div>
    </div>
  );
}
