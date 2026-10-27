import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getTagListing, toTagSlug } from "@/lib/blog-tags";
import { getBlogPosts } from "@/lib/mdx-blog";
import BlogIndex from "../../blog-index";

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  const tags = Array.from(new Set(posts.flatMap((post) => post.tags)));

  return tags
    .filter((tag) => tag !== "Integration")
    .map((tag) => ({ tag: toTagSlug(tag) }));
}

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }): Promise<Metadata> {
  const { tag } = await params;
  const label = await findTag(tag);

  if (!label) {
    return { title: "RustFS Blog" };
  }

  const posts = await getBlogPosts();
  const postCount = posts.filter((post) => post.tags.some((postTag) => postTag.toLowerCase() === label.toLowerCase())).length;
  const listing = getTagListing(label, postCount);

  return {
    title: `${listing.h1} | RustFS Blog`,
    description: listing.overview,
    alternates: { canonical: `/blog/tag/${tag}/` },
    robots: listing.indexable
      ? { index: true, follow: true }
      : {
          index: false,
          follow: true,
          googleBot: { index: false, follow: true },
        },
  };
}

export default async function BlogTagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const label = await findTag(tag);

  if (!label) notFound();
  return <BlogIndex requestedTag={label} />;
}

async function findTag(slug: string) {
  const posts = await getBlogPosts();
  return Array.from(new Set(posts.flatMap((post) => post.tags))).find((tag) => toTagSlug(tag) === slug);
}
