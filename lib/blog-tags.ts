export const BLOG_INDEX_H1 = "Engineering posts from the storage layer.";

export const BLOG_INDEX_OVERVIEW =
  "Product updates, migration guides, security work, and field lessons from the RustFS team.";

const MIN_INDEXED_TAG_POSTS = 2;

const NOINDEX_TAGS = new Set(["RustFS"]);

const TAG_COPY: Record<string, { h1: string; overview: string }> = {
  AI: {
    h1: "AI storage notes",
    overview:
      "Posts on using RustFS as S3-compatible storage for training data, model weights, and AI pipelines.",
  },
  Announcements: {
    h1: "RustFS announcements",
    overview: "Company and ecosystem announcements that sit outside the release-note archive.",
  },
  "Best Practices": {
    h1: "Object storage practices",
    overview: "Migration patterns and day-to-day operating notes from RustFS deployments.",
  },
  "Cloud Native": {
    h1: "Cloud-native deployment notes",
    overview: "Kubernetes, Helm, and cluster notes for running RustFS.",
  },
  "General Usage": {
    h1: "General usage notes",
    overview: "Everyday operating notes for running and moving workloads onto RustFS.",
  },
  Helm: {
    h1: "Helm chart notes",
    overview: "Packaging and installing RustFS on Kubernetes with Helm.",
  },
  Integration: {
    h1: "Integration notes",
    overview: "Field notes for connecting RustFS to applications and cloud-native tools.",
  },
  Kubernetes: {
    h1: "Kubernetes notes",
    overview: "Operator, Helm, and cluster guides for running RustFS on Kubernetes.",
  },
  "Object Storage": {
    h1: "Object storage guides",
    overview: "Workflows and explainers for S3-compatible object storage on RustFS.",
  },
  Release: {
    h1: "RustFS release notes",
    overview: "Version announcements and the changes shipped in recent RustFS releases.",
  },
  Rust: {
    h1: "Rust engineering notes",
    overview: "Product posts that focus on the Rust implementation behind RustFS.",
  },
  RustFS: {
    h1: "Posts tagged RustFS",
    overview:
      "A broad product tag that overlaps the main journal. Releases, security, and tutorials have their own archives.",
  },
  S3: {
    h1: "S3-compatible storage guides",
    overview: "Posts about the S3 API and tools that store data in RustFS over S3.",
  },
  Security: {
    h1: "Security notes for RustFS",
    overview: "Hardening, access control, and operational security write-ups from the RustFS team.",
  },
  Tutorial: {
    h1: "RustFS tutorials",
    overview: "Step-by-step setup and feature walkthroughs, including packages, Kubernetes, and S3 Tables.",
  },
};

export interface TagListing {
  h1: string;
  overview: string;
  indexable: boolean;
}

export function toTagSlug(tag: string) {
  return tag.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function isTagIndexable(label: string, postCount: number) {
  return postCount >= MIN_INDEXED_TAG_POSTS && !NOINDEX_TAGS.has(label);
}

export function getTagListing(label: string, postCount: number): TagListing {
  const preset = TAG_COPY[label];

  return {
    h1: preset?.h1 ?? `Posts tagged ${label}`,
    overview: preset?.overview ?? `RustFS journal posts filed under ${label}.`,
    indexable: isTagIndexable(label, postCount),
  };
}
