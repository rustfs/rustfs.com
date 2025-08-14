# Scripts Directory Documentation

## generate-sitemap.js

Automated sitemap generation script for websites, supporting multi-language and static export.

### Features

- 🔍 Automatically scans all static pages in the `out` directory
- 🌍 Multi-language support (Chinese, English)
- 📊 Automatically sets page priorities and update frequencies
- ✅ Built-in validation and error handling
- 🚀 Integrated with build process

### Usage

#### Automatic Generation (Recommended)

The script is configured to run automatically after `npm run build`:

```bash
npm run build
# Sitemap will be automatically generated after build completion
```

#### Manual Execution

```bash
# Run script directly
node scripts/generate-sitemap.js

# Or use npm script
npm run postbuild
```

### Configuration

#### Basic Configuration

```javascript
const BASE_URL = 'https://rustfs.com';        // Website domain
const OUT_DIR = 'out';                        // Build output directory
const SITEMAP_OUTPUT = 'out/sitemap.xml';     // Sitemap output path
const LOCALES = ['en', 'zh'];                 // Supported languages
```

#### Page Priority Configuration

```javascript
const PAGE_PRIORITIES = {
  '/': 1.0,                    // Homepage highest priority
  '/download/': 0.9,           // Download page high priority
  '/en/': 0.8,                 // English homepage
  '/zh/': 0.8,                 // Chinese homepage
  '/en/download/': 0.7,        // English download page
  '/zh/download/': 0.7,        // Chinese download page
};
```

#### Page Update Frequency Configuration

```javascript
const PAGE_CHANGE_FREQ = {
  '/': 'weekly',               // Homepage updates weekly
  '/download/': 'monthly',     // Download page updates monthly
  '/en/': 'weekly',            // English pages update weekly
  '/zh/': 'weekly',            // Chinese pages update weekly
  '/en/download/': 'monthly',  // English download page updates monthly
  '/zh/download/': 'monthly',  // Chinese download page updates monthly
};
```

### Output Format

The generated sitemap complies with [Google Sitemap Protocol](https://developers.google.com/search/docs/advanced/sitemaps/overview), including:

- XML format URL list
- Multi-language support (hreflang tags)
- Page priorities and update frequencies
- Last modification time

### Example Output

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://rustfs.com/</loc>
    <lastmod>2024-01-15T10:30:00.000Z</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://rustfs.com/"/>
    <xhtml:link rel="alternate" hreflang="zh" href="https://rustfs.com/zh/"/>
  </url>
  <url>
    <loc>https://rustfs.com/download/</loc>
    <lastmod>2024-01-15T10:30:00.000Z</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://rustfs.com/download/"/>
    <xhtml:link rel="alternate" hreflang="zh" href="https://rustfs.com/zh/download/"/>
  </url>
</urlset>
```

### Important Notes

1. **Build Order**: Must run `npm run build` first to generate the `out` directory
2. **File Permissions**: Ensure the script has write permissions to the `out` directory
3. **Domain Configuration**: Modify `BASE_URL` configuration based on actual deployment
4. **Page Configuration**: Adjust priorities and update frequencies based on actual page structure

### Troubleshooting

#### Common Errors

- **Out directory not found**: Please run `npm run build` first
- **Permission denied**: Check file write permissions
- **No URLs found**: Check if the `out` directory contains `index.html` files

#### Debug Mode

```bash
# View detailed output
DEBUG=1 node scripts/generate-sitemap.js
```

### CI/CD Integration

The script can be integrated into continuous integration workflows:

```yaml
# GitHub Actions example
- name: Build project
  run: npm run build

- name: Generate sitemap
  run: npm run postbuild

- name: Deploy to server
  run: # Deployment commands
```
