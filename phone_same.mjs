// the phone stays as it was: the HUD of two builds on the iPhone 16 Pro, the stage and the moving current hidden, compared pixel for pixel
import { startBrowser, startServer, open } from '/home/claude/w/base/tools/lib.mjs';
import path from 'node:path';
import fs from 'node:fs';
const [a, b] = process.argv.slice(2);
const browser = await startBrowser();
const shots = [];
for (const f of [a, b]) {
  const server = await startServer(path.resolve(f));
  const page = await open(browser, server.url + '/build.html', { where: 'phone' });
  await page.waitForTimeout(1500);
  await page.addStyleTag({ content: 'canvas{visibility:hidden!important} .vcurrent,.vpulse,.pinglow{display:none!important} *{animation:none!important;transition:none!important} #titleSub{visibility:hidden!important}' });
  await page.waitForTimeout(300);
  shots.push(await page.screenshot());
  await page.context().close(); server.close();
}
const p = await (await browser.newContext()).newPage();
const diff = await p.evaluate(async ([x, y]) => {
  const load = (s) => new Promise((ok) => { const i = new Image(); i.onload = () => ok(i); i.src = 'data:image/png;base64,' + s; });
  const [A, B] = await Promise.all([load(x), load(y)]);
  const c = new OffscreenCanvas(A.width, A.height), g = c.getContext('2d');
  g.drawImage(A, 0, 0); const da = g.getImageData(0, 0, A.width, A.height).data;
  g.clearRect(0, 0, A.width, A.height); g.drawImage(B, 0, 0); const db = g.getImageData(0, 0, A.width, A.height).data;
  let n = 0; for (let i = 0; i < da.length; i += 4) if (Math.abs(da[i] - db[i]) + Math.abs(da[i + 1] - db[i + 1]) + Math.abs(da[i + 2] - db[i + 2]) > 24) n++;
  return { px: n, of: da.length / 4 };
}, shots.map((s) => s.toString('base64')));
console.log('phone HUD pixels that differ:', diff.px, 'of', diff.of, diff.px / diff.of < 0.001 ? 'PASS' : 'FAIL');
fs.writeFileSync('/home/claude/w/shots/phone_r4.png', shots[0]); fs.writeFileSync('/home/claude/w/shots/phone_new.png', shots[1]);
await browser.close();
