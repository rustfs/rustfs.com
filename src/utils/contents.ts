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
  console.log(`parsing file: ${filePath}`);
  let rawContent = fs.readFileSync(filePath, 'utf-8')
  let { data: metadata, content } = matter(rawContent)

  content = content.trim()

  // if no title is provided, use the h1 of the content, if no h1 is found, use the filename
  if (!metadata.title) {
    const h1 = content.match(/^#\s+(.*)$/m)
    metadata.title = h1 ? h1[1] : kebabToTitleCase(path.basename(filePath, path.extname(filePath)))
  }

  metadata.excerpt = metadata.excerpt || metadata.descriotion || getExcerpt(content)

  // if no description is provided, use the excerpt, if no excerpt is found, use the first 140 characters of the content
  if (!metadata.description) {
    metadata.description = metadata.excerpt
  }

  // if no publishedAt is provided, use the file creation date
  if (!metadata.publishedAt) {
    metadata.publishedAt = fs.statSync(filePath).birthtime.toISOString()
  }

  // if no tags is provided, use an empty array
  if (!metadata.tags) {
    metadata.tags = []
  }

  // contents/blog/2021-01-01-slug/index.mdx
  metadata.relativePath = filePath.match(/contents\/(.*)\.mdx$/)?.[0]

  metadata.href = filePath.match(/contents\/(.*)\.mdx$/)?.[1].replace(/\/index$/, '')
  metadata.match = new RegExp(metadata.href.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  metadata.publishedAt = parseDate(metadata.publishedAt)

  // if no slug is provided, use the filename
  const segments = metadata.href.split('/').slice(1)
  // `undefined` is used to represent the index page
  metadata.slug = segments.length ? segments : undefined;

  // if meta.image is provided, use it as is, if not, use the first image found in the content
  if (!metadata.image) {
    const match = content.match(/!\[.*?\]\((.*?)\)/)

    if (match) {
      metadata.image = match[1]
    }
  }

  // resolve image path
  if (metadata.image) {
    if (!metadata.image.startsWith('http')) {
      // contents path + image path
      metadata.image = `/@contents/` + path.join(metadata.href, metadata.image)
    }
  } else {
    metadata.image = null
  }

  // if title is H1, remove it from the content
  if (content.startsWith(`# ${metadata.title}`)) {
    content = content.replace(/^# .*$/m, '').trim()
  }

  return {
    metadata,
    content,
    filePath,
    relativePath: metadata.relativePath,
  }
}

function getMDXData(dir) {
  let mdxFiles = getMDXFiles(dir)

  return mdxFiles.map((file) => {
    return readMDXFile(path.join(dir, file))
  })
}

export function getAllBlogPosts() {
  return getMDXData(process.cwd() + '/contents/blog/')
    .sort((a, b) => {
      return b.metadata.publishedAt.getTime() - a.metadata.publishedAt.getTime()
    })
    .filter((post) => {
      return post.metadata.slug !== 'index'
    })
}

export function getAllDocsPages() {
  return getMDXData(process.cwd() + '/contents/docs/')
}

export function getBlogBySlug(slug) {
  return getAllBlogPosts().find((post) => {
    if (slug === undefined) {
      return post.metadata.slug === undefined
    }

    return post.metadata.slug?.join('/') === slug.join('/')
  })
}

export function getDocBySlug(slug) {
  return getAllDocsPages().find((post) => {
    if (slug === undefined) {
      return post.metadata.slug === undefined
    }

    return post.metadata.slug?.join('/') === slug.join('/')
  })
}
