import { site } from "@/config/site";

export function TrustStrip({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <div className="home-soft-rule mb-6" aria-hidden="true" />
      <ul
        className="grid rounded-[16px] border border-border bg-card shadow-[0_8px_24px_rgba(26,29,24,0.06)] sm:grid-cols-3 sm:divide-x sm:divide-border"
        aria-label="How this site writes"
      >
        {site.trustStrip.map((item) => (
          <li
            key={item}
            className="home-trust-chip border-b border-border px-4 py-3 text-sm font-medium leading-6 last:border-b-0 sm:border-b-0"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ForProsBand() {
  if (!site.hasForPros) return null;
  return (
    <section className="mt-14 rounded-[16px] border border-border bg-card p-6">
      <h2 className="font-heading text-2xl font-semibold">For Pros</h2>
      <p className="mt-2 max-w-2xl text-base text-muted-foreground">
        This host does not sell contractor listings. The For Pros band stays
        off until a real For Pros page exists.
      </p>
    </section>
  );
}
