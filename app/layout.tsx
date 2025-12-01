import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";

import { SITE_CONFIG, SITE_METADATA } from '@/app.config';
import AppFooter from '@/components/business/app-footer';
import AppHeader from '@/components/business/app-header';
import FixedContactButton from '@/components/business/buttons/fixed-contact-button';
import FixedLanguageBanner from '@/components/business/fixed-language-banner';
import BackgroundGrid from '@/components/ui/background-grid';
import "./globals.css";

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
        <meta
          key="twitter:card"
          name="twitter:card"
          content="summary_large_image"
        />
        <meta name="author" content="RustFS" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
        <meta name="yandexbot" content="index, follow" />
        <meta key="twitter:site" name="twitter:site" content="@rustfs" />
        <meta key="twitter:creator" name="twitter:creator" content="@rustfs" />
        <meta key="og:type" property="og:type" content="article" />
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex h-full flex-col`}
      >
        <ThemeProvider enableSystem attribute="class">
          <BackgroundGrid />
          <FixedLanguageBanner />
          <AppHeader />
          {children}
          <AppFooter />
          <FixedContactButton />
          <Script
            id="baidu-analytics"
            src="https://hm.baidu.com/hm.js?968e7103a8e28fb30f7d69e42b7c82bc"
            strategy="afterInteractive" // Ensure script loads after page interaction
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
