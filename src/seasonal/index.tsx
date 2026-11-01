import type { ReactNode } from "react";
import type { City, Service } from "@/config/site";
import type { Faq } from "@/lib/editorial";
import * as federalCredit202611 from "./federal-credit-2026-11";
import { seasonalRegistry } from "./registry";

/** A seasonal block: a section after the cost guide plus FAQ edits. */
export type SeasonalBlock = {
  Section?: (props: { city: City }) => ReactNode;
  faqs?: (city: City, base: Faq[]) => Faq[];
};

const blocks: Record<string, SeasonalBlock> = {
  "federal-credit-2026-11": federalCredit202611,
};

function blockFor(city: City, service: Service): SeasonalBlock | undefined {
  const id = seasonalRegistry[`${city.slug}:${service.slug}`];
  return id ? blocks[id] : undefined;
}

/** FAQ list for the page (visible list and FAQPage JSON-LD use the same array). */
export function seasonalFaqs(city: City, service: Service, base: Faq[]): Faq[] {
  const block = blockFor(city, service);
  return block?.faqs ? block.faqs(city, base) : base;
}

export function SeasonalSection({ city, service }: { city: City; service: Service }) {
  const Section = blockFor(city, service)?.Section;
  return Section ? <Section city={city} /> : null;
}
