import Link from "next/link";
import { PhoneLink } from "@/components/phone-link";
import { footerNav, site } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-[var(--footer-strip,#EFE8DA)]">
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
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold">Consult</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Call or text{" "}
            <PhoneLink className="underline underline-offset-2" />
            . Email{" "}
            <a
              href={`mailto:${site.email}`}
              className="underline underline-offset-2"
            >
              {site.email}
            </a>
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
