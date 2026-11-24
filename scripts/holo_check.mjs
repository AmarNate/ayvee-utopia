/* the hologram check (DESIGN.md §3), on the computer at his window:
   Layers, the Lab and the Hingez note are born out of what called them and, on close, pulled back into it.
   proves: opening sets the birth point at the source's centre; closing shuts the panel at once (no .open),
   the after-image (.holo-out) shows for 0.4 s with nothing to press on it, then is gone; no veil is drawn for them */
import { startBrowser, startServer, open, song } from '/home/claude/w/base/tools/lib.mjs';
import path from 'node:path';
const [build] = process.argv.slice(2);
const browser = await startBrowser(); const server = await startServer(path.resolve(build));
const page = await open(browser, server.url + '/build.html', { where: 'pc' });
await page.setViewportSize({ width: 1904, height: 901 });
await (await page.$('#track input[type=file]')).setInputFiles([song('test one.wav')]);
await page.waitForTimeout(1200);
let fails = 0;
const say = (ok, what) => { if (!ok) fails++; console.log((ok ? 'PASS ' : 'FAIL ') + what); };
for (const [id, src, open1, close1] of [['layersPanel', 'layersBtn', '#layersBtn', '#closeLayers'], ['lab', 'labBtn', '#labBtn', '#closeLab']]) {
  await page.click(open1); await page.waitForTimeout(700);
  const born = await page.evaluate(([id, src]) => {
    const el = document.getElementById(id), box = el.querySelector('.in'), s = document.getElementById(src).getBoundingClientRect(), a = box.getBoundingClientRect();
    const k = +getComputedStyle(document.documentElement).getPropertyValue('--hk');
    const ox = parseFloat(box.style.getPropertyValue('--ox')), oy = parseFloat(box.style.getPropertyValue('--oy'));
    const sv = el.querySelector(':scope > .vsvg:not(.vshade)'), sh = el.querySelector(':scope > .vshade .shade');
    // born out of its source: the birth point lies inside the button that called it
    const bx = a.left + ox * k, by = a.top + oy * k;
    return { open: el.classList.contains('open'), inside: bx >= s.left && bx <= s.right && by >= s.top && by <= s.bottom, dx: Math.abs(bx - (s.left + s.width / 2)), dy: Math.abs(by - (s.top + s.height / 2)), veil: (!!sv && getComputedStyle(sv).display !== 'none') || (!!sh && !!sh.getAttribute('d') && getComputedStyle(sh.ownerSVGElement).display !== 'none') };
  }, [id, src]);
  say(born.open && born.inside, `${id}: born inside #${src} (${born.dx.toFixed(1)}, ${born.dy.toFixed(1)} px from its centre)`);
  say(!born.veil, `${id}: no veil drawn for it`);
  await page.click(close1);
  const after = await page.evaluate((id) => { const el = document.getElementById(id); return { open: el.classList.contains('open'), out: el.classList.contains('holo-out'), pe: getComputedStyle(el).pointerEvents, shown: getComputedStyle(el).display !== 'none' }; }, id);
  say(!after.open, `${id}: shut at once on Close`);
  say(after.out && after.shown && after.pe === 'none', `${id}: the after-image plays the way back, nothing to press on it`);
  await page.waitForTimeout(600);
  const gone = await page.evaluate((id) => { const el = document.getElementById(id); return !el.classList.contains('holo-out') && getComputedStyle(el).display === 'none'; }, id);
  say(gone, `${id}: gone after 0.4 s`);
}
await page.click('#shapes [data-shape=hinge]'); await page.waitForTimeout(700);
const note = await page.evaluate(() => {
  const n = document.getElementById('wipNote'), s = document.querySelector('#shapes [data-shape=hinge]').getBoundingClientRect(), a = n.getBoundingClientRect();
  const k = +getComputedStyle(document.documentElement).getPropertyValue('--hk');
  const cs = getComputedStyle(n);
  return { show: n.classList.contains('show'), dx: Math.abs(a.left + parseFloat(n.style.getPropertyValue('--ox')) * k - (s.left + s.width / 2)), box: cs.borderTopWidth !== '0px' || cs.backgroundColor !== 'rgba(0, 0, 0, 0)' };
});
say(note.show && note.dx < 3, `wipNote: born at Hingez's name (off by ${note.dx.toFixed(1)} px)`);
say(!note.box, 'wipNote: no box (no border, no fill)');
console.log(fails ? 'HOLO CHECK: ' + fails + ' FAIL' : 'HOLO CHECK: PASS');
await browser.close(); server.close();
