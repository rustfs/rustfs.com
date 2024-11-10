'use client'
/* eslint-disable react-hooks/exhaustive-deps */
import Footer from '@/components/footer'
import { Title } from '@/components/meta'
import Header from '@components/header'
import clsx from 'clsx'
import 'focus-visible'
import { ThemeProvider } from 'next-themes'
import { usePathname } from 'next/navigation'
import siteConfig from '../../config'
import '../css/fonts.css'
import '../css/main.css'

export default function RootLayout({ children }) {
  const pathname = usePathname()
  const meta = {
    title: siteConfig.title,
    description: siteConfig.description,
  }

  const description = meta.description || siteConfig.description

  return (
    <html lang='zh-CN' suppressHydrationWarning>
      <head>
        <Title>{meta.title} </Title>
        <meta key="description" content={description} />
        <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
        <meta key="twitter:site" name="twitter:site" content="@rustfs" />
        <meta key="twitter:creator" name="twitter:creator" content="@rustfs" />
        <meta
          key="og:url"
          property="og:url"
          content={`https://rustfs.com${pathname}`
          }
        />
        <meta key="og:type" property="og:type" content="article" />
        <link rel="alternate" type="application/rss+xml" title="RSS 2.0" href="/feeds/feed.xml" />
        <link rel="alternate" type="application/atom+xml" title="Atom 1.0" href="/feeds/atom.xml" />
        <link rel="alternate" type="application/json" title="JSON Feed" href="/feeds/feed.json" />
      </head>
      <body className={clsx('antialiased text-neutral-500 dark:text-neutral-400')}>
        <ThemeProvider enableSystem attribute="class">
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
