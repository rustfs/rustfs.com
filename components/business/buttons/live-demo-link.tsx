'use client'

import type { ReactNode } from 'react'

import { ANALYTICS_EVENTS, trackAnalyticsEvent } from '@/lib/analytics'

interface LiveDemoLinkProps {
  className?: string
  href: string
  children: ReactNode
}

export default function LiveDemoLink({ className, href, children }: LiveDemoLinkProps) {
  return (
    <a
      className={className}
      href={href}
      rel="noopener noreferrer"
      onClick={() => {
        trackAnalyticsEvent(ANALYTICS_EVENTS.liveDemoOpen, {
          link_url: href,
          link_text: 'Enter the public demo',
          link_location: 'demo_page',
        })
      }}
    >
      {children}
    </a>
  )
}
