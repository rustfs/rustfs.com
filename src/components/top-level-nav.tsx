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
  let pathname = usePathname()

  return (
    <>
      <TopLevelLink
        mobile={mobile}
        href="/docs/installation"
        isActive={pathname.startsWith('/docs')}
        className="mb-4"
        shadow="group-hover:shadow-sky-200 dark:group-hover:bg-sky-500"
        activeBackground="dark:bg-sky-500"
        icon={
          <>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.5 7c1.093 0 2.117.27 3 .743V17a6.345 6.345 0 0 0-3-.743c-1.093 0-2.617.27-3.5.743V7.743C5.883 7.27 7.407 7 8.5 7Z"
              className={clsx(
                'fill-sky-200 group-hover:fill-sky-500',
                pathname.startsWith('/docs')
                  ? 'dark:fill-sky-300 dark:group-hover:fill-sky-300'
                  : 'dark:fill-slate-400 dark:group-hover:fill-sky-300'
              )}
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.5 7c1.093 0 2.617.27 3.5.743V17c-.883-.473-2.407-.743-3.5-.743s-2.117.27-3 .743V7.743a6.344 6.344 0 0 1 3-.743Z"
              className={clsx(
                'fill-sky-400 group-hover:fill-sky-500',
                pathname.startsWith('/docs')
                  ? 'dark:fill-sky-200 dark:group-hover:fill-sky-200'
                  : 'dark:fill-slate-600 dark:group-hover:fill-sky-200'
              )}
            />
          </>
        }
      >
        Documentation
      </TopLevelLink>
      <TopLevelLink
        mobile={mobile}
        href="https://github.com/rustfs/rustfs/discussions"
        className="mb-4"
        shadow="group-hover:shadow-violet-200 dark:group-hover:bg-violet-500"
        icon={
          <>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11 5a6 6 0 0 0-4.687 9.746c.215.27.315.62.231.954l-.514 2.058a1 1 0 0 0 1.485 1.1l2.848-1.71c.174-.104.374-.15.576-.148H13a6 6 0 0 0 0-12h-2Z"
              className={clsx(
                'fill-violet-400 group-hover:fill-violet-500 dark:group-hover:fill-violet-300',
                mobile ? 'dark:fill-slate-500' : 'dark:fill-slate-600'
              )}
            />
            <circle
              cx="12"
              cy="11"
              r="1"
              className={clsx(
                'fill-white dark:group-hover:fill-white',
                mobile ? 'dark:fill-slate-300' : 'dark:fill-slate-400'
              )}
            />
            <circle
              cx="9"
              cy="11"
              r="1"
              className={clsx(
                'fill-violet-200 dark:group-hover:fill-white',
                mobile ? 'dark:fill-slate-300' : 'dark:fill-slate-400'
              )}
            />
            <circle
              cx="15"
              cy="11"
              r="1"
              className={clsx(
                'fill-violet-200 dark:fill-slate-400 dark:group-hover:fill-white',
                mobile ? '' : ''
              )}
            />
          </>
        }
        isActive={pathname.startsWith('/discussions')}
        activeBackground="dark:bg-violet-500"
      >
        Community
      </TopLevelLink>
    </>
  )
}
