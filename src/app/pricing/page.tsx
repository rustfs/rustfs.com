import { Metadata } from "next";
import PricingPage from "./_page";

import withMetadata from "@/utils/metadata";

export const metadata: Metadata = withMetadata({
  title: '价格',
})

export default PricingPage;
