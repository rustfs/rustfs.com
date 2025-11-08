'use client'

import { SITE_CONFIG } from "@/app.config";
import { useEffect } from "react";

export default function ZhRedirectPage() {
  useEffect(() => {
    window.location.replace(`${SITE_CONFIG.secondaryDomain}/`);
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <p className="text-sm text-muted-foreground">正在跳转到 RustFS 中文站...</p>
      </div>
    </main>
  );
}

