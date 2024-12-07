'use client'

import Logo from "@components/svgs/logo.svg";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { forwardRef } from "react";
import siteConfig from "../../config";
import { ThemeToggle } from "./theme-toggle";

interface NavItemProps {
  item: {
    name: string;
    href: string;
    description?: string;
  };
  className?: string;
}

const NavItem = forwardRef<HTMLDivElement, NavItemProps>(({ item, className }, ref) => {
  return (
    <div key={item.name} className={clsx('group', className)}>
      <a
        href={item.href}
        className="flex flex-col gap-1 rounded px-3 py-2 text-gray-900 hover:bg-gray-100 md:group-hover:bg-transparent md:group-hover:text-blue-700 dark:border-gray-700 dark:text-white dark:group-hover:bg-gray-700 dark:group-hover:text-blue-500 md:dark:group-hover:bg-transparent md:dark:group-hover:text-blue-500"
        aria-current="page"
      >
        <span>{item.name}</span>
        {item.description && <span className="text-muted-foreground text-sm font-normal">{item.description}</span>}
      </a>
    </div>
  )
})

NavItem.displayName = 'NavItem';

const GroupedMegaMenu = ({ item }) => {
  return (
    <div key={item.name} className="hs-dropdown [--adaptive:none] [--is-collapse:true] [--strategy:static] sm:[--trigger:hover] md:[--is-collapse:false] md:[--strategy:absolute]">
      <button
        id={`mega-menu-${item.id}`}
        type="button"
        aria-haspopup="menu" aria-expanded="false" aria-label="Mega Menu"
        className="hs-dropdown-toggle block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
      >
        <span>{item.name}</span>
      </button>
      <div className="hs-dropdown-menu hs-dropdown-open:opacity-100 relative start-0 top-full z-50 hidden w-full min-w-60 opacity-0 transition-[opacity,margin] before:absolute before:-top-5 before:start-0 before:h-5 before:w-full md:duration-150" role="menu" aria-orientation="vertical" aria-labelledby={`mega-menu-${item.id}`}>
        <div className="md:mx-6 md:rounded-lg md:bg-white md:shadow-md lg:mx-8 dark:md:bg-neutral-800">
          <div className="gap-4 py-1 md:grid md:grid-cols-2 md:p-2 lg:grid-cols-4 lg:p-6">
            {item.children.map((child) => (
              <div className="flex flex-col p-2" key={child.name + child.href}>
                <div className="text-primary border-b border-neutral-100 px-3 pb-2 font-bold dark:border-neutral-700">{child.name}</div>
                <div className="space-y-2 py-2">
                  {
                    child.children.map((grated) => (
                      <NavItem item={grated} key={grated.name} className="rounded hover:bg-neutral-100" />
                    ))
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const MegaMenu = ({ item }) => {
  return (
    <div key={item.name} className="hs-dropdown [--adaptive:none] [--is-collapse:true] [--strategy:static] sm:[--trigger:hover] md:[--is-collapse:false] md:[--strategy:absolute]">
      <button
        id={`mega-menu-${item.id}`}
        type="button"
        aria-haspopup="menu" aria-expanded="false" aria-label="Mega Menu"
        className="hs-dropdown-toggle block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
      >
        <span>{item.name}</span>
      </button>
      <div className="hs-dropdown-menu hs-dropdown-open:opacity-100 relative start-0 top-full z-50 hidden w-full min-w-60 opacity-0 transition-[opacity,margin] before:absolute before:-top-5 before:start-0 before:h-5 before:w-full md:duration-150" role="menu" aria-orientation="vertical" aria-labelledby={`mega-menu-${item.id}`}>
        <div className="md:mx-6 md:rounded-lg md:bg-white md:shadow-md lg:mx-8 dark:md:bg-neutral-800">
          <div className="gap-4 py-1 md:grid md:grid-cols-2 md:p-2 lg:grid-cols-4 lg:p-6">
            {
              item.children.map((grated) => (
                <NavItem item={grated} key={grated.name} className="rounded hover:bg-neutral-100" />
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Header() {
  const pathname = usePathname()

  return (
    <nav className={clsx(pathname != '/' ? 'border-b' : '')}>
      <div className="relative mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <a
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Logo />
          <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
          </span>
        </a>
        <button
          data-collapse-toggle="mega-menu-full"
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="mega-menu-full"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="size-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className="z-50 hidden w-full items-center justify-between font-medium md:order-1 md:flex md:w-auto"
        >
          <div className="mt-4 flex flex-col items-center rounded-lg border border-gray-100 md:mt-0 md:flex-row md:space-x-8 md:border-0 rtl:space-x-reverse  dark:border-gray-700">
            {siteConfig.topNavLinks.map((item) => (
              <div key={item.name} >
                {!item.children && <NavItem key={item.name} item={item} />}
                {item.children && item.groupd && <GroupedMegaMenu key={item.name} item={item} />}
                {item.children && !item.groupd && <MegaMenu key={item.name} item={item} />}
              </div>
            ))}
            <div className="relative">
              <ThemeToggle />
            </div>
          </div>
        </div>

      </div>
    </nav>
  )
}
