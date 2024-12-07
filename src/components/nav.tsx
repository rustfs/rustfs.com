'use client'
import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { forwardRef } from "react"
import { SearchButton } from "./search"
import TopLevelNav from "./top-level-nav"

const NavItem = forwardRef(({ href, children, isActive, isPublished }: {
  href: string
  children: React.ReactNode
  isActive: boolean
  isPublished: boolean
}, ref: React.Ref<HTMLLIElement>) => {
  return (
    <li ref={ref} data-active={isActive ? 'true' : undefined}>
      <Link
        href={href}
        className={clsx('block border-l pl-4 -ml-px', {
          'text-sky-500 border-current font-semibold dark:text-sky-400': isActive,
          'border-transparent hover:border-slate-400 dark:hover:border-slate-500': !isActive,
          'text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300':
            !isActive && isPublished,
          'text-slate-400': !isActive && !isPublished,
        })}
      >
        {children}
      </Link>
    </li>
  )
})

NavItem.displayName = 'NavItem'

export default function Nav({ navs, mobile = false }) {
  const pathname = usePathname()
  return (
    <nav id="nav" className="relative lg:text-sm lg:leading-6">
      <div className="pointer-events-none sticky top-0 -ml-0.5">
        {!mobile && <div className="h-10" />}
        <div className="pointer-events-auto relative">
          <SearchButton className="dark:highlight-white/5 hidden w-full items-center rounded-md py-1.5 pl-2 pr-3 text-sm leading-6 text-slate-400 shadow-sm ring-1 ring-slate-900/10 hover:ring-slate-300 lg:flex dark:bg-slate-800 dark:hover:bg-slate-700">
            {({ actionKey }) => (
              <>
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  aria-hidden="true"
                  className="mr-3 flex-none"
                >
                  <path
                    d="m19 19-3.5-3.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="11"
                    cy="11"
                    r="6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Quick search...
                {actionKey && (
                  <span className="ml-auto flex-none pl-3 text-xs font-semibold">
                    {actionKey[0]}K
                  </span>
                )}
              </>
            )}
          </SearchButton>
        </div>
        {!mobile && <div className="h-8" />}
      </div>
      <ul>
        <TopLevelNav mobile={mobile} />
        {navs &&
          Object.keys(navs)
            .map((category) => {
              let subItems = navs[category].filter(Boolean)
              return (
                <li key={category} className="mt-12 lg:mt-8">
                  <h5
                    className={clsx('mb-8 lg:mb-3 font-semibold', {
                      'text-slate-900 dark:text-slate-200': subItems.length > 0,
                      'text-slate-400': subItems.length === 0,
                    })}
                  >
                    {category}
                  </h5>
                  <ul
                    className={clsx(
                      'space-y-6 lg:space-y-2 border-l border-slate-100',
                      mobile ? 'dark:border-slate-700' : 'dark:border-slate-800'
                    )}
                  >
                    {subItems.map((item, i) => {
                      let isActive = item.href === pathname || item.href === pathname + '/' || item.href + '/' === pathname
                      return (
                        <NavItem
                          key={i}
                          href={item.href}
                          isActive={isActive}
                          isPublished={item?.published !== false}
                        >
                          {item.shortTitle || item.title}
                        </NavItem>
                      )
                    })}
                  </ul>
                </li>
              )
            })
            .filter(Boolean)}
      </ul>
    </nav>
  )
}
