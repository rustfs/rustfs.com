import { formatDate } from '@/utils/formatDate'
import { Button } from '@components/button'
import clsx from 'clsx'
import Link from 'next/link'

const dateFormat = {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
}

export default function PostItem({ title, category, slug, date, children, wide = false }) {
  return (
    <article
      className={clsx('relative flex flex-col', {
        'max-w-3xl lg:ml-auto xl:max-w-none xl:w-[50rem]': wide,
        'pt-8': category,
      })}
    >
      <h3 className="mb-4 text-xl font-bold tracking-tight text-slate-900 dark:text-slate-200">
        <Link href={`/blog/${slug}`}>{title}</Link>
      </h3>
      <div className="prose prose-slate dark:prose-invert mb-6">{children}</div>
      <div className="mt-auto flex flex-row-reverse items-center justify-end">
        <dl>
          {category && (
            <>
              <dt className="sr-only">Category</dt>
              <dd className="absolute left-0 top-0 text-sm font-semibold leading-6 text-cyan-500">
                {category}
              </dd>
            </>
          )}
          <dt className="sr-only">Date</dt>
          <dd
            className={clsx('text-sm leading-6 dark:text-slate-400', {
              'lg:absolute lg:top-0 lg:right-full lg:mr-8 lg:whitespace-nowrap': wide,
            })}
          >
            <time dateTime={date}>{formatDate(date, dateFormat)}</time>
          </dd>
        </dl>
        <svg
          width="2"
          height="2"
          fill="currentColor"
          className={clsx('mx-4 text-slate-700', { 'lg:hidden': wide })}
        >
          <circle cx="1" cy="1" r="1" />
        </svg>
        <Button href={`/blog/${slug}`}>
          Read more<span className="sr-only">, {title}</span>
        </Button>
      </div>
    </article>
  )
}
