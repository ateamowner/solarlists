import Link from "next/link";
import {
  cityPath,
  cityRegionHeadings,
  citiesInRegion,
  getCity,
  getNearbyCities,
  guideLabel,
  servicePath,
  services,
  type City,
  type Service,
} from "@/config/site";

export function NearbyCityLinks({
  city,
  serviceSlug = "solar-installation",
}: {
  city: City;
  serviceSlug?: string;
}) {
  const nearby = getNearbyCities(city);
  if (nearby.length === 0) return null;

  const service = services.find((item) => item.slug === serviceSlug);

  return (
    <section className="mt-10">
      <h2 className="font-heading text-xl font-semibold">Nearby cities</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Each link is a real page with its own quote form.
      </p>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {nearby.map((item) => (
          <li key={item.slug}>
            <Link
              href={servicePath(item, serviceSlug)}
              className="inline-flex min-h-10 items-center underline-offset-2 hover:underline"
            >
              {service
                ? guideLabel(service, item)
                : `${item.name}, ${item.stateAbbr}`}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function RelatedServiceLinks({
  city,
  current,
}: {
  city: City;
  current?: Service;
}) {
  const related = services.filter((service) => service.slug !== current?.slug);

  return (
    <section className="mt-10">
      <h2 className="font-heading text-xl font-semibold">
        Related services in {city.name}
      </h2>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {related.map((service) => (
          <li key={service.slug}>
            <Link
              href={servicePath(city, service)}
              className="inline-flex min-h-10 items-center underline-offset-2 hover:underline"
            >
              {guideLabel(service, city)}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function NearbyCityHubs({ city }: { city: City }) {
  const nearby = getNearbyCities(city);
  if (nearby.length === 0) return null;
  return (
    <section className="mt-10">
      <h2 className="font-heading text-xl font-semibold">Nearby cities</h2>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {nearby.map((item) => (
          <li key={item.slug}>
            <Link href={cityPath(item)} className="inline-flex min-h-10 items-center underline-offset-2 hover:underline">
              Solar in {item.name}, {item.stateAbbr}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function RegionHubLinks({ city }: { city: City }) {
  const region = cityRegionHeadings[city.region];
  const peers = citiesInRegion(city.region).filter((item) => item.slug !== city.slug);
  if (peers.length === 0) return null;
  return (
    <section className="mt-10">
      <h2 className="font-heading text-xl font-semibold">{region.heading}</h2>
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
        {peers.map((item) => (
          <li key={item.slug}>
            <Link href={cityPath(item)} className="underline underline-offset-2">
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

const topHubSlugs = ["dayton-oh", "columbus-oh", "cincinnati-oh", "vandalia-oh", "beavercreek-oh", "centerville-oh"];

export function TopCityHubs() {
  const hubs = topHubSlugs.map((slug) => getCity(slug)).filter((item): item is City => Boolean(item));
  return (
    <section className="mt-12">
      <h2 className="type-h2">Ohio city guides</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Local utility, net-metering, and permit basics with links to official sources.
      </p>
      <ul className="mt-3 grid gap-2 sm:grid-cols-3">
        {hubs.map((item) => (
          <li key={item.slug}>
            <Link href={cityPath(item)} className="inline-flex min-h-10 items-center underline underline-offset-2">
              Solar in {item.name}, {item.stateAbbr}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
