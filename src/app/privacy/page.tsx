import type { Metadata } from "next";
import { Disclosure } from "@/components/disclosure";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: `Privacy — ${site.name}`,
  description: `How ${site.name} collects solar quote-form data for ${site.operator}.`,
  alternates: { canonical: "/privacy/" },
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="font-heading text-4xl font-semibold tracking-tight">
        Privacy
      </h1>
      <p className="mt-4 text-sm text-muted-foreground">Effective {site.year}.</p>
      <Disclosure className="mt-4" />
      <p className="mt-4 leading-7">
        {site.name} ({site.domain}) is operated by {site.operator}. We collect
        information so we can follow up on a residential solar quote — TPO or
        purchase. We are not a utility and not a national marketplace.
      </p>

      <h2 className="mt-8 font-heading text-2xl font-semibold">What we collect</h2>
      <p className="mt-3 leading-7">
        From the quote form: phone, email, ZIP, service (TPO / buy / not sure),
        and timing are required, plus a required privacy consent. Optional
        fields sit behind More details: name, home ownership, monthly electric
        bill range, roof age and type, message, and SMS consent. Hidden fields may include
        page URL, city, city slug, state, service, source, gclid, utm_source,
        utm_medium, and utm_campaign.
      </p>

      <h2 className="mt-8 font-heading text-2xl font-semibold">How we use it</h2>
      <p className="mt-3 leading-7">
        The static form posts to Formsubmit, which emails{" "}
        <a href={`mailto:${site.leadsEmail}`} className="underline">
          {site.leadsEmail}
        </a>
        . {site.operator} uses the request to call or email you about a TPO or
        purchase quote. We do not sell listings to other solar companies from
        this site.
      </p>

      <h2 className="mt-8 font-heading text-2xl font-semibold">SMS</h2>
      <p className="mt-3 leading-7">
        SMS consent is optional. If you check it, {site.operator} may text you
        about that request. Consent is not a condition of submitting the form.
      </p>

      <h2 className="mt-8 font-heading text-2xl font-semibold">What we do not do</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 leading-7">
        <li>We do not take card numbers on this site.</li>
        <li>We do not sell a public people-search list of form submitters.</li>
        <li>We do not publish your request on a city page.</li>
        <li>We do not operate a marketplace of other solar installers.</li>
      </ul>

      <h2 className="mt-8 font-heading text-2xl font-semibold">Contact</h2>
      <p className="mt-3 leading-7">
        Questions:{" "}
        <a href={`mailto:${site.email}`} className="underline">
          {site.email}
        </a>
        .
      </p>
    </article>
  );
}
