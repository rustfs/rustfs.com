'use client'

import { cn } from "@/lib/utils";
import { ArrowDownToLineIcon } from "lucide-react";
import Link from "next/link";

export default function DownloadLink({ className }: {
  className?: string | string[]
}) {
  return (
    <Link href={`/download`} className={cn('group inline-flex h-12 items-center justify-center px-6 py-0 text-sm font-semibold leading-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-primary text-primary-foreground focus-visible:outline-secondary transition-colors', className)}>
      <span className="mr-2">{'Download'}</span>
      <ArrowDownToLineIcon className="size-4 flex-none" strokeWidth={2.5} />
    </Link>
  )
}
