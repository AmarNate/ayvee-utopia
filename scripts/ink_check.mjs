// the colour probe: every visible piece of HUD ink and its colour; flags ink that is near-neutral (plain white or grey)
import { startBrowser, startServer, open, song } from '/home/claude/w/base/tools/lib.mjs';
import path from 'node:path';
const [build, W = 1904, H = 901] = process.argv.slice(2);
const browser = await startBrowser(); const server = await startServer(path.resolve(build));
const states = { default: async () => {}, layers: async (p) => p.keyboard.press('d'), lab: async (p) => p.click('#labBtn'), hingez: async (p) => p.click('#shapes [data-shape=hinge]') };
let bad = 0;
for (const [st, go] of Object.entries(states)) {
  const page = await open(browser, server.url + '/build.html', { where: 'pc' });
  await page.setViewportSize({ width: +W, height: +H });
  await (await page.$('#track input[type=file]')).setInputFiles(['test one.wav', 'test two.wav'].map(song));
  await page.waitForTimeout(1200); await go(page); await page.waitForTimeout(900); await page.mouse.move(2, 450); await page.waitForTimeout(400);
  const hits = await page.evaluate(() => {
    const out = [], seen = new Set();
    const w = document.createTreeWalker(document.getElementById('hud'), NodeFilter.SHOW_TEXT);
    while (w.nextNode()) {
      const t = w.currentNode, el = t.parentElement;
      if (!t.textContent.trim() || seen.has(el)) continue;
      seen.add(el);
      const r = el.getBoundingClientRect(), cs = getComputedStyle(el);
      if (r.width < 1 || cs.visibility === 'hidden' || +cs.opacity === 0 || el.closest('[hidden]') || el.offsetParent === null) continue;
      const c = document.createElement('canvas').getContext('2d'); c.fillStyle = cs.color; c.fillRect(0, 0, 1, 1);
      const [R, G, B] = c.getImageData(0, 0, 1, 1).data;
      const mx = Math.max(R, G, B), mn = Math.min(R, G, B), chroma = mx - mn;
      out.push({ id: el.id || el.className || el.tagName, text: t.textContent.trim().slice(0, 24), rgb: [R, G, B], chroma, bright: mx });
    }
    return out;
  });
  const neutral = hits.filter((h) => h.chroma < 28 && h.bright > 70);
  console.log(`${st}: ${hits.length} ink pieces, ${neutral.length} near-neutral`);
  for (const h of neutral) console.log('   ', JSON.stringify(h));
  bad += neutral.length;
  await page.context().close();
}
console.log('near-neutral total', bad);
await browser.close(); server.close();
