/**
 * SolarLists site config — brand, domain, inbox, cities, and services.
 * Theme tokens live here so a rebrand is one file.
 */

export const site = {
  name: "SolarLists",
  legalName: "A Team Contracting",
  operator: "A Team Contracting",
  domain: "solarlists.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://solarlists.com",
  email: "owner@ateamcontractings.com",
  leadsEmail: "owner@ateamcontractings.com",
  /** Native HTML POST to Formsubmit. No fetch/XHR, no API key. */
  formAction: "https://formsubmit.co/owner@ateamcontractings.com",
  formRedirect: "https://solarlists.com/request-sent/",
  tagline: "Residential solar in the Dayton / Miami Valley. TPO or purchase.",
  year: 2026,
  description:
    "SolarLists collects residential solar quote requests for A Team Contracting in the Dayton / Miami Valley. Third-party ownership (TPO) and purchase quotes. We are not a utility or a national marketplace.",
  disclosure:
    "This site collects solar quote requests for A Team Contracting. We are not a utility or a national marketplace.",
  theme: {
    background: "#f6f1e6",
    foreground: "#1a1d18",
    card: "#fffdf8",
    primary: "#8a4b12",
    primaryForeground: "#fff8ec",
    muted: "#ebe3d2",
    mutedForeground: "#4a463c",
    accent: "#f3d27a",
    accentForeground: "#3d2e0a",
    border: "#cfc3aa",
    ring: "#8a4b12",
  },
} as const;

export type CityStatus = "live" | "coming_soon";

export type City = {
  slug: string;
  name: string;
  state: string;
  stateAbbr: string;
  status: CityStatus;
  nearbySlugs: string[];
  parentSlug?: string;
  /** Public geographic context used in hub copy. Not pricing. */
  setting: string;
  utility: string;
  roofs: string;
  housing: string;
  winter: string;
  localNote: string;
};

export type Service = {
  slug: string;
  name: string;
  formValue: string;
  blurb: string;
};

export const services: Service[] = [
  {
    slug: "solar-installation",
    name: "Solar Installation",
    formValue: "buy",
    blurb:
      "A purchase-path install: roof review, design, interconnection, and a written quote to own the system.",
  },
  {
    slug: "tpo-solar",
    name: "TPO Solar",
    formValue: "tpo",
    blurb:
      "Third-party ownership so you can go solar with $0 down and without a large loan. The TPO provider owns the system.",
  },
  {
    slug: "solar-panels",
    name: "Solar Panels",
    formValue: "not_sure",
    blurb:
      "Panel layout for your roof: shade, pitch, remaining shingle life, and winter production — not a brand catalog.",
  },
];

export const formBillRanges = [
  { value: "under_75", label: "Under $75 / month" },
  { value: "75_125", label: "$75–$125 / month" },
  { value: "125_200", label: "$125–$200 / month" },
  { value: "200_300", label: "$200–$300 / month" },
  { value: "300_plus", label: "$300+ / month" },
] as const;

export const formTimings = [
  { value: "this_month", label: "This month" },
  { value: "this_quarter", label: "This quarter" },
  { value: "this_year", label: "This year" },
  { value: "researching", label: "Just researching" },
] as const;

export const formInterest = [
  { value: "tpo", label: "TPO / $0 down (no huge loan)" },
  { value: "buy", label: "Buy the system" },
  { value: "not_sure", label: "Not sure yet" },
] as const;

export const formOwnHome = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
] as const;

export const formRoofTypes = [
  { value: "", label: "Not sure / skip" },
  { value: "asphalt", label: "Asphalt shingle" },
  { value: "architectural", label: "Architectural shingle" },
  { value: "metal", label: "Metal" },
  { value: "slate", label: "Slate" },
  { value: "tile", label: "Tile" },
  { value: "flat", label: "Flat / low-slope" },
  { value: "other", label: "Other" },
] as const;

export const formRoofAges = [
  { value: "", label: "Not sure / skip" },
  { value: "0_5", label: "0–5 years" },
  { value: "6_10", label: "6–10 years" },
  { value: "11_15", label: "11–15 years" },
  { value: "16_20", label: "16–20 years" },
  { value: "20_plus", label: "20+ years" },
] as const;

export const cities: City[] = [
  {
    slug: "dayton-oh",
    name: "Dayton",
    state: "Ohio",
    stateAbbr: "OH",
    status: "live",
    nearbySlugs: [
      "kettering-oh",
      "beavercreek-oh",
      "centerville-oh",
      "huber-heights-oh",
      "fairborn-oh",
    ],
    setting:
      "Dayton sits in the Miami Valley with older city lots, street trees, and a mix of bungalows, two-stories, and mid-century houses. AES Ohio is the usual electric utility on the bill.",
    utility: "AES Ohio",
    roofs:
      "Mostly asphalt shingles; some historic blocks still carry slate or tile that need a different conversation than a standard rack.",
    housing:
      "Victorian, Craftsman, and 1940s–60s bungalows on tighter lots than the suburbs.",
    winter:
      "Ice storms and freeze–thaw cycles wear flashing and shingles; snow sitting on a low plane changes winter production.",
    localNote:
      "Oregon District, St. Anne’s Hill, and other older streets add shade and access constraints that a new subdivision does not have.",
  },
  {
    slug: "kettering-oh",
    name: "Kettering",
    state: "Ohio",
    stateAbbr: "OH",
    status: "live",
    nearbySlugs: [
      "dayton-oh",
      "centerville-oh",
      "beavercreek-oh",
      "miamisburg-oh",
      "xenia-oh",
    ],
    setting:
      "Kettering is a southern Dayton suburb of post-war streets, ranches, and split-levels. AES Ohio serves most homes.",
    utility: "AES Ohio",
    roofs:
      "Long asphalt-shingle planes on ranches; some split-levels add a second, smaller roof face.",
    housing:
      "1950s–70s ranches and split-levels with mature maples and oaks along the parkway streets.",
    winter:
      "Ice dams show up on lower-pitch ranches when attic ventilation is weak and gutters ice over.",
    localNote:
      "Leaf-out on older shade trees can hide a south roof that looked open in February.",
  },
  {
    slug: "beavercreek-oh",
    name: "Beavercreek",
    state: "Ohio",
    stateAbbr: "OH",
    status: "live",
    nearbySlugs: [
      "dayton-oh",
      "kettering-oh",
      "fairborn-oh",
      "xenia-oh",
      "centerville-oh",
    ],
    setting:
      "Beavercreek sits east of Dayton near Wright-Patterson Air Force Base, with later subdivisions and wider lots than the city core. AES Ohio is the typical utility.",
    utility: "AES Ohio",
    roofs:
      "Architectural shingles on 1960s–2000s houses; fewer slate roofs than Dayton’s historic districts.",
    housing:
      "Subdivision colonials and two-stories, plus some older farmhouse leftovers on the edges.",
    winter:
      "Open lots catch more wind-driven ice than a tree-lined Dayton street; snow clears faster on steeper planes.",
    localNote:
      "HOA architectural rules come up more often here than in the city. Confirm the bill is AES Ohio before we talk interconnection.",
  },
  {
    slug: "centerville-oh",
    name: "Centerville",
    state: "Ohio",
    stateAbbr: "OH",
    status: "live",
    nearbySlugs: [
      "dayton-oh",
      "kettering-oh",
      "miamisburg-oh",
      "beavercreek-oh",
      "xenia-oh",
    ],
    setting:
      "Centerville mixes a historic downtown with 1970s–90s colonials in and around Washington Township. AES Ohio is the usual electric utility.",
    utility: "AES Ohio",
    roofs:
      "Multi-facet colonial roofs and some older downtown pitches; asphalt is common, slate appears on a few older buildings.",
    housing:
      "Two-story colonials, some HOA streets, and a compact historic core with tighter lots.",
    winter:
      "North-facing valleys hold ice longer; complex roofs have more flashing lines to check before an array.",
    localNote:
      "A four-plane colonial is a different design problem than a Kettering ranch, even when both sit on AES Ohio.",
  },
  {
    slug: "huber-heights-oh",
    name: "Huber Heights",
    state: "Ohio",
    stateAbbr: "OH",
    status: "live",
    nearbySlugs: [
      "dayton-oh",
      "vandalia-oh",
      "fairborn-oh",
      "springfield-oh",
      "kettering-oh",
    ],
    setting:
      "Huber Heights is a northern Dayton suburb known for brick ranches on AES Ohio. Lots are often wider than inner-city Dayton.",
    utility: "AES Ohio",
    roofs:
      "Low-pitch asphalt planes on brick ranches — lots of area, less steepness for snow shed.",
    housing:
      "1950s–70s Huber brick ranches and later infill. Simple footprints compared with Centerville colonials.",
    winter:
      "Low pitch means snow and ice can sit. Production in January is a conversation, not a reason to skip solar.",
    localNote:
      "A long ranch plane can take a clean array if the shingles and deck are sound. Pitch, not lot size, is the usual constraint.",
  },
  {
    slug: "fairborn-oh",
    name: "Fairborn",
    state: "Ohio",
    stateAbbr: "OH",
    status: "live",
    nearbySlugs: [
      "dayton-oh",
      "beavercreek-oh",
      "huber-heights-oh",
      "springfield-oh",
      "xenia-oh",
    ],
    setting:
      "Fairborn sits next to Wright-Patterson Air Force Base with an older downtown and military-adjacent housing. AES Ohio serves the city.",
    utility: "AES Ohio",
    roofs:
      "A mix of older downtown pitches and later subdivision shingles. Roof age varies block to block.",
    housing:
      "1940s–80s stock near the base and an older commercial/residential core.",
    winter:
      "Ice and wind off more open corridors near the base area; older flashing is a common find.",
    localNote:
      "Some Fairborn roofs need replacement before any array. That is a roof conversation first, then TPO or purchase.",
  },
  {
    slug: "miamisburg-oh",
    name: "Miamisburg",
    state: "Ohio",
    stateAbbr: "OH",
    status: "live",
    nearbySlugs: [
      "dayton-oh",
      "centerville-oh",
      "kettering-oh",
      "vandalia-oh",
      "xenia-oh",
    ],
    setting:
      "Miamisburg follows the Great Miami River south of Dayton, with hillside lots and a historic downtown. AES Ohio is the typical utility.",
    utility: "AES Ohio",
    roofs:
      "Steeper pitches on hillside two-stories; some older downtown roofs still show slate or aged asphalt.",
    housing:
      "Historic downtown two-stories plus later hillside and subdivision houses.",
    winter:
      "North slopes hold ice; hillside access in a freeze changes how a crew stages, not the national cost range.",
    localNote:
      "A river-adjacent lot is not automatically a south-facing ideal. Orientation and trees along the bluff matter more than the zip code.",
  },
  {
    slug: "xenia-oh",
    name: "Xenia",
    state: "Ohio",
    stateAbbr: "OH",
    status: "live",
    nearbySlugs: [
      "beavercreek-oh",
      "fairborn-oh",
      "centerville-oh",
      "springfield-oh",
      "dayton-oh",
    ],
    setting:
      "Xenia is the Greene County seat east of Dayton, with older stock and blocks rebuilt after historic wind events. AES Ohio is the usual utility.",
    utility: "AES Ohio",
    roofs:
      "A mix of replaced post-storm roofs and older asphalt that has seen ice and high wind.",
    housing:
      "Older in-town streets plus later rebuilds and subdivision edges.",
    winter:
      "Ice plus open-lot wind. Roof replacement history is part of the first questions, not an afterthought.",
    localNote:
      "A newer post-storm roof can be a clean solar candidate. An unrestored older roof is not, regardless of the bill.",
  },
  {
    slug: "vandalia-oh",
    name: "Vandalia",
    state: "Ohio",
    stateAbbr: "OH",
    status: "live",
    nearbySlugs: [
      "dayton-oh",
      "huber-heights-oh",
      "springfield-oh",
      "fairborn-oh",
      "miamisburg-oh",
    ],
    setting:
      "Vandalia sits north of Dayton near the airport corridor, with 1960s–80s housing on AES Ohio.",
    utility: "AES Ohio",
    roofs:
      "Ranch and tri-level asphalt, often lower pitch, similar in shape to Huber Heights but a different street pattern.",
    housing:
      "1960s–80s ranches and tri-levels; fewer historic slate roofs than Springfield or downtown Dayton.",
    winter:
      "Airport-area wind and ice on low-pitch planes. Snow load is a design note, not a local price list.",
    localNote:
      "Simpler roof geometry helps. Remaining shingle life and interconnection on the AES Ohio bill still come first.",
  },
  {
    slug: "springfield-oh",
    name: "Springfield",
    state: "Ohio",
    stateAbbr: "OH",
    status: "live",
    nearbySlugs: [
      "dayton-oh",
      "fairborn-oh",
      "huber-heights-oh",
      "vandalia-oh",
      "xenia-oh",
    ],
    setting:
      "Springfield is a Clark County city northeast of Dayton with older industrial-era housing. Confirm AES Ohio or the utility printed on your bill before interconnection talk.",
    utility: "AES Ohio or the utility printed on your bill",
    roofs:
      "Aging asphalt is common; brick houses and some slate appear on older streets.",
    housing:
      "Older city stock — brick, two-stories, and houses that have seen decades of ice seasons.",
    winter:
      "Ice storms are a regular Miami Valley and Clark County story. Roof condition is the gate, not a slogan.",
    localNote:
      "We do not invent a Springfield-only dollar figure. National published ranges are the only numbers on this site.",
  },
  {
    slug: "tipp-city-oh",
    name: "Tipp City",
    state: "Ohio",
    stateAbbr: "OH",
    status: "live",
    nearbySlugs: [
      "dayton-oh",
      "vandalia-oh",
      "huber-heights-oh",
      "springfield-oh",
      "fairborn-oh",
    ],
    setting:
      "Tipp City sits in Miami County north of Dayton along the I-75 corridor, with a compact historic downtown and later subdivisions. AES Ohio is the usual electric utility.",
    utility: "AES Ohio",
    roofs:
      "Older downtown pitches mixed with later subdivision architectural shingles; asphalt is common, and a few Main Street buildings still show aged covering.",
    housing:
      "Canal-era downtown two-stories plus 1970s–2000s ranches and colonials on wider lots than inner-city Dayton.",
    winter:
      "Ice and freeze–thaw hit older flashing downtown; open subdivision lots catch more wind-driven snow than a tree-lined Dayton street.",
    localNote:
      "A Main Street two-story is a different design problem than a later Tipp subdivision ranch, even when both sit on AES Ohio.",
  },
];

export const liveCitySlugs = cities
  .filter((city) => city.status === "live")
  .map((city) => city.slug);

export function getCity(slug: string): City | undefined {
  return cities.find((city) => city.slug === slug);
}

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function getNearbyCities(city: City): City[] {
  return city.nearbySlugs
    .map((slug) => getCity(slug))
    .filter((item): item is City => Boolean(item));
}

export function getParentCity(city: City): City | undefined {
  return city.parentSlug ? getCity(city.parentSlug) : undefined;
}

export function cityPath(city: City | string): string {
  const slug = typeof city === "string" ? city : city.slug;
  return `/${slug}`;
}

export function servicePath(
  city: City | string,
  service: Service | string
): string {
  const citySlug = typeof city === "string" ? city : city.slug;
  const serviceSlug = typeof service === "string" ? service : service.slug;
  return `/${citySlug}/${serviceSlug}`;
}

export function lockedH1(service: Service, city: City): string {
  return `Best ${service.name} in ${city.name} — ${site.year}`;
}

/** Title tag matches the H1 when it fits in 60 characters. */
export function pageTitle(service: Service, city: City): string {
  const locked = lockedH1(service, city);
  if (locked.length <= 60) return locked;
  const withoutYear = `Best ${service.name} in ${city.name}`;
  if (withoutYear.length <= 60) return withoutYear;
  return `${service.name} in ${city.name} — ${site.year}`;
}

export const costGuide = {
  line: "U.S. residential solar marketplace quotes have recently clustered around about $2.50 per watt before incentives.",
  sourceName: "EnergySage, home energy market highlights, H2 2025",
  sourceUrl:
    "https://www.energysage.com/news/home-energy-market-h2-2025-highlights/",
  disclaimer:
    "This is a national published range, not a Dayton-area or city-specific survey. SolarLists does not invent city-specific dollar amounts. Broader cash-purchase studies report higher national medians than marketplace quotes.",
} as const;
