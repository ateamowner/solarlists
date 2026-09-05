import type { Metadata } from "next";
import Link from "next/link";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { NepqOpener } from "@/components/nepq-opener";
import { TrustStrip } from "@/components/trust-strip";
import { site } from "@/config/site";
import { homeFaqs } from "@/lib/editorial";
import { faqPageSchema, personSchema, webSiteSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: `${site.name} — solar education for homeowners`,
  description: site.description,
  alternates: { canonical: "https://solarlists.com/" },
  openGraph: {
    description: site.description,
  },
  twitter: {
    description: site.description,
  },
};

const promises = [
  {
    title: "Name the problem",
    body: "A bill, a roof, or a pitch you already heard are different starting points. We begin there.",
  },
  {
    title: "Separate claims from facts",
    body: "If a number is not cited, we omit it. No invented savings, incentives, or award headlines.",
  },
  {
    title: "Decide if a consult is useful",
    body: "The form is optional and secondary. Education comes first. A consult is a conversation, not a marketplace of bids.",
  },
] as const;

export default function HomePage() {
  const questions = homeFaqs();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <JsonLd data={[webSiteSchema(), personSchema(), faqPageSchema(questions)]} />

      <section className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,22rem)]">
        <div>
          <p className="text-sm font-medium text-primary">{site.tagline}</p>
          <h1 className="type-h1 mt-2">
            Understand solar before you sign anything.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7">
            {site.name} is a national education site for homeowners researching
            solar. We start with the questions that find the problem — not a
            quote form, and not a list of installers.
          </p>
          <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
            Written by {site.author}. Last reviewed {site.lastReviewedLabel}.
            If a figure is not cited, it is not on the page.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="#questions"
              className="type-button inline-flex h-11 items-center justify-center rounded-lg border border-border bg-card px-4 hover:border-primary"
            >
              Sit with the questions
            </a>
            <Link
              href="/consult/"
              className="type-button inline-flex h-11 items-center justify-center rounded-lg bg-primary px-4 text-primary-foreground hover:bg-primary/90"
            >
              Talk through your situation
            </Link>
          </div>
        </div>
        <aside className="rounded-2xl border border-border bg-card p-5 shadow-[0_16px_40px_rgba(26,29,24,0.08)]">
          <p className="text-sm font-semibold">What you will not find here</p>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
            <li>A $0-down product pitch as the homepage.</li>
            <li>Award-style “best in {site.year}” headlines.</li>
            <li>Star ratings, fake reviews, or an installer directory.</li>
            <li>A ZIP wizard that promises three quotes.</li>
          </ul>
          <p className="mt-4 text-sm leading-6">
            <Link href="/about/" className="font-medium underline underline-offset-2">
              Who writes this
            </Link>
            {" · "}
            <Link href="/sources/" className="font-medium underline underline-offset-2">
              How we cite
            </Link>
          </p>
        </aside>
      </section>

      <TrustStrip className="mt-10" />

      <section className="mt-14">
        <h2 className="font-heading text-2xl font-semibold">
          What this site is for
        </h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {promises.map((item) => (
            <li
              key={item.title}
              className="rounded-xl border border-border bg-card p-5"
            >
              <h3 className="font-heading text-xl font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <NepqOpener />

      <section className="mt-14 rounded-2xl border border-border bg-card px-5 py-8 sm:px-8">
        <h2 className="font-heading text-2xl font-semibold">
          A consult is optional
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
          If you want to talk through your situation — as a homeowner
          researching solar — you can request a consult. That is a conversation
          with {site.author}, not a marketplace and not a contractor lead form
          as the product.
        </p>
        <p className="mt-4">
          <Link
            href="/consult/"
            className="type-button inline-flex h-11 items-center rounded-lg bg-primary px-4 text-primary-foreground hover:bg-primary/90"
          >
            Request a consult
          </Link>
        </p>
      </section>

      <FaqList faqs={questions} />
    </div>
  );
}
