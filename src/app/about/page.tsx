import type { Metadata } from "next";
import Link from "next/link";
import { Disclosure } from "@/components/disclosure";
import { JsonLd } from "@/components/json-ld";
import { consultMarketSentence, site } from "@/config/site";
import { personSchema, webSiteSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: `About — ${site.name}`,
  description: `Who writes ${site.name}: ${site.author} in ${site.authorLocation}. Education first, with a quiet independent-contractor disclosure.`,
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd data={[webSiteSchema(), personSchema()]} />
      <p className="text-sm font-medium text-primary">Author</p>
      <h1 className="type-h1 mt-2">About SolarLists</h1>
      <p className="mt-4 text-sm text-muted-foreground">
        Last reviewed {site.lastReviewedLabel}.
      </p>
      <p className="type-prose mt-6">
        {site.name} is a national education site for homeowners researching
        solar. {site.authorFormal} writes it from {site.authorLocation}. The aim is
        calmer questions and cited facts — not a quote marketplace and not a
        product pitch in the headline.
      </p>

      <h2 className="type-h2 mt-10">Who writes this</h2>
      <p className="type-prose mt-3">
        {site.authorFormal} writes SolarLists from {site.authorLocation} as
        an educator first: what to ask about the bill, the roof, and the
        contract before anyone signs.
      </p>

      <h2 className="type-h2 mt-10">Disclosure</h2>
      <Disclosure className="mt-3" />
      <p className="type-prose mt-3">
        When a consult happens, it is with {site.author} in an independent
        contractor capacity — a conversation about your situation, not a
        SunPower.com storefront and not a claim that this site is the
        manufacturer.
      </p>
      <p className="type-prose mt-3">
        A Team Contracting is a separate exterior-cleaning business. It is not
        this site, and it is not the product SolarLists sells. Older local URLs
        from an earlier version of the domain are kept so they do not 404; they
        are noindexed and will be removed later.
      </p>

      <h2 className="type-h2 mt-10">Editorial standards</h2>
      <p className="type-prose mt-3">
        Cite or omit. No invented savings, dollar-per-watt figures, splits,
        commissions, incentive dollar amounts, warranties, timelines, or traffic
        stats. Consults are for homeowners in {consultMarketSentence()}.
        Education stays available either way. The{" "}
        <Link href="/sources/" className="underline underline-offset-2">
          sources and editorial policy
        </Link>{" "}
        page lists how we handle numbers and when this site was last reviewed.
      </p>

      <p className="mt-10">
        <Link
          href="/consult/"
          className="type-button inline-flex h-11 items-center rounded-lg bg-primary px-4 text-primary-foreground hover:bg-primary/90"
        >
          Book a consult
        </Link>
      </p>
    </article>
  );
}
