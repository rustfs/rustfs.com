import type { Metadata } from "next";

import SiteReplicationRedirect from "./redirect";

const title = "Moved to Replication | RustFS";
const description =
  "Site Replication has moved to the Replication product page covering bucket replication and site replication.";

export const metadata: Metadata = {
  alternates: { canonical: "product/replication/" },
  title,
  description,
  robots: { index: false, follow: true },
};

export default function SiteReplicationPage() {
  return (
    <>
      <meta httpEquiv="refresh" content="0;url=/product/replication/" />
      <SiteReplicationRedirect />
    </>
  );
}
