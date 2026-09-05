import Link from "next/link";
import { HeaderConsultCta } from "@/components/header-consult-cta";
import { primaryNav, site } from "@/config/site";

export function SiteHeader() {
  const links = primaryNav.filter((item) => item.href !== "/consult/");

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link href="/" className="group min-w-0">
          <p className="font-heading text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            {site.name}
          </p>
          <p className="truncate text-xs text-muted-foreground sm:text-sm">
            Solar education
          </p>
        </Link>
        <nav
          aria-label="Primary"
          className="flex shrink-0 items-center gap-3 text-sm font-medium sm:gap-5"
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
