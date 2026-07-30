'use client'

import { SITE_CONFIG } from "@/app.config";
import { RedirectPanel } from "@/components/business/redirect-panel";
import { useEffect } from "react";

export default function ZhRedirectPage() {
  useEffect(() => {
    window.location.replace(`${SITE_CONFIG.secondaryDomain}/`);
  }, []);

  return (
    <RedirectPanel
      actionLabel="打开中文站"
      description="正在跳转到 RustFS 中文站。"
      eyebrow="RustFS"
      href={`${SITE_CONFIG.secondaryDomain}/`}
      label="中文站"
      title="正在打开 RustFS 中文站。"
    />
  );
}
