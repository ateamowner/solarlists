import { site } from "@/config/site";

export function TrustStrip({ className = "" }: { className?: string }) {
  return (
    <ul
      className={`grid gap-3 sm:grid-cols-3 ${className}`}
      aria-label="What this directory is"
    >
      {site.trustStrip.map((item) => (
        <li
          key={item}
          className="rounded-[16px] border border-border bg-card px-4 py-3 text-sm font-medium leading-6 shadow-[0_8px_24px_rgba(26,29,24,0.06)]"
        >
          {item}
        </li>
      ))}
    </ul>
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
