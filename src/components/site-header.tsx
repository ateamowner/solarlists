import Link from "next/link";
import { HeaderConsultCta } from "@/components/header-consult-cta";
import { primaryNav, site } from "@/config/site";

export function SiteHeader() {
  const links = primaryNav.filter((item) => item.href !== "/consult/");

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-x-3 gap-y-2 px-4 py-3 sm:px-6">
        <Link href="/" className="font-heading text-xl font-semibold tracking-tight sm:text-2xl">
          {site.name}
        </Link>
        <nav
          aria-label="Primary"
          className="flex flex-wrap items-center justify-end gap-x-3 gap-y-2 text-sm font-medium sm:gap-x-5"
        >
          {links.map((item) => (
            <Link key={item.href} href={item.href} className="hover:underline">
              {item.label}
            </Link>
          ))}
          <HeaderConsultCta />
        </nav>
      </div>
    </header>
  );
}
