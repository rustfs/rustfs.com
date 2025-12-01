/* eslint-disable @next/next/no-img-element */
import type { BlogPost } from "@/lib/blog";
import { getLatestBlogPosts } from "@/lib/blog";
import { cn } from "@/lib/utils";

interface HomeBlogProps {
  className?: string;
}

export default async function HomeBlog({ className }: HomeBlogProps) {
  const posts: BlogPost[] = await getLatestBlogPosts(3);

  if (!posts.length) {
    return null;
  }

  return (
    <section
      className={cn(
        "relative bg-background py-16 border-t border-border",
        className
      )}
    >
      <div className="mx-auto flex max-w-[85rem] flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-2xl text-center lg:mb-14">
          <h2 className="text-2xl font-bold md:text-4xl md:leading-tight text-primary">
            Latest from RustFS Blog
          </h2>
          <p className="mt-4 text-muted-foreground">
            Read the latest updates, release notes, and technical deep dives from the RustFS team.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <a
              key={post.link}
              href={post.link}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col justify-between rounded-xl border border-border bg-card/40 overflow-hidden text-left transition-colors hover:border-primary"
            >
              {post.imageUrl ? (
                <div className="relative h-64 w-full">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              ) : null}

              <div className="flex-1 p-6">
                <h3 className="text-lg font-semibold text-foreground line-clamp-2">
                  {post.title}
                </h3>
                {post.pubDate ? (
                  <p className="mt-2 text-xs text-muted-foreground">
                    {new Date(post.pubDate).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                ) : null}
              </div>

              <div className="mt-4 px-6 pb-6">
                <span className="inline-flex items-center text-sm font-medium text-primary hover:underline">
                  Read more
                  <span className="ml-1" aria-hidden="true">
                    ↗
                  </span>
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="https://rustfs.dev/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center text-sm font-medium text-primary hover:underline"
          >
            View more on RustFS Blog
            <span className="ml-1" aria-hidden="true">
              ↗
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}


