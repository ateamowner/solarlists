import { costGuide, site } from "@/config/site";

export type Faq = { question: string; answer: string };

export type NepqItem = {
  id: string;
  question: string;
  why: string;
};

/** Problem-finder questions for the homepage. Educator first — not a ZIP wizard. */
export const nepqItems: NepqItem[] = [
  {
    id: "bill",
    question:
      "What is actually going on with your electric bill — and is that the real reason you started looking?",
    why: "A high month, a rate change, or a neighbor’s story can all send someone to solar. Those are different problems. Naming the one you have keeps the rest of the research honest.",
  },
  {
    id: "year-from-now",
    question:
      "If panels went on the roof this year, what would you want to be true twelve months from now?",
    why: "Ownership, a lower bill, a cleaner conscience, or “I never want another sales visit” are different outcomes. The contract has to match the one you care about.",
  },
  {
    id: "poor-fit",
    question:
      "What would make solar a poor fit for your house, even if a neighbor went ahead?",
    why: "Roof life, shade, who owns the home, and how long you plan to stay are ordinary filters. A good conversation names the misfit early instead of talking past it.",
  },
  {
    id: "who-else",
    question: "Who else has to live with this decision?",
    why: "A spouse, a landlord, an HOA, or a buyer two years from now can all change what “yes” means. If they are not in the room, write down what they will ask.",
  },
  {
    id: "already-told",
    question: "What have you already been told that you do not fully trust yet?",
    why: "Most people arrive with a number, a warranty line, or a “$0 down” phrase. We would rather unpack that claim than add another one.",
  },
];

export function homeFaqs(): Faq[] {
  return [
    {
      question: "Is SolarLists a solar company?",
      answer:
        "SolarLists is an education site. It is not a utility, not a contractor marketplace, and not SunPower.com. Optional consults, when they happen, are with Anthony Leonard.",
    },
    {
      question: "Who writes this site?",
      answer: `${site.author} writes SolarLists from ${site.authorLocation}. The About page has the full author note and a quiet independent-contractor disclosure.`,
    },
    {
      question: "Do you publish savings numbers or city prices?",
      answer:
        "No invented savings, incentives, warranties, or traffic stats. If a figure is not cited, it is omitted. A written number from a walk of your own roof is the only local price that matters.",
    },
    {
      question: "Who is the consult for?",
      answer:
        "Homeowners researching solar who want to talk through their situation. It is not a “get 3 quotes” marketplace and not a ZIP wizard. Consult routing is not published yet.",
    },
    {
      question: "Is this A Team Contracting?",
      answer:
        "No. A Team Contracting is a separate exterior-cleaning business and is not this site. SolarLists is education first.",
    },
  ];
}

export type EditorialSource = {
  name: string;
  href: string;
  usedFor: string;
};

export const editorialSources: EditorialSource[] = [
  {
    name: costGuide.sourceName,
    href: costGuide.sourceUrl,
    usedFor:
      "The only dollar range this site may mention: a national published marketplace cluster, labeled as national — never as a city survey or a promised savings figure. Wave 1 does not put that number in the homepage hero.",
  },
];

export const editorialRules = [
  {
    title: "Cite or omit",
    body: "If we cannot point to a published source, we leave the number out. That includes savings claims, incentive dollar amounts, warranty lengths we did not read, install timelines, and traffic stats.",
  },
  {
    title: "National education, generic eligibility",
    body: "This site does not claim a state count, a SunPower service map, or a list of independent-contractor markets. Soft-close copy stays generic: homeowners researching solar.",
  },
  {
    title: "No urgency theater",
    body: "We do not invent scarcity, countdown clocks, or award-style headlines. Last-reviewed dates stay visible so a reader can see when the page was last checked.",
  },
  {
    title: "Disclosure stays quiet",
    body: "Independent-contractor language lives on About and in the footer — not in the H1, not as the homepage thesis.",
  },
] as const;
