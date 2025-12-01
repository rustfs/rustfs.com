export interface BlogPost {
  title: string;
  link: string;
  pubDate?: string;
  imageUrl?: string;
}

function extractTagContent(xml: string, tag: string): string | undefined {
  const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i");
  const match = xml.match(regex);

  if (!match?.[1]) return undefined;

  const value = match[1].trim();

  if (value.startsWith("<![CDATA[") && value.endsWith("]]>")) {
    return value.slice(9, -3).trim();
  }

  return value;
}

function extractImageUrl(xml: string): string | undefined {
  // First, try to find image in <figure class="wp-block-image"> or similar figure tags
  const figureMatch = xml.match(
    /<figure[^>]*class=["'][^"']*wp-block-image[^"']*["'][^>]*>([\s\S]*?)<\/figure>/i
  );
  if (figureMatch?.[1]) {
    const imgMatch = figureMatch[1].match(/<img[^>]*src=["']([^"']+)["'][^>]*>/i);
    if (imgMatch?.[1]) {
      return imgMatch[1];
    }
  }

  // Fallback: try any figure tag
  const anyFigureMatch = xml.match(
    /<figure[^>]*>([\s\S]*?)<\/figure>/i
  );
  if (anyFigureMatch?.[1]) {
    const imgMatch = anyFigureMatch[1].match(/<img[^>]*src=["']([^"']+)["'][^>]*>/i);
    if (imgMatch?.[1]) {
      return imgMatch[1];
    }
  }

  // Fallback: try media:content
  const mediaMatch = xml.match(
    /<media:content[^>]*url=["']([^"']+)["'][^>]*>/i
  );
  if (mediaMatch?.[1]) {
    return mediaMatch[1];
  }

  // Fallback: try enclosure
  const enclosureMatch = xml.match(
    /<enclosure[^>]*url=["']([^"']+)["'][^>]*>/i
  );
  if (enclosureMatch?.[1]) {
    return enclosureMatch[1];
  }

  // Fallback: try content:encoded
  const contentMatch = xml.match(
    /<content:encoded[^>]*>([\s\S]*?)<\/content:encoded>/i
  );
  const content = contentMatch?.[1];

  if (content) {
    const imgMatch = content.match(/<img[^>]*src=["']([^"']+)["'][^>]*>/i);
    if (imgMatch?.[1]) {
      return imgMatch[1];
    }
  }

  const covers = [
    "/images/covers/1.jpg",
    "/images/covers/2.jpg",
    "/images/covers/3.jpg",
    "/images/covers/4.jpg",
    "/images/covers/5.jpg",
  ];

  const randomIndex = Math.floor(Math.random() * covers.length);
  return covers[randomIndex];
}

export async function getLatestBlogPosts(limit = 3): Promise<BlogPost[]> {
  try {
    const response = await fetch("https://rustfs.dev/feed", {
      next: { revalidate: 1800 },
    });

    if (!response.ok) {
      console.error(
        "[RustFS Blog] Failed to fetch feed",
        JSON.stringify({
          status: response.status,
          statusText: response.statusText,
          url: response.url,
        })
      );

      throw new Error(
        `[RustFS Blog] Failed to fetch feed: ${response.status} ${response.statusText}`
      );
    }

    const xml = await response.text();

    console.log(
      "[RustFS Blog] Feed fetched successfully",
      JSON.stringify({
        status: response.status,
        length: xml.length,
      })
    );

    const items = xml.match(/<item[\s\S]*?<\/item>/gi) ?? [];

    console.log(
      "[RustFS Blog] Parsed items from feed",
      JSON.stringify({
        totalItems: items.length,
        limit,
      })
    );

    const posts: BlogPost[] = items.slice(0, limit).map((itemXml) => {
      const title = extractTagContent(itemXml, "title") ?? "Untitled";
      const link = extractTagContent(itemXml, "link") ?? "#";
      const pubDateRaw = extractTagContent(itemXml, "pubDate");
      const imageUrl = extractImageUrl(itemXml);

      let pubDate: string | undefined;

      if (pubDateRaw) {
        const parsed = new Date(pubDateRaw);
        if (!Number.isNaN(parsed.getTime())) {
          pubDate = parsed.toISOString();
        }
      }

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


