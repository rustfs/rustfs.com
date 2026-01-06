'use client'

import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export default function ContactUsButton({ className }: {
  className?: string | string[]
}) {return (
    <Link
      className={cn("group inline-flex items-center justify-center rounded-full py-3 px-6 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground/90 active:bg-primary/80 active:text-primary-foreground/80 focus-visible:outline-primary", className)}
      href="/contact"
    >
      <span className="mr-2">{'Contact Us'}</span>
      <ArrowRightIcon className="h-3 w-3 flex-none" strokeWidth={2.5} />
    </Link>
  )
}
