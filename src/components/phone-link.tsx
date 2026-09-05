"use client";

import { usePathname } from "next/navigation";
import { site } from "@/config/site";

export function PhoneLink({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <a href={`tel:${site.phoneTel}`} className={className}>
      {children ?? site.phone}
    </a>
  );
}

function quoteHref(pathname: string) {
  const noForm = new Set([
    "/privacy",
    "/privacy/",
    "/request-sent",
    "/request-sent/",
  ]);
  return noForm.has(pathname) ? "/#quote" : "#quote";
}

export function StickyMobileCallBar() {
  const pathname = usePathname();

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 p-2 md:hidden">
      <div className="grid grid-cols-2 gap-2">
        <a
          href={quoteHref(pathname)}
          className="flex h-11 items-center justify-center rounded-lg bg-primary text-sm font-medium text-primary-foreground"
        >
          Get a quote
        </a>
        <PhoneLink className="flex h-11 items-center justify-center rounded-lg border border-border bg-card text-sm font-medium">
          Call {site.phone}
        </PhoneLink>
      </div>
    </div>
  );
}
