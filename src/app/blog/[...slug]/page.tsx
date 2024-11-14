/* eslint-disable @next/next/no-img-element */

import { Widont } from '@/components/widont';
import buildRss from '@/utils/build-rss';
import { getAllBlogPosts, getBlogBySlug } from '@/utils/contents';
import clsx from 'clsx';
import dayjs from 'dayjs';

export async function generateStaticParams() {
  const posts = await getAllBlogPosts().filter((post) => post.meta.slug && post.meta.slug !== 'index');

  try {
    await buildRss(posts)
  } catch (error) {
    console.error('Error building RSS feed:', error)
  }

  return posts.map(({ meta }) => {
    return {
      slug: meta.slug
    }
  })
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const { meta } = getBlogBySlug(slug)
  return meta
}

async function importBlog(slug) {
  const { meta, relativePath } = getBlogBySlug(slug)

  const filePath = relativePath.replace(/^contents\/blog\//, '')
  const module = await import(`@contents/blog/${filePath}`)

  return {
    meta,
    Content: module.default
  }
}

export default async function BlogPage({ params }) {
  const { slug } = await params
  const { meta, Content } = await importBlog(slug)

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
            <time dateTime={meta.publishedAt}>
              {dayjs(meta.publishedAt).format('YY-MM-DD')}
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
          ))
          }
        </ul>
      </div>
      <div className={clsx('mt-12 prose prose-slate dark:prose-dark')}>
        <Content />
      </div>
    </article>
  )
}
