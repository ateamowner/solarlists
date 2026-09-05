import type { Metadata } from "next";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: `Privacy — ${site.name}`,
  description: `How ${site.name} intends to handle consult-form data once a destination exists.`,
  alternates: { canonical: "/privacy/" },
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="font-heading text-4xl font-semibold tracking-tight">
        Privacy
      </h1>
      <p className="mt-4 text-sm text-muted-foreground">
        Last reviewed {site.lastReviewedLabel}.
      </p>
      <p className="mt-4 leading-7">
        {site.name} ({site.domain}) is an education site written by{" "}
        {site.author}. The consult form is a soft close for homeowners
        researching solar. Submit is disabled until a real destination exists.
        Placeholders: <span className="font-mono">{site.email}</span>
        {" / "}
        <span className="font-mono">{site.phone}</span>.
      </p>

      <h2 className="mt-8 font-heading text-2xl font-semibold">What we collect</h2>
      <p className="mt-3 leading-7">
        When routing is live, the consult form will ask for name, email, ZIP,
        and timing. Phone is optional. Optional notes may include bill or roof
        context. Privacy consent is required. We do not ask for a credit card
        on this site.
      </p>

      <h2 className="mt-8 font-heading text-2xl font-semibold">How we use it</h2>
      <p className="mt-3 leading-7">
        A submitted request would go to {site.author} so he can talk through
        your situation. That is not a marketplace handoff and not a lead sale
        to a list of other solar companies from this site. Until{" "}
        <span className="font-mono">{site.email}</span> is replaced with a real
        inbox, nothing is posted.
      </p>

      <h2 className="mt-8 font-heading text-2xl font-semibold">What we do not do</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 leading-7">
        <li>We do not take card numbers on this site.</li>
        <li>We do not publish your request on a city page.</li>
        <li>We do not operate a marketplace of other solar installers.</li>
        <li>We do not invent a phone number or inbox to make the form look live.</li>
      </ul>

      <h2 className="mt-8 font-heading text-2xl font-semibold">Contact</h2>
      <p className="mt-3 leading-7">
        Consult destination: <span className="font-mono">{site.email}</span>{" "}
        (placeholder).
      </p>
    </article>
  );
}
