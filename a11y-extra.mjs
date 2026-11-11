// Checks axe can't make: sizes of clickable areas, headings, alt text, titles, overflow at 320 px and 200% zoom,
// downloads, and axe at tablet and phone widths and in a few open states.
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';

const base = process.env.BASE ?? 'http://localhost:4321';
const pages = ['/', '/aircraft', '/empty-legs', '/standards', '/company', '/request', '/does-not-exist'];
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const fresh = async (w, h = 900, opts = {}) => {
  const c = await browser.newContext({ viewport: { width: w, height: h }, reducedMotion: 'reduce', ...opts });
  return [c, await c.newPage()];
};

console.log('=== PAGE BASICS (1440) ===');
const titles = new Map(), descs = new Map();
for (const path of pages) {
  const [c, p] = await fresh(1440);
  await p.goto(base + path); await p.waitForTimeout(300);
  const info = await p.evaluate(() => {
    const hs = [...document.querySelectorAll('h1,h2,h3,h4')].map((h) => +h.tagName[1]);
    let skips = [];
    hs.forEach((l, i) => { if (i && l > hs[i - 1] + 1) skips.push(`h${hs[i - 1]}->h${l}`); });
    const imgs = [...document.images].map((i) => ({ src: i.currentSrc.split('/').pop().slice(0, 30), alt: i.getAttribute('alt') }));
    return {
      lang: document.documentElement.lang, title: document.title, desc: document.querySelector('meta[name=description]')?.content,
      h1: hs.filter((l) => l === 1).length, skips, imgsNoAlt: imgs.filter((i) => i.alt === null).map((i) => i.src),
      landmarks: { main: document.querySelectorAll('main').length, nav: [...document.querySelectorAll('nav')].map((n) => n.getAttribute('aria-label')), header: document.querySelectorAll('header').length },
    };
  });
  console.log(path.padEnd(16), JSON.stringify(info));
  titles.set(info.title, (titles.get(info.title) ?? 0) + 1); descs.set(info.desc, (descs.get(info.desc) ?? 0) + 1);
  await c.close();
}
console.log('duplicate titles:', [...titles].filter(([, n]) => n > 1), '| duplicate descriptions:', [...descs].filter(([, n]) => n > 1));

console.log('\n=== CLICKABLE AREAS under 44 px (not links inside a sentence) ===');
for (const w of [1440, 834, 393]) {
  for (const path of pages) {
    const [c, p] = await fresh(w);
    await p.goto(base + path); await p.waitForTimeout(300);
    const small = await p.evaluate(() => {
      const out = [];
      const els = document.querySelectorAll('a[href], button, input:not([type=hidden]), select, textarea, [role=button], [role=option], summary');
      for (const e of els) {
        const r = e.getBoundingClientRect(); const cs = getComputedStyle(e);
        if (!r.width || !r.height || cs.visibility === 'hidden' || e.closest('[hidden]') || e.disabled) continue;
        // a link inside a sentence is the exception
        const inSentence = e.tagName === 'A' && e.closest('p, li') && [...e.parentElement.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 2) && !e.closest('.link');
        if (inSentence) continue;
        if (e.type === 'radio' || e.type === 'checkbox') { const l = e.closest('label'); if (l && l.getBoundingClientRect().height >= 44) continue; }
        if (r.height < 43.5 || r.width < 43.5 && e.tagName !== 'A') out.push(`${e.tagName.toLowerCase()}${e.className ? '.' + String(e.className).split(' ')[0] : ''} "${(e.getAttribute('aria-label') || e.textContent || e.id || '').trim().replace(/\s+/g, ' ').slice(0, 28)}" ${Math.round(r.width)}x${Math.round(r.height)}`);
      }
      return out;
    });
    if (small.length) console.log(`${w}px ${path}:\n   ` + [...new Set(small)].slice(0, 12).join('\n   '));
    await c.close();
  }
}

console.log('\n=== OVERFLOW at 320 px and at 200% zoom (720 px wide viewport equals 1440 at 200%) ===');
for (const [label, w] of [['320 px', 320], ['200% zoom of 1440 px', 720], ['200% zoom of 393 px', 197]]) {
  for (const path of pages) {
    const [c, p] = await fresh(w);
    await p.goto(base + path); await p.waitForTimeout(300);
    const over = await p.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
    if (over.sw > over.cw + 1) console.log(`${label} ${path}: scrollWidth ${over.sw} > ${over.cw}`);
    await c.close();
  }
}
console.log('(no line above means no horizontal scroll)');

console.log('\n=== DOWNLOADS ===');
for (const [label, w, scheme, path] of [['Home 1440 Light', 1440, 'light', '/'], ['Home 1440 Dark', 1440, 'dark', '/'], ['Home 393 Light', 393, 'light', '/'], ['Aircraft 1440 Light', 1440, 'light', '/aircraft'], ['Aircraft 1440 Dark', 1440, 'dark', '/aircraft']]) {
  const [c, p] = await fresh(w, 900, { colorScheme: scheme, reducedMotion: 'no-preference' });
  const got = []; p.on('request', (r) => { const u = r.url(); if (/poster|hero|dark|phone|\.mp4/i.test(u)) got.push(u.split('/').pop().replace(/\.[A-Za-z0-9_-]{8}_?[A-Za-z0-9]*\.webp/, '.webp')); });
  await p.goto(base + path); await p.waitForTimeout(1800);
  console.log(label.padEnd(20), [...new Set(got)].join(', '));
  await c.close();
}

console.log('\n=== AXE at 834 and 393, Light and Dark ===');
for (const w of [834, 393]) for (const mode of ['light', 'dark']) for (const path of pages) {
  const [c, p] = await fresh(w, 900, { colorScheme: mode });
  await p.goto(base + path); await p.waitForTimeout(500);
  const r = await new AxeBuilder({ page: p }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice']).analyze();
  for (const v of r.violations) console.log(`[${w} ${mode}] ${path} ${v.impact} ${v.id}: ${v.nodes.slice(0, 3).map((n) => n.target.join(' ')).join(' | ')}`);
  await c.close();
}

console.log('\n=== AXE in open states ===');
async function axe(label, p) {
  const r = await new AxeBuilder({ page: p }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice']).analyze();
  console.log(label.padEnd(44), r.violations.length ? r.violations.map((v) => `${v.id}(${v.nodes.map((n) => n.target.join(' ')).slice(0, 2).join(' | ')})`).join('; ') : 'no violations');
}
for (const mode of ['light', 'dark']) {
  let [c, p] = await fresh(393, 800, { colorScheme: mode });
  await p.goto(base + '/'); await p.click('[data-menu-button]'); await p.waitForTimeout(200); await axe(`[${mode}] menu open, 393`, p); await c.close();
  [c, p] = await fresh(1440, 900, { colorScheme: mode });
  await p.goto(base + '/request'); await p.click('[data-submit]'); await p.waitForTimeout(300); await axe(`[${mode}] request form with errors`, p);
  await p.check('input[name=trip][value=return]'); await p.check('[data-someone-else]'); await axe(`[${mode}] request form, return + lead`, p);
  await p.click('#req-from'); await p.waitForTimeout(200); await axe(`[${mode}] airport list open`, p); await c.close();
  [c, p] = await fresh(1440, 900, { colorScheme: mode });
  await p.goto(base + '/aircraft'); await p.click('[data-code=ATH]'); await p.click('[data-zone-button=washroom]'); await axe(`[${mode}] aircraft: ATH + washroom chosen`, p); await c.close();
  [c, p] = await fresh(393, 800, { colorScheme: mode });
  await p.goto(base + '/aircraft'); await p.click('[data-zone-button=cockpit]'); await axe(`[${mode}] aircraft 393: accordion cockpit`, p); await c.close();
  [c, p] = await fresh(1440, 900, { colorScheme: mode });
  await p.goto(base + '/'); await p.click('[data-night-button]'); await p.waitForTimeout(600); await p.click('#bar-from'); await axe(`[${mode}] home: night view + list open`, p);
  await p.evaluate(() => window.scrollTo(0, 500)); await p.waitForTimeout(800); await axe(`[${mode}] home scrolled (header boxes)`, p); await c.close();
}
await browser.close();
