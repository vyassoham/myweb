import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"

import "./globals.css";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Soham - Software Engineer & Full Stack Developer",
  description: "A passionate Software Engineer and Full Stack Developer. Creating meaningful and delightful digital products. Focused on building scalable and user-centric applications.",
  keywords: [
    "Soham",
    "Software Engineer",
    "Full Stack Developer",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "Web Designer",
    "Portfolio",
  ],
  authors: [{ name: "Soham" }],
  creator: "Soham",
  publisher: "Soham",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://soham.lol",
    title: "Soham - Software Engineer & Full Stack Developer",
    description: "A passionate Software Engineer and Full Stack Developer. Creating meaningful and delightful digital products.",
    siteName: "Soham Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Soham - Software Engineer & Full Stack Developer",
    description: "A passionate Software Engineer and Full Stack Developer.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://soham.lol" />
      </head>
      <body
        className={`${poppins.variable} font-sans antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
