import { OTHER_MARKET, consultMarkets } from "@/config/site";
import { isDqZip } from "@/config/dq-zips";

const icStates = new Set<string>(consultMarkets.map((market) => market.abbr));

export type ConsultGate = "incomplete" | "ok" | "dq" | "out_of_market";

export function normalizeZip(raw: string): string {
  return raw.replace(/\D/g, "").slice(0, 5);
}

/** USPS ZIP3 → IC market only. Anything else is outside served markets. */
export function stateFromZip(zip: string): string | null {
  if (zip.length < 5) return null;
  const prefix = Number.parseInt(zip.slice(0, 3), 10);
  if (Number.isNaN(prefix)) return null;
  if (prefix >= 900 && prefix <= 961) return "CA";
  if (prefix >= 800 && prefix <= 816) return "CO";
  if (prefix >= 320 && prefix <= 349) return "FL";
  if (prefix >= 600 && prefix <= 629) return "IL";
  if (prefix >= 460 && prefix <= 479) return "IN";
  if ((prefix >= 10 && prefix <= 27) || prefix === 55) return "MA";
  if (prefix >= 206 && prefix <= 219) return "MD";
  if (prefix >= 480 && prefix <= 499) return "MI";
  if (prefix >= 550 && prefix <= 567) return "MN";
  if (prefix >= 270 && prefix <= 289) return "NC";
  if (prefix >= 889 && prefix <= 898) return "NV";
  if (prefix >= 430 && prefix <= 459) return "OH";
  if (prefix >= 970 && prefix <= 979) return "OR";
  if (prefix >= 150 && prefix <= 196) return "PA";
  if (prefix >= 290 && prefix <= 299) return "SC";
  if ((prefix >= 750 && prefix <= 799) || prefix === 885 || prefix === 733) {
    return "TX";
  }
  if (prefix >= 840 && prefix <= 847) return "UT";
  if (prefix === 201 || (prefix >= 220 && prefix <= 246)) return "VA";
  if (prefix >= 980 && prefix <= 994) return "WA";
  if (prefix >= 530 && prefix <= 549) return "WI";
  return null;
}

export function consultGate(zipRaw: string, selectedState = ""): ConsultGate {
  const zip = normalizeZip(zipRaw);
  if (zip.length === 5 && isDqZip(zip)) return "dq";
  if (zip.length === 5) {
    const zipState = stateFromZip(zip);
    if (!zipState || !icStates.has(zipState)) return "out_of_market";
    return "ok";
  }
  if (selectedState === OTHER_MARKET) return "out_of_market";
  return "incomplete";
}
