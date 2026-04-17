import Link from "next/link";
import { FAQAccordion } from "./FAQAccordion";

export const metadata = {
  title: "FAQ – MerchRadar | Amazon Merch Research Tool Questions Answered",
  description: "Common questions about MerchRadar, Amazon Merch on Demand research, niche finding, keyword strategies, and how to use the tool effectively.",
};

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <div className="border-b border-border bg-muted/30">
        <div className="max-w-4xl mx-auto px-6 py-16 space-y-4">
          <Link
            href="/"
            className="inline-block text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            ← Back to Home
          </Link>
          <h1 className="text-5xl title-font tracking-wide">FAQ</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Common questions about MerchRadar and Amazon Merch on Demand research.
          </p>
        </div>
      </div>

      {/* Questions */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <FAQAccordion />

        <div className="mt-8 text-center border border-dashed border-border p-8 space-y-4">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Still have questions?</p>
          <Link
            href="/contact"
            className="inline-block border border-foreground px-8 py-3 text-sm uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors"
          >
            Contact Us →
          </Link>
        </div>
      </div>
    </main>
  );
}
