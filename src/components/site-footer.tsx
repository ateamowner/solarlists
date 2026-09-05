import Link from "next/link";
import { primaryNav, site } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-card">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-heading text-lg font-semibold">{site.name}</p>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            {site.tagline}
          </p>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Written by {site.author} in {site.authorLocation}.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold">On this site</p>
          <ul className="mt-2 space-y-1 text-sm">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/privacy/" className="hover:underline">
                Privacy
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold">Consult</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Destination is not live. Placeholders:{" "}
            <span className="font-mono">{site.email}</span>
            {" / "}
            <span className="font-mono">{site.phone}</span>
            .
          </p>
        </div>
      </div>
      <div className="border-t border-border px-4 py-4 text-center text-xs leading-5 text-muted-foreground">
        © {site.year} {site.name}. {site.disclosure}
      </div>
    </footer>
  );
}
