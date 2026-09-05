import { site } from "@/config/site";

/** Quiet IC / identity line. Use on About and footer — never as an H1. */
export function Disclosure({ className = "" }: { className?: string }) {
  return (
    <p className={`text-sm leading-6 text-muted-foreground ${className}`}>
      {site.disclosure}
    </p>
  );
}
