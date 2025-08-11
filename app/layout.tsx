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
  title: "RustFS - MinIO 国产化替代方案, 高性能分布式存储",
  description: "RustFS 使用全球最热,性能最好的内存安全Rust语言开发的高性能对象存储是开源的、兼容 OSS 的 Kubernetes 原生云存储,专为 AI 等云原生工作负载而设计。适合企业构建私有云存储、混合云存储和分布式存储,也是 MinIO 的国产化替代方案。",
  keywords: "RustFS, MinIO, 分布式存储, 高性能, 高安全, 高并发, S3, Rust, 云原生, Cloud Native, Docker,存储桶, Bucket, 存储, 对象存储, MinIO 国产化替代方案",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
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
