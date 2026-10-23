import type { SourceLink } from "@/lib/local-facts";

/**
 * Federal tax-credit status for residential solar, checked 2026-10-23.
 * Cite or omit: every sentence below maps to a linked primary or trade source.
 * No percentages or dollar figures are quoted for a household.
 */
export const federalCreditStatus = {
  checked: "October 23, 2026",
  heading: "Federal solar tax credit status in 2026",
  buy:
    "If you buy the system yourself (cash or loan), the federal residential clean energy credit (IRC section 25D) is no longer available for new installs. Public Law 119-21, signed July 4, 2025, ended it for expenditures made after December 31, 2025, and the IRS says an expenditure counts as made when installation is completed. A system finished in 2026 does not qualify, even if a deposit was paid in 2025. Unused credit from a qualifying 2025 install can still carry forward.",
  tpo:
    "On third-party ownership (a lease or power purchase agreement), the provider owns the equipment, so any federal credit belongs to the provider under the business clean electricity credit (IRC section 48E), not to you. The same law requires solar facilities that begin construction after July 4, 2026 to be placed in service by December 31, 2027 to qualify. Whether any of that shows up in your monthly price is a contract question: ask for it in writing.",
  links: [
    {
      label: "IRS, OBBB energy credit FAQs (25D termination)",
      url: "https://www.irs.gov/newsroom/faqs-for-modification-of-sections-25c-25d-25e-30c-30d-45l-45w-and-179d-under-public-law-119-21-139-stat-72-july-4-2025-commonly-known-as-the-one-big-beautiful-bill-obbb",
    },
    {
      label: "IRS, Residential Clean Energy Credit",
      url: "https://www.irs.gov/credits-deductions/residential-clean-energy-credit",
    },
    {
      label: "26 U.S.C. 48E (wind and solar termination)",
      url: "https://uscode.house.gov/us/usc/119-124/t26/s48E/",
    },
    {
      label: "Solar Power World, How the OBBBA changes the residential ITC",
      url: "https://www.solarpowerworldonline.com/2025/07/how-does-hr1-change-the-residential-solar-itc/",
    },
  ] as SourceLink[],
} as const;
