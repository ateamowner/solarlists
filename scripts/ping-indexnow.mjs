#!/usr/bin/env node
/**
 * Ping IndexNow with this site's sitemap locs.
 * The IndexNow key is public by design — no secret env var.
 *
 * Usage:
 *   node scripts/ping-indexnow.mjs           # POST after a local or CI build
 *   node scripts/ping-indexnow.mjs --dry-run # print payload only (no network)
 */

import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const host = "solarlists.com";
const siteUrl = "https://solarlists.com";
const endpoint = "https://api.indexnow.org/indexnow";
const dryRun = process.argv.includes("--dry-run");

function findKey() {
  for (const dir of [join(root, "out"), join(root, "public")]) {
    if (!existsSync(dir)) continue;
    for (const name of readdirSync(dir)) {
      if (!/^[a-fA-F0-9]{8,128}\.txt$/.test(name)) continue;
      const key = readFileSync(join(dir, name), "utf8").replace(/\s+/g, "");
      const expected = name.slice(0, -4);
      if (key === expected) {
        return {
          key,
          keyLocation: `${siteUrl}/${name}`,
        };
      }
    }
  }
  throw new Error("IndexNow key file not found in public/ or out/");
}

function readSitemapXml() {
  const candidates = [
    join(root, "out", "sitemap.xml"),
    join(root, "out", "sitemap.xml", "index.xml"),
    join(root, "out", "sitemap.xml", "index.html"),
  ];
  for (const path of candidates) {
    if (existsSync(path)) return readFileSync(path, "utf8");
  }
  throw new Error("Built sitemap.xml not found under out/ — run npm run build first");
}

function parseLocs(xml) {
  const locs = [...xml.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/gi)].map((match) =>
    match[1].trim()
  );
  if (locs.length === 0) {
    throw new Error("No <loc> entries in sitemap.xml");
  }
  const foreign = locs.filter((url) => {
    try {
      return new URL(url).hostname !== host;
    } catch {
      return true;
    }
  });
  if (foreign.length > 0) {
    throw new Error(`Sitemap loc is not on ${host}: ${foreign[0]}`);
  }
  return locs;
}

const { key, keyLocation } = findKey();
const urlList = parseLocs(readSitemapXml());

const payload = {
  host,
  key,
  keyLocation,
  urlList,
};

if (dryRun) {
  console.log(
    JSON.stringify(
      {
        endpoint,
        host: payload.host,
        key: payload.key,
        keyLocation: payload.keyLocation,
        urlCount: urlList.length,
        firstLoc: urlList[0],
        lastLoc: urlList[urlList.length - 1],
        allSlashCanonical: urlList.every((url) => url.endsWith("/")),
      },
      null,
      2
    )
  );
  process.exit(0);
}

const response = await fetch(endpoint, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify(payload),
});

const body = await response.text();
console.log(
  `IndexNow ${response.status} ${response.statusText} (${urlList.length} urls)`
);
if (body) console.log(body);

// 200 = received; 202 = received, key validation pending (first publish).
if (response.status !== 200 && response.status !== 202) {
  process.exit(1);
}
