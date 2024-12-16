'use client'

import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"

function TopLevelLink({
  children,
  href,
  className,
  icon,
  isActive,
  onClick,
  shadow,
  activeBackground,
  mobile,
}: {
  children: React.ReactNode | string
  href: string
  className?: string
  icon: React.ReactNode
  isActive: boolean
  onClick?: () => void
  shadow: string
  activeBackground: string
  mobile: boolean
}) {
  return (
    <li>
      <Link
        href={href}
        onClick={onClick}
        className={clsx(
          'group flex items-center lg:text-sm lg:leading-6',
          className,
          isActive
            ? 'font-semibold text-sky-500 dark:text-sky-400'
            : 'font-medium text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300'
        )}
      >
        <div
          className={clsx(
            'mr-4 rounded-md ring-1 ring-slate-900/5 shadow-sm group-hover:shadow group-hover:ring-slate-900/10 dark:ring-0 dark:shadow-none dark:group-hover:shadow-none dark:group-hover:highlight-white/10',
            shadow,
            isActive
              ? [activeBackground, 'dark:highlight-white/10']
              : mobile
                ? 'dark:bg-slate-700 dark:highlight-white/5'
                : 'dark:bg-slate-800 dark:highlight-white/5'
          )}
        >
          <svg className="size-6" viewBox="0 0 24 24" fill="none">
            {icon}
          </svg>
        </div>
        {children}
      </Link>
    </li>
  )
}


export default function TopLevelNav({ mobile }) {
  let pathname = usePathname() || ''


}
