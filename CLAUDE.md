# Kinton Aerospace: rules for every session

Kinton Aerospace is a fictional company; the site is a concept and the form sends nothing.
`design/design-spec.md` is the source of truth. When a PNG and the spec disagree, the spec wins, and say so.
Astro + TypeScript, plain HTML/CSS, no UI framework. JavaScript only where something moves. Work and commit on `main`.

## The six rules
1. **Colors from jobs only.** Use only job tokens (`var(--text)`, `var(--action)`, ...). Paint tokens (`--paper`...) live once in `src/styles/tokens.css` and are used only by jobs. Never type a hex, `rgb()` or named color in a component. Jobs: background, surface, text, text-muted, border, action, on-action, accent, on-video, map-land, video-backdrop. Accent is for small signals only: never text, never a button fill.
2. **Gaps from the spacing list only.** Every margin, padding and gap is `--space-xs/s/m/l/xl/2xl/3xl/4xl` (8, 16, 24, 32, 40, 80, 160, 200 px). Every rounded corner is `var(--radius)` (6 px); inputs have none. If a gap isn't on the list, stop and ask. Exception: the cabin lights switch's own sizes. Allowed without asking: `transparent`, 1 px and 2 px lines, `border-radius: 50%`, the 2 px focus offset.
3. **Text from the five styles only:** `.t-h1`, `.t-h2`, `.t-large`, `.t-body`, `.t-small`. Inter Regular 400, line-height 1.2, self-hosted via `@fontsource/inter/latin-400.css`. No other sizes, weights or line heights.
4. **Words and numbers from `content/page-text.md` and `data/*.json` only.** Never invent copy, a price or a spec. Number and unit are joined by a non-breaking space (`' '` constant in code).
5. **Missing something? Add it to the system first** (new job in `tokens.css`, same name in Figma), then use it.
6. **Accessibility is part of done:** WCAG 2.2 AA, checklist at the end of the spec. Targets are at least 44 px tall. Focus: 2 px solid `--accent`, 2 px offset (`--on-video` over the hero, `--text` on the map).

## Layout
Mobile first: `min-width: 744px` and `min-width: 1200px`. Grid: mobile 4 cols/16 px, tablet 8/24 with 40 margin, desktop 12/32 with 40 margin. Container max 1440 px; above 1440 the page scales with the screen (text grows half as much, capped at 4/3). Lines are always 1 px `--border` borders, never boxes or shadows.

## Where things come from
- Desktop: hi-fi PNGs in `design/`. Tablet and mobile: wireframe PNGs (layout only; their colors, sizes and words are placeholders).
- Wireframes out of date, follow the spec: header below 1200 px (logo + Menu), the footer, the Price chapter's separate "Request a flight" link, all 14 routes on phones, 4-column section intros on tablet.
- Hi-fi differences to expect: the hero gradient, 44 px clickable areas, table row heights, line breaks, empty legs that have since left.
- Asset pack folders stay as they are. `data/empty-legs.json` is updated weekly and read from `data/`.

## Hosting
Cloudflare static assets from `dist`, `wrangler.jsonc` as in the spec's Hosting section.

## Data facts to respect
- Today's date matters: the site hides empty legs that have left, in the browser, using each departure airport's `timeZone` (departure times are local to that airport; never convert). Home shows the next 3, `/empty-legs` all remaining, soonest first. Data runs to 2027-02-27; after that, move the dates forward.
- `airports.json` has 1 base (BCN) and 14 destinations, shortest first; `aircraft.json` has `featuredRoutes` GVA, LIN, LIS, MUC. Prices are estimates (two flights per trip at €4,800/h, minimum 60 min). The €4,800 also appears in four sentences in `page-text.md` (Home description, price line, Price chapter, "What the price includes").
- Photo alt text and night files come from `aircraft.json`. Hero stills and videos are named in the spec's Hero video table. Home never shows night; only Aircraft's hero turns to night in Dark.
- The wordmark was cut from the Home hero on purpose. Ignore the wordmark in `design/home-hero.png` (and in the sharing image). The hero intro line is Home's H1. There is no `--wordmark-opacity` token. Keep `images/wordmark.svg` in the asset pack.
