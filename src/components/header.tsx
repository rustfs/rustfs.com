import Logo from "@components/svgs/logo.svg";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import siteConfig from "../../config";
import { ThemeToggle } from "./theme-toggle";

export default function Header() {
  const pathname = usePathname()

  return (
    <nav className={clsx(pathname != '/' ? 'border-b' : '')}>
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
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
          id="mega-menu-full"
          className="hidden w-full items-center justify-between font-medium md:order-1 md:flex md:w-auto"
        >
          <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 p-4 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:p-0 rtl:space-x-reverse  dark:border-gray-700">
            {
              siteConfig.topNavLinks.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                    aria-current="page"
                  >
                    {item.name}
                  </a>
                </li>
              ))
            }
            <li className="relative">
              <ThemeToggle />
            </li>
          </ul>
        </div>

      </div>
    </nav>
  )
}
