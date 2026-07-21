'use client'

import { cn } from "@/lib/utils";
import { productNavigation, resourceNavigation, type NavigationItem } from "@/data/navigation";
import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";
import { Fragment, useEffect, useRef, type RefObject } from 'react';
import LinkGitHub from "./buttons/link-github";
import LinkTwitter from "./buttons/link-twitter";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";

function ClosePopoverOnOutsideClick({
  close,
  open,
  popoverRef,
}: {
  close: () => void;
  open: boolean;
  popoverRef: RefObject<HTMLDivElement | null>;
}) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
      const target = event.target;

      if (target instanceof Node && !popoverRef.current?.contains(target)) {
        close();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick, true);
    document.addEventListener('touchstart', handleOutsideClick, true);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick, true);
      document.removeEventListener('touchstart', handleOutsideClick, true);
    };
  }, [close, open, popoverRef]);

  return null;
}

function NavigationMenu({ label, items, wide = false }: { label: string; items: NavigationItem[]; wide?: boolean }) {
  const popoverRef = useRef<HTMLDivElement>(null);

  return (
    <Popover ref={popoverRef} className="relative">
      {({ close, open }) => (
        <>
          <ClosePopoverOnOutsideClick close={close} open={open} popoverRef={popoverRef} />
          <Popover.Button className="inline-flex items-center gap-1 px-2 py-1 text-sm text-primary transition-colors hover:text-brand">
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
            <Popover.Panel
              className={cn(
                "absolute left-0 top-full z-50 mt-3 border border-border bg-popover p-2 text-popover-foreground shadow-xl",
                wide ? "w-[34rem] lg:w-[42rem]" : "w-96",
              )}
            >
              <div className={cn("space-y-1", wide && "grid grid-cols-2 gap-1 space-y-0")}>
                {items.map((item) => (
                  <a key={item.title} href={item.href} className="block p-3 hover:bg-muted/60">
                    <span className="text-sm font-semibold text-foreground">{item.title}</span>
                    {item.description && (
                      <span className="mt-1 block text-xs leading-5 text-muted-foreground">{item.description}</span>
                    )}
                    {item.items && (
                      <span className="mt-2 block font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                        {item.items.join(" / ")}
                      </span>
                    )}
                  </a>
                ))}
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
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
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/95 py-4 xl:py-5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="relative z-50 flex justify-between">
          <div className="flex items-center lg:gap-x-12">
            <Link href="/" aria-label="Go to homepage">
              <Logo className="h-5 w-auto" />
            </Link>
            <div className="hidden lg:flex lg:items-center lg:gap-x-4">
              <NavigationMenu label="Product" items={productNavigation} wide />
              <NavigationMenu label="Resources" items={resourceNavigation} wide />
              {navs.map((item, index) => {
                return (
                  <a
                    key={index}
                    className={cn(`inline-block px-2 py-1 text-sm text-primary transition-colors hover:text-brand`, item.classes)}
                    href={item.url}
                  >
                    {item.label}
                  </a>
                )
              })}
            </div>
          </div>
          <div className="flex items-center gap-x-2 lg:gap-x-5">
            <div className="hidden items-center gap-x-5 lg:flex">
              <LinkGitHub showText={true} className="group inline-flex" />
              <LinkTwitter className="group inline-flex" />
              <ThemeToggle />
            </div>
            <div className="-mr-1 lg:hidden">
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
                    className="absolute inset-x-0 top-full mt-4 flex max-h-[calc(100dvh-7rem)] origin-top flex-col overflow-y-auto overscroll-contain bg-popover p-4 text-lg tracking-tight text-popover-foreground shadow-xl ring-1 ring-border/60"
                  >
                    <div className="px-2 pb-2 text-xs font-semibold uppercase text-muted-foreground">Product</div>
                    {productNavigation.map((item) => (
                      <a key={item.title} className="block w-full p-2 text-sm hover:bg-muted/50" href={item.href}>{item.title}</a>
                    ))}
                    <div className="mt-3 px-2 pb-2 text-xs font-semibold uppercase text-muted-foreground">Resources</div>
                    {resourceNavigation.map((item) => (
                      <a key={item.title} className="block w-full p-2 text-sm hover:bg-muted/50" href={item.href}>{item.title}</a>
                    ))}
                    <div className="mt-3 px-2 pb-2 text-xs font-semibold uppercase text-muted-foreground">Links</div>
                    {navs.map((item, index) => (
                      <a key={index} className="block w-full p-2 text-sm hover:bg-muted/50" href={item.url}>{item.label}</a>
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
