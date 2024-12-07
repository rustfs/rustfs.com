import { Heading } from '@/components/heading'
import type { MDXComponents } from 'mdx/types'
import Link, { LinkProps } from 'next/link'
import { AnchorHTMLAttributes, DetailedHTMLProps } from 'react'

function Img(props) {
  return (
    <div className="not-prose relative my-12 overflow-hidden rounded-2xl first:mt-0 last:mb-0 [a:not(:first-child)>&]:mt-12 [a:not(:last-child)>&]:mb-12 [figure>&]:my-0">
      {/* eslint-disable-next-line */}
      <img {...props} decoding="async" />
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-slate-900/10 dark:ring-white/10" />
    </div>
  )
}

function CustomLink(props: DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> & LinkProps) {
  return <Link {...props} />
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Heading,// 依赖 plugins/remark/withTableOfContents 插件
    h1: () => null,
    a: CustomLink,
    img: Img,
    Img,
    ...components,
  }
}
