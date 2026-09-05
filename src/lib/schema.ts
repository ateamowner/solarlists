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

/** Homepage only. Locked SHIP #2 LocalBusiness — not a marketplace Organization. */
export function homepageLocalBusiness() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://solarlists.com/#organization",
    name: "A Team Contracting",
    url: "https://solarlists.com/",
    email: "owner@ateamcontractings.com",
    areaServed: ["Dayton OH", "Columbus OH", "Cincinnati OH"],
    description:
      "Residential solar quotes (TPO and purchase) for A Team Contracting. Not a contractor marketplace.",
  };
}

export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: canonicalUrl("/"),
    publisher: {
      "@id": "https://solarlists.com/#organization",
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
