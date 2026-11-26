import { SITE_CONFIG } from "@/app.config";
import FeaturePage, { type FeaturePageSection } from "@/components/business/feature-page";
import RdmaProductContent from "@/components/business/rdma-product";
import type { Metadata } from "next";

const title = "S3 Over RDMA | Optional one-sided RDMA data path | RustFS";
const description =
  "S3 HTTPS carries SigV4 authentication, authorization, object selection, and the storage result. Object bytes can move on optional one-sided RDMA transports that stay off by default.";

export const metadata: Metadata = {
  alternates: { canonical: "product/rdma/" },
  title,
  description,
  keywords: [
    "RustFS",
    "S3 Over RDMA",
    "RDMA",
    "NIXL",
    "UCX",
    "cuObject",
    "S3 HTTPS",
    "object storage",
  ],
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "RustFS",
    locale: "en_US",
    url: "/product/rdma/",
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

const sections: FeaturePageSection[] = [];

export default function RdmaProductPage() {
  return (
    <FeaturePage
      title="S3 Over RDMA"
      description="S3 HTTPS carries SigV4 authentication, authorization, object selection, and the final storage result. Object bytes move with one-sided RDMA started by the RustFS server. NIXL/UCX and cuObject are optional last-hop transports behind that pipeline. Both are enterprise-kernel capabilities, compiled out of the default build, and off at runtime until an operator enables them."
      sections={sections}
      variant="protocol"
      highlightsTitle="Control plane and data path"
      highlights={[
        {
          title: "Signed S3 control plane",
          description:
            "Authentication, authorization, object selection, and the storage result stay on S3 HTTPS. Object bytes do not enter the HTTP body.",
        },
        {
          title: "One-sided RDMA",
          description:
            "The server reads client buffers for PUT and UploadPart, and writes into registered client memory for GET.",
        },
        {
          title: "Off unless enabled",
          description:
            "NIXL/UCX and cuObject are enterprise-kernel options. Both are feature-gated and stay off until an operator turns the matching switch on.",
        },
      ]}
      links={[
        { label: "Talk to us", href: "/contact-us/" },
        {
          label: "S3 protocol docs",
          href: "https://docs.rustfs.com/en/administration/protocols/s3",
          variant: "outline",
        },
      ]}
    >
      <RdmaProductContent />
    </FeaturePage>
  );
}
