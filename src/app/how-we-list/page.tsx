import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { PhoneLink } from "@/components/phone-link";
import { canonicalUrl, site } from "@/config/site";
import { breadcrumbSchema } from "@/lib/schema";
import { shareMeta } from "@/lib/share-meta";

const PATH = "/how-we-list/";
const title = `How ${site.name} Works`;
const description =
  `${site.name} publishes Ohio homeowner solar guides for Dayton, Columbus, Cincinnati and nearby cities. Consult requests go to the consultant directly and are not sold to installers.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: PATH },
  ...shareMeta(title, description, PATH),
};

export default function HowWeListPage() {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: title,
            description,
            url: canonicalUrl(PATH),
            publisher: { "@id": "https://solarlists.com/#website" },
            author: { "@id": "https://solarlists.com/#author" },
          },
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "How SolarLists works", path: PATH },
          ]),
        ]}
      />
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: PATH, label: "How SolarLists works" },
        ]}
      />
      <h1 className="type-h1 mt-4">How SolarLists works</h1>
      <p className="type-prose mt-6">
        SolarLists publishes Ohio homeowner solar guides for Dayton, Columbus,
        Cincinnati and nearby cities. It is written by a professional solar
        consultant based in Tipp City, Ohio.
      </p>

      <h2 className="type-h2 mt-10">What we publish</h2>
      <p className="type-prose mt-3">
        Plain-language guides on buying a system vs third-party ownership
        (TPO / $0 down), utility net metering (AES Ohio, Duke Energy Ohio, AEP
        Ohio) and roof and shade checks, with sources listed on{" "}
        <Link href="/sources/" className="underline underline-offset-2">
          /sources/
        </Link>
        .
      </p>

      <h2 className="type-h2 mt-10">What happens when you ask for help</h2>
      <p className="type-prose mt-3">
        Your consult request goes to the consultant directly (call or text{" "}
        <PhoneLink className="underline underline-offset-2" />). It is not sold
        to installers or shared with a lead marketplace.
      </p>

      <h2 className="type-h2 mt-10">What we won&apos;t do</h2>
      <p className="type-prose mt-3">
        Invent installer names, savings figures or prices. We don&apos;t rank
        installers.
      </p>

      <h2 className="type-h2 mt-10">Not the same site as SolarList.io</h2>
      <p className="type-prose mt-3">
        SolarLists.com (with an &quot;s&quot;) is a separate, Ohio-only guide
        site and isn&apos;t affiliated with SolarList.io or other solar quote
        marketplaces.
      </p>
    </article>
  );
}
