import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";
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
      <p className="mt-6 leading-7">
        {site.name} would rather leave a blank than invent a figure. This page
        is the rule set for every other URL on the site.
      </p>

      <h2 className="mt-10 font-heading text-2xl font-semibold">The rules</h2>
      <ul className="mt-4 space-y-4">
        {editorialRules.map((rule) => (
          <li
            key={rule.title}
            className="rounded-xl border border-border bg-card p-5"
          >
            <h3 className="font-heading text-xl font-semibold">{rule.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {rule.body}
            </p>
          </li>
        ))}
      </ul>

      <h2 className="mt-10 font-heading text-2xl font-semibold">
        Sources we may cite
      </h2>
      <p className="mt-3 leading-7 text-muted-foreground">
        Wave 1 does not put a dollar figure in the homepage hero. The citation
        below is the only national range this site is willing to mention, and
        only when a later page needs a labeled, published cluster.
      </p>
      <ul className="mt-4 space-y-4">
        {editorialSources.map((source) => (
          <li
            key={source.href}
            className="rounded-xl border border-border bg-card p-5"
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

      <h2 className="mt-10 font-heading text-2xl font-semibold">Corrections</h2>
      <p className="mt-3 leading-7">
        If a page is wrong, say so. Consult routing is not live (
        <span className="font-mono text-sm">{site.email}</span>
        ). Until that inbox exists, use the{" "}
        <Link href="/consult/" className="underline underline-offset-2">
          consult form
        </Link>{" "}
        note as a reminder that we will not invent a contact path.
      </p>
      <p className="mt-6">
        <Link href="/about/" className="underline underline-offset-2">
          About the author
        </Link>
      </p>
    </article>
  );
}
