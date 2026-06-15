import ContactUsButton from "@/components/business/buttons/contact-us";
import DownloadLink from "@/components/business/buttons/download-link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | RustFS",
  description: "RustFS is Apache 2.0 open-source object storage. Contact the RustFS team for enterprise support, migration, and deployment planning.",
};

export default function PricingPage() {
  return (
    <main className="relative z-10 flex-1">
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Pricing
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            RustFS is open-source software licensed under Apache 2.0. For enterprise deployment planning, migration support, and production assistance, contact the RustFS team.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <ContactUsButton />
            <DownloadLink className="bg-secondary text-secondary-foreground hover:bg-secondary/90" />
          </div>
        </div>
      </section>
    </main>
  );
}
