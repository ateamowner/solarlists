import { cities, type City } from "@/config/site";
import type { Faq } from "@/lib/editorial";

export type SourceLink = { label: string; url: string };

/**
 * Per-city local facts: utility, net metering, permit office, local cost and incentives.
 * Cite or omit: every sentence maps to a linked official (city, county, utility, state) page.
 * Checked on `localFactsChecked`. No invented fees, rebates, or URLs.
 */
export type LocalFacts = {
  utility: string;
  utilityNote: string;
  utilityLinks: SourceLink[];
  /** Set when the utility is city-owned or a co-op and its own rule sets the bill credit. */
  metering?: { heading: string; note: string; links: SourceLink[] };
  permitAuthority: string;
  permitNote: string;
  permitLinks: SourceLink[];
  /** Published local permit fee or local incentive, only when an official page states it. */
  costNote?: string;
  costLinks?: SourceLink[];
  faqs: Faq[];
};

export const localFactsChecked = "October 26, 2026";

/** Statewide net-metering sources (PUCO + Ohio Administrative Code). */
export const ohioNetMetering = {
  summary:
    "Ohio net metering is set by Ohio Administrative Code 4901:1-10-28. PUCO says the generator must be on your own premises, interconnected to your electric utility, and intended primarily to offset part or all of your own use (up to 120%). Excess generation becomes a bill credit. You apply for interconnection with your utility first, then request its net metering tariff. Under the rule, a homeowner who hosts or leases third-party-owned equipment still counts as a customer-generator.",
  links: [
    {
      label: "PUCO, Net metering",
      url: "https://puco.ohio.gov/utilities/electricity/resources/net-metering",
    },
    {
      label: "Ohio Adm. Code 4901:1-10-28",
      url: "https://codes.ohio.gov/ohio-administrative-code/rule-4901%3A1-10-28",
    },
  ] as SourceLink[],
};

/** Statewide property-tax line (ORC 5709.53(B) + the 5727.01 definition it points to). */
export const ohioTaxExemption = {
  summary:
    "Ohio Revised Code 5709.53(B) exempts from taxation the fixtures and other real property in an energy facility with an aggregate nameplate capacity of 250 kilowatts or less, if construction or installation was completed on or after January 1, 2010. ORC 5727.01 defines an energy facility to include interconnected solar panels. Ask your county auditor how it applies to your parcel. This is not tax advice.",
  links: [
    { label: "Ohio Rev. Code 5709.53", url: "https://codes.ohio.gov/ohio-revised-code/section-5709.53" },
    { label: "Ohio Rev. Code 5727.01 (definitions)", url: "https://codes.ohio.gov/ohio-revised-code/section-5727.01" },
  ] as SourceLink[],
};

const orcMunicipal: SourceLink = {
  label: "Ohio Rev. Code 4905.02 (municipal utilities excluded)",
  url: "https://codes.ohio.gov/ohio-revised-code/section-4905.02",
};

const aesLinks: SourceLink[] = [
  { label: "AES Ohio, Net metering", url: "https://www.aes-ohio.com/net-metering" },
  { label: "AES Ohio, Interconnection", url: "https://www.aes-ohio.com/interconnection" },
];

const dukeLinks: SourceLink[] = [
  { label: "Duke Energy, Apply for grid connection", url: "https://www.duke-energy.com/home/products/renewable-energy/generate-your-own" },
  { label: "Duke Energy Ohio, Rider NM (PDF)", url: "https://p-cd.duke-energy.com/-/media/pdfs/for-your-home/rates/electric-oh/sheet-no-48-rider-nm.pdf" },
];

const aepLinks: SourceLink[] = [
  { label: "AEP Ohio, Installing generating equipment", url: "https://www.aepohio.com/business/builders/generating-equipment" },
];

const feLinks: SourceLink[] = [
  { label: "FirstEnergy, Ohio retail interconnection", url: "https://www.firstenergycorp.com/feconnect/ohio-interconnection/OH-retail-interconnection.html" },
  { label: "FirstEnergy Ohio, Net Energy Metering Rider application (PDF)", url: "https://www.firstenergycorp.com/content/dam/feconnect/files/retail/oh/OH-Net-Metering-Rider-Application.pdf" },
];

const mcbr: SourceLink = {
  label: "Montgomery County Building Regulations",
  url: "https://www.selectmcohio.com/building/",
};

const greeneBldg: SourceLink = {
  label: "Greene County, Building Regulation",
  url: "https://www.greenecountyohio.gov/139/Building-Regulation",
};

const miamiBldg: SourceLink = {
  label: "Miami County, Building information",
  url: "https://www.miamicountyohio.gov/building-information/",
};

const warrenSolar: SourceLink = {
  label: "Warren County Building & Zoning, Solar FAQ",
  url: "https://www.warrencountyohio.gov/bldginsp/BuildingElectrical/FAQSolar/Index",
};

const ibi: SourceLink = {
  label: "The Inspection Bureau, Inc. (electrical)",
  url: "https://www.inspectionbureau.com/",
};

const ketteringSolar: SourceLink = {
  label: "City of Kettering, Residential roof-mounted solar",
  url: "https://www.ketteringoh.org/residential-roof-mounted-solar-panel-array/",
};

const southCentral: SourceLink[] = [
  { label: "South Central Power, Net billing FAQ", url: "https://www.southcentralpower.com/faqs/does-south-central-power-company-use-net-billing-or-net-metering/" },
  { label: "South Central Power, Member-owned solar", url: "https://www.southcentralpower.com/services/renewable-resources/member-owned-solar/" },
];

const confirmAes = "Confirm AES Ohio on your bill, then use its interconnection application before installing.";
const confirmDuke = "Confirm Duke Energy Ohio on your bill, then apply for grid connection before installing. Duke Energy Ohio's net metering terms are in its Rider NM.";
const confirmAep = "Confirm AEP Ohio on your bill. AEP Ohio asks customers to apply for interconnection before installing generating equipment.";

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
      { label: "City of Dayton, Building permit FAQ", url: "https://www.daytonohio.gov/faq.aspx?TID=18" },
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
    permitLinks: [{ label: "City of Vandalia, Building Inspection", url: "https://vandaliaohio.org/160/Building-Inspection" }],
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
      { label: "Greene County, Building Regulation", url: "https://www.greenecountyohio.gov/139/Building-Regulation" },
      { label: "City of Beavercreek, Permit Center", url: "https://www.beavercreekohio.gov/142/Online-Permit-Center-Permit-Applications" },
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
      { label: "City of Centerville, Building Inspection", url: "https://www.centervilleohio.gov/193/Building-Inspection" },
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
      { label: "Duke Energy, Apply for grid connection", url: "https://www.duke-energy.com/home/products/renewable-energy/generate-your-own" },
      { label: "Duke Energy Ohio, Rider NM (PDF)", url: "https://p-cd.duke-energy.com/-/media/pdfs/for-your-home/rates/electric-oh/sheet-no-48-rider-nm.pdf" },
    ],
    permitAuthority: "City of Cincinnati Buildings & Inspections (electrical permits via Inspection Bureau, Inc.)",
    permitNote:
      "Cincinnati requires a building permit for every solar installation, rooftop or ground-mounted, with zoning reviewed in the same process. Electrical permits are issued by Inspection Bureau, Inc. (IBI). Local historic districts can add review.",
    permitLinks: [
      { label: "Cincinnati, Solar PV installations checklist", url: "https://www.cincinnati-oh.gov/buildings/building-permit-forms-applications/application-forms/all-forms-handouts-checklists-alphabetical-list/solar-photovoltaic-installations-checklist-pdf/" },
      { label: "Cincinnati, Solar zoning fact sheet", url: "https://www.cincinnati-oh.gov/oes/buildings-and-energy/solar-and-clean-energy/solar-zoning-fact-sheet/" },
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
      { label: "AEP Ohio, Installing generating equipment", url: "https://www.aepohio.com/business/builders/generating-equipment" },
      { label: "Columbus Division of Power, Solar and distributed generation", url: "https://www.columbus.gov/Services/Columbus-Water-Power/About-Columbus-Water-Power/Division-of-Power/The-Division-of-Power/Customer-Owned-Distributed-Energy-Resources" },
    ],
    permitAuthority: "City of Columbus Department of Building and Zoning Services (BZS)",
    permitNote:
      "Columbus BZS requires engineer- or architect-stamped drawings showing the roof can carry the array. A city-registered electrical contractor, not the homeowner, pulls the electrical permit. Historic districts and commission areas can add design review.",
    permitLinks: [
      { label: "Columbus BZS, FAQ (rooftop solar)", url: "https://www.columbus.gov/Business-Development/Building-Zoning-Services/Frequently-Asked-Questions" },
      { label: "Columbus BZS, Documents & forms", url: "https://www.columbus.gov/Business-Development/Building-Zoning-Services/Documents-Forms" },
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
  "kettering-oh": {
    utility: "AES Ohio",
    utilityNote: confirmAes,
    utilityLinks: aesLinks,
    permitAuthority: "City of Kettering Planning & Development",
    permitNote:
      "Kettering says the Residential Code of Ohio and its zoning code require structural, electrical and zoning plan approval for solar arrays, and the city coordinates all three reviews from one structural permit application filed online through Access Kettering. It asks for a sealed letter from a design professional that the roof framing can carry the array, a panel layout with distances to ridge and edges, and plans showing panels no more than 8 inches above the roof. Kettering zoning does not allow mounting on a mansard roof.",
    permitLinks: [
      ketteringSolar,
      { label: "City of Kettering, Residential construction", url: "https://www.ketteringoh.org/residential-construction/" },
    ],
    costNote:
      "Kettering lists a single $45 fee for a residential roof-mounted solar permit. Its residential construction page notes the State of Ohio adds 1% to Kettering and Oakwood residential structure and electric permits.",
    costLinks: [ketteringSolar],
    faqs: [
      {
        question: "What does a Kettering solar permit cost?",
        answer:
          "The City of Kettering lists a single $45 fee for a residential roof-mounted solar array, which covers its coordinated structural, electrical and zoning review. The state adds a 1% fee to residential structure and electric permits.",
      },
      {
        question: "What does Kettering need with a solar permit application?",
        answer:
          "A sealed letter from a design professional that the roof framing is adequate, a panel layout drawing with distances to the ridge and roof edges, the manufacturer's installation specifications, and a note that panels sit no more than 8 inches above the roof.",
      },
      {
        question: "Can solar go on a mansard roof in Kettering?",
        answer:
          "No. Kettering's zoning standard for accessory solar devices says they shall not be mounted to a mansard roof, and on pitched roofs they may not extend more than 8 inches from the roof.",
      },
    ],
  },
  "huber-heights-oh": {
    utility: "AES Ohio",
    utilityNote: confirmAes,
    utilityLinks: aesLinks,
    permitAuthority: "Montgomery County Building Regulations (Huber Heights uses it as its building department)",
    permitNote:
      "Huber Heights says it uses the Montgomery County Building Department as its own, and lists solar panels and electrical wiring among the items that need a county permit and inspection. The city's zoning FAQ says the panels themselves do not need a city zoning permit; a new structure built to support panels needs a city Accessory Structure permit.",
    permitLinks: [
      { label: "City of Huber Heights, Permits", url: "https://hhoh.org/357/Permits" },
      { label: "City of Huber Heights, Zoning permit FAQs", url: "https://hhoh.org/661/FAQs-about-Zoning-Permits" },
      mcbr,
    ],
    costNote:
      "If a ground or support structure needs a city zoning permit, Huber Heights lists a $30 application fee for each permit. County building permit fees are set by Montgomery County.",
    costLinks: [{ label: "City of Huber Heights, Permits", url: "https://hhoh.org/357/Permits" }],
    faqs: [
      {
        question: "Who issues solar permits in Huber Heights?",
        answer:
          "Montgomery County Building Regulations. Huber Heights uses the county building department as its own, and the city lists solar panels among the items that need a county permit and inspection.",
      },
      {
        question: "Does Huber Heights require a zoning permit for rooftop solar?",
        answer:
          "Not for the panels themselves, per the city's zoning FAQ. If you build a new structure specifically to support panels, apply for a city Accessory Structure permit.",
      },
      {
        question: "Is the county permit portal online?",
        answer:
          "Yes. Montgomery County Building Regulations says it takes all residential and commercial submissions through its online portal.",
      },
    ],
  },
  "fairborn-oh": {
    utility: "AES Ohio",
    utilityNote: confirmAes,
    utilityLinks: aesLinks,
    permitAuthority: "City of Fairborn Building Department",
    permitNote:
      "Greene County Building Regulation says it covers every Greene County city except Fairborn and Xenia, so Fairborn issues its own permits. Fairborn's solar PV checklist calls for a zoning permit and a solar PV permit (the building permit is included with the solar permit), plus a site plan, an electrical diagram, and spec sheets and manuals for modules, inverters, disconnects and racking. Contractors register with the city. Fairborn lists the 2019 Residential Code of Ohio with amendments and the 2023 National Electrical Code.",
    permitLinks: [
      { label: "City of Fairborn, Solar PV permitting checklist (PDF)", url: "https://cms2.revize.com/revize/fairborn/Solar%20PV%20Requirements%20Checklist_forms%20fillable.pdf?t=202601230847240" },
      { label: "City of Fairborn, Applications, permits & fees", url: "https://www.fairbornoh.gov/government/development_services/building_code___inspection_division/applications_permits___fees.php" },
      greeneBldg,
    ],
    costNote: "Fairborn's checklist lists a residential solar PV permit at $60 plus $3 per panel or inverter.",
    costLinks: [
      { label: "City of Fairborn, Solar PV permitting checklist (PDF)", url: "https://cms2.revize.com/revize/fairborn/Solar%20PV%20Requirements%20Checklist_forms%20fillable.pdf?t=202601230847240" },
    ],
    faqs: [
      {
        question: "How much is a residential solar permit in Fairborn?",
        answer: "Fairborn's solar PV checklist lists $60 plus $3 per panel or inverter for a residential system.",
      },
      {
        question: "Does Greene County issue Fairborn solar permits?",
        answer:
          "No. Greene County Building Regulation excludes Fairborn City, so Fairborn's own building department issues the zoning permit and the solar PV permit.",
      },
      {
        question: "What documents does Fairborn want with a solar application?",
        answer:
          "A site plan showing major components, an electrical diagram (PV and any storage configuration, wiring, overcurrent protection, inverter, disconnects, signs, and the AC connection), and spec sheets and manuals for every manufactured part.",
      },
    ],
  },
  "miamisburg-oh": {
    utility: "AES Ohio",
    utilityNote: confirmAes,
    utilityLinks: aesLinks,
    permitAuthority: "City of Miamisburg Building Department",
    permitNote:
      "Miamisburg says its Building Department is certified by the Ohio Board of Building Standards for commercial and residential work, including electrical, and its chief building official reviews residential plans before a permit is issued. Applications and inspection requests go through the City Squared portal. Plumbing permits are the one trade the city does not issue.",
    permitLinks: [
      { label: "City of Miamisburg, Building, permitting and inspection", url: "https://cityofmiamisburg.com/building-permitting-and-inspection/" },
      { label: "City of Miamisburg, Development", url: "https://cityofmiamisburg.com/departments/development/" },
    ],
    faqs: [
      {
        question: "Who reviews solar plans in Miamisburg?",
        answer:
          "The City of Miamisburg Building Department. Its chief building official reviews residential plans before a permit is issued, and the department is state-certified for residential electrical work.",
      },
      {
        question: "How do I apply for a Miamisburg electrical permit?",
        answer: "Through the city's City Squared portal, which also takes inspection requests.",
      },
      {
        question: "Who can answer whether my Miamisburg project needs approval?",
        answer: "The city asks you to call (937) 847-6532 if you are not sure an approval is required.",
      },
    ],
  },
  "xenia-oh": {
    utility: "AES Ohio",
    utilityNote: confirmAes,
    utilityLinks: aesLinks,
    permitAuthority: "City of Xenia (not Greene County Building Regulation)",
    permitNote:
      "Greene County Building Regulation says it provides permit and inspection services for all Greene County cities and villages except Fairborn, Xenia and a few villages. Addresses inside Xenia city limits go through the City of Xenia's own permit process.",
    permitLinks: [
      greeneBldg,
      { label: "City of Xenia, Permits", url: "https://www.cityofxenia.org/o/xeniacity/page/xenia-permits" },
    ],
    faqs: [
      {
        question: "Does Greene County issue solar permits in Xenia?",
        answer:
          "Not inside city limits. Greene County Building Regulation lists Xenia City among the jurisdictions it does not serve, so Xenia addresses use the city's permit process.",
      },
      {
        question: "What about Xenia Township addresses?",
        answer:
          "Unincorporated township parcels are not in the city. Greene County Building Regulation covers Greene County outside the excluded cities and villages; confirm your jurisdiction on the county auditor's parcel record.",
      },
      {
        question: "Which utility handles Xenia interconnection?",
        answer: "AES Ohio for most homes. Use its interconnection application before installing, and confirm the name on your bill.",
      },
    ],
  },
  "springfield-oh": {
    utility: "Ohio Edison (FirstEnergy) or the utility printed on your bill",
    utilityNote:
      "Springfield's own electrical permit application asks for an Ohio Edison account (DR) number, and FirstEnergy reports Ohio Edison customers in the Springfield area. FirstEnergy takes Ohio interconnection requests online; after the system is approved and installed, you file its Net Energy Metering Rider application.",
    utilityLinks: [
      ...feLinks,
      { label: "FirstEnergy, Ohio Edison upgrades in Clark County", url: "https://www.firstenergycorp.com/newsroom/news_articles/oe-power-upgrades-will-support-manufacturing-and-boost-economic-growth.html" },
    ],
    permitAuthority: "City of Springfield Building Regulation",
    permitNote:
      "Springfield requires separate permits for electrical work and takes all applications online through its CityWorks portal. The city's Electrical Plan Application lists Solar as a work type and asks for the Ohio Edison DR number. Parcels outside city limits should ask the Clark County Building Department which office applies.",
    permitLinks: [
      { label: "City of Springfield, Building permits", url: "https://springfieldohio.gov/city_services/building-permits/" },
      { label: "City of Springfield, Electrical plan application (PDF)", url: "https://springfieldohio.gov/download/6264/?tmstv=1789154005" },
      { label: "Clark County, Building", url: "https://www.clarkcountyohio.gov/280/Building" },
    ],
    faqs: [
      {
        question: "Is Springfield on AES Ohio or Ohio Edison?",
        answer:
          "The city's electrical permit form asks for an Ohio Edison (FirstEnergy) account number, and FirstEnergy reports Ohio Edison customers in the Springfield area. Check the utility name on your own bill before you apply for interconnection.",
      },
      {
        question: "How do I get a solar electrical permit in Springfield?",
        answer:
          "File the city's Electrical Plan Application, which lists Solar as a work type, through the CityWorks portal. Springfield takes building applications online only.",
      },
      {
        question: "How does Ohio Edison net metering start?",
        answer:
          "FirstEnergy's Ohio process is interconnection first, then the Net Energy Metering Rider application after the system is installed.",
      },
    ],
  },
  "tipp-city-oh": {
    utility: "Tipp City Electric (city-owned) or the utility printed on your bill",
    utilityNote:
      "Tipp City has run its own electric utility since 1897 and buys power through American Municipal Power (AMP). The city says rooftop solar customers must review and complete its interconnection application first.",
    utilityLinks: [
      { label: "City of Tipp City, Electric", url: "https://tippcityohio.gov/149/Electric" },
      { label: "City of Tipp City, Solar FAQ", url: "https://www.tippcityohio.gov/FAQ.aspx?QID=158" },
    ],
    metering: {
      heading: "Bill credits: Tipp City Electric's own rule",
      note:
        "City-owned utilities are outside PUCO's definition of a public utility, so Tipp City sets its own solar credit. The city says excess generation is credited to reduce your monthly bill, it does not pay cash once the bill reaches zero, and the customer charge still applies.",
      links: [{ label: "City of Tipp City, Solar FAQ", url: "https://www.tippcityohio.gov/faq.aspx?TID=27" }, orcMunicipal],
    },
    permitAuthority: "Tipp City zoning, then Miami County Building Regulations",
    permitNote:
      "Tipp City's order is interconnection application first, then a Tipp City zoning permit, then Miami County building regulations. The project has to meet all three to move forward.",
    permitLinks: [{ label: "City of Tipp City, Solar FAQ", url: "https://www.tippcityohio.gov/FAQ.aspx?QID=158" }, miamiBldg],
    faqs: [
      {
        question: "Does Tipp City Electric allow rooftop solar?",
        answer:
          "Yes. The city says customers must review and complete the interconnection application; once it is approved, a Tipp City zoning permit and Miami County building review follow.",
      },
      {
        question: "Does Tipp City pay for extra solar power?",
        answer:
          "No cash payment. Excess generation is credited to reduce the monthly bill, there is no compensation once the bill reaches zero, and the customer charge still applies.",
      },
      {
        question: "Why does Tipp City set its own solar rules?",
        answer:
          "Tipp City Electric is city-owned. Ohio law excludes municipal utilities from PUCO's definition of a public utility, so the city's own policy sets interconnection and credit terms.",
      },
    ],
  },
  "oakwood-oh": {
    utility: "AES Ohio",
    utilityNote: confirmAes,
    utilityLinks: aesLinks,
    permitAuthority: "City of Oakwood zoning; City of Kettering building department services",
    permitNote:
      "Oakwood contracts with the City of Kettering for structural, electrical and plumbing building department services, and Oakwood reviews the plans for zoning compliance. The city says it offers a simple permitting process for residential solar and counts 58 residential installations.",
    permitLinks: [
      { label: "City of Oakwood, Permits", url: "https://oakwoodohio.gov/permits/" },
      { label: "City of Oakwood, Solar power", url: "https://oakwoodohio.gov/sustainability-solar-power/" },
      ketteringSolar,
    ],
    costNote: "Kettering notes the State of Ohio adds 1% to Kettering and Oakwood residential structure and electric permits.",
    costLinks: [{ label: "City of Kettering, Residential construction", url: "https://www.ketteringoh.org/residential-construction/" }],
    faqs: [
      {
        question: "Who handles the building and electrical review for Oakwood solar?",
        answer:
          "The City of Kettering, under contract with Oakwood. Oakwood itself reviews the plans for zoning compliance.",
      },
      {
        question: "How many Oakwood homes already have solar?",
        answer: "The City of Oakwood's sustainability page says there are 58 residential installations.",
      },
      {
        question: "Is Oakwood friendly to rooftop solar?",
        answer:
          "The city says it embraces residential solar and offers a simple, efficient permitting process. Tree cover on Oakwood streets is the bigger design question for most roofs.",
      },
    ],
  },
  "west-carrollton-oh": {
    utility: "AES Ohio",
    utilityNote: confirmAes,
    utilityLinks: aesLinks,
    permitAuthority: "City of West Carrollton Planning & Community Development (SAFEbuilt building official)",
    permitNote:
      "West Carrollton takes building and electric permit applications online. The city contracts with SAFEbuilt for building official services, which review building permit applications and plans and conduct inspections. Plumbing permits come from Public Health, Dayton and Montgomery County.",
    permitLinks: [
      { label: "City of West Carrollton, Permits", url: "https://www.westcarrollton.org/departments/planning-and-community-development/permits/" },
      { label: "City of West Carrollton, Do I need a permit?", url: "https://www.westcarrollton.org/departments/planning-and-community-development/permits/do-i-need-a-permit/" },
    ],
    faqs: [
      {
        question: "Who inspects solar work in West Carrollton?",
        answer:
          "SAFEbuilt, the company the city contracts for building official services. Its staff review plans and conduct inspections and carry SAFEbuilt identification.",
      },
      {
        question: "Does West Carrollton require an electrical permit for solar wiring?",
        answer:
          "The city says any electrical work needs a permit except normal maintenance such as replacing switches, receptacles, bulbs or fixtures. Electric permits are filed online.",
      },
      {
        question: "Who do I call with a West Carrollton permit question?",
        answer: "Planning & Community Development at (937) 859-5783 or plan@westcarrollton.org.",
      },
    ],
  },
  "trotwood-oh": {
    utility: "AES Ohio",
    utilityNote: confirmAes,
    utilityLinks: aesLinks,
    permitAuthority: "City of Trotwood zoning, then Montgomery County Building Regulations",
    permitNote:
      "Trotwood lists Home Solar Panels as its own online zoning permit. Building permits and inspections come from Montgomery County Building Regulations, and the city says proof of Trotwood zoning approval is required when you apply for the county building permit.",
    permitLinks: [
      { label: "City of Trotwood, Zoning permits & applications", url: "https://trotwood.org/planning-development/zoning-permits-applications/" },
      { label: "City of Trotwood, Building administration", url: "https://trotwood.org/planning-development/building-administration/" },
      mcbr,
    ],
    faqs: [
      {
        question: "Does Trotwood need a zoning permit for home solar?",
        answer: "Yes. Trotwood lists a Home Solar Panels zoning permit that is applied for and paid online.",
      },
      {
        question: "Who issues the building permit for Trotwood solar?",
        answer:
          "Montgomery County Building Regulations. Trotwood requires proof of its zoning approval before the county building application moves forward.",
      },
      {
        question: "In what order should a Trotwood solar job be permitted?",
        answer: "City zoning permit first, then the Montgomery County building permit, then AES Ohio interconnection approval before the system runs.",
      },
    ],
  },
  "englewood-oh": {
    utility: "AES Ohio",
    utilityNote: confirmAes,
    utilityLinks: aesLinks,
    permitAuthority: "City of Englewood Building & Zoning (National Inspection Corporation reviews electrical)",
    permitNote:
      "Englewood's Building and Zoning Department approves residential building permits and handles inspections. The city says electrical permits are processed at City Hall and then forwarded to National Inspection Corporation (NIC) for review and approval. Plumbing permits go through Montgomery County.",
    permitLinks: [
      { label: "City of Englewood, Building, zoning & permits", url: "https://www.englewood.oh.us/161/Building-Zoning-Permits" },
      { label: "City of Englewood, Residential permits (PDF)", url: "https://www.englewood.oh.us/DocumentCenter/View/176/Residential-Building-Permits-PDF" },
    ],
    faqs: [
      {
        question: "Who reviews electrical work for Englewood solar?",
        answer:
          "National Inspection Corporation. Englewood processes the application in the city building department and forwards electrical projects to NIC for review and approval.",
      },
      {
        question: "Are Englewood permit fees due up front?",
        answer: "Yes. The city says application fees are due at submission and applications are not processed until fees are paid.",
      },
      {
        question: "Where are Englewood plumbing permits issued?",
        answer: "Through Montgomery County, not the city.",
      },
    ],
  },
  "riverside-oh": {
    utility: "AES Ohio",
    utilityNote: confirmAes,
    utilityLinks: aesLinks,
    permitAuthority: "City of Riverside zoning; Montgomery County Building Regulations for building and electrical",
    permitNote:
      "Riverside issues zoning permits through its online portal. Building, plumbing, electrical and HVAC permits come from the Montgomery County Building Regulation Division. The city says parcel numbers starting with I39 are inside Riverside.",
    permitLinks: [
      { label: "City of Riverside, Zoning FAQ", url: "https://www.riversideoh.gov/government/departments/community_development/zoning.php" },
      mcbr,
    ],
    faqs: [
      {
        question: "Who issues the electrical permit for Riverside solar?",
        answer: "Montgomery County Building Regulations. Riverside itself issues zoning permits only.",
      },
      {
        question: "How do I know my address is in Riverside and not Dayton or a township?",
        answer: "Check the Montgomery County Auditor parcel record. Riverside says parcel numbers that start with I39 are inside the city.",
      },
      {
        question: "Is Riverside near Wright-Patterson a different utility?",
        answer: "Most homes are AES Ohio customers. Confirm the utility name on your bill before you apply for interconnection.",
      },
    ],
  },
  "moraine-oh": {
    utility: "AES Ohio",
    utilityNote: confirmAes,
    utilityLinks: aesLinks,
    permitAuthority: "City of Moraine Building & Zoning (National Inspection Corporation plan review)",
    permitNote:
      "Moraine takes permit applications by email and says alterations to electrical systems require a permit. Its residential permit application covers electrical work. The city asks you to allow at least 15 business days, and revision requests can come from a National Inspection Corporation (NIC) plans examiner.",
    permitLinks: [{ label: "City of Moraine, Building & zoning", url: "https://ci.moraine.oh.us/building-zoning/" }],
    faqs: [
      {
        question: "How long does a Moraine permit take?",
        answer: "The city asks applicants to allow at least 15 business days to process an application.",
      },
      {
        question: "How do I submit a Moraine solar permit?",
        answer: "By email to the city's Building & Zoning staff, with the application, drawings and site plan, per the city's submittal instructions.",
      },
      {
        question: "Who reviews Moraine plans?",
        answer: "City staff with a National Inspection Corporation plans examiner, who may send a plan review letter asking for revisions.",
      },
    ],
  },
  "bellbrook-oh": {
    utility: "AES Ohio",
    utilityNote: confirmAes,
    utilityLinks: aesLinks,
    permitAuthority: "City of Bellbrook zoning, then Greene County Building Regulation",
    permitNote:
      "Bellbrook says a city zoning permit is needed before Greene County Building Regulation can issue a building permit. Greene County handles permits and inspections for Bellbrook and other Greene County cities except Fairborn and Xenia, with submittals electronic only.",
    permitLinks: [{ label: "City of Bellbrook, Zoning FAQs", url: "https://www.bellbrook.gov/page/zoning_faqs" }, greeneBldg],
    faqs: [
      {
        question: "Who issues the building permit for Bellbrook solar?",
        answer: "Greene County Building Regulation, after the City of Bellbrook issues any required zoning approval.",
      },
      {
        question: "Does Greene County take paper permit applications?",
        answer: "No. Greene County Building Regulation says all submittals are electronic, through its online permitting service.",
      },
      {
        question: "Are Bellbrook and Sugarcreek Township the same permit path?",
        answer: "Building permits are Greene County for both, but zoning differs by jurisdiction. Confirm whether your parcel is in the city before you file.",
      },
    ],
  },
  "springboro-oh": {
    utility: "AES Ohio or Duke Energy Ohio (check your bill)",
    utilityNote:
      "The City of Springboro's own guide says the city is served by two electric utilities, Dayton Power and Light (now AES Ohio) or Duke Energy, depending on the address. Use the interconnection process of whichever utility is on your bill.",
    utilityLinks: [
      { label: "City of Springboro, A to Z guide (PDF)", url: "https://www.cityofspringboro.com/DocumentCenter/View/1089/Springboro-A-to-Z-2020" },
      ...aesLinks,
      dukeLinks[0],
    ],
    permitAuthority: "City of Springboro Planning (solar permit) and Building Department (electrical permit)",
    permitNote:
      "Springboro requires a Solar Energy System Permit filed with the City Planner and an electrical permit filed with the Building Department as a PDF. Roof systems must be flush mounted, no more than 8 inches above the roof, and architecturally compatible with the building. Solar rules are in Chapter 1276 of the city code, and the building department is state certified.",
    permitLinks: [
      { label: "City of Springboro, Solar energy permit (residential)", url: "https://www.cityofspringboro.com/534/Solar-Energy-Permit-for-Residential-Prop" },
      { label: "City of Springboro, Building & zoning", url: "https://cityofspringboro.com/149/Building-Zoning" },
    ],
    costNote: "Springboro lists no fee for either the residential Solar Energy System Permit or the electrical permit.",
    costLinks: [{ label: "City of Springboro, Solar energy permit (residential)", url: "https://www.cityofspringboro.com/534/Solar-Energy-Permit-for-Residential-Prop" }],
    faqs: [
      {
        question: "What does a Springboro solar permit cost?",
        answer: "The city lists no fee for the residential Solar Energy System Permit and no fee for the electrical permit.",
      },
      {
        question: "Which utility serves my Springboro home?",
        answer: "Springboro lists two: Dayton Power and Light (now AES Ohio) or Duke Energy. The name on your bill decides whose interconnection process you use.",
      },
      {
        question: "Are there Springboro rules for how panels look?",
        answer: "Roof systems must be flush mounted, no more than 8 inches above the roof, and architecturally compatible; ground systems have yard placement and screening rules in Chapter 1276.",
      },
    ],
  },
  "troy-oh": {
    utility: "AES Ohio",
    utilityNote: confirmAes,
    utilityLinks: aesLinks,
    permitAuthority: "City of Troy zoning; Miami County Building Department for building and electrical",
    permitNote:
      "Troy explains that a zoning permit from the City of Troy checks setbacks, height and lot coverage, while the building permit, covering electrical and construction, comes from the Miami County Building Department. The city says parcel numbers starting with D08 or D45 are inside Troy's corporate limits.",
    permitLinks: [{ label: "City of Troy, Planning & zoning", url: "https://www.troyohio.gov/departments/planning_zoning/index.php" }, miamiBldg],
    faqs: [
      {
        question: "Who issues the building permit for Troy solar?",
        answer: "The Miami County Building Department. The City of Troy issues the zoning permit.",
      },
      {
        question: "How do I confirm my parcel is inside Troy?",
        answer: "Check the Miami County Auditor's site. Troy says parcel numbers that start with D08 or D45 are inside city limits.",
      },
      {
        question: "Who answers Troy zoning questions?",
        answer: "Troy Planning & Zoning at City Hall, 102 S. Market St., (937) 339-9481.",
      },
    ],
  },
  "clayton-oh": {
    utility: "AES Ohio",
    utilityNote: confirmAes,
    utilityLinks: aesLinks,
    permitAuthority: "City of Clayton (National Inspection Corporation reviews and inspects)",
    permitNote:
      "Since January 1, 2023, the City of Clayton administers residential and commercial building permits, and National Inspection Corporation (NIC) performs plan reviews and inspections on the city's behalf. Clayton lists electrical service upgrades among projects that need a building permit and says residential projects average 2 to 5 business days. Plumbing permits come from Public Health, Dayton and Montgomery County.",
    permitLinks: [
      { label: "City of Clayton, Building department", url: "https://www.clayton.oh.us/581/Building-Department" },
      { label: "City of Clayton, Development permits", url: "https://clayton.oh.us/373/Permits" },
    ],
    faqs: [
      {
        question: "Who issues solar permits in Clayton?",
        answer: "The City of Clayton administers building permits, and National Inspection Corporation reviews the plans and performs the inspections.",
      },
      {
        question: "How long does a Clayton residential permit take?",
        answer: "The city says residential projects average 2 to 5 business days for processing.",
      },
      {
        question: "Does Clayton still use Montgomery County for building permits?",
        answer: "No. Starting January 1, 2023, the city administers its own residential and commercial building permits through NIC.",
      },
    ],
  },
  "brookville-oh": {
    utility: "AES Ohio",
    utilityNote: confirmAes,
    utilityLinks: aesLinks,
    permitAuthority: "City of Brookville zoning; Montgomery County for building and electrical",
    permitNote:
      "Brookville says Montgomery County is responsible for all building permits and inspections in the city, including electrical, and residents must contact the county. Brookville zoning approval and a permit must be obtained before work starts.",
    permitLinks: [
      { label: "City of Brookville, Zoning regulations", url: "https://www.brookvilleohio.com/140/Zoning-Regulations" },
      mcbr,
    ],
    faqs: [
      {
        question: "Who issues the electrical permit for Brookville solar?",
        answer: "Montgomery County. Brookville says the county handles all building permits and inspections in the city, including electrical.",
      },
      {
        question: "Does Brookville need its own approval first?",
        answer: "Yes. The city says zoning approval and a permit must be obtained before work is started in Brookville.",
      },
      {
        question: "Who answers Brookville zoning questions?",
        answer: "The city lists (937) 833-2135, extension 106.",
      },
    ],
  },
  "germantown-oh": {
    utility: "AES Ohio",
    utilityNote: confirmAes,
    utilityLinks: aesLinks,
    permitAuthority: "City of Germantown (National Inspection Corporation inspections)",
    permitNote:
      "Germantown takes permit applications at its one-stop office at One North Plum Street, where plans examiners, zoning and building officials review them. The city says review normally takes 5 to 10 business days, and inspections are scheduled with National Inspection Corporation at (937) 433-4642. Plumbing permits come through Montgomery County.",
    permitLinks: [{ label: "City of Germantown, Zoning / building (residential)", url: "https://www.germantown.oh.us/zoning-residential" }],
    costNote:
      "Germantown's published residential fee list shows electric work at a $100 basic fee plus $0.05 per square foot and an electric service upgrade at $75. Ask the city how those lines apply to a solar job.",
    costLinks: [{ label: "City of Germantown, Zoning / building (residential)", url: "https://www.germantown.oh.us/zoning-residential" }],
    faqs: [
      {
        question: "How long does a Germantown permit review take?",
        answer: "The city says plan review normally takes 5 to 10 business days.",
      },
      {
        question: "Who inspects Germantown solar work?",
        answer: "National Inspection Corporation. You call NIC at (937) 433-4642 with your permit number to schedule each inspection.",
      },
      {
        question: "What are Germantown's electric permit fees?",
        answer: "The city's residential fee list shows a $100 basic electric fee plus $0.05 per square foot, and $75 for an electric service upgrade.",
      },
    ],
  },
  "franklin-oh": {
    utility: "Duke Energy Ohio or the utility printed on your bill",
    utilityNote:
      "Franklin's electric aggregation page says residents keep receiving one monthly bill from Duke Energy, which delivers the power. " + confirmDuke,
    utilityLinks: [
      { label: "City of Franklin, Electric aggregation", url: "https://www.franklinohio.org/residents/electric_aggregation.php" },
      ...dukeLinks,
    ],
    permitAuthority: "City of Franklin Building & Zoning",
    permitNote:
      "Franklin's permit table lists rooftop solar panels as needing both a zoning permit and a building permit. Applications go through the city's online portal.",
    permitLinks: [
      { label: "City of Franklin, Do I need a permit?", url: "https://www.franklinohio.org/departments/safety_department/do_i_need_a_permit.php" },
      { label: "City of Franklin, Building & zoning", url: "https://www.franklinohio.org/departments/safety_department/building___zoning/index.php" },
    ],
    faqs: [
      {
        question: "Does Franklin need a zoning permit for rooftop solar?",
        answer: "Yes. Franklin's permit table lists rooftop solar panels as needing a zoning permit and a building permit.",
      },
      {
        question: "Is Franklin on Duke Energy or AES Ohio?",
        answer: "Franklin's aggregation page describes residents billed by Duke Energy. Confirm the name on your own bill before interconnection.",
      },
      {
        question: "Does Franklin's electric aggregation change solar?",
        answer: "Aggregation changes the supplier price, not the wires. Interconnection and net metering still run through Duke Energy Ohio's process.",
      },
    ],
  },
  "dublin-oh": {
    utility: "AEP Ohio",
    utilityNote: confirmAep,
    utilityLinks: aepLinks,
    permitAuthority: "City of Dublin Building Standards (Planning/Zoning in some cases)",
    permitNote:
      "Dublin says most residential solar projects that meet its code criteria can go straight to Building Standards for a permit, but some need Planning/Zoning approval first. The 2023 Renewable Energy Equipment (Solar) code sets location, material and appearance standards; panels on the front of a house are allowed when the installer shows that placement gives the greatest efficiency. Dublin holds a SolSmart Bronze designation and reports approved and denied solar permits to City Council monthly.",
    permitLinks: [
      { label: "City of Dublin, Solar", url: "https://dublinohiousa.gov/solar/" },
      { label: "City of Dublin, Renewable energy equipment (solar)", url: "https://dublinohiousa.gov/city-news/renewable-energy-equipment-solar/" },
    ],
    faqs: [
      {
        question: "Can Dublin solar panels go on the front of the house?",
        answer: "Yes, when the installer documents that the front placement gives the greatest efficiency, under Dublin's renewable energy equipment code.",
      },
      {
        question: "Does every Dublin solar project need Planning review?",
        answer: "No. Dublin says most projects that meet code criteria submit directly to Building Standards; certain cases need Planning/Zoning approval first.",
      },
      {
        question: "Is Dublin recognized for solar permitting?",
        answer: "Dublin was designated SolSmart Bronze, a national program for local governments that reduce barriers to solar.",
      },
    ],
  },
  "westerville-oh": {
    utility: "Westerville Electric (city-owned) or the utility printed on your bill",
    utilityNote:
      "Westerville says its Electric Division is the only municipally owned suburban electric provider in central Ohio and serves all of the city's residents. Net metering is set in city code section 939.07.",
    utilityLinks: [{ label: "City of Westerville, Electric", url: "https://www.westerville.org/services/electric" }],
    metering: {
      heading: "Net metering: Westerville Electric's own rule",
      note:
        "Westerville code 939.07 covers customer-owned solar on your premises. You apply with a letter listing the inverter type, size and certification, the installing electrician, and proof of city inspection; the Electric Utility Manager may require an interconnection agreement. A two-way meter is required at the customer's cost if the existing one cannot measure both directions. A negative balance carries forward as a credit, and after eight consecutive months of credit you may request a refund of the energy charge.",
      links: [
        { label: "Westerville Codified Ordinances 939.07, Net metering", url: "https://codelibrary.amlegal.com/codes/westerville/latest/westerville_oh/0-0-0-9766" },
        orcMunicipal,
      ],
    },
    permitAuthority: "City of Westerville Building Division",
    permitNote:
      "Westerville's Building Division is a state-certified department that reviews and inspects residential construction, with plans submitted through its Plan Review Portal. The city reports about 100 utility and solar permits approved since 2021.",
    permitLinks: [{ label: "City of Westerville, Building", url: "https://www.westerville.org/services/planning-development/building" }],
    faqs: [
      {
        question: "Does Westerville Electric offer net metering?",
        answer: "Yes. City code 939.07 lets customers who own and operate qualifying solar on their premises net meter after inspection and, if required, an interconnection agreement.",
      },
      {
        question: "Can Westerville solar credits be refunded?",
        answer: "After eight consecutive billing months of accumulated credit, the code lets the customer request a refund of the energy charge at the current rate.",
      },
      {
        question: "Does TPO solar fit Westerville's net metering rule?",
        answer: "The city rule is written for generators owned and operated by the customer. Ask Westerville Electric in writing how a lease or PPA would be treated before you sign.",
      },
    ],
  },
  "grove-city-oh": {
    utility: "AEP Ohio",
    utilityNote: confirmAep,
    utilityLinks: aepLinks,
    permitAuthority: "City of Grove City Building & Zoning Division",
    permitNote:
      "Grove City's Building and Zoning Division reviews building plans, issues permits for all construction and inspects the work. The city says the building permit process begins online, and it encourages owners to check its list of registered contractors.",
    permitLinks: [{ label: "City of Grove City, About building & zoning", url: "https://grovecityohio.gov/167/About-Building-Zoning" }],
    faqs: [
      {
        question: "Who issues solar permits in Grove City?",
        answer: "The city's Building and Zoning Division, which reviews plans, issues permits for all construction and inspects the work.",
      },
      {
        question: "Can I check whether a Grove City contractor is registered?",
        answer: "Yes. The division publishes a list of registered contractors and encourages property owners to check it.",
      },
      {
        question: "Which utility handles Grove City interconnection?",
        answer: "AEP Ohio for most homes. AEP asks customers to apply before installing generating equipment.",
      },
    ],
  },
  "upper-arlington-oh": {
    utility: "AEP Ohio",
    utilityNote: confirmAep,
    utilityLinks: aepLinks,
    permitAuthority: "City of Upper Arlington Building Division",
    permitNote:
      "Upper Arlington's Building Division reviews residential plans, issues permits and registrations, and inspects the work. Its fee schedule has its own line for solar panels.",
    permitLinks: [
      { label: "City of Upper Arlington, Building", url: "https://www.upperarlingtonoh.gov/237/Building" },
      { label: "City of Upper Arlington, Fees", url: "https://www.upperarlingtonoh.gov/238/Fees" },
    ],
    costNote:
      "Upper Arlington lists solar panels at a $75 application fee and a $75 building review fee, with no planning review fee and no permit fee. The Ohio Board of Building Standards adds 1% of residential permit fees.",
    costLinks: [{ label: "City of Upper Arlington, Fees", url: "https://www.upperarlingtonoh.gov/238/Fees" }],
    faqs: [
      {
        question: "What does a solar permit cost in Upper Arlington?",
        answer: "The city fee schedule lists a $75 application fee and a $75 building review fee for solar panels, with no planning review or permit fee, plus the state's 1% residential fee.",
      },
      {
        question: "Who reviews Upper Arlington solar plans?",
        answer: "The city's Building Division, which reviews residential plans, issues permits and performs inspections.",
      },
      {
        question: "Do older Upper Arlington roofs change the plan?",
        answer: "Tree cover and roof age on early 20th-century streets matter more than the permit fee. Get the roof condition in writing before a design is final.",
      },
    ],
  },
  "hilliard-oh": {
    utility: "AEP Ohio",
    utilityNote: confirmAep,
    utilityLinks: aepLinks,
    permitAuthority: "City of Hilliard Building Standards Division",
    permitNote:
      "Hilliard's Building Standards Division takes building permit filings online through the OpenGov portal. New buildings and additions also need a Certificate of Zoning Compliance from the Planning Division.",
    permitLinks: [{ label: "City of Hilliard, Building Standards Division", url: "https://hilliardohio.gov/building-standards-division/" }],
    faqs: [
      {
        question: "How do I file a Hilliard solar permit?",
        answer: "Online through Hilliard's OpenGov portal, run by the Building Standards Division.",
      },
      {
        question: "Does rooftop solar need Hilliard zoning compliance?",
        answer: "Hilliard requires a Certificate of Zoning Compliance for new buildings and additions. Ask the Planning Division whether your array or any ground mount needs one.",
      },
      {
        question: "Which utility handles Hilliard interconnection?",
        answer: "AEP Ohio for most homes. Confirm the name on your bill before you apply.",
      },
    ],
  },
  "gahanna-oh": {
    utility: "AEP Ohio",
    utilityNote: confirmAep,
    utilityLinks: aepLinks,
    permitAuthority: "City of Gahanna Division of Building",
    permitNote:
      "Gahanna's Division of Building issues permits, reviews plans and inspects work. Since May 2024 it processes applications and inspection requests through OpenGov and no longer accepts paper applications. The city's Do I Need a Permit list shows a solar energy structure needs a residential building permit.",
    permitLinks: [
      { label: "City of Gahanna, Permitting", url: "https://www.gahanna.gov/229/Permitting" },
      { label: "City of Gahanna, Do I need a permit? (PDF)", url: "https://gahanna.gov/DocumentCenter/View/595/Do-I-Need-a-Permit-PDF?bidId=" },
    ],
    faqs: [
      {
        question: "Does Gahanna require a building permit for solar?",
        answer: "Yes. The city's Do I Need a Permit list shows a residential building permit for a solar energy structure.",
      },
      {
        question: "Can I file a Gahanna permit on paper?",
        answer: "No. Gahanna moved permits and inspection requests to OpenGov in May 2024 and stopped accepting paper applications.",
      },
      {
        question: "Which utility handles Gahanna interconnection?",
        answer: "AEP Ohio for most homes. AEP asks customers to apply before installing generating equipment.",
      },
    ],
  },
  "reynoldsburg-oh": {
    utility: "AEP Ohio",
    utilityNote: confirmAep,
    utilityLinks: aepLinks,
    permitAuthority: "City of Reynoldsburg Building Department",
    permitNote:
      "Reynoldsburg's Building Department issues building and electrical permits, registers contractors each year and performs inspections. Inspections can be requested on the automated line at (614) 322-6821 with the permit number and address.",
    permitLinks: [{ label: "City of Reynoldsburg, Building Department", url: "https://www.reynoldsburg.gov/157/Building-Department" }],
    faqs: [
      {
        question: "Who issues the electrical permit for Reynoldsburg solar?",
        answer: "The City of Reynoldsburg Building Department, which issues building and electrical permits and registers contractors yearly.",
      },
      {
        question: "Reynoldsburg crosses county lines. Does the permit office change?",
        answer: "The city Building Department covers addresses inside Reynoldsburg city limits, which cross Franklin, Licking and Fairfield counties. Confirm on the county auditor record that your parcel is inside the city before you file.",
      },
      {
        question: "How do I schedule a Reynoldsburg inspection?",
        answer: "Call the automated line at (614) 322-6821 with the permit number, street address and inspection type.",
      },
    ],
  },
  "pickerington-oh": {
    utility: "South Central Power or AEP Ohio",
    utilityNote:
      "Pickerington addresses can be on South Central Power, an electric cooperative, or on AEP Ohio. The process depends on the name on your bill.",
    utilityLinks: [...southCentral, ...aepLinks],
    metering: {
      heading: "Bill credits: South Central Power uses net billing",
      note:
        "South Central Power says it moved from net metering to net billing on March 1, 2022. Excess generation is bought at a rate Buckeye Power sets each year, and net billing settles every hour. The co-op asks members to contact it before signing a solar contract. AEP Ohio customers in Pickerington follow the Ohio net metering rule below.",
      links: southCentral,
    },
    permitAuthority: "City of Pickerington Building Department",
    permitNote:
      "Pickerington's Building Department reviews plans, issues permits and inspects structures, and is certified by the Ohio Board of Building Standards to enforce the Residential Code of Ohio. Contractor registration and building permits are filed online through the OpenGov portal.",
    permitLinks: [{ label: "City of Pickerington, Building", url: "https://www.ci.pickerington.oh.us/departments/building/" }],
    faqs: [
      {
        question: "Does South Central Power offer net metering in Pickerington?",
        answer: "No. South Central Power switched to net billing on March 1, 2022: excess generation is credited at Buckeye Power's annual rate and settles hourly.",
      },
      {
        question: "Who issues solar permits in Pickerington?",
        answer: "The City of Pickerington Building Department, through its OpenGov portal.",
      },
      {
        question: "Should I call South Central Power before signing a solar contract?",
        answer: "The co-op asks members to contact it for advice before signing a contract, especially if they plan to stay connected to the grid.",
      },
    ],
  },
  "powell-oh": {
    utility: "AEP Ohio",
    utilityNote: confirmAep,
    utilityLinks: aepLinks,
    permitAuthority: "City of Powell Building Department",
    permitNote:
      "Powell's Building Department processes residential and trade (including electrical) permits through OpenGov, which replaced CommunityCore on September 1, 2026. Electrical and other trade contractors must register with the city before filing, and registrations expire December 31. Inspections are scheduled online or at (614) 802-1200.",
    permitLinks: [{ label: "City of Powell, Building Department", url: "https://www.cityofpowell.us/About-Us/Departments/Building-Department" }],
    faqs: [
      {
        question: "How do I file a Powell solar permit?",
        answer: "Through OpenGov. Powell moved from CommunityCore to OpenGov on September 1, 2026.",
      },
      {
        question: "Does a Powell solar electrician have to register with the city?",
        answer: "Yes. Powell requires electrical and other trade contractors to register before filing permits; registration expires December 31 each year.",
      },
      {
        question: "How are Powell inspections scheduled?",
        answer: "Online through OpenGov or by calling (614) 802-1200. Requests received by noon are scheduled for the next business day or later.",
      },
    ],
  },
  "delaware-oh": {
    utility: "AEP Ohio",
    utilityNote: confirmAep,
    utilityLinks: aepLinks,
    permitAuthority: "City of Delaware Planning & Community Development (Building Division)",
    permitNote:
      "Delaware has its own solar permit page and says it has permitted more than 70 solar PV projects. Applications go through the city's public portal with a site plan, a design professional's letter that the roof framing can carry the array, equipment spec sheets and electrical diagrams. The city aims to review within 14 business days, and a residential system needs one inspection, usually done within one business day of the request.",
    permitLinks: [{ label: "City of Delaware, Solar panels", url: "https://www.delawareohio.net/government/departments/planning-community-development/solar-panels" }],
    faqs: [
      {
        question: "How long does a Delaware solar permit take?",
        answer: "The city's goal is to review solar applications within 14 business days.",
      },
      {
        question: "How many inspections does a Delaware home solar system need?",
        answer: "One. Delaware says a residential solar PV system requires a single inspection, typically completed within one business day of the request.",
      },
      {
        question: "What does Delaware want with a solar application?",
        answer: "A site plan, a design professional's letter on roof framing, spec sheets for panels, inverters and racking, and electrical diagrams.",
      },
    ],
  },
  "worthington-oh": {
    utility: "AEP Ohio",
    utilityNote: confirmAep,
    utilityLinks: aepLinks,
    permitAuthority: "City of Worthington Planning & Building (Architectural Review Board in the review district)",
    permitNote:
      "Worthington issues building permits and says some projects also need special approvals, such as a Certificate of Appropriateness from the Architectural Review Board. Its design guidelines ask that solar panels minimize visibility from the street, generally on the rear half of the main roof or on a rear accessory structure, flush on sloped roofs, with supporting equipment screened.",
    permitLinks: [
      { label: "City of Worthington, Permit process", url: "https://www.worthington.org/145/Permit-Process" },
      { label: "City of Worthington, Solar panel regulations (PDF)", url: "https://worthington.org/DocumentCenter/View/3644/Solar-Panel-Regulations-01132017?bidId=" },
      { label: "City of Worthington, Architectural Review Board", url: "https://worthington.org/162/Architectural-Review-Board" },
    ],
    faqs: [
      {
        question: "Do Worthington solar panels need Architectural Review Board approval?",
        answer: "Inside the Architectural Review District, a Certificate of Appropriateness from the ARB can be required before the building permit. Check the district map first.",
      },
      {
        question: "Where do Worthington guidelines want solar panels placed?",
        answer: "Where they minimize visibility from the street: generally the rear 50% of the main roof, the rear inside quadrant on a corner lot, or a rear-yard accessory structure, flush on sloped roofs.",
      },
      {
        question: "Are ground-mounted panels allowed in Worthington?",
        answer: "The city treats ground-mounted panels as an accessory structure that must meet accessory setback rules.",
      },
    ],
  },
  "mason-oh": {
    utility: "Duke Energy Ohio",
    utilityNote: confirmDuke,
    utilityLinks: dukeLinks,
    permitAuthority: "City of Mason Engineering, Building & Planning",
    permitNote:
      "Mason has a dedicated Solar Permit Application on its online Permit Portal, alongside the Residential Building and/or Electric Permit Application. All Mason permit applications are completed online.",
    permitLinks: [
      { label: "City of Mason, Building documents", url: "https://www.imaginemason.org/services/engineering-building-planning/building-documents/" },
      { label: "City of Mason, Engineering, building & planning", url: "https://www.imaginemason.org/services/engineering-building-planning/" },
    ],
    faqs: [
      {
        question: "Does Mason have a solar-specific permit?",
        answer: "Yes. Mason lists a Solar Permit Application on its online Permit Portal.",
      },
      {
        question: "Can I file a Mason permit on paper?",
        answer: "The city says all permit applications can be completed online through the City of Mason Permit Portal.",
      },
      {
        question: "Does Warren County issue Mason solar permits?",
        answer: "Mason runs its own engineering and building department and permit portal for addresses inside the city.",
      },
    ],
  },
  "west-chester-oh": {
    utility: "Duke Energy Ohio",
    utilityNote: confirmDuke,
    utilityLinks: dukeLinks,
    permitAuthority: "Butler County Building & Zoning (township permits through West Chester Township)",
    permitNote:
      "West Chester is a township, not a city. Butler County's Building and Zoning staff enforce the building and electrical codes for unincorporated Butler County and list everyday inspections in West Chester Township. Township permits are applied for online and the township says its permitting process is free; call Community Development at (513) 777-4214 if you are unsure what applies.",
    permitLinks: [
      { label: "Butler County, Building & zoning", url: "https://www.bcohio.gov/board_of_commissioners/commissioner_departments/development/building___zoning.php" },
      { label: "West Chester Township, Community Development FAQs", url: "https://www.westchesteroh.org/government/community-development/community-development-faqs" },
    ],
    faqs: [
      {
        question: "Who issues the electrical permit for West Chester solar?",
        answer: "Butler County Building & Zoning, which enforces the building and electrical codes in unincorporated Butler County, including West Chester Township.",
      },
      {
        question: "Does West Chester Township charge for its permits?",
        answer: "The township says its permitting process is free. County building and electrical fees are separate.",
      },
      {
        question: "Who answers West Chester Township permit questions?",
        answer: "Community Development at (513) 777-4214.",
      },
    ],
  },
  "hamilton-oh": {
    utility: "City of Hamilton electric or the utility printed on your bill",
    utilityNote:
      "The City of Hamilton owns its electric distribution system and publishes interconnection standards for customer-owned renewable generation of 25 kWac or less.",
    utilityLinks: [
      { label: "City of Hamilton, Utility rules & regulations", url: "https://www.hamilton-oh.gov/utilities-rules-regulations" },
      { label: "City of Hamilton, Interconnection standards (PDF)", url: "https://gis.hamilton-oh.gov/webdocs/Dept%20Utility%20Bus%20Services/Hamilton%20Interconnect%20Standards%20.pdf" },
    ],
    metering: {
      heading: "Bill credits: Hamilton's Residential Solar Generation rate",
      note:
        "Hamilton code 943.051 offers residential customers with customer-owned, inverter-based solar of 25 kWac or less a Solar Generation Credit of $0.05974 per kWh for surplus energy delivered to the city system. No credit is given for generation above your own annual consumption, and the agreement is between the customer and the city, not third parties.",
      links: [
        { label: "Hamilton Codified Ordinances 943.051", url: "https://codelibrary.amlegal.com/codes/hamilton/latest/hamilton_oh/0-0-0-56275" },
        orcMunicipal,
      ],
    },
    permitAuthority: "City of Hamilton Building (Construction Services)",
    permitNote:
      "Hamilton issues its own building and electric permits. A contractor registration (Master Registration) is required for electric work that needs a permit, and only the registration holder or an authorized representative may apply. An owner-occupant doing qualifying work may be exempt from registration.",
    permitLinks: [
      { label: "City of Hamilton, Permits, certificates & registrations", url: "https://www.hamilton-oh.gov/permits-certificates-registrations" },
      { label: "City of Hamilton, Contractor registration", url: "https://www.hamilton-oh.gov/building-contractor-registration" },
    ],
    faqs: [
      {
        question: "What does Hamilton pay for surplus solar power?",
        answer: "Hamilton code 943.051 sets a Solar Generation Credit of $0.05974 per kWh for surplus energy, with no credit above your annual consumption.",
      },
      {
        question: "Can a TPO system use Hamilton's solar rate?",
        answer: "The rate is written for customer-owned systems, and agreements are between the customer and the city, not third parties. Ask the city before signing a lease or PPA.",
      },
      {
        question: "Does a Hamilton solar electrician need city registration?",
        answer: "Yes. Hamilton requires a Master Registration to pull permits for electric work, with a narrow owner-occupant exemption.",
      },
    ],
  },
  "fairfield-oh": {
    utility: "Duke Energy Ohio",
    utilityNote: confirmDuke,
    utilityLinks: dukeLinks,
    permitAuthority: "City of Fairfield Building & Zoning",
    permitNote:
      "Fairfield lists solar panels among projects that require a building permit. Electrical work must be installed by an electrical contractor registered in Fairfield, except that an owner-occupant of a single-family home may do the work under a permit with inspections.",
    permitLinks: [{ label: "City of Fairfield, Building permits", url: "https://www.fairfield-city.org/167/Building-Permits" }],
    faqs: [
      {
        question: "Does Fairfield require a building permit for solar panels?",
        answer: "Yes. The city lists solar panels among the projects that require a building permit.",
      },
      {
        question: "Does a Fairfield solar electrician need to be registered?",
        answer: "Yes. Fairfield requires electrical work to be installed by an electrical contractor registered in the city, with an owner-occupant exception.",
      },
      {
        question: "Is Fairfield the same as Fairfield Township?",
        answer: "No. This page covers the City of Fairfield. Township parcels follow Butler County's process; check your parcel before you file.",
      },
    ],
  },
  "lebanon-oh": {
    utility: "City of Lebanon Electric or the utility printed on your bill",
    utilityNote:
      "Lebanon's Electric Department, founded in 1895, owns its transmission and distribution system and buys bulk power from American Municipal Power. Net metering is set in city code 915.13.",
    utilityLinks: [{ label: "City of Lebanon, Electric", url: "https://www.lebanonohio.gov/departments/electric/index.php" }],
    metering: {
      heading: "Net metering: City of Lebanon's own rule",
      note:
        "Lebanon code 915.13 requires an interconnection application and agreement with the city electric department, and the city may inspect and witness testing before the system runs. Credits apply only to the energy charge and carry to the next billing period; the city does not refund net metering credits, and annual generation sent to the city may not exceed what the city supplies you.",
      links: [
        { label: "Lebanon Code of Ordinances 915.13", url: "https://codelibrary.amlegal.com/codes/lebanonoh/latest/lebanon_oh/0-0-0-64343" },
        orcMunicipal,
      ],
    },
    permitAuthority: "Warren County Building & Zoning (city zoning and engineering permits separately)",
    permitNote:
      "Lebanon's permits page sends building inspection to Warren County. Warren County Building & Zoning says solar panels need a building and an electrical permit, and an engineer's seal is required on plans. Ask the city whether a zoning permit applies.",
    permitLinks: [
      { label: "City of Lebanon, Permits", url: "https://www.lebanonohio.gov/departments/planning___development/permits.php" },
      warrenSolar,
    ],
    faqs: [
      {
        question: "Is Lebanon on Duke Energy?",
        answer: "Homes on the city system are served by City of Lebanon Electric, a municipal utility. Check the name on your bill.",
      },
      {
        question: "Does Lebanon refund net metering credits?",
        answer: "No. City code 915.13 carries credits to the next billing period and says the city will not refund them.",
      },
      {
        question: "Who issues the solar building permit in Lebanon?",
        answer: "Warren County Building & Zoning, which requires a building and electrical permit and an engineer's seal on solar plans.",
      },
    ],
  },
  "loveland-oh": {
    utility: "Duke Energy Ohio",
    utilityNote: confirmDuke,
    utilityLinks: dukeLinks,
    permitAuthority: "City of Loveland Building Department (electrical through The Inspection Bureau, Inc.)",
    permitNote:
      "Loveland's Building Department handles building permits as a one-stop office. The city contracts with The Inspection Bureau, Inc. (IBI) for all electrical permits and inspections, and with Hamilton County Public Health for plumbing.",
    permitLinks: [{ label: "City of Loveland, Building department", url: "https://www.lovelandoh.gov/148/Building-Zoning" }, ibi],
    faqs: [
      {
        question: "Who issues the electrical permit for Loveland solar?",
        answer: "The Inspection Bureau, Inc. (IBI), under contract with the City of Loveland for all electrical permits and inspections.",
      },
      {
        question: "Loveland spans three counties. Does that change the permit office?",
        answer: "Inside city limits, the City of Loveland Building Department is the building office. Confirm your parcel is in the city before you file.",
      },
      {
        question: "Who issues plumbing permits in Loveland?",
        answer: "Hamilton County Public Health, under contract with the City of Loveland.",
      },
    ],
  },
  "blue-ash-oh": {
    utility: "Duke Energy Ohio",
    utilityNote: "Blue Ash lists Duke Energy as the gas and electric utility contact. " + confirmDuke,
    utilityLinks: [
      { label: "City of Blue Ash, Permits", url: "https://www.blueash.com/departments/community_development/permits.php" },
      ...dukeLinks,
    ],
    permitAuthority: "City of Blue Ash Community Development",
    permitNote:
      "Blue Ash Community Development reviews permit applications, including zoning and fire safety review with each building permit. The city lists residential reviews at about 5 to 7 business days, requires a non-refundable deposit with every submittal, and publishes its own electrical fee schedule (effective January 1, 2026).",
    permitLinks: [{ label: "City of Blue Ash, Permits", url: "https://www.blueash.com/departments/community_development/permits.php" }],
    faqs: [
      {
        question: "How long does a Blue Ash residential permit review take?",
        answer: "The city lists about 5 to 7 business days for residential submittals.",
      },
      {
        question: "Is there a deposit for a Blue Ash permit?",
        answer: "Yes. All submittals require a non-refundable deposit; call Community Development at (513) 745-8645 if you are unsure of the amount.",
      },
      {
        question: "Who issues Blue Ash electrical permits?",
        answer: "Blue Ash publishes its own electrical fee schedule through Community Development. Ask the city how the solar electrical permit is filed.",
      },
    ],
  },
  "montgomery-oh": {
    utility: "Duke Energy Ohio",
    utilityNote: "Montgomery lists Duke Energy as the gas and electric utility contact. " + confirmDuke,
    utilityLinks: [
      { label: "City of Montgomery, Projects requiring a permit", url: "https://www.montgomeryohio.gov/required-permits/" },
      ...dukeLinks,
    ],
    permitAuthority: "City of Montgomery Community Development",
    permitNote:
      "Montgomery's solar steps: download the Building/Zoning Application, mark Electrical and Alteration/Remodel, and email it with a site plan and electrical and structural details to Community Development. The city points homeowners to the OKI Regional Council of Governments' GO Solar mapping site to check suitability.",
    permitLinks: [{ label: "City of Montgomery, Building/zoning FAQs", url: "https://www.montgomeryohio.gov/frequently-asked-questions-2/" }],
    costNote: "Montgomery says it encourages solar by automatically waiving the full residential permit fee for solar projects.",
    costLinks: [{ label: "City of Montgomery, Building/zoning FAQs", url: "https://www.montgomeryohio.gov/frequently-asked-questions-2/" }],
    faqs: [
      {
        question: "Does Montgomery charge a permit fee for home solar?",
        answer: "No. The city says it automatically waives the full residential permit fee for solar projects.",
      },
      {
        question: "How do I apply for a solar permit in Montgomery?",
        answer: "Mark Electrical and Alteration/Remodel on the Building/Zoning Application and email it with a site plan and electrical and structural details to Community Development, (513) 792-8309.",
      },
      {
        question: "How can I check if my Montgomery roof suits solar?",
        answer: "The city points to the OKI Regional Council of Governments' GO Solar mapping site.",
      },
    ],
  },
  "milford-oh": {
    utility: "Duke Energy Ohio",
    utilityNote: confirmDuke,
    utilityLinks: dukeLinks,
    permitAuthority: "City of Milford (National Inspection Corporation administers building and electrical permits)",
    permitNote:
      "Milford contracts with National Inspection Corporation (NIC) for building and electrical permits, using the Hamilton County fee schedule for building permit fees. Plumbing permits come from Clermont County.",
    permitLinks: [
      { label: "City of Milford, Building department", url: "https://www.milfordohio.org/departments/building_department.php" },
      { label: "City of Milford, Building permits", url: "https://www.milfordohio.org/departments/planning_and_zoning/building_permits.php" },
    ],
    faqs: [
      {
        question: "Who handles the electrical permit for Milford solar?",
        answer: "National Inspection Corporation, under contract with the City of Milford for building and electrical permits.",
      },
      {
        question: "What fee schedule does Milford use?",
        answer: "Milford uses the current Hamilton County fee schedule for building permit fees.",
      },
      {
        question: "Milford is in Clermont and Hamilton counties. Does Clermont Permit Central issue the permit?",
        answer: "Not for city addresses. Milford routes building and electrical permits through NIC; Clermont County handles the city's plumbing permits.",
      },
    ],
  },
  "norwood-oh": {
    utility: "Duke Energy Ohio",
    utilityNote: confirmDuke,
    utilityLinks: dukeLinks,
    permitAuthority: "City of Norwood Building Department (electrical through the Inspection Bureau)",
    permitNote:
      "Norwood says every permit application must be brought in, approved, paid and issued before work begins, and applications and plans cannot be emailed. The city's permit packet says electrical permits are separate and come from the Inspection Bureau.",
    permitLinks: [
      { label: "City of Norwood, Building department", url: "https://www.norwoodohio.gov/197/Building-Permits" },
      { label: "City of Norwood, Permit packet (PDF)", url: "https://www.norwoodohio.gov/DocumentCenter/View/140" },
      ibi,
    ],
    faqs: [
      {
        question: "Can I email a Norwood permit application?",
        answer: "No. Norwood says applications and plans cannot be emailed to the Building Department; they are brought in, approved, paid and issued before work starts.",
      },
      {
        question: "Who issues the electrical permit for Norwood solar?",
        answer: "The Inspection Bureau. Norwood's packet says electrical permits are separate from the city building permit.",
      },
      {
        question: "Is Norwood part of Cincinnati for permits?",
        answer: "No. Norwood is its own city with its own Building Department, even though Cincinnati surrounds it.",
      },
    ],
  },
  "forest-park-oh": {
    utility: "Duke Energy Ohio",
    utilityNote: confirmDuke,
    utilityLinks: dukeLinks,
    permitAuthority: "City of Forest Park Building Department (electrical inspections by IBI)",
    permitNote:
      "Forest Park's Building Department takes residential permit applications through its OpenGov portal or by email to bldgdept@forestpark.org; residential applications need three sets of paper plans plus a PDF. Its required-inspections table assigns electrical inspections to IBI at (513) 381-6080.",
    permitLinks: [
      { label: "City of Forest Park, Building department", url: "https://www.forestpark.org/government/building/index.php" },
      { label: "City of Forest Park, Required inspections", url: "https://www.forestpark.org/government/building/inspection.php" },
      ibi,
    ],
    faqs: [
      {
        question: "Who inspects electrical work for Forest Park solar?",
        answer: "IBI. Forest Park's required-inspections table lists IBI at (513) 381-6080 for rough and final electric.",
      },
      {
        question: "Does Hamilton County issue Forest Park building permits?",
        answer: "No. Forest Park runs its own Building Department; call (513) 595-5264 with questions.",
      },
      {
        question: "How do I apply for a Forest Park permit?",
        answer: "Online through the city's OpenGov portal or by emailing the application and PDF plans to bldgdept@forestpark.org.",
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

/** County or contract offices shared by more than one guide (for "same permit office" links). */
const sharedOffices: { name: string; link: SourceLink }[] = [
  { name: "Montgomery County Building Regulations", link: mcbr },
  { name: "Greene County Building Regulation", link: greeneBldg },
  { name: "Miami County building information", link: miamiBldg },
  { name: "Warren County Building & Zoning", link: warrenSolar },
  { name: "The Inspection Bureau, Inc. for electrical", link: ibi },
  { name: "Kettering building services", link: ketteringSolar },
];

/** Other live city guides whose permit sources include the same county or contract office. */
export function sameOfficeCities(city: City): { office: string; cities: City[] }[] {
  const mine = facts[city.slug];
  if (!mine) return [];
  return sharedOffices
    .filter((office) => mine.permitLinks.some((l) => l.url === office.link.url))
    .map((office) => ({
      office: office.name,
      cities: cities.filter(
        (other) =>
          other.slug !== city.slug &&
          other.status === "live" &&
          facts[other.slug]?.permitLinks.some((l) => l.url === office.link.url)
      ),
    }))
    .filter((group) => group.cities.length > 0);
}
