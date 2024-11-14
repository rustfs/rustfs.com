export type Metadata = {
  excerpt: ReactNode
  href: Key
  title: string
  description: string
  tags: string[]
  authors: string[]
  publishedAt: string
  image: string | null
}


export type Content = {
  metadata: Meta
  content: string
  filePath: string
}

export type BlogPost = Content
export type DocPage = Content
