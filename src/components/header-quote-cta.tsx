"use client";

import { usePathname } from "next/navigation";

export function HeaderQuoteCta() {
  const pathname = usePathname();
  const noForm = new Set(["/privacy", "/privacy/", "/request-sent", "/request-sent/"]);
  const onPageWithForm = !noForm.has(pathname);

  return (
    <a
      href={onPageWithForm ? "#quote" : "/#quote"}
      className="type-button inline-flex h-10 items-center rounded-md bg-primary px-3 text-primary-foreground hover:bg-primary/90"
      onClick={(event) => {
        if (!onPageWithForm) return;
        const form = document.getElementById("quote");
        if (!form) return;
        event.preventDefault();
        form.scrollIntoView({ behavior: "smooth", block: "start" });
      }}
    >
      Get a quote
    </a>
  );
}
