import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { DoorwayRetired } from "@/components/doorway-retired";
import { cities, cityPath, doorwayRobots, getCity, site } from "@/config/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return cities.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCity(citySlug);
  if (!city) return {};

  const title = `${city.name} archive — ${site.name}`;
  const description = `Legacy ${city.name} URL on ${site.name}. This page is noindexed. SolarLists is now a national education site.`;
  return {
    title,
    description,
    robots: doorwayRobots,
    alternates: { canonical: cityPath(city) },
  };
}

export default async function CityHubPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: citySlug } = await params;
  const city = getCity(citySlug);
  if (!city) notFound();

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: cityPath(city), label: `${city.name}, ${city.stateAbbr}` },
        ]}
      />
      <p className="mt-6 text-sm font-medium text-primary">Archived local URL</p>
      <h1 className="type-h1 mt-2">
        {city.name}, {city.stateAbbr}
      </h1>
      <p className="mt-4 leading-7 text-muted-foreground">
        This leftover city page is kept so old links do not 404. It is not a
        service-area claim and it is not the product.
      </p>
      <DoorwayRetired cityName={city.name} className="mt-6" />
    </article>
  );
}
