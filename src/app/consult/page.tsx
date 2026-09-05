import type { Metadata } from "next";
import Link from "next/link";
import { ConsultForm } from "@/components/consult-form";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: `Consult — ${site.name}`,
  description:
    "Talk through your situation with Anthony Leonard. A consult for homeowners researching solar — not a quote marketplace and not a ZIP wizard.",
  alternates: { canonical: "/consult/" },
};

export default function ConsultPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,26rem)]">
        <article>
          <p className="text-sm font-medium text-primary">Optional next step</p>
          <h1 className="type-h1 mt-2">Talk through your situation</h1>
          <p className="mt-4 max-w-2xl leading-7">
            If you are a homeowner researching solar and you want a conversation
            — not three bids — this form is the soft close. {site.author} will
            talk through what you already know about the bill, the roof, and
            the questions you do not trust yet.
          </p>
          <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
            This is not a “get 3 quotes” marketplace and not a ZIP wizard. We
            do not publish a service-area map. Eligibility copy stays generic
            until there is a real one.
          </p>
          <ul className="mt-6 space-y-2 text-sm leading-6 text-muted-foreground">
            <li>Name, a way to reach you, ZIP, and timing.</li>
            <li>Bill or roof notes are optional.</li>
            <li>
              Destination is not live:{" "}
              <span className="font-mono">{site.email}</span>
              {" / "}
              <span className="font-mono">{site.phone}</span>
              . Submit stays disabled until a real inbox exists.
            </li>
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
