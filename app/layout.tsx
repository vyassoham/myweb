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
  title: {
    default: "Soham Vyas — IIT Jodhpur | AI Systems Engineer & Open Source Contributor",
    template: "%s | Soham Vyas — IIT Jodhpur",
  },
  description:
    "Official portfolio of Soham Vyas, BS in Data Science & Artificial Intelligence at the Indian Institute of Technology (IIT) Jodhpur. Building production-grade AI systems, atomic rate limiters, cybersecurity analyzers, and SymPy (GSoC 2027) matrix logic.",
  keywords: [
    "Soham Vyas",
    "Soham Vyas IIT",
    "Soham Vyas IIT Jodhpur",
    "Soham Vyas AI Engineer",
    "Soham Vyas Data Science",
    "vyassoham",
    "soham.lol",
    "IIT Jodhpur",
    "Indian Institute of Technology Jodhpur",
    "IIT Jodhpur Data Science",
    "IIT Jodhpur AI",
    "SymPy Contributor",
    "GSoC 2027",
    "Cybersecurity Risk Analyzer",
    "AI Rate Limiter Shield",
    "Machine Learning",
    "Distributed Systems",
    "Python",
    "FastAPI",
    "Redis",
  ],
  authors: [{ name: "Soham Vyas", url: "https://soham.lol" }],
  creator: "Soham Vyas",
  alternates: {
    canonical: "https://soham.lol/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://soham.lol",
    title: "Soham Vyas — IIT Jodhpur | AI Systems Engineer",
    description:
      "Official portfolio of Soham Vyas, BS in Data Science & AI at IIT Jodhpur. Building production AI systems, rate limiters, neural speech pipelines, and SymPy computer algebra contributions.",
    siteName: "Soham Vyas | IIT Jodhpur Portfolio",
    images: [
      {
        url: "https://soham.lol/assets/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "Soham Vyas — IIT Jodhpur | AI Systems Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Soham Vyas — IIT Jodhpur | AI Systems Engineer",
    description:
      "BS in Data Science & AI @ IIT Jodhpur. Building production-grade systems and contributing to SymPy.",
    images: ["https://soham.lol/assets/thumbnail.png"],
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
  verification: {
    google: "google787667f481678cdc",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#07070a",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://soham.lol/#website",
      "url": "https://soham.lol/",
      "name": "Soham Vyas — IIT Jodhpur | Official Portfolio",
      "description":
        "Official portfolio of Soham Vyas, BS in Data Science & AI at the Indian Institute of Technology (IIT) Jodhpur.",
      "publisher": { "@id": "https://soham.lol/#person" },
      "inLanguage": "en-US",
    },
    {
      "@type": "Person",
      "@id": "https://soham.lol/#person",
      "name": "Soham Vyas",
      "alternateName": [
        "Soham Vyas IIT",
        "Soham Vyas IIT Jodhpur",
        "vyassoham",
        "Soham",
      ],
      "url": "https://soham.lol",
      "image": "https://soham.lol/assets/hero.png",
      "jobTitle": "AI Systems Engineer & Open Source Contributor",
      "description":
        "Undergraduate researcher and engineer in Data Science & Artificial Intelligence at IIT Jodhpur, systems developer, and SymPy open source contributor.",
      "disambiguatingDescription":
        "18-year-old computer scientist and systems engineer at the Indian Institute of Technology (IIT) Jodhpur, known for SymPy linear algebra optimizations and distributed rate limiting architectures.",
      "worksFor": {
        "@type": "EducationalOrganization",
        "name": "Indian Institute of Technology Jodhpur",
        "alternateName": "IIT Jodhpur",
        "url": "https://www.iitj.ac.in/",
      },
      "alumniOf": {
        "@type": "EducationalOrganization",
        "name": "Indian Institute of Technology Jodhpur",
        "alternateName": "IIT Jodhpur",
        "url": "https://www.iitj.ac.in/",
      },
      "knowsAbout": [
        "Artificial Intelligence",
        "Machine Learning",
        "Distributed Systems",
        "Computer Algebra",
        "SymPy",
        "FastAPI",
        "Python",
        "Redis",
        "C++",
        "Cybersecurity",
        "Data Science",
      ],
      "sameAs": [
        "https://github.com/vyassoham",
        "https://linkedin.com/in/vyassoham",
        "https://twitter.com/vyassoham",
        "https://x.com/vyassoham",
        "https://leetcode.com/u/vyassoham/",
      ],
    },
    {
      "@type": "ItemList",
      "@id": "https://soham.lol/#sitelinks",
      "name": "Portfolio Navigation & Google Sitelinks",
      "itemListElement": [
        {
          "@type": "SiteNavigationElement",
          "position": 1,
          "name": "Featured Engineering Projects",
          "description":
            "Production-grade AI systems, rate limiters, cybersecurity analyzers, and speech pipelines built by Soham Vyas.",
          "url": "https://soham.lol/projects/",
        },
        {
          "@type": "SiteNavigationElement",
          "position": 2,
          "name": "SymPy Open Source (GSoC 2027)",
          "description":
            "Upstream contributions to SymPy computer algebra system by Soham Vyas at IIT Jodhpur.",
          "url": "https://soham.lol/opensource/",
        },
        {
          "@type": "SiteNavigationElement",
          "position": 3,
          "name": "Interactive Engineering Labs",
          "description":
            "Live client-side cybersecurity entropy calculator and atomic Lua rate limiter simulator.",
          "url": "https://soham.lol/labs/",
        },
        {
          "@type": "SiteNavigationElement",
          "position": 4,
          "name": "About Soham Vyas (IIT Jodhpur)",
          "description":
            "Academic background, BS in Data Science & AI at Indian Institute of Technology Jodhpur.",
          "url": "https://soham.lol/about/",
        },
        {
          "@type": "SiteNavigationElement",
          "position": 5,
          "name": "Engineering Blog & Technical Publications",
          "description":
            "Deep-dive articles on SymPy Kronecker traces, distributed rate limiting, and cryptographic entropy.",
          "url": "https://soham.lol/blog/",
        },
        {
          "@type": "SiteNavigationElement",
          "position": 6,
          "name": "Technical Skills & Architecture",
          "description":
            "Languages, distributed systems, deep learning frameworks, and infrastructure tools.",
          "url": "https://soham.lol/#skills",
        },
        {
          "@type": "SiteNavigationElement",
          "position": 7,
          "name": "Contact & Social Profiles",
          "description":
            "Direct communication channels, email, GitHub, LinkedIn, and Twitter.",
          "url": "https://soham.lol/contact/",
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="canonical" href="https://soham.lol/" />
        <meta name="google-site-verification" content="google787667f481678cdc" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased bg-[#07070a] text-slate-100 min-h-screen`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
