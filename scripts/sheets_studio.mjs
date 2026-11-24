// the α1.5a picture sheets: round 4 against the build that ships, at his window, plus off/lit up close
import { startBrowser, startServer, open, song } from '/home/claude/w/base/tools/lib.mjs';
import path from 'node:path';
const [before, after, W = 1904, H = 901] = process.argv.slice(2);
const OUT = '/home/claude/w/sheets/';
const browser = await startBrowser();
const states = {
  default: async () => {},
  layers: async (p) => p.click('#layersBtn'),
  lab: async (p) => p.click('#labBtn'),
  hingez: async (p) => p.click('#shapes [data-shape=hinge]'),
};
async function shoot(build, tag, w, h, st, go, after) {
  const server = await startServer(path.resolve(build));
  const page = await open(browser, server.url + '/build.html', { where: 'pc', keep: { 'ayvee.utopia': JSON.stringify({ echo: 58, total: 0, level: 20, charges: 3 }) } });
  await page.setViewportSize({ width: +w, height: +h });
  await (await page.$('#track input[type=file]')).setInputFiles(['test one.wav', 'test two.wav', 'test three.wav', 'short a.wav', 'short b.wav'].map(song));
  await page.waitForTimeout(1500); await page.mouse.move(2, 450); await go(page); await page.waitForTimeout(1300);
  if (after) await after(page);
  await page.screenshot({ path: `${OUT}${tag}_${st}_${w}.png` });
  await page.context().close(); server.close();
}
for (const [st, go] of Object.entries(states)) {
  await shoot(before, 'before', W, H, st, go);
  await shoot(after, 'after', W, H, st, go);
}
await shoot(after, 'after', 1729, 927, 'default', async () => {});
await shoot(before, 'before', 1729, 927, 'default', async () => {});
// off and lit, up close: Thread under the hand, Mic on, the rest at rest
await shoot(after, 'after', W, H, 'offlit', async (p) => { await p.click('#mic'); await p.mouse.move(2, 450); await p.waitForTimeout(9000); }, async (p) => {
  const b = await (await p.$('#threadBtn')).boundingBox(); await p.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await p.waitForTimeout(600);
});
await shoot(after, 'after', W, H, 'rest', async (p) => { await p.waitForTimeout(9000); });
await browser.close();
