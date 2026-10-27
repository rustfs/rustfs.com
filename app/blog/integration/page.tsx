import type { Metadata } from "next";

import { SITE_CONFIG } from "@/app.config";
import { getTagListing } from "@/lib/blog-tags";
import BlogIndex from "../blog-index";

const integrationListing = getTagListing("Integration", 2);

export const metadata: Metadata = {
  title: `${integrationListing.h1} | RustFS Blog`,
  description: integrationListing.overview,
  alternates: {
    canonical: `${SITE_CONFIG.primaryDomain}/blog/integration/`,
  },
};

export default function IntegrationBlogPage() {
  return <BlogIndex requestedTag="Integration" />;
}
