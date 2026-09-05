# SolarLists

Residential solar quote site for Dayton, Columbus, Cincinnati, and nearby Ohio cities. Brand: **SolarLists**. Domain: [solarlists.com](https://solarlists.com).

This is **A Team Contracting** in-house lead gen — not a contractor marketplace and not a utility. Every quote goes to `owner@ateamcontractings.com`. Third-party ownership (TPO / $0-down / no huge loan) and a standard purchase path.

The published site is a **static export** on GitHub Pages. There is no Node server and `next start` is not used for production.

Do not invent company names, star ratings, installer listings, or city-specific prices. National cost ranges only, cited.

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

After `npm run build`, `out/` must contain `CNAME` (`solarlists.com`), `.nojekyll`, `dayton-oh/`, and city × service folders such as `dayton-oh/solar-installation/`.

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

## Quote form and `LEADS_EMAIL`

Copy `.env.example`:

- `NEXT_PUBLIC_SITE_URL=https://solarlists.com`
- `LEADS_EMAIL=owner@ateamcontractings.com`

The quote form is a **native HTML POST** (no `fetch` / XHR). Action: `https://formsubmit.co/owner@ateamcontractings.com`. Hidden `_next` redirects to `https://solarlists.com/request-sent/`. If Formsubmit cannot be used, the form includes a mailto fallback to the same address.

Form v2 (conversion shell): required first — phone, email, ZIP, service (`interested_in`), timing, and privacy consent. SMS stays visible and optional. Optionals sit behind **More details**. No new form key. No Featured / Stripe buy path (this host has neither).

Never use `treelist@agentmail.to`. Never invent a Web3Forms, Formspree, or other backend key.

First Formsubmit delivery requires confirming `owner@ateamcontractings.com` when Formsubmit emails that inbox.

## Pages

- `/` — homepage (TPO + purchase)
- `/privacy/`
- `/request-sent/`
- City hubs (Dayton ring): `/dayton-oh/`, `/kettering-oh/`, `/beavercreek-oh/`, `/centerville-oh/`, `/huber-heights-oh/`, `/fairborn-oh/`, `/miamisburg-oh/`, `/xenia-oh/`, `/vandalia-oh/`, `/springfield-oh/`, `/tipp-city-oh/`, `/oakwood-oh/`, `/west-carrollton-oh/`, `/trotwood-oh/`, `/englewood-oh/`, `/riverside-oh/`, `/moraine-oh/`, `/bellbrook-oh/`, `/springboro-oh/`, `/troy-oh/`, `/clayton-oh/`, `/brookville-oh/`, `/germantown-oh/`, `/franklin-oh/`
- City hubs (Columbus ring): `/columbus-oh/`, `/dublin-oh/`, `/westerville-oh/`, `/grove-city-oh/`, `/upper-arlington-oh/`, `/hilliard-oh/`, `/gahanna-oh/`, `/reynoldsburg-oh/`, `/pickerington-oh/`, `/powell-oh/`, `/delaware-oh/`, `/worthington-oh/`
- City hubs (Cincinnati ring): `/cincinnati-oh/`, `/mason-oh/`, `/west-chester-oh/`, `/hamilton-oh/`, `/fairfield-oh/`, `/lebanon-oh/`, `/loveland-oh/`, `/blue-ash-oh/`, `/montgomery-oh/`, `/milford-oh/`, `/norwood-oh/`, `/forest-park-oh/`
- City × service: `solar-installation`, `tpo-solar`, `solar-panels` under each city (locked H1: `Best {Service} in {City} — 2026`)

Cities, services, theme, and inbox live in `src/config/site.ts`. Unique local copy lives in `src/lib/local-copy.ts`.

## Cost guide

The only dollar range on the site is national:

U.S. residential solar marketplace quotes have recently clustered around about $2.50 per watt before incentives ([EnergySage, H2 2025](https://www.energysage.com/news/home-energy-market-h2-2025-highlights/)). Broader cash-purchase studies report higher national medians. Labeled as a national range, not a city survey.

## SEO

- `sitemap.xml` and `robots.txt` are generated from the city/service config.
- Sitemap `<loc>` values are slash-canonical, including the homepage (`https://solarlists.com/`). Do not revert to no-slash locs. GitHub Pages 301s the no-slash URL to the slash URL.
- `robots.txt` `Sitemap:` points at that slash sitemap. `Host: solarlists.com` is optional (Bing leftover). Do not `Disallow` money pages (homepage, city hubs, service pages, `/for-pros/`, featured, quote, contact).
- Homepage JSON-LD only: `LocalBusiness` (`https://solarlists.com/#organization`, A Team Contracting, in-house TPO / $0-down and purchase quotes — not a contractor marketplace), `WebSite` with `publisher.@id` pointing at that LocalBusiness, and `FAQPage` matching the five verbatim homepage FAQs. No SearchAction. No invented telephone or streetAddress in schema.
- Every city and city × service page includes JSON-LD: `LocalBusiness` for A Team Contracting / SolarLists, `FAQPage` matching the visible FAQs, and `BreadcrumbList`.
- IndexNow key file (this host only; public by design): [`57862ecf4b4f3c4df192ffaf4cffbf6e.txt`](https://solarlists.com/57862ecf4b4f3c4df192ffaf4cffbf6e.txt). After each GitHub Pages deploy, `.github/workflows/pages.yml` POSTs the sitemap locs to `https://api.indexnow.org/indexnow`. No Bing API secret and no secret env var.
- **Anthony:** add `solarlists.com` in [Bing Webmaster Tools](https://www.bing.com/webmasters). Do not invent an `msvalidate.01` code — paste the real one into the HTML comment slot in `src/app/layout.tsx` when Bing issues it. Google HTML verification is already at `/googled3ae2edf58b5b2f8.html`.
