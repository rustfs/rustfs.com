type Meta = {
  excerpt: ReactNode
  href: Key
  title: string
  description: string
  tags: string[]
  authors: string[]
  publishedAt: string
  image: string | null
}

type Content = {
  meta: Meta
  content: string
  filePath: string
}

type BlogPost = Content
type DocPage = Content
