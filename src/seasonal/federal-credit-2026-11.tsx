import type { City } from "@/config/site";
import type { Faq } from "@/lib/editorial";

/**
 * Federal tax credit status + winter planning block, drafted 2026-11-01 by
 * SEO & AEO Desk (seo-tracking/refresh/2026-11-01/01-solarlists-federal-credit-winter.md).
 * Federal facts only, so it fits any solar city page; only the city name and
 * utility change. Every line keeps the source link from the draft. No installer
 * is named and no price is quoted. The matching entries are on /sources/.
 */

const src = {
  irs: {
    label: "IRS, Residential Clean Energy Credit",
    href: "https://www.irs.gov/credits-deductions/residential-clean-energy-credit",
  },
  seiaGuide: {
    label: "SEIA, Guide for Residential Solar Installers (Jan 2026)",
    href: "https://seia.org/media/13667/guide-for-residential-solar-installers_jan-2026.pdf/",
  },
  notice: {
    label: "IRS Notice 2025-42",
    href: "https://www.irs.gov/pub/irs-drop/n-25-42.pdf",
  },
  usc48e: {
    label: "26 U.S.C. § 48E(e)(4)",
    href: "https://uscode.house.gov/us/usc/119-136/t26/s48E/",
  },
  seiaObbb: {
    label: "SEIA, Clean Energy Provisions in the “One Big Beautiful Bill” (July 2025)",
    href: "https://seia.org/media/12216/obbb-fact-sheet_july-2025.pdf/",
  },
} as const;

function Link({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      className="underline underline-offset-2"
      rel="noopener noreferrer"
      target="_blank"
    >
      {label}
    </a>
  );
}

function Source(props: { label: string; href: string }) {
  return (
    <cite className="not-italic">
      Source: <Link {...props} />.
    </cite>
  );
}

function billHistory(city: City): string {
  return city.utility === "AES Ohio"
    ? "your AES Ohio bill history"
    : "your electric bill history";
}

export function Section({ city }: { city: City }) {
  return (
    <section id="federal-tax-credit" className="mt-10">
      <h2 className="font-heading text-xl font-semibold sm:text-2xl">
        Federal solar tax credits in 2026–2027: what changed
      </h2>
      <p className="mt-3 text-base leading-7">
        <strong>Short answer:</strong> If you buy a solar system for your{" "}
        {city.name} home now, there is no federal residential solar tax credit
        for it. The 30% Residential Clean Energy Credit only covered systems
        placed in service through December 31, 2025. If you go with third-party
        ownership (TPO, a lease or power purchase agreement), the company that
        owns the system claims any federal credit, not you, and that credit now
        has deadlines.
      </p>

      <h3 className="mt-6 font-heading text-lg font-semibold">
        Buying the system (you own it)
      </h3>
      <p className="mt-2 text-base leading-7">
        The IRS says the Residential Clean Energy Credit equaled 30% of the cost
        of qualified clean energy property installed from 2022 through December
        31, 2025, and “is not available for any property placed in service
        after December 31, 2025.” <Source {...src.irs} />
      </p>
      <p className="mt-3 text-base leading-7">
        What that means for a purchase quote: ask for the price with no federal
        credit built in. If a quote shows a “30% tax credit” line for a system
        installed in 2026 or later, ask the seller to explain it in writing.
      </p>

      <h3 className="mt-6 font-heading text-lg font-semibold">
        TPO (lease or PPA: a company owns the system)
      </h3>
      <ul className="mt-2 list-disc space-y-2 pl-5 text-base leading-7">
        <li>
          Under TPO, the third-party owner of the system claims the tax
          benefits, which is how lease or PPA payments can be lower than they
          otherwise would be. <Source {...src.seiaGuide} />
        </li>
        <li>
          The 2025 tax law (Public Law 119-21, the “One Big Beautiful Bill Act”)
          ends the business clean electricity investment credit (section 48E)
          for solar facilities placed in service after December 31, 2027, unless
          construction began on or before July 4, 2026.{" "}
          <cite className="not-italic">
            Sources: <Link {...src.notice} /> · <Link {...src.usc48e} />.
          </cite>
        </li>
        <li>
          SEIA’s summary of the law says it did not ban third-party rented or
          leased solar systems. <Source {...src.seiaObbb} />
        </li>
      </ul>
      <p className="mt-3 text-base leading-7">
        Questions to ask a TPO provider, in writing:
      </p>
      <ol className="mt-2 list-decimal space-y-1 pl-5 text-base leading-7">
        <li>Does my monthly payment or per-kWh rate assume a federal tax credit?</li>
        <li>
          When will my system be placed in service, and is that before December
          31, 2027?
        </li>
        <li>
          If the credit is not available for my system, does my price change, or
          does the provider absorb it?
        </li>
        <li>
          Does the payment escalate each year, and by how much? (SEIA notes lease
          payments may escalate over time.)
        </li>
      </ol>

      <h3 className="mt-6 font-heading text-lg font-semibold">
        Winter is a planning season, not a dead season
      </h3>
      <p className="mt-2 text-base leading-7">
        Ohio net metering turns excess generation into a bill credit (see the
        PUCO and Ohio Adm. Code 4901:1-10-28 sources in the next section).
        Winter is when a professional solar consultant can look at your roof
        condition, shade from bare trees and {billHistory(city)} before a spring
        or summer install.
      </p>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        SolarLists is not a tax advisor. Ask a tax professional how any credit
        applies to you.
      </p>
    </section>
  );
}

export function faqs(city: City, base: Faq[]): Faq[] {
  const added: Faq = {
    question: `Is there still a federal tax credit for home solar in ${city.name}?`,
    answer:
      "Not for a system you buy and install now. The IRS says the 30% Residential Clean Energy Credit is not available for property placed in service after December 31, 2025. With third-party ownership (a lease or PPA), the company that owns the system may claim a business credit, but that credit ends for solar placed in service after December 31, 2027 unless construction began by July 4, 2026. Ask any provider in writing whether your price depends on it. Sources: IRS Residential Clean Energy Credit page; IRS Notice 2025-42.",
  };
  // Place it right after the existing cost question.
  const i = base.findIndex(
    (faq) => faq.question.startsWith("What does ") && faq.question.includes(" cost in ")
  );
  if (i < 0) return [...base, added];
  return [...base.slice(0, i + 1), added, ...base.slice(i + 1)];
}
