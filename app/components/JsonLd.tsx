export function HomeJsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": "https://www.soham.lol/#profilepage",
        url: "https://www.soham.lol/",
        name: "Soham Vyas — IIT Jodhpur | AI & Systems Engineer",
        isPartOf: { "@id": "https://www.soham.lol/#website" },
        mainEntity: { "@id": "https://www.soham.lol/#person" },
        dateModified: "2026-11-26",
      },
      {
        "@type": "ItemList",
        "@id": "https://www.soham.lol/#projects",
        name: "Featured Software Projects by Soham Vyas",
        itemListElement: [
          {
            "@type": "SoftwareSourceCode",
            position: 1,
            name: "AI Rate Limiter Shield",
            codeRepository: "https://github.com/vyassoham/ai-rate-limiter-shield",
            programmingLanguage: ["Python", "Lua"],
            author: { "@id": "https://www.soham.lol/#person" },
          },
          {
            "@type": "SoftwareSourceCode",
            position: 2,
            name: "SocialLogger",
            codeRepository: "https://github.com/vyassoham/SocialLogger",
            programmingLanguage: "Python",
            author: { "@id": "https://www.soham.lol/#person" },
          },
          {
            "@type": "SoftwareSourceCode",
            position: 3,
            name: "MediPro",
            codeRepository: "https://github.com/vyassoham/MediPro",
            programmingLanguage: "Python",
            author: { "@id": "https://www.soham.lol/#person" },
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
