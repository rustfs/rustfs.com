
import { useMDXComponents } from '@/components/mdx-components';
import { Widont } from '@/components/widont';
import { getAllBlogPosts, getBlogBySlug } from '@/utils/contents';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { MDXRemote } from 'next-mdx-remote/rsc';

export async function generateStaticParams() {
  return await getAllBlogPosts().map(({ meta }) => {
    return {
      slug: meta.href.split('/').slice(1),
    }
  })
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const { meta } = getBlogBySlug(slug.join('/'))
  return meta
}

export default async function BlogPage({ params }) {
  const { slug } = await params
  const { meta, content } = getBlogBySlug(slug.join('/'))

  return (
    <article className="relative pt-10">
      <h1
        className={clsx(
          'text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-200 md:text-3xl '
        )}
      >
        <Widont>{meta.title}</Widont>
      </h1>
      <div className="text-sm leading-6">
        <dl>
          <dt className="sr-only">Date</dt>
          <dd
            className={clsx('absolute top-0 inset-x-0 text-slate-700 dark:text-slate-400')}
          >
            <time dateTime={meta.published_at}>
              {dayjs(meta.published_at).format('YY-MM-DD')}
            </time>
          </dd>
        </dl>
      </div>
      <div className="mt-6">
        <ul className={clsx('flex flex-wrap text-sm leading-6 -mt-6 -mx-5')}>
          {(meta.authors ?? []).map((author) => (
            <li
              key={author.twitter}
              className="mt-6 flex items-center whitespace-nowrap px-5 font-medium"
            >
              <img
                src={author.avatar}
                alt=""
                className="mr-3 size-9 rounded-full bg-slate-50 dark:bg-slate-800"
                decoding="async"
              />
              <div className="text-sm leading-4">
                <div className="text-slate-900 dark:text-slate-200">{author.name}</div>
                <div className="mt-1">
                  <a
                    href={`https://twitter.com/${author.twitter}`}
                    className="text-sky-500 hover:text-sky-600 dark:text-sky-400"
                  >
                    @{author.twitter}
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className={clsx('mt-12 prose prose-slate dark:prose-dark')}>
        <MDXRemote source={content} components={useMDXComponents} />
      </div>
    </article>
  )
}
