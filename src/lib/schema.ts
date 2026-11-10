import {
  canonicalUrl,
  cityPath,
  site,
  type City,
} from "@/config/site";
import type { Faq } from "@/lib/editorial";

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://solarlists.com/#author",
    name: site.authorFormal,
    jobTitle: "Writer",
    homeLocation: {
      "@type": "Place",
      name: site.authorLocation,
    },
    url: canonicalUrl("/about/"),
    email: site.email,
    telephone: site.phoneTel,
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

/** City pages. No street address, public contact only. */
export function publisherLocalBusiness(city: City) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.legalName,
    alternateName: site.name,
    description: `${site.name} publishes residential solar guides for ${city.name} and collects consult requests for ${site.operator}.`,
    url: canonicalUrl("/"),
    email: site.email,
    telephone: site.phoneTel,
    areaServed: {
      "@type": "City",
      name: city.name,
      containedInPlace: {
        "@type": "State",
        name: city.state,
      },
    },
    knowsAbout: ["Residential solar", "TPO solar", "Solar installation"],
  };
}

/** City guide page: one page per city covering buy, TPO and panels (merged 2026-10-23). */
export function cityGuideWebPage(
  city: City,
  opts: { title: string; description: string; dateModified?: Date; sections: { id: string; heading: string }[] }
) {
  const url = canonicalUrl(cityPath(city));
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: opts.title,
    description: opts.description,
    inLanguage: "en-US",
    isPartOf: { "@id": "https://solarlists.com/#website" },
    author: { "@id": "https://solarlists.com/#author" },
    ...(opts.dateModified ? { dateModified: opts.dateModified.toISOString() } : {}),
    about: [
      { "@type": "Thing", name: "Residential solar installation" },
      { "@type": "Thing", name: "Third-party-owned (TPO) solar" },
      { "@type": "Thing", name: "Solar panels" },
      { "@type": "Thing", name: "Net metering" },
    ],
    spatialCoverage: {
      "@type": "City",
      name: city.name,
      containedInPlace: { "@type": "State", name: city.state },
    },
    hasPart: opts.sections.map((section) => ({
      "@type": "WebPageElement",
      name: section.heading,
      url: `${url}#${section.id}`,
    })),
  };
}

export function hubBreadcrumbs(city: City) {
  return breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: `${city.name}, ${city.stateAbbr}`, path: cityPath(city) },
  ]);
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
