import createMDX from '@next/mdx';
import type { NextConfig } from 'next';
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from 'remark-gfm';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import { createLoader } from 'simple-functional-loader';
import { recmaImportImages } from './src/plugins/recma/importImages.mjs';
// import { withSyntaxHighlighting } from './src/plugins/remark/withSyntaxHighlighting.mjs';
// import { withTableOfContents } from './src/plugins/remark/withTableOfContents.mjs';

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      remarkGfm,
      remarkFrontmatter,
      [remarkMdxFrontmatter as any, { name: 'metadata' }],
      // rehypeUnwrapImages,
      // withTableOfContents,
      // withSyntaxHighlighting,
    ],
    // rehypePlugins: [withLinkRoles],
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
    unoptimized: true
  },
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
