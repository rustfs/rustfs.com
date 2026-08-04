import type { Metadata } from "next";

import { SITE_CONFIG } from "@/app.config";
import BlogIndex from "./blog-index";

export const metadata: Metadata = {
  title: "RustFS Blog | Engineering posts for object storage",
  description:
    "RustFS engineering posts, product updates, and practical guides for S3-compatible object storage, AI infrastructure, and cloud-native deployments.",
  alternates: { canonical: `${SITE_CONFIG.primaryDomain}/blog/` },
  openGraph: {
    title: "RustFS Blog",
    description: "Engineering posts, product updates, and practical guides for RustFS object storage.",
    type: "website",
    url: `${SITE_CONFIG.primaryDomain}/blog/`,
  },
};

export default function BlogPage() {
  return <BlogIndex />;
}
