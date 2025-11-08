'use client'

import { useEffect } from "react";

export default function EnRedirectPage() {
  useEffect(() => {
    window.location.replace("/");
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <p className="text-sm text-muted-foreground">Redirecting to RustFS...</p>
      </div>
    </main>
  );
}

