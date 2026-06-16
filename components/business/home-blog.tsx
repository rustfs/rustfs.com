import { cn } from "@/lib/utils";
import { getBlogPosts, type BlogPostMeta } from "@/lib/mdx-blog";
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
        "relative border-t border-border py-20 sm:py-28",
        className
      )}
    >
      <div className="mx-auto flex max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">
        <HomeSectionHeader
          sectionNumber="07"
          eyebrow="Technical posts"
          title="Latest from RustFS Blog"
          description="Read product updates, release posts, and technical deep dives from the RustFS team."
        />

        <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <Link
            href={`/blog/${featuredPost.slug}`}
            className="motion-card group overflow-hidden border border-border bg-card text-left transition-colors hover:bg-muted/50"
          >
            {featuredPost.image ? (
              <div className="relative h-72 w-full border-b border-border sm:h-96">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="h-full w-full object-cover grayscale transition duration-300 group-hover:grayscale-0"
                  loading="lazy"
                />
              </div>
            ) : null}
            <div className="p-6 sm:p-8">
              <div className="mb-8 flex items-center justify-between gap-4">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Featured post
                </span>
                <span className="h-px flex-1 bg-border" />
              </div>
              <p className="mb-4 w-fit border border-border bg-background px-2 py-1 text-[11px] text-muted-foreground">
                {formatDate(featuredPost.date)}
              </p>
              <h3 className="text-2xl font-semibold text-foreground sm:text-3xl">
                {featuredPost.title}
              </h3>
            </div>
            <div className="border-t border-border px-6 py-4 sm:px-8">
              <span className="inline-flex items-center text-sm font-medium text-brand">
                Read more
                <span className="motion-arrow ml-1 inline-block" aria-hidden="true">
                  ↗
                </span>
              </span>
            </div>
          </Link>

          <div className="grid gap-px border border-border bg-border">
            {otherPosts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="motion-card group flex flex-col justify-between bg-card text-left transition-colors hover:bg-muted/50"
              >
                <div className="grid grid-cols-[1fr_auto] border-b border-border text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  <span className="px-5 py-3">Blog</span>
                  <span className="border-l border-border px-4 py-3">
                    POST.{String(index + 2).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex-1 p-6">
                  <p className="mb-4 w-fit border border-border bg-background px-2 py-1 text-[11px] text-muted-foreground">
                    {formatDate(post.date)}
                  </p>
                  <h3 className="text-lg font-semibold text-foreground line-clamp-2">
                    {post.title}
                  </h3>
                </div>

                <div className="border-t border-border px-6 py-4">
                  <span className="inline-flex items-center text-sm font-medium text-brand">
                    Read more
                    <span className="motion-arrow ml-1 inline-block" aria-hidden="true">
                      ↗
                    </span>
                  </span>
                </div>
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

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}
