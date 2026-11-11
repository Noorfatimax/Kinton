import { chromium } from 'playwright';
const base = 'http://localhost:4321';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const mk = async (w, h = 800) => { const c = await browser.newContext({ viewport: { width: w, height: h }, reducedMotion: 'reduce' }); return [c, await c.newPage()]; };

// 1. Focus not obscured by the fixed header: Tab through each page and list stops whose box sits under the header
for (const [w, paths] of [[1440, ['/empty-legs', '/company', '/request', '/aircraft', '/standards']], [393, ['/empty-legs', '/request', '/company']]]) {
  for (const path of paths) {
    const [c, p] = await mk(w); await p.goto(base + path); await p.waitForTimeout(300);
    const hit = [];
    for (let i = 0; i < 70; i++) {
      await p.keyboard.press('Tab'); await p.waitForTimeout(30);
      const r = await p.evaluate(() => { const e = document.activeElement; if (!e || e === document.body) return null; const b = e.getBoundingClientRect(); const hdr = document.querySelector('.site-header .bar').getBoundingClientRect(); const inHeader = !!e.closest('.site-header'); return { name: (e.getAttribute('aria-label') || e.textContent || e.id).trim().replace(/\s+/g, ' ').slice(0, 30), top: Math.round(b.top), bottom: Math.round(b.bottom), headerBottom: Math.round(hdr.bottom), inHeader, scrollY: Math.round(scrollY), inFooter: !!e.closest('footer') }; });
      if (!r) break;
      if (!r.inHeader && r.top < r.headerBottom && r.scrollY > 0) hit.push(`${r.name} (top ${r.top} < header bottom ${r.headerBottom})`);
    }
    console.log(`${w}px ${path}: ${hit.length ? hit.length + ' stops sit under the fixed header:\n    ' + hit.slice(0, 6).join('\n    ') : 'no stop sits under the header'}`);
    await c.close();
  }
}

// 2. Menu open: where does Tab go?
const [c, p] = await mk(393);
await p.goto(base + '/'); await p.click('[data-menu-button]');
const seq = [];
for (let i = 0; i < 9; i++) { await p.keyboard.press('Tab'); seq.push(await p.evaluate(() => { const e = document.activeElement; return (e.closest('[data-menu-panel]') ? 'panel: ' : e.closest('.site-header') ? 'header: ' : 'PAGE BEHIND: ') + (e.getAttribute('aria-label') || e.textContent || e.id).trim().replace(/\s+/g, ' ').slice(0, 28); })); }
console.log('\nMenu open, Tab x9 from the first link:\n   ' + seq.join('\n   '));
await browser.close();
