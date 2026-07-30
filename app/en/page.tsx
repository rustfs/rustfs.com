'use client'

import { RedirectPanel } from "@/components/business/redirect-panel";
import { useEffect } from "react";

export default function EnRedirectPage() {
  useEffect(() => {
    window.location.replace("/");
  }, []);

  return (
    <RedirectPanel
      actionLabel="Open home"
      description="You are being redirected to the English RustFS homepage."
      eyebrow="RustFS"
      href="/"
      label="Home"
      title="Opening RustFS."
    />
  );
}
