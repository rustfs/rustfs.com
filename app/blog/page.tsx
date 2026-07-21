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
              <h1 className="max-w-4xl font-display text-5xl font-semibold leading-[0.98] tracking-tight text-foreground sm:text-6xl">
                Engineering posts from the storage layer.
              </h1>
              <p className="mt-6 max-w-2xl text-sm leading-7 text-muted-foreground">
                Product updates, migration guides, security work, and field lessons from the RustFS team.
              </p>
            </div>
          </div>

          {featuredPost ? (
            <div className="mt-14 border-t border-border">
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
        <section className="border-b border-border py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-end justify-between gap-4 border-t border-border pt-8">
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-brand">Archive</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">Older posts</h2>
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {olderPosts.length} posts
              </span>
            </div>
            <div className="border-t border-border">
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
      className="motion-card group block border-b border-border py-10"
    >
      <div
        className={`grid ${
          hasImage ? "gap-8 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:items-stretch xl:gap-12" : ""
        }`}
      >
        {hasImage ? (
          <div className="relative min-h-64 overflow-hidden bg-background">
            <img
              src={post.image}
              alt=""
              className="absolute inset-0 size-full object-cover transition duration-300 group-hover:scale-[1.02]"
              loading="eager"
            />
            <span className="absolute left-4 top-4 border border-border bg-background/85 px-3 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-brand">
              Featured
            </span>
          </div>
        ) : null}

        <div className="flex flex-col py-1">
          <div className="mb-7 flex items-center gap-4 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            <span className="text-brand">Featured post</span>
            <span className="h-px flex-1 bg-border" aria-hidden="true" />
            <span>{formatShortDate(post.date)}</span>
          </div>
          <PostMeta post={post} />
          <h2 className="mt-5 max-w-4xl text-3xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-4xl">
            {post.title}
          </h2>
          <p className="mt-5 line-clamp-2 max-w-2xl text-sm leading-7 text-muted-foreground">
            {post.description}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <PostTags tags={post.tags.slice(0, 4)} />
            <span className="inline-flex items-center text-sm font-semibold text-brand">
              Read the post
              <span className="motion-arrow ml-2 inline-block" aria-hidden="true">
                ↗
              </span>
            </span>
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
    <div className="grid gap-x-8 gap-y-10 pt-10 md:grid-cols-3">
      {posts.map((post, index) => (
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
          className="motion-card group flex min-h-72 flex-col border-t border-border pt-5"
        >
          {shouldShowImage(post.image) ? (
            <div className="relative aspect-[16/10] overflow-hidden bg-background">
              <img
                src={post.image}
                alt=""
                className="absolute inset-0 size-full object-cover transition duration-300 group-hover:scale-[1.03]"
                loading="lazy"
              />
            </div>
          ) : null}
          <div className="flex flex-1 flex-col pt-5">
            <div className="flex items-center justify-between gap-4 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              <span className="text-brand">Post.{String(index + 2).padStart(2, "0")}</span>
              <span>{formatShortDate(post.date)}</span>
            </div>
            <h3 className="mt-5 line-clamp-3 text-xl font-semibold leading-tight tracking-tight text-foreground">
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
      className={`group grid gap-6 border-b border-border py-8 last:border-b-0 hover:border-foreground/35 ${
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
        <h3 className="text-xl font-semibold leading-tight tracking-tight text-foreground sm:text-2xl">{post.title}</h3>
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
    <div className={`flex flex-wrap gap-x-4 gap-y-2 ${className ?? ""}`}>
      {tags.map((tag) => (
        <span
          key={tag}
          className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground"
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
