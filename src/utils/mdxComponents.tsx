import { Heading } from '@/components/heading'
import Link from 'next/link'

function Img(props) {
  return (
    <div className="not-prose relative my-12 overflow-hidden rounded-2xl first:mt-0 last:mb-0 [a:not(:first-child)>&]:mt-12 [a:not(:last-child)>&]:mb-12 [figure>&]:my-0" >
      {/* eslint-disable-next-line */}
      <img {...props} decoding="async" />
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-slate-900/10 dark:ring-white/10" />
    </div>
  )
}

export const mdxComponents = {
  h1: (props) => <Heading {...props} />,
  h2: (props) => <Heading {...props} />,
  h3: (props) => <Heading {...props} />,
  h4: (props) => <Heading {...props} />,
  h5: (props) => <Heading {...props} />,
  h6: (props) => <Heading {...props} />,
  img: Img,
  a: (props) => <Link {...props} />,
}
