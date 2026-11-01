/**
 * Pages that show a seasonal block, one line per page: "city:service": "block".
 * The block id names a file in this folder. src/lib/lastmod.ts dates each page
 * listed here from its own line, its block file and index.tsx, so a seasonal
 * block bumps sitemap lastmod only on the pages that show it.
 * The federal-credit block is federal, not city-specific: to reuse it on
 * another /{city}/solar-installation/, /{city}/solar-panels/ or
 * /{city}/tpo-solar/ page, add one line here.
 */
export const seasonalRegistry: Record<string, string> = {
  "dayton-oh:solar-installation": "federal-credit-2026-11",
};
