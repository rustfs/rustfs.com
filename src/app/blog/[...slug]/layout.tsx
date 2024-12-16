/* eslint-disable @next/next/no-img-element */
import { NewsletterForm } from '@components/newsletter-form'
import Link from 'next/link'

export default function BlogPostLayout({ children }) {
  return (
    <div className="overflow-hidden">
      <div className="mx-auto max-w-5xl">
        <div className="flex px-4 pb-10 pt-8 lg:px-8">
          <Link
            href="/blog"
            className="group flex text-sm font-semibold leading-6 text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white"
          >
            <svg
              viewBox="0 -9 3 24"
              className="mr-3 h-6 w-auto overflow-visible text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300"
            >
              <path
                d="M3 0L0 3L3 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Go back
          </Link>
        </div>
      </div>
      <div className="px-4 sm:px-6 md:px-8">
        <div className="mx-auto max-w-3xl">
          <main>
            {children}
          </main>
          <footer className="mt-16">
            <div className="relative pb-28">
              <section className="relative border-t border-slate-200 py-16 dark:border-slate-200/5">
                <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
                  Get all of our updates directly to your&nbsp;inbox.
                  <br />
                  Sign up for our newsletter.
                </h2>
                <div className="mt-5 max-w-md">
                  <NewsletterForm action="https://app.convertkit.com/forms/3181881/subscriptions" />
                </div>
              </section>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}
