import type { Metadata } from "next";

import { SITE_CONFIG } from "@/app.config";
import BlogIndex from "../blog-index";

export const metadata: Metadata = {
  title: "RustFS Integrations | RustFS Blog",
  description: "Integration guides and field notes for connecting RustFS with cloud-native tools and applications.",
  alternates: {
    canonical: `${SITE_CONFIG.primaryDomain}/blog/integration/`,
  },
};

export default function IntegrationBlogPage() {
  return <BlogIndex requestedTag="Integration" />;
}
