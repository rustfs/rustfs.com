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
  const recentPosts = archivePosts.slice(0, 3);
  const olderPosts = archivePosts.slice(3);

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
            <div className="mt-12 space-y-4">
              <FeaturedPost post={featuredPost} />
              <RecentPostGrid posts={recentPosts} />
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
  const hasImage = shouldShowImage(post.image);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="motion-card group block overflow-hidden border border-border bg-card transition-colors hover:bg-muted/30"
    >
      <div
        className={`grid ${
          hasImage ? "lg:grid-cols-[0.9fr_1.1fr]" : ""
        }`}
      >
        {hasImage ? (
          <div className="relative min-h-64 overflow-hidden border-b border-border bg-background lg:min-h-96 lg:border-r lg:border-b-0">
            <img
              src={post.image}
              alt=""
              className="absolute inset-0 size-full object-cover transition duration-300 group-hover:scale-[1.02]"
              loading="eager"
            />
          </div>
        ) : null}

        <div className="flex flex-col p-6 sm:p-8 lg:p-10">
          <div className="flex items-center gap-4 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            <span className="text-brand">Featured post</span>
            <span className="h-px flex-1 bg-border" aria-hidden="true" />
            <span>{formatShortDate(post.date)}</span>
          </div>
          <h2 className="mt-8 max-w-4xl text-2xl font-semibold leading-tight text-foreground sm:text-4xl">
            {post.title}
          </h2>
          <PostMeta post={post} className="mt-5" />
          <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-10">
            <PostTags tags={post.tags.slice(0, 4)} />
            <span className="motion-arrow text-lg text-brand" aria-hidden="true">↗</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function RecentPostGrid({ posts }: { posts: BlogPostMeta[] }) {
  if (!posts.length) {
    return null;
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {posts.map((post, index) => (
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
          className="motion-card group flex flex-col overflow-hidden border border-border bg-card transition-colors hover:bg-muted/30"
        >
          {shouldShowImage(post.image) ? (
            <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-background">
              <img
                src={post.image}
                alt=""
                className="absolute inset-0 size-full object-cover transition duration-300 group-hover:scale-[1.03]"
                loading="lazy"
              />
            </div>
          ) : null}
          <div className="flex flex-1 flex-col p-5">
            <div className="flex items-center justify-between gap-4 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              <span className="text-brand">Post.{String(index + 2).padStart(2, "0")}</span>
              <span>{formatShortDate(post.date)}</span>
            </div>
            <h3 className="mt-4 line-clamp-3 text-lg font-semibold leading-tight text-foreground">
              {post.title}
            </h3>
            <div className="mt-auto flex items-center justify-between pt-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              <span>{post.readingMinutes} min</span>
              <span className="motion-arrow text-brand" aria-hidden="true">
                ↗
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

function ArchiveRow({ post }: { post: BlogPostMeta }) {
  const hasImage = shouldShowImage(post.image);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group grid gap-5 border-b border-border px-5 py-6 last:border-b-0 hover:bg-muted/35 ${
        hasImage
          ? "md:grid-cols-[8rem_8.5rem_minmax(0,1fr)_7rem]"
          : "md:grid-cols-[8rem_minmax(0,1fr)_7rem]"
      }`}
    >
      <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        {formatShortDate(post.date)}
      </div>
      {hasImage ? <PostThumbnail image={post.image} className="hidden md:block" /> : null}
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

function PostThumbnail({ image, className }: { image?: string; className?: string }) {
  if (!shouldShowImage(image)) {
    return null;
  }

  return (
    <div className={`relative aspect-[4/3] overflow-hidden border border-border bg-background ${className ?? ""}`}>
      <img
        src={image}
        alt=""
        className="absolute inset-0 size-full object-cover transition duration-300 group-hover:scale-[1.03]"
        loading="lazy"
      />
    </div>
  );
}

function PostMeta({ post, className }: { post: BlogPostMeta; className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground ${className ?? ""}`}>
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
    <div className={`flex flex-wrap gap-x-3 gap-y-2 ${className ?? ""}`}>
      {tags.map((tag) => (
        <span
          key={tag}
          className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground before:mr-3 before:text-border before:content-['/'] first:before:hidden"
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

function shouldShowImage(image?: string) {
  return Boolean(image);
}
