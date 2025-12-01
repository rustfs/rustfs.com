export interface BlogPost {
  title: string;
  link: string;
  pubDate?: string;
  imageUrl?: string;
}

interface WordPressPost {
  id: number;
  date: string;
  link: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  jetpack_featured_media_url?: string;
}

const WORDPRESS_POSTS_ENDPOINT =
  "https://rustfs.dev/wp-json/wp/v2/posts?per_page=5&orderby=date&order=desc&_fields=id,date,title,link,excerpt,jetpack_featured_media_url";

const BLOG_API_APPLICATION_USERNAME =
  process.env.BLOG_API_APPLICATION_USERNAME;
const BLOG_API_APPLICATION_PASSWORD =
  process.env.BLOG_API_APPLICATION_PASSWORD;

const FALLBACK_COVERS = [
  "/images/covers/1.jpg",
  "/images/covers/2.jpg",
  "/images/covers/3.jpg",
  "/images/covers/4.jpg",
  "/images/covers/5.jpg",
];

function getRandomCover(): string {
  const randomIndex = Math.floor(Math.random() * FALLBACK_COVERS.length);
  return FALLBACK_COVERS[randomIndex];
}

export async function getLatestBlogPosts(limit = 3): Promise<BlogPost[]> {
  try {
    const headers: Record<string, string> = {
      "User-Agent":
        "Mozilla/5.0 (compatible; RustFSSiteBot/1.0; +https://rustfs.com)",
      Accept: "application/json",
    };

    if (BLOG_API_APPLICATION_USERNAME && BLOG_API_APPLICATION_PASSWORD) {
      const basicToken = Buffer.from(
        `${BLOG_API_APPLICATION_USERNAME}:${BLOG_API_APPLICATION_PASSWORD}`
      ).toString("base64");
      headers.Authorization = `Basic ${basicToken}`;
    }

    const response = await fetch(WORDPRESS_POSTS_ENDPOINT, {
      next: { revalidate: 1800 },
      headers,
    });

    if (!response.ok) {
      console.error(
        "[RustFS Blog] Failed to fetch posts from WordPress API",
        JSON.stringify({
          status: response.status,
          statusText: response.statusText,
          url: response.url,
        })
      );

      throw new Error(
        `[RustFS Blog] Failed to fetch posts: ${response.status} ${response.statusText}`
      );
    }

    const data = (await response.json()) as WordPressPost[];

    console.log(
      "[RustFS Blog] Posts fetched successfully from WordPress API",
      JSON.stringify({
        status: response.status,
        totalItems: Array.isArray(data) ? data.length : 0,
      })
    );

    const safeData = Array.isArray(data) ? data : [];

    const posts: BlogPost[] = safeData.slice(0, limit).map((item) => {
      const title =
        (item.title && typeof item.title.rendered === "string"
          ? item.title.rendered
          : ""
        ).trim() || "Untitled";

      const link = item.link || "#";

      let pubDate: string | undefined;
      if (item.date) {
        const parsed = new Date(item.date);
        if (!Number.isNaN(parsed.getTime())) {
          pubDate = parsed.toISOString();
        }
      }

      const imageUrl =
        (item.jetpack_featured_media_url &&
          item.jetpack_featured_media_url.trim()) ||
        getRandomCover();

      return { title, link, pubDate, imageUrl };
    });

    return posts;
  } catch (error) {
    console.error(
      "[RustFS Blog] Error while fetching or parsing feed",
      error instanceof Error
        ? { name: error.name, message: error.message, stack: error.stack }
        : { error }
    );

    throw error;
  }
}


