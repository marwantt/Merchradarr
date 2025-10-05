import { Roboto_Mono, Passero_One } from "next/font/google";

export const monoFont = Roboto_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-mono",
});

export const titleFont = Passero_One({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-title",
});
