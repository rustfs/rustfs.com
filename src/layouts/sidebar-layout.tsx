// import { SearchButton } from '@/components/search'
import { SearchButton } from '@/components/search'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'
import { Dialog, DialogPanel } from '@headlessui/react'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { createContext, forwardRef, useRef } from 'react'

export const SidebarContext = createContext({
  nav: {},
  navIsOpen: false,
  setNavIsOpen: () => { },
})

const NavItem = forwardRef(({ href, children, isActive, isPublished, fallbackHref }: {
  href: string
  children: React.ReactNode
  isActive: boolean
  isPublished: boolean
  fallbackHref: string
}, ref: React.Ref<HTMLLIElement>) => {
  return (
    <li ref={ref} data-active={isActive ? 'true' : undefined}>
      <Link
        href={isPublished ? href : fallbackHref}
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

/**
 * Find the nearest scrollable ancestor (or self if scrollable)
 *
 * Code adapted and simplified from the smoothscroll polyfill
 *
 *
 * @param {Element} el
 */
function nearestScrollableContainer(el) {
  /**
   * indicates if an element can be scrolled
   *
   * @param {Node} el
   */
  function isScrollable(el) {
    const style = window.getComputedStyle(el)
    const overflowX = style['overflowX']
    const overflowY = style['overflowY']
    const canScrollY = el.clientHeight < el.scrollHeight
    const canScrollX = el.clientWidth < el.scrollWidth

    const isScrollableY = canScrollY && (overflowY === 'auto' || overflowY === 'scroll')
    const isScrollableX = canScrollX && (overflowX === 'auto' || overflowX === 'scroll')

    return isScrollableY || isScrollableX
  }

  while (el !== document.body && isScrollable(el) === false) {
    el = el.parentNode || el.host
  }

  return el
}

function Nav({ nav, children, fallbackHref, mobile = false }) {
  const router = useRouter()
  const activeItemRef = useRef<HTMLLIElement | null>()
  const previousActiveItemRef = useRef<HTMLLIElement | null>(null)
  const scrollRef = useRef()

  useIsomorphicLayoutEffect(() => {
    function updatePreviousRef() {
      previousActiveItemRef.current = activeItemRef.current
    }

    if (activeItemRef.current) {
      if (activeItemRef.current === previousActiveItemRef.current) {
        updatePreviousRef()
        return
      }

      updatePreviousRef()

      const scrollable = nearestScrollableContainer(scrollRef.current)

      const scrollRect = scrollable.getBoundingClientRect()
      const activeItemRect = activeItemRef.current.getBoundingClientRect()

      const top = activeItemRef.current.offsetTop
      const bottom = top - scrollRect.height + activeItemRect.height

      if (scrollable.scrollTop > top || scrollable.scrollTop < bottom) {
        scrollable.scrollTop = top - scrollRect.height / 2 + activeItemRect.height / 2
      }
    }
  }, [router.pathname])

  return (
    <nav ref={scrollRef} id="nav" className="relative lg:text-sm lg:leading-6">
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
        {children}
        {nav &&
          Object.keys(nav)
            .map((category) => {
              let publishedItems = nav[category].filter((item) => item?.published !== false)
              if (publishedItems.length === 0 && !fallbackHref) return null

              return (
                <li key={category} className="mt-12 lg:mt-8">
                  <h5
                    className={clsx('mb-8 lg:mb-3 font-semibold', {
                      'text-slate-900 dark:text-slate-200': publishedItems.length > 0,
                      'text-slate-400': publishedItems.length === 0,
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
                    {(fallbackHref ? nav[category] : publishedItems).map((item, i) => {
                      let isActive = item.match
                        ? item.match.test(router.pathname)
                        : item.href === router.pathname
                      return (
                        <NavItem
                          key={i}
                          href={item.href}
                          isActive={isActive}
                          ref={isActive ? activeItemRef : undefined}
                          isPublished={item?.published !== false}
                          fallbackHref={fallbackHref}
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

function TopLevelNav({ mobile }) {
  let { pathname } = useRouter()

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

function Wrapper({ allowOverflow, children }) {
  return <div className={allowOverflow ? undefined : 'overflow-hidden'}>{children}</div>
}

export function SidebarLayout({
  children,
  navIsOpen,
  setNavIsOpen,
  nav,
  sidebar,
  fallbackHref,
  layoutProps: { allowOverflow = true } = {},
}) {
  return (
    <SidebarContext.Provider value={{ nav, navIsOpen, setNavIsOpen }}>
      <Wrapper allowOverflow={allowOverflow}>
        <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="fixed inset-0 left-[max(0px,calc(50%-45rem))] right-auto top-16 z-20 hidden w-[19rem] overflow-y-auto pb-10 pl-8 pr-6 lg:block">
            <Nav nav={nav} fallbackHref={fallbackHref}>
              {sidebar}
            </Nav>
          </div>
          <div className="lg:pl-[19.5rem]">{children}</div>
        </div>
      </Wrapper>
      <Dialog
        open={navIsOpen}
        onClose={() => setNavIsOpen(false)}
        className="fixed inset-0 z-50 overflow-y-auto lg:hidden"
      >
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm dark:bg-slate-900/80" />
        <DialogPanel className="relative w-80 max-w-[calc(100%-3rem)] bg-white p-6 dark:bg-slate-800">
          <button
            type="button"
            onClick={() => setNavIsOpen(false)}
            className="absolute right-5 top-5 z-10 flex size-8 items-center justify-center text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
          >
            <span className="sr-only">Close navigation</span>
            <svg viewBox="0 0 10 10" className="size-2.5 overflow-visible">
              <path
                d="M0 0L10 10M10 0L0 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <Nav nav={nav} fallbackHref={fallbackHref} mobile={true}>
            {sidebar}
          </Nav>
        </DialogPanel>
      </Dialog>
    </SidebarContext.Provider>
  )
}
