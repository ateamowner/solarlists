import { federalCreditStatus } from "@/lib/federal-credit";

export function FederalCreditBlock({ cityName }: { cityName: string }) {
  const f = federalCreditStatus;
  return (
    <section id="tax-credit" className="mt-10 rounded-lg border border-border bg-card p-5">
      <h2 className="type-h2">{f.heading}</h2>
      <p className="mt-1 text-xs text-muted-foreground">Checked {f.checked}. Applies to {cityName} and every Ohio address.</p>
      <h3 className="mt-4 font-heading text-lg font-semibold">Buying the system</h3>
      <p className="mt-1 text-sm leading-6">{f.buy}</p>
      <h3 className="mt-4 font-heading text-lg font-semibold">TPO / $0-down</h3>
      <p className="mt-1 text-sm leading-6">{f.tpo}</p>
      <p className="mt-3 text-xs text-muted-foreground">
        Sources:{" "}
        {f.links.map((link, i) => (
          <span key={link.url}>
            {i > 0 ? " · " : ""}
            <a href={link.url} className="underline underline-offset-2" rel="noopener" target="_blank">
              {link.label}
            </a>
          </span>
        ))}
      </p>
      <p className="mt-2 text-xs text-muted-foreground">
        This is not tax advice. Ask a tax professional about your own return.
      </p>
    </section>
  );
}
