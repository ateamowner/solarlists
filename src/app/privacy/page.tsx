import type { Metadata } from "next";
import { PhoneLink } from "@/components/phone-link";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: `Privacy — ${site.name}`,
  description: `How ${site.name} handles consult-form data for ${site.author}.`,
  alternates: { canonical: "/privacy/" },
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="type-h1">Privacy</h1>
      <p className="mt-4 text-sm text-muted-foreground">
        Last reviewed {site.lastReviewedLabel}.
      </p>
      <p className="type-prose mt-4">
        {site.name} ({site.domain}) is an education site written by{" "}
        {site.author}. The consult form is a soft close for homeowners in
        served markets. Submissions post to Formsubmit, which emails{" "}
        <a href={`mailto:${site.email}`} className="underline underline-offset-2">
          {site.email}
        </a>
        .
      </p>

      <h2 className="type-h2 mt-8">What we collect</h2>
      <p className="type-prose mt-3">
        The consult form asks for name, one phone or email, ZIP, state, timing,
        and privacy consent. If you enter a phone number, SMS consent is
        optional. Optional fields sit behind More details: home ownership,
        monthly bill range, roof age and type, and a message.
      </p>

      <h2 className="type-h2 mt-8">How we use it</h2>
      <p className="type-prose mt-3">
        {site.author} uses the request to talk through your situation. That is
        not a marketplace handoff and not a lead sale to a list of other solar
        companies from this site.
      </p>

      <h2 className="type-h2 mt-8">What we do not do</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 leading-7">
        <li>We do not take card numbers on this site.</li>
        <li>We do not publish your request on a city page.</li>
        <li>We do not operate a marketplace of other solar installers.</li>
        <li>We do not publish dollar-per-watt figures, splits, or commissions.</li>
      </ul>

      <h2 className="type-h2 mt-8">Contact</h2>
      <p className="type-prose mt-3">
        Email{" "}
        <a href={`mailto:${site.email}`} className="underline underline-offset-2">
          {site.email}
        </a>
        . Call or text <PhoneLink className="underline underline-offset-2" />.
      </p>
    </article>
  );
}
