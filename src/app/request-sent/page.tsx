import type { Metadata } from "next";
import Link from "next/link";
import { Disclosure } from "@/components/disclosure";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: `Request sent — ${site.name}`,
  robots: { index: false, follow: false },
};

export default function RequestSentPage() {
  return (
    <article className="mx-auto w-full max-w-xl px-4 py-16 sm:px-6">
      <h1 className="font-heading text-3xl font-semibold tracking-tight">
        Request sent. A Team Contracting will follow up.
      </h1>
      <p className="mt-4 leading-7 text-muted-foreground">
        Your solar quote request went to {site.leadsEmail}. Expect a call or
        email about TPO / $0-down or a purchase path — not a utility callback
        and not a marketplace of other companies.
      </p>
      <Disclosure className="mt-4" />
      <p className="mt-6">
        <Link href="/" className="underline underline-offset-2">
          Back to SolarLists
        </Link>
      </p>
    </article>
  );
}
