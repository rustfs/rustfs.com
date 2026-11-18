'use client'

import { cn } from "@/lib/utils";
import { ANALYTICS_EVENTS, isDemoHref, trackAnalyticsEvent } from "@/lib/analytics";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ContactUsButton({
  className,
  href = "/demo",
  label = "Try the live demo",
}: {
  className?: string | string[]
  href?: string
  label?: string
}) {
  const pathname = usePathname();

  return (
    <Link
      className={cn("motion-button group inline-flex h-12 items-center justify-center px-6 py-0 text-sm font-semibold leading-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-[#0062FF] text-white hover:bg-[#014FDD] hover:text-white active:bg-[#014FDD] active:text-white focus-visible:outline-[#0062FF]", className)}
      href={href}
      onClick={() => {
        if (!isDemoHref(href)) {
          return;
        }

        trackAnalyticsEvent(ANALYTICS_EVENTS.demoCtaClick, {
          link_url: href,
          link_text: label,
          link_location: pathname || "/",
        });
      }}
    >
      <span className="mr-2">{label}</span>
      <ArrowRightIcon className="motion-arrow size-4 flex-none" strokeWidth={2.5} />
    </Link>
  )
}
