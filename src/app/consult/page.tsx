import type { Metadata } from "next";
import Link from "next/link";
import { ConsultForm } from "@/components/consult-form";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { PhoneLink } from "@/components/phone-link";
import { consultMarkets, site } from "@/config/site";
import {
  consultAfterSteps,
  consultBringItems,
  consultFaqs,
  consultIsIsnt,
} from "@/lib/editorial";
import { faqPageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: `Consult — ${site.name}`,
  description:
    "What a SolarLists consult is and is not: a conversation with a professional solar consultant, not three bids and not a ZIP wizard. What to have ready, how eligibility works, and what happens after you request.",
  alternates: { canonical: "/consult/" },
};

export default function ConsultPage() {
  const questions = consultFaqs();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <JsonLd data={faqPageSchema(questions)} />

      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,26rem)]">
        <article className="min-w-0">
          <p className="text-sm font-medium text-primary">Optional next step</p>
          <h1 className="type-h1 mt-2">Book a consult</h1>
          <p className="type-prose mt-4">
            If you want a conversation — not three bids — {site.author} will
            talk through what you already know about the bill, the roof, and
            the questions you do not trust yet.
          </p>
          <p className="type-prose mt-3 text-muted-foreground">
            A consult is optional. Education on this site stays available
            whether you send the form or not.
          </p>
          <p className="mt-4 text-sm leading-6">
            Call or text{" "}
            <PhoneLink className="font-medium underline underline-offset-2" />
            {" · "}
            <a
              href={`mailto:${site.email}`}
              className="font-medium underline underline-offset-2"
            >
              {site.email}
            </a>
          </p>

          <h2 className="type-h2 mt-10">What a consult is — and is not</h2>
          <p className="type-prose mt-3 text-muted-foreground">
            The form on this page is a request for a conversation. It is not a
            quote mill and not a directory of contractors.
          </p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-3">
            {consultIsIsnt.map((item) => (
              <li
                key={item.title}
                className="rounded-[16px] border border-border bg-card p-4 shadow-[0_8px_24px_rgba(26,29,24,0.06)]"
              >
                <h3 className="font-heading text-lg font-semibold">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>

          <h2 className="type-h2 mt-10">What to have ready</h2>
          <p className="type-prose mt-3 text-muted-foreground">
            Nothing here is required to send the form. These are the notes that
            make the conversation calmer if you already have them.
          </p>
          <ul className="mt-5 space-y-3">
            {consultBringItems.map((item) => (
              <li
                key={item.title}
                className="rounded-[16px] border border-border bg-card px-5 py-4 shadow-[0_8px_24px_rgba(26,29,24,0.06)]"
              >
                <h3 className="font-heading text-lg font-semibold">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>

          <h2 className="type-h2 mt-10">Who a consult is for</h2>
          <p className="type-prose mt-3">
            Consults are for homeowners in served markets. ZIP is checked when
            you submit. If you live in another state, the education on this
            site is still available; we do not book outside those markets.
          </p>
          <details className="editorial-rule group mt-5">
            <summary className="flex cursor-pointer list-none items-start gap-3 px-4 py-4 [&::-webkit-details-marker]:hidden">
              <span
                aria-hidden="true"
                className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-foreground group-open:hidden"
              >
                +
              </span>
              <span
                aria-hidden="true"
                className="mt-0.5 hidden size-7 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-foreground group-open:inline-flex"
              >
                −
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-heading text-lg font-semibold leading-7">
                  Where we book
                </span>
                <span className="mt-1 block text-sm leading-6 text-muted-foreground">
                  Open the served-market list. Education stays available
                  everywhere.
                </span>
              </span>
            </summary>
            <ul className="columns-2 gap-x-6 border-t border-border px-4 py-4 text-sm leading-6 text-muted-foreground">
              {consultMarkets.map((market) => (
                <li key={market.abbr} className="break-inside-avoid">
                  {market.abbr} — {market.name}
                </li>
              ))}
            </ul>
          </details>
        </article>

        <div className="lg:sticky lg:top-24 lg:row-span-2">
          <ConsultForm />
        </div>

        <div className="min-w-0 space-y-10">
          <section>
            <h2 className="type-h2">After you submit</h2>
            <p className="type-prose mt-3 text-muted-foreground">
              A calm next step — not a clock we invented. The form is
              Situation, then Contact, then Timing. That order stays the same.
            </p>
            <ol className="mt-5 space-y-3">
              {consultAfterSteps.map((step, index) => (
                <li
                  key={step.title}
                  className="flex gap-3 rounded-[16px] border border-border bg-card p-4 shadow-[0_8px_24px_rgba(26,29,24,0.06)]"
                >
                  <span className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-foreground">
                    {index + 1}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-heading text-lg font-semibold">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="rounded-[16px] border border-border bg-card px-5 py-6 shadow-[0_8px_24px_rgba(26,29,24,0.06)]">
            <h2 className="type-h2">Still researching?</h2>
            <p className="type-prose mt-3 text-muted-foreground">
              Stay with the questions. A consult is optional; the education is
              the site.
            </p>
            <p className="mt-4 text-sm leading-6">
              <Link href="/#questions" className="underline underline-offset-2">
                Problem-finding questions
              </Link>
              {" · "}
              <Link href="/sources/" className="underline underline-offset-2">
                How we handle numbers
              </Link>
              {" · "}
              <Link href="/about/" className="underline underline-offset-2">
                Who you would be talking with
              </Link>
            </p>
          </section>

          <FaqList faqs={questions} />
        </div>
      </div>
    </div>
  );
}
