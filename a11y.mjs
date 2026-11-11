// Accessibility check: axe on every page in Light and Dark, each page in a fresh browser context,
// and the Tab order of every page. Run against the production build: npm run build && npm run preview
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';

const base = process.env.BASE ?? 'http://localhost:4321';
const pages = ['/', '/aircraft', '/empty-legs', '/standards', '/company', '/request', '/does-not-exist'];
const browser = await chromium.launch({ executablePath: process.env.CHROME ?? '/opt/pw-browsers/chromium' });

const axeResults = [];
for (const mode of ['light', 'dark']) {
  for (const path of pages) {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: mode, reducedMotion: 'reduce' });
    const page = await context.newPage();
    await page.goto(base + path);
    await page.waitForTimeout(600);
    const r = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice']).analyze();
    for (const v of r.violations) {
      axeResults.push({ mode, path, id: v.id, impact: v.impact, help: v.help, nodes: v.nodes.map((n) => ({ target: n.target.join(' '), summary: n.failureSummary?.split('\n').slice(1, 3).join(' ') })) });
    }
    await context.close();
  }
}
console.log('=== AXE ===');
if (!axeResults.length) console.log('No violations.');
for (const v of axeResults) {
  console.log(`[${v.mode}] ${v.path}  ${v.impact}  ${v.id}: ${v.help}`);
  for (const n of v.nodes.slice(0, 4)) console.log(`     - ${n.target}  ${n.summary ?? ''}`);
  if (v.nodes.length > 4) console.log(`     ... and ${v.nodes.length - 4} more`);
}

console.log('\n=== TAB ORDER (Light, 1440 px) ===');
for (const path of pages) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: 'light', reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto(base + path);
  await page.waitForTimeout(400);
  const order = [];
  for (let i = 0; i < 80; i++) {
    await page.keyboard.press('Tab');
    const d = await page.evaluate(() => {
      const e = document.activeElement;
      if (!e || e === document.body) return null;
      const r = e.getBoundingClientRect();
      const cs = getComputedStyle(e);
      const name = (e.getAttribute('aria-label') || e.textContent || e.getAttribute('placeholder') || e.id || '').trim().replace(/\s+/g, ' ').slice(0, 40);
      return { tag: e.tagName.toLowerCase() + (e.getAttribute('role') ? `[${e.getAttribute('role')}]` : '') + (e.type ? `:${e.type}` : ''), name, visible: r.width > 0 && r.height > 0 && cs.visibility !== 'hidden', outline: cs.outlineStyle !== 'none' && cs.outlineWidth !== '0px' };
    });
    if (!d) break;
    const key = d.tag + d.name;
    if (order.length && order[0].key === key) break; // wrapped around
    order.push({ ...d, key });
  }
  console.log(`\n${path}  (${order.length} stops)`);
  console.log('  ' + order.map((o, i) => `${i + 1}. ${o.tag} "${o.name}"${o.visible ? '' : ' [NOT VISIBLE]'}${o.outline ? '' : ' [no outline]'}`).join('\n  '));
  await context.close();
}
await browser.close();
