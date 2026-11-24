// frames a second and ear listens a second, both builds, same scene, run alone. headless software: ratios only.
import { startBrowser, startServer, open, song } from '/home/claude/w/base/tools/lib.mjs';
import path from 'node:path';
const builds = process.argv.slice(2);
const browser = await startBrowser();
const scenes = [
  ['bode loud 1904', 'bode', null],
  ['bode Focus3 1904', 'bode', 's'],
];
const _x = [
  ['bode loud', 'bode', null],
  ['bode Focus 3', 'bode', 's'],
  ['wren Focus 3', 'cyn', 's'],
  ['hinge Focus 2', 'hinge', 's'],
];
for (const [name, shape, key] of scenes) {
  for (const b of builds) {
    const server = await startServer(path.resolve(b));
    const page = await open(browser, server.url + '/build.html', { where: 'pc', keep: { 'ayvee.utopia': JSON.stringify({ echo: 0, total: 0, level: 1, charges: 3 }) } });
    await page.setViewportSize({ width: 1904, height: 901 });
    await page.evaluate(() => {
      window.__ears = 0;
      const g = AnalyserNode.prototype.getByteFrequencyData;
      AnalyserNode.prototype.getByteFrequencyData = function (a) { window.__ears++; return g.call(this, a); };
    });
    await (await page.$('#track input[type=file]')).setInputFiles([song('arc.wav')]);
    await page.evaluate(() => document.getElementById('mode').click()); // Verse
    await page.evaluate(() => document.getElementById('mode').click()); // Chorus: the loud state
    if (shape !== 'bode') await page.evaluate((s) => document.querySelector('[data-shape=' + s + ']').click(), shape);
    await page.waitForTimeout(1500);
    if (key) await page.keyboard.press(key);
    await page.waitForTimeout(1500);
    const r = await page.evaluate(async () => {
      let n = 0, worst = 0, last = performance.now();
      const e0 = window.__ears, t0 = performance.now();
      await new Promise((ok) => { const f = (now) => { n++; worst = Math.max(worst, now - last); last = now; if (now - t0 < 5000) requestAnimationFrame(f); else ok(); }; requestAnimationFrame(f); });
      const s = (performance.now() - t0) / 1000;
      return { fps: +(n / s).toFixed(1), worst: Math.round(worst), ears: Math.round((window.__ears - e0) / s) };
    });
    console.log(name.padEnd(14), path.basename(path.dirname(path.resolve(b))).padEnd(6), JSON.stringify(r));
    await page.context().close();
    server.close();
  }
}
await browser.close();
