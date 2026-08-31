import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Disclosure } from "@/components/disclosure";
import { FaqList } from "@/components/faq-list";
import { NearbyCityLinks } from "@/components/internal-links";
import { JsonLd } from "@/components/json-ld";
import { QuoteFormLoader } from "@/components/quote-form-loader";
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

      <div className="mt-4 grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div>
          <p className="text-sm font-medium text-primary">{city.state}</p>
          <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Solar in {city.name}, {city.stateAbbr}
          </h1>
          {intro.map((paragraph) => (
            <p key={paragraph} className="mt-4 text-base leading-7">
              {paragraph}
            </p>
          ))}
          <p className="mt-4 rounded-md border border-accent bg-accent/40 px-3 py-2 text-sm leading-6">
            TPO / $0-down is a first-class option in {city.name}: go solar
            without a huge loan. Ask for a purchase quote on the same form if
            you want to own the system.
          </p>
          <Disclosure className="mt-4" />

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
        <aside className="lg:sticky lg:top-6 lg:self-start">
          <QuoteFormLoader city={city} service={tpo} />
        </aside>
      </div>
    </article>
  );
}
