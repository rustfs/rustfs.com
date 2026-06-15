'use client'

import { cn } from "@/lib/utils";
import { productNavigation, resourceNavigation, type NavigationItem } from "@/data/navigation";
import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";
import { Fragment } from 'react';
import LinkGitHub from "./buttons/link-github";
import LinkTwitter from "./buttons/link-twitter";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";

function NavigationMenu({ label, items }: { label: string; items: NavigationItem[] }) {
  return (
    <Popover className="relative">
      <Popover.Button className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-sm text-primary hover:bg-muted/60">
        <span>{label}</span>
        <ChevronDownIcon className="size-3" />
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="duration-150 ease-out"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute left-0 top-full z-50 mt-3 w-80 rounded-lg border border-border bg-popover p-3 text-popover-foreground shadow-xl">
          <div className="space-y-1">
            {items.map((item) => (
              <a key={item.title} href={item.href} className="block rounded-lg p-3 hover:bg-muted/60">
                <span className="text-sm font-semibold text-foreground">{item.title}</span>
                {item.description && (
                  <span className="mt-1 block text-xs leading-5 text-muted-foreground">{item.description}</span>
                )}
                {item.items && (
                  <span className="mt-2 flex flex-wrap gap-1.5">
                    {item.items.map((tag) => (
                      <span key={tag} className="rounded-md bg-muted px-1.5 py-0.5 text-[11px] text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </span>
                )}
              </a>
            ))}
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

export default function AppHeader() {
  const navs = [
    {
      label: 'Download',
      url: `/download`,
      classes: '',
    },
    {
      label: 'Pricing',
      url: '/pricing',
      classes: '',
    },
  ]

  return (
    <header className="py-6 xl:py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="relative z-50 flex justify-between">
          <div className="flex items-center md:gap-x-12">
            <Link href="/" aria-label="Go to homepage">
              <Logo className="h-5 w-auto" />
            </Link>
            <div className="hidden md:flex md:items-center md:gap-x-4">
              <NavigationMenu label="Product" items={productNavigation} />
              <NavigationMenu label="Resources" items={resourceNavigation} />
              {navs.map((item, index) => {
                return (
                  <a
                    key={index}
                    className={cn(`inline-block rounded-lg px-2 py-1 text-sm text-primary`, item.classes)}
                    href={item.url}
                  >
                    {item.label}
                  </a>
                )
              })}
            </div>
          </div>
          <div className="flex items-center gap-x-2 md:gap-x-5">
            <div className="hidden md:flex items-center gap-x-2 md:gap-x-5">
              <LinkGitHub showText={true} className="group inline-flex" />
              <LinkTwitter className="group inline-flex" />
              <ThemeToggle />
            </div>
            <div className="-mr-1 md:hidden">
              <Popover>
                <Popover.Button className="relative z-10 flex h-8 w-8 items-center justify-center focus:not-data-focus:outline-hidden" aria-label="Toggle Navigation">
                  {({ open }) => (
                    <svg aria-hidden="true" className="h-3.5 w-3.5 overflow-visible stroke-foreground/70" fill="none" strokeWidth="2" strokeLinecap="round">
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
                    className="absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-lg bg-popover p-4 text-lg tracking-tight text-popover-foreground shadow-xl ring-1 ring-border/60"
                  >
                    <div className="px-2 pb-2 text-xs font-semibold uppercase text-muted-foreground">Product</div>
                    {productNavigation.map((item) => (
                      <a key={item.title} className="block w-full rounded p-2 text-sm hover:bg-muted/50" href={item.href}>{item.title}</a>
                    ))}
                    <div className="mt-3 px-2 pb-2 text-xs font-semibold uppercase text-muted-foreground">Resources</div>
                    {resourceNavigation.map((item) => (
                      <a key={item.title} className="block w-full rounded p-2 text-sm hover:bg-muted/50" href={item.href}>{item.title}</a>
                    ))}
                    <div className="mt-3 px-2 pb-2 text-xs font-semibold uppercase text-muted-foreground">Links</div>
                    {navs.map((item, index) => (
                      <a key={index} className="block w-full rounded p-2 text-sm hover:bg-muted/50" href={item.url}>{item.label}</a>
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
