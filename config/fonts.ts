import { Space_Grotesk, Inter } from "next/font/google";

export const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-mono",
});
