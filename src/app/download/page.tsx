import { Metadata } from "next";
import DownloadPage from "./_page";

import withMetadata from "@/utils/metadata";

export const metadata: Metadata = withMetadata({
  title: '下载',
})

export default DownloadPage
