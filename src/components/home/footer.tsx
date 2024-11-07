import { Logo } from '@/components/logo'
import { documentationNav } from '@/navs/documentation'
import Link from 'next/link'

const footerNav = [
  {
    'Getting Started': documentationNav['Getting Started'],
    'Core Concepts': documentationNav['Core Concepts'],
  },
  {
    Customization: documentationNav['Customization'],
    Community: [
      { title: 'GitHub', href: 'https://github.com/rustfs/rustfs' },
      { title: 'Discord', href: '/discord' },
      { title: 'Twitter', href: 'https://twitter.com/rustfs' },
      { title: 'YouTube', href: 'https://www.youtube.com/rustfs' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="pb-16 text-sm leading-6">
      <div className="mx-auto max-w-7xl divide-y divide-slate-200 px-4 sm:px-6 md:px-8 dark:divide-slate-700">
        <div className="flex">
          {footerNav.map((sections) => (
            <div
              key={Object.keys(sections).join(',')}
              className="w-1/2 flex-none space-y-10 sm:space-y-8 lg:flex lg:space-y-0"
            >
              {Object.entries(sections).map(([title, items]) => (
                <div key={title} className="lg:w-1/2 lg:flex-none">
                  <h2 className="font-semibold text-slate-900 dark:text-slate-100">{title}</h2>
                  <ul className="mt-3 space-y-2">
                    {items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="hover:text-slate-900 dark:hover:text-slate-300"
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-16 pt-10">
          <Logo className="h-6 w-auto" />
        </div>
      </div>
    </footer>
  )
}
