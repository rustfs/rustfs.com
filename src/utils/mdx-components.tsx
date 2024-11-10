import { Heading } from '@/components/heading'
import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'

function Img(props) {
  return (
    <div className="not-prose relative my-12 overflow-hidden rounded-2xl first:mt-0 last:mb-0 [a:not(:first-child)>&]:mt-12 [a:not(:last-child)>&]:mb-12 [figure>&]:my-0">
      {/* eslint-disable-next-line */}
      <img {...props} decoding="async" />
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-slate-900/10 dark:ring-white/10" />
    </div>
  )
}

function CustomLink(props) {
  let href = props.href

  if (href.startsWith('/')) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    )
  }

  if (href.startsWith('#')) {
    return <a {...props} />
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />
}

export function mdxComponents(): MDXComponents {
  return {
    Heading,
    a: CustomLink,
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children }) => (
      <h1 style={{ color: 'red', fontSize: '48px' }}>{children}</h1>
    ),
    img: Img,
    Img,
  }
}
