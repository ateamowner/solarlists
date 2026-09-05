import type { Metadata } from "next";
import Link from "next/link";
import { consultMarketSentence, site } from "@/config/site";
import { editorialRules, editorialSources } from "@/lib/editorial";

export const metadata: Metadata = {
  title: `Sources and editorial policy — ${site.name}`,
  description: `How ${site.name} cites numbers, what we omit, and when pages were last reviewed. Cite or omit — no unsourced urgency stats.`,
  alternates: { canonical: "/sources/" },
};

export default function SourcesPage() {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <p className="text-sm font-medium text-primary">Editorial</p>
      <h1 className="type-h1 mt-2">Sources and editorial policy</h1>
      <p className="mt-4 text-sm text-muted-foreground">
        Last reviewed {site.lastReviewedLabel}.
      </p>
      <p className="type-prose mt-6">
        {site.name} would rather leave a blank than invent a figure. This page
        is the rule set for every other URL on the site.
      </p>

      <h2 className="type-h2 mt-10">The rules</h2>
      <ul className="mt-4 space-y-4">
        {editorialRules.map((rule) => (
          <li
            key={rule.title}
            className="rounded-2xl border border-border bg-card p-5 shadow-[0_8px_24px_rgba(26,29,24,0.06)]"
          >
            <h3 className="font-heading text-xl font-semibold">{rule.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {rule.body}
            </p>
          </li>
        ))}
      </ul>

      <h2 className="type-h2 mt-10">Sources we may cite later</h2>
      <p className="type-prose mt-3 text-muted-foreground">
        Wave 1 does not publish a dollar-per-watt figure, splits, or
        commissions. Named sources below are bookmarks for later articles — not
        numbers on this page.
      </p>
      <ul className="mt-4 space-y-4">
        {editorialSources.map((source) => (
          <li
            key={source.href}
            className="rounded-2xl border border-border bg-card p-5 shadow-[0_8px_24px_rgba(26,29,24,0.06)]"
          >
            <a
              href={source.href}
              className="font-medium underline underline-offset-2"
              rel="noopener noreferrer"
              target="_blank"
            >
              {source.name}
            </a>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {source.usedFor}
            </p>
          </li>
        ))}
      </ul>

      <h2 className="type-h2 mt-10">Consult markets</h2>
      <p className="type-prose mt-3">
        Consults are limited to {consultMarketSentence()}. Education stays
        available if you live elsewhere.
      </p>

      <h2 className="type-h2 mt-10">Corrections</h2>
      <p className="type-prose mt-3">
        If a page is wrong, email{" "}
        <a href={`mailto:${site.email}`} className="underline underline-offset-2">
          {site.email}
        </a>{" "}
        or use the{" "}
        <Link href="/consult/" className="underline underline-offset-2">
          consult form
        </Link>
        .
      </p>
      <p className="mt-6">
        <Link href="/about/" className="underline underline-offset-2">
          About the author
        </Link>
      </p>
    </article>
  );
}
