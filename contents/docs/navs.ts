import { getAllDocsPages } from "@/utils/contents";

export type DocsNavItemType = { title: string; href: string }
export type DocsNavType = Record<string, DocsNavItemType[]>

const pages: Record<string, DocsNavItemType> = {}

getAllDocsPages().map(post => {
  pages[post.metadata.slug] = {
    title: post.metadata.title,
    href: `/${post.metadata.href}`,
  }
})

const navs: DocsNavType = {
  'Getting Started': [
    pages['installation'],
    pages['introduction'],
    pages['requirements'],
  ],
  // 'Core Concepts': [

  // ],
  // 'foo': [
  //  pages['foo']
}

export default navs;
