#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import TurndownService from "turndown";

const BLOG_DIR = path.join(process.cwd(), "content/blog");
const PUBLIC_BLOG_IMAGE_DIR = path.join(process.cwd(), "public/images/blog");
const WORDPRESS_ENDPOINT = process.env.WORDPRESS_BLOG_ENDPOINT;
const POST_LIMIT = Number.parseInt(process.env.WORDPRESS_BLOG_LIMIT ?? "12", 10);
const PER_PAGE = Math.min(Math.max(POST_LIMIT, 1), 100);
const IMAGE_URL_PATTERN =
  /https?:\/\/[^\s)'"]+\.(?:png|jpe?g|webp|gif|svg)(?:\?[^\s)'"]*)?/gi;
const REMOTE_IMAGE_URL_PATTERN =
  /^https?:\/\/[^\s)'"]+\.(?:png|jpe?g|webp|gif|svg)(?:\?[^\s)'"]*)?$/i;
const FALLBACK_COVERS = [
  "/images/covers/1.jpg",
  "/images/covers/2.jpg",
  "/images/covers/3.jpg",
  "/images/covers/4.jpg",
  "/images/covers/5.jpg",
];

const turndown = new TurndownService({
  codeBlockStyle: "fenced",
  emDelimiter: "*",
  headingStyle: "atx",
});

turndown.remove(["script", "style", "noscript"]);

async function main() {
  const posts = await fetchWordPressPosts(POST_LIMIT);

  if (!posts.length) {
    console.log("No WordPress posts returned.");
    return;
  }

  await fs.mkdir(BLOG_DIR, { recursive: true });

  for (const [index, post] of posts.entries()) {
    const slug = normalizeSlug(post.slug || post.id);
    const postDate = getIsoDate(post.date_gmt || post.date);
    const postDir = path.join(BLOG_DIR, `${getDatePrefix(postDate)}-${slug}`);
    const filename = path.join(postDir, "index.mdx");
    const localized = await localizePostAssets(slug, convertPostToMarkdown(post), getImage(post, index));
    const data = {
      title: decodeHtml(post.title?.rendered) || "Untitled",
      slug,
      description: getDescription(post),
      date: postDate,
      author: getAuthor(post),
      tags: getTags(post),
      image: localized.image,
    };

    await fs.mkdir(postDir, { recursive: true });
    await fs.writeFile(filename, matter.stringify(localized.markdown, data), "utf8");
    console.log(`Synced ${slug}`);
  }

  console.log(`Synced ${posts.length} WordPress posts into content/blog.`);
}

async function fetchWordPressPosts(limit) {
  if (!WORDPRESS_ENDPOINT) {
    throw new Error("Set WORDPRESS_BLOG_ENDPOINT before syncing WordPress posts.");
  }

  const posts = [];
  let page = 1;

  while (posts.length < limit) {
    const url = new URL(WORDPRESS_ENDPOINT);
    url.searchParams.set("per_page", String(PER_PAGE));
    url.searchParams.set("page", String(page));
    url.searchParams.set("orderby", "date");
    url.searchParams.set("order", "desc");
    url.searchParams.set("_embed", "1");

    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
        "User-Agent": "RustFSSiteBot/1.0 (+https://rustfs.com)",
      },
    });

    if (!response.ok) {
      throw new Error(`WordPress request failed: ${response.status} ${response.statusText}`);
    }

    const pagePosts = await response.json();

    if (!Array.isArray(pagePosts) || pagePosts.length === 0) {
      break;
    }

    posts.push(...pagePosts);

    if (pagePosts.length < PER_PAGE) {
      break;
    }

    page += 1;
  }

  return posts.slice(0, limit);
}

function convertPostToMarkdown(post) {
  const content = cleanHtml(post.content?.rendered ?? "");
  const markdown = turndown
    .turndown(content)
    .replace(/:\*\*\[/g, ":** [")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return markdown || getDescription(post);
}

function getDescription(post) {
  const excerpt = stripHtml(post.excerpt?.rendered ?? "");
  const fallback = stripHtml(post.content?.rendered ?? "");
  return clampText(excerpt || fallback, 180);
}

function getAuthor(post) {
  const author = post._embedded?.author?.[0]?.name;
  return titleCase(author || "RustFS Team");
}

function getTags(post) {
  const terms = post._embedded?.["wp:term"] ?? [];
  const categories = Array.isArray(terms[0]) ? terms[0] : [];
  const tags = Array.isArray(terms[1]) ? terms[1] : [];
  const names = [...tags, ...categories]
    .map((term) => decodeHtml(term?.name))
    .filter(Boolean);

  return Array.from(new Set(names)).slice(0, 6);
}

function getImage(post, index) {
  const embeddedImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  const image = post.jetpack_featured_media_url || embeddedImage;

  if (typeof image === "string" && image.trim()) {
    return image.trim();
  }

  return FALLBACK_COVERS[index % FALLBACK_COVERS.length];
}

async function localizePostAssets(slug, markdown, image) {
  const urls = new Set(markdown.match(IMAGE_URL_PATTERN) ?? []);
  const imageUrl = typeof image === "string" ? image.trim() : image;

  if (isRemoteImageUrl(imageUrl)) {
    urls.add(imageUrl);
  }

  const localizedImage = isSharedCoverPath(imageUrl) ? await saveSharedCover(slug, imageUrl) : image;
  const replacements = new Map();
  let index = 1;

  for (const url of urls) {
    replacements.set(url, await saveRemoteImage(slug, url, index));
    index += 1;
  }

  for (const [url, localPath] of replacements) {
    markdown = markdown.split(url).join(localPath);
  }

  return {
    markdown: rewriteSourcePostLinks(markdown),
    image: replacements.get(imageUrl) ?? localizedImage,
  };
}

function rewriteSourcePostLinks(markdown) {
  if (!WORDPRESS_ENDPOINT) {
    return markdown;
  }

  const host = new URL(WORDPRESS_ENDPOINT).origin;
  const sourcePostLinkPattern = new RegExp(`${escapeRegExp(host)}\\/([a-z0-9-]+)\\/?`, "g");

  return markdown.replace(sourcePostLinkPattern, "/blog/$1/");
}

async function saveRemoteImage(slug, url, index) {
  const filename = sanitizeImageFilename(url, index);
  const targetDir = path.join(PUBLIC_BLOG_IMAGE_DIR, slug);
  const targetPath = path.join(targetDir, filename);
  const publicPath = `/images/blog/${slug}/${filename}`;

  await fs.mkdir(targetDir, { recursive: true });

  const response = await fetch(url, {
    headers: {
      "User-Agent": "RustFSSiteBot/1.0 (+https://rustfs.com)",
    },
  });

  if (!response.ok) {
    throw new Error(`Image download failed for ${url}: ${response.status} ${response.statusText}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  await fs.writeFile(targetPath, buffer);

  return publicPath;
}

async function saveSharedCover(slug, imagePath) {
  const extension = path.extname(imagePath) || ".jpg";
  const targetDir = path.join(PUBLIC_BLOG_IMAGE_DIR, slug);
  const targetFilename = `cover${extension}`;
  const sourcePath = path.join(process.cwd(), "public", imagePath.replace(/^\//, ""));
  const targetPath = path.join(targetDir, targetFilename);

  await fs.mkdir(targetDir, { recursive: true });
  await fs.copyFile(sourcePath, targetPath);

  return `/images/blog/${slug}/${targetFilename}`;
}

function sanitizeImageFilename(url, index) {
  const parsed = new URL(url);
  const extension = path.extname(parsed.pathname).toLowerCase() || ".png";
  const basename = path.basename(safeDecodeURIComponent(parsed.pathname), extension);
  const safeName = basename
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();

  return `${safeName || `image-${index}`}${extension}`;
}

function safeDecodeURIComponent(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function isRemoteImageUrl(value) {
  return typeof value === "string" && REMOTE_IMAGE_URL_PATTERN.test(value);
}

function isSharedCoverPath(value) {
  return typeof value === "string" && value.startsWith("/images/covers/");
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getIsoDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
}

function getDatePrefix(value) {
  return value.slice(0, 10);
}

function cleanHtml(html) {
  return html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<figcaption[\s\S]*?<\/figcaption>/gi, "")
    .replace(/<br\s*\/?>/gi, "\n")
    .trim();
}

function stripHtml(html) {
  return decodeHtml(
    cleanHtml(html)
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
  );
}

function clampText(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength).trimEnd()}...`;
}

function normalizeSlug(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function titleCase(value) {
  return decodeHtml(value)
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function decodeHtml(value = "") {
  return String(value)
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([a-f0-9]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&([a-z]+);/gi, (_, entity) => {
      const map = {
        amp: "&",
        apos: "'",
        hellip: "...",
        lt: "<",
        gt: ">",
        nbsp: " ",
        quot: '"',
        rsquo: "'",
        lsquo: "'",
        rdquo: '"',
        ldquo: '"',
        ndash: "-",
        mdash: "-",
      };

      return map[entity.toLowerCase()] ?? `&${entity};`;
    })
    .trim();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
