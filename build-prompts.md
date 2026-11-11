# Kinton Aerospace: build prompts

Every prompt from the video, in order, for Claude Code. Paste them one at a time, in the project folder. Claude Code won't write exactly the same code as in the video, and that's fine: the rules in `design/design-spec.md` keep the result the same.

Prompts with [brackets] are templates: replace the brackets with what you see.

## Session 1: Setup and the homepage

### Prompt 0: Check your computer

```text
Before we start: check whether Node.js, Git and the GitHub CLI are installed on this computer, and which versions. Node.js must be at least the version Astro asks for: check it with `npm view astro engines`. For anything missing or too old, tell me how to install it on my system, step by step, then wait for me.
```

### Prompt 1: Read first, then write the rules down

```text
Read everything in this folder before you write any code: design/design-spec.md, content/page-text.md, the three files in data/, and the PNGs in design/.

Then do two things:
1. Write a CLAUDE.md for this project with the rules from design-spec.md, so you follow them in every session: colors only from the jobs, gaps only from the spacing list, text only from the five text styles, words and numbers only from the content and data files.
2. Give me a short build plan, page by page.

Don't write any site code yet. If two files disagree, list where.
```

### Prompt 2: Set up the project and the design tokens

```text
Set up the site:
1. This folder isn't empty. Set up an Astro project around the files that are here, with TypeScript and no UI framework, without deleting or overwriting anything. Run Astro's setup tool in a temporary folder, with no questions: `npm create astro@latest astro-tmp -- --template minimal --no-install --no-git --yes --skip-houston`. Move its files in, delete the temporary folder, then install. Add @astrojs/check and typescript as development tools, so `astro check` runs without asking.
2. Leave the asset pack folders as they are. Read the JSON files from data/ where they are, so the weekly empty legs update stays in data/empty-legs.json. Copy the photos, stills and SVGs from images/ into src/assets/, the videos into public/videos/, and the favicon files into public/. Copy, don't move.
3. Self-host Inter with the @fontsource/inter package, as design-spec.md says.
4. Create src/styles/tokens.css exactly as written in design-spec.md, then the base styles and the five text style classes.
5. Build the layout every page shares: the skip link, the header with the menu, and the footer with the cabin lights switch, as described in design-spec.md.
6. Create every page in the spec's page list as an empty page with its title and description, so every link works.
7. Start git on a branch called main. Ignore node_modules and dist, and add a .gitattributes file with `* text=auto eol=lf`, so line endings stay the same on Windows and Mac. If git doesn't know my name and email yet, ask me for them and set them.
Then start the local server and give me the address.
```

### Prompt 3: Save point (after every step that works)

```text
Commit everything on the main branch with a short, clear message.
```

### If Claude Code commits on another branch

Newer versions of Claude Code may put a commit on a new branch instead of main. GitHub and Cloudflare publish main, so work left on another branch never goes live. Prompt 3 says "on the main branch" to prevent this. If Claude Code still says it made a new branch, paste this, with the branch's name:

```text
Merge [the branch] into main, delete [the branch], and stay on main. From now on, always commit on main.
```

### If the site stops loading

The local server shows your site at the address from Prompt 2, usually http://localhost:4321, while you build. It can stop when you close Claude Code, close the terminal or restart your computer. If the page won't load, paste this, then use the address it gives you:

```text
Start the local server and give me the address.
```

### Prompt 4: The homepage

```text
Build the homepage. Desktop follows the hi-fi PNGs in design/ whose names start with home-. Tablet and mobile follow the homepage wireframe PNGs. Every value comes from design-spec.md: the hero video with its pause button and gradient, the request bar, the four chapters, the next three empty legs and the footer. Take the words from page-text.md and the empty legs from empty-legs.json.
```

### Prompt 5: The designer's review

Claude Code lines its page up with the design and lights up every difference. You decide which ones matter.

```text
Help me review the homepage against the design. Don't fix anything yet.
Use the production build (npm run build, then npm run preview), so Astro's toolbar isn't in the screenshots. At 1440 px wide, in Light mode, with reduced motion on so the hero shows its still, screenshot each section of the homepage: the hero, the request bar, the chapters, the empty legs and the footer. Line each one up with its hi-fi PNG in design/ and make a difference image, where matching pixels turn black and differences light up. Save them in a review/ folder, and add that folder to .gitignore.
Then list every difference, numbered, section by section: where it is, how big it is in pixels, and what kind it is (a text style, a gap, an alignment or a size). Mark the ones design-spec.md says to expect, like the hero gradient or the 44 px clickable areas.
```

### Prompt 5b: Fix what matters (template)

```text
Fix [2, 4 and 5] from your list, using only tokens from design-spec.md:
- [2: for example, the gap between the request bar and the first chapter should be --space-4xl]
- [4: for example, the intro line should be Large, not Body]
```

### Prompt 6: Cut the wordmark

```text
Remove the wordmark from the homepage hero, on the main branch. Delete it and everything that only exists for it, including --wordmark-opacity in Light and in Dark. Keep images/wordmark.svg, like every file in the asset pack. The wordmark was the page's H1, so make the intro line the H1 instead, with no change to how it looks. The hero keeps its heights from design-spec.md, so the video shows where the wordmark was. Then take the wordmark out of design-spec.md, and add a line to CLAUDE.md saying it was cut on purpose, so the wordmark in design/home-hero.png is ignored from now on. Check the homepage at 1440 px, tablet and phone widths, in Light and in Dark. When it's right, commit it.
```

## Session 2: The other pages

### Prompt 7: Pick up where you left off

```text
Read CLAUDE.md and the git log, then tell me what's done and what's next.
```

### Prompt 8: The Aircraft page

```text
Build the Aircraft page. Desktop follows the hi-fi PNGs whose names start with aircraft-. Tablet and mobile follow the Aircraft wireframe PNGs. Follow design-spec.md for the range map, the route panel and table, the specifications, the cabin plan and "What the price includes". The data comes from aircraft.json and airports.json, the base map is images/europe-map.svg and the cabin drawing is images/cabin-plan.svg. Every city and every cabin area must work with a keyboard and a screen reader, as the spec says.
```

### Prompt 8b: The designer's review, Aircraft page

The same review as Prompt 5, for the Aircraft page. Then fix what matters with Prompt 5b, and save with Prompt 3.

```text
Help me review the Aircraft page against the design. Don't fix anything yet.
Use the production build (npm run build, then npm run preview), so Astro's toolbar isn't in the screenshots. At 1440 px wide, in Light mode, with reduced motion on so the hero shows its still, screenshot each section of the Aircraft page: the hero, the range map with its route panel and table, the specifications, the cabin plan and "What the price includes". Line each one up with its hi-fi PNG in design/, the ones whose names start with aircraft-, and make a difference image, where matching pixels turn black and differences light up. Save them in review/aircraft/.
Then list every difference, numbered, section by section: where it is, how big it is in pixels, and what kind it is (a text style, a gap, an alignment or a size). Mark the ones design-spec.md says to expect, like the 44 px clickable areas.
```

### Prompt 9: Four pages with no design

```text
Build the Empty legs, Standards, Company and Page not found pages. They have no design, so use the patterns in design-spec.md and the words in page-text.md. The empty legs come from empty-legs.json.
```

### Prompt 9b: Ask for versions (template)

Only if a page doesn't look right. Say what's wrong, ask for three versions, then pick one with Prompt 9c.

```text
[The page] follows the patterns, but it doesn't look designed. [What's wrong, in a few words: for example, the text on the right starts in three different places.] Don't change design-spec.md yet. Make three versions of [the page], at /drafts/[page]-1, /drafts/[page]-2 and /drafts/[page]-3, each a different layout idea, using only the tokens, text styles and grid in design-spec.md. [Optional: Version 1: your own idea, in one line.] Then give me the three addresses, with one line on what each version changes.
```

### Prompt 9c: Pick one (template)

```text
I'll take version [1], [with the steps from version 2]. Write it into the patterns in design-spec.md, then rebuild [the pages that use these patterns] with it, and delete the three draft pages. Don't change Home or Aircraft. Check [those pages] at 1440, 834 and 393 px.
```

### Prompt 10: The request form

```text
Build the Request a flight page: the form, its error messages and the confirmation, exactly as in page-text.md and design-spec.md. Use the input types that bring up the right keyboard on a phone. Fill the fields from the URL when the homepage request bar or a Hold link sends people here. The form sends nothing: show the confirmation in the browser.
```

### Prompt 10b: Fixes on the request form

Only if your page shows one of these problems: the text of each step starts under the number, the empty date and time fields look filled in, or From and To open a list that doesn't look like the site. Then save with Prompt 3.

```text
Three fixes on the Request a flight page. Use only tokens from design-spec.md.
1. In "How a request works", each step's text starts under the number. Line it up with the step's title instead, so the number sits alone in its own column.
2. The empty Date and Departure time fields show the browser's format in black, so they look filled in. Make every empty date or time field look empty, like From and To. Date and Return date: show "Pick a date" in --text-muted, the way the request bar's Date field does it on the homepage. Departure time and Return time: show the browser's format in --text-muted.
3. The airport list under From and To doesn't look like the site: it's the browser's own. Replace it with the site's own list, here and in the homepage request bar. It opens under the field when the visitor clicks it, types or presses Down: a --surface panel as wide as the field, --space-xs below its line, with a 1 px --border line around it and --radius corners. Each airport is a row in .t-body, at least 44 px tall, with --space-s padding on the sides. Typing shows only the airports whose city or code starts with what's typed. Visitors can still type any place. At most 6 rows show, and the rest scroll, with a thin scrollbar. The row under the mouse, or picked with the arrow keys, is underlined. Up and Down move, Enter or a click picks, Escape closes. Build it as an ARIA combobox with a listbox, and turn off the browser's own suggestions.
Then make sure design-spec.md has these rules: 1 and 2 under "Request form", 3 under "Request bar (Home)". Check the homepage and this page at 1440, 834 and 393 px, in Light and in Dark.
```

## Session 3: Check and launch

### Prompt 11: The phone check (template)

```text
On a 393 px wide screen: [what you see, for example: the request bar's button is narrower than the fields]. Fix it to match the mobile wireframe and design-spec.md.
```

### Prompt 12: The polish pass (template)

Keep a list while you build: every time something looks off, write down what you see, where, and when. Then send the whole list here, before the accessibility check.

```text
Here's my polish list from the whole build. Work through it one item at a time. For each one, find the cause first and show me the evidence, then fix it and show me before and after. Wait for me to say it looks right before you start the next one. Every fix follows CLAUDE.md and design-spec.md. When a fix adds a new rule, write it into design-spec.md, so the rest of the site follows it.

1. [What you see, where and when. For example: when I scroll back to the top, the header's links box loses its padding for a moment before it fades out.]
2. [The next one.]
```

### Prompt 13: The accessibility check

```text
Check the whole site against the accessibility checklist at the end of design-spec.md, in Light and in Dark. Install Playwright, its Chromium browser and axe-core as development tools (`npm i -D playwright @axe-core/playwright`, then `npx playwright install chromium`). Run axe on every page in both modes, each page in a fresh browser context, and use Playwright to press Tab through each page and list the focus order. List every problem you find before you fix anything.
```

### Prompt 14: Ready for Cloudflare

```text
Get the site ready for Cloudflare: add the wrangler.jsonc from the Hosting section of design-spec.md, with today's date. Make sure the build runs with no errors. Then commit everything on the main branch.
```

### Prompt 15: GitHub

```text
Create a private GitHub repository called kinton with the GitHub CLI and push the main branch. If I need to log in first, tell me exactly what to run.
```

Then, in the Cloudflare dashboard: go to Workers & Pages, create an application, choose GitHub and import the `kinton` repository. Build command: `npm run build`. Deploy command: `npx wrangler deploy`.

## Bonus: your own project

### Write your own design-spec.md

Set up a new folder for your project first:

- `design/`: your section PNGs, exported from Figma the way the video shows.
- `design/system/`: screenshots of your Figma variables (every color in each mode, and your spacing) and of your text styles. On a Mac, press Shift-Command-4 and drag over the panel: the file lands on your Desktop. On Windows, press Windows-Shift-S: Windows 11 saves it in Pictures, in the Screenshots folder. Move them into `design/system/`.
- `reference/`: a copy of Kinton's `design/design-spec.md`, renamed `example-spec.md`.

Then open the folder in Claude Code and paste this:

```text
Write design/design-spec.md for this project. My design system is in the screenshots in design/system/: my color variables in each mode, my spacing variables and my text styles. My section designs are the PNGs in design/. Use reference/example-spec.md as the template: the same headings and the same level of detail, but only my values, with the exact names from my screenshots. Where a screenshot doesn't show a value, don't guess. List it under Open questions at the end, and I'll fill it in.
```

Read the result before you build with it. It's your design system, and you're the one who knows it.
