import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Soham | Full Stack Developer & AI Innovator",
  description: "Worldwide personal portfolio of Soham, a world-class UI/UX designer and senior frontend engineer. Crafting cinematic digital experiences that blend deep technical skill with premium design taste.",
  keywords: [
    "Soham",
    "Software Engineer",
    "Full Stack Developer",
    "UI/UX Designer",
    "Next.js Developer",
    "AI Enthusiast",
    "Portfolio",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://soham.lol",
    title: "Soham | Full Stack Developer & AI Innovator",
    description: "Cinematic portfolio of a world-class engineer and designer.",
    siteName: "Soham Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Soham | Full Stack Developer & AI Innovator",
    description: "Cinematic portfolio of a world-class engineer and designer.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0a0118",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased`}
      >
        <div className="mesh-bg" />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
