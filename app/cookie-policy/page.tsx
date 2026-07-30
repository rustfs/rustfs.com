import type { Metadata } from 'next'

import { CookieSettingsButton } from '@/components/business/cookie-consent'

export const metadata: Metadata = {
  title: 'Cookie Policy | RustFS',
  description: 'Learn how RustFS uses cookies and similar technologies on the official website.',
}

const sectionClassName = 'border-t border-border pt-8 first:border-t-0 first:pt-0'
const headingClassName = 'text-2xl font-semibold tracking-tight text-foreground sm:text-3xl'
const subheadingClassName = 'text-lg font-semibold text-foreground'
const paragraphClassName = 'text-base leading-8 text-muted-foreground'

export default function CookiePolicyPage() {
  return (
    <main className="relative z-10 flex-1 text-foreground">
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid gap-8 border-b border-border pb-12 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">
              Legal
            </p>
            <h1 className="mt-5 text-4xl font-semibold tracking-[-0.035em] text-foreground sm:text-5xl">
              Cookie Policy
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-muted-foreground">
              How the RustFS official website uses cookies, local storage, scripts, and similar technologies.
            </p>
          </div>
          <p className="border border-border bg-card px-4 py-3 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Effective July 30, 2026
          </p>
        </div>

        <article className="mx-auto mt-12 max-w-4xl space-y-12 border border-border bg-card p-6 sm:p-10 lg:p-12">
          <section className={sectionClassName}>
            <h2 className={headingClassName}>1. Scope</h2>
            <p className={`${paragraphClassName} mt-5`}>
              This Cookie Policy explains how RustFS (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) uses cookies and similar storage or access technologies on rustfs.com. It should be read together with our{' '}
              <a className="font-medium text-brand underline-offset-4 hover:underline" href="/privacy-policy">
                Privacy Policy
              </a>
              . Cookies are small text files, while similar technologies include browser local storage, scripts, tags, and pixels.
            </p>
          </section>

          <section className={sectionClassName}>
            <h2 className={headingClassName}>2. How We Use These Technologies</h2>
            <div className="mt-5 space-y-7">
              <div>
                <h3 className={subheadingClassName}>Strictly Necessary and Preference Technologies</h3>
                <p className={`${paragraphClassName} mt-3`}>
                  These technologies remember choices you request, record your privacy preference, and help protect forms from abuse. They are not used for advertising. Where applicable law permits, they operate without optional consent because they are necessary to provide requested features or preserve your privacy choices.
                </p>
              </div>
              <div>
                <h3 className={subheadingClassName}>Analytics Technologies</h3>
                <p className={`${paragraphClassName} mt-3`}>
                  With your permission, we use Google Analytics to understand visits, page usage, referring sources, device and browser characteristics, and website performance. Analytics is disabled until you actively accept it and can be disabled again at any time. Google advertising signals and ad personalization are disabled in our configuration.
                </p>
              </div>
            </div>
          </section>

          <section className={sectionClassName}>
            <h2 className={headingClassName}>3. Technology Details</h2>

            <div className="mt-6 overflow-x-auto border border-border">
              <table className="w-full min-w-[720px] border-collapse text-left text-sm">
                <thead className="bg-muted/40 text-foreground">
                  <tr>
                    <th className="border-b border-border px-4 py-3 font-semibold">Name or pattern</th>
                    <th className="border-b border-border px-4 py-3 font-semibold">Provider</th>
                    <th className="border-b border-border px-4 py-3 font-semibold">Purpose</th>
                    <th className="border-b border-border px-4 py-3 font-semibold">Category</th>
                    <th className="border-b border-border px-4 py-3 font-semibold">Duration</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr>
                    <td className="border-b border-border px-4 py-3 font-mono text-xs text-foreground">rustfs-cookie-consent</td>
                    <td className="border-b border-border px-4 py-3">RustFS</td>
                    <td className="border-b border-border px-4 py-3">Stores your analytics choice and the policy version in local storage.</td>
                    <td className="border-b border-border px-4 py-3">Necessary</td>
                    <td className="border-b border-border px-4 py-3">Treated as expired after 6 months</td>
                  </tr>
                  <tr>
                    <td className="border-b border-border px-4 py-3 font-mono text-xs text-foreground">theme</td>
                    <td className="border-b border-border px-4 py-3">RustFS</td>
                    <td className="border-b border-border px-4 py-3">Remembers the light or dark appearance selected by the user in local storage.</td>
                    <td className="border-b border-border px-4 py-3">Preference</td>
                    <td className="border-b border-border px-4 py-3">Until deleted by the user</td>
                  </tr>
                  <tr>
                    <td className="border-b border-border px-4 py-3 font-mono text-xs text-foreground">rustfs-language-banner-dismissed</td>
                    <td className="border-b border-border px-4 py-3">RustFS</td>
                    <td className="border-b border-border px-4 py-3">Remembers that the user dismissed the language suggestion.</td>
                    <td className="border-b border-border px-4 py-3">Preference</td>
                    <td className="border-b border-border px-4 py-3">Until deleted by the user</td>
                  </tr>
                  <tr>
                    <td className="border-b border-border px-4 py-3 font-mono text-xs text-foreground">hCaptcha security identifiers</td>
                    <td className="border-b border-border px-4 py-3">Intuition Machines / hCaptcha</td>
                    <td className="border-b border-border px-4 py-3">Detects automated abuse and enables secure contact-form submission.</td>
                    <td className="border-b border-border px-4 py-3">Necessary</td>
                    <td className="border-b border-border px-4 py-3">Session or provider-defined security period</td>
                  </tr>
                  <tr>
                    <td className="border-b border-border px-4 py-3 font-mono text-xs text-foreground">_ga</td>
                    <td className="border-b border-border px-4 py-3">Google Analytics</td>
                    <td className="border-b border-border px-4 py-3">Distinguishes visitors for aggregate traffic and usage measurement.</td>
                    <td className="border-b border-border px-4 py-3">Analytics</td>
                    <td className="border-b border-border px-4 py-3">Up to 2 years</td>
                  </tr>
                  <tr>
                    <td className="border-b border-border px-4 py-3 font-mono text-xs text-foreground">_ga_&lt;container-id&gt;</td>
                    <td className="border-b border-border px-4 py-3">Google Analytics</td>
                    <td className="border-b border-border px-4 py-3">Maintains session state for the configured analytics property.</td>
                    <td className="border-b border-border px-4 py-3">Analytics</td>
                    <td className="border-b border-border px-4 py-3">Up to 2 years</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className={`${paragraphClassName} mt-5`}>
              Third-party technology names and durations can change when providers update their services. We periodically review this list. For more information about Google&apos;s processing, see{' '}
              <a
                className="font-medium text-brand underline-offset-4 hover:underline"
                href="https://policies.google.com/privacy"
                rel="noreferrer"
                target="_blank"
              >
                Google&apos;s Privacy Policy
              </a>
              {' '}and its explanation of{' '}
              <a
                className="font-medium text-brand underline-offset-4 hover:underline"
                href="https://support.google.com/analytics/answer/11593727"
                rel="noreferrer"
                target="_blank"
              >
                safeguards for Google Analytics data
              </a>
              .
            </p>
          </section>

          <section className={sectionClassName}>
            <h2 className={headingClassName}>4. Your Choices</h2>
            <p className={`${paragraphClassName} mt-5`}>
              You may reject analytics on your first visit, change your preference at any time, or use your browser controls to block or delete storage. Withdrawing analytics consent stops future loading of the analytics script and removes accessible Google Analytics cookies from this website. Third-party cookies that we cannot access may need to be removed through your browser settings.
            </p>
            <CookieSettingsButton className="mt-6 inline-flex h-10 items-center justify-center border border-border bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand" />
          </section>

          <section className={sectionClassName}>
            <h2 className={headingClassName}>5. International Processing</h2>
            <p className={`${paragraphClassName} mt-5`}>
              Analytics and form-security providers may process technical or usage information outside your country, including in the United States. Where required, we use appropriate safeguards and limit processing to the stated purpose. You can avoid analytics-related transfers by rejecting analytics.
            </p>
          </section>

          <section className={sectionClassName}>
            <h2 className={headingClassName}>6. Updates and Contact</h2>
            <p className={`${paragraphClassName} mt-5`}>
              We may update this policy when our technology or legal obligations change. Questions about this policy or our privacy practices may be sent to{' '}
              <a className="font-medium text-brand underline-offset-4 hover:underline" href="mailto:hello@rustfs.com">
                hello@rustfs.com
              </a>
              .
            </p>
          </section>
        </article>
      </section>
    </main>
  )
}
