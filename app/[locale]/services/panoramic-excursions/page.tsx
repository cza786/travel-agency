import React from "react";
import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PanoramicExcursionsView } from "@/components/PanoramicExcursionsView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    de: "Panoramafahrten & Ausflüge in Österreich | First Class Drive",
    en: "Panoramic Excursions & Day Tours in Austria | First Class Drive",
    ar: "جولات بانورامية ورحلات سياحية في النمسا | فيرست كلاس درايف",
  };

  const descriptions: Record<string, string> = {
    de: "Erleben Sie die schönsten Panoramatouren ab Zell am See, Kaprun & Salzburg: Großglockner Hochalpenstraße, Krimmler Wasserfälle & Hallstatt mit privatem Chauffeur.",
    en: "Discover the finest panoramic tours from Zell am See, Kaprun & Salzburg: Grossglockner High Alpine Road, Krimml Waterfalls & Hallstatt with private VIP chauffeur.",
    ar: "اكتشف أجمل الجولات البانورامية من زيلامسي وكابرون وسالزبورغ: قمة غروسغلوكنر، شلالات كريمل وقرية هالشتات مع سائق خاص VIP.",
  };

  return {
    title: titles[locale] || titles.de,
    description: descriptions[locale] || descriptions.de,
    alternates: {
      canonical: `/${locale}/services/panoramic-excursions`,
      languages: {
        de: "/de/services/panoramic-excursions",
        en: "/en/services/panoramic-excursions",
        ar: "/ar/services/panoramic-excursions",
      },
    },
    openGraph: {
      title: titles[locale] || titles.de,
      description: descriptions[locale] || descriptions.de,
      url: `https://firstclassdrive.at/${locale}/services/panoramic-excursions`,
      siteName: "First Class Drive",
      locale: locale === "ar" ? "ar_AE" : locale === "en" ? "en_US" : "de_AT",
      type: "website",
      images: [
        {
          url: "/images/excursions/hero-collage-2x.jpg",
          width: 1430,
          height: 320,
          alt: "First Class Drive Panoramic Excursions Großglockner Hallstatt Krimml",
        },
      ],
    },
  };
}

export default async function PanoramicExcursionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("excursionsPage");

  // Schema.org Structured Data for TouristTrip & TravelAgency
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TouristTrip",
        "@id": `https://firstclassdrive.at/${locale}/services/panoramic-excursions#trip`,
        "name": t("metaTitle"),
        "description": t("metaDesc"),
        "touristType": ["Sightseeing", "Nature", "Luxury Travel"],
        "provider": {
          "@type": "TravelAgency",
          "name": "First Class Drive",
          "telephone": "+43 660 123 4567",
          "email": "info@firstclass-drive.at",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Zell am See",
            "addressCountry": "AT",
          },
        },
        "itinerary": [
          {
            "@type": "TouristAttraction",
            "name": "Großglockner Hochalpenstraße",
            "description": "Österreichs höchster Berg und spektakuläre Hochalpenstraße",
          },
          {
            "@type": "TouristAttraction",
            "name": "Krimmler Wasserfälle",
            "description": "Europas höchste Wasserfälle im Nationalpark Hohe Tauern",
          },
          {
            "@type": "TouristAttraction",
            "name": "Hallstatt",
            "description": "UNESCO-Weltkulturerbe am Hallstätter See",
          },
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
      <PanoramicExcursionsView />
    </>
  );
}
