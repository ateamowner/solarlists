import { localFaqs } from "@/lib/local-facts";
import {
  costGuide,
  getNearbyCities,
  services,
  site,
  type City,
} from "@/config/site";
import { uniqueLocalCopy } from "@/lib/local-copy";
import type { Faq } from "@/lib/editorial";

export type { Faq };

export function quickAnswer(city: City): string {
  return `Short answer: ${city.name} homeowners can buy a solar system or go third-party ownership (TPO, $0 down), and both run through ${city.utility} interconnection and Ohio net metering. A federal credit for systems you buy ended with 2025 installs. Start with roof age, shade, and a recent bill, then get every number in writing.`;
}

export function hubIntro(city: City): string[] {
  return [
    `This is the one ${site.name} guide for ${city.name}, ${city.stateAbbr}. It covers buying a system, TPO / $0-down solar, and panel layout on ${city.name} roofs, plus the local utility, permit office, and federal credit status, each with a link to the official source.`,
    city.setting,
    `${city.housing} ${city.roofs} ${city.winter}`,
    city.localNote,
    `Consult requests go to ${site.operator} at ${site.leadsEmail}, or call or text ${site.phone}.`,
  ];
}

export type HubSection = {
  id: string;
  heading: string;
  paragraphs: string[];
};

/** One section per former service URL. Redirect stubs point at these anchors. */
export function hubSections(city: City): HubSection[] {
  return services.map((service) => {
    const local = uniqueLocalCopy(city, service);
    if (service.slug === "tpo-solar") {
      return {
        id: service.slug,
        heading: `TPO / $0-down solar in ${city.name}`,
        paragraphs: [
          local,
          `Third-party ownership means a provider owns the array on your roof. You do not buy it, so you can go solar without a large loan. Interconnection and bill credits still run through ${city.utility}; TPO does not replace the utility.`,
          `Ask what happens if you sell the house, what the monthly or per-kWh price does over the term, and who handles roof work under the array. Get each answer in the contract.`,
        ],
      };
    }
    if (service.slug === "solar-panels") {
      return {
        id: service.slug,
        heading: `Solar panels on ${city.name} roofs`,
        paragraphs: [
          local,
          `${site.name} does not publish a brand ranking or invented product names. Panel choice follows roof type, shade, and warranty. ${city.winter} Lower winter output is normal; ice around penetrations is why flashing and workmanship warranties matter more than a brochure photo.`,
        ],
      };
    }
    return {
      id: service.slug,
      heading: `Buying a solar system (installation) in ${city.name}`,
      paragraphs: [
        local,
        `A purchase means you own the system once the job is complete and paid. Ask for a written scope that names the roof planes, the inverter type, how roof penetrations are flashed, and who files the ${city.utility} interconnection application.`,
      ],
    };
  });
}

export function howToChoose(city: City): {
  lead: string;
  items: { title: string; body: string }[];
} {
  return {
    lead: `How to choose a solar path in ${city.name}. The same checks apply whether you want TPO or a purchase.`,
    items: [
      {
        title: "Roof condition",
        body: `Ask whether the deck and covering can take an array now. ${city.roofs} Replacing a worn roof after modules are on it is the expensive order. ${site.name} does not invent a remaining-life number for your house.`,
      },
      {
        title: "Shading",
        body: `Walk the south and west planes after you know where winter sun sits. A February photo can hide May shade. If a plane is a tree tunnel, say so on the form.`,
      },
      {
        title: "The bill",
        body: `Have a recent ${city.utility} (or other) bill ready. Monthly usage shapes system size more than a neighbor’s rumor. We ask for a bill range on the form so the callback is not a guess.`,
      },
      {
        title: "TPO vs buy",
        body: `Purchase can make sense if you want to own the asset. TPO can make sense if you want solar without a large loan. Since the homeowner federal credit ended with 2025 installs, ask for both numbers in writing and compare them side by side.`,
      },
      {
        title: "Who owns the system",
        body: `On TPO, a third party owns the array; you are not buying it. On a purchase, you own it after the job is complete and paid. If you sell the ${city.name} house, the contract should say what transfers.`,
      },
      {
        title: "Licensing and permits",
        body: `Ask who pulls the building and electrical permits and which office issues them (see the local basics below). Ohio electrical contractors are licensed by the state (Ohio Construction Industry Licensing Board); ask for the license number and check it.`,
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

export function hubFaqs(city: City): Faq[] {
  const nearby = getNearbyCities(city);
  const nearbyNames = nearby.map((item) => item.name);
  const costAnswer = `${site.name} does not publish a ${city.name}-specific price. The only dollar range we cite is national: marketplace quotes have recently clustered around about $2.50 per watt before incentives (${costGuide.sourceName}). Broader cash-purchase studies report higher medians. Your job may sit outside that range.`;

  return [
    ...localFaqs(city),
    {
      question: `What does solar cost in ${city.name}?`,
      answer: costAnswer,
    },
    {
      question: `Can I still get the federal solar tax credit in ${city.name} in 2026?`,
      answer: `Not on a system you buy and finish installing in 2026. The IRS says the residential clean energy credit (section 25D) is not allowed for expenditures made after December 31, 2025, and an expenditure counts as made when installation is completed. On TPO the provider, not you, owns the system and any business credit. This is not tax advice.`,
    },
    {
      question: `What is TPO solar in ${city.name}?`,
      answer: `Third-party ownership. A provider owns the system on your ${city.name} roof, so you can go solar with $0 down and without a large loan. You still interconnect through ${city.utility}. TPO does not replace the utility.`,
    },
    {
      question: `Who owns the solar system if I choose TPO?`,
      answer: `The TPO provider owns the equipment. You do not. Ask what happens if you sell the house, and get it in the contract.`,
    },
    {
      question: `Can ${city.name} roofs take panels through an Ohio winter?`,
      answer: `${city.winter} Winter production is lower. That is normal. Ice around penetrations is why roof condition and flashing warranty matter more than a brochure photo.`,
    },
    {
      question: `Which solar panels or companies does ${site.name} recommend in ${city.name}?`,
      answer: `We do not publish a brand ranking, invented installer names, or fake reviews. ${site.name} is a homeowner guide with a consult form, not a marketplace. Use the how-to-choose checklist on this page to compare any company you are talking to.`,
    },
    {
      question: `Who receives a ${city.name} consult request?`,
      answer: `${site.authorFormal}. Requests go to ${site.leadsEmail}, or call or text ${site.phone}.`,
    },
    {
      question: `What utility serves ${city.name}?`,
      answer: `Most ${city.name} homes are on ${city.utility}. Confirm the name on your bill. ${site.name} is not that utility.`,
    },
    {
      question:
        nearbyNames.length > 0
          ? `Which nearby cities have their own ${site.name} guides?`
          : `What if my town is not listed?`,
      answer:
        nearbyNames.length > 0
          ? `From ${city.name}: ${joinAnd(nearbyNames)}. Each has one guide page with its own consult form.`
          : `Send the form with your ZIP and we will still take the request.`,
    },
  ];
}

export function hubMetaDescription(city: City): string {
  return `${city.name}, ${city.stateAbbr} solar guide: buy vs TPO / $0-down, panel layout, ${city.utility} net metering, permits, and 2026 federal credit status, with sources. Free consult.`;
}

function joinAnd(names: string[]): string {
  if (names.length === 0) return "";
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} and ${names[1]}`;
  return `${names.slice(0, -1).join(", ")}, and ${names[names.length - 1]}`;
}
