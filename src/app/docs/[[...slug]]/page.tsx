
import { DocsFooter } from '@/components/docs-footer';
import { useMDXComponents } from '@/components/mdx-components';
import { PageHeader } from '@/components/page-header';
import { getAllDocsPages, getDocBySlug } from '@/utils/contents';
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
        className="relative z-20 prose prose-slate mt-8 dark:prose-dark"
      >
        <MDXRemote source={content} components={useMDXComponents} />
      </div>

      <DocsFooter>
        <Link
          href={`https://github.com/rustfs/rustfs.com/edit/main/contents${pathname}.mdx`}
          className="hover:text-slate-900 dark:hover:text-slate-400"
        >
          Edit this page on GitHub
        </Link>
      </DocsFooter>

      <div className="fixed z-20 top-[3.8125rem] bottom-0 right-[max(0px,calc(50%-45rem))] w-[19.5rem] py-10 overflow-y-auto hidden xl:block">
        {/* {toc.length > 0 && (
          <TableOfContents tableOfContents={toc} />
        )} */}
      </div>
    </>
  )
}
