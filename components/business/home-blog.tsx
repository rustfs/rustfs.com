import { cn } from "@/lib/utils";
import { getBlogPosts, type BlogPostMeta } from "@/lib/mdx-blog";
import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";
import HomeSectionHeader from "./home-section-header";

interface HomeBlogProps {
  className?: string;
}

export default async function HomeBlog({ className }: HomeBlogProps) {
  const posts: BlogPostMeta[] = (await getBlogPosts()).slice(0, 5);

  if (!posts.length) {
    return null;
  }

  const [featuredPost, ...otherPosts] = posts;

  return (
    <section
      className={cn(
        "relative border-t border-border bg-background py-20 sm:py-28",
        className
      )}
    >
      <div className="mx-auto flex max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">
        <HomeSectionHeader
          eyebrow="Technical posts"
          title="Latest from RustFS Blog"
          description="Read product updates, release posts, and technical deep dives from the RustFS team."
        />

        <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <Link
            href={`/blog/${featuredPost.slug}`}
            className="motion-card group relative flex min-h-96 flex-col overflow-hidden border border-border bg-card text-left transition-colors hover:bg-muted/30"
          >
            {featuredPost.image ? (
              <div className="relative aspect-[16/7] overflow-hidden border-b border-border bg-background">
                <img
                  src={featuredPost.image}
                  alt=""
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>
            ) : null}

            <div className="flex flex-1 flex-col p-6 sm:p-8">
              <div className="flex items-center gap-3 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                <span className="text-brand">Featured post</span>
                <span className="h-px flex-1 bg-border" />
                <PostDate date={featuredPost.date} />
              </div>
              <h3 className="mt-6 max-w-2xl text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
                {featuredPost.title}
              </h3>
              <div className="mt-auto flex items-end justify-between gap-5 pt-8">
                <PostTags tags={featuredPost.tags.slice(0, 3)} />
                <ArrowUpRightIcon className="motion-arrow size-5 shrink-0 text-brand" aria-hidden="true" />
              </div>
            </div>
          </Link>

          <div className="self-start divide-y divide-border border border-border bg-card">
            {otherPosts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group grid gap-5 p-5 text-left transition-colors hover:bg-muted/30 sm:grid-cols-[4.5rem_1fr_auto] sm:items-start sm:p-6"
              >
                <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  <span className="block text-brand">{String(index + 2).padStart(2, "0")}</span>
                  <span className="mt-3 block"><PostDate date={post.date} /></span>
                </div>

                <div className="min-w-0">
                  <h3 className="line-clamp-3 text-xl font-semibold leading-tight text-foreground">
                    {post.title}
                  </h3>
                  <PostTags tags={post.tags.slice(0, 2)} className="mt-4" />
                </div>

                <ArrowUpRightIcon className="motion-arrow size-5 text-brand" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <Link
            href="/blog"
            className="motion-button group inline-flex border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            View more on RustFS Blog
            <span className="motion-arrow ml-1 inline-block" aria-hidden="true">
              ↗
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function PostDate({ date }: { date: string }) {
  return (
    <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
      {formatDate(date)}
    </span>
  );
}

function PostTags({ tags, className }: { tags: string[]; className?: string }) {
  if (!tags.length) {
    return null;
  }

  return (
    <div className={cn("flex flex-wrap gap-x-3 gap-y-2", className)}>
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

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}
