import { cn } from "@/lib/utils";
import { getBlogPosts, type BlogPostMeta } from "@/lib/mdx-blog";
import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";
import HomeSectionHeader from "./home-section-header";

interface HomeBlogProps {
  className?: string;
}

export default async function HomeBlog({ className }: HomeBlogProps) {
  const posts: BlogPostMeta[] = (await getBlogPosts()).slice(0, 3);

  if (!posts.length) {
    return null;
  }

  const [featuredPost, ...otherPosts] = posts;

  return (
    <section
      className={cn(
        "relative border-t border-border bg-background py-20 sm:py-24 lg:py-28",
        className
      )}
    >
      <div className="mx-auto flex max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">
        <HomeSectionHeader
          eyebrow="Technical posts"
          title="Latest from RustFS Blog"
          description="Read product updates, release posts, and technical deep dives from the RustFS team."
        />

        <div className="grid gap-px overflow-hidden border border-border bg-border lg:grid-cols-[1.05fr_0.95fr]">
          <Link
            href={`/blog/${featuredPost.slug}`}
            className="motion-card group relative overflow-hidden bg-card/45 p-5 text-left transition-colors hover:bg-muted/30 sm:p-6"
          >
            <div className="flex items-start justify-between gap-6">
              <div className="grid grid-cols-[auto_1fr] items-center gap-3 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                <span className="text-brand">Featured post</span>
                <span className="h-px w-24 bg-border" />
              </div>
              <span className="motion-arrow grid size-10 shrink-0 place-items-center border border-border text-brand transition-colors group-hover:bg-brand group-hover:text-brand-foreground">
                <ArrowUpRightIcon className="size-4" aria-hidden="true" />
              </span>
            </div>

            <div className="mt-8 grid gap-7 md:grid-cols-[minmax(0,1fr)_15rem] md:items-end">
              <div>
                <PostDate date={featuredPost.date} />
                <h3 className="mt-5 max-w-2xl text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
                  {featuredPost.title}
                </h3>
                <PostTags tags={featuredPost.tags.slice(0, 3)} className="mt-6" />
              </div>

              {featuredPost.image ? (
                <div className="relative aspect-[4/3] overflow-hidden border border-border bg-background">
                  <img
                    src={featuredPost.image}
                    alt=""
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 opacity-25 [background-image:repeating-linear-gradient(135deg,transparent_0_16px,var(--background)_16px_17px,transparent_17px_32px)]"
                  />
                </div>
              ) : null}
            </div>
          </Link>

          <div className="grid gap-px bg-border">
            {otherPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="motion-card group grid min-h-40 gap-5 bg-card/45 p-5 text-left transition-colors hover:bg-muted/30 sm:grid-cols-[1fr_auto] sm:items-start sm:p-6"
              >
                <div className="min-w-0">
                  <PostDate date={post.date} />
                  <h3 className="mt-4 line-clamp-2 text-xl font-semibold leading-tight text-foreground">
                    {post.title}
                  </h3>
                  <PostTags tags={post.tags.slice(0, 2)} className="mt-5" />
                </div>

                <span className="motion-arrow grid size-10 place-items-center border border-border text-brand transition-colors group-hover:bg-brand group-hover:text-brand-foreground">
                  <ArrowUpRightIcon className="size-4" aria-hidden="true" />
                </span>
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
    <p className="w-fit font-mono text-[11px] text-muted-foreground">
      {formatDate(date)}
    </p>
  );
}

function PostTags({ tags, className }: { tags: string[]; className?: string }) {
  if (!tags.length) {
    return null;
  }

  return (
    <div className={cn("flex flex-wrap gap-x-4 gap-y-2", className)}>
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

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}
