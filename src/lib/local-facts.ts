import type { City } from "@/config/site";
import type { Faq } from "@/lib/editorial";

export type SourceLink = { label: string; url: string };

export type LocalFacts = {
  utility: string;
  utilityNote: string;
  utilityLinks: SourceLink[];
  permitAuthority: string;
  permitNote: string;
  permitLinks: SourceLink[];
  faqs: Faq[];
};

/** Statewide net-metering sources (PUCO + Ohio Administrative Code). */
export const ohioNetMetering = {
  summary:
    "Ohio net metering is set by Ohio Administrative Code 4901:1-10-28. PUCO says the generator must be on your own premises, interconnected to your electric utility, and intended primarily to offset part or all of your own use (up to 120%). Excess generation becomes a bill credit. You apply for interconnection with your utility first, then request its net metering tariff. Under the rule, a homeowner who hosts or leases third-party-owned equipment still counts as a customer-generator.",
  links: [
    {
      label: "PUCO — Net metering",
      url: "https://puco.ohio.gov/utilities/electricity/resources/net-metering",
    },
    {
      label: "Ohio Adm. Code 4901:1-10-28",
      url: "https://codes.ohio.gov/ohio-administrative-code/rule-4901%3A1-10-28",
    },
  ] as SourceLink[],
};

const aesLinks: SourceLink[] = [
  { label: "AES Ohio — Net metering", url: "https://www.aes-ohio.com/net-metering" },
  { label: "AES Ohio — Interconnection", url: "https://www.aes-ohio.com/interconnection" },
];

const mcbr: SourceLink = {
  label: "Montgomery County Building Regulations",
  url: "https://www.selectmcohio.com/building/",
};

const facts: Record<string, LocalFacts> = {
  "dayton-oh": {
    utility: "AES Ohio",
    utilityNote:
      "AES Ohio publishes its own net metering and interconnection pages. Interconnection is approved before net metering starts.",
    utilityLinks: aesLinks,
    permitAuthority: "City of Dayton Building Inspection Division",
    permitNote:
      "Dayton issues its own building and electrical permits. The city says a licensed electrician registered with the City of Dayton applies for the electrical permit. Townships outside the city limits use Montgomery County Building Regulations instead.",
    permitLinks: [
      { label: "City of Dayton — Building permit FAQ", url: "https://www.daytonohio.gov/faq.aspx?TID=18" },
      mcbr,
    ],
    faqs: [
      {
        question: "Who issues solar permits inside Dayton city limits?",
        answer:
          "The City of Dayton Building Inspection Division. Addresses in surrounding townships use Montgomery County Building Regulations. Check which jurisdiction your parcel is in before you sign anything.",
      },
      {
        question: "Who pulls the electrical permit for a Dayton solar job?",
        answer:
          "The City of Dayton says a licensed electrician registered with the city applies for the electrical permit. A homeowner can only apply in narrow owner-occupied, do-it-yourself cases.",
      },
      {
        question: "Does AES Ohio net meter rooftop solar in Dayton?",
        answer:
          "AES Ohio publishes a net metering page and an interconnection application. Ohio rules require the system to be interconnected first. Read AES Ohio’s current pages for its forms and fees.",
      },
    ],
  },
  "vandalia-oh": {
    utility: "AES Ohio",
    utilityNote: "Confirm AES Ohio on your bill, then use its interconnection application before installing.",
    utilityLinks: aesLinks,
    permitAuthority: "City of Vandalia Building Inspection (Development and Engineering Services)",
    permitNote:
      "Vandalia reviews residential plans itself and requires electric permits. The city asks for residential plans at least two weeks before the intended start and takes submittals electronically through Municity Connect.",
    permitLinks: [{ label: "City of Vandalia — Building Inspection", url: "https://vandaliaohio.org/160/Building-Inspection" }],
    faqs: [
      {
        question: "Who reviews solar plans for a Vandalia home?",
        answer:
          "The City of Vandalia’s Building Inspection staff in Development and Engineering Services. Vandalia lists residential construction and electric among required permits.",
      },
      {
        question: "How far ahead should Vandalia plans be submitted?",
        answer:
          "The city recommends submitting residential plans at least two weeks before the intended start date. Reviews go in the order received.",
      },
      {
        question: "How are Vandalia permit applications submitted?",
        answer: "Electronically, through Municity Connect, per the city’s Building Inspection page.",
      },
    ],
  },
  "beavercreek-oh": {
    utility: "AES Ohio",
    utilityNote: "Confirm AES Ohio on your bill, then use its interconnection application before installing.",
    utilityLinks: aesLinks,
    permitAuthority: "Greene County Building Regulation (City of Beavercreek handles zoning)",
    permitNote:
      "Beavercreek is in Greene County. Building and electrical permits run through Greene County Building Regulation, while the City of Beavercreek’s online permit center handles zoning permits.",
    permitLinks: [
      { label: "Greene County — Building Regulation", url: "https://www.greenecountyohio.gov/139/Building-Regulation" },
      { label: "City of Beavercreek — Permit Center", url: "https://www.beavercreekohio.gov/142/Online-Permit-Center-Permit-Applications" },
    ],
    faqs: [
      {
        question: "Does the City of Beavercreek issue solar building permits?",
        answer:
          "Building and electrical permits come from Greene County Building Regulation. The city’s permit center is for zoning permits, so a solar job can involve both.",
      },
      {
        question: "Is Beavercreek in Montgomery or Greene County?",
        answer: "Greene County. That is why its building permits do not go through Montgomery County like some Dayton-ring towns.",
      },
      {
        question: "Does an HOA matter for Beavercreek solar?",
        answer:
          "If your home is in an HOA, ask for its written rules before a design is final. This site does not summarize individual HOA rules.",
      },
    ],
  },
  "centerville-oh": {
    utility: "AES Ohio",
    utilityNote: "Confirm AES Ohio on your bill, then use its interconnection application before installing.",
    utilityLinks: aesLinks,
    permitAuthority: "City of Centerville Building Department",
    permitNote:
      "Centerville runs its own building department, certified by the Ohio Board of Building Standards for residential work including electrical. Electrical contractors must register with the city each calendar year. Washington Township addresses outside city limits fall under Montgomery County Building Regulations.",
    permitLinks: [
      { label: "City of Centerville — Building Inspection", url: "https://www.centervilleohio.gov/193/Building-Inspection" },
      mcbr,
    ],
    faqs: [
      {
        question: "Who issues solar permits in Centerville?",
        answer:
          "The City of Centerville Building Department for addresses inside the city. Washington Township addresses are under Montgomery County Building Regulations.",
      },
      {
        question: "Does a Centerville electrical contractor need city registration?",
        answer:
          "Yes. Centerville requires electrical contractors to register with the city every year (January 1 through December 31) and hold a state license.",
      },
      {
        question: "Is Centerville the same permit office as Washington Township?",
        answer: "No. The city has its own building department; the township is covered by Montgomery County.",
      },
    ],
  },
  "cincinnati-oh": {
    utility: "Duke Energy Ohio",
    utilityNote:
      "Duke Energy Ohio has a net metering rider (Rider NM) and an online “Apply for Grid Connection” process for customer generation.",
    utilityLinks: [
      { label: "Duke Energy — Apply for grid connection", url: "https://www.duke-energy.com/home/products/renewable-energy/generate-your-own" },
      { label: "Duke Energy Ohio — Rider NM (PDF)", url: "https://p-cd.duke-energy.com/-/media/pdfs/for-your-home/rates/electric-oh/sheet-no-48-rider-nm.pdf" },
    ],
    permitAuthority: "City of Cincinnati Buildings & Inspections (electrical permits via Inspection Bureau, Inc.)",
    permitNote:
      "Cincinnati requires a building permit for every solar installation, rooftop or ground-mounted, with zoning reviewed in the same process. Electrical permits are issued by Inspection Bureau, Inc. (IBI). Local historic districts can add review.",
    permitLinks: [
      { label: "Cincinnati — Solar PV installations checklist", url: "https://www.cincinnati-oh.gov/buildings/building-permit-forms-applications/application-forms/all-forms-handouts-checklists-alphabetical-list/solar-photovoltaic-installations-checklist-pdf/" },
      { label: "Cincinnati — Solar zoning fact sheet", url: "https://www.cincinnati-oh.gov/oes/buildings-and-energy/solar-and-clean-energy/solar-zoning-fact-sheet/" },
    ],
    faqs: [
      {
        question: "Who issues the electrical permit for solar in Cincinnati?",
        answer:
          "Inspection Bureau, Inc. (IBI) handles electrical permit review and inspection for the City. The building permit comes from Buildings & Inspections, and the city suggests applying for that first.",
      },
      {
        question: "Is rooftop solar allowed in every Cincinnati zoning district?",
        answer:
          "The city’s zoning determination says rooftop and ground-mounted solar are permitted by right in all zoning districts when they meet that district’s standards. Local historic districts may add review.",
      },
      {
        question: "What utility handles Cincinnati solar interconnection?",
        answer:
          "Duke Energy Ohio for most addresses. It publishes a grid-connection application and a net metering rider (Rider NM). Confirm the utility on your bill.",
      },
    ],
  },
  "columbus-oh": {
    utility: "AEP Ohio (some addresses: City of Columbus Division of Power)",
    utilityNote:
      "Many Columbus homes are on AEP Ohio, which asks customers to apply for interconnection before installing generating equipment. Customers of the City of Columbus Division of Power apply to the Division instead; it reviews projects case by case.",
    utilityLinks: [
      { label: "AEP Ohio — Installing generating equipment", url: "https://www.aepohio.com/business/builders/generating-equipment" },
      { label: "Columbus Division of Power — Solar and distributed generation", url: "https://www.columbus.gov/Services/Columbus-Water-Power/About-Columbus-Water-Power/Division-of-Power/The-Division-of-Power/Customer-Owned-Distributed-Energy-Resources" },
    ],
    permitAuthority: "City of Columbus Department of Building and Zoning Services (BZS)",
    permitNote:
      "Columbus BZS requires engineer- or architect-stamped drawings showing the roof can carry the array. A city-registered electrical contractor, not the homeowner, pulls the electrical permit. Historic districts and commission areas can add design review.",
    permitLinks: [
      { label: "Columbus BZS — FAQ (rooftop solar)", url: "https://www.columbus.gov/Business-Development/Building-Zoning-Services/Frequently-Asked-Questions" },
      { label: "Columbus BZS — Documents & forms", url: "https://www.columbus.gov/Business-Development/Building-Zoning-Services/Documents-Forms" },
    ],
    faqs: [
      {
        question: "Do Columbus rooftop solar permits need stamped drawings?",
        answer:
          "Yes. Columbus BZS asks for engineer- or architect-stamped drawings showing the roof can sustain the added weight of the array.",
      },
      {
        question: "Can a Columbus homeowner pull the solar electrical permit?",
        answer: "No. BZS says your city-registered electrical contractor pulls the electrical permit.",
      },
      {
        question: "Is my Columbus home on AEP Ohio or the city’s Division of Power?",
        answer:
          "Many addresses are AEP Ohio, but some are served by the City of Columbus Division of Power, which has its own interconnection application. The utility name on your bill decides which process applies.",
      },
    ],
  },
};

export function localFacts(city: City): LocalFacts | undefined {
  return facts[city.slug];
}

export function localFaqs(city: City): Faq[] {
  return facts[city.slug]?.faqs ?? [];
}
