import type { Metadata } from "next";
import Link from "next/link";
import { PhoneLink } from "@/components/phone-link";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: `Request sent — ${site.name}`,
  robots: { index: false, follow: false },
};

export default function RequestSentPage() {
  return (
    <article className="mx-auto w-full max-w-xl px-4 py-16 sm:px-6">
      <h1 className="font-heading text-3xl font-semibold tracking-tight">
        Request sent.
      </h1>
      <p className="mt-4 leading-7 text-muted-foreground">
        Your consult request went to {site.author} at {site.email}. Expect a
        call, text, or email — not a utility callback and not a marketplace of
        other companies.
      </p>
      <p className="mt-6 leading-7">
        Prefer to talk now? Call or text{" "}
        <PhoneLink className="font-medium underline underline-offset-2" />.
      </p>
      <p className="mt-6">
        <Link href="/" className="underline underline-offset-2">
          Back to SolarLists
        </Link>
        {" · "}
        <Link href="/consult/" className="underline underline-offset-2">
          Consult form
        </Link>
      </p>
    </article>
  );
}
