import { getAllDocsPages } from "@/utils/contents";

export type DocsNavItemType = { title: string; href: string }
export type DocsNavType = Record<string, DocsNavItemType[]>

const pages: Record<string, DocsNavItemType> = await (async () => {
  let results = {};

  (await getAllDocsPages())
    .map(post => {
      if (!post || !post.metadata.href) {
        return
      }

      return results[post.metadata.href.substring('/docs'.length + 1) || '/'] = {
        title: post.metadata.title,
        href: post.metadata.href,
      } as DocsNavItemType
    });

  return results;
})();

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
