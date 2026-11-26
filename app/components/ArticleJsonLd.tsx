export function SymPyArticleJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": "https://www.soham.lol/blog/sympy-kronecker-trace/#article",
        headline: "How I Eliminated O(n^3) Matrix Expansion in SymPy Kronecker Traces",
        description:
          "Engineering deep dive into symbolic matrix expressions, Kronecker product tensor algebra, and O(1) scalar trace evaluation in SymPy PR #31011.",
        url: "https://www.soham.lol/blog/sympy-kronecker-trace/",
        image: "https://www.soham.lol/assets/og/og-sympy.png",
        datePublished: "2026-11-14",
        dateModified: "2026-11-26",
        inLanguage: "en-US",
        author: { "@id": "https://www.soham.lol/#person" },
        publisher: { "@id": "https://www.soham.lol/#person" },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": "https://www.soham.lol/blog/sympy-kronecker-trace/",
        },
        about: ["SymPy", "Kronecker Product", "Symbolic Computation", "Computer Algebra"],
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.soham.lol/blog/sympy-kronecker-trace/#breadcrumb",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Portfolio", item: "https://www.soham.lol/" },
          { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.soham.lol/blog/" },
          { "@type": "ListItem", position: 3, name: "SymPy Kronecker Trace", item: "https://www.soham.lol/blog/sympy-kronecker-trace/" },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
