import type { Metadata } from "next";
import Link from "next/link";

import { SITE_CONFIG } from "@/app.config";
import { getBlogPosts, type BlogPostMeta } from "@/lib/mdx-blog";

export const metadata: Metadata = {
  title: "RustFS Blog | Engineering notes for object storage",
  description:
    "RustFS engineering notes, product updates, and practical guides for S3-compatible object storage, AI infrastructure, and cloud-native deployments.",
  alternates: {
    canonical: `${SITE_CONFIG.primaryDomain}/blog/`,
  },
  openGraph: {
    title: "RustFS Blog",
    description:
      "Engineering notes, product updates, and practical guides for RustFS object storage.",
    type: "website",
    url: `${SITE_CONFIG.primaryDomain}/blog/`,
  },
};

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const [featuredPost, ...archivePosts] = posts;
  const recentPosts = archivePosts.slice(0, 4);
  const olderPosts = archivePosts.slice(4);

  return (
    <main className="relative flex-1">
      <section className="border-y border-border bg-background py-16 text-foreground sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 border-t border-border pt-8 lg:grid-cols-[minmax(0,0.72fr)_0.28fr] lg:items-end">
            <div>
              <div className="mb-8 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                <span className="h-1 w-24 bg-brand" />
                <span>RustFS journal</span>
              </div>
              <h1 className="max-w-4xl font-display text-5xl font-semibold tracking-tight text-foreground sm:text-7xl">
                Engineering notes from the storage layer.
              </h1>
            </div>

            <div className="border border-border bg-card">
              <div className="grid grid-cols-2 border-b border-border text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                <span className="border-r border-border px-4 py-3">Local MDX</span>
                <span className="px-4 py-3">WordPress sync</span>
              </div>
              <p className="p-4 text-sm leading-7 text-muted-foreground">
                Product releases, field notes, migration guides, and security updates mirrored from
                rustfs.dev for fast static publishing.
              </p>
            </div>
          </div>

          {featuredPost ? (
            <div className="mt-12 grid gap-4 lg:grid-cols-[minmax(0,0.72fr)_0.28fr]">
              <FeaturedPost post={featuredPost} />
              <RecentIndex posts={recentPosts} />
            </div>
          ) : (
            <div className="mt-12 border border-border bg-card p-8">
              <p className="text-sm text-muted-foreground">No blog posts have been synced yet.</p>
            </div>
          )}
        </div>
      </section>

      {olderPosts.length ? (
        <section className="border-b border-border bg-muted/20 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-6 flex items-center justify-between gap-4">
              <h2 className="text-2xl font-semibold text-foreground">Older notes</h2>
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {olderPosts.length} notes
              </span>
            </div>
            <div className="border border-border bg-card">
              {olderPosts.map((post) => (
                <ArchiveRow key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}

function FeaturedPost({ post }: { post: BlogPostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="motion-card group grid min-h-[30rem] border border-border bg-card lg:grid-cols-[17rem_1fr]"
    >
      <div className="flex flex-col justify-between border-b border-border bg-muted/25 p-6 lg:border-b-0 lg:border-r">
        <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">
          Latest dispatch
        </div>
        <div>
          <div className="font-mono text-7xl font-semibold leading-none text-foreground">
            {formatDay(post.date)}
          </div>
          <div className="mt-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {formatMonthYear(post.date)}
          </div>
        </div>
      </div>

      <div className="flex flex-col p-6 sm:p-8 lg:p-10">
        <PostMeta post={post} />
        <h2 className="mt-10 max-w-3xl text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
          {post.title}
        </h2>
        <p className="mt-6 max-w-2xl text-sm leading-7 text-muted-foreground">{post.description}</p>
        <PostTags tags={post.tags} className="mt-8" />
        <span className="mt-auto inline-flex items-center pt-12 text-sm font-semibold text-brand">
          Read the note
          <span className="motion-arrow ml-2 inline-block" aria-hidden="true">
            ↗
          </span>
        </span>
      </div>
    </Link>
  );
}

function RecentIndex({ posts }: { posts: BlogPostMeta[] }) {
  return (
    <aside className="border border-border bg-card">
      <div className="border-b border-border px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        Recent index
      </div>
      <div>
        {posts.map((post, index) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block border-b border-border px-5 py-5 last:border-b-0 hover:bg-muted/35"
          >
            <div className="flex items-center justify-between gap-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              <span>Note.{String(index + 2).padStart(2, "0")}</span>
              <span>{formatShortDate(post.date)}</span>
            </div>
            <h3 className="mt-4 line-clamp-3 text-base font-semibold leading-tight text-foreground">
              {post.title}
            </h3>
            <span className="mt-5 inline-flex items-center text-sm font-semibold text-brand">
              Open
              <span className="motion-arrow ml-2 inline-block" aria-hidden="true">
                ↗
              </span>
            </span>
          </Link>
        ))}
      </div>
    </aside>
  );
}

function ArchiveRow({ post }: { post: BlogPostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group grid gap-5 border-b border-border px-5 py-6 last:border-b-0 hover:bg-muted/35 md:grid-cols-[9rem_minmax(0,1fr)_11rem]"
    >
      <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        {formatShortDate(post.date)}
      </div>
      <div>
        <h3 className="text-xl font-semibold leading-tight text-foreground">{post.title}</h3>
        <p className="mt-3 line-clamp-2 max-w-3xl text-sm leading-7 text-muted-foreground">
          {post.description}
        </p>
        <PostTags tags={post.tags.slice(0, 3)} className="mt-5" />
      </div>
      <div className="flex items-start justify-between gap-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground md:justify-end">
        <span>{post.readingMinutes} min</span>
        <span className="motion-arrow text-brand" aria-hidden="true">
          ↗
        </span>
      </div>
    </Link>
  );
}

function PostMeta({ post }: { post: BlogPostMeta }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
      <span>{formatShortDate(post.date)}</span>
      <span>{post.author}</span>
      <span>{post.readingMinutes} min read</span>
    </div>
  );
}

function PostTags({ tags, className }: { tags: string[]; className?: string }) {
  if (!tags.length) {
    return null;
  }

  return (
    <div className={`flex flex-wrap gap-2 ${className ?? ""}`}>
      {tags.map((tag) => (
        <span
          key={tag}
          className="border border-border bg-background px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function formatDay(date: string) {
  return new Intl.DateTimeFormat("en-US", { day: "2-digit" }).format(new Date(date));
}

function formatMonthYear(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

function formatShortDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}
