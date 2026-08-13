import type { Metadata } from "next";
import RustfsConfigGenerator from "@/components/business/rustfs-config-generator";

export const metadata: Metadata = {
  title: "RustFS Config Generator | Generate /etc/default/rustfs Online",
  description:
    "Generate a RustFS /etc/default/rustfs config file in seconds — set S3 API and console ports, volumes, access keys, log level, and OpenTelemetry.",
  keywords: [
    "RustFS config generator",
    "/etc/default/rustfs",
    "RUSTFS_ADDRESS",
    "RUSTFS_CONSOLE_ADDRESS",
    "RUSTFS_VOLUMES",
    "RUSTFS_ACCESS_KEY",
    "RUSTFS_SECRET_KEY",
    "RUSTFS_OBS_LOGGER_LEVEL",
    "RUSTFS_OBS_LOG_DIRECTORY",
    "RUSTFS_OBS_ENDPOINT",
    "RustFS configuration file",
  ],
  alternates: {
    canonical: "/rustfs-config-generator",
  },
  openGraph: {
    title: "RustFS Config Generator | Generate /etc/default/rustfs Online",
    description:
      "Generate a RustFS /etc/default/rustfs config file in seconds — set S3 API and console ports, volumes, access keys, log level, and OpenTelemetry.",
    type: "website",
    url: "/rustfs-config-generator",
    locale: "en_US",
    siteName: "RustFS",
    images: [
      {
        url: "/images/og/rustfs-config-generator.png",
        width: 1200,
        height: 1200,
        alt: "RustFS Config Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RustFS Config Generator | Generate /etc/default/rustfs Online",
    description:
      "Generate a RustFS /etc/default/rustfs config file in seconds — set S3 API and console ports, volumes, access keys, log level, and OpenTelemetry.",
    images: ["/images/og/rustfs-config-generator.png"],
  },
};

export default function RustfsConfigGeneratorPage() {
  return (
    <main className="flex-1">
      <RustfsConfigGenerator />
    </main>
  );
}
