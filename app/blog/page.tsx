import type { Metadata } from "next";
import Link from "next/link";

import { SITE_CONFIG } from "@/app.config";
import { getBlogPosts, type BlogPostMeta } from "@/lib/mdx-blog";

export const metadata: Metadata = {
  title: "RustFS Blog | Engineering posts for object storage",
  description:
    "RustFS engineering posts, product updates, and practical guides for S3-compatible object storage, AI infrastructure, and cloud-native deployments.",
  alternates: {
    canonical: `${SITE_CONFIG.primaryDomain}/blog/`,
  },
  openGraph: {
    title: "RustFS Blog",
    description:
      "Engineering posts, product updates, and practical guides for RustFS object storage.",
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
      <section className="border-y border-border py-16 text-foreground sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-t border-border pt-8">
            <div>
              <div className="mb-8 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                <span className="h-1 w-24 bg-brand" />
                <span>RustFS journal</span>
              </div>
              <h1 className="max-w-4xl font-display text-5xl font-semibold tracking-tight text-foreground sm:text-7xl">
                Engineering posts from the storage layer.
              </h1>
              <p className="mt-6 max-w-2xl text-sm leading-7 text-muted-foreground">
                Product updates, migration guides, security work, and field lessons from the RustFS team.
              </p>
            </div>
          </div>

          {featuredPost ? (
            <div className="mt-12 grid items-start gap-4 lg:grid-cols-[minmax(0,0.72fr)_0.28fr]">
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
              <h2 className="text-2xl font-semibold text-foreground">Older posts</h2>
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {olderPosts.length} posts
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
      className="motion-card group flex flex-col border border-border bg-card transition-colors hover:bg-muted/35"
    >
      <div className="grid grid-cols-[1fr_auto] border-b border-border text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        <span className="px-5 py-4 text-brand">Latest post</span>
        <span className="border-l border-border px-5 py-4">{formatShortDate(post.date)}</span>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <PostMeta post={post} />
        <h2 className="mt-6 max-w-3xl text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
          {post.title}
        </h2>
        <p className="mt-5 line-clamp-3 max-w-2xl text-sm leading-7 text-muted-foreground">{post.description}</p>
        <PostTags tags={post.tags} className="mt-6" />
        <span className="mt-auto inline-flex items-center pt-8 text-sm font-semibold text-brand">
          Read the post
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
              <span>Post.{String(index + 2).padStart(2, "0")}</span>
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

function formatShortDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}
