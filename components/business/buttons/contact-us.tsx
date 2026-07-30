'use client'

import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export default function ContactUsButton({ className }: {
  className?: string | string[]
}) {
  return (
    <Link
      className={cn("motion-button group inline-flex h-12 items-center justify-center px-6 py-0 text-sm font-semibold leading-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground/90 active:bg-primary/80 active:text-primary-foreground/80 focus-visible:outline-primary", className)}
      href="/contact-us"
    >
      <span className="mr-2">{'Contact Us'}</span>
      <ArrowRightIcon className="motion-arrow size-4 flex-none" strokeWidth={2.5} />
    </Link>
  )
}
