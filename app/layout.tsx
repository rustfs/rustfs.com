import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Geist, Geist_Mono } from "next/font/google";

import { SITE_CONFIG, SITE_METADATA } from '@/app.config';
import AppFooter from '@/components/business/app-footer';
import AppHeader from '@/components/business/app-header';
import FixedContactButton from '@/components/business/buttons/fixed-contact-button';
import { CookieConsentProvider } from '@/components/business/cookie-consent';
import FixedLanguageBanner from '@/components/business/fixed-language-banner';
import SiteScrollMotion from '@/components/business/site-scroll-motion';
import SkipLink from '@/components/business/skip-link';
import BackgroundGrid from '@/components/ui/background-grid';
import "./globals.css";

const OG_IMAGE_URL = `${SITE_CONFIG.primaryDomain}${SITE_CONFIG.ogImagePath}`;
const OG_IMAGE = {
  url: OG_IMAGE_URL,
  width: 1200,
  height: 630,
  alt: "RustFS — High-Performance S3 Object Storage",
} as const;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: SITE_METADATA.title,
  description: SITE_METADATA.description,
  keywords: SITE_METADATA.keywords,
  authors: [{ name: "RustFS Team" }],
  metadataBase: new URL(SITE_CONFIG.primaryDomain),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    siteName: "RustFS",
    locale: "en_US",
    url: `${SITE_CONFIG.primaryDomain}/`,
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    site: "@rustfs",
    creator: "@rustfs",
    images: [OG_IMAGE_URL],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <meta name="bingbot" content="index, follow" />
        <meta name="yandexbot" content="index, follow" />
        <meta name="baidu-site-verification" content="codeva-TTcVEynElc" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        {/* hreflang configuration */}
        <link rel="alternate" hrefLang="zh-CN" href={SITE_CONFIG.secondaryDomain} />
        <link rel="alternate" hrefLang="en-US" href={SITE_CONFIG.primaryDomain} />
        <link rel="alternate" hrefLang="x-default" href={SITE_CONFIG.primaryDomain} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex h-full flex-col overflow-x-clip antialiased`}
      >
        <CookieConsentProvider>
          <ThemeProvider enableSystem attribute="class">
            <SkipLink />
            <BackgroundGrid />
            <FixedLanguageBanner />
            <AppHeader />
            <SiteScrollMotion />
            <div
              id="main-content"
              tabIndex={-1}
              className="flex min-h-0 flex-1 flex-col outline-none"
            >
              {children}
            </div>
            <AppFooter />
            <FixedContactButton />
          </ThemeProvider>
        </CookieConsentProvider>
      </body>
    </html>
  );
}
