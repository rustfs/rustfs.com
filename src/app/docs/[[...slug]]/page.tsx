
import { DocsFooter } from '@/components/docs/docs-footer';
import { PageHeader } from '@/components/page-header';
import { getAllDocsPages, getDocBySlug } from '@/utils/contents';
import navs from '@contents/docs/navs';
import Link from 'next/link';

export async function generateStaticParams() {
  const pages = await getAllDocsPages()

  return pages.map(({ metadata }) => {
    return { slug: metadata.slug }
  })
}

export async function generateMetadata({ params }) {
  let { slug } = await params
  return (await getDocBySlug(slug)).metadata
}


export default async function DocPage({ params }) {
  let { slug } = await params
  const { metadata, mdx } = await getDocBySlug(slug)
  const Content = mdx.default
  const pathname = metadata.href
  const toc = metadata.toc ?? []

  return (
    <>
      <PageHeader
        title={metadata.title}
        description={metadata.description}
        repo={metadata.repo}
        badge={{ key: 'RustFS version', value: metadata.featureVersion }}
      // section={section}
      />

      <div
        id="content-wrapper"
        className="prose prose-slate dark:prose-dark relative z-20 mt-8"
      >
        <Content />
      </div>

      <DocsFooter navs={navs}>
        <Link
          href={`https://github.com/rustfs/rustfs.com/edit/main/contents/${pathname}.mdx`}
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
