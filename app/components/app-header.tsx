'use client'

import LinkGitHub from "./buttons/link-github";
import LinkTwitter from "./buttons/link-twitter";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";

export default function AppHeader() {
  const navs = [
    {
      label: '产品功能',
      url: 'https://docs.rustfs.com/docs/features',
    },
    {
      label: '架构',
      url: 'https://docs.rustfs.com/docs/architecture',
    },
    {
      label: '解决方案',
      url: 'https://docs.rustfs.com/docs/solutions',
    },
    {
      label: '集成',
      url: 'https://docs.rustfs.com/docs/intergrations'
    },
    {
      label: 'AI 支持',
      url: 'https://docs.rustfs.com/docs/ai'
    },
    {
      label: '数据湖',
      url: 'https://docs.rustfs.com/docs/data-lake'
    },
    {
      label: '文档',
      url: 'https://docs.rustfs.com/docs'
    },
    // {
    //   label: '博客',
    //   url: '/blog'
    // },
    {
      label: '社区',
      url: 'https://github.com/rustfs/rustfs/discussions'
    },
    {
      label: '关于我们',
      url: '/about'
    }
  ]

  return (
    <header className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="relative z-50 flex justify-between">
          <div className="flex items-center md:gap-x-12">
            <a aria-label="Home" href="#">
              <Logo className="h-5 w-auto" />
            </a>
            <div className="hidden md:flex md:gap-x-6">
              {navs.map((item, index) => {
                return <a key={index} className="inline-block rounded-lg px-2 py-1 text-sm text-primary" href={item.url}>{item.label}</a>
              })}
            </div>
          </div>
          <div className="flex items-center gap-x-2 md:gap-x-5">
            <div className="hidden md:flex items-center gap-x-2 md:gap-x-5">
              <ThemeToggle />
              <LinkGitHub size="size-5" className="group inline-flex" />
              <LinkTwitter size="size-5" className="group inline-flex" />
            </div>
            <div className="-mr-1 md:hidden">
              <div data-headlessui-state="">
                <button className="relative z-10 flex h-8 w-8 items-center justify-center focus:not-data-focus:outline-hidden" aria-label="Toggle Navigation" type="button" aria-expanded="false" data-headlessui-state="" id="headlessui-popover-button-:R5v6fja:">
                  <svg aria-hidden="true" className="h-3.5 w-3.5 overflow-visible stroke-slate-700" fill="none" strokeWidth="2" strokeLinecap="round">
                    <path d="M0 1H14M0 7H14M0 13H14" className="origin-center transition" />
                    <path d="M2 2L12 12M12 2L2 12" className="origin-center transition scale-90 opacity-0" />
                  </svg>
                </button>
              </div>
              <div hidden style={{ position: 'fixed', top: '1px', left: '1px', width: '1px', height: 0, padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', borderWidth: 0, display: 'none' }} />
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}
