'use client'

import { ANALYTICS_EVENTS, trackAnalyticsEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { Play } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function DemoLink({ className }: {
  className?: string | string[]
}) {
  const pathname = usePathname();

  return (
    <Link
      href="/demo"
      onClick={() => {
        trackAnalyticsEvent(ANALYTICS_EVENTS.demoCtaClick, {
          link_url: "/demo/",
          link_text: "View Demo",
          link_location: pathname || "/",
        });
      }}
      className={cn('motion-button group inline-flex items-center justify-center px-6 py-3 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 bg-secondary text-secondary-foreground hover:bg-secondary/90 hover:text-secondary-foreground/90 active:bg-secondary/80 active:text-secondary-foreground/80 focus-visible:outline-secondary transition-colors', className)}
    >
      <span className="mr-2">{'View Demo'}</span>
      <Play className="motion-arrow size-4 flex-none" strokeWidth={2.5} />
    </Link>
  )
}
