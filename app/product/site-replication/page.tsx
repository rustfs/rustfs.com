import type { Metadata } from "next";

import { SITE_CONFIG } from "@/app.config";
import FeaturePage, { type FeaturePageSection } from "@/components/business/feature-page";

const title = "Site Replication | RustFS";
const description =
  "Link independent RustFS deployments and synchronize buckets, object versions, delete markers, and supported IAM data. Bucket replication adds directional rules between versioned buckets. Replication is asynchronous unless a bucket rule explicitly waits for the target.";

export const metadata: Metadata = {
  alternates: { canonical: "product/site-replication/" },
  title,
  description,
  keywords: [
    "RustFS",
    "site replication",
    "bucket replication",
    "multi-site object storage",
    "disaster recovery copy",
    "IAM replication",
    "S3-compatible",
    "rc",
  ],
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "RustFS",
    locale: "en_US",
    url: "/product/site-replication/",
    images: [
      {
        url: `${SITE_CONFIG.primaryDomain}${SITE_CONFIG.ogImagePath}`,
        width: 1200,
        height: 630,
        alt: "RustFS — High-Performance S3 Object Storage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@rustfs",
    creator: "@rustfs",
    title,
    description,
  },
};

const sections: FeaturePageSection[] = [
  {
    id: "linked-sites",
    title: "Linked sites",
    description:
      "Site replication is a relationship between complete RustFS deployments. Applications can write at separate sites while buckets and supported identity data stay aligned. It is broader than a single bucket rule, and it stays asynchronous.",
    items: [
      {
        title: "Two or more deployments",
        description:
          "Each site needs its own stable S3 API endpoint, bidirectional reachability on the API port, trusted TLS in production, and bucket versioning. Inventory bucket names, Object Lock settings, and IAM before linking sites that already hold data.",
        href: "https://docs.rustfs.com/en/operations/high-availability/site-replication",
      },
      {
        title: "One relationship",
        description:
          "Submit every site in the initial rc admin replicate add. The first alias receives the administration request. Separate pairwise add commands do not build the same multi-site relationship.",
      },
      {
        title: "Writes stay local until they replicate",
        description:
          "A successful write confirms only the site that accepted it. Site replication does not wait for the other deployments, and it does not provide DNS failover, traffic routing, or application recovery.",
      },
    ],
  },
  {
    id: "replicated-resources",
    title: "What stays aligned",
    description:
      "RustFS synchronizes a defined set of resources across the linked sites. Versioning support is required at every participating site.",
    items: [
      {
        title: "Buckets and object versions",
        description:
          "Object versions replicate across linked sites, including delete markers. RustFS also carries the bucket metadata required by the site replication workflow.",
        href: "https://docs.rustfs.com/en/operations/high-availability/site-replication",
      },
      {
        title: "Supported IAM data",
        description:
          "Users, groups, policies, policy mappings, and service accounts synchronize with the site relationship. Create a temporary identity on one site and inspect it on another when you validate the path.",
      },
      {
        title: "Check every site",
        description:
          "rc admin replicate status can summarize buckets, users, groups, policies, and metrics. A healthy response from one site is that site's view. Check the other deployments as well.",
      },
    ],
  },
  {
    id: "bucket-replication",
    title: "Bucket replication",
    description:
      "Bucket replication is a directional rule from a versioned source bucket to a versioned target bucket. Use it for a selected copy, including a reachable S3-compatible target. It does not replace a site relationship.",
    items: [
      {
        title: "Prefix and tag filters",
        description:
          "An enabled rule can limit replication by key prefix, object tags, or both. Objects that match no enabled rule remain only in the source bucket.",
        href: "https://docs.rustfs.com/en/administration/data/bucket/replication",
      },
      {
        title: "Existing objects, deletes, and sync",
        description:
          "Rules can include objects that already exist, delete markers, and deletion of a specific object version. Asynchronous is the default. Request synchronous mode only when the source write must wait for the target.",
      },
      {
        title: "Console or rc",
        description:
          "The Console registers the remote target and the rule together. rc bucket replication does the same for automation, including a bandwidth limit, health-check interval, and destination storage class. When Object Lock is enabled on the source, the target needs compatible Object Lock support.",
      },
    ],
  },
  {
    id: "operate-and-verify",
    title: "Operate and verify",
    description:
      "Link, inspect, repair, and remove replication with rc. Treat status as an operator signal, then confirm the objects and identities you expect to see.",
    items: [
      {
        title: "Secured administration",
        description:
          "rc admin replicate add reads each peer endpoint and root credential from the local alias store. Run it from a secured administration host, and keep those credentials out of shell history and logs.",
        href: "https://docs.rustfs.com/en/operations/high-availability/site-replication",
      },
      {
        title: "Resync after a gap",
        description:
          "Start a resync for one exact peer after a site was unavailable or status shows missing replicated state. The resync status endpoint returns the last persisted start or cancel result. It does not report live worker progress.",
      },
      {
        title: "Removal is not cutover",
        description:
          "Removing a site, or dissolving the relationship, does not prove that every queued object has arrived and does not fail applications over. For bucket rules, removing the configuration leaves objects already copied on the target.",
      },
    ],
  },
];

export default function SiteReplicationPage() {
  return (
    <FeaturePage
      title="Site Replication"
      description={description}
      sections={sections}
      variant="replication"
      highlightsTitle="What replication is for"
      highlights={[
        {
          title: "Multi-site alignment",
          description:
            "Keep buckets, object versions, delete markers, and supported IAM data aligned across independent RustFS deployments.",
        },
        {
          title: "Selective bucket copies",
          description:
            "Copy a prefix, a tag, or an existing dataset to a versioned target. Ask for synchronous replication only when that write must wait.",
        },
        {
          title: "A copy you still operate",
          description:
            "Plan DNS, traffic routing, and application recovery separately. Measure lag under your workload before you treat a site as recovered.",
        },
      ]}
      links={[
        { label: "Plan a multi-site layout", href: "/contact-us/" },
        {
          label: "Site replication docs",
          href: "https://docs.rustfs.com/en/operations/high-availability/site-replication",
          variant: "outline",
        },
      ]}
    />
  );
}
