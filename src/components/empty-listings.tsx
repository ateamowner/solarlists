import type { City, Service } from "@/config/site";
import { site } from "@/config/site";

/** Consult reassurance under the H1. SolarLists has no installer listings by design. */
export const EMPTY_LISTINGS_COPY =
  "A local solar consultant reviews every request personally. No pressure, no obligation, and no credit card.";

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
      <p className="mt-1 text-[15px] leading-[24px]">
        Prefer to talk?{" "}
        <a href={`tel:${site.phoneTel}`} className="font-semibold underline">
          Call or text {site.phone}
        </a>
      </p>
    </div>
  );
}
