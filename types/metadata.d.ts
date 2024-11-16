export type Metadata = {
  excerpt: ReactNode
  href: Key
  title: string
  description: string
  tags: string[]
  authors: string[]
  publishedAt: string
  image: function | null
  imageUrl: string | null
}


export type Content = {
  metadata: Meta
  content: string
  mdx: any
}

export type BlogPost = Content
export type DocPage = Content
