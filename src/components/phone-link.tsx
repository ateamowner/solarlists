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

export function StickyMobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 p-2 md:hidden">
      <PhoneLink className="flex h-11 w-full items-center justify-center rounded-lg bg-primary text-base font-medium text-primary-foreground">
        Call {site.phone}
      </PhoneLink>
    </div>
  );
}
