import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  canonicalUrl,
  cities,
  cityPath,
  getCity,
  getService,
  services,
} from "@/config/site";

/**
 * Retired 2026-10-23: /<city>/<service>/ pages were near-duplicates of the city
 * guide (audit item f). Static export cannot send a 301, so each old URL is a
 * redirect stub: instant meta refresh + rel=canonical to the city guide, with
 * the matching section anchor. Stubs are not in the sitemap.
 */
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
  return {
    title: `Moved: ${service.name} in ${city.name}, ${city.stateAbbr}`,
    alternates: { canonical: cityPath(city) },
  };
}

export default async function RetiredServicePage({
  params,
}: {
  params: Promise<{ city: string; service: string }>;
}) {
  const { city: citySlug, service: serviceSlug } = await params;
  const city = getCity(citySlug);
  const service = getService(serviceSlug);
  if (!city || !service) notFound();

  const target = `${cityPath(city)}#${service.slug}`;
  const absolute = `${canonicalUrl(cityPath(city))}#${service.slug}`;

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <meta httpEquiv="refresh" content={`0; url=${absolute}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.location.replace(${JSON.stringify(target)});`,
        }}
      />
      <h1 className="type-h1">This guide moved</h1>
      <p className="mt-4 text-base leading-7">
        {`${service.name} in ${city.name} is now part of the full ${city.name} solar guide.`}{" "}
        <Link href={target} className="underline underline-offset-2">
          {`Open the ${city.name}, ${city.stateAbbr} solar guide`}
        </Link>
        .
      </p>
    </article>
  );
}
