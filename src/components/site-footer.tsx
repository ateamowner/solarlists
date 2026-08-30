import Link from "next/link";
import {
  citiesInRegion,
  cityRegionHeadings,
  cityRegionOrder,
  servicePath,
  site,
} from "@/config/site";
import { Disclosure } from "@/components/disclosure";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-card">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-heading text-lg font-semibold">{site.name}</p>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            {site.tagline} Operated by {site.operator}.
          </p>
          <Disclosure className="mt-3" />
        </div>
        <div>
          <p className="text-sm font-semibold">Cities</p>
          {cityRegionOrder.map((region) => (
            <div key={region} className="mt-3">
              <p className="text-xs font-medium text-muted-foreground">
                {cityRegionHeadings[region].heading}
              </p>
              <ul className="mt-1 columns-2 gap-x-4 space-y-1 text-sm">
                {citiesInRegion(region).map((city) => (
                  <li key={city.slug} className="break-inside-avoid">
                    <Link
                      href={servicePath(city, "solar-installation")}
                      className="underline-offset-2 hover:underline"
                    >
                      {city.name}, {city.stateAbbr} solar
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div>
          <p className="text-sm font-semibold">Site</p>
          <ul className="mt-2 space-y-1 text-sm">
            <li>
              <Link href="/dayton-oh/tpo-solar/" className="hover:underline">
                TPO / $0-down solar
              </Link>
            </li>
            <li>
              <Link href="/privacy/" className="hover:underline">
                Privacy
              </Link>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:underline">
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border px-4 py-4 text-center text-xs text-muted-foreground">
        © {site.year} {site.legalName}. {site.disclosure}
      </div>
    </footer>
  );
}
