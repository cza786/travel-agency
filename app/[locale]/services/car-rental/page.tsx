import React from "react";
import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { CarRentalView } from "@/components/CarRentalView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    de: "Mietwagen & Exklusive Fahrzeugvermietung | First Class Drive Zell am See",
    en: "Car Rental & Exclusive Vehicle Hire | First Class Drive Zell am See",
    ar: "تأجير السيارات والمركبات الفاخرة | فيرست كلاس درايف زيلامسي",
  };

  const descriptions: Record<string, string> = {
    de: "Mietwagen & Exklusive Fahrzeugvermietung in Zell am See & Salzburg. Premium Fahrzeuge und Mercedes-Benz V-Klasse flexibel mieten – mit oder ohne Chauffeur.",
    en: "Car rental & exclusive vehicle hire in Zell am See & Salzburg. Rent premium vehicles and Mercedes-Benz V-Class flexibly – with or without chauffeur.",
    ar: "تأجير سيارات فاخرة ومركبات مرسيدس-بنز الفئة V في زيلامسي وسالزبورغ بمرونة – بسائق خاص أو بدون سائق.",
  };

  return {
    title: titles[locale] || titles.de,
    description: descriptions[locale] || descriptions.de,
    alternates: {
      canonical: `/${locale}/services/car-rental`,
      languages: {
        de: "/de/services/car-rental",
        en: "/en/services/car-rental",
        ar: "/ar/services/car-rental",
      },
    },
    openGraph: {
      title: titles[locale] || titles.de,
      description: descriptions[locale] || descriptions.de,
      url: `https://firstclassdrive.at/${locale}/services/car-rental`,
      siteName: "First Class Drive",
      locale: locale === "ar" ? "ar_AE" : locale === "en" ? "en_US" : "de_AT",
      type: "website",
      images: [
        {
          url: "/images/car-rental/rental-banner-desktop.jpg",
          width: 1200,
          height: 450,
          alt: "First Class Drive Mietwagen & Fahrzeugvermietung",
        },
      ],
    },
  };
}

export default async function CarRentalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("carRentalPage");

  // Schema.org Structured Data for AutoRental
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AutoRental",
        "@id": `https://firstclassdrive.at/${locale}/services/car-rental#service`,
        "name": t("metaTitle"),
        "description": t("metaDesc"),
        "provider": {
          "@type": "LocalBusiness",
          "name": "First Class Drive",
          "telephone": "+43 6542 122456",
          "email": "info@firstclassdrive.at",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Zell am See",
            "addressRegion": "Salzburg",
            "addressCountry": "AT",
          },
        },
        "areaServed": [
          { "@type": "City", "name": "Zell am See" },
          { "@type": "City", "name": "Salzburg" },
          { "@type": "City", "name": "Kaprun" },
          { "@type": "City", "name": "Kitzbühel" },
          { "@type": "City", "name": "Saalbach-Hinterglemm" },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CarRentalView />
    </>
  );
}
