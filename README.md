# SolarLists

National **solar education** site for homeowners who want to think first. Brand: **SolarLists**. Domain: [solarlists.com](https://solarlists.com).

SolarLists is not A Team Contracting and not SunPower.com. Anthony Leonard writes the site from Tipp City, Ohio. Independent-contractor disclosure lives on About and in the footer only — never in an H1. Soft-close consults, when routed, are with Anthony Leonard (SunPower independent contractor) — not A Team.

A Team Contracting is a separate exterior-cleaning business and is off this site.

The published site is a **static export** on GitHub Pages. There is no Node server and `next start` is not used for production.

Do not invent company names, star ratings, installer listings, city-specific prices, savings figures, dollar-per-watt numbers, splits, commissions, incentive dollars, warranties, timelines, traffic stats, a “47 states” claim, or a SunPower service map. Cite or omit.

## Run locally

```bash
npm install
npm run dev
```

Dev app: [http://127.0.0.1:43127](http://127.0.0.1:43127)

Static preview (no Next server):

```bash
npm run build
npm start
```

`npm start` serves the `out/` folder with `serve`. The live site does not run `next start`.

After `npm run build`, `out/` must contain `CNAME` (`solarlists.com`), `.nojekyll`, education routes (`about/`, `sources/`, `consult/`), and leftover city folders such as `dayton-oh/` (kept so old links do not 404; they are noindexed).

## GitHub Pages

This repository publishes its own Pages site from `main` via `.github/workflows/pages.yml`:

1. `npm ci` and `npm run build` (`output: "export"`)
2. Confirm `out/CNAME`, `out/.nojekyll`, and `out/dayton-oh/`
3. `upload-pages-artifact` then `deploy-pages`

Required repo settings (once): **Settings → Pages → Source = GitHub Actions**. Custom domain: `solarlists.com`. `CNAME` is committed as `solarlists.com` (repo root and `public/CNAME`).

Pages source was set to GitHub Actions and the custom domain to solarlists.com on 2026-08-28. HTTPS waits on Porkbun DNS.

This workflow does **not** change [treelist.ai](https://treelist.ai) DNS or the TreeList repo.

## Porkbun DNS (solarlists.com only)

Keep Porkbun nameservers. Local Lead Machine should create these records for **solarlists.com**. Do not apply them to treelist.ai.

**Apex `solarlists.com` — add all four A records**

| Type | Host | Answer |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

**www**

| Type | Host | Answer |
| --- | --- | --- |
| CNAME | `www` | `ateamowner.github.io` |

Do not point `www` at a path such as `ateamowner.github.io/solarlists`. The CNAME target is the GitHub Pages host only.

Remove any Porkbun default parking / URL-forward records on `@` and `www` first.

Optional IPv6 (GitHub Pages AAAA), if you want them:

| Type | Host | Answer |
| --- | --- | --- |
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |

## Consult form destination

Copy `.env.example`:

- `NEXT_PUBLIC_SITE_URL=https://solarlists.com`
- Consult inbox: `Anthony.Leonard.brs@sunpower.com`
- Call/text: `(937) 777-9093` (`tel:+19377779093`)

The consult form is a **native HTML POST** to Formsubmit at that inbox. Hidden `_next` redirects to `https://solarlists.com/request-sent/`. Submit is enabled for the listed IC markets only. Do not point the form at an A Team inbox. Never use `treelist@agentmail.to`. Never invent a Web3Forms, Formspree, or other backend key.

Consults are for homeowners in CA, CO, FL, IL, IN, MA, MD, MI, MN, NC, NV, OH, OR, PA, SC, TX, UT, VA, WA, and WI whose ZIP is not on the private ops filter in `src/config/dq-zips.ts`. That list is not marketed on the homepage. Education stays available elsewhere.

## Pages

- `/` — education home (NEPQ problem-finder questions + secondary consult CTA)
- `/about/` — author, IC disclosure, A Team note, editorial standards
- `/sources/` — cite-or-omit policy and last-reviewed date
- `/consult/` — soft-close form to Anthony Leonard (SunPower IC)
- `/privacy/`
- `/request-sent/` (noindex)
- Legacy city hubs and city × service URLs remain for the static build and old links. They are **noindex,nofollow**, omitted from the sitemap, and **not** 301’d. Later pass: remove the routes.

Brand copy, theme, and consult destinations live in `src/config/site.ts`.

## Education chat (Wave 1)

A floating **Ask about solar** launcher sits on the global layout (Home, About, Sources, Consult). It is a client component: scripted NEPQ chips and curated replies in `src/lib/nepq-replies.ts`, UI in `src/components/solar-chat.tsx`. No Next.js API route and no API key in the client.

- Problem-finding questions first. Soft-close to `/consult/` after two understanding turns. Eligibility stays on the consult form.
- Unknown or number-seeking questions point at `/sources/` instead of inventing savings, city prices, warranties, or timelines.
- `NEXT_PUBLIC_SOLAR_CHAT_ENDPOINT` is a commented, disabled stub for a future server *you* control. Wave 1 does not call an LLM. Never put vendor keys in `NEXT_PUBLIC_*`.

## Numbers

Wave 1 does not publish dollar-per-watt figures, splits, or commissions. Cite or omit.

## SEO

- `sitemap.xml` and `robots.txt` are generated from the education routes. Legacy city × service URLs are omitted from the sitemap and marked `noindex,nofollow` on the page.
- Sitemap `<loc>` values are slash-canonical, including the homepage (`https://solarlists.com/`). Do not revert to no-slash locs. GitHub Pages 301s the no-slash URL to the slash URL.
- `robots.txt` `Sitemap:` points at that slash sitemap. `Host: solarlists.com` is optional (Bing leftover). Do not `Disallow` the leftover city URLs — crawlers need to see the noindex tag.
- Homepage JSON-LD: `WebSite`, `Person` (Anthony Leonard), and `FAQPage` matching the visible homepage FAQs. No SearchAction. No A Team `LocalBusiness`.
- IndexNow key file (this host only; public by design): [`57862ecf4b4f3c4df192ffaf4cffbf6e.txt`](https://solarlists.com/57862ecf4b4f3c4df192ffaf4cffbf6e.txt). After each GitHub Pages deploy, `.github/workflows/pages.yml` POSTs the sitemap locs to `https://api.indexnow.org/indexnow`. No Bing API secret and no secret env var.
- **Anthony:** add `solarlists.com` in [Bing Webmaster Tools](https://www.bing.com/webmasters). Do not invent an `msvalidate.01` code — paste the real one into the HTML comment slot in `src/app/layout.tsx` when Bing issues it. Google HTML verification is already at `/googled3ae2edf58b5b2f8.html`.
