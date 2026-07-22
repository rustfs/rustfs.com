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
          <div className="max-w-sm pt-5">
            <Logo className="h-8 w-auto" />
            <div className="mt-8 flex flex-col gap-2 text-sm text-muted-foreground">
              <a
                href="mailto:hello@rustfs.com"
                className="transition-colors hover:text-foreground"
              >
                Email: hello@rustfs.com
              </a>
              <span>3550 Lenox Road, NE Atlanta, Georgia 30326</span>
            </div>
          </div>
          {footerNavigation.map((section, sectionIndex) => (
            <div key={sectionIndex} className="pt-5">
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

        <div className="mt-12 border-t border-border pt-8 text-xs text-muted-foreground">
          <p>
            All product names, logos, and brands are property of their respective owners. All company, product and service names used in this website are for identification purposes only. Use of these names, logos, and brands does not imply endorsement.
          </p>
          <div className="mt-8 flex flex-col gap-4 border-t border-border/50 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p>&copy; {new Date().getFullYear()} RustFS. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a
                href={SITE_CONFIG.secondaryDomain}
                className="text-sm transition-colors hover:text-foreground"
              >
                简体中文
              </a>
              <LinkTwitter size="size-4" className="group inline-flex" />
              <LinkDiscord size="size-4" className="group inline-flex" />
              <LinkGitHub className="group inline-flex" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
