"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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

const hideStickyOn = new Set([
  "/privacy",
  "/privacy/",
  "/request-sent",
  "/request-sent/",
]);

export function StickyMobileCallBar() {
  const pathname = usePathname();
  const [formMostlyVisible, setFormMostlyVisible] = useState(false);
  const onConsult = pathname === "/consult" || pathname === "/consult/";

  useEffect(() => {
    const form = document.getElementById("consult");
    if (!form) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setFormMostlyVisible(entry.intersectionRatio >= 0.4);
      },
      { threshold: [0, 0.4, 1] }
    );
    observer.observe(form);
    return () => observer.disconnect();
  }, [pathname]);

  if (hideStickyOn.has(pathname) || (onConsult && formMostlyVisible)) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 p-2 md:hidden">
      <Link
        href={onConsult ? "#consult" : "/consult/"}
        className="type-button flex h-11 items-center justify-center rounded-lg bg-primary text-primary-foreground"
        onClick={(event) => {
          if (!onConsult) return;
          const form = document.getElementById("consult");
          if (!form) return;
          event.preventDefault();
          form.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
      >
        Book a consult
      </Link>
      <a
        href={`tel:${site.phoneTel}`}
        className="mt-1 block text-center text-[13px] leading-5 text-muted-foreground underline underline-offset-2"
      >
        Call or text {site.phone}
      </a>
    </div>
  );
}
