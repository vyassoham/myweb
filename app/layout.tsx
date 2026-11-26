import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import ScrollProgress from "./components/ScrollProgress";
import CustomCursor from "./components/CustomCursor";
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
  metadataBase: new URL("https://www.soham.lol"),
  title: {
    default: "Soham Vyas — IIT Jodhpur | AI Systems Engineer",
    template: "%s | Soham Vyas",
  },
  description:
    "Undergraduate in Data Science & AI at IIT Jodhpur. Building production AI systems, atomic Redis rate limiters, and upstream SymPy computer algebra.",
  keywords: [
    "Soham Vyas",
    "vyassoham",
    "Soham Vyas IIT",
    "Soham Vyas IIT Jodhpur",
    "Soham Vyas AI Engineer",
    "Soham Vyas Data Science",
    "soham.lol",
    "www.soham.lol",
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
  alternates: {
    canonical: "/",
  },
  authors: [{ name: "Soham Vyas", url: "https://www.soham.lol" }],
  creator: "Soham Vyas",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: "https://www.soham.lol/",
    title: "Soham Vyas — IIT Jodhpur | AI & Systems Engineer",
    description:
      "Data Science & AI student at IIT Jodhpur. Upstream SymPy contributor building production AI systems and atomic Redis rate limiters.",
    siteName: "Soham Vyas",
    images: [
      {
        url: "/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "Soham Vyas — IIT Jodhpur | AI & Systems Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Soham Vyas — IIT Jodhpur | AI & Systems Engineer",
    description:
      "Data Science & AI student at IIT Jodhpur. Upstream SymPy contributor building production AI systems and atomic Redis rate limiters.",
    images: ["/assets/og-image.png"],
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
      "@id": "https://www.soham.lol/#website",
      "url": "https://www.soham.lol/",
      "name": "Soham Vyas — IIT Jodhpur | Official Portfolio",
      "description":
        "Official portfolio of Soham Vyas, Bachelor of Science (Hons) in Data Science & AI at the Indian Institute of Technology (IIT) Jodhpur.",
      "publisher": { "@id": "https://www.soham.lol/#person" },
      "inLanguage": "en-US",
    },
    {
      "@type": "Person",
      "@id": "https://www.soham.lol/#person",
      "name": "Soham Vyas",
      "alternateName": ["vyassoham", "Soham Vyas IIT Jodhpur"],
      "url": "https://www.soham.lol/",
      "image": "https://www.soham.lol/assets/soham-vyas.webp",
      "email": "mailto:hello@soham.lol",
      "jobTitle": "AI & Data Science Student, Software Developer & Open-Source Contributor",
      "description":
        "BS (Hons) Data Science & Applied AI student at IIT Jodhpur based in Rajasthan, India. Open-source contributor to SymPy and developer of production Python, FastAPI, Redis, and ML systems.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Jodhpur",
        "addressRegion": "Rajasthan",
        "addressCountry": "IN",
      },
      "affiliation": {
        "@type": "CollegeOrUniversity",
        "name": "Indian Institute of Technology Jodhpur",
        "alternateName": "IIT Jodhpur",
        "sameAs": "https://www.iitj.ac.in/",
        "url": "https://www.iitj.ac.in/",
      },
      "alumniOf": {
        "@type": "CollegeOrUniversity",
        "name": "Indian Institute of Technology Jodhpur",
        "sameAs": "https://www.iitj.ac.in/",
      },
      "knowsAbout": [
        "Data Science",
        "Artificial Intelligence",
        "SymPy",
        "Symbolic Computation",
        "Python",
        "FastAPI",
        "Redis",
        "Distributed Rate Limiting",
        "Machine Learning",
        "Next.js",
      ],
      "sameAs": [
        "https://github.com/vyassoham",
        "https://www.linkedin.com/in/cybersoham",
      ],
    },
    {
      "@type": "ItemList",
      "@id": "https://www.soham.lol/#sitelinks",
      "name": "Portfolio Navigation & Google Sitelinks",
      "itemListElement": [
        {
          "@type": "SiteNavigationElement",
          "position": 1,
          "name": "Featured Engineering Projects",
          "description":
            "Production-grade AI systems, rate limiters, cybersecurity analyzers, and speech pipelines built by Soham Vyas.",
          "url": "https://www.soham.lol/projects/",
        },
        {
          "@type": "SiteNavigationElement",
          "position": 2,
          "name": "SymPy Open Source (GSoC 2027)",
          "description":
            "Upstream contributions to SymPy computer algebra system by Soham Vyas at IIT Jodhpur.",
          "url": "https://www.soham.lol/opensource/",
        },
        {
          "@type": "SiteNavigationElement",
          "position": 3,
          "name": "Interactive Engineering Labs",
          "description":
            "Live client-side cybersecurity entropy calculator and atomic Lua rate limiter simulator.",
          "url": "https://www.soham.lol/labs/",
        },
        {
          "@type": "SiteNavigationElement",
          "position": 4,
          "name": "About Soham Vyas (IIT Jodhpur)",
          "description":
            "Academic background, Bachelor of Science (Hons) in Data Science & AI at Indian Institute of Technology Jodhpur.",
          "url": "https://www.soham.lol/about/",
        },
        {
          "@type": "SiteNavigationElement",
          "position": 5,
          "name": "Engineering Blog & Technical Publications",
          "description":
            "Deep-dive articles on SymPy Kronecker traces, distributed rate limiting, and cryptographic entropy.",
          "url": "https://www.soham.lol/blog/",
        },
        {
          "@type": "SiteNavigationElement",
          "position": 6,
          "name": "Technical Skills & Architecture",
          "description":
            "Languages, distributed systems, deep learning frameworks, and infrastructure tools.",
          "url": "https://www.soham.lol/#skills",
        },
        {
          "@type": "SiteNavigationElement",
          "position": 7,
          "name": "Contact & Social Channels",
          "description":
            "Direct communication channels, email, GitHub, LinkedIn, and X.",
          "url": "https://www.soham.lol/contact/",
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
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('theme');
                  var prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
                  var theme = saved || (prefersLight ? 'light' : 'dark');
                  if (theme === 'light') {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.classList.add('light');
                    document.documentElement.setAttribute('data-theme', 'light');
                  } else {
                    document.documentElement.classList.remove('light');
                    document.documentElement.classList.add('dark');
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased bg-[#07070a] text-slate-100 min-h-screen`}
      >
        <CustomCursor />
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
