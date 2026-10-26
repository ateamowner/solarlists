import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ConsultForm } from "@/components/consult-form";
import { CostGuide } from "@/components/cost-guide";
import { FaqList } from "@/components/faq-list";
import { FederalCreditBlock } from "@/components/federal-credit";
import { HowToChoose } from "@/components/how-to-choose";
import { NearbyCityHubs, RegionHubLinks } from "@/components/internal-links";
import { LocalFactsBlock } from "@/components/local-facts";
import { localFacts } from "@/lib/local-facts";
import { JsonLd } from "@/components/json-ld";
import { EmptyListingsNote } from "@/components/empty-listings";
import { TrustStrip } from "@/components/trust-strip";
import {
  cities,
  cityPath,
  getCity,
  indexableRobots,
  services,
  site,
  hubTitle,
} from "@/config/site";
import {
  costGuideCopy,
  howToChoose,
  hubFaqs,
  hubIntro,
  hubMetaDescription,
  hubSections,
  quickAnswer,
} from "@/lib/content";
import { cityPageLastmod } from "@/lib/lastmod";
import {
  cityGuideWebPage,
  faqPageSchema,
  hubBreadcrumbs,
  publisherLocalBusiness,
} from "@/lib/schema";
import { shareMeta } from "@/lib/share-meta";

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

  const title = hubTitle(city);
  const description = hubMetaDescription(city);
  return {
    title,
    description,
    robots: indexableRobots,
    alternates: { canonical: cityPath(city) },
    ...shareMeta(title, description, cityPath(city)),
  };
}

export default async function CityGuidePage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: citySlug } = await params;
  const city = getCity(citySlug);
  if (!city) notFound();

  const questions = hubFaqs(city);
  const intro = hubIntro(city);
  const sections = hubSections(city);
  const choose = howToChoose(city);
  const cost = costGuideCopy(city);
  const facts = localFacts(city);
  const updated = cityPageLastmod(
    city.slug,
    services.map((service) => service.slug)
  );
  const citations = facts
    ? [
        ...facts.utilityLinks,
        ...(facts.metering?.links ?? []),
        ...facts.permitLinks,
        ...(facts.costLinks ?? []),
      ].filter((link, i, all) => all.findIndex((l) => l.url === link.url) === i)
    : [];
  const toc = [
    ...sections.map((s) => ({ id: s.id, label: s.heading })),
    { id: "tax-credit", label: "Federal tax credit status in 2026" },
    { id: "how-to-choose", label: "How to choose a solar company" },
    { id: "cost", label: "Cost guide" },
    { id: "local-basics", label: `${city.name} utility, net metering, permits and local costs` },
    { id: "faq", label: "Frequently asked questions" },
  ];

  return (
    <article className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <JsonLd
        data={[
          publisherLocalBusiness(city),
          cityGuideWebPage(city, {
            title: hubTitle(city),
            description: hubMetaDescription(city),
            dateModified: updated,
            sections: [
              ...sections.map((s) => ({ id: s.id, heading: s.heading })),
              ...(facts
                ? [{ id: "local-basics", heading: `${city.name} solar basics: utility, net metering, permits, local costs` }]
                : []),
            ],
            citations,
          }),
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
            {`Solar in ${city.name}, ${city.stateAbbr}: Buy, TPO and Panel Guide`}
          </h1>
          {updated ? (
            <p className="mt-2 text-sm text-muted-foreground">
              Last updated{" "}
              <time dateTime={updated.toISOString().slice(0, 10)}>
                {updated.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  timeZone: "America/New_York",
                })}
              </time>
            </p>
          ) : null}
          <p className="mt-4 rounded-md border border-accent bg-accent/40 px-3 py-2 text-sm leading-6">
            {quickAnswer(city)}
          </p>
          <EmptyListingsNote className="mt-4" city={city} />
        </header>
        <aside className="md:col-start-2 md:row-span-2 md:sticky md:top-24 md:self-start">
          <h2 className="mb-3 font-heading text-lg font-semibold">
            {`Consult for ${city.name}`}
          </h2>
          <ConsultForm />
        </aside>
        <div className="md:col-start-1">
          {intro.map((paragraph) => (
            <p key={paragraph} className="mt-4 text-base leading-7 first:mt-0">
              {paragraph}
            </p>
          ))}
          <TrustStrip className="mt-6" />

          <nav aria-label="On this page" className="mt-8 rounded-lg border border-border bg-card p-4">
            <h2 className="font-heading text-lg font-semibold">On this page</h2>
            <ol className="mt-2 grid gap-1 text-sm sm:grid-cols-2">
              {toc.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="underline underline-offset-2">
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {sections.map((section) => (
            <section key={section.id} id={section.id} className="mt-10 scroll-mt-24">
              <h2 className="type-h2">{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-3 text-base leading-7">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}

          <FederalCreditBlock cityName={city.name} />
          <HowToChoose content={choose} />
          <CostGuide content={cost} />
          <LocalFactsBlock city={city} />
          <FaqList faqs={questions} />
          <NearbyCityHubs city={city} />
          <RegionHubLinks city={city} />
          <p className="mt-8 text-sm">
            <Link href="/consult/" className="underline underline-offset-2">
              {`Request a ${site.name} consult`}
            </Link>
            {" · "}
            <Link href="/sources/" className="underline underline-offset-2">
              How we source facts
            </Link>
            {" · "}
            <Link href="/#cities" className="underline underline-offset-2">
              All Ohio city guides
            </Link>
          </p>
        </div>
      </div>
    </article>
  );
}
