import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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
  metadataBase: new URL("https://soham.lol"),
  title: "Soham Vyas | AI Systems Engineer & Open Source Contributor",
  description:
    "Portfolio of Soham Vyas — BS in Data Science & AI at IIT Jodhpur. Building production-grade AI security, rate limiters, neural speech pipelines, and contributing to SymPy (GSoC 2027).",
  keywords: [
    "Soham Vyas",
    "IIT Jodhpur",
    "Data Science",
    "AI Engineer",
    "Machine Learning",
    "SymPy",
    "GSoC 2027",
    "Python",
    "FastAPI",
    "Redis",
    "Portfolio",
    "soham.lol",
  ],
  authors: [{ name: "Soham Vyas", url: "https://soham.lol" }],
  creator: "Soham Vyas",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://soham.lol",
    title: "Soham Vyas | AI Systems Engineer & Open Source Contributor",
    description:
      "BS in Data Science & AI @ IIT Jodhpur. Systems engineer building production AI rate limiters, neural TTS, and contributing to SymPy.",
    siteName: "Soham Vyas Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Soham Vyas | AI Systems Engineer",
    description:
      "BS in Data Science & AI @ IIT Jodhpur. Building production-grade systems and contributing to SymPy.",
    creator: "@vyassoham",
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
  themeColor: "#07070a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased bg-[#07070a] text-slate-100 min-h-screen`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
