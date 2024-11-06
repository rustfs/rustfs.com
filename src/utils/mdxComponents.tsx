import { Heading } from '@/components/heading'
import { Editor } from '@components/editor'
import Link from 'next/link'

function Img(props) {
  return (
    <div className="relative not-prose [a:not(:first-child)>&]:mt-12 [a:not(:last-child)>&]:mb-12 my-12 first:mt-0 last:mb-0 rounded-2xl overflow-hidden [figure>&]:my-0" >
      {/* eslint-disable-next-line */}
      <img {...props} decoding="async" />
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-slate-900/10 dark:ring-white/10" />
    </div>
  )
}

export const mdxComponents = {
  Heading,
  a: Link,
  img: Img,
  Img,
  Editor,
}
