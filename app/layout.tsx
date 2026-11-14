import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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
    default: "Soham Vyas — IIT Jodhpur | AI Systems Engineer & Open Source Contributor",
    template: "%s | Soham Vyas — IIT Jodhpur",
  },
  description:
    "Official portfolio of Soham Vyas, Bachelor of Science (Hons) in Data Science & Artificial Intelligence student at the Indian Institute of Technology (IIT) Jodhpur. Building production-grade AI systems, atomic rate limiters, cybersecurity analyzers, and SymPy (GSoC 2027) matrix logic.",
  keywords: [
    "Soham Vyas",
    "Soham Vyas IIT",
    "Soham Vyas IIT Jodhpur",
    "Soham Vyas AI Engineer",
    "Soham Vyas Data Science",
    "vyassoham",
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
  authors: [{ name: "Soham Vyas", url: "https://www.soham.lol" }],
  creator: "Soham Vyas",
  alternates: {
    canonical: "https://www.soham.lol/",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.soham.lol/",
    title: "Soham Vyas — IIT Jodhpur | AI Systems Engineer & Open Source Contributor",
    description:
      "Official portfolio of Soham Vyas, Bachelor of Science (Hons) in Data Science & AI at IIT Jodhpur. Building production AI systems, rate limiters, neural speech pipelines, and SymPy computer algebra contributions.",
    siteName: "Soham Vyas | IIT Jodhpur Portfolio",
    images: [
      {
        url: "https://www.soham.lol/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "Soham Vyas — IIT Jodhpur | AI Systems Engineer & Open Source Contributor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Soham Vyas — IIT Jodhpur | AI Systems Engineer & Open Source Contributor",
    description:
      "Bachelor of Science (Hons) in Data Science & AI @ IIT Jodhpur. Building production-grade systems and contributing to SymPy.",
    images: ["https://www.soham.lol/assets/og-image.png"],
    creator: "@Soham_Vyas_",
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
      "alternateName": [
        "Soham Vyas IIT",
        "Soham Vyas IIT Jodhpur",
        "vyassoham",
        "Soham",
      ],
      "url": "https://www.soham.lol/",
      "image": "https://www.soham.lol/assets/og-image.png",
      "jobTitle": "AI Systems Engineer & Open Source Contributor",
      "description":
        "Undergraduate researcher and engineer in Data Science & Artificial Intelligence at IIT Jodhpur, systems developer, and SymPy open source contributor.",
      "disambiguatingDescription":
        "Undergraduate student in Data Science & Artificial Intelligence at the Indian Institute of Technology (IIT) Jodhpur, specializing in symbolic computing, upstream SymPy matrix algebra optimizations, and distributed systems.",
      "affiliation": {
        "@type": "CollegeOrUniversity",
        "name": "Indian Institute of Technology Jodhpur",
        "alternateName": "IIT Jodhpur",
        "url": "https://www.iitj.ac.in/",
      },
      "hasCredential": [
        {
          "@type": "EducationalOccupationalCredential",
          "name": "Bachelor of Science (Hons) in Data Science & Artificial Intelligence (In Progress)",
          "credentialCategory": "degree",
          "recognizedBy": {
            "@type": "CollegeOrUniversity",
            "name": "Indian Institute of Technology Jodhpur",
            "url": "https://www.iitj.ac.in/",
          },
        },
      ],
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
        "https://www.linkedin.com/in/vyassoham/",
        "https://x.com/Soham_Vyas_",
        "https://leetcode.com/u/vyassoham/",
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
        <meta name="google-site-verification" content="google787667f481678cdc" />
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
        <Analytics />
      </body>
    </html>
  );
}
