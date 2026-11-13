import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { BookingModalProvider } from "@/components/BookingModal";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#080A0C",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    de: "First Class Drive | VIP Chauffeur & Transfers Zell am See",
    en: "First Class Drive | VIP Chauffeur & Airport Transfers Zell am See",
    ar: "فيرست كلاس درايف | خدمة سائقين ونقل VIP زيلامسي وكابرون",
  };

  const descriptions: Record<string, string> = {
    de: "Erstklassiger Chauffeurservice & Flughafentransfers in Zell am See & Kaprun. Pünktlich, sicher und komfortabel mit Mercedes-Benz V-Klasse VIP.",
    en: "Premier chauffeur service and VIP airport transfers in Zell am See, Kaprun & Salzburg. Mercedes-Benz luxury fleet available 24/7.",
    ar: "خدمة سائقين VIP وتوصيل مطارات في زيلامسي، كابرون، سالزبورغ وميونخ. أسطول مرسيدس حديث وسائقين محترفين على مدار 24 ساعة.",
  };

  return {
    title: titles[locale] || titles.de,
    description: descriptions[locale] || descriptions.de,
    metadataBase: new URL("https://firstclassdrive.at"),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        de: "/de",
        en: "/en",
        ar: "/ar",
      },
    },
    openGraph: {
      title: titles[locale] || titles.de,
      description: descriptions[locale] || descriptions.de,
      url: `https://firstclassdrive.at/${locale}`,
      siteName: "First Class Drive",
      locale: locale === "ar" ? "ar_AE" : locale === "en" ? "en_US" : "de_AT",
      type: "website",
    },
    icons: {
      icon: "/images/logo.svg",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "de" | "en" | "ar")) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const isRtl = locale === "ar";

  return (
    <html lang={locale} dir={isRtl ? "rtl" : "ltr"} className="dark scroll-smooth">
      <body className="min-h-screen bg-obsidian text-platinum-mid flex flex-col antialiased selection:bg-hairline selection:text-white">
        <NextIntlClientProvider messages={messages}>
          <BookingModalProvider>
            <Navbar />
            <main className="flex-1 w-full">
              {children}
            </main>
            <FloatingContact />
            <Footer />
          </BookingModalProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

