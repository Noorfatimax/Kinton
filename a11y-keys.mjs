import { chromium } from 'playwright';
const base = 'http://localhost:4321';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const mk = async (w, h = 900, o = {}) => { const c = await browser.newContext({ viewport: { width: w, height: h }, reducedMotion: 'reduce', ...o }); return [c, await c.newPage()]; };
const cs = (p, sel, props) => p.evaluate(([s, pr]) => { const e = document.querySelector(s); const st = getComputedStyle(e); return Object.fromEntries(pr.map((k) => [k, st[k]])); }, [sel, props]);

let [c, p] = await mk(1440); await p.goto(base + '/');
await p.keyboard.press('Tab'); await p.keyboard.press('Enter'); await p.waitForTimeout(200);
console.log('skip link -> focus on:', await p.evaluate(() => document.activeElement.tagName + '#' + document.activeElement.id), '| scroll hash:', new URL(p.url()).hash);
console.log('pause button accessible names present:', await p.getByRole('button', { name: 'Play video' }).count(), 'Play /', await p.getByRole('button', { name: 'Pause video' }).count(), 'Pause (reduced motion: starts on "Play video")');
// focus outline colours
await p.focus('[data-pause]'); await p.keyboard.press('Shift+Tab'); await p.keyboard.press('Tab');
console.log('Home: pause focus outline:', JSON.stringify(await cs(p, '[data-pause]', ['outlineColor', 'outlineStyle', 'outlineWidth', 'outlineOffset'])), ' on-video = rgb(255, 255, 255)');
await p.focus('.site-header .links a'); console.log('Home: header link focus outline:', JSON.stringify(await cs(p, '.site-header .links a:focus', ['outlineColor', 'outlineWidth'])));
await p.focus('.chapters [data-night-button]'); console.log('Chapter button focus outline:', JSON.stringify(await cs(p, '[data-night-button]:focus', ['outlineColor', 'outlineWidth', 'outlineOffset'])), ' accent = rgb(236, 68, 9)');
await p.focus('#bar-from'); console.log('Field focus: border-bottom', JSON.stringify(await cs(p, '#bar-from', ['borderBottomWidth', 'borderBottomColor', 'outlineStyle'])));
await c.close();

[c, p] = await mk(1440); await p.goto(base + '/aircraft');
await p.focus('[data-code=GVA]'); console.log('Map city focus outline:', JSON.stringify(await cs(p, '[data-code=GVA]:focus', ['outlineColor', 'outlineWidth'])), ' text = rgb(18, 19, 21)');
console.log('Map panel live region:', await p.getAttribute('[data-panel]', 'aria-live'), '| selected city aria-pressed:', await p.getAttribute('[data-code=GVA]', 'aria-pressed'));
await c.close();

[c, p] = await mk(393, 800); await p.goto(base + '/');
await p.click('[data-menu-button]'); await p.waitForTimeout(150);
console.log('Menu open: aria-expanded', await p.getAttribute('[data-menu-button]', 'aria-expanded'), '| label', await p.textContent('[data-menu-label]'), '| focus inside panel:', await p.evaluate(() => !!document.activeElement.closest('[data-menu-panel]')));
await p.keyboard.press('Escape'); await p.waitForTimeout(150);
console.log('Escape: expanded', await p.getAttribute('[data-menu-button]', 'aria-expanded'), '| focus back on Menu button:', await p.evaluate(() => document.activeElement.hasAttribute('data-menu-button')), '| scroll locked off:', await p.evaluate(() => document.documentElement.style.overflow === ''));
await c.close();

[c, p] = await mk(1440); await p.goto(base + '/');
await p.focus('#bar-from'); await p.keyboard.type('mu'); await p.keyboard.press('ArrowDown');
console.log('Combobox: expanded', await p.getAttribute('#bar-from', 'aria-expanded'), '| activedescendant', await p.getAttribute('#bar-from', 'aria-activedescendant'), '| options shown', await p.locator('#bar-from-list [role=option]:visible').allTextContents());
await p.keyboard.press('Escape'); console.log('Escape closes list:', await p.getAttribute('#bar-from', 'aria-expanded'));
console.log('Stepper count live region role:', await p.getAttribute('[data-count]', 'role'), '| minus disabled at 1:', await p.locator('[data-step="-1"]').isDisabled());
console.log('Switch: role', await p.getAttribute('[data-theme-switch]', 'role'), 'aria-checked', await p.getAttribute('[data-theme-switch]', 'aria-checked'));
await p.click('[data-theme-switch]'); console.log('after click aria-checked', await p.getAttribute('[data-theme-switch]', 'aria-checked'), '| data-theme', await p.evaluate(() => document.documentElement.dataset.theme));
await c.close();

console.log('\n--- what overflows at 197 px wide (200% zoom of a phone) ---');
for (const path of ['/', '/aircraft']) {
  [c, p] = await mk(197); await p.goto(base + path); await p.waitForTimeout(300);
  const wide = await p.evaluate(() => { const vw = document.documentElement.clientWidth; return [...document.querySelectorAll('body *')].filter((e) => e.getBoundingClientRect().right > vw + 1 && getComputedStyle(e).position !== 'fixed' && e.getBoundingClientRect().width > 0).slice(0, 8).map((e) => `${e.tagName.toLowerCase()}.${String(e.className).split(' ')[0]} right=${Math.round(e.getBoundingClientRect().right)}`); });
  console.log(path, wide); await c.close();
}
await browser.close();
