/**
 * Scripted education chat — NEPQ *method* in SolarLists voice.
 *
 * Adapt the method only. Do not paste commercial call openers, TPO reopen
 * scripts, or long passages from training PDFs. Curiosity and problem-finding,
 * not a product pitch.
 *
 * Method locks used here:
 * 1. Personalized intro shape: Problem | Solution | Question
 *    (“You know how… / What this helps with is… / question”).
 * 2. Status frame: name the gap (now vs want). Next steps only if it might fit.
 * 3. Engagement order: situation → problem awareness → solution awareness →
 *    consequence → qualify → soft consult.
 * 4. Concerns, not objections: Clarify → Discuss → Diffuse. No rebuttal,
 *    no feel-felt-found, no arguing price with facts.
 * 5. Early “send me a quote / info / proposal”: ask what they hope to see
 *    and situation questions first. Do not dump pricing.
 * 6. Cite-or-omit: no invented savings, city prices, timelines, warranties,
 *    $0-down pitches, or uncited “locks the rate” / rebate promises.
 *
 * Soft-close to /consult/ only after understanding turns (see shouldOfferConsult).
 * Unknown or number-seeking answers point at /sources/.
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

const sourcesLink: ChatLink = { href: SOURCES_HREF, label: "Sources" };
const irsLink: ChatLink = {
  href: IRS_CREDIT_HREF,
  label: "IRS residential clean energy credit",
};

export const openerMessage =
  "You know how an electric bill can jump — or the line items still don’t read like English — and you’re left wondering what actually changed?\n\nWhat this helps with is naming the gap: where the bill or the house is now, versus what you’d want to be true, before anyone talks about a quote.\n\nWhat’s the part that started this look?";

export const unknownReply =
  "I don’t have a sourced answer for that yet — see Sources rather than a number I would invent.\n\nWhat’s actually going on with the bill, the roof, or a claim you already heard — the part that started this look?";

export const consultOfferLine =
  "If it still might be a fit after what you’ve named — not a stack of bids — you can book a consult.";

/** Turns of user understanding before the soft consult CTA appears. */
export const CONSULT_AFTER_TURNS = 2;

/** Situation-first opener chips. Engagement order continues in chipsAfter(). */
export const openerChips: ChatChip[] = [
  {
    id: "bill",
    label: "The bill",
    prompt: "What’s actually going on with my electric bill?",
  },
  {
    id: "rate-hike",
    label: "Rate went up",
    prompt:
      "My utility raised the rate and I’m trying to understand what changed.",
  },
  {
    id: "charges",
    label: "Confusing charges",
    prompt: "I don’t understand the charges on my bill.",
  },
  {
    id: "already-told",
    label: "Already told",
    prompt: "Something I was already told that I do not fully trust.",
  },
  {
    id: "who-else",
    label: "Who else",
    prompt: "Who else has to live with this decision?",
  },
];

/** @deprecated Use openerChips. Kept so older imports keep compiling. */
export const nepqChips = openerChips;

const problemChips: ChatChip[] = [
  {
    id: "poor-fit",
    label: "Poor fit",
    prompt: "What would make solar a poor fit for my house?",
  },
  {
    id: "consequence",
    label: "If nothing changes",
    prompt:
      "What if I keep the bill as-is and don’t look at options this year?",
  },
];

const solutionChips: ChatChip[] = [
  {
    id: "year-from-now",
    label: "A year from now",
    prompt:
      "If anything changed this year, what would I want to be true twelve months from now?",
  },
  {
    id: "lock-clarity",
    label: "More clarity",
    prompt:
      "I want to understand my options and get clearer — not a pitch.",
  },
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
];

const qualifyChips: ChatChip[] = [
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
  {
    id: "tax-credit",
    label: "Tax credit",
    prompt: "What should I know about the federal solar tax credit?",
  },
];

/** Follow-up chips in engagement order after the opener. */
export const followUpChips: ChatChip[] = [
  ...problemChips,
  ...solutionChips,
  ...qualifyChips,
];

const replies: Record<string, Omit<ScriptedReply, "chips">> = {
  bill: {
    topicId: "bill",
    text: "You know how a bill can spike after a rate change, a hot month, or a neighbor’s story — and those feel like the same problem until you name them?\n\nWhat this helps with is finding the gap: what’s happening on the statement now versus what you’d want a year from now. I will not invent a savings figure to paper over it.\n\nIs the bill the real reason you started looking, or is something else underneath it?",
  },
  "rate-hike": {
    topicId: "rate-hike",
    text: "You know how a utility can raise the rate and the total still doesn’t explain itself?\n\nWhat this helps with is getting clear on what actually changed — the rate, a new charge, or just a higher number — and what options exist to understand. That is not a promise that anything locks a rate forever, and I will not invent a rebate or a savings figure.\n\nWhen the last hike showed up, was it the rate itself, a charge you didn’t recognize, or a total you couldn’t map?",
  },
  charges: {
    topicId: "charges",
    text: "You know how a statement can stack delivery, supply, and extra fees that don’t feel like “the electricity you used”?\n\nWhat this helps with is slowing down enough to name which line is confusing, before anyone jumps to a product.\n\nWhich part doesn’t make sense — the rate, a charge you didn’t expect, or the way the total was built?",
  },
  "year-from-now": {
    topicId: "year-from-now",
    text: "There’s usually a gap between the bill you have now and what you’d want to be true if anything changed.\n\nOwning equipment, a calmer statement, or “I never want another sales visit” are different versions of that gap. A contract has to match the one you actually care about — not a slogan.\n\nIf anything did change this year, what would you want to be true twelve months from now?",
  },
  "poor-fit": {
    topicId: "poor-fit",
    text: "A neighbor going ahead doesn’t make your house a fit. Roof life, shade, who owns the home, and how long you plan to stay are ordinary filters — and a next step only matters if those still leave room.\n\nWhat would make solar a poor fit for your house, even if someone on the street already signed?",
  },
  "who-else": {
    topicId: "who-else",
    text: "A spouse, a landlord, an HOA, or a buyer later can all change what “yes” would even mean.\n\nIf they are not in the room, it helps to write down what they will ask before anyone talks next steps.\n\nWho else has to live with this decision?",
  },
  "already-told": {
    topicId: "already-told",
    text: "Most people arrive with a number, a warranty line, or a “$0 down” phrase they don’t fully trust yet.\n\nWhat this helps with is unpacking that claim — not replacing it with another one I invent.\n\nWhat have you already been told that still doesn’t sit right?",
  },
  "how-it-works": {
    topicId: "how-it-works",
    text: "At a high level: panels on a sound roof turn sunlight into electricity for the house. Extra production typically goes out through the utility meter under that utility’s rules; night and dark weather still draw from the grid unless you have storage. Shade, orientation, and the roof’s condition change whether that picture is even relevant. I will not invent production for your house.\n\nWhich part of that — the roof, the bill, or the utility piece — is the one you want to sit with first?",
  },
  ownership: {
    topicId: "ownership",
    text: "Cash and a loan usually mean you own the equipment. A lease, a PPA, and other third-party ownership usually mean someone else owns it and you pay for the power or the use of the system. Those are different contracts and different questions if you sell — not a reason to pitch a “$0 down” outcome here.\n\nWhich of those were you already shown, and who would own the equipment in that version?",
  },
  "tax-credit": {
    topicId: "tax-credit",
    links: [irsLink, sourcesLink],
    text: "There is a federal residential clean energy credit published by the IRS. I will not quote a percentage, a dollar amount, or whether your household qualifies — that depends on the IRS rules, your tax situation, and who owns the system. I also will not treat a rebate as a promise. Read the IRS page, then Sources for how this site handles numbers.\n\nHave you already been told a credit figure you do not fully trust?",
  },
  "roof-shade": {
    topicId: "roof-shade",
    text: "Readiness is mostly remaining roof life, the covering, how much shade sits on the sun-facing planes after the trees leaf out, and whether you own the home. A winter photo can hide summer shade. I will not invent a remaining-life number or a production estimate.\n\nWhat do you already know about the roof’s age and the trees — or is that still a guess?",
  },
  consult: {
    topicId: "consult",
    text: "A consult here is an optional conversation with a professional solar consultant about your situation — the bill, the roof, and the claims you do not trust yet. It is not a marketplace of bids and not a ZIP wizard. Education stays on the site either way. A next step only makes sense if it might be a fit; the form decides eligibility, not this chat.\n\nWhat would you want that conversation to settle first?",
  },
  consequence: {
    topicId: "consequence",
    links: [sourcesLink],
    text: "If nothing about the bill changed for another year, would that be fine — or is there a part of the current statement you’d rather not keep guessing at?\n\nI will not invent a future rate or a savings figure. See Sources.\n\nWhat’s the piece you’d still want clearer if you did nothing else this month?",
  },
  "lock-clarity": {
    topicId: "lock-clarity",
    links: [sourcesLink],
    text: "A lot of people are looking for clarity more than a product: what the options are, what would actually change on the bill, and what still depends on the utility.\n\nI don’t have a sourced claim that anything locks a rate permanently, and I will not promise a government rebate. See Sources.\n\nWhat would “clearer” need to mean for you — understanding the charges, knowing who would own the equipment, or something else?",
  },
  "lock-rate": {
    topicId: "lock-rate",
    links: [sourcesLink],
    text: "I don’t have a sourced claim that solar locks a utility rate permanently, and I will not treat that as a fact here. See Sources.\n\nWhat would “locked in” need to mean for you — a clearer monthly picture, fewer surprise hikes, or something you already heard?",
  },
  "quote-early": {
    topicId: "quote-early",
    links: [sourcesLink],
    text: "When you ask for a quote, a proposal, or “just the info,” what are you hoping that would show you — a price, a yes/no on the roof, or something you can set next to a claim you already heard?\n\nI won’t dump pricing here. See Sources for how numbers are handled.\n\nWhat’s going on with the bill or the house that made a quote feel like the next step?",
  },
  savings: {
    topicId: "savings",
    links: [sourcesLink],
    text: "When you ask what you’d save, what are you hoping that number would settle — whether this is even worth a look, or a comparison to something you already heard?\n\nI don’t have a sourced savings figure for your house, and I will not invent one. See Sources. A written number from a walk of your own roof is the only local figure that matters.\n\nWhat’s actually going on with the bill that started this look?",
  },
  price: {
    topicId: "price",
    links: [sourcesLink],
    text: "When you bring up price, what do you mean by that — a number you already heard, a monthly comparison to the bill, or just wanting to know if this is in range?\n\nI won’t argue that with a figure from this chat, and I don’t have a sourced city price or dollar-per-watt figure to quote. See Sources.\n\nIs the open question really the price — or the roof, the bill, or a claim you don’t trust yet?",
  },
  warranty: {
    topicId: "warranty",
    links: [sourcesLink],
    text: "When you mention a warranty, what line were you already told — modules, inverters, the roof, or workmanship?\n\nI don’t have a sourced warranty length to quote. What is warranted belongs in a written contract, not a chat. See Sources.\n\nWhich of those is the one that still doesn’t sit right?",
  },
  timeline: {
    topicId: "timeline",
    links: [sourcesLink],
    text: "When you ask about timing, what are you hoping to protect — a season, a roof project, or just not wanting this to drag?\n\nI don’t have a sourced install timeline, and I will not invent weeks or a “before winter” promise. See Sources.\n\nWhat would you want to be true a year from now if you did move forward — or is timing not the real question?",
  },
  "zero-down": {
    topicId: "zero-down",
    text: "“$0 down” is a phrase people arrive with, not a guarantee I can make. Some structures advertise little or no money at signing; that is not the same as free, and not the same as you owning the equipment. I will not pitch a $0-down outcome here.\n\nWere you shown cash, a loan, a lease, a PPA, or something else — and who would own the system in that version?",
  },
  "think-about-it": {
    topicId: "think-about-it",
    text: "When you say you need to think about it, what is the part that’s still open — the bill, the house, who else decides, or a number you don’t trust?\n\nThat’s a real pause, not something to talk you out of. We can stay with the open part.\n\nWhich of those is the one you’d want clearer before any next step?",
  },
  identity: {
    topicId: "identity",
    links: [{ href: "/about/", label: "About" }],
    text: "SolarLists is an education site. It is not SunPower.com and not A Team Contracting. A Team is a separate exterior-cleaning business. Optional consults, when they happen, are with a professional solar consultant.\n\nWhat did you want to understand first — the bill, the roof, or a claim you already heard?",
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
    id: "quote-early",
    keywords: [
      "send me a quote",
      "send me a proposal",
      "send me a price",
      "send me info",
      "send me information",
      "send me the info",
      "email me a quote",
      "email me info",
      "email me a proposal",
      "just send me",
      "can you quote",
      "i want a quote",
      "i need a quote",
      "give me a quote",
      "want a quote",
      "need a quote",
      "want a proposal",
      "need a proposal",
      "just the info",
      "just send info",
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
    id: "lock-rate",
    keywords: [
      "lock in my rate",
      "lock my rate",
      "lock the rate",
      "locks your rate",
      "lock in the rate",
      "rate permanently",
      "locks the rate",
      "government rebate",
      "gov rebate",
      "gov't rebate",
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
      "too expensive",
      "that's a lot",
      "thats a lot",
      "sounds expensive",
      "how much does",
      "cost in",
      "price in",
      "city price",
      "dollar per watt",
      "$/w",
      "per watt",
      "what does solar cost",
      "how much is solar",
      "what's the price",
      "whats the price",
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
    id: "think-about-it",
    keywords: [
      "think about it",
      "need to think",
      "i'll think",
      "ill think",
      "let me think",
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
      "talk to a consultant",
      "book a",
      "what is a consult",
    ],
  },
  {
    id: "rate-hike",
    keywords: [
      "rate hike",
      "raised the rate",
      "rates went up",
      "rate went up",
      "utility raised",
      "rate increase",
      "raised rates",
    ],
  },
  {
    id: "charges",
    keywords: [
      "confusing charges",
      "don't understand the charges",
      "dont understand the charges",
      "charges on my bill",
      "delivery charge",
      "line item",
      "riders",
      "fees on my bill",
      "don't understand my bill",
      "dont understand my bill",
    ],
  },
  {
    id: "lock-clarity",
    keywords: [
      "understand my options",
      "get clearer",
      "more clarity",
      "not a pitch",
    ],
  },
  {
    id: "consequence",
    keywords: [
      "if nothing changes",
      "keep the bill as-is",
      "keep the bill as is",
      "if i do nothing",
      "don't look at options",
      "dont look at options",
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
  const remainingOpener = openerChips.filter((chip) => !used.has(chip.id));
  const remainingFollowUp = followUpChips.filter((chip) => !used.has(chip.id));
  // Keep leftover situation chips first, then problem → solution → qualify.
  return [...remainingOpener, ...remainingFollowUp].slice(0, 5);
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
      links: [sourcesLink],
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
