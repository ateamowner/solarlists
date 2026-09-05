/**
 * SolarLists site config — brand, domain, inbox, cities, and services.
 * Theme tokens live here so a rebrand is one file.
 */
// Live host is GitHub Pages only.
// Vercel GitHub App uninstalled — no Vercel deploy status expected.

export const site = {
  name: "SolarLists",
  legalName: "SolarLists",
  author: "Anthony Leonard",
  authorLocation: "Tipp City, Ohio",
  operator: "Anthony Leonard",
  domain: "solarlists.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://solarlists.com",
  email: "Anthony.Leonard.brs@sunpower.com",
  leadsEmail: "Anthony.Leonard.brs@sunpower.com",
  phone: "(937) 777-9093",
  phoneTel: "+19377779093",
  contactReady: true,
  /** Native HTML POST to Formsubmit. No fetch/XHR, no API key. */
  formAction: "https://formsubmit.co/Anthony.Leonard.brs@sunpower.com",
  formRedirect: "https://solarlists.com/request-sent/",
  tagline: "Clear solar education for homeowners who want to think first.",
  year: 2026,
  lastReviewed: "2026-09-05",
  lastReviewedLabel: "September 5, 2026",
  description:
    "SolarLists is a national education site for homeowners researching solar. Start with better questions — then, if you live in a served market, request a consult.",
  /** Quiet IC line for About + footer only. Never use this as an H1. */
  disclosure:
    "Anthony Leonard is a SunPower independent contractor. SolarLists is an education site, not SunPower.com and not A Team Contracting.",
  /** Shared conversion shell switches. SolarLists has no For Pros page and no Featured buy path. */
  hasForPros: false,
  hasFeatured: false,
  trustStrip: [
    "Education first",
    "No credit card",
    "No pressure quotes",
  ] as const,
  theme: {
    background: "#F7F3EA",
    foreground: "#1A1D18",
    card: "#FFFDF8",
    primary: "#8A4B12",
    primaryForeground: "#FFF8EC",
    muted: "#EFE8DA",
    mutedForeground: "#5C574C",
    accent: "#F3D27A",
    accentForeground: "#3D2E0A",
    border: "#D9CFB8",
    ring: "#8A4B12",
    footerStrip: "#EFE8DA",
  },
} as const;

export const primaryNav = [
  { href: "/#questions", label: "Learn" },
  { href: "/about/", label: "About" },
  { href: "/consult/", label: "Consult" },
] as const;

export const footerNav = [
  { href: "/about/", label: "About" },
  { href: "/sources/", label: "Sources" },
  { href: "/consult/", label: "Consult" },
  { href: "/privacy/", label: "Privacy" },
] as const;

/** Anthony’s IC markets only. Do not invent a map or ZIP list beyond this. */
export const consultMarkets = [
  { abbr: "CA", name: "California" },
  { abbr: "CO", name: "Colorado" },
  { abbr: "FL", name: "Florida" },
  { abbr: "IL", name: "Illinois" },
  { abbr: "IN", name: "Indiana" },
  { abbr: "MA", name: "Massachusetts" },
  { abbr: "MD", name: "Maryland" },
  { abbr: "MI", name: "Michigan" },
  { abbr: "MN", name: "Minnesota" },
  { abbr: "NC", name: "North Carolina" },
  { abbr: "NV", name: "Nevada" },
  { abbr: "OH", name: "Ohio" },
  { abbr: "OR", name: "Oregon" },
  { abbr: "PA", name: "Pennsylvania" },
  { abbr: "SC", name: "South Carolina" },
  { abbr: "TX", name: "Texas" },
  { abbr: "UT", name: "Utah" },
  { abbr: "VA", name: "Virginia" },
  { abbr: "WA", name: "Washington" },
  { abbr: "WI", name: "Wisconsin" },
] as const;

export const OTHER_MARKET = "other";

export function isConsultMarket(value: string): boolean {
  return consultMarkets.some((market) => market.abbr === value);
}

export function consultMarketSentence(): string {
  const names = consultMarkets.map((market) => market.name);
  return `${names.slice(0, -1).join(", ")}, and ${names[names.length - 1]}`;
}

/** Wave 1: leftover city × service URLs stay live, but must not be indexed. */
export const doorwayRobots = {
  index: false,
  follow: false,
  nocache: true,
  googleBot: {
    index: false,
    follow: false,
    noimageindex: true,
  },
} as const;

export type CityStatus = "live" | "coming_soon";

export type CityRegion = "dayton" | "columbus" | "cincinnati";

export type City = {
  slug: string;
  name: string;
  state: string;
  stateAbbr: string;
  status: CityStatus;
  region: CityRegion;
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
  { value: "", label: "Select timing" },
  { value: "this_month", label: "This month" },
  { value: "this_quarter", label: "This quarter" },
  { value: "this_year", label: "This year" },
  { value: "researching", label: "Just learning" },
] as const;

export const formInterest = [
  { value: "tpo", label: "TPO / $0 down (no huge loan)" },
  { value: "buy", label: "Buy the system" },
  { value: "not_sure", label: "Not sure yet" },
] as const;

export const formOwnHome = [
  { value: "", label: "Not sure / skip" },
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
    region: "dayton",
    nearbySlugs: [
      "kettering-oh",
      "oakwood-oh",
      "riverside-oh",
      "moraine-oh",
      "huber-heights-oh",
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
    region: "dayton",
    nearbySlugs: [
      "dayton-oh",
      "oakwood-oh",
      "centerville-oh",
      "moraine-oh",
      "beavercreek-oh",
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
    region: "dayton",
    nearbySlugs: [
      "dayton-oh",
      "riverside-oh",
      "fairborn-oh",
      "kettering-oh",
      "bellbrook-oh",
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
    region: "dayton",
    nearbySlugs: [
      "kettering-oh",
      "oakwood-oh",
      "bellbrook-oh",
      "springboro-oh",
      "miamisburg-oh",
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
    region: "dayton",
    nearbySlugs: [
      "dayton-oh",
      "vandalia-oh",
      "riverside-oh",
      "fairborn-oh",
      "clayton-oh",
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
    region: "dayton",
    nearbySlugs: [
      "dayton-oh",
      "beavercreek-oh",
      "riverside-oh",
      "huber-heights-oh",
      "springfield-oh",
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
    region: "dayton",
    nearbySlugs: [
      "west-carrollton-oh",
      "moraine-oh",
      "centerville-oh",
      "germantown-oh",
      "springboro-oh",
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
    region: "dayton",
    nearbySlugs: [
      "beavercreek-oh",
      "bellbrook-oh",
      "fairborn-oh",
      "centerville-oh",
      "springfield-oh",
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
    region: "dayton",
    nearbySlugs: [
      "dayton-oh",
      "huber-heights-oh",
      "englewood-oh",
      "clayton-oh",
      "tipp-city-oh",
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
    region: "dayton",
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
    region: "dayton",
    nearbySlugs: [
      "vandalia-oh",
      "troy-oh",
      "huber-heights-oh",
      "dayton-oh",
      "clayton-oh",
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
  {
    slug: "oakwood-oh",
    name: "Oakwood",
    state: "Ohio",
    stateAbbr: "OH",
    status: "live",
    region: "dayton",
    nearbySlugs: [
      "dayton-oh",
      "kettering-oh",
      "moraine-oh",
      "centerville-oh",
      "beavercreek-oh",
    ],
    setting:
      "Oakwood is a small inner-ring city immediately south of Dayton, with tree-lined streets, early 20th-century two-stories, and tighter lots than later Kettering ranches. AES Ohio is the usual electric utility.",
    utility: "AES Ohio",
    roofs:
      "Asphalt is common on later replacements; early houses along Far Hills and Schantz still carry slate or a mixed covering that is not a standard rack.",
    housing:
      "Tudor, colonial, and foursquare stock on shaded lots — older Dayton-adjacent housing, not a 1990s subdivision street.",
    winter:
      "Mature shade holds ice on north planes; ice dams show up where attic ventilation is weak on those older roofs. Winter sun sits low behind street trees.",
    localNote:
      "An Oakwood slate leftover is a different array conversation than a Kettering ranch plane, even though the cities share a border.",
  },
  {
    slug: "west-carrollton-oh",
    name: "West Carrollton",
    state: "Ohio",
    stateAbbr: "OH",
    status: "live",
    region: "dayton",
    nearbySlugs: [
      "dayton-oh",
      "moraine-oh",
      "miamisburg-oh",
      "kettering-oh",
      "germantown-oh",
    ],
    setting:
      "West Carrollton sits southwest of Dayton along the Great Miami River and the I-75 / Dixie Drive corridor, between Moraine and Miamisburg. AES Ohio is the typical utility.",
    utility: "AES Ohio",
    roofs:
      "Older mill-town pitches mixed with later ranch asphalt. Slate is less common than Oakwood; aging three-tab is the usual covering.",
    housing:
      "Industrial-era two-stories near the river plus later ranches and split-levels off Dixie.",
    winter:
      "River-adjacent ice and freeze–thaw wear flashing; open I-75-corridor lots catch more wind than a tree-lined Oakwood street. Low-pitch ranches hold snow.",
    localNote:
      "A Dixie-corridor ranch is a different design problem than a hillside Miamisburg two-story, even when both sit on the same river.",
  },
  {
    slug: "trotwood-oh",
    name: "Trotwood",
    state: "Ohio",
    stateAbbr: "OH",
    status: "live",
    region: "dayton",
    nearbySlugs: [
      "dayton-oh",
      "clayton-oh",
      "englewood-oh",
      "moraine-oh",
      "brookville-oh",
    ],
    setting:
      "Trotwood is a west Montgomery County city along the Salem Avenue / State Route 49 corridor, with more open lots than inner-city Dayton. AES Ohio serves most homes.",
    utility: "AES Ohio",
    roofs:
      "Mostly asphalt on post-war and later houses. Historic slate is uncommon compared with Oakwood or downtown Dayton.",
    housing:
      "Post-war streets, later infill, and wider lots than a Dayton bungalow block.",
    winter:
      "Open west-side lots see wind-driven ice that a street-tree Dayton alley does not; low-pitch asphalt still holds melt at the eaves.",
    localNote:
      "A Trotwood ranch plane is closer to Huber geometry than to an Oregon District slate roof, even though both are Montgomery County.",
  },
  {
    slug: "englewood-oh",
    name: "Englewood",
    state: "Ohio",
    stateAbbr: "OH",
    status: "live",
    region: "dayton",
    nearbySlugs: [
      "clayton-oh",
      "vandalia-oh",
      "trotwood-oh",
      "dayton-oh",
      "brookville-oh",
    ],
    setting:
      "Englewood sits northwest of Dayton near I-70 and the National Road (US-40), with a small older core and later subdivisions. AES Ohio is the usual electric utility.",
    utility: "AES Ohio",
    roofs:
      "Later architectural shingles on subdivision streets; the older National Road core has aging asphalt and more flashing lines.",
    housing:
      "1970s–2000s colonials and ranches plus a compact older core — not inner-city Dayton bungalow stock.",
    winter:
      "I-70-corridor wind on open subdivision lots; ice still sits on lower-pitch ranches after a Miami Valley freeze.",
    localNote:
      "An Englewood subdivision colonial is a different array layout than a Vandalia tri-level, even when both sit north of downtown Dayton.",
  },
  {
    slug: "riverside-oh",
    name: "Riverside",
    state: "Ohio",
    stateAbbr: "OH",
    status: "live",
    region: "dayton",
    nearbySlugs: [
      "dayton-oh",
      "fairborn-oh",
      "beavercreek-oh",
      "huber-heights-oh",
      "kettering-oh",
    ],
    setting:
      "Riverside wraps the east side of Dayton against Wright-Patterson Air Force Base, along the Woodman Drive corridor. AES Ohio is the typical utility.",
    utility: "AES Ohio",
    roofs:
      "A mix of older east-Dayton asphalt and later military-adjacent housing. Slate is uncommon; remaining shingle life varies block to block.",
    housing:
      "East-side Dayton stock plus base-adjacent streets — tighter than Beavercreek subdivisions, newer on average than Fairborn’s downtown.",
    winter:
      "Wind off more open base-adjacent corridors; ice-dam leaks still show up on older east-side attics. Winter sun sits low behind neighboring two-stories.",
    localNote:
      "A Riverside roof next to the base is a different replacement history than a Fairborn downtown pitch, even when both sit by Wright-Patterson.",
  },
  {
    slug: "moraine-oh",
    name: "Moraine",
    state: "Ohio",
    stateAbbr: "OH",
    status: "live",
    region: "dayton",
    nearbySlugs: [
      "dayton-oh",
      "kettering-oh",
      "west-carrollton-oh",
      "oakwood-oh",
      "miamisburg-oh",
    ],
    setting:
      "Moraine sits immediately south of Dayton along the I-75 industrial corridor, with plant-era streets between Kettering and West Carrollton. AES Ohio is the usual utility.",
    utility: "AES Ohio",
    roofs:
      "Aging asphalt on worker-era houses and later replacements. Slate leftovers are rarer than Oakwood; simple gables are common.",
    housing:
      "Mid-century industrial-adjacent streets and later infill — older Dayton housing nearby, not a Springboro subdivision.",
    winter:
      "I-75-corridor wind plus ice on older flashing. Snow sits on simpler gables the way it does on other low-to-moderate pitches.",
    localNote:
      "A Moraine gable next to the industrial corridor is not an Oakwood slate walk, even though the two cities share a Dayton-south border.",
  },
  {
    slug: "bellbrook-oh",
    name: "Bellbrook",
    state: "Ohio",
    stateAbbr: "OH",
    status: "live",
    region: "dayton",
    nearbySlugs: [
      "centerville-oh",
      "beavercreek-oh",
      "xenia-oh",
      "kettering-oh",
      "springboro-oh",
    ],
    setting:
      "Bellbrook is a Greene County city southeast of Dayton, with a compact historic Main Street and later housing toward Sugarcreek Township. AES Ohio is the usual electric utility.",
    utility: "AES Ohio",
    roofs:
      "Older downtown pitches — some aged covering — plus later architectural shingles on wider township-edge lots.",
    housing:
      "Small-town two-stories in the core and later colonials on the edges. Not a Huber brick-ranch grid.",
    winter:
      "North valleys on older downtown roofs hold ice; later open lots catch more wind than the tree-lined core. Winter production is lower on both.",
    localNote:
      "A Bellbrook Main Street pitch is a different design problem than a later Sugarcreek-edge colonial, even when both use a Bellbrook address.",
  },
  {
    slug: "springboro-oh",
    name: "Springboro",
    state: "Ohio",
    stateAbbr: "OH",
    status: "live",
    region: "dayton",
    nearbySlugs: [
      "centerville-oh",
      "miamisburg-oh",
      "franklin-oh",
      "bellbrook-oh",
      "germantown-oh",
    ],
    setting:
      "Springboro sits in Warren County on the I-75 corridor south of Centerville and Miamisburg, with a historic downtown and large later subdivisions. Confirm AES Ohio or the utility printed on your bill.",
    utility: "AES Ohio or the utility printed on your bill",
    roofs:
      "1990s–2010s architectural shingles dominate the subdivisions; the older downtown still has aging asphalt and tighter access.",
    housing:
      "Later two-stories and colonials on HOA streets, plus a compact historic core that is closer to Franklin’s mill-town scale than to Dayton bungalows.",
    winter:
      "Open subdivision lots shed snow faster on steeper planes but take more wind; downtown ice still sits on older flashing.",
    localNote:
      "A Springboro HOA colonial is a different array scope than a downtown two-story, even when both sit in Warren County south of Dayton.",
  },
  {
    slug: "troy-oh",
    name: "Troy",
    state: "Ohio",
    stateAbbr: "OH",
    status: "live",
    region: "dayton",
    nearbySlugs: [
      "tipp-city-oh",
      "vandalia-oh",
      "huber-heights-oh",
      "springfield-oh",
      "dayton-oh",
    ],
    setting:
      "Troy is the Miami County seat north of Tipp City on the I-75 corridor, with a public-square downtown and later edges. AES Ohio is the usual electric utility.",
    utility: "AES Ohio",
    roofs:
      "Brick and two-story stock around the square still show aging asphalt and some older covering; later edges are architectural shingle.",
    housing:
      "County-seat downtown two-stories plus 1970s–2000s ranches and colonials — older housing than a Vandalia tri-level street.",
    winter:
      "Ice on downtown eaves and freeze–thaw at brick chimneys; open north-edge lots catch more wind than the square. Winter sun on a downtown two-story is not a ranch rectangle.",
    localNote:
      "A Troy public-square two-story is a different design problem than a Tipp subdivision ranch, even though both sit in Miami County.",
  },
  {
    slug: "clayton-oh",
    name: "Clayton",
    state: "Ohio",
    stateAbbr: "OH",
    status: "live",
    region: "dayton",
    nearbySlugs: [
      "englewood-oh",
      "trotwood-oh",
      "vandalia-oh",
      "brookville-oh",
      "dayton-oh",
    ],
    setting:
      "Clayton sits northwest of Dayton in what was Randolph Township, with rural-edge lots mixed into later residential streets. AES Ohio is the typical utility.",
    utility: "AES Ohio",
    roofs:
      "Asphalt on later houses and aging covering on older rural-edge buildings. Slate is uncommon; simple planes are typical.",
    housing:
      "A mix of older farmhouse leftovers and later ranches — more open than Trotwood’s post-war grid, less subdivision than Englewood.",
    winter:
      "Open northwest lots take wind-driven snow; ice still backs under low-pitch eaves after a Miami Valley freeze.",
    localNote:
      "A Clayton rural-edge plane is not an Englewood HOA colonial, even when both sit northwest of Dayton off I-70.",
  },
  {
    slug: "brookville-oh",
    name: "Brookville",
    state: "Ohio",
    stateAbbr: "OH",
    status: "live",
    region: "dayton",
    nearbySlugs: [
      "clayton-oh",
      "englewood-oh",
      "trotwood-oh",
      "dayton-oh",
      "germantown-oh",
    ],
    setting:
      "Brookville is a small west Montgomery County city along the US-35 / I-70 west side, with a compact downtown and later edges. AES Ohio is the usual electric utility.",
    utility: "AES Ohio",
    roofs:
      "Older in-town asphalt and some aged covering downtown; later edges are simpler architectural-shingle planes.",
    housing:
      "Small-town two-stories in the core and later ranches on the edges — more rural-adjacent than Kettering.",
    winter:
      "West-side open lots catch wind; downtown ice sits on older flashing the way other Miami Valley cores do.",
    localNote:
      "A Brookville downtown pitch is a different walk than a later west-edge ranch, even when both use a Brookville ZIP.",
  },
  {
    slug: "germantown-oh",
    name: "Germantown",
    state: "Ohio",
    stateAbbr: "OH",
    status: "live",
    region: "dayton",
    nearbySlugs: [
      "miamisburg-oh",
      "west-carrollton-oh",
      "franklin-oh",
      "springboro-oh",
      "dayton-oh",
    ],
    setting:
      "Germantown is a historic German village southwest of Dayton, with brick two-stories, a compact downtown, and later edges toward the river towns. AES Ohio is the usual utility.",
    utility: "AES Ohio",
    roofs:
      "Older brick-house asphalt and some leftover older covering downtown; later edges are standard architectural shingle.",
    housing:
      "Nineteenth-century and early 20th-century village stock — closer to older Dayton housing than to a Springboro subdivision.",
    winter:
      "Ice on brick-chimney flashing is a regular village-core story; later open edges shed snow faster. Shade from village trees changes winter sun.",
    localNote:
      "A Germantown brick two-story is a different material conversation than a West Carrollton Dixie ranch, even when both sit southwest of Dayton.",
  },
  {
    slug: "franklin-oh",
    name: "Franklin",
    state: "Ohio",
    stateAbbr: "OH",
    status: "live",
    region: "dayton",
    nearbySlugs: [
      "springboro-oh",
      "miamisburg-oh",
      "germantown-oh",
      "west-carrollton-oh",
      "centerville-oh",
    ],
    setting:
      "Franklin is a Warren County mill town on the Great Miami River and I-75, south of Miamisburg and Springboro toward the Middletown side of the valley. Confirm AES Ohio or the utility printed on your bill.",
    utility: "AES Ohio or the utility printed on your bill",
    roofs:
      "Older mill-town pitches and aging asphalt downtown; later housing adds architectural shingle on simpler planes.",
    housing:
      "Historic two-stories near the river plus later edges — older stock than Springboro’s HOA streets.",
    winter:
      "River-adjacent ice and I-75-corridor wind. North planes on older downtown roofs hold freeze–thaw longer.",
    localNote:
      "A Franklin mill-town two-story is not a Springboro subdivision array, even though both sit in Warren County on I-75.",
  },
  {
    slug: "columbus-oh",
    name: "Columbus",
    state: "Ohio",
    stateAbbr: "OH",
    status: "live",
    region: "columbus",
    nearbySlugs: [
      "dublin-oh",
      "upper-arlington-oh",
      "westerville-oh",
      "hilliard-oh",
      "grove-city-oh",
    ],
    setting:
      "Columbus is Ohio’s capital, with older city lots, street trees, and a mix of bungalows, two-stories, and later infill from German Village to Clintonville. AEP Ohio is the usual electric utility on the bill.",
    utility: "AEP Ohio",
    roofs:
      "Mostly asphalt shingles; some brick and older downtown-adjacent blocks still carry slate or a mixed covering that is not a standard rack.",
    housing:
      "Victorian, Craftsman, and mid-century stock on tighter lots than Dublin or Hilliard subdivisions.",
    winter:
      "Ice storms and freeze–thaw wear flashing; street-tree shade after leaf-out hides a south plane that looked open in February.",
    localNote:
      "A Clintonville bungalow is a different shade and access problem than a later Grove City subdivision, even when both sit on AEP Ohio.",
  },
  {
    slug: "dublin-oh",
    name: "Dublin",
    state: "Ohio",
    stateAbbr: "OH",
    status: "live",
    region: "columbus",
    nearbySlugs: [
      "columbus-oh",
      "hilliard-oh",
      "powell-oh",
      "worthington-oh",
      "upper-arlington-oh",
    ],
    setting:
      "Dublin sits northwest of Columbus along the Scioto and I-270, with later subdivisions, HOA streets, and a compact historic core. AEP Ohio is the typical utility.",
    utility: "AEP Ohio",
    roofs:
      "1990s–2010s architectural shingles dominate the subdivisions; the older Bridge Street / Historic Dublin core has aging asphalt and tighter access.",
    housing:
      "Later two-stories and colonials on HOA lots, plus a small older core — not inner-city Columbus bungalow stock.",
    winter:
      "Open subdivision lots shed snow faster on steeper planes but take more wind; ice still sits on older downtown flashing.",
    localNote:
      "A Dublin HOA colonial is a different array scope than a Historic Dublin two-story, even when both use a Dublin address.",
  },
  {
    slug: "westerville-oh",
    name: "Westerville",
    state: "Ohio",
    stateAbbr: "OH",
    status: "live",
    region: "columbus",
    nearbySlugs: [
      "columbus-oh",
      "worthington-oh",
      "gahanna-oh",
      "powell-oh",
      "delaware-oh",
    ],
    setting:
      "Westerville sits northeast of Columbus with an Uptown historic core and later housing toward Delaware County. Westerville Electric, the city utility, serves most addresses — confirm the name on your bill; some edges print AEP Ohio.",
    utility: "Westerville Electric or the utility printed on your bill",
    roofs:
      "Older Uptown pitches mixed with later architectural shingles on wider lots. Slate leftovers are uncommon; remaining shingle life varies block to block.",
    housing:
      "Small-town two-stories around Uptown plus 1980s–2000s colonials on the edges.",
    winter:
      "North valleys on older Uptown roofs hold ice; later open lots catch more wind than the tree-lined core.",
    localNote:
      "Do not assume an AEP Ohio bill in Westerville. Interconnection follows the utility printed on the statement — often the city electric division.",
  },
  {
    slug: "grove-city-oh",
    name: "Grove City",
    state: "Ohio",
    stateAbbr: "OH",
    status: "live",
    region: "columbus",
    nearbySlugs: [
      "columbus-oh",
      "hilliard-oh",
      "pickerington-oh",
      "reynoldsburg-oh",
      "upper-arlington-oh",
    ],
    setting:
      "Grove City sits southwest of Columbus along I-71, with a compact older downtown and large later subdivisions. AEP Ohio is the usual electric utility.",
    utility: "AEP Ohio",
    roofs:
      "Later architectural shingles on subdivision streets; the older Broadway core has aging asphalt and more flashing lines.",
    housing:
      "1970s–2010s colonials and ranches plus a small historic core — wider lots than inner-city Columbus.",
    winter:
      "Open I-71-corridor lots catch more wind-driven snow than a tree-lined Clintonville street; low-pitch ranches still hold ice at the eaves.",
    localNote:
      "A Grove City subdivision rectangle is a different design problem than a downtown Broadway two-story, even when both sit on AEP Ohio.",
  },
  {
    slug: "upper-arlington-oh",
    name: "Upper Arlington",
    state: "Ohio",
    stateAbbr: "OH",
    status: "live",
    region: "columbus",
    nearbySlugs: [
      "columbus-oh",
      "dublin-oh",
      "hilliard-oh",
      "worthington-oh",
      "grove-city-oh",
    ],
    setting:
      "Upper Arlington is an inner-ring city west of downtown Columbus, with tree-lined streets, early 20th-century two-stories, and tighter lots than later Dublin subdivisions. AEP Ohio is the usual electric utility.",
    utility: "AEP Ohio",
    roofs:
      "Asphalt is common on later replacements; older houses still carry slate or a mixed covering that is not a standard rack.",
    housing:
      "Tudor, colonial, and foursquare stock on shaded lots — older Columbus-adjacent housing, not a 1990s HOA street.",
    winter:
      "Mature shade holds ice on north planes; ice dams show up where attic ventilation is weak. Winter sun sits low behind street trees.",
    localNote:
      "An Upper Arlington slate leftover is a different array conversation than a Hilliard subdivision plane, even though both sit west of downtown Columbus.",
  },
  {
    slug: "hilliard-oh",
    name: "Hilliard",
    state: "Ohio",
    stateAbbr: "OH",
    status: "live",
    region: "columbus",
    nearbySlugs: [
      "columbus-oh",
      "dublin-oh",
      "upper-arlington-oh",
      "grove-city-oh",
      "worthington-oh",
    ],
    setting:
      "Hilliard sits west of Columbus along I-270, with Old Hilliard’s compact core and later subdivisions toward the Scioto. AEP Ohio is the typical utility.",
    utility: "AEP Ohio",
    roofs:
      "Later architectural shingles dominate; Old Hilliard still has aging asphalt and tighter access than a 2000s street.",
    housing:
      "1990s–2010s two-stories and colonials plus a small older core — more HOA streets than Upper Arlington.",
    winter:
      "Open west-side lots take wind-driven ice; older Old Hilliard flashing still holds freeze–thaw after a Central Ohio storm.",
    localNote:
      "A Hilliard HOA colonial is not an Old Hilliard two-story walk, even when both use a Hilliard ZIP.",
  },
  {
    slug: "gahanna-oh",
    name: "Gahanna",
    state: "Ohio",
    stateAbbr: "OH",
    status: "live",
    region: "columbus",
    nearbySlugs: [
      "columbus-oh",
      "westerville-oh",
      "reynoldsburg-oh",
      "worthington-oh",
      "pickerington-oh",
    ],
    setting:
      "Gahanna sits northeast of Columbus along Big Walnut Creek and I-270, with a Creekside older core and later housing. AEP Ohio is the usual electric utility.",
    utility: "AEP Ohio",
    roofs:
      "Older in-town asphalt mixed with later architectural shingles. Slate is uncommon; remaining shingle life varies.",
    housing:
      "Mid-century and later two-stories plus a compact older core near Creekside — not a Powell subdivision grid.",
    winter:
      "Creek-adjacent ice and freeze–thaw on older flashing; later open lots catch more wind than the tree-lined core.",
    localNote:
      "A Gahanna Creekside two-story is a different design problem than a later I-270-edge colonial, even when both sit on AEP Ohio.",
  },
  {
    slug: "reynoldsburg-oh",
    name: "Reynoldsburg",
    state: "Ohio",
    stateAbbr: "OH",
    status: "live",
    region: "columbus",
    nearbySlugs: [
      "columbus-oh",
      "gahanna-oh",
      "pickerington-oh",
      "grove-city-oh",
      "westerville-oh",
    ],
    setting:
      "Reynoldsburg sits east of Columbus along the I-70 corridor, spanning Franklin, Licking, and Fairfield county lines, with 1960s–90s housing and later infill. AEP Ohio is the typical utility.",
    utility: "AEP Ohio",
    roofs:
      "Ranch and colonial asphalt, often lower pitch on older streets. Historic slate is uncommon.",
    housing:
      "1960s–90s ranches and two-stories plus later edges — simpler footprints than Upper Arlington.",
    winter:
      "I-70-corridor wind on more open lots; low-pitch ranches hold snow the way other east-side planes do.",
    localNote:
      "A Reynoldsburg ranch plane is closer to Grove City geometry than to a Clintonville bungalow, even though both sit on AEP Ohio.",
  },
  {
    slug: "pickerington-oh",
    name: "Pickerington",
    state: "Ohio",
    stateAbbr: "OH",
    status: "live",
    region: "columbus",
    nearbySlugs: [
      "reynoldsburg-oh",
      "gahanna-oh",
      "columbus-oh",
      "grove-city-oh",
      "westerville-oh",
    ],
    setting:
      "Pickerington sits southeast of Columbus in Fairfield and Franklin counties, with later subdivisions and a small older core. Most of the city is on South Central Power; some addresses print AEP Ohio. Confirm the name on your bill.",
    utility: "South Central Power or AEP Ohio",
    roofs:
      "1990s–2010s architectural shingles on HOA streets; the older core has aging asphalt and tighter access.",
    housing:
      "Later two-stories and colonials on wider lots than inner-city Columbus, plus a compact older downtown.",
    winter:
      "Open southeast lots catch more wind than a tree-lined Gahanna street; ice still sits on older downtown flashing.",
    localNote:
      "Do not copy an AEP Ohio assumption onto every Pickerington bill. Interconnection follows South Central Power or AEP — whichever is printed on the statement.",
  },
  {
    slug: "powell-oh",
    name: "Powell",
    state: "Ohio",
    stateAbbr: "OH",
    status: "live",
    region: "columbus",
    nearbySlugs: [
      "dublin-oh",
      "worthington-oh",
      "delaware-oh",
      "westerville-oh",
      "columbus-oh",
    ],
    setting:
      "Powell sits in Delaware County north of Dublin and Worthington, with a compact historic downtown and large later subdivisions. AEP Ohio is the usual electric utility.",
    utility: "AEP Ohio",
    roofs:
      "Later architectural shingles dominate the subdivisions; downtown Powell still has aging asphalt and tighter staging.",
    housing:
      "1990s–2010s colonials on HOA streets plus a small downtown core — newer on average than Worthington’s village stock.",
    winter:
      "Open Delaware County lots shed snow faster on steeper planes but take more wind; downtown ice still sits on older flashing.",
    localNote:
      "A Powell HOA colonial is a different array scope than a downtown two-story, even when both sit in Delaware County on AEP Ohio.",
  },
  {
    slug: "delaware-oh",
    name: "Delaware",
    state: "Ohio",
    stateAbbr: "OH",
    status: "live",
    region: "columbus",
    nearbySlugs: [
      "powell-oh",
      "westerville-oh",
      "dublin-oh",
      "worthington-oh",
      "columbus-oh",
    ],
    setting:
      "Delaware is the Delaware County seat north of Columbus, with a public-square downtown, Ohio Wesleyan–adjacent streets, and later edges. AEP Ohio is the typical utility.",
    utility: "AEP Ohio",
    roofs:
      "Brick and two-story stock around the square still show aging asphalt and some older covering; later edges are architectural shingle.",
    housing:
      "County-seat downtown two-stories plus 1970s–2000s ranches and colonials — older housing than a Powell subdivision street.",
    winter:
      "Ice on downtown eaves and freeze–thaw at brick chimneys; open north-edge lots catch more wind than the square.",
    localNote:
      "A Delaware public-square two-story is a different design problem than a Powell HOA ranch, even though both sit in Delaware County.",
  },
  {
    slug: "worthington-oh",
    name: "Worthington",
    state: "Ohio",
    stateAbbr: "OH",
    status: "live",
    region: "columbus",
    nearbySlugs: [
      "columbus-oh",
      "dublin-oh",
      "westerville-oh",
      "powell-oh",
      "upper-arlington-oh",
    ],
    setting:
      "Worthington is a historic village north of Columbus along High Street / US-23, with a New England–style green and later housing toward the Olentangy. AEP Ohio is the usual electric utility.",
    utility: "AEP Ohio",
    roofs:
      "Older village pitches — some aged covering — plus later architectural shingles on wider lots toward the river.",
    housing:
      "Early village two-stories around the green and later colonials on the edges. Not a 2000s Dublin HOA grid.",
    winter:
      "Village trees hold ice on north planes; later open lots catch more wind than the green. Winter sun sits low behind older two-stories.",
    localNote:
      "A Worthington village-green pitch is a different walk than a later Olentangy-edge colonial, even when both use a Worthington address.",
  },
  {
    slug: "cincinnati-oh",
    name: "Cincinnati",
    state: "Ohio",
    stateAbbr: "OH",
    status: "live",
    region: "cincinnati",
    nearbySlugs: [
      "norwood-oh",
      "blue-ash-oh",
      "montgomery-oh",
      "forest-park-oh",
      "loveland-oh",
    ],
    setting:
      "Cincinnati sits on Ohio River hills with older city lots, street trees, and a mix of Italianates, bungalows, and hillside two-stories. Duke Energy Ohio is the usual electric utility on the bill.",
    utility: "Duke Energy Ohio",
    roofs:
      "Steeper hillside pitches and aging asphalt; some historic blocks still carry slate or tile that need a different conversation than a standard rack.",
    housing:
      "Hillside Italianates, brick two-stories, and mid-century houses on tighter lots than Mason or West Chester subdivisions.",
    winter:
      "North slopes hold ice; hillside access in a freeze changes how a crew stages, not the national cost range.",
    localNote:
      "A hillside Price Hill or Hyde Park two-story is not a Mason subdivision rectangle, even when both sit on Duke Energy Ohio.",
  },
  {
    slug: "mason-oh",
    name: "Mason",
    state: "Ohio",
    stateAbbr: "OH",
    status: "live",
    region: "cincinnati",
    nearbySlugs: [
      "west-chester-oh",
      "lebanon-oh",
      "loveland-oh",
      "blue-ash-oh",
      "cincinnati-oh",
    ],
    setting:
      "Mason is a Warren County city northeast of Cincinnati along I-71, with later subdivisions and a small older core. Duke Energy Ohio is the typical utility.",
    utility: "Duke Energy Ohio",
    roofs:
      "1990s–2010s architectural shingles dominate; the older downtown still has aging asphalt and tighter access.",
    housing:
      "Later two-stories and colonials on HOA streets — closer to West Chester geometry than to a Cincinnati hillside Italianate.",
    winter:
      "Open I-71-corridor lots shed snow faster on steeper planes but take more wind; downtown ice still sits on older flashing.",
    localNote:
      "A Mason HOA colonial is a different array scope than a downtown two-story, even when both sit in Warren County on Duke Energy.",
  },
  {
    slug: "west-chester-oh",
    name: "West Chester",
    state: "Ohio",
    stateAbbr: "OH",
    status: "live",
    region: "cincinnati",
    nearbySlugs: [
      "mason-oh",
      "hamilton-oh",
      "fairfield-oh",
      "forest-park-oh",
      "cincinnati-oh",
    ],
    setting:
      "West Chester Township sits in Butler County on the I-75 corridor north of Cincinnati, with later subdivisions and commercial corridors. Duke Energy Ohio is the usual electric utility.",
    utility: "Duke Energy Ohio",
    roofs:
      "Later architectural shingles on subdivision streets. Historic slate is uncommon; HOA planes are typical.",
    housing:
      "1980s–2010s two-stories and colonials on HOA lots — not Cincinnati hillside stock and not a Hamilton mill-town two-story.",
    winter:
      "Open I-75-corridor lots catch more wind-driven ice than a tree-lined Hyde Park street; steeper planes shed snow faster.",
    localNote:
      "A West Chester HOA street is a different design problem than a Hamilton mill-town pitch, even when both sit in Butler County.",
  },
  {
    slug: "hamilton-oh",
    name: "Hamilton",
    state: "Ohio",
    stateAbbr: "OH",
    status: "live",
    region: "cincinnati",
    nearbySlugs: [
      "fairfield-oh",
      "west-chester-oh",
      "forest-park-oh",
      "cincinnati-oh",
      "mason-oh",
    ],
    setting:
      "Hamilton is a Butler County mill town on the Great Miami River, with older industrial-era housing and later edges. The City of Hamilton owns the electric utility for most addresses — confirm the name on your bill; some edges print Duke Energy.",
    utility: "City of Hamilton electric or the utility printed on your bill",
    roofs:
      "Older mill-town pitches and aging asphalt downtown; later housing adds architectural shingle on simpler planes.",
    housing:
      "Historic two-stories near the river plus later edges — older stock than a West Chester HOA street.",
    winter:
      "River-adjacent ice and freeze–thaw on older flashing. North planes on downtown roofs hold ice longer.",
    localNote:
      "Do not copy Duke Energy onto every Hamilton bill. Interconnection follows the city utility or whoever is printed on the statement.",
  },
  {
    slug: "fairfield-oh",
    name: "Fairfield",
    state: "Ohio",
    stateAbbr: "OH",
    status: "live",
    region: "cincinnati",
    nearbySlugs: [
      "hamilton-oh",
      "west-chester-oh",
      "forest-park-oh",
      "cincinnati-oh",
      "mason-oh",
    ],
    setting:
      "Fairfield sits in Butler County between Hamilton and the I-275 belt, with 1960s–90s housing and later infill. Duke Energy Ohio is the typical utility.",
    utility: "Duke Energy Ohio",
    roofs:
      "Ranch and colonial asphalt, often lower pitch on older streets. Historic slate is uncommon.",
    housing:
      "1960s–90s ranches and two-stories plus later edges — simpler footprints than a Cincinnati hillside Italianate.",
    winter:
      "Open north-belt lots catch more wind than a tree-lined Hyde Park street; low-pitch ranches hold snow.",
    localNote:
      "A Fairfield ranch plane is closer to West Chester geometry than to a Hamilton mill-town two-story, even when both sit in Butler County.",
  },
  {
    slug: "lebanon-oh",
    name: "Lebanon",
    state: "Ohio",
    stateAbbr: "OH",
    status: "live",
    region: "cincinnati",
    nearbySlugs: [
      "mason-oh",
      "loveland-oh",
      "springboro-oh",
      "franklin-oh",
      "west-chester-oh",
    ],
    setting:
      "Lebanon is the Warren County seat northeast of Cincinnati, with a historic downtown and later edges toward Mason and Springboro. Duke Energy Ohio is the usual electric utility. Springboro and Franklin stay on their existing Dayton-ring pages — we do not duplicate them here.",
    utility: "Duke Energy Ohio",
    roofs:
      "Older downtown pitches and aging asphalt; later edges are architectural shingle on simpler planes.",
    housing:
      "County-seat two-stories around the square plus later colonials — older stock than a Mason HOA street.",
    winter:
      "Ice on downtown eaves; open later lots catch more wind than the square. Winter production is lower on both.",
    localNote:
      "A Lebanon square two-story is not a Springboro subdivision array, even though both sit in Warren County. Use the existing Springboro page if that is the address.",
  },
  {
    slug: "loveland-oh",
    name: "Loveland",
    state: "Ohio",
    stateAbbr: "OH",
    status: "live",
    region: "cincinnati",
    nearbySlugs: [
      "mason-oh",
      "milford-oh",
      "montgomery-oh",
      "blue-ash-oh",
      "cincinnati-oh",
    ],
    setting:
      "Loveland follows the Little Miami River across Hamilton, Clermont, and Warren county lines, with a historic downtown and later hillside housing. Duke Energy Ohio is the typical utility.",
    utility: "Duke Energy Ohio",
    roofs:
      "Steeper hillside pitches and older downtown asphalt; later edges add architectural shingle.",
    housing:
      "Historic downtown two-stories plus later hillside and subdivision houses — tighter than a Mason HOA street.",
    winter:
      "North slopes hold ice; river-adjacent freeze–thaw wears flashing. Hillside access in a freeze changes staging, not a city price.",
    localNote:
      "A Little Miami hillside lot is not automatically a south-facing ideal. Orientation and trees along the gorge matter more than the zip code.",
  },
  {
    slug: "blue-ash-oh",
    name: "Blue Ash",
    state: "Ohio",
    stateAbbr: "OH",
    status: "live",
    region: "cincinnati",
    nearbySlugs: [
      "montgomery-oh",
      "cincinnati-oh",
      "mason-oh",
      "loveland-oh",
      "norwood-oh",
    ],
    setting:
      "Blue Ash is a northeast Hamilton County city along I-71 / I-275, with mid-century streets and later infill next to Montgomery. Duke Energy Ohio is the usual electric utility.",
    utility: "Duke Energy Ohio",
    roofs:
      "Mid-century asphalt and later architectural shingles. Slate leftovers are rarer than Cincinnati’s historic hillsides.",
    housing:
      "1960s–90s two-stories and ranches plus later infill — newer on average than Norwood, tighter than Mason.",
    winter:
      "I-71-corridor wind plus ice on older flashing. Snow sits on simpler gables the way it does on other moderate pitches.",
    localNote:
      "A Blue Ash mid-century gable is not a Montgomery later colonial, even though the two cities share a northeast Hamilton County border.",
  },
  {
    slug: "montgomery-oh",
    name: "Montgomery",
    state: "Ohio",
    stateAbbr: "OH",
    status: "live",
    region: "cincinnati",
    nearbySlugs: [
      "blue-ash-oh",
      "loveland-oh",
      "cincinnati-oh",
      "mason-oh",
      "milford-oh",
    ],
    setting:
      "Montgomery sits in northeast Hamilton County next to Blue Ash, with a historic downtown and later housing toward I-275. Duke Energy Ohio is the typical utility.",
    utility: "Duke Energy Ohio",
    roofs:
      "Older downtown pitches mixed with later architectural shingles. Complex colonials add more flashing lines than a Blue Ash ranch.",
    housing:
      "Historic-core two-stories plus later colonials — more HOA streets than Norwood, older downtown than Mason.",
    winter:
      "North valleys on older downtown roofs hold ice; later open lots catch more wind than the tree-lined core.",
    localNote:
      "A Montgomery downtown pitch is a different design problem than a later I-275-edge colonial, even when both use a Montgomery address.",
  },
  {
    slug: "milford-oh",
    name: "Milford",
    state: "Ohio",
    stateAbbr: "OH",
    status: "live",
    region: "cincinnati",
    nearbySlugs: [
      "loveland-oh",
      "montgomery-oh",
      "blue-ash-oh",
      "cincinnati-oh",
      "mason-oh",
    ],
    setting:
      "Milford sits in Clermont and Hamilton counties on the Little Miami, with a compact historic downtown and later edges. Duke Energy Ohio is the usual electric utility.",
    utility: "Duke Energy Ohio",
    roofs:
      "Older downtown asphalt and some aged covering; later edges are simpler architectural-shingle planes.",
    housing:
      "Small-town two-stories in the core and later ranches on the edges — more river-town than a West Chester HOA grid.",
    winter:
      "River-adjacent ice and freeze–thaw on older flashing; later open lots shed snow faster.",
    localNote:
      "A Milford downtown pitch is a different walk than a later Clermont-edge ranch, even when both use a Milford ZIP.",
  },
  {
    slug: "norwood-oh",
    name: "Norwood",
    state: "Ohio",
    stateAbbr: "OH",
    status: "live",
    region: "cincinnati",
    nearbySlugs: [
      "cincinnati-oh",
      "blue-ash-oh",
      "montgomery-oh",
      "forest-park-oh",
      "loveland-oh",
    ],
    setting:
      "Norwood is a landlocked Hamilton County city surrounded by Cincinnati, with older industrial-era streets and tighter lots than the outer-ring suburbs. Duke Energy Ohio is the typical utility.",
    utility: "Duke Energy Ohio",
    roofs:
      "Aging asphalt on worker-era houses and later replacements. Slate leftovers appear on some older blocks; simple gables are common.",
    housing:
      "Early 20th-century two-stories and mid-century infill — older Cincinnati-adjacent stock, not a Mason subdivision.",
    winter:
      "Tight lots and neighboring two-stories change winter sun; ice-dam leaks still show up on older attics.",
    localNote:
      "A Norwood gable is a different replacement history than a Blue Ash mid-century plane, even though both sit inside the I-275 belt on Duke Energy.",
  },
  {
    slug: "forest-park-oh",
    name: "Forest Park",
    state: "Ohio",
    stateAbbr: "OH",
    status: "live",
    region: "cincinnati",
    nearbySlugs: [
      "cincinnati-oh",
      "fairfield-oh",
      "west-chester-oh",
      "hamilton-oh",
      "norwood-oh",
    ],
    setting:
      "Forest Park is a planned north Hamilton County city along I-275, with mid-century streets and later infill between Fairfield and the Cincinnati line. Duke Energy Ohio is the usual electric utility.",
    utility: "Duke Energy Ohio",
    roofs:
      "Mid-century asphalt on ranches and two-stories; later replacements are architectural shingle. Historic slate is uncommon.",
    housing:
      "1960s–80s planned-community stock plus later infill — more open than Norwood, older than a West Chester HOA street.",
    winter:
      "I-275-corridor wind on more open lots; low-pitch ranches still hold melt at the eaves after a southwest Ohio freeze.",
    localNote:
      "A Forest Park ranch plane is closer to Fairfield geometry than to a Cincinnati hillside Italianate, even when both sit on Duke Energy Ohio.",
  },
];

export const cityRegionOrder: CityRegion[] = [
  "dayton",
  "columbus",
  "cincinnati",
];

export const cityRegionHeadings: Record<
  CityRegion,
  { heading: string; intro: string }
> = {
  dayton: {
    heading: "Dayton-area cities",
    intro:
      "Legacy local URLs from an earlier site version. They stay published so old links do not 404, and they are noindexed.",
  },
  columbus: {
    heading: "Columbus-area cities",
    intro:
      "Central Ohio hubs on AEP Ohio for most addresses — Westerville often uses the city electric division, and Pickerington is often South Central Power. Confirm the name on the bill.",
  },
  cincinnati: {
    heading: "Cincinnati-area cities",
    intro:
      "Southwest Ohio hubs on Duke Energy Ohio for most addresses — Hamilton often uses the city electric utility. Springboro and Franklin stay on their Dayton-ring pages.",
  },
};

export function citiesInRegion(region: CityRegion): City[] {
  return cities.filter(
    (city) => city.status === "live" && city.region === region
  );
}

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

const knownCitySlugs = new Set(cities.map((city) => city.slug));
for (const city of cities) {
  for (const nearby of city.nearbySlugs) {
    if (!knownCitySlugs.has(nearby)) {
      throw new Error(
        `City ${city.slug} nearbySlugs references missing city ${nearby}`
      );
    }
  }
}

export function getParentCity(city: City): City | undefined {
  return city.parentSlug ? getCity(city.parentSlug) : undefined;
}

/** GitHub Pages 301s no-slash → slash. Sitemap, canonicals, and JSON-LD must match. */
export function withTrailingSlash(path: string): string {
  if (!path || path === "/") return "/";
  return path.endsWith("/") ? path : `${path}/`;
}

export function canonicalUrl(path = "/"): string {
  const base = site.url.replace(/\/+$/, "");
  const pathname = path.startsWith("http")
    ? new URL(path).pathname
    : path.startsWith("/")
      ? path
      : `/${path}`;
  return `${base}${withTrailingSlash(pathname)}`;
}

/** Representative USPS ZIP for quote-form prefill. The homeowner can edit it. */
export const cityZips: Record<string, string> = {
  "dayton-oh": "45402",
  "kettering-oh": "45429",
  "beavercreek-oh": "45431",
  "centerville-oh": "45459",
  "huber-heights-oh": "45424",
  "fairborn-oh": "45324",
  "miamisburg-oh": "45342",
  "xenia-oh": "45385",
  "vandalia-oh": "45377",
  "springfield-oh": "45503",
  "tipp-city-oh": "45371",
  "oakwood-oh": "45419",
  "west-carrollton-oh": "45449",
  "trotwood-oh": "45426",
  "englewood-oh": "45322",
  "riverside-oh": "45431",
  "moraine-oh": "45439",
  "bellbrook-oh": "45305",
  "springboro-oh": "45066",
  "troy-oh": "45373",
  "clayton-oh": "45315",
  "brookville-oh": "45309",
  "germantown-oh": "45327",
  "franklin-oh": "45005",
};

export function cityZip(city: City | string): string {
  const slug = typeof city === "string" ? city : city.slug;
  return cityZips[slug] ?? "";
}

export function cityPath(city: City | string): string {
  const slug = typeof city === "string" ? city : city.slug;
  return `/${slug}/`;
}

export function servicePath(
  city: City | string,
  service: Service | string
): string {
  const citySlug = typeof city === "string" ? city : city.slug;
  const serviceSlug = typeof service === "string" ? service : service.slug;
  return `/${citySlug}/${serviceSlug}/`;
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
