import type { City, Service } from "@/config/site";

/** Exact empty-listing copy from the SHIP #1 Site Design lock. */
export const EMPTY_LISTINGS_COPY =
  "No live listings on this URL yet. Use the form — we take the request and hold it. We do not invent companies.";

export function EmptyListingsNote({
  className = "",
}: {
  city: City;
  service?: Service;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[16px] border border-accent bg-accent/30 px-4 py-3 ${className}`}
    >
      <p className="text-[16px] leading-[26px]">{EMPTY_LISTINGS_COPY}</p>
    </div>
  );
}
