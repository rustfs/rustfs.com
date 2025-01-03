/* eslint-disable react-hooks/exhaustive-deps */
import FixedContactButton from "@/components/fixed-contact-button";
import Footer from "@/components/footer";
import Header from "@components/header";
import PrelineScript from "@components/preline";
import clsx from "clsx";
import "focus-visible";
import { Metadata } from "next";
import Script from "next/script";
import { ThemeProvider } from "next-themes";
import siteConfig from "../../config";
import "../css/fonts.css";
import "../css/main.css";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <meta
          key="twitter:card"
          name="twitter:card"
          content="summary_large_image"
        />
        <meta key="twitter:site" name="twitter:site" content="@rustfs" />
        <meta key="twitter:creator" name="twitter:creator" content="@rustfs" />
        <meta key="og:type" property="og:type" content="article" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS 2.0"
          href="/feeds/feed.xml"
        />
        <link
          rel="alternate"
          type="application/atom+xml"
          title="Atom 1.0"
          href="/feeds/atom.xml"
        />
        <link
          rel="alternate"
          type="application/json"
          title="JSON Feed"
          href="/feeds/feed.json"
        />
      </head>
      <body
        className={clsx("antialiased text-neutral-700 dark:text-neutral-400")}
      >
        <ThemeProvider enableSystem attribute="class">
          <div className="relative z-50 w-full">
            <Header />
          </div>
          {children}
          <Footer />
        </ThemeProvider>
        <FixedContactButton />
      </body>
      <PrelineScript />
      <Script
        id="baidu-analytics"
        src="https://hm.baidu.com/hm.js?968e7103a8e28fb30f7d69e42b7c82bc"
        strategy="afterInteractive" // 确保脚本在页面交互后加载
      />
    </html>
  );
}
