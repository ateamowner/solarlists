import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { DoorwayRetired } from "@/components/doorway-retired";
import {
  cities,
  cityPath,
  doorwayRobots,
  getCity,
  getService,
  servicePath,
  services,
  site,
} from "@/config/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return cities.flatMap((city) =>
    services.map((service) => ({
      city: city.slug,
      service: service.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string; service: string }>;
}): Promise<Metadata> {
  const { city: citySlug, service: serviceSlug } = await params;
  const city = getCity(citySlug);
  const service = getService(serviceSlug);
  if (!city || !service) return {};

  const title = `${service.name} in ${city.name} (archive) — ${site.name}`;
  const description = `Legacy ${service.name} URL for ${city.name} on ${site.name}. This page is noindexed. SolarLists is now a national education site.`;
  return {
    title,
    description,
    robots: doorwayRobots,
    alternates: { canonical: servicePath(city, service) },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ city: string; service: string }>;
}) {
  const { city: citySlug, service: serviceSlug } = await params;
  const city = getCity(citySlug);
  const service = getService(serviceSlug);
  if (!city || !service) notFound();

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: cityPath(city), label: `${city.name}, ${city.stateAbbr}` },
          { href: servicePath(city, service), label: service.name },
        ]}
      />
      <p className="mt-6 text-sm font-medium text-primary">Archived local URL</p>
      <h1 className="type-h1 mt-2">
        {service.name} — {city.name}
      </h1>
      <p className="mt-4 leading-7 text-muted-foreground">
        This leftover city × service page is kept so old links do not 404. It
        is not a “best of” listing and it is not redirected in this release.
      </p>
      <DoorwayRetired
        cityName={city.name}
        serviceName={service.name}
        className="mt-6"
      />
    </article>
  );
}
