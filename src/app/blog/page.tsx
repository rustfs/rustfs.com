import { getAllBlogPosts } from '@/utils/contents'
import { Widont } from '@components/widont'
import clsx from 'clsx'
import dayjs from 'dayjs'
import Link from 'next/link'

const dateFormat = {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
}

export function generateMetadata() {
  return {
    title: 'Blog',
    description: 'All the latest RustFS news, straight from the team.',
  }
}

export default function BlogIndex() {
  const posts = getAllBlogPosts()

  return (
    <main className="mx-auto max-w-[52rem] px-4 pb-28 sm:px-6 md:px-8 lg:max-w-6xl xl:px-12">
      <header className="py-16 sm:text-center">
        <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl dark:text-neutral-200">
          最近更新
        </h1>
        <p className="text-lg text-neutral-700 dark:text-neutral-400">
          <Widont>所有最新的 RustFS 新闻，来自 RustFS 团队。</Widont>
        </p>
        {/* <section className="mt-3 max-w-sm sm:mx-auto sm:px-4">
          <h2 className="sr-only">Sign up for our newsletter</h2>
          <NewsletterForm action="https://app.convertkit.com/forms/3181837/subscriptions" />
        </section> */}
      </header>
      <div className="relative sm:ml-[calc(2rem+1px)] sm:pb-12 md:ml-[calc(3.5rem+1px)] lg:ml-[max(calc(14.5rem+1px),calc(100%-48rem))]">
        <div className="absolute bottom-0 right-full top-3 mr-7 hidden w-px bg-neutral-200 sm:block md:mr-[3.25rem] dark:bg-neutral-800" />
        <div className="space-y-16">
          {posts.map(({ meta }) => (
            <article key={meta.slug} className="group relative">
              <div className="absolute -inset-x-4 -inset-y-2.5 group-hover:bg-neutral-50/70 sm:rounded-2xl md:-inset-x-6 md:-inset-y-4 dark:group-hover:bg-neutral-800/50" />
              <svg
                viewBox="0 0 9 9"
                className="absolute right-full top-2 mr-6 hidden size-[calc(0.5rem+1px)] overflow-visible text-neutral-200 sm:block md:mr-12 dark:text-neutral-600"
              >
                <circle
                  cx="4.5"
                  cy="4.5"
                  r="4.5"
                  stroke="currentColor"
                  className="fill-white dark:fill-neutral-900"
                  strokeWidth={2}
                />
              </svg>
              <div className="relative">
                <h3 className="pt-8 text-base font-semibold tracking-tight text-neutral-900 lg:pt-0 dark:text-neutral-200">
                  {meta.title}
                </h3>
                <div
                  className="prose prose-neutral prose-a:relative prose-a:z-10 dark:prose-dark mb-4 mt-2 line-clamp-2"
                  dangerouslySetInnerHTML={{ __html: meta.excerpt }}
                />
                <dl className="absolute left-0 top-0 lg:left-auto lg:right-full lg:mr-[calc(6.5rem+1px)]">
                  <dt className="sr-only">发布于</dt>
                  <dd className={clsx('whitespace-nowrap text-sm leading-6 dark:text-neutral-400')}>
                    <time dateTime={meta.publishedAt}>{dayjs(meta.publishedAt).format('YY-MM-DD')}</time>
                  </dd>
                </dl>
              </div>
              <Link
                href={`/blog/${meta.slug}`}
                className="flex items-center text-sm font-medium text-sky-500"
              >
                <span className="absolute -inset-x-4 -inset-y-2.5 sm:rounded-2xl md:-inset-x-6 md:-inset-y-4" />
                <span className="relative">
                  阅读全文<span className="sr-only">, {meta.title}</span>
                </span>
                <svg
                  className="relative ml-2.5 mt-px overflow-visible text-sky-300 dark:text-sky-700"
                  width="3"
                  height="6"
                  viewBox="0 0 3 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M0 0L3 3L0 6"></path>
                </svg>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
