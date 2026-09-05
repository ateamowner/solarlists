import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CostGuide } from "@/components/cost-guide";
import { Disclosure } from "@/components/disclosure";
import { FaqList } from "@/components/faq-list";
import { HowToChoose } from "@/components/how-to-choose";
import {
  NearbyCityLinks,
  RelatedServiceLinks,
} from "@/components/internal-links";
import { JsonLd } from "@/components/json-ld";
import { EmptyListingsNote } from "@/components/empty-listings";
import { QuoteFormLoader } from "@/components/quote-form-loader";
import { TrustStrip } from "@/components/trust-strip";
import {
  cities,
  cityPath,
  getCity,
  getService,
  lockedH1,
  pageTitle,
  servicePath,
  services,
  site,
} from "@/config/site";
import {
  costGuideCopy,
  faqs,
  howToChoose,
  introParagraphs,
  metaDescription,
} from "@/lib/content";
import {
  faqPageSchema,
  publisherLocalBusiness,
  servicePageBreadcrumbs,
} from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return cities.flatMap((city) =>
    services.map((service) => ({
      city: city.slug,
      service: service.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string; service: string }>;
}): Promise<Metadata> {
  const { city: citySlug, service: serviceSlug } = await params;
  const city = getCity(citySlug);
  const service = getService(serviceSlug);
  if (!city || !service) return {};

  const title = pageTitle(service, city);
  const description = metaDescription(city, service);
  return {
    title,
    description,
    alternates: { canonical: servicePath(city, service) },
    openGraph: {
      title,
      description,
      url: servicePath(city, service),
      siteName: site.name,
      type: "website",
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ city: string; service: string }>;
}) {
  const { city: citySlug, service: serviceSlug } = await params;
  const city = getCity(citySlug);
  const service = getService(serviceSlug);
  if (!city || !service) notFound();

  const heading = lockedH1(service, city);
  const intro = introParagraphs(city, service);
  const choose = howToChoose(city, service);
  const cost = costGuideCopy(city);
  const questions = faqs(city, service);

  return (
    <article className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <JsonLd
        data={[
          publisherLocalBusiness(city),
          faqPageSchema(questions),
          servicePageBreadcrumbs(city, service),
        ]}
      />

      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: cityPath(city), label: `${city.name}, ${city.stateAbbr}` },
          { href: servicePath(city, service), label: service.name },
        ]}
      />

      <div className="mt-4 grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(20rem,26rem)] md:grid-rows-[auto_1fr]">
        <header className="md:col-start-1">
          <p className="text-sm font-medium text-primary">
            {city.name}, {city.stateAbbr}
          </p>
          <h1 className="type-h1 mt-2 text-balance">
            {heading}
          </h1>
          <p className="mt-3 rounded-md border border-accent bg-accent/40 px-3 py-2 text-sm">
            {service.slug === "tpo-solar"
              ? `TPO / $0-down: go solar in ${city.name} without a huge loan. The TPO provider owns the system.`
              : `TPO / $0-down is available on this ${city.name} quote, plus a standard purchase path.`}
          </p>
          <Disclosure className="mt-3" />
          <EmptyListingsNote className="mt-4" city={city} service={service} />
        </header>

        <aside className="md:col-start-2 md:row-span-2 md:self-start md:sticky md:top-24">
          <QuoteFormLoader city={city} service={service} />
        </aside>

        <div className="md:col-start-1">
          {intro.map((paragraph) => (
            <p key={paragraph} className="mt-4 text-base leading-7 first:mt-0">
              {paragraph}
            </p>
          ))}
          <TrustStrip className="mt-8" />
          <HowToChoose content={choose} />
          <CostGuide content={cost} />
          <FaqList faqs={questions} />
          <RelatedServiceLinks city={city} current={service} />
          <NearbyCityLinks city={city} serviceSlug={service.slug} />
        </div>
      </div>
    </article>
  );
}
