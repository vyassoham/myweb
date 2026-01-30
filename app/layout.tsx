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
  title: "Soham | Full Stack Developer & Security Specialist",
  description: "Elite full-stack developer specializing in secure, scalable web applications and modern technologies.",
  keywords: [
    "Soham",
    "Full Stack Developer",
    "Web Security",
    "React Developer",
    "Next.js",
    "TypeScript",
    "Portfolio",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://soham.lol",
    title: "Soham | Full Stack Developer",
    description: "Building secure, scalable, and beautiful web applications.",
    siteName: "Soham Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Soham | Full Stack Developer",
    description: "Building secure, scalable, and beautiful web applications.",
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
  themeColor: "#8b5cf6",
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
        <div className="premium-bg" />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
