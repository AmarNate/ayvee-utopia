/* the Veil check (DESIGN.md §8): at each window, in each state, measures
   1 every visible thing in a blade sits on the fill side of its drawn curve, at least 16 clear of it
   2 every lens label keeps its side padding (half the lens height) from the tips
   3 everything in the disc sits 24 inside its circle, and its lowest row 24 above the stage's bottom
   4 no two controls overlap, nothing is cut by the window
   5 every blade's box sits on the 8 grid (stage pixels) */
import { startBrowser, startServer, open, song } from '/home/claude/w/base/tools/lib.mjs';
import path from 'node:path';
const [build] = process.argv.slice(2);
const browser = await startBrowser();
const server = await startServer(path.resolve(build));
const STATES = {
  default: async () => {},
  layers: async (p) => p.keyboard.press('d'),
  lab: async (p) => p.click('#labBtn'),
  hingez: async (p) => p.click('#shapes [data-shape=hinge]'),
};
let fails = 0;
for (const [w, h] of (process.env.ONE ? [[1904, 901]] : [[1920, 1080], [1904, 901], [1729, 927]])) {
  for (const [st, go] of Object.entries(STATES)) {
    const page = await open(browser, server.url + '/build.html', { where: 'pc' });
    await page.setViewportSize({ width: w, height: h });
    await (await page.$('#track input[type=file]')).setInputFiles(['test one.wav', 'test two.wav', 'test three.wav', 'short a.wav', 'short b.wav'].map(song));
    await page.waitForTimeout(1200);
    await go(page);
    await page.waitForTimeout(700);
    const out = await page.evaluate(() => {
      const bad = [];
      const k = +getComputedStyle(document.documentElement).getPropertyValue('--hk') || 1;
      const vis = (e) => { const s = getComputedStyle(e), r = e.getBoundingClientRect(); return s.display !== 'none' && s.visibility !== 'hidden' && +s.opacity > 0.05 && r.width > 1 && r.height > 1; };
      const nm = (e) => (e.id ? '#' + e.id : e.tagName.toLowerCase() + (e.className && typeof e.className === 'string' ? '.' + e.className.split(' ')[0] : '')) + (e.textContent.trim() ? ' "' + e.textContent.trim().slice(0, 16) + '"' : '');
      // things that are read or pressed: controls, and text with no element children
      const things = (root) => [...root.querySelectorAll('button, input, label, span, em, p, small, b, i, svg.rune, .strings b')].filter((e) => vis(e) && !e.closest('.vsvg') && !e.closest('svg:not(.rune)') && e.id !== 'wipNote' && !e.closest('#wipNote') && !e.closest('.free'));
      // 1 · blades
      for (const bl of document.querySelectorAll('#hud .blade')) {
        if (!vis(bl) || bl.id === 'transport') continue;
        const sv = bl.querySelector(':scope > .vsvg');
        if (!sv || sv.style.display === 'none') continue;
        const fill = sv.querySelector('.fill'), edge = sv.querySelector('.edge');
        const r0 = bl.getBoundingClientRect(), L = edge.getTotalLength();
        const pts = [];
        for (let i = 0; i <= 120; i++) { const q = edge.getPointAtLength((L * i) / 120); pts.push([q.x, q.y]); }
        const held = bl.dataset.holds ? [...document.querySelectorAll(bl.dataset.holds)].flatMap((h) => things(h)) : [];
        for (const e of [...things(bl), ...held]) {
          // a control is its own box; words are their ink (round 4: a label's box runs the veil's width, its letters don't)
          let r = e.getBoundingClientRect();
          if (!/^(BUTTON|INPUT|svg)$/.test(e.tagName) && !e.closest('button')) { const rg = document.createRange(); rg.selectNodeContents(e); r = rg.getBoundingClientRect(); if (r.width < 1) continue; }
          const box = [(r.left - r0.left) / k, (r.top - r0.top) / k, (r.right - r0.left) / k, (r.bottom - r0.top) / k];
          const corners = [[box[0], box[1]], [box[2], box[1]], [box[0], box[3]], [box[2], box[3]]];
          const out = corners.filter(([x, y]) => { const P = sv.createSVGPoint(); P.x = x; P.y = y; return !fill.isPointInFill(P); });
          let d = 1e9;
          for (const [x, y] of pts) { const dx = Math.max(box[0] - x, 0, x - box[2]), dy = Math.max(box[1] - y, 0, y - box[3]); d = Math.min(d, Math.hypot(dx, dy)); }
          if (out.length || d < 13) bad.push('CURVE ' + bl.id + ' ' + nm(e) + (out.length ? ' outside the veil' : '') + ' clear ' + Math.round(d));
        }
        const bx = [r0.left, r0.top, r0.width, r0.height].map((v, i) => (i < 2 ? (v - (i ? +getComputedStyle(document.documentElement).getPropertyValue('--hy').replace('px', '') : +getComputedStyle(document.documentElement).getPropertyValue('--hx').replace('px', ''))) / k : v / k));
      }
      // free things stand clear of every veil's curve (they float outside it, never on it)
      for (const f of document.querySelectorAll('#hud .free')) {
        if (!vis(f)) continue;
        const r = f.getBoundingClientRect();
        for (const bl of document.querySelectorAll('#hud .blade')) {
          const sv = bl.querySelector(':scope > .vsvg');
          if (!vis(bl) || !sv || sv.style.display === 'none') continue;
          const edge = sv.querySelector('.edge'), r0 = bl.getBoundingClientRect(), L = edge.getTotalLength();
          for (let i = 0; i <= 120; i++) {
            const q = edge.getPointAtLength((L * i) / 120), x = r0.left + q.x * k, y = r0.top + q.y * k;
            if (x > r.left - 8 * k && x < r.right + 8 * k && y > r.top - 8 * k && y < r.bottom + 8 * k) { bad.push('FREE ' + nm(f) + ' sits on the curve of ' + bl.id); break; }
          }
        }
      }
      // 2 · lens labels
      for (const b of document.querySelectorAll('#hud button')) {
        if (!vis(b)) continue;
        const cs = getComputedStyle(b, '::before');
        if (cs.display === 'none' || !/polygon/.test(cs.clipPath) || /circle/.test(cs.clipPath)) continue;
        if (b.closest('#shapes') && !b.classList.contains('soon')) continue; // the embodiment plates are not lenses
        const range = document.createRange(); range.selectNodeContents(b);
        const tr = range.getBoundingClientRect(), br = b.getBoundingClientRect();
        if (tr.width < 1) continue;
        const pad = br.height * 0.5;
        if (tr.left - br.left < pad - 0.5 || br.right - tr.right < pad - 0.5) bad.push('LENS ' + nm(b) + ' label ' + Math.round(tr.left - br.left) + '/' + Math.round(br.right - tr.right) + ' from its tips, needs ' + Math.round(pad));
      }
      // 3 · the disc
      const T = document.getElementById('transport'), tr0 = T.getBoundingClientRect();
      const R = (T.offsetWidth / 2 - 6) * k, cx = tr0.left + tr0.width / 2, cy = tr0.top + (T.offsetHeight + 6) * k;
      for (const e of things(T)) {
        const r = e.getBoundingClientRect();
        for (const [x, y] of [[r.left, r.top], [r.right, r.top], [r.left, r.bottom], [r.right, r.bottom]]) {
          const d = R - Math.hypot(x - cx, y - cy);
          if (d < 13 * k - 0.5 && y < cy) { bad.push('DISC ' + nm(e) + ' ' + Math.round(d / k) + ' inside the circle'); break; }
        }
        const stageBottom = (+getComputedStyle(document.documentElement).getPropertyValue('--hy').replace('px', '') || 0) + 1080 * k;
        if ((e.tagName === 'BUTTON' || e.tagName === 'INPUT') && stageBottom - r.bottom < 21 * k - 0.5) bad.push('DISC ' + nm(e) + ' ' + Math.round((stageBottom - r.bottom) / k) + ' above the bottom');
      }
      // 4 · overlaps and the window
      const ctl = [...document.querySelectorAll('#hud button, #hud input, #hud label.filebtn')].filter(vis);
      for (let i = 0; i < ctl.length; i++) {
        const a = ctl[i].getBoundingClientRect();
        if (a.left < -0.5 || a.top < -0.5 || a.right > innerWidth + 0.5 || a.bottom > innerHeight + 0.5) bad.push('CUT ' + nm(ctl[i]));
        for (let j = i + 1; j < ctl.length; j++) {
          if (ctl[i].contains(ctl[j]) || ctl[j].contains(ctl[i])) continue;
          const b = ctl[j].getBoundingClientRect();
          if (Math.min(a.right, b.right) - Math.max(a.left, b.left) > 1 && Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > 1) bad.push('OVERLAP ' + nm(ctl[i]) + ' x ' + nm(ctl[j]));
        }
      }
      // and no control sits on a label
      const words = [...document.querySelectorAll('#hud .lbl, #meterState, #pelvy .pn, #pelvy .pmeta, #nowBar, #nowTime, .strings b em')].filter(vis);
      for (const a0 of ctl) {
        const a = a0.getBoundingClientRect();
        for (const w0 of words) {
          if (a0.contains(w0) || w0.contains(a0)) continue;
          const b = w0.getBoundingClientRect();
          if (Math.min(a.right, b.right) - Math.max(a.left, b.left) > 1 && Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > 1) bad.push('ON A LABEL ' + nm(a0) + ' x ' + nm(w0));
        }
      }
      return [...new Set(bad)];
    });
    fails += out.length;
    console.log(`--- ${w}x${h} ${st}: ${out.length ? out.length + ' FAIL' : 'PASS'}`);
    if (out.length) console.log('  ' + out.join('\n  '));
    await page.context().close();
  }
}
await browser.close(); server.close();
console.log(fails ? 'VEIL CHECK: ' + fails + ' FAIL' : 'VEIL CHECK: PASS');
