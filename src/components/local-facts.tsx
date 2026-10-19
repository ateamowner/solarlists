import type { City } from "@/config/site";
import { localFacts, ohioNetMetering, type SourceLink } from "@/lib/local-facts";

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
    <section className="mt-10 rounded-lg border border-border bg-card p-5">
      <h2 className="type-h2">{`${city.name} solar basics: utility, net metering, permits`}</h2>
      <h3 className="mt-4 font-heading text-lg font-semibold">Electric utility: {facts.utility}</h3>
      <p className="mt-1 text-sm leading-6">{facts.utilityNote}</p>
      <Sources links={facts.utilityLinks} />
      <h3 className="mt-4 font-heading text-lg font-semibold">Ohio net metering</h3>
      <p className="mt-1 text-sm leading-6">{ohioNetMetering.summary}</p>
      <Sources links={ohioNetMetering.links} />
      <h3 className="mt-4 font-heading text-lg font-semibold">Permit authority: {facts.permitAuthority}</h3>
      <p className="mt-1 text-sm leading-6">{facts.permitNote}</p>
      <Sources links={facts.permitLinks} />
      <p className="mt-4 text-xs text-muted-foreground">
        Rules and forms change. Check the linked official pages before you rely on them.
      </p>
    </section>
  );
}
