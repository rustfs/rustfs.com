
import { DocsFooter } from '@/components/docs/docs-footer';
import { PageHeader } from '@/components/page-header';
import { getAllDocsPages, getDocBySlug } from '@/utils/contents';
import { mdxComponents } from '@/utils/mdx-components';
import navs from '@contents/docs/navs';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';

export async function generateStaticParams() {
  return await getAllDocsPages().map(({ meta }) => {
    return {
      slug: meta.href.split('/').slice(1),
    }
  })
}

export async function generateMetadata({ params }) {
  let { slug } = await params

  if (!slug || slug.length === 0) {
    slug = ['index']
  }

  const { meta } = getDocBySlug(slug.join('/'))
  return meta
}

export default async function DocPage({ params }) {
  let { slug } = await params

  if (!slug || slug.length === 0) {
    slug = ['index']
  }

  const { meta, content } = getDocBySlug(slug.join('/'))
  const pathname = slug.join('/')
  const toc = meta.toc ?? []

  return (
    <>
      <PageHeader
        title={meta.title}
        description={meta.description}
        repo={meta.repo}
        badge={{ key: 'RustFS version', value: meta.featureVersion }}
      // section={section}
      />

      <div
        id="content-wrapper"
        className="prose prose-slate dark:prose-dark relative z-20 mt-8"
      >
        <MDXRemote source={content} components={mdxComponents} />
      </div>

      <DocsFooter navs={navs}>
        <Link
          href={`https://github.com/rustfs/rustfs.com/edit/main/contents${pathname}.mdx`}
          className="hover:text-slate-900 dark:hover:text-slate-400"
        >
          Edit this page on GitHub
        </Link>
      </DocsFooter>

      <div className="fixed bottom-0 right-[max(0px,calc(50%-45rem))] top-[3.8125rem] z-20 hidden w-[19.5rem] overflow-y-auto py-10 xl:block">
        {/* {toc.length > 0 && (
          <TableOfContents tableOfContents={toc} />
        )} */}
      </div>
    </>
  )
}
