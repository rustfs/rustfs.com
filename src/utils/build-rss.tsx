import fs from 'fs'
import RSS from 'rss'
import siteConfig from '../../config'

export default async function buildRss(posts) {
  const siteUrl = 'https://rustfs.com'
  const blogUrl = `${siteUrl}/blog`

  const feed = new RSS({
    title: 'RustFS Blog',
    description: 'All the latest RustFS news, straight from the team.',
    site_url: siteUrl,
    language: 'zh-CN',
    image_url: `${siteUrl}/opengraph-image.png`,
    copyright: `All rights reserved ${new Date().getFullYear()}, RustFS.com`,
    feed_url: `${siteUrl}/feeds/feed.xml`,
    generator: 'RustFS',
  })

  posts.forEach(async ({ meta, content }) => {
    // let image = meta.ogImage ?? meta.image
    // image = image
    //   ? `${baseUrl}${image.default?.src ?? image.src ?? image}`
    //   : `${baseUrl}/api/og?path=/blog/${meta.slug}`

    if (!meta.authors || meta.authors?.length === 0) {
      meta.authors = [siteConfig.defaultAuthor]
    }

    feed.item({
      title: meta.title,
      url: `${blogUrl}/${meta.slug}`,
      description: meta.description,
      author: meta.authors.map(({ name, twitter }) => ({
        name,
        link: `https://twitter.com/${twitter}`,
      })),
      date: new Date(meta.date),
      // enclosure: {
      //   url: post.imageUrl, // 文章的图片，如果有的话
      // }
    })
  })

  fs.mkdirSync('./public/feeds', { recursive: true })
  fs.writeFileSync('./public/feeds/feed.xml', feed.xml({ indent: true }))
  fs.writeFileSync('./public/feeds/atom.xml', feed.xml({ indent: true }))
}
