'use client'

import { SITE_CONFIG } from '@/app.config';
import { footerNavigation } from '@/data/navigation';
import LinkDiscord from './buttons/link-discord';
import LinkGitHub from './buttons/link-github';
import LinkTwitter from './buttons/link-twitter';
import { Logo } from './logo';

export default function AppFooter() {
  return (
    <footer className="relative z-10 border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-[1.25fr_repeat(3,1fr)]">
          <div className="max-w-sm border-t border-border pt-5">
            <Logo className="h-8 w-auto" />
            <p className="mt-5 text-sm leading-7 text-muted-foreground">
              Apache 2.0 S3-compatible object storage built in Rust. Public beta, with compatibility and feature status published for evaluation.
            </p>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-foreground">
              <a className="hover:text-brand" href="https://docs.rustfs.com/features/s3-compatibility/" target="_blank" rel="noopener noreferrer">S3 overview ↗</a>
              <a className="hover:text-brand" href="https://github.com/rustfs/rustfs#feature--status" target="_blank" rel="noopener noreferrer">Feature status ↗</a>
            </div>
          </div>
          {footerNavigation.map((section, sectionIndex) => (
            <div key={sectionIndex} className="border-t border-border pt-5">
              <h3 className="text-sm font-semibold text-foreground mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <a
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="text-sm text-muted-foreground flex flex-col gap-2">
                <div className="flex flex-col md:flex-row items-center gap-2">
                  <a
                    href="mailto:hello@rustfs.com"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Email: hello@rustfs.com
                  </a>
                  {/*
                    US phone number removed until a new number is registered.
                    <span className="hidden md:inline">|</span>
                    <a href="tel:+14707850446">Phone: +1(470)785-0446 </a>
                  */}
                </div>
                <div className="flex items-center gap-2 text-center md:text-left">
                  <span>3550 Lenox Road, NE Atlanta, Georgia 30326</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a
                href={SITE_CONFIG.secondaryDomain}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                简体中文
              </a>
              <LinkTwitter size="size-4" className="group inline-flex" />
              <LinkDiscord size="size-4" className="group inline-flex" />
              <LinkGitHub className="group inline-flex" />
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-border/50 flex flex-col gap-2 text-xs text-muted-foreground text-center md:text-left">
            <p>
              All product names, logos, and brands are property of their respective owners. All company, product and service names used in this website are for identification purposes only. Use of these names, logos, and brands does not imply endorsement.
            </p>
            <p>
              &copy; {new Date().getFullYear()} RustFS. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
