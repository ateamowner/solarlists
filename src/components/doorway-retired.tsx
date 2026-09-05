import Link from "next/link";

export function DoorwayRetired({
  cityName,
  serviceName,
  className = "",
}: {
  cityName: string;
  serviceName?: string;
  className?: string;
}) {
  return (
    <aside className={`rounded-xl border border-accent bg-accent/35 px-4 py-4 ${className}`}>
      <p className="text-sm font-semibold">This URL is no longer indexed.</p>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {serviceName
          ? `${serviceName} in ${cityName} was a leftover local page from an earlier version of this site.`
          : `${cityName} was a leftover local page from an earlier version of this site.`}{" "}
        SolarLists is now a national education site. These routes stay live so
        old links do not 404. They will be removed in a later pass — they are
        not redirected in Wave 1.
      </p>
      <p className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium">
        <Link href="/" className="underline underline-offset-2">
          Education home
        </Link>
        <Link href="/about/" className="underline underline-offset-2">
          About
        </Link>
        <Link href="/consult/" className="underline underline-offset-2">
          Book a consult
        </Link>
      </p>
    </aside>
  );
}
