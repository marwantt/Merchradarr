import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact MerchRadar – Get in Touch with Our Team",
  description: "Contact the MerchRadar team for support, questions, or feedback about our Amazon Merch research tool.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
