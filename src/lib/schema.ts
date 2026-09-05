import {
  canonicalUrl,
  cityPath,
  lockedH1,
  servicePath,
  site,
  type City,
  type Service,
} from "@/config/site";
import type { Faq } from "@/lib/content";

export function publisherLocalBusiness(city: City) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.legalName,
    alternateName: site.name,
    description: `${site.name} collects residential solar quote requests for ${site.operator}. ${site.disclosure}`,
    url: site.url,
    email: site.email,
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

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.legalName,
    alternateName: site.name,
    description: site.description,
    url: canonicalUrl("/"),
    email: site.email,
    telephone: site.phoneTel,
    areaServed: [
      {
        "@type": "City",
        name: "Dayton",
        containedInPlace: { "@type": "State", name: "Ohio" },
      },
      {
        "@type": "City",
        name: "Columbus",
        containedInPlace: { "@type": "State", name: "Ohio" },
      },
      {
        "@type": "City",
        name: "Cincinnati",
        containedInPlace: { "@type": "State", name: "Ohio" },
      },
    ],
    knowsAbout: ["Residential solar", "TPO solar", "Solar installation"],
  };
}

export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: canonicalUrl("/"),
    description: site.description,
    inLanguage: "en-US",
    publisher: {
      "@type": "Organization",
      name: site.legalName,
      alternateName: site.name,
      url: canonicalUrl("/"),
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

export function servicePageBreadcrumbs(city: City, service: Service) {
  return breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: `${city.name}, ${city.stateAbbr}`, path: cityPath(city) },
    { name: service.name, path: servicePath(city, service) },
  ]);
}

export function hubBreadcrumbs(city: City) {
  return breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: `${city.name}, ${city.stateAbbr}`, path: cityPath(city) },
  ]);
}

export function servicePageHeadline(city: City, service: Service) {
  return lockedH1(service, city);
}
