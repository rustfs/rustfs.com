import createMDX from '@next/mdx'
import type { NextConfig } from 'next'
import rehypeUnwrapImages from 'rehype-unwrap-images'
import remarkGfm from 'remark-gfm'
import { createLoader } from 'simple-functional-loader'
import { recmaImportImages } from './recma/importImages.mjs'
import { withLinkRoles } from './rehype/withLinkRoles.mjs'
import { withTableOfContents } from './remark/withTableOfContents.mjs'

const fallbackLayouts = {
  'src/pages/docs/**/*': ['@/layouts/documentation-layout', 'DocumentationLayout'],
}

const fallbackDefaultExports = {
  'src/pages/{docs,components}/**/*': ['@/layouts/contents-layout', 'ContentsLayout'],
  'src/pages/blog/**/*': ['@/layouts/blog-post-layout', 'BlogPostLayout'],
}

const fallbackGetStaticProps = {}

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      remarkGfm,
      rehypeUnwrapImages,
      // withExamples,
      withTableOfContents,
      // withSyntaxHighlighting,
      // withSmartQuotes,
    ],
    rehypePlugins: [withLinkRoles],
    recmaPlugins: [[recmaImportImages, { property: 'src' }]],
  },
})

const nextConfig: NextConfig = {
  output: 'export',
  pageExtensions: ['ts', 'tsx', 'mdx'],
  experimental: {
    scrollRestoration: true,
  },
  images: {
    dangerouslyAllowSVG: true,
  },
  transpilePackages: ['next-mdx-remote'],
  webpack(config, options) {
    config.module.rules.push({
      test: /\.mp4$/i,
      issuer: /\.(jsx?|tsx?|mdx)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next',
            name: 'static/media/[name].[sha1:hash].[ext]',
          },
        },
      ],
    })

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    // Remove the 3px deadzone for drag gestures in Framer Motion
    config.module.rules.push({
      test: /node_modules\/framer-motion/,
      use: createLoader(function (source) {
        return source.replace(
          /var isDistancePastThreshold = .*?$/m,
          'var isDistancePastThreshold = true'
        )
      }),
    })

    return config
  }
}

export default withMDX(nextConfig)
