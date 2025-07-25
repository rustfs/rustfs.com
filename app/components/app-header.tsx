'use client'

import { useI18n } from "@/lib/i18n";
import { docs_url } from "@/lib/utils";
import { Popover, Transition } from '@headlessui/react';
import Link from "next/link";
import { Fragment } from 'react';
import LinkGitHub from "./buttons/link-github";
import LinkTwitter from "./buttons/link-twitter";
import LanguageToggle from "./language-toggle";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";

export default function AppHeader() {
  const { tw, language } = useI18n();

  const navs = [
    {
      label: tw('产品功能', 'Features', 'Özellikler'),
      url: docs_url('features/distributed/', language),
    },
    {
      label: tw('架构', 'Architecture', 'Mimari'),
      url: docs_url('architecture.html', language),
    },
    {
      label: tw('解决方案', 'Solutions', 'Çözümler'),
      url: docs_url('features/data-lake/', language),
    },
    // {
    //   label: tw('集成', 'Integrations'),
    //   url: `https://docs.rustfs.com/${locale}/intergrations`
    // },
    {
      label: tw('AI 支持', 'AI', 'AI'),
      url: docs_url('features/ai', language)
    },
    {
      label: tw('下载', 'Download', 'İndir'),
      url: '/download'
    },
    {
      label: tw('文档', 'Documentation', 'Dokümantasyon'),
      url: docs_url('', language)
    },
    // {
    //   label: 'Blog',
    //   url: '/blog'
    // },
    {
      label: tw('社区', 'Community', 'Topluluk'),
      url: 'https://github.com/rustfs/rustfs/discussions'
    },
    {
      label: tw('关于我们', 'About Us', 'Hakkımızda'),
      url: docs_url('about', language)
    }
  ]

  return (
    <header className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="relative z-50 flex justify-between">
          <div className="flex items-center md:gap-x-12">
            <Link href="/">
              <Logo className="h-5 w-auto" />
            </Link>
            <div className="hidden md:flex md:gap-x-6">
              {navs.map((item, index) => {
                return <a key={index} className="inline-block rounded-lg px-2 py-1 text-sm text-primary" href={item.url}>{item.label}</a>
              })}
            </div>
          </div>
          <div className="flex items-center gap-x-2 md:gap-x-5">
            <div className="hidden md:flex items-center gap-x-2 md:gap-x-5">
              <LanguageToggle />
              <ThemeToggle />
              <LinkGitHub size="size-5" className="group inline-flex" />
              <LinkTwitter size="size-5" className="group inline-flex" />
            </div>
            <div className="-mr-1 md:hidden">
              <Popover>
                <Popover.Button className="relative z-10 flex h-8 w-8 items-center justify-center focus:not-data-focus:outline-hidden" aria-label="Toggle Navigation">
                  {({ open }) => (
                    <svg aria-hidden="true" className="h-3.5 w-3.5 overflow-visible stroke-slate-700 dark:stroke-slate-300" fill="none" strokeWidth="2" strokeLinecap="round">
                      <path d="M0 1H14M0 7H14M0 13H14" className={`origin-center transition ${open ? 'scale-90 opacity-0' : ''}`} />
                      <path d="M2 2L12 12M12 2L2 12" className={`origin-center transition ${open ? '' : 'scale-90 opacity-0'}`} />
                    </svg>
                  )}
                </Popover.Button>
                <Transition
                  as={Fragment}
                  enter="duration-150 ease-out"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="duration-100 ease-in"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Popover.Panel
                    focus
                    className="absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white p-4 text-lg tracking-tight text-slate-900 shadow-xl ring-1 ring-slate-900/5 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700"
                  >
                    {navs.map((item, index) => (
                      <a key={index} className="block w-full p-2 rounded hover:bg-slate-100/50 dark:hover:bg-slate-700/50" href={item.url}>{item.label}</a>
                    ))}
                  </Popover.Panel>
                </Transition>
              </Popover>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}
