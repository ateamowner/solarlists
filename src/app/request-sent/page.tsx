import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: `Request sent — ${site.name}`,
  robots: { index: false, follow: false },
};

export default function RequestSentPage() {
  return (
    <article className="mx-auto w-full max-w-xl px-4 py-16 sm:px-6">
      <h1 className="font-heading text-3xl font-semibold tracking-tight">
        Request noted.
      </h1>
      <p className="mt-4 leading-7 text-muted-foreground">
        The consult form is not posting yet. Destination placeholders are{" "}
        <span className="font-mono">{site.email}</span>
        {" / "}
        <span className="font-mono">{site.phone}</span>
        . When a real inbox exists, a successful send will land here.
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
