import { canonicalUrl, site } from "@/config/site";
import type { Faq } from "@/lib/editorial";

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://solarlists.com/#author",
    name: site.author,
    jobTitle: "Writer",
    homeLocation: {
      "@type": "Place",
      name: site.authorLocation,
    },
    url: canonicalUrl("/about/"),
  };
}

export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://solarlists.com/#website",
    name: site.name,
    url: canonicalUrl("/"),
    description: site.description,
    author: {
      "@id": "https://solarlists.com/#author",
    },
  };
}

export function faqPageSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: canonicalUrl(item.path),
    })),
  };
}
