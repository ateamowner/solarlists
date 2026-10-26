import Link from "next/link";
import { cityPath, type City } from "@/config/site";
import {
  localFacts,
  localFactsChecked,
  ohioNetMetering,
  ohioTaxExemption,
  sameOfficeCities,
  type SourceLink,
} from "@/lib/local-facts";

function Sources({ links }: { links: SourceLink[] }) {
  return (
    <p className="mt-2 text-xs text-muted-foreground">
      Sources:{" "}
      {links.map((link, i) => (
        <span key={link.url}>
          {i > 0 ? " · " : ""}
          <a href={link.url} className="underline underline-offset-2" rel="noopener" target="_blank">
            {link.label}
          </a>
        </span>
      ))}
    </p>
  );
}

export function LocalFactsBlock({ city }: { city: City }) {
  const facts = localFacts(city);
  if (!facts) return null;
  return (
    <section id="local-basics" className="mt-10 scroll-mt-24 rounded-lg border border-border bg-card p-5">
      <h2 className="type-h2">{`${city.name} solar basics: utility, net metering, permits, local costs`}</h2>
      <p className="mt-1 text-xs text-muted-foreground">{`Facts checked ${localFactsChecked} against the official pages linked below.`}</p>
      <h3 className="mt-4 font-heading text-lg font-semibold">Electric utility: {facts.utility}</h3>
      <p className="mt-1 text-sm leading-6">{facts.utilityNote}</p>
      <Sources links={facts.utilityLinks} />
      {facts.metering ? (
        <>
          <h3 className="mt-4 font-heading text-lg font-semibold">{facts.metering.heading}</h3>
          <p className="mt-1 text-sm leading-6">{facts.metering.note}</p>
          <Sources links={facts.metering.links} />
        </>
      ) : null}
      <h3 className="mt-4 font-heading text-lg font-semibold">
        {facts.metering ? "Ohio net metering rule (PUCO-regulated utilities)" : "Ohio net metering"}
      </h3>
      <p className="mt-1 text-sm leading-6">{ohioNetMetering.summary}</p>
      <Sources links={ohioNetMetering.links} />
      <h3 className="mt-4 font-heading text-lg font-semibold">Permit authority: {facts.permitAuthority}</h3>
      <p className="mt-1 text-sm leading-6">{facts.permitNote}</p>
      <Sources links={facts.permitLinks} />
      {sameOfficeCities(city).map((group) => (
        <p key={group.office} className="mt-2 text-sm leading-6">
          {`Other guides that use ${group.office}: `}
          {group.cities.map((other, i) => (
            <span key={other.slug}>
              {i > 0 ? ", " : ""}
              <Link href={cityPath(other)} className="underline underline-offset-2">
                {other.name}
              </Link>
            </span>
          ))}
          .
        </p>
      ))}
      <h3 className="mt-4 font-heading text-lg font-semibold">{`${city.name} permit costs and incentives`}</h3>
      {facts.costNote ? (
        <>
          <p className="mt-1 text-sm leading-6">{facts.costNote}</p>
          {facts.costLinks ? <Sources links={facts.costLinks} /> : null}
        </>
      ) : (
        <p className="mt-1 text-sm leading-6">
          {`We did not find a solar-specific permit fee or a local solar rebate on the official ${city.name} pages linked above, so we do not list one. Ask the permit office for the current fee before you sign.`}
        </p>
      )}
      <p className="mt-3 text-sm leading-6">{ohioTaxExemption.summary}</p>
      <Sources links={ohioTaxExemption.links} />
      <p className="mt-4 text-xs text-muted-foreground">
        Rules and forms change. Check the linked official pages before you rely on them.
      </p>
    </section>
  );
}
