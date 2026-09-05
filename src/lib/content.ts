import {
  costGuide,
  getNearbyCities,
  lockedH1,
  site,
  type City,
  type Service,
} from "@/config/site";
import { uniqueLocalCopy } from "@/lib/local-copy";

export type Faq = { question: string; answer: string };

export function introParagraphs(city: City, service: Service): string[] {
  const disclosure = `${site.disclosure} Every quote on this page goes to ${site.operator} at ${site.leadsEmail}.`;
  const tpoLead =
    service.slug === "tpo-solar"
      ? `${city.name} homeowners can ask for third-party ownership first: $0 down, no huge loan, and a written explanation of who owns the system.`
      : `A Team Contracting now offers third-party ownership (TPO) so ${city.name} homeowners can go solar without a large loan, plus a standard purchase quote if you would rather own the array.`;

  return [uniqueLocalCopy(city, service), tpoLead, city.setting, disclosure];
}

export function hubIntro(city: City): string[] {
  return [
    `This is the ${city.name}, ${city.stateAbbr} hub on ${site.name}. From here you can open solar installation, TPO solar, and solar panel pages — each with its own quote form.`,
    city.setting,
    `${city.housing} ${city.roofs} ${city.winter}`,
    `A Team Contracting leads with TPO / $0-down when a ${city.name} roof and ${city.utility} bill qualify, and still quotes a purchase path if you want to own the system.`,
    site.disclosure,
  ];
}

export function howToChoose(
  city: City,
  service: Service
): {
  lead: string;
  items: { title: string; body: string }[];
} {
  return {
    lead: `How to choose a ${service.name.toLowerCase()} path in ${city.name} — the same checks apply whether you want TPO or a purchase.`,
    items: [
      {
        title: "Roof condition",
        body: `Ask whether the deck and covering can take an array now. ${city.roofs} Replacing a worn roof after modules are on it is the expensive order. ${site.name} does not invent a remaining-life number for your house.`,
      },
      {
        title: "Shading",
        body: `Walk the south and west planes after you know where winter sun sits. ${city.housing} A February photo can hide May shade. If a plane is a tree tunnel, say so on the form.`,
      },
      {
        title: "The bill",
        body: `Have a recent ${city.utility} (or other) bill ready. Monthly usage shapes system size more than a neighbor’s rumor. We ask for a bill range on the form so the callback is not a guess.`,
      },
      {
        title: "TPO vs buy",
        body: `${service.slug === "tpo-solar" ? "This page is the TPO path: $0 down, no huge loan, provider-owned equipment." : "Decide whether you want to own the system or use TPO."} Purchase can make sense if you want the asset. TPO can make sense if you want solar without a large loan. Ask for both numbers in writing.`,
      },
      {
        title: "Who owns the system",
        body: `On TPO, a third party owns the array; you are not buying it. On a purchase, you own it after the job is complete and paid. If you sell the ${city.name} house, the contract should say what transfers. Do not accept a shrug.`,
      },
      {
        title: "Warranty",
        body: `Ask what is warranted (modules, inverters, roof penetrations, workmanship) and for how long. “We stand behind it” is not a warranty. Ice-season leaks around flashing are a reason to get that in writing.`,
      },
    ],
  };
}

export function costGuideCopy(city: City): {
  heading: string;
  paragraphs: string[];
  citation: { label: string; href: string };
} {
  return {
    heading: `Cost guide (national range, not a ${city.name} survey)`,
    paragraphs: [
      costGuide.line,
      costGuide.disclaimer,
      `Roof complexity, shade, equipment, and interconnection change a real quote. A written number from a walk of your ${city.name} roof is the only local price that matters. ${site.name} does not publish city-specific dollar amounts.`,
    ],
    citation: { label: costGuide.sourceName, href: costGuide.sourceUrl },
  };
}

export function faqs(city: City, service: Service): Faq[] {
  const nearby = getNearbyCities(city);
  const nearbyNames = nearby.map((item) => item.name);
  const costAnswer = `${site.name} does not publish a ${city.name}-specific price. The only dollar range we cite is national: marketplace quotes have recently clustered around about $2.50 per watt before incentives (${costGuide.sourceName}). Broader cash-purchase studies report higher medians. Your job may sit outside that range.`;

  if (service.slug === "tpo-solar") {
    return [
      {
        question: `What is TPO solar in ${city.name}?`,
        answer: `Third-party ownership. A provider owns the system on your ${city.name} roof. You can go solar with $0 down and without a large loan. A Team Contracting quotes that path for ${site.name}. We are not a utility.`,
      },
      {
        question: `Who owns the solar system if I choose TPO?`,
        answer: `The TPO provider owns the equipment. You do not. That is the point of TPO versus a purchase. Ask what happens if you sell the house, and get it in the contract.`,
      },
      {
        question: `Does TPO still need my ${city.utility} bill?`,
        answer: `Yes. Interconnection and bill savings still run through the utility printed on your statement — ${city.utility} for most ${city.name} homes. TPO does not replace the utility.`,
      },
      {
        question: `What does solar cost in ${city.name}?`,
        answer: costAnswer,
      },
      {
        question:
          nearbyNames.length > 0
            ? `Do you quote TPO in ${nearbyNames[0]} and other towns near ${city.name}?`
            : `Which towns near ${city.name} have their own ${site.name} pages?`,
        answer:
          nearbyNames.length > 0
            ? `Yes. We keep a separate URL so you open a real page instead of a comma list. From ${city.name} that includes ${joinAnd(nearbyNames)}. Each page has its own form.`
            : `We publish one URL per city. If you do not see your town, send the form with your ZIP.`,
      },
    ];
  }

  if (service.slug === "solar-panels") {
    return [
      {
        question: `Which solar panels does ${site.name} recommend in ${city.name}?`,
        answer: `We do not publish a brand ranking or invented product names. Panel choice follows roof type, shade, and warranty — ${city.roofs} A Team Contracting will talk equipment on the callback, not in a fake shop page.`,
      },
      {
        question: `Can ${city.name} roofs take panels through an Ohio winter?`,
        answer: `${city.winter} Winter production is lower. That is normal. Ice around penetrations is why roof condition and flashing warranty matter more than a brochure photo.`,
      },
      {
        question: `What do solar panels cost in ${city.name}?`,
        answer: costAnswer,
      },
      {
        question: `Is this a marketplace of installers?`,
        answer: `No. ${site.disclosure} There is no installer directory on this page and no For Pros listing for other solar companies.`,
      },
      {
        question:
          nearbyNames.length > 0
            ? `Are there panel pages for ${nearbyNames[0]} and towns near ${city.name}?`
            : `Which towns near ${city.name} have their own ${site.name} pages?`,
        answer:
          nearbyNames.length > 0
            ? `Yes — ${joinAnd(nearbyNames)} each have their own ${site.name} URLs and forms.`
            : `Send the form with your ZIP if your town is not listed.`,
      },
    ];
  }

  return [
    {
      question: `Is ${site.name} a solar installer in ${city.name}?`,
      answer: `This site collects quote requests for ${site.operator}. We are not a utility and not a national marketplace. A Team Contracting follows up on ${city.name} requests sent through this form.`,
    },
    {
      question: `What does solar installation cost in ${city.name}?`,
      answer: costAnswer,
    },
    {
      question: `How do ice and older houses change a ${city.name} install?`,
      answer: `${city.housing} ${city.winter} Those facts change design and roof readiness. They are not a license to invent a local price.`,
    },
    {
      question: `Can I go solar in ${city.name} without a large loan?`,
      answer: `Yes — ask for TPO. Third-party ownership is a first-class option on ${site.name}: $0 down, no huge loan, provider-owned system. You can also request a purchase quote on the same form.`,
    },
    {
      question:
        nearbyNames.length > 0
          ? `Do you cover ${nearbyNames[0]} and other towns near ${city.name}?`
          : `Which towns near ${city.name} have their own ${site.name} pages?`,
      answer:
        nearbyNames.length > 0
          ? `Yes — we keep a separate URL for nearby cities so you can open a real page. From ${city.name} that includes ${joinAnd(nearbyNames)}. Each of those pages has its own quote form.`
          : `We publish one URL per city. If you do not see your town, send the form with your ZIP.`,
    },
  ];
}

/** Homepage FAQ — five locked SHIP #2 themes. Must match FAQPage JSON-LD. */
export function homeFaqs(): Faq[] {
  return [
    {
      question: "What is the difference between TPO and a purchase quote?",
      answer:
        "TPO (third-party ownership) is $0 down with no large loan — a third party owns the system. A purchase quote is if you want to own the array. You can request either on the form.",
    },
    {
      question: "Is SolarLists a contractor marketplace?",
      answer:
        "No. This is in-house lead gen for A Team Contracting — not a contractor marketplace and not a list of other solar companies. There is no Featured marketplace and no For Pros page.",
    },
    {
      question: "Who owns the solar system?",
      answer:
        "On TPO, a third party owns the array; you are not buying it. On a purchase, you own it after the job is complete and paid. We give a written explanation of who owns the system.",
    },
    {
      question: "What happens when I submit the quote form?",
      answer: `The form emails ${site.leadsEmail}. A Team Contracting follows up in-house. We take the request and hold it. We do not invent companies or sell the lead to a marketplace of other contractors.`,
    },
    {
      question: "Do you invent city prices or star ratings?",
      answer:
        "No. We do not invent city-specific prices, reviews, or star ratings. The only dollar range on this site is a cited national range, not a Dayton, Columbus, or Cincinnati survey.",
    },
  ];
}

export function hubFaqs(city: City): Faq[] {
  const nearby = getNearbyCities(city);
  const nearbyNames = nearby.map((item) => item.name);

  return [
    {
      question: `What is the ${city.name} ${site.name} hub?`,
      answer: `This is the city index for residential solar pages — installation, TPO solar, and solar panels. It is not a utility site and not a national marketplace.`,
    },
    {
      question: `Who receives a ${city.name} quote request?`,
      answer: `${site.operator}. Leads go to ${site.leadsEmail}. ${site.disclosure}`,
    },
    {
      question: `Can ${city.name} homeowners go solar without a large loan?`,
      answer: `Yes. A Team Contracting offers third-party ownership (TPO) so you can go solar with $0 down and without a huge loan. You can also request a standard purchase quote.`,
    },
    {
      question: `What utility serves ${city.name}?`,
      answer: `Most ${city.name} homes are on ${city.utility}. Confirm the name on your bill. ${site.name} is not that utility.`,
    },
    {
      question:
        nearbyNames.length > 0
          ? `Which nearby cities have their own ${site.name} pages?`
          : `What if my town is not listed?`,
      answer:
        nearbyNames.length > 0
          ? `${city.name} links to ${joinAnd(nearbyNames)}. Each URL is a real page with a form so internal links do not 404.`
          : `Send the form with your ZIP and we will still take the request.`,
    },
  ];
}

export function metaDescription(city: City, service: Service): string {
  return `${lockedH1(service, city)}. Residential solar quotes for ${site.operator} in ${city.name}. TPO / $0-down or purchase. Not a utility or marketplace.`;
}

function joinAnd(names: string[]): string {
  if (names.length === 0) return "";
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} and ${names[1]}`;
  return `${names.slice(0, -1).join(", ")}, and ${names[names.length - 1]}`;
}
