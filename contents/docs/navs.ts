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
  'RustFS概述': [
    pages['architecture'],
    pages['comparing'],
    pages['license'],
    pages['hardwareselection'],
    pages['mode'],
  ],
  '快速安装': [
    pages['install/windows'],
    pages['install/linux'],
    pages['install/macos'],
    pages['install/docker'],
  ],
  '检查列表': [
    pages['deployment/checklists'],
    pages['deployment/hard-checklists'],
    pages['deployment/security-checklists'],
    pages['deployment/software-checklists'],
    pages['deployment/network-checklists'],
  ],
  '核心概念': [
    pages['core/glossary'],
    pages['core/availability-and-resiliency'],
    pages['core/erasure-coding'],
    pages['core/object-healing'],
    pages['core/object-scanner'],
    pages['core/limit'],
  ],
  '故障恢复': [
    pages['failure/driver'],
    pages['failure/node'],
    pages['failure/cluster'],
  ],
  // 'foo': [
  //  pages['foo']
}

export default navs;
