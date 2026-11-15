import React from "react";
import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { VipChauffeurTaxiView } from "@/components/VipChauffeurTaxiView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    de: "VIP Chauffeur Taxi in Salzburg & Umgebung | First Class Drive",
    en: "VIP Chauffeur Taxi in Salzburg & Surroundings | First Class Drive",
    ar: "تاكسي VIP وسائق خاص في سالزبورغ وما حولها | فيرست كلاس درايف",
  };

  const descriptions: Record<string, string> = {
    de: "Ihr exklusiver Chauffeur- und Taxiservice in Salzburg: Stadtfahrten & VIP Rides, Restaurant-Transfers und Ski-Transfers mit First Class Drive.",
    en: "Your exclusive private chauffeur and taxi service in Salzburg: city rides, fine dining restaurant transfers, and alpine ski transfers with First Class Drive.",
    ar: "خدمة سائقين خاصة وتاكسي VIP في سالزبورغ: جولات داخل المدينة، توصيل المطاعم الراقية، ونقل منتجعات التزلج بأعلى مستويات الرفاهية.",
  };

  return {
    title: titles[locale] || titles.de,
    description: descriptions[locale] || descriptions.de,
    alternates: {
      canonical: `/${locale}/services/vip-chauffeur-taxi`,
      languages: {
        de: "/de/services/vip-chauffeur-taxi",
        en: "/en/services/vip-chauffeur-taxi",
        ar: "/ar/services/vip-chauffeur-taxi",
      },
    },
    openGraph: {
      title: titles[locale] || titles.de,
      description: descriptions[locale] || descriptions.de,
      url: `https://firstclassdrive.at/${locale}/services/vip-chauffeur-taxi`,
      siteName: "First Class Drive",
      locale: locale === "ar" ? "ar_AE" : locale === "en" ? "en_US" : "de_AT",
      type: "website",
      images: [
        {
          url: "/images/vip-taxi/salzburg-van-scene-2x.jpg",
          width: 1240,
          height: 540,
          alt: "First Class Drive VIP Chauffeur Taxi Salzburg",
        },
      ],
    },
  };
}

export default async function VipChauffeurTaxiPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("vipTaxiPage");

  // Schema.org Structured Data for TaxiService / ChauffeurService
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TaxiService",
        "@id": `https://firstclassdrive.at/${locale}/services/vip-chauffeur-taxi#service`,
        "name": t("metaTitle"),
        "serviceType": "VIP Chauffeur & Executive Taxi Service",
        "provider": {
          "@type": "LocalBusiness",
          "name": "First Class Drive",
          "telephone": "+43 660 123 4567",
          "email": "info@firstclass-drive.at",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Salzburg / Zell am See",
            "addressCountry": "AT",
          },
        },
        "areaServed": [
          { "@type": "City", "name": "Salzburg" },
          { "@type": "City", "name": "Zell am See" },
          { "@type": "City", "name": "Kaprun" },
          { "@type": "City", "name": "Kitzbühel" },
          { "@type": "City", "name": "Saalbach" },
        ],
        "description": t("metaDesc"),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <VipChauffeurTaxiView />
    </>
  );
}
