import React from "react";
import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { AirportTransfersView } from "@/components/AirportTransfersView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    de: "Flughafentransfer Salzburg, München, Wien, Innsbruck | First Class Drive",
    en: "Airport Transfer Salzburg, Munich, Vienna, Innsbruck | First Class Drive",
    ar: "خدمة توصيل مطارات سالزبورغ وميونخ وزيلامسي | فيرست كلاس درايف",
  };

  const descriptions: Record<string, string> = {
    de: "Erstklassiger Chauffeurservice & Flughafentransfers von Salzburg (SZG), München (MUC), Wien (VIE) & Innsbruck nach Zell am See, Kaprun und die Alpen. Pünktlich, Festpreise & Meet & Greet.",
    en: "VIP chauffeur service & private airport transfers from Salzburg (SZG), Munich (MUC), Vienna (VIE) & Innsbruck to Zell am See, Kaprun and the Austrian Alps. 24/7, fixed rates & Meet and Greet.",
    ar: "خدمة سائق خاص وتوصيل مطارات VIP من مطار سالزبورغ وميونخ وفيينا وإنسبروك إلى زيلامسي وكابرون. أسعار ثابتة، استقبال بالاسم وتتبع الرحلات.",
  };

  return {
    title: titles[locale] || titles.de,
    description: descriptions[locale] || descriptions.de,
    alternates: {
      canonical: `/${locale}/services/airport-transfers`,
      languages: {
        de: "/de/services/airport-transfers",
        en: "/en/services/airport-transfers",
        ar: "/ar/services/airport-transfers",
      },
    },
    openGraph: {
      title: titles[locale] || titles.de,
      description: descriptions[locale] || descriptions.de,
      url: `https://firstclassdrive.at/${locale}/services/airport-transfers`,
      siteName: "First Class Drive",
      locale: locale === "ar" ? "ar_AE" : locale === "en" ? "en_US" : "de_AT",
      type: "website",
      images: [
        {
          url: "/images/airports/van-preview-on-dark.jpg",
          width: 960,
          height: 450,
          alt: "First Class Drive VIP Mercedes V-Class Airport Transfers",
        },
      ],
    },
  };
}

export default async function AirportTransfersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("airportPage");

  // Schema.org Structured Data for rich airport transfer search results & FAQs
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TaxiService",
        "@id": `https://firstclassdrive.at/${locale}/services/airport-transfers#service`,
        "name": t("metaTitle"),
        "serviceType": "Airport Shuttle & VIP Chauffeur Transfer",
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
          { "@type": "City", "name": "Salzburg" },
          { "@type": "City", "name": "München" },
          { "@type": "City", "name": "Innsbruck" },
          { "@type": "City", "name": "Wien" },
        ],
        "description": t("metaDesc"),
      },
      {
        "@type": "FAQPage",
        "@id": `https://firstclassdrive.at/${locale}/services/airport-transfers#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": t("faq.q1"),
            "acceptedAnswer": {
              "@type": "Answer",
              "text": t("faq.a1"),
            },
          },
          {
            "@type": "Question",
            "name": t("faq.q2"),
            "acceptedAnswer": {
              "@type": "Answer",
              "text": t("faq.a2"),
            },
          },
          {
            "@type": "Question",
            "name": t("faq.q3"),
            "acceptedAnswer": {
              "@type": "Answer",
              "text": t("faq.a3"),
            },
          },
          {
            "@type": "Question",
            "name": t("faq.q4"),
            "acceptedAnswer": {
              "@type": "Answer",
              "text": t("faq.a4"),
            },
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
      <AirportTransfersView />
    </>
  );
}
