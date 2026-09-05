import type { Metadata } from "next";
import Link from "next/link";
import { primaryNav, site } from "@/config/site";

export const metadata: Metadata = {
  title: `Page not found | ${site.name}`,
};

export default function NotFound() {
  return (
    <article className="mx-auto w-full max-w-xl px-4 py-16 sm:px-6">
      <title>{`Page not found | ${site.name}`}</title>
      <p className="text-sm font-medium text-primary">404</p>
      <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight">
        That URL is not on SolarLists
      </h1>
      <p className="mt-4 leading-7 text-muted-foreground">
        {site.name} is a national education site. If you followed an old local
        link and it is gone, start from home.
      </p>
      <ul className="mt-6 space-y-2">
        {primaryNav.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="underline underline-offset-2">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}
