# Kinton Aerospace: design spec

This file is for Claude Code. It is the text version of the Figma design system. The section PNGs in `design/` show what each part should look like. This file says exactly how. When a PNG and this file disagree, this file wins, and you say so.

Kinton Aerospace is a fictional company. The site is a concept: the form sends nothing.

## Rules

Read these first. They apply to every file you write.

1. **Colors come from jobs only.** A component may use only the job tokens in "Jobs" below, like `var(--text)` or `var(--action)`. The paint tokens, like `--paper`, are defined once in `tokens.css` and used only by the jobs. Never type a hex value, an `rgb()` or a named color in a component.
2. **Gaps come from the spacing list only.** Every margin, padding and gap is a `--space-*` token. Every rounded corner is `var(--radius)`. If a gap you need isn't on the list, stop and ask. Don't invent one. The cabin lights switch is the one exception: its 1.5 px line, 3 px lever corners and 3 px inset are its own measurements, given in its section.
3. **Text comes from the five text styles only.** Every piece of text uses one text style class. No other font sizes, weights or line heights.
4. **Words and numbers come from the content files only.** Copy text from `content/page-text.md` word for word. Prices, routes, specs and empty legs come from `data/*.json`. Never invent copy, a price or a spec.
5. **If something is missing, add it to the system first.** A new color is a new job in `tokens.css` and in Figma's Roles collection, with the same name. Then use it.
6. **Accessibility is part of done.** The client needs WCAG 2.2 AA. The checklist is at the end of this file.

**Allowed without asking**, because they aren't design decisions: the keyword `transparent`; 1 px and 2 px lines; circles with `border-radius: 50%`; the focus outline's 2 px offset; and the cabin lights switch's own sizes, listed under its component.

## Color

### Paint

The eight colors from the moodboard. The names say what each color is.

| Token | Name in Figma | Value |
|---|---|---|
| `--black` | Black | #121315 |
| `--graphite` | Graphite | #312D2A |
| `--stone` | Stone | #726D69 |
| `--aluminum` | Aluminum | #AFABA8 |
| `--moonrock` | Moonrock | #DCD9D4 |
| `--paper` | Paper | #F7F4F1 |
| `--white` | White | #FFFFFF |
| `--signal` | Signal | #EC4409 |

### Jobs

The names say what each color is for. Each job has one paint in Light mode and one in Dark mode.

| Token | Light | Dark | Used for |
|---|---|---|---|
| `--background` | Paper | Black | The page and the open menu. The sea on the map too. |
| `--surface` | White | Graphite | Panels and cards that sit on the page |
| `--text` | Black | Paper | Words, and the icons and controls drawn with them: arrows, the cabin lights switch |
| `--text-muted` | Stone | Aluminum | Labels like "Distance," captions |
| `--border` | Black | Paper | Lines, table rules, the line under each field |
| `--action` | Black | Paper | Button fills |
| `--on-action` | White | Black | Text and icons on buttons |
| `--accent` | Signal | Signal | Small signals only: the selected route, the selected cabin area, the switch light, keyboard focus, error markers. Never text, never a button fill. |
| `--on-video` | White | White | Logo, menu and controls over the hero video |
| `--map-land` | Moonrock | Graphite | Land on the range map |
| `--video-backdrop` | Black | Black | Behind the hero video: the color under it before it loads, and, at 50%, the gradient behind the text. The eleventh job, added in the build. Figma doesn't have it: there, the poster always covers the frame. |

The roles card in Figma has one more row, `night-images`. It holds no paint, so it isn't a job in this table. It is how Figma shows the night still in Dark. In the build, only Aircraft's hero turns to night, as "The hero in Dark mode" explains.

### Contrast, checked

Every pair below was checked with the WCAG formula. Don't change a job's paint without checking its pairs again.

| Pair | Light | Dark | Needs |
|---|---|---|---|
| text on background | 17.0 | 17.0 | 4.5 |
| text on surface | 18.6 | 12.4 | 4.5 |
| text-muted on background | 4.66 | 8.2 | 4.5 |
| text-muted on surface | 5.1 | 6.0 | 4.5 |
| on-action on action | 18.6 | 17.0 | 4.5 |
| border on background | 17.0 | 17.0 | 3 |
| accent on background | 3.6 | 4.8 | 3, shapes only |
| accent on surface | 3.9 | 3.5 | 3, shapes only |
| map-land on background | 1.3 | 1.4 | None: land is decoration. Every destination is also a labeled button, and the routes are in a table. |
| accent on map-land | 2.8 | 3.5 | Not used for focus: on the map, the focus ring is `--text`. The selected route and the selected city's dot and ring may sit on land, because the route panel names the route in text. |

White text over the hero video: measured in a browser on the file each width loads, on every frame of the Home videos, rounded down. Without the gradient, the worst frame on the wide video (744 to 2400 px) is 2.6 to 1 behind the intro line and 1.8 to 1 behind "Pause video"; on the phone video (320 to 743 px) it's 5.5 to 1 behind the intro line. So the gradient is essential on wide screens. With the gradient specified under "Hero video", every text area stays at 5.4 to 1 or better on wide screens and 10.3 to 1 or better on phones. The Aircraft video, `aircraft-hero-1080p.mp4`, sets the gradient's strength: a ceiling lamp passes behind the menu, and on every frame at 1440 px the menu's worst spot is 4.9 to 1 at 50%, against 4.3 to 1 at 45%. The Aircraft title, "Our jet", measured the same way on every frame of both Aircraft videos at 50%: 4.4 to 1 at 1440 px, 4.2 to 1 at 834 px and 4.1 to 1 on phones, with the crop under "Hero video". Text that large needs 3 to 1. Below 1200 px, the Aircraft video's ceiling lamps pass behind "Pause video": with the corner layer described under "Hero video", it stays at 4.9 to 1 or better on every frame. Home's pause control on a phone: 6.3 to 1 with the band alone.

### How to write it in CSS

`src/styles/tokens.css`:

```css
:root {
  /* Paint: defined once, used only by the jobs below */
  --black: #121315;
  --graphite: #312D2A;
  --stone: #726D69;
  --aluminum: #AFABA8;
  --moonrock: #DCD9D4;
  --paper: #F7F4F1;
  --white: #FFFFFF;
  --signal: #EC4409;

  /* Jobs: Light */
  --background: var(--paper);
  --surface: var(--white);
  --text: var(--black);
  --text-muted: var(--stone);
  --border: var(--black);
  --action: var(--black);
  --on-action: var(--white);
  --accent: var(--signal);
  --on-video: var(--white);
  --map-land: var(--moonrock);
  --video-backdrop: var(--black);

  /* Spacing and corners (see "Spacing and corners") */
  --space-xs: 8px;
  --space-s: 16px;
  --space-m: 24px;
  --space-l: 32px;
  --space-xl: 40px;
  --space-2xl: 80px;
  --space-3xl: 160px;
  --space-4xl: 200px;
  --radius: 6px;

  color-scheme: light;
}

/* Dark, when the visitor's device asks for it and they haven't chosen */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --background: var(--black);
    --surface: var(--graphite);
    --text: var(--paper);
    --text-muted: var(--aluminum);
    --border: var(--paper);
    --action: var(--paper);
    --on-action: var(--black);
    --map-land: var(--graphite);
    color-scheme: dark;
  }
}

/* Dark, when the visitor turns the cabin lights off */
:root[data-theme="dark"] {
  --background: var(--black);
  --surface: var(--graphite);
  --text: var(--paper);
  --text-muted: var(--aluminum);
  --border: var(--paper);
  --action: var(--paper);
  --on-action: var(--black);
  --map-land: var(--graphite);
  color-scheme: dark;
}
```

`--accent`, `--on-video` and `--video-backdrop` are the same in both modes, so they're defined once.

## Text

One font: **Inter, Regular (400)**, self-hosted with the `@fontsource/inter` package: import only `@fontsource/inter/latin-400.css`, which loads one WOFF2 file with `font-display: swap`. Don't load it from Google's servers: self-hosting is faster and doesn't send visitors' IP addresses to a third party.

Every style: line height 120% (`line-height: 1.2`), no extra letter spacing. `.t-body` and `.t-large` use `text-wrap: balance` from 744 px up, like the Body and Large text styles in Figma, so short texts break into lines of similar length (browsers balance up to about six lines and wrap longer paragraphs normally). On mobile they use `text-wrap: pretty` instead: in a phone's narrow column, balancing a three or four line paragraph leaves the last quarter of the column empty. Every other text style uses `text-wrap: pretty` at every size, so no paragraph ends with one word alone on its last line. Numbers in tables use `font-variant-numeric: tabular-nums`, so prices and times line up.

A number and its unit always stay on one line: join them with a non-breaking space, never a plain space. For example `830&nbsp;km/h`, `3,600&nbsp;km`, `1&nbsp;h&nbsp;15&nbsp;min`, and `€4,800`, which has no space at all. Text built in code uses one shared constant, `'\u00A0'`, written as that escape code so it can't turn into a plain space by mistake.

| Class | Desktop | Tablet | Mobile | Used for |
|---|---|---|---|---|
| `.t-h1` | 60 px | 48 px | 32 px | Page titles |
| `.t-h2` | 36 px | 32 px | 24 px | Section titles |
| `.t-large` | 24 px | 20 px | 18 px | The hero intro line, step titles |
| `.t-body` | 18 px | 18 px | 16 px | Paragraphs, table rows, form fields, buttons, the menu links, chapter titles and texts |
| `.t-small` | 14 px | 14 px | 14 px | Labels, captions, legal lines |

Above 1440 px, every style grows by the wide-screen rule: half as much as the page, up to 4/3 of its size (see "Wide screens").

Two intros, two styles: the hero intro line is `.t-large` with `max-width: 548px` (5 columns at 1440) at every size. On desktop that sets it in two even lines. On tablet and mobile it takes the space next to the pause button, up to 548 px, with at least `--space-s` between them. On every size, the intro and the pause button share one row that starts `--space-2xl` below the header, the intro on the left margin and the button on the right margin. The row aligns on the first line's baseline (`align-items: baseline`), on both pages, and the pause label sits at the top of its 44 px clickable area, so the padding goes below it. On the Aircraft page, the page title takes the intro's place in that row (see "Hero video"). Page and section intros are `.t-body`.

Form fields are never smaller than 16 px on a phone, or iPhones zoom in when you tap them. That's why Body on mobile is exactly 16.

The "Cabin lights" label on the switch follows the same rules as every other label: sentence case, `.t-small`, no extra letter spacing.

## Spacing and corners

| Token | Value | Used for |
|---|---|---|
| `--space-xs` | 8 px | Inside small parts, like an icon next to its label |
| `--space-s` | 16 px | Label to field. Page margin and gutter on mobile. |
| `--space-m` | 24 px | Gutter on tablet. Between rows of a list. |
| `--space-l` | 32 px | Gutter on desktop. Between groups. |
| `--space-xl` | 40 px | Page margin on desktop and tablet |
| `--space-2xl` | 80 px | Between blocks inside a section |
| `--space-3xl` | 160 px | Above the first section of a page |
| `--space-4xl` | 200 px | Between sections |
| `--radius` | 6 px | Every rounded corner: buttons, panels, the switch. Inputs have none: they're a line under the field. |

The values never change by screen size. What changes on mobile is which token two gaps use, so a phone isn't mostly empty space: sections are `--space-2xl` apart instead of `--space-4xl`, and the first section of a page starts `--space-2xl` down instead of `--space-3xl`.

## Screen sizes and grid

| Screen | Width | Design frame | Columns | Gutter | Margin |
|---|---|---|---|---|---|
| Mobile | up to 743 px | 393 px | 4 | 16 px (`--space-s`) | 16 px (`--space-s`) |
| Tablet | 744 to 1199 px | 834 px | 8 | 24 px (`--space-m`) | 40 px (`--space-xl`) |
| Desktop | 1200 px and up | 1440 px | 12 | 32 px (`--space-l`) | 40 px (`--space-xl`) |

Write the media queries mobile first: `@media (min-width: 744px)` and `@media (min-width: 1200px)`. At 1440 px and below, content sits in a container no wider than 1440 px, centered. The hero video and the chapter photos run edge to edge, and so does the range map on tablet and mobile. Wider screens follow "Wide screens" below.

**Wide screens (above 1440 px).** The design was made at 1440 px, so above that width the 1440 px layout grows with the screen and keeps its proportions:
- The page grows with the screen: every spacing token, the margins, gutters and columns, the photos and every fixed width in this spec are multiplied by the screen width divided by 1440. 1 px lines and the 2 px focus outline stay as they are.
- Text grows half as much: each text style is multiplied by 1 plus half the page's growth. When the page is 1.5 times its 1440 px size, the text is 1.25 times its size.
- Text stops growing at 4/3 of its 1440 px size, which it reaches at 2400 px: Body stops at 24 px and `.t-h1` at 80 px. That keeps every text style within 2.5 times its mobile size, the usual limit that lets browser zoom still double all text (WCAG 1.4.4).
- Above 2400 px, the page keeps its 2400 px layout, centered. The chapter photos stop at the page's edge. The hero video still runs edge to edge and keeps the shape it has at 2400 px, so its height grows with its width and the video is cropped the same way as at 1440 px. The text stays in the 2400 px frame, so it sits over a different part of the video there: measured again on both videos, one frame per second, every text area stays at 5.4 to 1 or better at every width.
- Put the rule in `tokens.css` and the five text style classes, so every page gets it from the design system, never page by page.

## Pages

Six pages, plus a "Page not found" page. Every page has the same header and footer.

| Page | URL | Designed in | Built from |
|---|---|---|---|
| Home | `/` | Hi-fi PNGs (desktop), wireframes (tablet, mobile) | This file |
| Aircraft | `/aircraft` | Hi-fi PNGs (desktop), wireframes (tablet, mobile) | This file, `aircraft.json`, `airports.json` |
| Empty legs | `/empty-legs` | Not designed | The patterns below, `empty-legs.json` |
| Standards | `/standards` | Not designed | The patterns below |
| Company | `/company` | Not designed | The patterns below |
| Request a flight | `/request` | Not designed | The form section below |
| Page not found | `/404` | Not designed | The page header pattern |

The tablet and mobile wireframe PNGs show layout only: what goes where, in what order, and what stacks. Their gray boxes, text sizes and words are placeholders. Take every color, text style and gap from this file, and every word from `page-text.md`, the same way the desktop hi-fi does. For example, the Empty legs title is tiny in the wireframes and `.t-h2` on the site, at every size. A few things in the wireframes are out of date, so follow this file:
- The tablet wireframes show the desktop header. Build the logo and Menu button below 1200 px, as "Header" says.
- The tablet and mobile wireframes show an older footer (see "Footer").
- The tablet and mobile wireframes end the Price chapter's text with "Request a flight". It's a separate link under the text (see "Chapters").
- The mobile Aircraft wireframe lists only the four featured routes. Phones show all 14 (see "Range map").
- The Aircraft tablet wireframes draw each section's intro at the desktop width, 316 px. On tablet it's 4 columns wide, as in the Home tablet wireframe and "Section header" below.

The hi-fi PNGs were drawn in Figma, so a few things in them are drawn, not measured. Follow these rules where a PNG looks different:
- The hero gradient isn't in the PNGs: Figma doesn't draw it. The build always has it, so the top of the hero is darker than in the PNG. Don't match the PNG's brightness.
- Links and controls are drawn at the height of their text. On the site, each one has a clickable area at least 44 px tall (see "Buttons"), so things stacked under each other sit a little further apart than in the PNG: footer links 44 px apart, not 38.
- Table rows, and the rows of the route panel on Aircraft, are drawn 48 px apart. On the site, follow "Tables" under the patterns below: rows with a link come out 45 px, the others 55 px.
- Paragraphs break differently, because Figma and browsers balance lines differently. That's expected.
- The Price chapter's "Request a flight" link isn't drawn in `home-chapters.png`. The site has it (see "Chapters").
- The empty legs in `home-empty-legs.png` have left by now. The site hides legs that have left (see "Empty legs"), so it shows later ones.

### Patterns for the pages that weren't designed

Empty legs, Standards, Company and Page not found have no design. They share one layout, so each page reads down one line instead of starting its content in a different place for every section.

- **The split (desktop, 1200 px and up):** every block on these pages has its title in columns 1 to 4 and everything else in columns 5 to 12, from 504 px at 1440: paragraphs, lists, steps, notes and the button. All of it starts on one line, the left edge of column 5. The title and its content line up at the top (`align-items: start`). The page header and tables with more than three columns are the exceptions (see below).
- **Page header:** the H1 on the left, and the intro on the right in `.t-large`, left-aligned in the last 4 columns (432 px at 1440). It starts on column 9, the same column where the text of each step starts on Standards, so the header and the first section share one edge. Like every left-aligned text on the site, its lines end before the right margin. On Standards the intro sets in two lines. Line up the top of the intro's letters with the top of the H1's letters, not the tops of their boxes: the H1's line height leaves more space above its letters, so boxes lined up at the top leave the intro sitting too high. `--space-3xl` above it (`--space-2xl` on mobile), measured from the bottom of the header, so the fixed header never covers it. Below 1200 px, the intro goes under the H1, as "Below 1200 px" says.
- **Sections:** the split, with the H2 on the left. `--space-4xl` apart (`--space-2xl` on mobile). Space them with `gap` on their parent or with `.section ~ .section`, not `.section + .section`: Astro puts a component's `<script>` where the component sits, which can land between two sections and break `+`.
- **Paragraphs:** `.t-body`, at most 6 columns wide (664 px at 1440), so the lines stay easy to read. `--space-s` between two paragraphs. When a paragraph comes before a list, like in "Our safety audit", the list starts `--space-l` below it.
- **Lists** (crew rules, cancellation terms, the price lists): `.t-body`, no bullets, `--space-s` above and below each item, and a 1 px `--border` line under each item and above the first one (or under the list's label, if it has one), as in the hi-fi price lists. On these four pages a list stays in columns 5 to 12, lines included, never the full width. An item with a title and a text, like each one in "Before you fly", is a row of two columns: the title in `--text-muted` in columns 5 and 6, the text in columns 7 to 12. Below 1200 px, the title goes above the text, `--space-xs` apart.
- **Numbered steps** (Standards' "How a request works", also on the request form): the number in `.t-large` and `--text-muted`, next to the title in `.t-large`, in its own column `--space-l` wide; the text in `.t-body`. The number is written "1", not "01". On Standards, each step is a row, like a list item: a 1 px `--border` line above it, `--space-m` above and below its text, the number and title on the left, and the text on the right, starting at column 9, the same column as the page header's intro (column 5 on tablet), so the empty columns between them keep the steps calm. On mobile, the text goes under the title, lined up with it, `--space-s` below. On the request form the steps are stacked, `--space-l` apart, each with the text under its title, lined up with the title, not with the number (see "Request form").
- **A table with more than three columns** on these pages, like the team on Company and the empty legs: the title stays in columns 1 to 4, and the table runs the full width, columns 1 to 12, `--space-l` below it, because its columns need the room. Size its columns to their content, not to equal widths: a real `<table>` with the browser's automatic layout does this, so at 1440 no cell wraps. The team table's rows keep `--space-s` above and below their text, even with the phone and email links in them: its text can wrap below 1440, and wrapped text must never touch the lines. The links' 44 px clickable areas fit inside those rows. Below 1200 px, each person in the team becomes a stacked block, as on mobile, because five columns don't fit.
- **Tables:** column labels in `.t-small`, `--text-muted`, with `--space-s` above and below them. Rows in `.t-body`, with a 1 px `--border` line under each row (and under the labels). A row with a link in it ("Hold", "Request") has no vertical padding: the link's 44 px clickable area sets the row's height. Every other row has `--space-s` above and below its text. On mobile, each row becomes a stacked block: the label in `.t-small` above its value. The empty legs are the exception: on mobile, `/empty-legs` uses the same block as Home (see "Empty legs").
- **Lines:** every line on the site is a 1 px `--border` border (`border-top` or `border-bottom`), never a 1 px tall box, a background or a shadow. On screens scaled to 125% or 150%, which many Windows laptops use, browsers round borders to whole screen pixels but not boxes, so lines drawn two ways come out in two thicknesses.
- **Below 1200 px:** no split. The title goes above its content, `--space-l` apart (on mobile, an H1 and its intro are `--space-s` apart). Paragraphs still stay at most 664 px wide.
- **Section header** (designed sections that need one, like "What the price includes" on Aircraft): the H2 on the left and the intro on the right, 3 columns wide (316 px at 1440) and flush right, in `.t-body`. On tablet, 4 columns wide. On mobile, the intro goes under the H2, `--space-s` apart. The H2 and the intro line up at the top (`align-items: start`), however many lines the intro runs. The section's content starts `--space-l` below.
- **Page not found:** the page header, with the text in the intro's place, starting on column 9. The button and the link go under the text, on the same column, so they share its edge.
- **Column 5 only where the left holds something.** Content starts on column 5 only when columns 1 to 4 hold something, like the section titles on Standards and Company. A page with no section titles, like Empty legs, would leave columns 1 to 4 empty all the way down, and its content would start on an edge nothing else uses. There, content starts on the left margin, under the H1.
- Every page ends with its button from `page-text.md`, `--space-2xl` below the content before it unless its section says otherwise. On the four pages without a design, it sits in columns 5 to 12, like the rest of the content. On most pages that's "Request a flight", as the brief asks; Company's is "Contact the team". Page not found has one button, "Go to the homepage", and "Request a flight" as a text link with an arrow after it, `--space-l` apart, so one action leads.

## Components

### Header

- Desktop (1200 px and up), one row: the logo on the left margin, the four links in `.t-body` exactly on the page center, and the "Request a flight" button on the right margin, its label also in `.t-body`, like every button. The links stay on the page center whatever the logo and the button measure. In CSS: a grid with `grid-template-columns: 1fr auto 1fr`, the logo at the start of the first column, the links in the middle column, the button at the end of the last column.
- The logo is `images/logo.svg`, "Kinton Aerospace" on two lines, shown at its own size: 80 by 35 px, at every screen size. Put the SVG inline with `fill: currentColor`, inside the home link, with `aria-label="Kinton Aerospace, home"` on the link.
- Below 1200 px: the logo and a "Menu" button. One row doesn't fit there. The menu opens as a full-screen `--background` panel with the links in `.t-h2` and the button. It covers the whole page, so it uses the page's colour, not `--surface`, which is for panels and cards that sit on the page. In Dark, Graphite filling the whole screen reads as brown. The Menu button's text becomes "Close menu". While the menu is open, "Close menu" stops looking like a button: "Request a flight" is the panel's main action, and two filled buttons in one view compete. It looks like the hero's pause control: `.t-body`, `--text`, no box, no fill, underlined on hover and keyboard focus. It has no side padding, so its text ends on the right margin, mirroring the logo on the left. The padding above and below stays, so its clickable area stays at least 44 px tall and its vertical centre doesn't move. It's still a `<button>` with `aria-expanded`. With the menu closed, "Menu" keeps its `--action` fill. It switches at once when the menu opens or closes, with no fade. Escape closes the menu, focus moves into the panel when it opens and back to the Menu button when it closes.
- The cabin lights switch is not in the header. It's in the footer, on every page and at every size.
- Over the hero video (Home, Aircraft): the header uses `--on-video`. On every other page: `--text`, on `--background`.
- The header sits `--space-xl` from the top of the window (`--space-s` on mobile, the same as the page margin there) and stays there when the visitor scrolls (`position: fixed`).
- Only the logo, the links and the buttons take clicks. The rest of the fixed bar lets them through to the page under it (`pointer-events: none` on the bar, `auto` on its links and buttons), or its empty grid cells would block whatever scrolls beneath them.
- On desktop the four links are `--space-l` apart. In the menu panel, `--space-m` apart. Each menu link is only as wide as its text (`align-items: flex-start` on the list, not the default stretch), so its focus outline fits the word.
- At the top of the page, the logo, the links and the button have no boxes: the logo sits on the left margin and the button ends on the right margin.
- Once the page is scrolled more than 10 px, the header changes, and changes back when the visitor returns to the top:
  - The links stay exactly where they are, on the page center.
  - The logo and the button slide in toward the links over 600 ms, `cubic-bezier(.2, .7, .2, 1)`, until each is `--space-s` from the links' box.
  - The logo and the links each get a box: `--surface` background in Light and `--background` in Dark, a 1 px `--border` line around it, `--radius` corners, `--space-m` padding on the sides. In Dark, Graphite's warm tone reads as brown next to the hero's blue sky, so the boxes use Black. The text in them turns `--text`. The button keeps its own `--action` fill. The line is what shows the boxes on pages without a hero: White on Paper is only 1.1 to 1, and in Dark the box and the page are both Black. Draw each box as its own layer behind its content (a `::before`), reaching `--space-m` past the text on each side, so the box never moves the text: at the top, the logo still sits on the left margin and the links on the page center. The boxes and the text colour switch at once, with no fade, in both directions: a half-faded box over the moving video looks muddy. Only the logo and the button slide.
  - All three are the same height. The button sets it, with `--space-s` by `--space-m` padding around a `.t-body` line, and the two boxes stretch to match (`align-items: stretch`). No fixed height.
- With reduced motion on, nothing slides: the scrolled header appears at once.
- Below 1200 px nothing moves: the logo and the Menu button keep their places on the margins, and the logo gets the same box at once when the page is scrolled. On mobile, where the margin is only 16 px, the logo's box uses `--space-xs` on the sides instead of `--space-m`, so it stays on the screen.
- While the menu panel is open, the logo has no box, in Light and Dark, whether the page is scrolled or not, the same as at the top of the page. The panel already separates the logo from the page, so a box would only add an outline. The box comes back at once when the menu closes. It's its own layer, so the logo doesn't move. When scrolled, the logo's focus outline is drawn on the box; with the menu open, the logo has its own `--accent` outline instead, so keyboard focus stays visible.
- First thing in the page: a "Skip to content" link, visible when focused.

### Buttons

- Fill `--action`, text `--on-action`, `.t-body`, radius `--radius`, at least 44 px tall, padding `--space-s` by `--space-m`. One rule for every button, including the request bar's: the dark fill carries the emphasis, not the type. In Figma it's one component, Hi-Fi/Button, with a Label text property and an Arrow boolean.
- The arrow icon sits `--space-xs` after the label, in the same color. It's decorative: `aria-hidden="true"`. Every button has it except the header's.
- The arrow is `images/arrow.svg`: a filled shape with square ends and a sharp point, as in the hi-fi PNGs. Don't draw your own. Put it inline, so its `fill: currentColor` takes the text color, at `width: 1em; height: 1em`: 18 px next to 18 px text, and it scales with the text.
- Text links with an arrow ("All empty legs", "Hold", "Request"): `--text`, underlined on hover and keyboard focus. The hero's pause control uses the same look, in `--on-video` and without the arrow. One shared rule draws every hover and focus underline on the site: the text links, the header, menu and footer links, "Pause video", "See it at night" and "Close menu". Its hover part sits inside `@media (hover: hover)`, because a phone keeps a tapped link in its hover state until the next tap, which would leave it underlined. Its focus part uses `:focus-visible`, so a mouse click doesn't leave an underline either. Links that are always underlined stay underlined.
- Every link and control that isn't inside a sentence has a clickable area at least 44 px tall, made with padding, with no visible box. That includes the footer links.
- Focus, everywhere: a 2 px solid `--accent` outline with a 2 px offset, as the Jobs table says. Over the hero video: `--on-video`. On the range map: `--text`, because a city's outline can fall on the land, and Signal on Moonrock is only 2.8 to 1. Everywhere else, Signal passes 3 to 1 as a focus outline in both modes. Fields with a line under them are the exception, because an outline would draw a box around a field that's only a line. Browsers show focus on a text field even after a click, so the box would appear every time. A focused field shows its line 2 px thick in `--text`, and its label in `--text`. A field with an error keeps its 2 px `--accent` line.
- Rounded focus outlines: links and buttons with no visible box of their own get `border-radius: var(--radius)`, so their outline has the same rounded corners as the logo's. That covers text links, the header, menu and footer links, "Hold", "Request", "Pause video", "See it at night", the stepper's buttons, the cabin lights switch and the cabin plan's accordion buttons on phones. They have no fill and no border, so the radius only shows on the outline, and nothing changes when nothing is focused. Anything with a visible fill or border keeps its own shape: the filled buttons, the skip link, the fields and the cabin area buttons on tablet and desktop, whose line above belongs to the button. On phones that line belongs to the accordion row, so the accordion buttons get the radius. The native checkbox stays as the browser draws it.

### Cabin lights switch (Light and Dark)

- One button with `role="switch"`. Its visible label is "Cabin lights"; its accessible name is "Cabin lights, light and dark mode", and `title="Light and dark mode"` gives the hint on hover. `aria-checked="true"` means lights on, which is Light mode.
- Parts, `--space-xs` apart: an 8 px light (on: `--accent` with a soft glow; off: an empty ring), the label "Cabin lights" in `.t-small`, and a track 48 by 24 px with a 1.5 px line and `--radius`, holding a 15 by 15 px lever with a 3 px radius, 3 px inside the line on every side. Lights on: the lever sits on the right. Turning them off slides it 24 px to the left in 260 ms.
- On hover, the light glows a little brighter, and the cursor is a pointer, so it reads as something to click.
- The whole switch is at least 44 px tall.
- Clicking it sets `data-theme="light"` or `data-theme="dark"` on `<html>` and saves the choice in `localStorage`. Wrap storage in `try`/`catch`: if it fails, the switch still works for the visit.
- Until the visitor chooses, the site follows the device setting. Set the theme in a small script in `<head>` (Astro's `is:inline`), before the page draws, so the page never flashes the wrong mode. The switch's starting `aria-checked` matches the mode actually showing: the saved choice, or else the device setting.
- With reduced motion on, the lever moves without the slide.

### The hero in Dark mode

On Aircraft, the hero turns to night in Dark. Home's hero stays the same in Dark: its job is to sell the jet, and at night the jet is dark and the lights take the attention. On Aircraft, the hangar lights shine on the jet, so it stays visible at night. Every other photo stays as it is: the chapters and the cabin plan show the jet, and that doesn't change when the lights are dimmed. A visitor who wants to see a chapter at night asks for it with that chapter's own button (see "Night view" under "Chapters").

- Home shows the same still and video in Light and in Dark, and the switch doesn't touch it. `images/jet-poster-dark.jpg` and `images/jet-poster-phone-dark.jpg` are the night hero from the Figma design; the build doesn't use them.
- Home's still is a `<picture>` with two entries: the phone still with `media="(max-width: 743px)"`, then the `<img>` with the day still. The first entry that matches wins, so each screen downloads one still.
- Aircraft has a night still and a night video, graded to the palette. The files are listed under "Hero video".
- On Aircraft, load only the version that shows. Write the still as a `<picture>`: a `<source>` with the night still and `media="(prefers-color-scheme: dark)"`, then the `<img>` with the day still. That follows the device setting with no script.
- When the visitor's choice differs from the device setting, set Aircraft's night `<source>`'s `media` to `all` in Dark and `not all` in Light. Do it with a one-line inline script placed right after `</picture>`, not inside it, and again from the switch's script when the switch is used. A script between the `<source>` and the `<img>` makes Chrome download both stills on every visit. Visitors whose saved choice differs from their device download the device's still too; that's the accepted cost of a site with no server.
- The script that starts the video picks, on Aircraft, the day or night file, and on Home, the phone or wide file. On Aircraft it swaps the file when the switch is used. On Home it swaps the file when the window crosses 744 px (a phone turned sideways), the same way. Safari's engine, WebKit, doesn't always pick a `<picture>` source again at that crossing, so the old still can stay on screen when no video is playing. At the crossing, the script removes the `<img>`'s `sizes` attribute and puts it back, which makes WebKit pick again.
- The swap is instant. Load the other still and wait for its `decode()`, so no empty frame ever shows. Then, in one frame, hide the video and show the other still. Then the other video fades in over its still and starts, as on page load. Don't dissolve from the playing video to the other still: the video has moved since its first frame, so the jet would show in two places during the fade. If the visitor paused the video, the other one stays paused on its still.

### Hero video (Home and Aircraft)

Each page has its own video. Home shows the jet in flight. Aircraft shows it parked in its hangar, so a click on Aircraft visibly lands somewhere new.

| Page | Still, Light | Still, Dark | Video, Light | Video, Dark |
|---|---|---|---|---|
| Home | `jet-poster-light.jpg` | Same as Light | `jet-hero-1080p.mp4` | Same as Light |
| Home, below 744 px | `jet-poster-phone-light.jpg` | Same as Light | `jet-hero-phone.mp4` | Same as Light |
| Aircraft | `aircraft-poster-light.jpg` | `aircraft-poster-dark.jpg` | `aircraft-hero-1080p.mp4` | `aircraft-hero-dark-1080p.mp4` |

Each still is its video's first frame, so nothing jumps when the video fades in.

- Height: 780 px on desktop on both pages. Tablet and mobile, as in the wireframes: Home 880 and 640 px, Aircraft 720 and 560 px. The still and the video fill it (`object-fit: cover`). Below 744 px, Home uses its phone files: 1080 by 1920, made from the wide videos, so the jet, the clouds and the loop are the same, with more sky above and haze below. There, the wide video would show only about a third of its width and cut off the jet. The phone files stay centred (`object-position: 50% 50%`), and the whole jet shows at every phone width. Phones download only the phone files, and wider screens only the wide ones. Measured from 320 to 743 px, on every frame of the phone video, white text over the gradient stays at 10.3 to 1 or better.
- Aircraft below 1200 px: the hero shows only part of the video's width, and no crop fits the whole jet, so the crop is deliberate. Below 744 px, `object-position: 17.5% 50%` shows the front half of the jet: the nose with a little space in front of it, the cockpit, the open door with its stairs and the first windows. From 744 to 1199 px, `object-position: 25% 50%` keeps the whole nose in frame. The still, the video and the night versions all use the same position, so nothing jumps during a switch. The camera drifts during the loop, so the positions were measured over every frame of both videos. Below about 350 px, the second window starts to leave the frame. Desktop stays at `50% 50%`.
- Five layers, bottom to top: the hero's own background, `--video-backdrop`, so white text reads even before anything loads; the still; the video; the gradient; the text and controls.
- The still (on Aircraft, the night one in Dark, see "The hero in Dark mode") is a real `<img>` with `fetchpriority="high"`: it's the first thing a visitor sees and the main content for the 2.5 second target.
- The video (on Aircraft, the night one in Dark) is `muted`, `loop`, `playsinline`, with no `autoplay` attribute and `preload="none"`. A small script fades it in over the still after the page has loaded, unless the visitor has reduced motion turned on. During the 400 ms fade, the video is held on its first frame, so it matches the still exactly. It starts playing only when the fade has finished. If it played during the fade, the jet would show twice, because it moves a few pixels in 400 ms. The same applies wherever a video fades in over its still: after the switch, and after crossing 744 px.
- The gradient is its own layer and is always on, over the still and the video, with or without reduced motion: `linear-gradient(to bottom, color-mix(in srgb, var(--video-backdrop) 50%, transparent) 0%, color-mix(in srgb, var(--video-backdrop) 50%, transparent) 35%, transparent 65%)`. It matters most on mobile, where the intro line is 18 px.
- Aircraft only, below 1200 px: a second layer over the top right corner, where the hangar's ceiling lamps pass behind "Pause video": `radial-gradient(ellipse 70% 60% at 100% 0%, color-mix(in srgb, var(--video-backdrop) 30%, transparent) 50%, transparent 100%)`. With it, the pause control stays at 4.9 to 1 or better on every frame, measured from 360 to 1199 px. Tablets need it too: without it, "Pause video" falls to 3.5 to 1 at 834 px.
- The pause control: "Pause video" while it plays, "Play video" while it's paused. It looks like the site's text links: `.t-body`, `--on-video`, underlined on hover and keyboard focus, no box. It's still a `<button>` element, because it does something rather than going somewhere, and its clickable area is at least 44 px tall (padding, no visible box). It sits on the right margin of the intro row, inside the gradient band. The accessibility check measures its contrast on the worst frame of the video, top right; if that corner fails 4.5 to 1, strengthen the gradient there, don't add a box. The video moves for more than 5 seconds, so WCAG requires a way to pause it.
- Pausing or playing moves nothing. "Pause video" and "Play video" have different widths, so if the button swapped its text, it would change width and the intro line next to it would rewrap on every press. Put both labels in the button, stacked in one grid cell: `display: grid` and `place-items: start end` on the button, `grid-area: 1 / 1` on each label. Hide the one that doesn't apply with `visibility: hidden`, not `display: none`, so the button always keeps the width of the longer label. A hidden label isn't read by screen readers, so the button's name is always the visible one.
- With reduced motion on, the video never starts on its own. The still stays, and the control reads "Play video".
- The video is decoration: `aria-hidden="true"` on it. The still has `alt=""`.
- Home: no wordmark. It was cut on purpose, and `images/wordmark.svg` stays in the asset pack only. The hero's intro line is the page's `<h1>`, set in `.t-large` as before. The hero keeps its heights, so the video shows where the wordmark was.
- Aircraft: the H1 "Our jet" is visible, in `.t-h1` and `--on-video`, on the left of the intro row, where Home has its intro line. The pause button stays on the right, on the title's baseline (`align-items: baseline`).

### Request bar (Home)

- Fields: From, To (text inputs with a list of the airports in `airports.json`), Date (a native date input, so phones show their own date picker), and Passengers (a stepper from 1 to 7, starting at 1).
- The airport list offers Barcelona and the 14 destinations, each written like "Geneva (GVA)", as routes are. Visitors can also type a place that isn't listed. In the URL, a listed airport is its code (`from=GVA`) and anything else is the text as typed. `/request` shows a code the same way, "Geneva (GVA)", and typed text as it is.
- The airport list is the site's own, not the browser's: no `<datalist>`, whose popup can't be styled and looks different in every browser. It opens under the field when the visitor clicks it, types or presses Down: a `--surface` panel as wide as the field, `--space-xs` below its line, with a 1 px `--border` line around it, `--radius` corners and `--space-xs` padding at the top and bottom. Each airport is a row in `.t-body`, `--text`, at least 44 px tall, with `--space-s` padding on the sides and `--space-xs` above and below, so a name that wraps in a narrow field doesn't touch the row's edges. Typing shows only the airports whose city or code starts with what's typed; when nothing matches, the list closes, and the visitor keeps what they typed. At most 6 rows show, and the rest scroll, with a thin scrollbar (`scrollbar-width: thin; scrollbar-color: var(--text-muted) transparent`). The row under the mouse, or picked with the arrow keys, is underlined, like a text link on hover. Up and Down move through the rows, Enter or a click picks one and closes the list, Escape closes it, and Tab moves on with what's typed. The field is a `role="combobox"` with `aria-autocomplete="list"`, `aria-expanded` and `aria-controls`; the list is a `role="listbox"` of `role="option"` rows, and the row picked with the arrow keys is the field's `aria-activedescendant`. `autocomplete="off"` keeps the browser's own suggestions away. The request form uses the same list.
- The stepper's buttons are named "Fewer passengers" and "More passengers". The number is announced when it changes. The minus is a real minus sign (−, U+2212), not a hyphen, so it matches the plus in width and height.
- Labels in `.t-small`, `--text-muted`. Fields in `.t-body` with a 1 px `--border` line under them. Placeholder hints ("City or airport", "Pick a date") in `--text-muted`; what the visitor types or picks, and the stepper's minus, number and plus, in `--text`.
- A native date input can't show a placeholder: browsers draw their own date format in it. So while the date is empty and not focused, show "Pick a date" over the field in `--text-muted`, hidden from screen readers (`aria-hidden="true"`, since the label already names the field), and make the field's own text transparent. The browser's calendar icon stays.
- Safari on iPhone draws date and time fields with its own height and centres the date, so on mobile, where Date and Passengers sit side by side, the two lines under them don't line up. Give every date and time field `appearance: none`, the same height as the text fields (`height: calc(2 * var(--space-s) + 1.2em)`: their padding plus one line), and `::-webkit-date-and-time-value { text-align: start }`, so the date starts on the left like every other field's text. The calendar icon still shows on desktop. On the request form, also give them `min-width: 0`: Safari gives date fields a minimum width that can push them out of their column.
- Clicking anywhere on a date or time field opens the browser's own picker, not only its icon: call the field's `showPicker()` on click, inside a `try`, because some browsers have no picker for times. Call it after the browser's own click handling (a `setTimeout` of 0): Firefox opens and closes its picker on an icon click by itself, and opening it first would let Firefox close it again. Keyboard users can still type the date. The request form's date and time fields work the same way.
- The bar has no background of its own: it sits on `--background`, like the page.
- Draw the line under each field as a 1 px `--border` bottom border, with 1 px less bottom padding, so the field stays 54 px tall, the same as the button, and the field text and the button label share a line. The 2 px lines, for focus and for errors, work the same way: a 2 px bottom border with 1 px less padding again, so nothing moves. Use a border, not a `box-shadow`: Windows high contrast mode removes shadows, and the line and its focus state with them. In Figma this is Strokes: Excluded.
- Desktop: each field column stretches to the height of the row, with its label at the top and its field at the bottom (`justify-content: space-between`). So the labels line up with the top of the price text, and the field lines with the bottom of the button: two straight lines across the bar. The four fields are equal widths, `--space-l` apart, and the price and button sit `--space-2xl` after them, in one column 244 px wide, `--space-m` apart. The bar has `--space-xl` padding on every side.
- Tablet and mobile: the label sits `--space-s` above its field.
- The button opens `/request` with the four fields filled in, through the URL: `/request?from=BCN&to=GVA&date=2026-10-23&passengers=2`.
- Desktop: one row. Tablet: the four fields in a row, the price line and button below. Mobile: stacked, with Date and Passengers side by side.

### Chapters (Home)

Four chapters: Jet, Safety, The Cabin, Price. Each one is a photo, a title in `.t-body` and a text in `.t-body`. The titles are still `<h2>` elements, so the page outline stays right; only their size is quiet. Their place in the layout, in their own column next to the text, is what sets them apart. Photos: `jet-exterior.jpg` for Jet, `jet-cockpit.jpg` for Safety, `cabin-club.jpg` for The Cabin, `cabin-seat.jpg` for Price. `cabin-forward.jpg` is only used in the Aircraft page's cabin plan.
- Desktop: the photo runs from the left edge of the screen to the end of column 7, 820 by 540 px at 1440 (`aspect-ratio: 820 / 540`); the title and text sit to the right, side by side, as in the hi-fi PNG.
- Tablet: the photo runs edge to edge at 3:2, the title and text below, side by side. Chapters `--space-2xl` apart.
- Mobile: the photo edge to edge at 3:2, the title and text below, stacked. Chapters `--space-xl` apart.
- Desktop photos `--space-xs` apart. Each photo has the alt text from `aircraft.json`.
- The Price chapter also has a "Request a flight" text link with an arrow, `--space-s` under its text, at every size. It looks like "All empty legs" and goes to `/request`.

#### Night view

Each chapter can show its photo at night. The visitor decides, one chapter at a time. The page's mode doesn't: in Light and in Dark, every chapter starts in daylight.

- The button: "See it at night", and "See it by day" while the night photo shows. It's a real `<button>` that looks like the pause control: `.t-body`, `--text`, no box, no icon, underlined on hover and keyboard focus, with a clickable area at least 44 px tall. The label says what happens next, like "Pause video", so it needs no `aria-pressed`. Give it `aria-controls` with the photo's id.
- Where: right under the chapter title, the same place in every chapter. Desktop and tablet: `--space-s` under the title, in the title column. Mobile: on the right of the title, on the same row.
- The night photo, from `nightFile` in `aircraft.json`, sits exactly on top of the day photo and fades in over 400 ms. With reduced motion on, it switches with no fade.
- Load it only when it's asked for: no `src` until the first press (keep the path in `data-src`), then wait for `decode()` before the fade. Until then, the day photo is the only one downloaded.
- Alt text: the photo that shows carries its alt, `alt` or `nightAlt` from `aircraft.json`. The hidden one has `alt=""`.
- Nothing is saved. A reload starts every chapter in daylight.

### Empty legs

- Home shows the next 3 legs. `/empty-legs` shows every leg that hasn't left yet, soonest first. Hide legs that have already left, and do it in the browser when the page loads, not only when the site is built, so a leg disappears on time even if nobody rebuilds the site.
- Each departure is written in the departure airport's local time, and each airport in `airports.json` has its `timeZone` (like `Europe/Lisbon`). Use it to know the exact moment a leg leaves, so Lisbon and London legs don't disappear an hour early.
- Columns on Home: Date, Route, Seats, Price. On `/empty-legs`: Date, Route, Flight time, Seats, Price.
- On Home from 1200 px, the columns keep the hi-fi's proportions, 290, 492, 298 and 280 px at 1440 (`grid-template-columns: 290fr 492fr 298fr 280fr`), with "Hold" at the right end of the last one.
- Dates read like "Fri, Oct 23, 18:00", in the departure airport's local time. Prices read like "€2,900".
- "Hold" is a link to `/request?leg=<id>`. Its name for screen readers: "Hold Geneva to Barcelona, Fri, Oct 23".
- Mobile: each leg is a stacked block with no column labels, as in the wireframe, because the units say what each number is. The date in `.t-small`, `--text-muted`; the route in `.t-body`; then a line in `.t-body` with the seats, like "7 seats", and the price, `--space-s` apart, and "Hold" on the right. On `/empty-legs`, the flight time comes first on that line, `--space-s` before the seats.
- Each mobile block, here and in the route list on Aircraft, has `--space-s` above its first line and its lines `--space-xs` apart. Its last line holds the link, and the link's 44 px clickable area sets that line's height, so nothing goes under it. A 1 px `--border` line under each block, as in a table.
- On Home, under the table: the "All empty legs" link `--space-m` below the table, then the "Request a flight" button with its arrow, `--space-2xl` below the link's 44 px clickable area (`--space-l` on mobile). That puts the button a little lower than in the PNG, which draws the link at the height of its text. The button is the next step for visitors whose route isn't listed.
- On `/empty-legs`: the page header holds only the intro, so it stays two lines. The "How it works" text goes under the header, on the left margin under the H1, in `.t-body`, at most 6 columns wide, `--space-2xl` below the header. In the header's 4-column intro it would run to eight lines. Then the table, full width, `--space-l` below the "How it works" text, with the note from `page-text.md` under it in `.t-small`, `--text-muted`, `--space-s` below. The page ends with its "Request a flight" button, like every page, and has no "All empty legs" link, since it is that page.
- No legs left: the empty state's line from `page-text.md`, in `.t-body`, replaces the table. On Home it also replaces the "All empty legs" link; on `/empty-legs`, the note. The "Request a flight" button stays where it is, so there's only ever one.

### Range map (Aircraft)

- The base map is `images/europe-map.svg`: land in `--map-land`, sea in `--background`. Credit "Map: Natural Earth" in the footer.
- `airports.json` places each city in a 1440 by 720 space, its `x` and `y`. Desktop shows all of it, at 2:1: place each city as a percentage, `left: x / 1440`, `top: y / 720`. The right part of the space holds no airports, so the panel fits there.
- Tablet and mobile show only the part with the cities, as the wireframes do: x from 0 to 1040, the full height, so the map is 1040 by 720 (`left: x / 1040`, `top: y / 720`). At 834 px that keeps every pair of cities far enough apart for 44 px buttons that don't overlap. Narrower than that, two pairs of areas overlap by a few pixels: GVA and ZRH below 803 px, and NCE and LIN below 776 px. Leave them: each area is still 44 by 44 px, each dot sits well inside its own, and in the few shared pixels the button later in the page takes the click. Crop the SVG the same way, with `viewBox="0 0 1040 720"`.
- Markers: each city is a 10 px dot in `--text` with its code in `.t-small` on its right, `--space-xs` away. When a city has a ring (Barcelona, and the selected city), its code sits `--space-xs` from the ring instead, so those two codes come out 3 to 4 px further right than the hi-fi draws them. Barcelona also has a 16 px ring with a 1 px line. It's drawn, not a button: it's `base` in `airports.json`, where every route starts, not one of the 14 destinations. The selected city's dot turns `--accent`, inside a 20 px ring in `--accent` with a 1 px line. Each button's clickable area is 44 by 44 px around its dot.
- Desktop and tablet: each of the 14 cities in `airports.json` is a real `<button>` at its position, with the name from `page-text.md`, like "GVA, Geneva: 640 km, 1 h 15 min, estimated €12,000". The name starts with the code the button shows, so voice control users can say what they see.
- Choosing a city draws the route from Barcelona as a 2 px line in `--accent` and updates the route panel: Selected route, Distance, Flight time, Estimated price, the price note and "Request this flight". The panel announces the new route (`aria-live="polite"`). On tablet and desktop, the default is Geneva.
- Desktop: the map spans the full width, with the panel on `--surface`, with a 1 px `--border` line around it, over the map's empty right part: 4 columns wide on the right margin, `--space-xl` below the map's top edge, with `--space-m` padding. The line matters in Dark mode, where the panel and the land are both Graphite. The panel's rows (Distance, Flight time, Estimated price) follow "Tables", like the specifications: `--space-s` above and below the text and a 1 px `--border` line under each row, so they come out 55 px apart, not the 48 px drawn. Tablet: the panel goes under the map, full width, with no box: no `--surface` fill, no line around it and no padding, as in the tablet wireframe. The box is only for desktop, where the panel sits over the map.
- Mobile (up to 743 px): the cities sit too close to tap, with Barcelona and Palma a few pixels apart. So the map is a picture there: the dots are drawn, not buttons, and the map is `aria-hidden`. Nothing can be chosen, so nothing looks chosen: no route line and no selected ring. Only BCN keeps its code and its ring, and the other cities are plain dots. The mobile wireframe still draws GVA as selected; follow this rule instead. The intro's second sentence changes too, as `page-text.md` says, and points to the list. Under it, all 14 routes are a list: Route, Flight time, Distance, Estimated price and a "Request" link on each, in the order of `airports.json`, shortest first. On a phone it's the only way to see every route, so it stays complete. Each route is a stacked block with no column labels, as in the wireframe: the route in `.t-body`; the flight time and distance in `.t-small`, `--text-muted`, `--space-s` apart; then the price in `.t-body`, with "Request" on the right.
- Desktop and tablet: under the map, the table of featured routes from `aircraft.json`: Route, Flight time, Distance, Estimated price and a "Request" link on each row.
- Every "Request" link opens `/request?from=BCN&to=<code>`. Its visible text is "Request"; its name for screen readers is "Request Barcelona to Geneva", with the route's two city names, like the "Hold" links, in the table and in the phone list. It has no `aria-describedby`, so the route isn't read twice.
- The routes table is named by the section heading: `aria-labelledby` pointing at "Where it flies".
- Keyboard: Tab reaches every destination. The selected city has `aria-pressed="true"`.

### Specifications (Aircraft)

From `aircraft.json`. Three groups: Cabin, Performance, Operation. Desktop and tablet: three columns, the group name, the label and the value, all in `.t-body` like every table row; the label is `--text-muted`. A 1 px `--border` line under each row. Mobile: the group name as a heading above its rows, then the label and the value side by side, as in the mobile wireframe: the labels in one column as wide as the longest label ("Shortest runway"), and the values `--space-s` after it, lined up across all three groups. Both in `.t-body`, the label in `--text-muted`, as on desktop.

### Cabin plan (Aircraft)

- Six areas from `aircraft.json`, numbered 01 to 06. Choosing one shows its photo, number, label, stat and text. The default is Club seats.
- Desktop: the plan on the left (8 columns), the photo and text on the right (4 columns), and the six areas as a row of buttons under the plan, `--space-s` apart. Each area button has a 1 px `--border` line above it; the selected one has a 2 px `--text` line instead.
- The drawing shows the choice too: the selected area turns `--accent`, like the selected route on the map. Put `images/cabin-plan.svg` inline, so it takes the page's colors, and set `data-selected` on the `.cp-area` group whose `data-zone` matches the selected area (only one at a time). Set it on Club seats in the HTML, so it shows before any script runs. The SVG's own classes all start with `cp-`, so they can't clash with the site's CSS once it's inline. Its transparent `.cp-zone` shapes are hit areas: clicking one selects that area too.
- Tablet: the plan full width, the areas in two rows of three, the photo and text side by side below.
- Mobile: the plan, then the six areas as an accordion. Only one is open at a time. At phone width the drawing's numbers and ticks would be about 5 px tall, so hide them below 744 px (`.cp-num`, `.cp-tick`): the accordion carries the numbers, and the selected area still shows in `--accent`.
- The areas are real buttons with `aria-pressed` (desktop, tablet) or `aria-expanded` (mobile). All the text also exists without the drawing, for screen readers.

### What the price includes (Aircraft)

Not in the wireframes. Use the section header pattern, then two lists side by side: "Included" and "Added only if they apply, and listed on your quote before you confirm". Stacked on mobile. Then the two lines about returning, on the same day and on a later day, `--space-s` apart, and the button.

### Request form (`/request`)

- One column, 6 columns wide on desktop, full width on tablet and mobile.
- Desktop: on the right, in the last 4 columns, "How a request works" from the Standards page: its four numbered steps, stacked, in the numbered steps pattern, with the H2 "How a request works". It's `position: sticky`, `--space-3xl` from the top of the window, so it stays in view while the visitor fills in the form. It answers "what happens after I press Send?" right where the question comes up. Tablet and mobile: it comes after the form, before the footer.
- Fields, labels, hints and error messages exactly as in `page-text.md`. Every field has a visible label. Hints are linked to their field with `aria-describedby`.
- Return date and time appear only for "Return". "Lead passenger's name" appears only when "I'm booking for someone else" is ticked.
- Fields use `autocomplete`: `name`, `email`, `tel`.
- Errors: each message appears under its field in `.t-small`, `--text`, after an 8 px `--accent` dot, and the field's line turns `--accent` and 2 px thick. On Send with errors, the "Check these fields:" list appears at the top with a link to each field, and focus moves to it.
- After a valid Send, the form is replaced by the confirmation from `page-text.md`, with a reference like "KA-48217" made in the browser, and focus moves to the confirmation heading. Nothing is sent anywhere.
- `/request?leg=<id>` shows the "You're holding:" summary and "Hold this flight", as in `page-text.md`. If that leg has left, or the id isn't in `empty-legs.json`, show the normal form with the line from `page-text.md` above it, in `.t-body`, `--space-l` above the form.
- From and To work like the request bar's: the same airport list, and the same codes in the URL.
- Set the date fields' `min` once, when the page loads, and the return date's `min` when the date changes. Never rewrite a field's `min` while someone types in it: Chrome then throws away the digits typed so far.
- An empty date or time field looks empty, like the other fields. Date and Return date work like the request bar's Date: "Pick a date" in `--text-muted` over the field (see "Request bar"). Departure time and Return time show the browser's own empty format in `--text-muted`.

### Footer

The five links, the sales line, the concept notice, "Map: Natural Earth", "© 2026 Kinton Aerospace" and the cabin lights switch. Links in `.t-body`. The four lines in `.t-small`, `--text-muted`. The switch in `--text`, so it reads as a control, not as small print.

- Desktop and tablet: the links in two columns, both starting at the top: Aircraft and Empty legs on the left margin, Standards, Company and Request a flight on the right margin. `--space-2xl` below them, one row: on the left, the four lines in one block 548 px wide (5 columns at 1440), `--space-s` apart, in this order: sales line, concept notice, map credit, copyright. On the right margin, the cabin lights switch, its bottom level with the copyright line.
- Mobile: the links in the same two columns. Below them, the four lines at full width, then the switch, `--space-l` below the copyright.
- This footer isn't in the tablet and mobile wireframes, which show an older version with four links and a copyright line. Follow this description instead.

## In every page's head

- `<title>` and `<meta name="description">` from `page-text.md`.
- The favicon: `<link rel="icon" href="/favicon.svg" type="image/svg+xml">`, `<link rel="icon" href="/favicon.ico" sizes="48x48">` and `<link rel="apple-touch-icon" href="/apple-touch-icon.png">`. The three files are in `images/`; serve them from the site's root.
- The sharing image, for links shared in messages and social posts: `og:title` and `og:description` from the page's title and description, `og:image` with `sharing-image.jpg` (1200 by 630), and `twitter:card` set to `summary_large_image`. `og:image` needs the full address, so build it from Astro's `site` setting: set `site` to the live address once the site is online.

## Speed

The brief's target: the main content appears in under 2.5 seconds on a 4G connection.

- Astro, with plain HTML and CSS. JavaScript only where something moves: the switch, the menu, the video, the map, the cabin plan, the stepper and the form.
- Images through Astro's image tools, in modern formats, with sizes that match the screen.
- The poster still loads first; the video loads after the page.
- One font file.

## Hosting

Cloudflare serves the `dist` folder as static assets, with no Worker code. `wrangler.jsonc`:

```jsonc
{
  "name": "kinton",
  "compatibility_date": "<the day you deploy>",
  "assets": {
    "directory": "./dist",
    "not_found_handling": "404-page"
  }
}
```

`not_found_handling` makes a wrong address show the Page not found page.

## Accessibility checklist

- [ ] Every text pair meets the contrast table above, in Light and Dark.
- [ ] In Dark, the Aircraft hero shows its night still and video, and the day files aren't downloaded too (for visitors who follow their device setting; see "The hero in Dark mode"). Home shows its day still and video in both modes and never downloads a night hero file.
- [ ] Below 744 px, the Home hero shows its phone still and video, and the wide files aren't downloaded. On wider screens, the phone files aren't downloaded. Check downloads on the built site: on the dev server, Astro's dev toolbar also requests the day still for its own checks.
- [ ] Using the switch while the Aircraft hero video plays swaps from day to night (or back) at once, with no flash of an empty frame and never two jets on screen. A paused video stays paused.
- [ ] Every chapter starts in daylight, in Light and in Dark. "See it at night" changes only its own photo, works with the keyboard, and the night file downloads only after the first press.
- [ ] White text over the video stays above 4.5 to 1, with the gradient.
- [ ] The video can be paused, and doesn't start with reduced motion on. Pressing "Pause video" or "Play video" moves nothing on the page.
- [ ] On an iPhone, the lines under Date and Passengers on the request bar sit at the same height, and the date starts on the left, like the other fields.
- [ ] Every interactive part works with a keyboard, in a logical order, with the visible focus outline described under Buttons.
- [ ] Every button and control is at least 44 by 44 px. Links inside a sentence are the exception.
- [ ] One H1 per page, and headings in order.
- [ ] Every image has alt text from `aircraft.json`, or `alt=""` if it's decoration.
- [ ] Every form field has a label, errors are in text, not only in color, and the error list links to the fields.
- [ ] The map and the cabin plan work without seeing them: every destination and area is a named button, and the routes are also in a table.
- [ ] `<html lang="en">`, and a unique `<title>` and description per page, from `page-text.md`.
- [ ] Nothing breaks at 200% zoom or at 320 px wide.
