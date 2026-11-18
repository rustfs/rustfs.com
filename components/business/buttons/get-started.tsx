'use client'

import { ArrowRightIcon } from "lucide-react";

export default function GetStartedButton() {
  return (
    <a href="https://docs.rustfs.com" className="motion-button group inline-flex items-center justify-center px-6 py-3 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 bg-[#0062FF] text-white transition-colors hover:bg-[#014FDD] hover:text-white active:bg-[#014FDD] active:text-white focus-visible:outline-[#0062FF]">
      <span className="mr-2">Get Started</span>
      <ArrowRightIcon className="motion-arrow size-4 flex-none" strokeWidth={2.5} />
    </a>
  )
}
