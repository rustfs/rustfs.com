#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

// Configuration
const BASE_URL = 'https://rustfs.com'
const OUT_DIR = 'out'
const SITEMAP_OUTPUT = 'out/sitemap.xml'

// Page priority configuration
const PAGE_PRIORITIES = {
  '/': 1.0,
  '/download/': 0.9,
}

// Page change frequency configuration
const PAGE_CHANGE_FREQ = {
  '/': 'weekly',
  '/download/': 'monthly',
}

// Scan directory and generate URL list
function scanDirectory(dirPath, basePath = '') {
  const urls = []

  try {
    const items = fs.readdirSync(dirPath)

    for (const item of items) {
      const fullPath = path.join(dirPath, item)
      const relativePath = path.join(basePath, item)
      const stat = fs.statSync(fullPath)

      if (stat.isDirectory()) {
        // Recursively scan subdirectories
        urls.push(...scanDirectory(fullPath, relativePath))
      } else if (item === 'index.html') {
        // Found index.html file, generate corresponding URL
        const urlPath = basePath === '' ? '/' : `/${basePath.replace(/\\/g, '/')}/`
        urls.push(urlPath)
      }
    }
  } catch (error) {
    console.error(`Error scanning directory ${dirPath}:`, error)
  }

  return urls
}

// Get page priority
function getPagePriority(url) {
  return PAGE_PRIORITIES[url] || 0.5
}

// Get page change frequency
function getPageChangeFreq(url) {
  return PAGE_CHANGE_FREQ[url] || 'monthly'
}

// Generate sitemap XML
function generateSitemap(urls) {
  const now = new Date().toISOString()

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

  for (const url of urls) {
    xml += '  <url>\n'
    xml += `    <loc>${BASE_URL}${url}</loc>\n`
    xml += `    <lastmod>${now}</lastmod>\n`
    xml += `    <changefreq>${getPageChangeFreq(url)}</changefreq>\n`
    xml += `    <priority>${getPagePriority(url)}</priority>\n`

    xml += '  </url>\n'
  }

  xml += '</urlset>'

  return xml
}

// Validate generated sitemap
function validateSitemap(sitemap) {
  // Check if contains necessary XML declaration and root element
  if (!sitemap.includes('<?xml version="1.0" encoding="UTF-8"?>')) {
    throw new Error('Missing XML declaration')
  }

  if (!sitemap.includes('<urlset')) {
    throw new Error('Missing urlset root element')
  }

  // Check URL count
  const urlCount = (sitemap.match(/<url>/g) || []).length
  if (urlCount === 0) {
    throw new Error('No URLs found in sitemap')
  }

  return true
}

// Main function
function main() {
  console.log('🔍 Scanning out directory for static files...')

  // Check if out directory exists
  if (!fs.existsSync(OUT_DIR)) {
    console.error('❌ Out directory not found. Please run "npm run build" first.')
    process.exit(1)
  }

  // Scan directory to get all URLs
  const urls = scanDirectory(OUT_DIR)

  if (urls.length === 0) {
    console.log('⚠️  No URLs found in out directory.')
    return
  }

  console.log(`📝 Found ${urls.length} URLs:`)
  urls.forEach(url => console.log(`   ${url}`))

  // Generate sitemap
  const sitemap = generateSitemap(urls)

  // Validate sitemap
  try {
    validateSitemap(sitemap)
    console.log('✅ Sitemap validation passed')
  } catch (error) {
    console.error('❌ Sitemap validation failed:', error.message)
    process.exit(1)
  }

  // Write to file
  try {
    fs.writeFileSync(SITEMAP_OUTPUT, sitemap, 'utf8')
    console.log(`✅ Sitemap generated successfully at ${SITEMAP_OUTPUT}`)
    console.log(`🌐 Sitemap URL: ${BASE_URL}/sitemap.xml`)
    console.log(`📊 Total URLs: ${urls.length}`)
  } catch (error) {
    console.error('❌ Error writing sitemap:', error)
    process.exit(1)
  }
}

// Run script
if (require.main === module) {
  main()
}

module.exports = { generateSitemap, scanDirectory, validateSitemap }
