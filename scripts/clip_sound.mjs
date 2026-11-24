// records a short clip and watches the sound pieces as they arrive: gaps in their timestamps = dropped sound
import { startBrowser, startServer, open, song } from '/home/claude/w/base/tools/lib.mjs';
import path from 'node:path';
const [build, secs = 10] = process.argv.slice(2);
const browser = await startBrowser(); const server = await startServer(path.resolve(build));
const page = await open(browser, server.url + '/build.html', { where: 'pc', outDir: '/home/claude/w/clips', keep: { 'ayvee.utopia': JSON.stringify({ echo: 0, total: 0, level: 1, charges: 3 }) } });
await page.setViewportSize({ width: 1904, height: 901 });
await page.evaluate(() => {
  window.__aud = { n: 0, gaps: 0, lostMs: 0, last: null, rate: 0 };
  const P = window.MediaStreamTrackProcessor; if (!P) return;
  window.MediaStreamTrackProcessor = function (o) {
    const p = new P(o), rd = p.readable.getReader.bind(p.readable);
    p.readable.getReader = () => { const r = rd(); const read = r.read.bind(r); r.read = async () => { const v = await read(); if (v.value && v.value.numberOfFrames) { const A = window.__aud, d = v.value; A.n++; A.rate = d.sampleRate; if (A.last) { const exp = A.last.t + A.last.f / d.sampleRate * 1e6; const gap = d.timestamp - exp; if (gap > 2000) { A.gaps++; A.lostMs += gap / 1000; } } A.last = { t: d.timestamp, f: d.numberOfFrames }; } return v; }; return r; };
    return p;
  };
});
await (await page.$('#track input[type=file]')).setInputFiles([song('arc.wav')]);
await page.waitForTimeout(1500);
await page.keyboard.press('c'); await page.waitForTimeout(+secs * 1000 / 2);
await page.keyboard.press('s'); // a 3-stack Focus: the heaviest frames
await page.waitForTimeout(+secs * 1000 / 2);
await page.keyboard.press('c'); await page.waitForTimeout(6000);
console.log('sound pieces', JSON.stringify(await page.evaluate(() => window.__aud)));
for (const f of page.files) { await f.done; console.log('saved', f.path, f.failed || ''); }
await browser.close(); server.close();
