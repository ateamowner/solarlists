import { QuoteForm } from "@/components/quote-form";
import type { City, Service } from "@/config/site";

export function QuoteFormLoader(props: {
  city?: City;
  service?: Service;
  compact?: boolean;
}) {
  return <QuoteForm {...props} />;
}
