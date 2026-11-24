// the build opened from disk (file://), the way Nate opens it: does the audio-thread reader load, and does the clip keep its sound
import { startBrowser, song } from '/home/claude/w/base/tools/lib.mjs';
import path from 'node:path';
const [build, secs = 10] = process.argv.slice(2);
const browser = await startBrowser();
const ctx = await browser.newContext({ viewport: { width: 1904, height: 901 }, acceptDownloads: true });
const page = await ctx.newPage();
await page.addInitScript(() => {
  localStorage.setItem('ayvee.seen', '1');
  localStorage.setItem('ayvee.utopia', JSON.stringify({ echo: 0, total: 0, level: 1, charges: 3 }));
  window.__mod = [];
  const am = AudioWorklet.prototype.addModule;
  AudioWorklet.prototype.addModule = function (u, o) { const k = String(u).slice(0, 12); return am.call(this, u, o).then((v) => (window.__mod.push(k + ' loaded'), v), (e) => { window.__mod.push(k + ' refused: ' + e.message.slice(0, 60)); throw e; }); };
});
const dl = [];
page.on('download', (d) => dl.push(d));
await page.goto('file://' + path.resolve(build));
await (await page.$('#track input[type=file]')).setInputFiles([song('arc.wav')]);
await page.waitForTimeout(1500);
await page.keyboard.press('c'); await page.waitForTimeout((secs * 1000) / 2);
await page.keyboard.press('s'); await page.waitForTimeout((secs * 1000) / 2);
await page.keyboard.press('c'); await page.waitForTimeout(6000);
console.log('origin', await page.evaluate(() => location.origin), '· worker:', JSON.stringify(await page.evaluate(() => window.__mod)));
for (const d of dl) { const to = '/home/claude/w/clips/file-' + Date.now() + '.mp4'; await d.saveAs(to); console.log('saved', to); }
await browser.close();
