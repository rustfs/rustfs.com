import Link from "next/link";

import { getBlogPosts, type BlogPostMeta } from "@/lib/mdx-blog";
import BlogArchive from "./blog-archive";

const BLOG_FILTER_TAGS = ["AI", "Security", "Release", "Integration", "Cloud Native"];

export default async function BlogIndex({ requestedTag }: { requestedTag?: string }) {
  const allPosts = await getBlogPosts();
  const tags = BLOG_FILTER_TAGS;
  const activeTag = tags.find((tag) => tag.toLowerCase() === requestedTag?.toLowerCase());
  const posts = activeTag
    ? allPosts.filter((post) => post.tags.some((tag) => tag.toLowerCase() === activeTag.toLowerCase()))
    : allPosts;
  const [featuredPost, ...archivePosts] = posts;
  const recentPosts = archivePosts.slice(0, 3);
  const olderPosts = archivePosts.slice(3);

  return (
    <main className="relative flex-1">
      <section className="border-y border-border py-16 text-foreground sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="pt-8">
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
              <nav className="mt-8 flex flex-wrap gap-2" aria-label="Filter blog posts by tag">
                <TagFilter href="/blog" label="All posts" active={!activeTag} />
                {tags.map((tag) => (
                  <TagFilter
                    key={tag}
                    href={tag === "Integration" ? "/blog/integration" : `/blog/tag/${toTagSlug(tag)}`}
                    label={tag}
                    active={tag === activeTag}
                  />
                ))}
              </nav>
            </div>
          </div>

          {featuredPost ? (
            <div className="mt-12 space-y-4">
              <FeaturedPost post={featuredPost} />
              <RecentPostGrid posts={recentPosts} />
            </div>
          ) : (
            <div className="mt-12 border border-border bg-card p-8">
              <p className="text-sm text-muted-foreground">
                {activeTag ? `No posts are tagged ${activeTag} yet.` : "No blog posts have been synced yet."}
              </p>
            </div>
          )}
        </div>
      </section>

      {olderPosts.length ? <BlogArchive posts={olderPosts} title={activeTag ? `More in ${activeTag}` : undefined} /> : null}
    </main>
  );
}

function toTagSlug(tag: string) {
  return tag.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function TagFilter({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`border px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] transition-colors ${
        active
          ? "border-brand bg-brand text-brand-foreground"
          : "border-border bg-card text-muted-foreground hover:border-brand hover:text-foreground"
      }`}
    >
      {label}
    </Link>
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
