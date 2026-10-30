"use client";

import { useEffect } from "react";
import Link from "next/link";

const TARGET = "/product/replication/";

export default function SiteReplicationRedirect() {
  useEffect(() => {
    window.location.replace(TARGET);
  }, []);

  return (
    <main className="mx-auto flex min-h-[50vh] max-w-2xl flex-col items-center justify-center gap-4 px-6 py-24 text-center">
      <h1 className="text-2xl font-semibold tracking-tight text-foreground">Moved to Replication</h1>
      <p className="text-sm text-muted-foreground">
        Site Replication is now part of the Replication product page, covering bucket replication and site
        replication.
      </p>
      <p className="text-sm">
        <Link href={TARGET} className="font-medium text-brand underline-offset-4 hover:underline">
          Continue to Replication
        </Link>
      </p>
      <noscript>
        <p className="text-sm text-muted-foreground">
          JavaScript is disabled.{" "}
          <a href={TARGET} className="font-medium text-brand underline">
            Open /product/replication/
          </a>
        </p>
      </noscript>
    </main>
  );
}
