import fs from 'fs';
import { globSync } from 'glob';
import matter from 'gray-matter';
import path from 'path';
import { parseDate } from './formatDate';
import { kebabToTitleCase } from './kebabToTitleCase';

function getMDXFiles(dir) {
  return globSync('**/*.mdx', { cwd: dir })
}

function getExcerpt(content) {
  // by <!-- more --> separator
  const match = content.match(/<!--\s*more\s*-->/)

  if (match) {
    return content.slice(0, match.index)
  }

  // get first paragraph excluding headings
  const paragraphs = content.split('\n\n')

  for (let i = 0; i < paragraphs.length; i++) {
    const paragraph = paragraphs[i].trim()
    if (!paragraph.startsWith('#') && !paragraph.startsWith('---')) {
      return paragraph.substring(0, 140)
    }
  }

  return ''
}

function readMDXFile(filePath) {
  let rawContent = fs.readFileSync(filePath, 'utf-8')
  let { data: meta, content } = matter(rawContent)

  content = content.trim()

  // if no title is provided, use the h1 of the content, if no h1 is found, use the filename
  if (!meta.title) {
    const h1 = content.match(/^#\s+(.*)$/m)
    meta.title = h1 ? h1[1] : kebabToTitleCase(path.basename(filePath, path.extname(filePath)))
  }

  meta.excerpt = meta.excerpt || meta.descriotion || getExcerpt(content)

  // if no description is provided, use the excerpt, if no excerpt is found, use the first 140 characters of the content
  if (!meta.description) {
    meta.description = meta.excerpt
  }

  // if no published_at is provided, use the file creation date
  if (!meta.published_at) {
    meta.published_at = fs.statSync(filePath).birthtime.toISOString()
  }

  // if no slug is provided, use the filename
  if (!meta.slug) {
    meta.slug = path.basename(filePath, path.extname(filePath))
  }

  // if no tags is provided, use an empty array
  if (!meta.tags) {
    meta.tags = []
  }

  meta.href = filePath.match(/contents\/(.*)\.mdx$/)?.[1].replace(/\/index$/, '')
  meta.match = new RegExp(meta.href.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  meta.published_at = parseDate(meta.published_at)

  // if title is H1, remove it from the content
  if (content.startsWith(`# ${meta.title}`)) {
    content = content.replace(/^# .*$/m, '').trim()
  }

  return {
    meta,
    content,
    filePath
  }
}

function getMDXData(dir) {
  let mdxFiles = getMDXFiles(dir)
  return mdxFiles.map((file) => {
    return readMDXFile(path.join(dir, file))
  })
}

export function getAllBlogPosts() {
  return getMDXData(process.cwd() + '/contents/blog')
    .sort((a, b) => {
      return b.meta.published_at.getTime() - a.meta.published_at.getTime()
    })
    .filter((post) => {
      return post.meta.slug !== 'index'
    })
}

export function getAllDocsPages() {
  return getMDXData(process.cwd() + '/contents/docs')
}

export function getBlogBySlug(slug) {
  return getAllBlogPosts().find((post) => post.meta.slug === slug)
}

export function getDocBySlug(slug) {
  return getAllDocsPages().find((post) => post.meta.slug === slug)
}
