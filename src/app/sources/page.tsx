import type { Metadata } from "next";
import Link from "next/link";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { consultMarketSentence, site } from "@/config/site";
import {
  editorialRules,
  editorialSources,
  neverClaimItems,
  sourcesChatBody,
  sourcesChatLead,
  sourcesFaqs,
} from "@/lib/editorial";
import { faqPageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: `Sources and editorial policy — ${site.name}`,
  description:
    "How SolarLists treats numbers for homeowners: cite or omit, last-reviewed dates, what we will never publish, and how Ask about solar inherits the same rules. No invented city prices.",
  alternates: { canonical: "/sources/" },
};

export default function SourcesPage() {
  const questions = sourcesFaqs();

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd data={faqPageSchema(questions)} />

      <p className="text-sm font-medium text-primary">Editorial</p>
      <h1 className="type-h1 mt-2">Sources and editorial policy</h1>
      <p className="type-prose mt-6">
        {site.name} would rather leave a blank than invent a figure. This page
        is the rule set for every other URL on the site — the articles, the
        chat, and the consult form.
      </p>
      <p className="type-prose mt-3 text-muted-foreground">
        If you are a homeowner, that is the whole thesis: a missing number is
        not a gap we forgot to fill. It is a number we refused to guess about
        your roof.
      </p>
      <p className="mt-5">
        <span className="inline-flex rounded-full border border-border bg-accent/40 px-3 py-1 text-[13px] leading-5">
          Last reviewed {site.lastReviewedLabel}
        </span>
      </p>

      <h2 className="type-h2 mt-12">How we handle numbers</h2>
      <p className="type-prose mt-3 text-muted-foreground">
        Open a rule. There is no score. These are the same checks we use before
        a sentence goes on the homepage or into Ask about solar.
      </p>
      <div className="mt-6 space-y-3">
        {editorialRules.map((rule, index) => (
          <details
            key={rule.id}
            className="editorial-rule group"
            open={index === 0}
          >
            <summary className="flex cursor-pointer list-none items-start gap-3 px-4 py-4 [&::-webkit-details-marker]:hidden">
              <span className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-foreground">
                {index + 1}
              </span>
              <span className="min-w-0 flex-1 font-heading text-lg font-semibold leading-7">
                {rule.title}
              </span>
              <span
                aria-hidden="true"
                className="text-muted-foreground group-open:hidden"
              >
                +
              </span>
              <span
                aria-hidden="true"
                className="hidden text-muted-foreground group-open:inline"
              >
                −
              </span>
            </summary>
            <p className="px-4 pb-4 pl-[3.75rem] text-sm leading-6 text-muted-foreground">
              {rule.body}
            </p>
          </details>
        ))}
      </div>

      <h2 className="type-h2 mt-12">What we will never claim</h2>
      <p className="type-prose mt-3 text-muted-foreground">
        A short red-flag list — not a scare page. If you see one of these
        somewhere else, treat it as a pitch until someone can show the source.
      </p>
      <ul className="mt-6 space-y-3">
        {neverClaimItems.map((item) => (
          <li
            key={item.title}
            className="clay-panel rounded-[16px] border px-5 py-4"
          >
            <h3 className="font-heading text-lg font-semibold">{item.title}</h3>
            <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
              {item.body}
            </p>
          </li>
        ))}
      </ul>

      <h2 className="type-h2 mt-12">Named source bookmarks</h2>
      <p className="type-prose mt-3 text-muted-foreground">
        These are bookmarks for later articles — not numbers on this page. We
        name the source and what we will not quote from it yet.
      </p>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {editorialSources.map((source) => (
          <li
            key={source.href}
            className="rounded-[16px] border border-border bg-card p-5 shadow-[0_8px_24px_rgba(26,29,24,0.06)]"
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

      <h2 className="type-h2 mt-12">How the chat uses Sources</h2>
      <div className="mt-4 rounded-[16px] border border-border bg-card p-5 shadow-[0_8px_24px_rgba(26,29,24,0.06)]">
        <p className="type-prose">{sourcesChatLead}</p>
        <p className="type-prose mt-3 text-muted-foreground">
          {sourcesChatBody}
        </p>
        <p className="mt-4 text-sm leading-6">
          Open{" "}
          <span className="font-medium">Ask about solar</span> on this page, or
          start with the{" "}
          <Link href="/#questions" className="underline underline-offset-2">
            problem-finding questions
          </Link>{" "}
          on the home page.
        </p>
      </div>

      <h2 className="type-h2 mt-12">Consult markets</h2>
      <p className="type-prose mt-3">
        Consults are limited to {consultMarketSentence()}. Education stays
        available if you live elsewhere. ZIP is checked on the{" "}
        <Link href="/consult/" className="underline underline-offset-2">
          consult form
        </Link>
        — not by a wizard that invents a price.
      </p>

      <h2 className="type-h2 mt-12">Corrections</h2>
      <p className="type-prose mt-3">
        If a page is wrong, email{" "}
        <a href={`mailto:${site.email}`} className="underline underline-offset-2">
          {site.email}
        </a>{" "}
        or use the{" "}
        <Link href="/consult/" className="underline underline-offset-2">
          consult form
        </Link>
        . We would rather correct a sentence than defend a figure we cannot
        source.
      </p>

      <FaqList faqs={questions} />

      <p className="mt-10 text-sm leading-6">
        <Link href="/about/" className="underline underline-offset-2">
          About the author
        </Link>
        {" · "}
        <Link href="/consult/" className="underline underline-offset-2">
          Book a consult
        </Link>
      </p>
    </article>
  );
}
