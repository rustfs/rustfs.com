import type { Metadata } from "next";
import ErasureCodeCalculator from "@/components/business/erasure-code-calculator";

export const metadata: Metadata = {
  title: "RustFS Erasure Code Calculator",
  description: "Calculate raw capacity, usable capacity, and failure tolerance for erasure coding.",
};

export default function ErasureCodeCalculatorPage() {
  return (
    <main className="flex-1">
      <ErasureCodeCalculator />
    </main>
  );
}
