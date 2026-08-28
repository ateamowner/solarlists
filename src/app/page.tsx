import type { Metadata } from "next";
import Link from "next/link";
import { QuoteFormLoader } from "@/components/quote-form-loader";
import { Disclosure } from "@/components/disclosure";
import {
  cities,
  getService,
  liveCitySlugs,
  servicePath,
  services,
  site,
} from "@/config/site";

export const metadata: Metadata = {
  title: `${site.name} — Dayton / Miami Valley solar`,
  description: site.description,
};

export default function HomePage() {
  const live = cities.filter((city) => liveCitySlugs.includes(city.slug));
  const tpo = getService("tpo-solar");

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div>
          <p className="text-sm font-medium text-primary">{site.tagline}</p>
          <h1 className="mt-2 font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Go solar in the Miami Valley without a huge loan.
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8">
            {site.name} is {site.operator}&apos;s residential solar quote site
            for Dayton and nearby cities. We now sell third-party ownership
            (TPO): $0 down, no large loan, and a written explanation of who
            owns the system. You can also request a standard purchase quote.
          </p>
          <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
            This is in-house lead gen for A Team Contracting — not a contractor
            marketplace and not a list of other solar companies. There is no
            For Pros page and no invented installer directory.
          </p>
          <Disclosure className="mt-3 max-w-2xl" />
          {tpo ? (
            <p className="mt-4">
              <Link
                href={servicePath("dayton-oh", tpo)}
                className="font-medium underline underline-offset-2"
              >
                Best TPO Solar in Dayton — {site.year}
              </Link>
            </p>
          ) : null}
        </div>
        <QuoteFormLoader />
      </section>

      <section id="cities" className="mt-14">
        <h2 className="font-heading text-2xl font-semibold">
          Dayton-area cities
        </h2>
        <p className="mt-2 max-w-2xl text-base text-muted-foreground">
          Each city hub links solar installation, TPO solar, and solar panels.
          Internal links are real pages so nothing 404s.
        </p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {live.map((city) => (
            <li
              key={city.slug}
              className="flex flex-col rounded-lg border border-border bg-card p-5"
            >
              <h3 className="font-heading text-xl font-semibold">
                {city.name}, {city.stateAbbr}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">
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
                <Link href={`/${city.slug}/`} className="text-sm hover:underline">
                  All {city.name} solar pages
                </Link>
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="font-heading text-2xl font-semibold">
          TPO first, purchase if you want to own it
        </h2>
        <ol className="mt-4 grid gap-3 md:grid-cols-2">
          {[
            "TPO / $0-down: a third party owns the system so you can go solar without a huge loan.",
            "Purchase: a standard quote if you want to own the array.",
            "Locked H1 on every city × service page: Best {Service} in {City} — 2026.",
            "National cost ranges only, cited. No invented city prices or star ratings.",
            "How to choose: roof condition, shading, bill, TPO vs buy, who owns the system, warranty.",
            "Five FAQs on every city and city × service page, matching FAQPage JSON-LD.",
          ].map((item) => (
            <li
              key={item}
              className="rounded-lg border border-border bg-card px-4 py-3 text-sm leading-6"
            >
              {item}
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="font-heading text-2xl font-semibold">What we quote</h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-3">
          {services.map((service) => (
            <li
              key={service.slug}
              className="rounded-lg border border-border bg-card p-4"
            >
              <span className="font-medium">{service.name}.</span>{" "}
              <span className="text-muted-foreground">{service.blurb}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
