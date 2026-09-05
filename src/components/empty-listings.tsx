import { site, type City, type Service } from "@/config/site";

export function EmptyListingsNote({
  city,
  service,
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
      <p className="font-medium">No installer listings on this page</p>
      <p className="mt-1 text-sm leading-6 text-muted-foreground">
        {site.name} does not publish other solar companies
        {service ? ` for ${service.name.toLowerCase()}` : ""} in {city.name}.
        There is no Featured buy path. Request a quote — {site.operator} follows
        up in-house.
      </p>
    </div>
  );
}
