import type { Metadata } from "next";
import Link from "next/link";
import { ConsultForm } from "@/components/consult-form";
import { PhoneLink } from "@/components/phone-link";
import { consultMarketSentence, consultMarkets, site } from "@/config/site";

export const metadata: Metadata = {
  title: `Consult — ${site.name}`,
  description:
    "Book a consult with a professional solar consultant. For homeowners in served markets — not a quote marketplace and not a ZIP wizard.",
  alternates: { canonical: "/consult/" },
};

export default function ConsultPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,26rem)]">
        <article>
          <p className="text-sm font-medium text-primary">Optional next step</p>
          <h1 className="type-h1 mt-2">Book a consult</h1>
          <p className="mt-4 max-w-[36rem] leading-7">
            If you want a conversation — not three bids — {site.author} will
            talk through what you already know about the bill, the roof, and
            the questions you do not trust yet.
          </p>
          <p className="mt-3 max-w-[36rem] leading-7 text-muted-foreground">
            Consults are for homeowners in {consultMarketSentence()}. If you
            live in another state, the education on this site is still
            available; we do not book outside those markets.
          </p>
          <p className="mt-4 text-sm leading-6">
            Call or text <PhoneLink className="font-medium underline underline-offset-2" />
            {" · "}
            <a
              href={`mailto:${site.email}`}
              className="font-medium underline underline-offset-2"
            >
              {site.email}
            </a>
          </p>
          <ul className="mt-6 max-w-[36rem] columns-2 gap-x-6 text-sm leading-6 text-muted-foreground">
            {consultMarkets.map((market) => (
              <li key={market.abbr} className="break-inside-avoid">
                {market.abbr} — {market.name}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm">
            <Link href="/about/" className="underline underline-offset-2">
              Who you would be talking with
            </Link>
            {" · "}
            <Link href="/sources/" className="underline underline-offset-2">
              How we handle numbers
            </Link>
          </p>
        </article>
        <ConsultForm />
      </div>
    </div>
  );
}
