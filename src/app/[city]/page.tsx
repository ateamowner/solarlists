import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Disclosure } from "@/components/disclosure";
import { FaqList } from "@/components/faq-list";
import { NearbyCityLinks } from "@/components/internal-links";
import { JsonLd } from "@/components/json-ld";
import { EmptyListingsNote } from "@/components/empty-listings";
import { QuoteFormLoader } from "@/components/quote-form-loader";
import { TrustStrip } from "@/components/trust-strip";
import {
  cities,
  cityPath,
  getCity,
  getService,
  servicePath,
  services,
  site,
} from "@/config/site";
import { hubFaqs, hubIntro } from "@/lib/content";
import {
  faqPageSchema,
  hubBreadcrumbs,
  publisherLocalBusiness,
} from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return cities.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCity(citySlug);
  if (!city) return {};

  const title = `Solar in ${city.name}, ${city.stateAbbr}`;
  const description = `${site.name} hub for ${city.name}. TPO / $0-down or a purchase quote for ${site.operator}. Not a utility or marketplace.`;
  return {
    title,
    description,
    alternates: { canonical: cityPath(city) },
  };
}

export default async function CityHubPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: citySlug } = await params;
  const city = getCity(citySlug);
  if (!city) notFound();

  const tpo = getService("tpo-solar");
  const questions = hubFaqs(city);
  const intro = hubIntro(city);

  return (
    <article className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <JsonLd
        data={[
          publisherLocalBusiness(city),
          faqPageSchema(questions),
          hubBreadcrumbs(city),
        ]}
      />
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: cityPath(city), label: `${city.name}, ${city.stateAbbr}` },
        ]}
      />

      <div className="mt-4 grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(20rem,26rem)] md:grid-rows-[auto_1fr]">
        <header className="md:col-start-1">
          <p className="text-sm font-medium text-primary">{city.state}</p>
          <h1 className="type-h1 mt-2">
            Solar in {city.name}, {city.stateAbbr}
          </h1>
          <p className="mt-4 rounded-md border border-accent bg-accent/40 px-3 py-2 text-sm leading-6">
            TPO / $0-down is a first-class option in {city.name}: go solar
            without a huge loan. Ask for a purchase quote on the same form if
            you want to own the system.
          </p>
          <Disclosure className="mt-4" />
          <EmptyListingsNote className="mt-4" city={city} />
        </header>
        <aside className="md:col-start-2 md:row-span-2 md:sticky md:top-24 md:self-start">
          <QuoteFormLoader city={city} service={tpo} />
        </aside>
        <div className="md:col-start-1">
          {intro.map((paragraph) => (
            <p key={paragraph} className="mt-4 text-base leading-7 first:mt-0">
              {paragraph}
            </p>
          ))}
          <TrustStrip className="mt-6" />

          <h2 className="mt-8 font-heading text-xl font-semibold">
            Services in {city.name}
          </h2>
          <ul className="mt-3 grid gap-3">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={servicePath(city, service)}
                  className="block rounded-lg border border-border bg-card px-4 py-3 hover:border-primary"
                >
                  <span className="font-medium">
                    Best {service.name} in {city.name} — {site.year}
                  </span>
                  <span className="mt-1 block text-sm text-muted-foreground">
                    {service.blurb}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <FaqList faqs={questions} />
          <NearbyCityLinks
            city={city}
            serviceSlug={tpo?.slug ?? "solar-installation"}
          />
        </div>
      </div>
    </article>
  );
}
