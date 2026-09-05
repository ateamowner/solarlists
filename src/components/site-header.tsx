import Link from "next/link";
import { HeaderQuoteCta } from "@/components/header-quote-cta";
import { PhoneLink } from "@/components/phone-link";
import { site } from "@/config/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="group min-w-0">
          <p className="font-heading text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            {site.name}
          </p>
          <p className="text-xs text-muted-foreground sm:text-sm">
            Dayton, Columbus, and Cincinnati solar
          </p>
        </Link>
        <nav
          aria-label="Primary"
          className="flex shrink-0 items-center gap-3 text-sm font-medium sm:gap-5"
        >
          <PhoneLink className="hidden hover:underline sm:inline" />
          <Link href="/#cities" className="hover:underline">
            Cities
          </Link>
          {site.hasForPros ? (
            <Link href="/for-pros/" className="hover:underline">
              For Pros
            </Link>
          ) : null}
          <HeaderQuoteCta />
        </nav>
      </div>
    </header>
  );
}
