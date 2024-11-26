import { Metadata } from "next";
import siteConfig from "../../config";

export default function withMetadata(metadata: Metadata): Metadata {
  if (metadata.title) {
    metadata.title = metadata.title + ` - ${siteConfig.title}`;
  }

  return metadata;
}
