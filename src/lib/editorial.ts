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
        "SolarLists is an education site. It is not a utility, not a contractor marketplace, and not SunPower.com. Optional consults, when they happen, are with a professional solar consultant.",
    },
    {
      question: "Who writes this site?",
      answer: `${site.authorFormal} writes SolarLists from ${site.authorLocation}. The About page has the full author note and a quiet independent-contractor disclosure.`,
    },
    {
      question: "Do you publish savings numbers or city prices?",
      answer:
        "No invented savings, incentives, warranties, or traffic stats. If a figure is not cited, it is omitted. A written number from a walk of your own roof is the only local price that matters.",
    },
    {
      question: "Who is the consult for?",
      answer:
        "Homeowners in served markets who want to talk through their situation. It is not a “get 3 quotes” marketplace and not a ZIP wizard. Education stays available if you live elsewhere.",
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
      "A published market-report bookmark for later education articles. We do not repeat a dollar-per-watt figure, splits, or commissions on any page today.",
  },
  {
    name: "IRS, Residential Clean Energy Credit",
    href: "https://www.irs.gov/credits-deductions/residential-clean-energy-credit",
    usedFor:
      "The federal credit the education chat may point to. We cite the IRS page without quoting a percentage, a dollar amount, or whether a household qualifies.",
  },
  {
    name: "U.S. Department of Energy, Homeowner's Guide to Solar",
    href: "https://www.energy.gov/cmei/systems/homeowners-guide-solar",
    usedFor:
      "A federal overview of roof fit, ownership paths, and consumer cautions. We will not quote a savings figure, an incentive percentage, or a typical system size from this page.",
  },
  {
    name: "FTC, Solar Power for Your Home",
    href: "https://consumer.ftc.gov/articles/solar-power-your-home",
    usedFor:
      "A consumer-protection briefing on buying, leasing, or buying power from a system. We will not invent a scam-rate statistic or treat this page as a quote.",
  },
  {
    name: "EIA, Solar explained",
    href: "https://www.eia.gov/energyexplained/solar/",
    usedFor:
      "A national primer on how photovoltaic electricity works. We will not invent production, a city yield, or a bill change for your house.",
  },
];

export const editorialRules = [
  {
    id: "cite-or-omit",
    title: "Cite or omit",
    body: "If we cannot point to a published source, we leave the number out. That includes savings claims, dollar-per-watt figures, splits, commissions, incentive dollar amounts, warranty lengths we did not read, install timelines, and traffic stats. A blank on the page is more honest than a confident guess about your roof.",
  },
  {
    id: "homeowner-read",
    title: "What that means if you are reading this as a homeowner",
    body: "If you see a figure here, we can show you where it was published. If you do not see a figure — a city price, a guaranteed savings line, a “before winter” install clock — it is because we would have to invent it. The only local price that matters is a written number from a walk of your own roof. Until then, this site would rather help you name the bill, the roof, and the claim you do not trust yet.",
  },
  {
    id: "last-reviewed",
    title: "How we date-stamp a page",
    body: `Education pages show a last-reviewed date in plain language. The date on this site is ${site.lastReviewedLabel}. That is when we last checked the visible copy against these rules — not a promise that the page is “updated daily,” and not a countdown. If a page is wrong, we correct it and move the stamp. We do not invent a freshness score or a traffic stat to dress the date up.`,
  },
  {
    id: "markets",
    title: "National education, listed consult markets",
    body: "Anyone can read the education. A consult is optional and limited to the served markets named on the Consult page. We check ZIP when you submit. We do not invent a broader ZIP list, a manufacturer service map, or states beyond that list. If you live elsewhere, the articles and the chat stay available.",
  },
  {
    id: "no-theater",
    title: "No urgency theater",
    body: "We do not invent scarcity, countdown clocks, “spots left,” or award-style headlines. Those lines are a pitch, not a source. If a page needs a date, it gets a last-reviewed stamp. If a next step might help, we link quietly to a consult — after you have had room to think.",
  },
  {
    id: "inherits",
    title: "Chat and consult inherit the same rules",
    body: "Ask about solar is a scripted education chat, not a closer. When it does not have a sourced answer — especially a number — it sends you here instead of inventing one. A consult is a conversation about your situation. Neither surface gets to publish a savings claim, a city price, a warranty length, or an install timeline that this page would omit.",
  },
] as const;

export const neverClaimItems = [
  {
    title: "Urgency theater",
    body: "No countdown clocks, invented scarcity, or “act this week” statistics.",
  },
  {
    title: "Fake awards and rankings",
    body: "No “best of” headlines, trophy badges, or star ratings we did not earn as a review site.",
  },
  {
    title: "Invented local prices",
    body: "No city dollar-per-watt, no neighborhood average, no commission or split dressed up as education.",
  },
  {
    title: "Invented savings or warranties",
    body: "No guaranteed bill cut, incentive dollar amount, or warranty length we did not read in a contract.",
  },
  {
    title: "Fake directories and testimonials",
    body: "No installer marketplace, no invented reviews, and no claim that this site is a utility or a manufacturer storefront.",
  },
] as const;

export const sourcesChatLead =
  "Ask about solar — the chat on every education page — uses this page as the brake. It is there to help you name the bill, the roof, or a claim you already heard. It is not there to invent a figure the rest of the site would refuse to print.";

export const sourcesChatBody =
  "If you ask for a savings number, a city price, a warranty length, or an install clock, the chat points here instead of guessing. Soft-close to a consult only appears after a couple of understanding turns, and only as an optional conversation — never as three bids. Eligibility still lives on the consult form, not in the chat.";

export function sourcesFaqs(): Faq[] {
  return [
    {
      question: "What does “cite or omit” mean if I am a homeowner?",
      answer:
        "It means a blank is better than an invented figure. If we cannot point to a published source, we leave savings, city prices, commissions, warranty lengths, and timelines off the page. A written number from a walk of your own roof is the only local price that matters.",
    },
    {
      question: "How do you know when a page was last checked?",
      answer: `Each education page shows a last-reviewed date. The current stamp is ${site.lastReviewedLabel}. That is when we last read the copy against these rules — not a daily-update claim and not a countdown.`,
    },
    {
      question: "Why don’t you publish a price for my city?",
      answer:
        "A city average we invented would be a pitch, not a source. Roof life, shade, ownership, and the utility on your bill change a real number. We bookmark published national material; we do not mint a local price list.",
    },
    {
      question: "Does Ask about solar follow these rules?",
      answer:
        "Yes. The chat is scripted education. When it does not have a sourced answer, it sends you to this page. It will not invent savings, a city price, a warranty, or an install timeline, and it does not decide consult eligibility.",
    },
    {
      question: "Who is a consult for?",
      answer:
        "Homeowners in served markets who want a conversation — not three bids and not a ZIP wizard. Education stays available if you live elsewhere. The consult form checks ZIP when you submit.",
    },
  ];
}

export const consultIsIsnt = [
  {
    title: "Conversation",
    body: "A talk with a professional solar consultant about the bill, the roof, and the questions you already distrust — not a product pitch in the first minute.",
  },
  {
    title: "Not 3 bids",
    body: "This is not a marketplace that shops your name to a stack of companies. You are not requesting three quotes.",
  },
  {
    title: "Not a ZIP wizard",
    body: "ZIP tells us whether a consult is available. It does not unlock a savings estimate or a local price list.",
  },
] as const;

export const consultBringItems = [
  {
    title: "A recent electric bill",
    body: "The statement, or a photo of the charges that still do not read like English. You do not need a perfect file — the confusing line is enough.",
  },
  {
    title: "Roof age and shade notes",
    body: "What you already know about remaining roof life, the covering, and trees on the sun-facing planes. A winter photo can hide summer shade. Guessing is fine if you say it is a guess.",
  },
  {
    title: "The claim you do not trust yet",
    body: "A number, a “$0 down” phrase, a warranty line, or a neighbor’s story. We would rather unpack that than replace it with another claim.",
  },
  {
    title: "Who else has to live with this",
    body: "A spouse, a landlord, an HOA, or a buyer later can change what “yes” means. Write down what they will ask if they are not in the room.",
  },
] as const;

export const consultAfterSteps = [
  {
    title: "We read the ZIP you sent",
    body: "The form checks whether a consult is available for that address. Education on this site does not depend on the result.",
  },
  {
    title: "If you are in a served market, someone replies",
    body: "A professional solar consultant follows up by call, text, or email — not a utility callback and not a marketplace of other companies. We do not publish a clock for that reply.",
  },
  {
    title: "Education stays either way",
    body: "If a consult is not available, the articles, the problem-finding questions, and Ask about solar remain. Nothing about the site turns off.",
  },
] as const;

export function consultFaqs(): Faq[] {
  return [
    {
      question: "What is a consult on this site?",
      answer:
        "An optional conversation with a professional solar consultant about your situation. It is not three bids, not a ZIP wizard, and not a quote marketplace. Education stays on the site whether you book or not.",
    },
    {
      question: "What should I have ready?",
      answer:
        "A recent bill or the charges that confuse you, whatever you already know about roof age and shade, the claim you do not fully trust, and who else has to live with the decision. Skip anything you do not know yet.",
    },
    {
      question: "How do you decide if a consult is available?",
      answer:
        "Consults are for homeowners in the served markets listed on this page. ZIP is checked when you submit. We do not invent a broader map. If you live elsewhere, you can still read the education.",
    },
    {
      question: "What happens after I request a consult?",
      answer:
        "We read the ZIP. If you are in a served market, a professional solar consultant replies by call, text, or email. We do not publish a timeline for that reply. Education stays available either way.",
    },
  ];
}
