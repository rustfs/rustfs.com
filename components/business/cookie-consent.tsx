'use client'

import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Script from 'next/script'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react'

const CONSENT_STORAGE_KEY = 'rustfs-cookie-consent'
const CONSENT_EVENT = 'rustfs-cookie-consent-change'
const CONSENT_VERSION = 1
const CONSENT_LIFETIME_MS = 180 * 24 * 60 * 60 * 1000
const GOOGLE_ANALYTICS_ID = 'G-TWW7WMTWL9'

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

type ConsentRecord = {
  analytics: boolean
  updatedAt: string
  version: typeof CONSENT_VERSION
}

type CookieConsentContextValue = {
  analyticsEnabled: boolean
  hasDecision: boolean
  openSettings: () => void
}

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null)

function subscribeToConsent(onStoreChange: () => void) {
  const handleStorage = (event: StorageEvent) => {
    if (event.key === CONSENT_STORAGE_KEY) onStoreChange()
  }

  window.addEventListener('storage', handleStorage)
  window.addEventListener(CONSENT_EVENT, onStoreChange)

  return () => {
    window.removeEventListener('storage', handleStorage)
    window.removeEventListener(CONSENT_EVENT, onStoreChange)
  }
}

function getConsentSnapshot() {
  return window.localStorage.getItem(CONSENT_STORAGE_KEY)
}

function getServerConsentSnapshot() {
  return undefined
}

function parseConsent(rawConsent: string | null | undefined): ConsentRecord | null {
  if (!rawConsent) return null

  try {
    const consent = JSON.parse(rawConsent) as Partial<ConsentRecord>
    const updatedAt = Date.parse(consent.updatedAt ?? '')

    if (
      consent.version !== CONSENT_VERSION ||
      typeof consent.analytics !== 'boolean' ||
      !Number.isFinite(updatedAt) ||
      Date.now() - updatedAt > CONSENT_LIFETIME_MS
    ) {
      return null
    }

    return consent as ConsentRecord
  } catch {
    return null
  }
}

function storeConsent(analytics: boolean) {
  const consent: ConsentRecord = {
    analytics,
    updatedAt: new Date().toISOString(),
    version: CONSENT_VERSION,
  }

  window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent))
  window.dispatchEvent(new Event(CONSENT_EVENT))
}

function clearGoogleAnalyticsCookies() {
  const cookieNames = document.cookie
    .split(';')
    .map((cookie) => cookie.split('=')[0]?.trim())
    .filter((name): name is string => Boolean(name))
    .filter((name) => (
      name === '_ga' ||
      name === '_gid' ||
      name.startsWith('_ga_') ||
      name.startsWith('_gat') ||
      name.startsWith('_gac_')
    ))

  const hostnameParts = window.location.hostname.split('.')
  const registrableDomain = hostnameParts.length > 1
    ? `.${hostnameParts.slice(-2).join('.')}`
    : null
  const domains = ['', window.location.hostname, registrableDomain]

  for (const cookieName of cookieNames) {
    for (const domain of domains) {
      if (domain === null) continue

      const domainAttribute = domain ? `; Domain=${domain}` : ''
      document.cookie = `${cookieName}=; Max-Age=0; Path=/; SameSite=Lax${domainAttribute}`
    }
  }
}

function GoogleAnalytics({ measurementId }: { measurementId: string }) {
  const pathname = usePathname()
  const previousPathname = useRef(pathname)

  useEffect(() => {
    if (previousPathname.current === pathname) return

    previousPathname.current = pathname
    window.gtag?.('event', 'page_view', {
      page_location: `${window.location.origin}${pathname}`,
      page_path: pathname,
      page_title: document.title,
    })
  }, [pathname])

  return (
    <>
      <Script
        id="google-analytics-loader"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
        data-cookie-category="analytics"
      />
      <Script id="google-analytics-config" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('consent', 'default', {
            ad_personalization: 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            analytics_storage: 'granted'
          });
          gtag('js', new Date());
          gtag('config', ${JSON.stringify(measurementId)}, {
            allow_ad_personalization_signals: false,
            allow_google_signals: false,
            anonymize_ip: true,
            page_location: window.location.origin + window.location.pathname,
            page_path: window.location.pathname
          });
        `}
      </Script>
    </>
  )
}

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const rawConsent = useSyncExternalStore(
    subscribeToConsent,
    getConsentSnapshot,
    getServerConsentSnapshot,
  )
  const consent = useMemo(() => parseConsent(rawConsent), [rawConsent])
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [draftAnalytics, setDraftAnalytics] = useState(false)

  const openSettings = useCallback(() => {
    setDraftAnalytics(consent?.analytics ?? false)
    setSettingsOpen(true)
  }, [consent])

  const saveConsent = useCallback((analytics: boolean) => {
    const shouldReload = consent?.analytics === true && !analytics

    if (!analytics) {
      window.gtag?.('consent', 'update', {
        ad_personalization: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        analytics_storage: 'denied',
      })
      clearGoogleAnalyticsCookies()
    }
    storeConsent(analytics)
    setSettingsOpen(false)

    if (shouldReload) window.location.reload()
  }, [consent])

  const contextValue = useMemo<CookieConsentContextValue>(() => ({
    analyticsEnabled: consent?.analytics ?? false,
    hasDecision: consent !== null,
    openSettings,
  }), [consent, openSettings])

  const isClientReady = rawConsent !== undefined

  return (
    <CookieConsentContext.Provider value={contextValue}>
      {children}

      {consent?.analytics && GOOGLE_ANALYTICS_ID ? (
        <GoogleAnalytics measurementId={GOOGLE_ANALYTICS_ID} />
      ) : null}

      {isClientReady && !consent ? (
        <section
          aria-labelledby="cookie-consent-title"
          className="fixed inset-x-0 bottom-0 z-[60] border-t border-border bg-background/95 shadow-[0_-12px_40px_rgba(0,0,0,0.12)] backdrop-blur"
          role="dialog"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div className="max-w-3xl">
              <h2 id="cookie-consent-title" className="text-base font-semibold text-foreground">
                Your privacy choices
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                We use necessary storage for website preferences and, with your permission, analytics technologies to understand website usage. You can accept, reject, or manage non-essential technologies. Read our{' '}
                <Link href="/cookie-policy" className="font-medium text-brand underline-offset-4 hover:underline">
                  Cookie Policy
                </Link>
                .
              </p>
            </div>
            <div className="grid shrink-0 gap-2 sm:grid-cols-3">
              <Button type="button" variant="outline" onClick={() => saveConsent(false)}>
                Reject non-essential
              </Button>
              <Button type="button" variant="outline" onClick={openSettings}>
                Manage preferences
              </Button>
              <Button type="button" onClick={() => saveConsent(true)}>
                Accept analytics
              </Button>
            </div>
          </div>
        </section>
      ) : null}

      <AlertDialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <AlertDialogContent className="max-w-[calc(100%-2rem)] gap-6 p-6 sm:max-w-xl">
          <AlertDialogHeader className="place-items-start text-left">
            <AlertDialogTitle className="text-lg font-semibold">
              Cookie preferences
            </AlertDialogTitle>
            <AlertDialogDescription className="text-left text-sm leading-6 text-muted-foreground">
              Choose whether RustFS may use optional analytics technologies. Necessary storage is always active because it remembers your choices and provides requested website features.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="space-y-3">
            <div className="flex items-start justify-between gap-5 border border-border bg-muted/20 p-4">
              <div>
                <p className="text-sm font-semibold text-foreground">Strictly necessary</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  Remembers privacy, language, and appearance choices and supports website security.
                </p>
              </div>
              <span className="shrink-0 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-brand">
                Always on
              </span>
            </div>

            <label className="flex cursor-pointer items-start justify-between gap-5 border border-border bg-muted/20 p-4">
              <span>
                <span className="block text-sm font-semibold text-foreground">Analytics</span>
                <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                  Allows Google Analytics to measure visits and website usage. Advertising signals and ad personalization are disabled.
                </span>
              </span>
              <input
                aria-label="Allow analytics technologies"
                checked={draftAnalytics}
                className="mt-1 size-4 shrink-0 accent-brand"
                onChange={(event) => setDraftAnalytics(event.target.checked)}
                type="checkbox"
              />
            </label>
          </div>

          <p className="text-xs leading-5 text-muted-foreground">
            See the{' '}
            <Link href="/cookie-policy" className="font-medium text-brand underline-offset-4 hover:underline">
              Cookie Policy
            </Link>{' '}
            for providers, purposes, and retention periods.
          </p>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => saveConsent(draftAnalytics)}>
              Save preferences
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </CookieConsentContext.Provider>
  )
}

export function CookieSettingsButton({ className }: { className?: string }) {
  const context = useContext(CookieConsentContext)

  if (!context) {
    throw new Error('CookieSettingsButton must be used within CookieConsentProvider')
  }

  return (
    <button className={className} onClick={context.openSettings} type="button">
      Cookie Settings
    </button>
  )
}
