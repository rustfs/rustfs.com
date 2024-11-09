import { getAllDocsPages } from "@/utils/contents";

const pages = {}

getAllDocsPages().map(post => {
  pages[post.meta.slug] = {
    title: post.meta.title,
    href: `/${post.meta.href}`,
  }
})

const navs = {
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
