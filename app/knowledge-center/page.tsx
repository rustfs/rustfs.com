import type { Metadata } from "next";

import { SITE_CONFIG } from "@/app.config";
import KnowledgeIndex from "./knowledge-index";

export const metadata: Metadata = {
  title: "RustFS Knowledge Center | Object storage concepts explained",
  description:
    "Deep dives into the ideas behind RustFS and S3-compatible object storage: erasure coding, durability math, data placement, and the internals that keep your data safe.",
  alternates: { canonical: `${SITE_CONFIG.primaryDomain}/knowledge-center/` },
  openGraph: {
    title: "RustFS Knowledge Center",
    description: "Object storage and RustFS concepts explained from first principles.",
    type: "website",
    url: `${SITE_CONFIG.primaryDomain}/knowledge-center/`,
  },
};

export default function KnowledgePage() {
  return <KnowledgeIndex />;
}
