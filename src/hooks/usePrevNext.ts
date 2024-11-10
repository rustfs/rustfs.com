'use client'
import { usePathname } from 'next/navigation'

export function usePrevNext({ navs }) {
  let pathname = usePathname()
  let pages = Object.keys(navs).flatMap((category) => navs[category])
  let pageIndex = pages.findIndex((page) => page.href === pathname)
  return {
    prev: pageIndex > -1 ? pages[pageIndex - 1] : undefined,
    next: pageIndex > -1 ? pages[pageIndex + 1] : undefined,
  }
}
