"use client";

import { useEffect, useState } from "react";
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
  "/for-pros",
  "/for-pros/",
]);

export function StickyMobileCallBar() {
  const pathname = usePathname();
  const [formMostlyVisible, setFormMostlyVisible] = useState(false);

  useEffect(() => {
    const form = document.getElementById("quote");
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

  if (hideStickyOn.has(pathname) || formMostlyVisible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 p-2 md:hidden">
      <a
        href="#quote"
        className="type-button flex h-11 items-center justify-center rounded-lg bg-primary text-primary-foreground"
      >
        Get a quote
      </a>
    </div>
  );
}
