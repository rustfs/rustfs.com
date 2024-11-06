import Footer from '@/components/footer'
import ProgressBar from '@badrap/bar-of-progress'
import Header from '@components/header'
import { Description, OgDescription, OgTitle, Title } from '@components/meta'
import * as Fathom from 'fathom-client'
import 'focus-visible'
import Head from 'next/head'
import Router, { useRouter } from 'next/router'
import { Fragment, useEffect, useState } from 'react'
import siteConfig from '../../config'
import '../css/fonts.css'
import '../css/main.css'

const progress = new ProgressBar({
  size: 2,
  color: '#38bdf8',
  className: 'bar-of-progress',
  delay: 100,
})

// this fixes safari jumping to the bottom of the page
// when closing the search modal using the `esc` key
if (typeof window !== 'undefined') {
  progress.start()
  progress.finish()
}

Router.events.on('routeChangeStart', () => progress.start())
Router.events.on('routeChangeComplete', () => progress.finish())
Router.events.on('routeChangeError', () => progress.finish())

function useFathom(code, options) {
  const router = useRouter()

  useEffect(() => {
    Fathom.load(code, options)

    function onRouteChangeComplete() {
      Fathom.trackPageview()
    }
    // Record a pageview when route changes
    router.events.on('routeChangeComplete', onRouteChangeComplete)

    // Unassign event listener
    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete)
    }
  }, [])
}

export default function App({ Component, pageProps, router }) {
  let [navIsOpen, setNavIsOpen] = useState(false)

  useEffect(() => {
    if (!navIsOpen) return
    function handleRouteChange() {
      setNavIsOpen(false)
    }
    Router.events.on('routeChangeStart', handleRouteChange)
    return () => {
      Router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [navIsOpen])

  const Layout = Component.layoutProps?.Layout || Fragment
  const layoutProps = Component.layoutProps?.Layout
    ? { layoutProps: Component.layoutProps, navIsOpen, setNavIsOpen }
    : {}
  const showHeader = router.pathname !== '/' && router.pathname.startsWith('/careers') === false
  const showFooter = true;
  const meta = Component.layoutProps?.meta || {}
  const description =
    meta.metaDescription ||
    meta.description || siteConfig.description
  let image = meta.ogImage ?? meta.image

  let section =
    meta.section ||
    Object.entries(Component.layoutProps?.Layout?.nav ?? {}).find(([, items]) =>
      (items as Array<{ href: string }>).find(({ href }) => href === router.pathname)
    )?.[0]

  return (
    <>
      <Title>{meta.metaTitle || meta.title} </Title>
      {meta.ogTitle && <OgTitle>{meta.ogTitle} </OgTitle>}
      <Description>{description} </Description>
      {meta.ogDescription && <OgDescription>{meta.ogDescription} </OgDescription>}
      <Head>
        <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
        <meta key="twitter:site" name="twitter:site" content="@rustfs" />
        {/* <meta key="twitter:image" name="twitter:image" content={image} /> */}
        <meta key="twitter:creator" name="twitter:creator" content="@rustfs" />
        <meta
          key="og:url"
          property="og:url"
          content={`https://rustfs.com${router.pathname}`
          }
        />
        < meta key="og:type" property="og:type" content="article" />
        <meta key="og:image" property="og:image" content={image} />
        <link rel="alternate" type="application/rss+xml" title="RSS 2.0" href="/feeds/feed.xml" />
        <link rel="alternate" type="application/atom+xml" title="Atom 1.0" href="/feeds/atom.xml" />
        <link rel="alternate" type="application/json" title="JSON Feed" href="/feeds/feed.json" />
      </Head>
      {
        showHeader && (
          <Header />
        )}
      <Layout {...layoutProps} >
        <Component section={section} {...Component.layoutProps} {...pageProps} />
      </Layout>

      {
        showFooter && (
          <Footer />
        )
      }
    </>
  )
}
