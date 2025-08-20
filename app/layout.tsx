import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
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
  title: 'RustFS - High-Performance Distributed Storage System',
  description: "High-performance distributed storage system built with Rust",
  keywords: "RustFS, distributed storage, cloud storage, S3 compatible, high performance, open source, MinIO alternative",
  authors: [{ name: "RustFS Team" }],
  metadataBase: new URL('https://rustfs.com'),
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale?: string }>;
}>) {
  const { locale } = await params;

  return (
    <html lang={locale || 'zh'} suppressHydrationWarning>
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
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex h-full flex-col`}
      >
        <ThemeProvider enableSystem attribute="class">
          {children}
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
