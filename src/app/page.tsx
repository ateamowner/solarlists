import type { Metadata } from "next";
import Link from "next/link";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { NepqOpener } from "@/components/nepq-opener";
import { TrustStrip } from "@/components/trust-strip";
import {
  citiesInRegion,
  cityPath,
  cityRegionHeadings,
  cityRegionOrder,
  servicePath,
  services,
  site,
} from "@/config/site";
import { homeFaqs } from "@/lib/editorial";
import { faqPageSchema, personSchema, webSiteSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: `${site.name} — Dayton, Columbus, and Cincinnati solar`,
  description: site.description,
  alternates: { canonical: "https://solarlists.com/" },
  openGraph: {
    description: site.description,
  },
  twitter: {
    description: site.description,
  },
};

const anchors = [
  { href: "/dayton-oh/", label: "Dayton" },
  { href: "/columbus-oh/", label: "Columbus" },
  { href: "/cincinnati-oh/", label: "Cincinnati" },
] as const;

export default function HomePage() {
  const questions = homeFaqs();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <JsonLd data={[webSiteSchema(), personSchema(), faqPageSchema(questions)]} />

      <section className="max-w-3xl">
        <p className="text-sm font-medium text-primary">{site.tagline}</p>
        <h1 className="type-h1 mt-2">
          Solar guides for Dayton, Columbus, Cincinnati, and nearby Ohio cities.
        </h1>
        <p className="type-prose mt-4">
          {site.name} publishes a city hub for each Ohio market, with pages for
          solar installation, TPO solar, and solar panels. Education on how
          ownership works stays on this site. A consult, when you want one, goes
          to {site.author}.
        </p>
        <p className="type-prose mt-3 text-muted-foreground">
          Written by {site.author} in {site.authorLocation}. Last reviewed{" "}
          {site.lastReviewedLabel}. If a figure is not cited, it is not on the
          page.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href="#cities"
            className="type-button inline-flex h-11 items-center justify-center rounded-lg bg-primary px-4 text-primary-foreground hover:bg-primary/90"
          >
            Browse Ohio cities
          </a>
          <Link
            href="/consult/"
            className="type-button inline-flex h-11 items-center justify-center rounded-lg border border-border bg-card px-4 hover:border-primary"
          >
            Book a consult
          </Link>
        </div>
        <p className="mt-4 flex flex-col gap-2 text-sm font-medium sm:flex-row sm:flex-wrap sm:gap-x-5">
          {anchors.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="underline underline-offset-2"
            >
              Solar in {item.label}, OH
            </Link>
          ))}
        </p>
      </section>

      <TrustStrip className="mt-10" />

      {cityRegionOrder.map((region) => {
        const live = citiesInRegion(region);
        const copy = cityRegionHeadings[region];
        return (
          <section
            key={region}
            id={region === "dayton" ? "cities" : `${region}-cities`}
            className="mt-14 scroll-mt-24"
          >
            <h2 className="type-h2">{copy.heading}</h2>
            <p className="mt-2 max-w-2xl text-base text-muted-foreground">
              {copy.intro}
            </p>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {live.map((city) => (
                <li
                  key={city.slug}
                  className="flex flex-col rounded-lg border border-border bg-card p-5"
                >
                  <h3 className="font-heading text-xl font-semibold">
                    <Link href={cityPath(city)} className="hover:underline">
                      {city.name}, {city.stateAbbr}
                    </Link>
                  </h3>
                  <p className="mt-2 line-clamp-3 flex-1 text-sm leading-6 text-muted-foreground">
                    {city.setting}
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    {services.map((service) => (
                      <li key={service.slug}>
                        <Link
                          href={servicePath(city, service)}
                          className="font-medium underline underline-offset-2"
                        >
                          Best {service.name} in {city.name} — {site.year}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3">
                    <Link
                      href={cityPath(city)}
                      className="text-sm hover:underline"
                    >
                      All {city.name} solar pages
                    </Link>
                  </p>
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      <section id="ownership" className="mt-14 scroll-mt-24">
        <h2 className="type-h2">How ownership works</h2>
        <p className="type-prose mt-3 text-muted-foreground">
          Before anyone talks price, ask who would own the equipment, what
          happens if you sell the house, and what is in writing. Those questions
          belong in the contract. This site does not publish dollar-per-watt
          figures, splits, or commissions. City pages use one national cited
          range and do not invent a local price.
        </p>
      </section>

      <NepqOpener />

      <section className="mt-14 rounded-[16px] border border-border bg-card px-5 py-8 shadow-[0_8px_24px_rgba(26,29,24,0.06)] sm:px-8">
        <h2 className="type-h2">A consult is optional</h2>
        <p className="type-prose mt-3 text-muted-foreground">
          If you live in a served market and want a conversation with{" "}
          {site.author} — not a marketplace of bids — you can book a consult.
          The city guides stay on the site either way.
        </p>
        <p className="mt-4">
          <Link
            href="/consult/"
            className="type-button inline-flex h-11 items-center rounded-lg bg-primary px-4 text-primary-foreground hover:bg-primary/90"
          >
            Book a consult
          </Link>
        </p>
      </section>

      <FaqList faqs={questions} />
    </div>
  );
}
