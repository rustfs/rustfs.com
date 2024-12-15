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
  'Install and Deploy': [
    pages['introduction'],
    pages['architecture'],
    pages['comparing'],
    pages['license'],
    pages['hardwareselection'],
  ],
  'Quick Start': [
    pages['install/install'],
    pages['install/windows'],
    pages['install/linux'],
    pages['install/snnd'],
    pages['install/snmd'],
    pages['install/mnmd'],
    pages['install/docker'],
    pages['install/macos'],
  ],
  'Check List': [
    pages['deployment/checklists'],
    pages['deployment/hard-checklists'],
    pages['deployment/security-checklists'],
    pages['deployment/software-checklists'],
  ],
  'Core Concepts': [
    pages['core/glossary'],
    pages['core/availability-and-resiliency'],
    pages['core/erasure-coding'],
    pages['core/object-healing'],
    pages['core/object-scanner'],
    pages['core/limit'],
  ],
  'Recover after Hardware Failure': [
    pages['failure/driver'],
    pages['failure/node'],
    pages['failure/cluster'],
  ],
  // 'foo': [
  //  pages['foo']
}

export default navs;
