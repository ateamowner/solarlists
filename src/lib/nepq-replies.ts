/**
 * Wave 1 NEPQ chat content — scripted, cite-or-omit.
 *
 * Problem-finding first. Never invent savings, $0-down guarantees, city
 * prices, warranties, or timelines. If we cannot source it, say so and
 * point at /sources/.
 *
 * Soft-close to /consult/ only after a couple of understanding turns.
 * Eligibility (IC markets + ZIP DQ) stays on the consult form — do not
 * duplicate commission data or the DQ list here.
 */

export type ChatChip = {
  id: string;
  label: string;
  prompt: string;
};

export type ChatLink = {
  href: string;
  label: string;
};

export type ScriptedReply = {
  text: string;
  topicId: string;
  chips?: ChatChip[];
  links?: ChatLink[];
};

export const IRS_CREDIT_HREF =
  "https://www.irs.gov/credits-deductions/residential-clean-energy-credit";

export const SOURCES_HREF = "/sources/";
export const CONSULT_HREF = "/consult/";

export const openerMessage =
  "What’s actually going on — before anyone talks about a quote? Pick a starting point, or type your own.";

export const unknownReply =
  "I don’t have a sourced answer for that yet — see Sources, or book a consult if a conversation would help. What part of the bill, the roof, or a claim you already heard is the real starting point?";

export const consultOfferLine =
  "If a conversation would help more than another article — not a stack of bids — you can book a consult.";

/** Turns of user understanding before the soft consult CTA appears. */
export const CONSULT_AFTER_TURNS = 2;

export const nepqChips: ChatChip[] = [
  {
    id: "bill",
    label: "The bill",
    prompt: "What’s actually going on with my electric bill?",
  },
  {
    id: "year-from-now",
    label: "A year from now",
    prompt:
      "If panels went on this year, what would I want to be true twelve months from now?",
  },
  {
    id: "poor-fit",
    label: "Poor fit",
    prompt: "What would make solar a poor fit for my house?",
  },
  {
    id: "who-else",
    label: "Who else",
    prompt: "Who else has to live with this decision?",
  },
  {
    id: "already-told",
    label: "Already told",
    prompt: "Something I was already told that I do not fully trust.",
  },
];

export const educationChips: ChatChip[] = [
  {
    id: "how-it-works",
    label: "How solar works",
    prompt: "How does solar work on a house?",
  },
  {
    id: "ownership",
    label: "Who owns it",
    prompt: "What’s the difference between cash, loan, lease, PPA, and TPO?",
  },
  {
    id: "tax-credit",
    label: "Tax credit",
    prompt: "What should I know about the federal solar tax credit?",
  },
  {
    id: "roof-shade",
    label: "Roof and shade",
    prompt: "How do I think about roof and shade readiness?",
  },
  {
    id: "consult",
    label: "What a consult is",
    prompt: "What is a consult on this site?",
  },
];

const replies: Record<string, Omit<ScriptedReply, "chips">> = {
  bill: {
    topicId: "bill",
    text: "A high month, a rate change, or a neighbor’s story can all send someone looking. Those are different problems. Naming the one you have keeps the rest of the research honest — I will not invent a savings figure to paper over it.\n\nIs the bill the real reason you started looking, or is something else underneath it?",
  },
  "year-from-now": {
    topicId: "year-from-now",
    text: "Ownership, a lower bill, a quieter conscience, or “I never want another sales visit” are different outcomes. The contract has to match the one you actually care about — not a slogan.\n\nIf panels went on this year, what would you want to be true twelve months from now?",
  },
  "poor-fit": {
    topicId: "poor-fit",
    text: "Roof life, shade, who owns the home, and how long you plan to stay are ordinary filters. A good conversation names the misfit early instead of talking past it. A neighbor going ahead does not make your house a fit.\n\nWhat would make solar a poor fit for your house, even if someone on the street already signed?",
  },
  "who-else": {
    topicId: "who-else",
    text: "A spouse, a landlord, an HOA, or a buyer two years from now can all change what “yes” means. If they are not in the room, write down what they will ask before anyone drafts a contract.\n\nWho else has to live with this decision?",
  },
  "already-told": {
    topicId: "already-told",
    text: "Most people arrive with a number, a warranty line, or a “$0 down” phrase. I would rather unpack that claim than add another one — and I will not invent a replacement figure.\n\nWhat have you already been told that you do not fully trust yet?",
  },
  "how-it-works": {
    topicId: "how-it-works",
    text: "At a high level: panels on a sound roof turn sunlight into electricity for the house. Extra production typically goes out through the utility meter under that utility’s rules; night and dark weather still draw from the grid unless you have storage. Shade, orientation, and the condition of the roof change whether that picture is even relevant.\n\nWhat part of that — the roof, the bill, or the utility piece — is the one you want to sit with first?",
  },
  ownership: {
    topicId: "ownership",
    text: "Cash and a loan usually mean you own the equipment. A lease, a PPA, and other third-party ownership (TPO) usually mean someone else owns it and you pay for the power or the use of the system. Those are different contracts, different transfer rules if you sell, and different tax questions — not a reason to pitch a “$0 down” outcome in this chat.\n\nWhich of those structures were you already shown, and who would own the equipment in that version?",
  },
  "tax-credit": {
    topicId: "tax-credit",
    links: [
      { href: IRS_CREDIT_HREF, label: "IRS residential clean energy credit" },
      { href: SOURCES_HREF, label: "Sources" },
    ],
    text: "There is a federal residential clean energy credit published by the IRS. I will not quote a percentage, a dollar amount, or whether your household qualifies — that depends on the IRS rules, your tax situation, and who owns the system. Read the IRS page, then our Sources page for how this site handles numbers.\n\nHave you already been told a credit figure you do not fully trust?",
  },
  "roof-shade": {
    topicId: "roof-shade",
    text: "Readiness is mostly: remaining roof life, what the covering is, how much shade sits on the south and west planes after leaf-out, and whether you own the home. A February photo can hide May shade. I will not invent a remaining-life number or a production estimate for your house.\n\nWhat do you already know about the roof’s age and the trees — or is that still a guess?",
  },
  consult: {
    topicId: "consult",
    links: [{ href: CONSULT_HREF, label: "Book a consult" }],
    text: "A consult here is an optional conversation with Anthony about your situation — the bill, the roof, and the claims you do not trust yet. It is not a marketplace of bids and not a ZIP wizard. Education stays on the site either way. Whether a consult can be booked is decided on the consult form, not in this chat.\n\nWhat would you want that conversation to settle first?",
  },
  savings: {
    topicId: "savings",
    links: [{ href: SOURCES_HREF, label: "Sources" }],
    text: "I don’t have a sourced savings figure for your house, and I will not invent one. A written number from a walk of your own roof is the only local figure that matters.\n\nWhat is actually going on with the bill that started this look?",
  },
  price: {
    topicId: "price",
    links: [{ href: SOURCES_HREF, label: "Sources" }],
    text: "I don’t have a sourced city price or a dollar-per-watt figure to quote, and this chat will not invent one. See Sources for how we handle numbers.\n\nIs the open question really the price — or the roof, the bill, or a claim you already heard?",
  },
  warranty: {
    topicId: "warranty",
    links: [{ href: SOURCES_HREF, label: "Sources" }],
    text: "I don’t have a sourced warranty length to quote. What is warranted — modules, inverters, roof penetrations, workmanship — belongs in a written contract, not a chat.\n\nWhat warranty line were you already told that you do not fully trust?",
  },
  timeline: {
    topicId: "timeline",
    links: [{ href: SOURCES_HREF, label: "Sources" }],
    text: "I don’t have a sourced install timeline to quote, and I will not invent weeks or a “before winter” promise.\n\nWhat would you want to be true a year from now if you did move forward — or is timing not the real question?",
  },
  "zero-down": {
    topicId: "zero-down",
    text: "“$0 down” is a phrase people arrive with, not a guarantee I can make. Some ownership structures advertise little or no money at signing; that is not the same as free, and it is not the same as you owning the equipment. I will not pitch a $0-down outcome here.\n\nWere you shown cash, a loan, a lease, a PPA, or something else — and who would own the system in that version?",
  },
  identity: {
    topicId: "identity",
    links: [{ href: "/about/", label: "About" }],
    text: "SolarLists is an education site. It is not SunPower.com and not A Team Contracting. A Team is a separate exterior-cleaning business. Optional consults, when they happen, are with Anthony.\n\nWhat did you want to understand first — the bill, the roof, or a claim you already heard?",
  },
};

type TopicRule = {
  id: keyof typeof replies;
  keywords: string[];
};

const topicRules: TopicRule[] = [
  {
    id: "identity",
    keywords: [
      "a team",
      "ateam",
      "sunpower.com",
      "are you sunpower",
      "is this sunpower",
      "who writes",
      "who are you",
      "is this a solar company",
    ],
  },
  {
    id: "tax-credit",
    keywords: [
      "tax credit",
      "itc",
      "irs",
      "incentive",
      "federal credit",
      "residential clean energy",
    ],
  },
  {
    id: "zero-down",
    keywords: ["$0 down", "0 down", "zero down", "no money down"],
  },
  {
    id: "savings",
    keywords: [
      "how much will i save",
      "how much would i save",
      "savings",
      "save me",
      "save $",
      "guaranteed savings",
      "lower my bill by",
      "percent off",
    ],
  },
  {
    id: "price",
    keywords: [
      "how much does",
      "cost in",
      "price in",
      "city price",
      "dollar per watt",
      "$/w",
      "per watt",
      "what does solar cost",
      "how much is solar",
    ],
  },
  {
    id: "warranty",
    keywords: ["warranty", "warranties", "how long is it covered"],
  },
  {
    id: "timeline",
    keywords: [
      "how long to install",
      "install timeline",
      "weeks until",
      "installed by",
      "how fast can",
      "how soon can you install",
    ],
  },
  {
    id: "ownership",
    keywords: [
      "tpo",
      "third-party",
      "third party",
      "lease",
      "ppa",
      "loan",
      "cash purchase",
      "who owns",
      "ownership",
      "buy the system",
    ],
  },
  {
    id: "how-it-works",
    keywords: [
      "how solar works",
      "how does solar",
      "how do solar",
      "how panels",
      "net meter",
      "electricity",
      "grid",
    ],
  },
  {
    id: "roof-shade",
    keywords: [
      "roof",
      "shade",
      "shingle",
      "trees",
      "south facing",
      "south-facing",
      "leaf-out",
    ],
  },
  {
    id: "consult",
    keywords: [
      "consult",
      "appointment",
      "talk to anthony",
      "book a",
      "what is a consult",
    ],
  },
  {
    id: "bill",
    keywords: ["electric bill", "my bill", "the bill", "utility bill", "rate change"],
  },
  {
    id: "year-from-now",
    keywords: [
      "year from now",
      "twelve months",
      "12 months",
      "want to be true",
    ],
  },
  {
    id: "poor-fit",
    keywords: ["poor fit", "not a fit", "bad fit", "wrong for my house"],
  },
  {
    id: "who-else",
    keywords: ["who else", "spouse", "landlord", "hoa", "partner"],
  },
  {
    id: "already-told",
    keywords: ["already told", "already been told", "do not trust", "don't trust"],
  },
];

function normalize(text: string): string {
  return text.toLowerCase().replace(/[“”]/g, '"').replace(/\s+/g, " ").trim();
}

export function matchTopicId(userText: string): string | null {
  const haystack = normalize(userText);
  if (!haystack) return null;
  for (const rule of topicRules) {
    if (rule.keywords.some((keyword) => haystack.includes(keyword))) {
      return rule.id;
    }
  }
  return null;
}

export function chipsAfter(usedTopicIds: string[]): ChatChip[] {
  const used = new Set(usedTopicIds);
  const remainingNepq = nepqChips.filter((chip) => !used.has(chip.id));
  const remainingEducation = educationChips.filter((chip) => !used.has(chip.id));
  const next = [...remainingNepq.slice(0, 3), ...remainingEducation.slice(0, 2)];
  return next.slice(0, 5);
}

export function getScriptedReply(
  userText: string,
  usedTopicIds: string[] = []
): ScriptedReply {
  const topicId = matchTopicId(userText);
  if (!topicId) {
    return {
      topicId: "unknown",
      text: unknownReply,
      links: [
        { href: SOURCES_HREF, label: "Sources" },
        { href: CONSULT_HREF, label: "Book a consult" },
      ],
      chips: chipsAfter(usedTopicIds),
    };
  }

  const base = replies[topicId];
  return {
    ...base,
    chips: chipsAfter([...usedTopicIds, topicId]),
  };
}

export function shouldOfferConsult(userTurnCount: number): boolean {
  return userTurnCount >= CONSULT_AFTER_TURNS;
}
