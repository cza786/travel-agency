import React from "react";
import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { BicycleTransfersView } from "@/components/BicycleTransfersView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    de: "Fahrrad- & Biketransfer Zell am See, Tauernradweg, Alpen | First Class Drive",
    en: "Bicycle & E-Bike Transfers Zell am See, Tauern Cycle Path, Alps | First Class Drive",
    ar: "نقل الدراجات الهوائية والكهربائية زيلامسي، طريق تاورن، جبال الألب | فيرست كلاس درايف",
  };

  const descriptions: Record<string, string> = {
    de: "Erstklassiger Fahrrad- & E-Bike Shuttle im Salzburger Land & Alpenregion: Tauernradweg Rückholservice, Großglockner Bike Challenge, Bikeparks Leogang & Saalbach. Sicherer Transport für bis zu 8 Bikes.",
    en: "First-class bicycle & e-bike shuttle service in Salzburg & the Austrian Alps: Tauern cycle path return service, Grossglockner bike challenge, Leogang & Saalbach bikeparks. Secure transport for up to 8 bikes.",
    ar: "خدمة نقل الدراجات الهوائية والكهربائية الفاخرة في سالزبورغ وجبال الألب: خدمة العودة لمسار تاورن، قمة غروسغلوكنر، ومنتجعات الدراجات في ليوغانغ وزالباخ. نقل آمن لما يصل إلى 8 دراجات.",
  };

  return {
    title: titles[locale] || titles.de,
    description: descriptions[locale] || descriptions.de,
    alternates: {
      canonical: `/${locale}/services/bicycle-transfers`,
      languages: {
        de: "/de/services/bicycle-transfers",
        en: "/en/services/bicycle-transfers",
        ar: "/ar/services/bicycle-transfers",
      },
    },
    openGraph: {
      title: titles[locale] || titles.de,
      description: descriptions[locale] || descriptions.de,
      url: `https://firstclassdrive.at/${locale}/services/bicycle-transfers`,
      siteName: "First Class Drive",
      locale: locale === "ar" ? "ar_AE" : locale === "en" ? "en_US" : "de_AT",
      type: "website",
      images: [
        {
          url: "/images/clean-bikes.jpg",
          width: 1200,
          height: 630,
          alt: "First Class Drive Bicycle & E-Bike Transfers",
        },
      ],
    },
  };
}

export default async function BicycleTransfersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("bikePage");

  // Schema.org Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `https://firstclassdrive.at/${locale}/services/bicycle-transfers#service`,
        "name": t("metaTitle"),
        "serviceType": "Bicycle & E-Bike Shuttle Transfer",
        "provider": {
          "@type": "LocalBusiness",
          "name": "First Class Drive",
          "telephone": "+43 660 123 4567",
          "email": "info@firstclass-drive.at",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Zell am See",
            "addressCountry": "AT",
          },
        },
        "areaServed": [
          { "@type": "City", "name": "Zell am See" },
          { "@type": "City", "name": "Kaprun" },
          { "@type": "City", "name": "Krimml" },
          { "@type": "City", "name": "Salzburg" },
          { "@type": "City", "name": "Leogang" },
          { "@type": "City", "name": "Saalbach-Hinterglemm" },
          { "@type": "City", "name": "Passau" },
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
      <BicycleTransfersView />
    </>
  );
}
