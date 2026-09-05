"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function HeaderConsultCta() {
  const pathname = usePathname();
  const onConsult =
    pathname === "/consult" || pathname === "/consult/";

  return (
    <Link
      href={onConsult ? "#consult" : "/consult/"}
      className="type-button inline-flex h-10 items-center rounded-md bg-primary px-3 text-primary-foreground hover:bg-primary/90"
      onClick={(event) => {
        if (!onConsult) return;
        const form = document.getElementById("consult");
        if (!form) return;
        event.preventDefault();
        form.scrollIntoView({ behavior: "smooth", block: "start" });
      }}
    >
      Consult
    </Link>
  );
}
