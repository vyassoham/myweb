import type { Metadata, Viewport } from "next";
import { Inter, Outfit, Fira_Code } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"
import MatrixRain from "./components/MatrixRain";

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

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Soham | Cyber Security Specialist & Full Stack Developer",
  description: "Elite cybersecurity professional and full-stack developer. Penetration testing, exploit development, and cutting-edge web technologies.",
  keywords: [
    "Soham",
    "Cybersecurity",
    "Penetration Testing",
    "Full Stack Developer",
    "Ethical Hacker",
    "Bug Bounty Hunter",
    "Network Security",
    "Portfolio",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://soham.lol",
    title: "Soham | Cyber Security Specialist",
    description: "Elite cybersecurity arsenal and full-stack development portfolio.",
    siteName: "Soham Cyber Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Soham | Cyber Security Specialist",
    description: "Elite cybersecurity arsenal and full-stack development portfolio.",
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
  themeColor: "#00ff41",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${outfit.variable} ${firaCode.variable} font-sans antialiased`}
      >
        <MatrixRain />
        <div className="cyber-bg" />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
