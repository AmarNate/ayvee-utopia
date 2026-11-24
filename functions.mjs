/* ======================================================================
   AY-VEE UTOPIA · TOOLS · THE LINES OF THE FUNCTION LIST (statute, article 23)

   One line per function. Each line says, in words: what he presses, what it should do, how that is proven.
   And it carries the test that does it: the test does what he would do, then checks what came out.
   "No error" is never a pass. A line that needs his hands says so, and is never counted as a pass.

   CONTENTS
     1 · small helpers the lines share
     2 · the first visit
     3 · the embodiments
     4 · the songs
     5 · the player
     6 · Pelvy and the Echoes
     7 · Focus
     8 · mic, tab, the mood, freeze
     9 · the layers (one line per switch)
    10 · the Lab
    11 · Clip
    12 · Immerse and Hide
    13 · Tell Nate
    14 · the guide and the tour
    15 · slide-away
    16 · the stage, the keys, the window, the phone's drawers

   covers: the names function_list.mjs gives to what the build has. every one of those must be on a line.
   ====================================================================== */
import fs from 'node:fs';
import path from 'node:path';
import { pass, bubble, bubbleSays, picture, apart, bright, brightRGB, caught, videoFacts, pick, player, reachable } from './lib.mjs';

/* ---- 1 · small helpers the lines share ---- */

// collects what a line checked: every check by name, with what was really there
function checks() {
  const c = { bad: [], good: [] };
  c.is = (name, cond, got) => {
    (cond ? c.good : c.bad).push(name + (got !== undefined ? ' [' + got + ']' : ''));
    return !!cond;
  };
  c.done = () => ({ pass: !c.bad.length, got: c.bad.length ? 'WRONG: ' + c.bad.join('; ') : c.good.join('; ') });
  return c;
}
const txt = async (page, sel) => ((await page.textContent(sel)) || '').replace(/\s+/g, ' ').trim();
// α1.4: the disc and the queue show a cleaned song name; the file name it came from rides in the title
const ttl = (page, sel) => page.evaluate((s) => { const e = document.querySelector(s); return e ? e.title || e.textContent.trim() : ''; }, sel);
// α1.4: the queue as one line of text, the way the old list read: "1. name2. name"
const qtxt = (page) => page.evaluate(() => { const r = [...document.querySelectorAll('#queue .qrow')]; return r.length ? r.map((q, i) => (i + 1) + '. ' + q.title).join('') : document.getElementById('queue').textContent.trim(); });
const has = (page, sel, cls) => page.evaluate(([s, k]) => document.querySelector(s).classList.contains(k), [sel, cls]);
const shown = (page, sel) =>
  page.evaluate((s) => {
    const el = document.querySelector(s);
    if (!el) return false;
    const r = el.getBoundingClientRect();
    return r.width > 2 && r.height > 2 && getComputedStyle(el).visibility !== 'hidden';
  }, sel);
const stored = (page, key) => page.evaluate((k) => localStorage.getItem(k), key);
const pips = (page) => page.evaluate(() => document.querySelectorAll('#pips s.f').length);
const you = (o) => ({ 'ayvee.utopia': JSON.stringify({ echo: 0, total: 0, level: 1, charges: 0, ...o }) });
const NAMES = { bode: 'Bod-e', tyde: 'Gali', hinge: 'Hingez', cyn: 'Wren' };
const SHAPES = ['bode', 'tyde', 'hinge', 'cyn'];

// presses a button of the bar. on the phone most of them live in the More sheet, so that is opened first.
async function tool(page, sel) {
  if (page.where === 'phone' && !(await reachable(page, sel))) {
    await page.click('#moreBtn');
    await page.waitForTimeout(150);
  }
  await page.click(sel);
}
// presses the middle of a button that pulses (the test browser waits for a thing to hold still, he does not)
async function pressAt(page, sel) {
  const box = await page.locator(sel).boundingBox();
  await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
}
// puts a song on and waits until it is really playing
async function playing(page, names = ['test one.wav']) {
  await pick(page, names);
  await page.waitForFunction(() => window.__t.audios[0] && window.__t.audios[0].currentTime > 0.3, null, { polling: 50 });
}
// the proven-picture mode with the made-up song being heard, on the embodiment asked for
async function loud(T, shape, o = {}) {
  const page = await T.open({ where: 'small', proven: true, ...o });
  await page.click('#mic');
  await page.waitForFunction(() => document.getElementById('mic').textContent === 'Mic on', null, { polling: 50 });
  if (shape !== 'bode') await page.click('#shapes [data-shape=' + shape + ']');
  return page;
}
// five busy seconds: the mood held on Chorus, and five taps on the stage every second. gives the picture
// half way and at the end, so a layer that only shows for a moment is still caught.
const TAPS = [
  [0.42, 0.4],
  [0.5, 0.5],
  [0.58, 0.6],
  [0.5, 0.35],
  [0.46, 0.62],
];
async function busy(page) {
  await page.click('#mode');
  await page.click('#mode');
  const pics = [];
  for (let s = 0; s < 5; s++) {
    await pass(page, 700);
    for (const [u, v] of TAPS) await page.mouse.click(1200 * u, 700 * v);
    await pass(page, 300);
    if (s === 2 || s === 4) pics.push(await picture(page));
  }
  return pics;
}
const busyBase = (T, shape) =>
  T.memo('busy:' + shape, async () => {
    const page = await loud(T, shape);
    await page.keyboard.press('d');
    await page.keyboard.press('Escape');
    const pics = await busy(page);
    await page.context().close();
    return pics;
  });
/* flips a layer's switch. in the proven-picture mode the clock stands still, so the message bubble never
   leaves and can stand over a row; the switch is pressed directly. that every row can really be pressed
   is proven on its own, at the PC and phone sizes, in the line layers.panel. */
const flip = (page, sel) => page.evaluate((s) => document.querySelector(s).click(), sel);
const apart2 = (a, b) => Math.max(apart(a[0], b[0]), apart(a[1], b[1]));

/* one Focus, start to end, in the proven-picture mode: what the bubble said, what Pelvy held after, the
   picture three seconds in, and how long it lasted on the build's own clock */
const focusRun = (T, shape, stacks, how) =>
  T.memo(['focus', shape, stacks, how].join(':'), async () => {
    const page = await loud(T, shape, { keep: you({ charges: stacks }) });
    await pass(page, 1000);
    if (how === 'tap') await pressAt(page, '#focusBtn');
    else await page.keyboard.press(how);
    const said = await bubble(page);
    const left = await pips(page);
    const charged = await has(page, '#focusBtn', 'charged');
    await pass(page, 3000);
    const pic = await picture(page);
    // her clock is counted in frames here (a sixtieth of a second each), and the stepped clock draws a frame
    // every 16 thousandths: so how long it lasted is the frames drawn, over sixty
    let ms = 3000;
    while (ms < 45000 && !/and back/.test(await bubble(page))) {
      await pass(page, 240);
      ms += 240;
    }
    const lasted = +(ms / 16 / 60).toFixed(2);
    const chargedAfter = await has(page, '#focusBtn', 'charged');
    await page.context().close();
    return { said, left, pic, lasted, charged, chargedAfter };
  });
const focusBase = (T, shape) =>
  T.memo('focusbase:' + shape, async () => {
    const page = await loud(T, shape, { keep: you({ charges: 3 }) });
    await pass(page, 4000);
    const pic = await picture(page);
    await page.context().close();
    return pic;
  });

// records a clip the way he would and says what the saved file really is
async function clipOnce(page, c, start, stop, seconds = 3000) {
  const before = page.files.length;
  await start();
  await page.waitForTimeout(250);
  c.is('the red clip plate shows', (await has(page, 'body', 'clipping')) && (await shown(page, '#clipDot')));
  c.is('the button says Stop clip', (await txt(page, '#clipBtn')) === 'Stop clip' && (await has(page, '#clipBtn', 'live')), await txt(page, '#clipBtn'));
  c.is('the bubble says it is recording', /Recording the stage/.test(await bubble(page)), await bubble(page));
  const from = Date.now();
  await page.waitForTimeout(seconds);
  await stop();
  const ran = (Date.now() - from + 250) / 1000;
  const file = await caught(page, before, 9000);
  if (!c.is('a file is saved', !!file)) return null;
  // α1.3.2: the bubble says plainly what the browser made, and it has to match the file that was caught
  const said = await bubble(page);
  c.is('the bubble says Clip saved and what it is', /^Clip saved: (WebM|MP4)/.test(said), said);
  c.is('what it says is what the file is', /MP4/.test(said) === /\.mp4$/.test(file.path), said + ' / ' + path.basename(file.path));
  /* α1.3.2 (22 Nov): every clip is 1920×1080, whatever the window */
  const vv = videoFacts(file.path);
  c.is('it is 1920×1080', / 1920x1080$/.test(vv.video || ''), vv.video);
  const v = videoFacts(file.path);
  c.is('it is a video that plays', v.ok, (v.video || 'no video') + ', ' + v.frames + ' frames, ' + v.seconds + ' s, ' + Math.round(v.size / 1024) + ' KB');
  c.is('it is as long as it recorded', Math.abs(v.seconds - ran) <= 1.5, v.seconds + ' s saved, ' + ran.toFixed(1) + ' s recorded');
  c.is('the stage is in it (not a black frame)', v.brightness > 2, 'brightness ' + v.brightness);
  await page.waitForTimeout(200);
  c.is('the button is Clip again', (await txt(page, '#clipBtn')) === 'Clip' && !(await has(page, '#clipBtn', 'live')) && !(await has(page, 'body', 'clipping')));
  return { file, v };
}

const L = [];
const line = (o) => L.push({ where: ['pc'], covers: [], ...o });

/* ---- 2 · the first visit ---- */

line({
  id: 'first.card',
  group: 'The first visit',
  where: ['pc', 'phone'],
  press: 'Opens Ay-Vee for the first time, then **Just start**',
  should: 'The first-visit card shows. Keys do nothing while it is up. Just start puts it away, and it does not come back on the next visit.',
  proof: 'the card is on screen; C starts no clip; after Just start it is gone and the browser remembers; after a reload it stays gone',
  covers: ['#start@click'],
  run: async (T, where) => {
    const c = checks();
    const page = await T.open({ where, firstVisit: true });
    c.is('the card shows', await shown(page, '#tut'));
    await page.keyboard.press('c');
    await page.waitForTimeout(200);
    c.is('C does nothing behind the card', !(await has(page, 'body', 'clipping')));
    await page.click('#start');
    c.is('Just start puts it away', !(await shown(page, '#tut')));
    c.is('the browser remembers', (await stored(page, 'ayvee.seen')) === '1');
    await page.reload();
    await page.waitForFunction(() => window.AV, null, { polling: 50 });
    c.is('it stays away after a reload', !(await shown(page, '#tut')));
    return c.done();
  },
});
line({
  id: 'first.tour',
  group: 'The first visit',
  where: ['pc', 'phone'],
  press: '**Take the tour** on the first-visit card',
  should: 'The card goes and the tour starts at its first step.',
  proof: 'the card is gone; the tour card is on screen and reads "1 of N"',
  covers: ['#tourGo@click'],
  run: async (T, where) => {
    const c = checks();
    const page = await T.open({ where, firstVisit: true });
    await page.click('#tourGo');
    await page.waitForTimeout(500);
    c.is('the card is gone', !(await shown(page, '#tut')));
    c.is('the tour is on its first step', /^1 of \d+/.test(await txt(page, '.tour-card .ts').catch(() => '')), await txt(page, '.tour-card').catch(() => 'no tour card'));
    return c.done();
  },
});

/* ---- 3 · the embodiments ---- */

const embPic = (T, shape) =>
  T.memo('emb:' + shape, async () => {
    const page = await loud(T, shape);
    const said = await bubble(page);
    await pass(page, 3000);
    const pic = await picture(page);
    await page.context().close();
    return { pic, said };
  });
const SAYS = { bode: 'Bod-e. Hold the shape.', tyde: "Gali. Get in, it's fine.", hinge: 'Hingez. Just about holding it together.', cyn: 'Wren. Try and keep up.' };
const LEG = { bode: '#legBode', tyde: '#legTyde', hinge: '#legHinge', cyn: '#legCyn' };
for (const shape of SHAPES) {
  line({
    id: 'emb.' + shape,
    group: 'The embodiments',
    where: ['pc', 'phone'],
    press: 'The **' + NAMES[shape] + '** button',
    should: NAMES[shape] + ' takes the stage: the button lights, the title, the Layers panel and the guide follow, the bubble greets, and the picture is ' + NAMES[shape] + '.',
    proof: 'the button is the only lit one; the title reads ' + NAMES[shape].toUpperCase() + '; the guide shows that part; the picture after three seconds differs from each of the other three',
    covers: ['shape:' + shape + '@click'],
    run: async (T, where) => {
      const c = checks();
      const page = await T.open({ where });
      if (shape === 'bode') await page.click('#shapes [data-shape=tyde]');
      await page.click('#shapes [data-shape=' + shape + ']');
      c.is('the bubble greets', (await bubble(page)) === SAYS[shape], await bubble(page));
      const lit = await page.evaluate(() => [...document.querySelectorAll('#shapes button.on')].map((b) => b.dataset.shape).join(','));
      c.is('only that button is lit', lit === shape, lit);
      c.is('the title follows', (await txt(page, '#titleSub')).endsWith(NAMES[shape].toUpperCase()), await txt(page, '#titleSub'));
      c.is('Layers follows', (await page.getAttribute('#layersTitle', 'data-shape')) === shape && (await txt(page, '#layersTitle')) === NAMES[shape]);
      c.is('the guide follows', (await txt(page, '#legendTitle')) === 'index - ' + NAMES[shape]);
      const parts = await page.evaluate((leg) => Object.values(leg).filter((s) => !document.querySelector(s).classList.contains('hide')).join(','), LEG);
      c.is('the guide shows only that part', parts === LEG[shape], parts);
      if (where === 'pc') {
        const mine = await embPic(T, shape);
        for (const other of SHAPES.filter((s) => s !== shape)) {
          const d = apart(mine.pic, (await embPic(T, other)).pic);
          c.is('the picture is not ' + NAMES[other], d > 2, d.toFixed(1) + ' apart');
        }
      }
      return c.done();
    },
  });
}
for (const [id, name] of [
  ['infility', 'In-Fil-Ity'],
  ['kora', 'Juno'],
  ['zeph', 'Zeph'],
]) {
  line({
    id: 'emb.asleep.' + id,
    group: 'The embodiments',
    where: ['pc', 'phone'],
    press: 'The dark socket of **' + name + '**',
    should: 'Nothing changes on the stage; the bubble says ' + name + ' is still asleep.',
    proof: 'the bubble reads "' + name + ' is still asleep. Soon."; Bod-e stays lit and on the title',
    covers: ['shape:' + id + '@click'],
    run: async (T, where) => {
      const c = checks();
      const page = await T.open({ where });
      await page.click('#shapes [data-shape=' + id + ']');
      c.is('the bubble says so', (await bubble(page)) === name + ' is still asleep. Soon.', await bubble(page));
      c.is('Bod-e stays', (await has(page, '#shapes [data-shape=bode]', 'on')) && /BOD-E$/.test(await txt(page, '#titleSub')));
      return c.done();
    },
  });
}
line({
  id: 'emb.duringFocus',
  group: 'The embodiments',
  press: 'Another embodiment while a Focus is running',
  should: 'The stage does not change hands; the bubble asks to let the Focus finish.',
  proof: 'the bubble reads "Let the Focused Frequency finish first."; Bod-e stays on the title',
  covers: [],
  run: async (T) => {
    const c = checks();
    const page = await T.open({ keep: you({ charges: 1 }) });
    await pressAt(page, '#focusBtn');
    await page.click('#shapes [data-shape=tyde]');
    c.is('the bubble asks to wait', (await bubble(page)) === 'Let the Focused Frequency finish first.', await bubble(page));
    c.is('Bod-e stays', /BOD-E$/.test(await txt(page, '#titleSub')));
    return c.done();
  },
});

/* ---- 4 · the songs ---- */

line({
  id: 'songs.pick',
  group: 'The songs',
  where: ['pc', 'phone'],
  press: '**Pick songs**, one song',
  should: 'The song plays at once. Its name shows, the queue lists it, Play turns into Pause, and the meter hears it.',
  proof: 'the player is running and its time moves; the name is in the panel and the bar; the queue marks it; the meter reads LIVE and its bass bar rises',
  covers: ['#file@change', 'label:file'],
  run: async (T, where) => {
    const c = checks();
    const page = await T.open({ where });
    if (where === 'phone') await page.click('#trackBtn');
    c.is('Pick songs can be reached', await reachable(page, '#track .filebtn'));
    await playing(page);
    const a = await player(page);
    c.is('the song is playing', !a.paused && a.at > 0.3, a.at.toFixed(2) + ' s of ' + a.long + ' s');
    c.is('its name is in the panel', (await txt(page, '#now')) === 'Loaded: test one.wav', await txt(page, '#now'));
    c.is('the queue marks it', (await qtxt(page)) === '1. test one.wav' && (await page.locator('#queue .cur').count()) === 1, await qtxt(page));
    c.is('Play says Pause', (await txt(page, '#playTrack')) === 'Pause');
    c.is('the name is in the bar and in More', (await ttl(page, '#nowBar')) === 'test one.wav' && (await ttl(page, '#toolsNow')) === 'test one.wav');
    let top = 0;
    for (let i = 0; i < 20; i++) {
      top = Math.max(top, await page.evaluate(() => parseFloat(document.getElementById('m0').style.height) || 0));
      await page.waitForTimeout(100);
    }
    c.is('the bass bar of the meter rises', top > 5, 'up to ' + top + '%');
    c.is('the meter reads LIVE', (await txt(page, '#meterState')) === 'LIVE', await txt(page, '#meterState'));
    return c.done();
  },
});
line({
  id: 'songs.pickMany',
  group: 'The songs',
  press: '**Pick songs**, three at once, then one more',
  should: 'All three queue and the first plays. The fourth joins the end and the bubble counts it.',
  proof: 'the queue lists three with the first marked; after one more the bubble reads "1 added to queue." and Next reaches it',
  covers: [],
  run: async (T) => {
    const c = checks();
    const page = await T.open({});
    await playing(page, ['test one.wav', 'test two.wav', 'test three.wav']);
    c.is('three in the queue', (await qtxt(page)) === '1. test one.wav2. test two.wav3. test three.wav', await qtxt(page));
    await pick(page, ['short a.wav']);
    c.is('the bubble counts the new one', (await bubble(page)) === '1 added to queue.', await bubble(page));
    for (let i = 0; i < 3; i++) await page.click('#nextBtn');
    await page.waitForTimeout(500);
    c.is('Next reaches the fourth', (await ttl(page, '#nowBar')) === 'short a.wav', await ttl(page, '#nowBar'));
    return c.done();
  },
});
// drops files on the window the way a drag from a folder does
const dropFiles = (page, kind, names) =>
  page.evaluate(
    async ([k, list]) => {
      const dt = new DataTransfer();
      for (const n of list) {
        const blob = await (await fetch('/' + encodeURIComponent(n))).blob();
        dt.items.add(new File([blob], n, { type: /\.wav$/.test(n) ? 'audio/wav' : 'text/plain' }));
      }
      const ev = new DragEvent(k, { dataTransfer: dt, bubbles: true, cancelable: true, relatedTarget: null });
      document.body.dispatchEvent(ev);
    },
    [kind, names],
  );
line({
  id: 'songs.drop',
  group: 'The songs',
  press: 'Drags songs over the window and drops them',
  should: 'While dragging, the window says "drop the songs". Dropped songs queue and play. A file that is not a song is left alone.',
  proof: 'the drop frame shows on drag-over and goes on leave; after the drop the song is playing and queued; a text file dropped changes nothing',
  covers: ['document@dragover', 'document@dragleave', 'document@drop'],
  hands: 'a real drag from a folder on his computer (the test hands the window the same event with the same files)',
  run: async (T) => {
    const c = checks();
    const page = await T.open({});
    await dropFiles(page, 'dragover', ['test one.wav']);
    c.is('the drop frame shows', await has(page, 'body', 'drop'));
    await dropFiles(page, 'dragleave', []);
    c.is('it goes when the drag leaves', !(await has(page, 'body', 'drop')));
    await dropFiles(page, 'drop', ['notes.txt']);
    c.is('a text file is left alone', (await qtxt(page)) === 'Queue empty', await qtxt(page));
    await dropFiles(page, 'drop', ['test one.wav', 'test two.wav']);
    await page.waitForFunction(() => window.__t.audios[0].currentTime > 0.3, null, { polling: 50 });
    c.is('the dropped songs queue and play', (await qtxt(page)) === '1. test one.wav2. test two.wav' && !(await player(page)).paused, await qtxt(page));
    await dropFiles(page, 'drop', ['test three.wav']);
    c.is('one more dropped is counted', (await bubble(page)) === '1 added to the queue.', await bubble(page));
    return c.done();
  },
});
line({
  id: 'songs.link',
  group: 'The songs',
  press: 'Pastes a direct link to a song and presses **Load**',
  should: 'The linked song plays and the meter hears it. An empty box does nothing. A link that is not a song says so.',
  proof: 'with a link to a real .mp3 the player runs and the bass bar rises; with a dead link the bubble reads "Could not play that link...", the panel reads "Nothing loaded", Play is Play again with its icon, and a good link afterwards plays',
  covers: ['#url', '#loadUrl@click', 'audio@error', '#linkBtn@click'],
  run: async (T) => {
    const c = checks();
    const page = await T.open({});
    await page.click('#linkBtn');
    c.is('Link opens the box', await reachable(page, '#url'));
    await page.click('#loadUrl');
    await page.waitForTimeout(300);
    c.is('an empty box does nothing', (await txt(page, '#now')) === 'Nothing loaded' && !(await bubble(page)));
    await page.fill('#url', T.base.replace('/build.html', '') + '/test%20one.mp3');
    await page.click('#loadUrl');
    await page.waitForFunction(() => window.__t.audios[0].currentTime > 0.5, null, { polling: 50, timeout: 8000 }).catch(() => {});
    const a = await player(page);
    c.is('the linked song plays', !a.paused && a.at > 0.5, a.at.toFixed(2) + ' s');
    let top = 0;
    for (let i = 0; i < 15; i++) {
      top = Math.max(top, await page.evaluate(() => parseFloat(document.getElementById('m0').style.height) || 0));
      await page.waitForTimeout(100);
    }
    c.is('the meter hears it', top > 5, 'bass up to ' + top + '%');
    await page.fill('#url', T.base.replace('/build.html', '') + '/nothing-here.mp3');
    await page.click('#loadUrl');
    await page.waitForTimeout(900);
    c.is('a dead link says so', /^Could not play that link/.test(await bubble(page)), 'the bubble reads: ' + (await bubble(page)) + ' / the panel reads: ' + (await txt(page, '#now')));
    c.is('Play is Play again, with its icon', (await txt(page, '#playTrack')) === 'Play' && (await page.locator('#playTrack svg').count()) === 1, await txt(page, '#playTrack'));
    c.is('nothing says Loaded', (await txt(page, '#now')) === 'Nothing loaded' && (await ttl(page, '#nowBar')) === 'Nothing playing', (await txt(page, '#now')) + ' / ' + (await ttl(page, '#nowBar')));
    await page.fill('#url', T.base.replace('/build.html', '') + '/test%20one.mp3');
    await page.click('#loadUrl');
    await page.waitForFunction(() => window.__t.audios[0].currentTime > 0.5, null, { polling: 50, timeout: 8000 }).catch(() => {});
    c.is('a good link after a dead one plays', !(await player(page)).paused && (await txt(page, '#playTrack')) === 'Pause', await txt(page, '#now'));
    return c.done();
  },
});
line({
  id: 'songs.seek',
  group: 'The songs',
  where: ['pc', 'phone'],
  press: 'Taps the crescent of light on the disc, three quarters of the way along',
  should: 'The song jumps to that place and the lit part of the crescent follows.',
  proof: 'a tap at three quarters of the crescent puts a 12 second song at about 9 seconds; the lit arc and its bright head move there',
  covers: ['#miniSeek@click', 'audio@timeupdate'],
  run: async (T, where) => {
    const c = checks();
    const page = await T.open({ where });
    await playing(page);
    const [x, y] = await page.evaluate(() => window.AVpeek.disc(0.75));
    await page.mouse.click(x, y + 6);
    await page.waitForTimeout(400);
    const a = await player(page);
    c.is('the song is at about 9 s', a.at > 8.4 && a.at < 10, a.at.toFixed(2) + ' s');
    const head = await page.evaluate(() => { const h = document.querySelector('#transport .head').getBoundingClientRect(); return [h.x + h.width / 2, h.y + h.height / 2]; });
    const want = await page.evaluate(() => window.AVpeek.disc(window.__t.audios[0].currentTime / window.__t.audios[0].duration));
    c.is('the head of the crescent follows', Math.hypot(head[0] - want[0], head[1] - want[1]) < 14, Math.hypot(head[0] - want[0], head[1] - want[1]).toFixed(1) + ' px off');
    return c.done();
  },
});
line({
  id: 'songs.seekBar',
  group: 'The songs',
  press: 'Clicks on the small seek line in the bar',
  should: 'The song jumps to that place and the small fill follows.',
  proof: 'a click in the middle puts a 12 second song at about 6 seconds; the small fill is about half',
  covers: ['#miniSeek@click'],
  run: async (T) => {
    const c = checks();
    const page = await T.open({});
    await playing(page);
    const box = await page.locator('#miniSeek').boundingBox();
    await page.mouse.click(box.x + box.width * 0.5, box.y + box.height / 2);
    await page.waitForTimeout(400);
    const a = await player(page);
    c.is('the song is at about 6 s', a.at > 5.6 && a.at < 7, a.at.toFixed(2) + ' s');
    const fill = await page.evaluate(() => parseFloat(document.getElementById('miniFill').style.width));
    c.is('the small fill follows', fill > 46 && fill < 59, fill.toFixed(0) + '%');
    return c.done();
  },
});
line({
  id: 'songs.sensitivity',
  group: 'The songs',
  where: ['pc', 'phone'],
  press: 'Moves the **Sensitivity** slider (it sits by Auto: in the bottom bar on the computer, in More on the phone)',
  should: 'The number beside it follows, the lamp fill follows, and the build really listens with the new value.',
  proof: 'three steps up from 1.4 reads 1.7; the fill grows; the Tell Nate report, which prints the value the build is using, says "sensitivity 1.7"',
  covers: ['#sens@input'],
  run: async (T, where) => {
    const c = checks();
    const page = await T.open({ where });
    if (where === 'phone') await page.click('#moreBtn');
    c.is('it can be reached, by Auto', (await reachable(page, '#sens')) && (await reachable(page, '#mode')));
    const fill0 = await page.evaluate(() => document.getElementById('sens').style.getPropertyValue('--fill'));
    await page.focus('#sens');
    for (let i = 0; i < 3; i++) await page.keyboard.press('ArrowRight');
    c.is('the number follows', (await txt(page, '#sensV')) === '1.7', await txt(page, '#sensV'));
    c.is('the fill follows', (await page.evaluate(() => document.getElementById('sens').style.getPropertyValue('--fill'))) !== fill0);
    await page.keyboard.press('Escape');
    await tool(page, '#tellBtn');
    const before = page.files.length;
    await page.click('[data-tell=save]');
    const file = await caught(page, before);
    const report = file ? fs.readFileSync(file.path, 'utf8') : '';
    c.is('the build is using 1.7', /sensitivity 1\.7/.test(report), (/sensitivity [\d.]+/.exec(report) || ['no report'])[0]);
    return c.done();
  },
});
for (const [key, opens, starts] of [
  ['sens', null, 'Every layer (bass, synths, voice, highs)'],
  ['lab', '#labBtn', 'The Lab is for measuring'],
]) {
  line({
    id: 'help.' + key,
    group: key === 'sens' ? 'The songs' : 'The Lab',
    where: ['pc', 'phone'],
    press: 'The small **?** beside ' + (key === 'sens' ? 'Sensitivity' : 'the Lab'),
    should: 'A card explains it. **Got it** closes the card.',
    proof: 'the card is on screen and its text starts "' + starts + '"; after Got it the card is gone',
    covers: ['help:' + key, ...(key === 'sens' ? ['#helpClose@click', 'document@click'] : [])],
    run: async (T, where) => {
      const c = checks();
      const page = await T.open({ where });
      if (opens) await tool(page, opens);
      else if (where === 'phone') await page.click('#moreBtn');
      await page.click('[data-help=' + key + ']');
      c.is('the card shows', await shown(page, '#helpCard'));
      c.is('it explains', (await txt(page, '#helpText')).startsWith(starts), (await txt(page, '#helpText')).slice(0, 50));
      await page.click('#helpClose');
      c.is('Got it closes it', !(await shown(page, '#helpCard')));
      return c.done();
    },
  });
}
line({
  id: 'songs.clear',
  group: 'The songs',
  where: ['pc', 'phone'],
  press: '**Clear queue**',
  should: 'The song stops, the queue empties, and everything that named the song says nothing is loaded.',
  proof: 'the player is stopped with no song in it; the queue reads "Queue empty"; the panel reads "Nothing loaded" and the bar "Nothing playing"; Play is Play; the bubble reads "Track unloaded."',
  covers: ['#stopTrack@click'],
  run: async (T, where) => {
    const c = checks();
    const page = await T.open({ where });
    await playing(page, ['test one.wav', 'test two.wav']);
    if (where === 'phone') await page.click('#trackBtn');
    await page.click('#stopTrack');
    await page.waitForTimeout(300);
    const a = await player(page);
    c.is('the player is stopped and empty', a.paused && a.empty && !a.src, a.src || 'no song');
    c.is('the queue is empty', (await qtxt(page)) === 'Queue empty');
    c.is('nothing is named', (await txt(page, '#now')) === 'Nothing loaded' && (await ttl(page, '#nowBar')) === 'Nothing playing');
    c.is('Play is Play', (await txt(page, '#playTrack')) === 'Play');
    c.is('the bubble says so', (await bubble(page)) === 'Track unloaded.', await bubble(page));
    return c.done();
  },
});

/* ---- 5 · the player ---- */

line({
  id: 'play.button',
  group: 'The player',
  where: ['pc', 'phone'],
  press: '**Play / Pause**',
  should: 'With a song on: it pauses and plays. With no songs: it opens Songs and says to add some.',
  proof: 'paused, the time stands still and the meter reads PAUSED; pressed again the time moves; with no songs the bubble reads "Add some songs first."',
  covers: ['#playTrack@click'],
  run: async (T, where) => {
    const c = checks();
    const page = await T.open({ where });
    await page.click('#playTrack');
    c.is('with no songs it says so', (await bubble(page)) === 'Add some songs first.', await bubble(page));
    if (where === 'phone') c.is('and opens Songs', await has(page, '#track', 'open'));
    if (where === 'phone') await page.click('#closeTrack');
    await playing(page);
    await page.click('#playTrack');
    const a1 = await player(page);
    await page.waitForTimeout(700);
    const a2 = await player(page);
    c.is('it pauses', a1.paused && a2.at === a1.at, 'stood at ' + a2.at.toFixed(2) + ' s');
    c.is('the button says Play, the meter PAUSED', (await txt(page, '#playTrack')) === 'Play' && (await txt(page, '#meterState')) === 'PAUSED', await txt(page, '#meterState'));
    await page.click('#playTrack');
    await page.waitForTimeout(700);
    const a3 = await player(page);
    c.is('it plays again', !a3.paused && a3.at > a2.at + 0.3, a3.at.toFixed(2) + ' s');
    c.is('the button says Pause', (await txt(page, '#playTrack')) === 'Pause');
    return c.done();
  },
});
line({
  id: 'play.space',
  group: 'The player',
  press: 'The **Space** key',
  should: 'The same as Play / Pause.',
  proof: 'Space pauses a playing song (the time stands still) and Space again plays it',
  covers: ['key:space'],
  run: async (T) => {
    const c = checks();
    const page = await T.open({});
    await playing(page);
    await page.keyboard.press('Space');
    await page.waitForTimeout(300);
    c.is('Space pauses', (await player(page)).paused);
    await page.keyboard.press('Space');
    await page.waitForTimeout(500);
    c.is('Space plays', !(await player(page)).paused);
    return c.done();
  },
});
line({
  id: 'play.next',
  group: 'The player',
  where: ['pc', 'phone'],
  press: '**Next**',
  should: 'The next song in the queue plays; after the last it goes round to the first.',
  proof: 'with three songs: Next plays the second, then the third, then the first again, each really playing',
  covers: ['#nextBtn@click'],
  run: async (T, where) => {
    const c = checks();
    const page = await T.open({ where });
    await playing(page, ['test one.wav', 'test two.wav', 'test three.wav']);
    for (const want of ['test two.wav', 'test three.wav', 'test one.wav']) {
      await page.click('#nextBtn');
      await page.waitForTimeout(700);
      const a = await player(page);
      c.is('Next plays ' + want, (await ttl(page, '#toolsNow')) === want && !a.paused, await ttl(page, '#toolsNow'));
    }
    return c.done();
  },
});
line({
  id: 'play.previous',
  group: 'The player',
  where: ['pc', 'phone'],
  press: '**Previous**',
  should: 'In the first four seconds of a song: the song before it (round to the last). Later than that: this song from its start.',
  proof: 'early in the first of three songs, Previous plays the third; seven seconds into it, Previous puts the same song back at its start',
  covers: ['#prevBtn@click'],
  run: async (T, where) => {
    const c = checks();
    const page = await T.open({ where });
    await playing(page, ['test one.wav', 'test two.wav', 'test three.wav']);
    await page.click('#prevBtn');
    await page.waitForTimeout(700);
    c.is('early: the song before', (await ttl(page, '#toolsNow')) === 'test three.wav', await ttl(page, '#toolsNow'));
    await page.evaluate(() => (window.__t.audios[0].currentTime = 7));
    await page.waitForTimeout(300);
    await page.click('#prevBtn');
    await page.waitForTimeout(300);
    const a = await player(page);
    c.is('later: this song from its start', (await ttl(page, '#toolsNow')) === 'test three.wav' && a.at < 1.5, a.at.toFixed(2) + ' s');
    return c.done();
  },
});
// lets short songs run out and says what is playing afterwards
async function runOut(T, repeatPresses, waitMs) {
  const page = await T.open({});
  for (let i = 0; i < repeatPresses; i++) await page.click('#repeatBtn');
  await playing(page, ['short a.wav', 'short b.wav']);
  await page.waitForTimeout(waitMs);
  return { page, a: await player(page), now: await ttl(page, '#nowBar'), btn: await txt(page, '#playTrack') };
}
line({
  id: 'play.repeat',
  group: 'The player',
  press: '**Repeat**',
  should: 'It steps off, all, one, and round. Off: the queue plays through and stops. All: after the last song the first plays again. One: the same song starts over.',
  proof: 'the button reads off, all, one, off and is lit unless off; with two 3-second songs: off ends stopped on the second with Play showing, all is back on the first, one is still on the first',
  covers: ['#repeatBtn@click', 'audio@ended'],
  run: async (T) => {
    const c = checks();
    const page = await T.open({});
    const seen = [await txt(page, '#repeatBtn')];
    for (let i = 0; i < 3; i++) {
      await page.click('#repeatBtn');
      seen.push((await txt(page, '#repeatBtn')) + ((await has(page, '#repeatBtn', 'on')) ? '*' : ''));
    }
    c.is('it steps off, all, one, off', seen.join(' ') === 'off all* one* off', seen.join(' '));
    const off = await runOut(T, 0, 7600);
    c.is('off: plays through and stops', off.now === 'short b.wav' && off.a.paused && off.btn === 'Play', off.now + (off.a.paused ? ', stopped' : ', playing'));
    c.is('a finished song earns 8 Echoes', /^1[6-9]\/100$/.test(await txt(off.page, '#echoV')), await txt(off.page, '#echoV'));
    const all = await runOut(T, 1, 7200);
    c.is('all: back on the first', all.now === 'short a.wav' && !all.a.paused, all.now + (all.a.paused ? ', stopped' : ', playing'));
    const one = await runOut(T, 2, 4300);
    c.is('one: still the first, started over', one.now === 'short a.wav' && !one.a.paused && one.a.at < 2.2, one.now + ' at ' + one.a.at.toFixed(2) + ' s');
    return c.done();
  },
});
line({
  id: 'play.volume',
  group: 'The player',
  press: 'Moves the **vol** slider in the bar',
  should: "The app's own volume follows, and so do the number and the phone's slider. A volume set before the first song holds when the song starts.",
  proof: 'ten steps down from 70 puts the real volume at 0.6 and the label at 60%; all the way down is 0; set to 30 before any song, the first song starts at 0.3',
  covers: ['#vol@input'],
  run: async (T) => {
    const c = checks();
    const page = await T.open({});
    await playing(page);
    await page.focus('#vol');
    for (let i = 0; i < 10; i++) await page.keyboard.press('ArrowLeft');
    let a = await player(page);
    c.is('the real volume is 0.6', Math.abs(a.volume - 0.6) < 0.001, String(a.volume));
    c.is('the labels follow', (await txt(page, '#volV')) === '60%' && (await txt(page, '#volPV')) === '60%' && (await page.inputValue('#volP')) === '60');
    await page.keyboard.press('Home');
    a = await player(page);
    c.is('all the way down is silent', a.volume === 0, String(a.volume));
    const p2 = await T.open({});
    await p2.focus('#vol');
    for (let i = 0; i < 40; i++) await p2.keyboard.press('ArrowLeft');
    await playing(p2);
    a = await player(p2);
    c.is('a volume set before the first song holds', Math.abs(a.volume - 0.3) < 0.001, String(a.volume));
    return c.done();
  },
});
line({
  id: 'play.volumePhone',
  group: 'The player',
  where: ['phone'],
  press: 'Moves the **vol** slider in the queue sheet',
  should: "The app's own volume follows, with its number.",
  proof: 'set to 25, the real volume is 0.25 and the label reads 25%',
  covers: ['#volP@input'],
  run: async (T, where) => {
    const c = checks();
    const page = await T.open({ where });
    await playing(page);
    await page.click('#trackBtn');
    c.is('the slider can be reached', await reachable(page, '#volP'));
    await page.evaluate(() => {
      const el = document.getElementById('volP');
      el.value = 25;
      el.dispatchEvent(new Event('input', { bubbles: true }));
    });
    const a = await player(page);
    c.is('the real volume is 0.25', Math.abs(a.volume - 0.25) < 0.001, String(a.volume));
    c.is('the label follows', (await txt(page, '#volPV')) === '25%', await txt(page, '#volPV'));
    return c.done();
  },
});
line({
  id: 'play.repeatPhone',
  group: 'The player',
  where: ['phone'],
  press: '**repeat** in the queue sheet',
  should: 'The same repeat, stepped from the phone: off, all, one.',
  proof: "each press steps the real repeat (the bar's own button reads all, then one, then off) and the phone's button is lit unless off",
  covers: ['#repeatP@click'],
  run: async (T, where) => {
    const c = checks();
    const page = await T.open({ where });
    await page.click('#trackBtn');
    const seen = [];
    for (let i = 0; i < 3; i++) {
      await page.click('#repeatP');
      seen.push((await txt(page, '#repeatBtn')) + '/' + (await txt(page, '#repeatP')) + ((await has(page, '#repeatP', 'on')) ? '*' : ''));
    }
    c.is('it steps all, one, off', seen.join(' ') === 'all/all* one/one* off/repeat off', seen.join(' '));
    return c.done();
  },
});

/* ---- 6 · Pelvy and the Echoes ---- */

line({
  id: 'pelvy.staying',
  group: 'Pelvy and the Echoes',
  press: 'Nothing: stays and listens',
  should: 'Every 30 seconds of listening earns one Echo (Pelvy catches the rest). Not listening earns nothing.',
  proof: 'on the stepped clock, with the layer of Pelvy off so he catches nothing: 31 seconds of listening moves the count from 1 to 2; 31 seconds of silence leaves it at 1',
  covers: [],
  run: async (T) => {
    const c = checks();
    const page = await loud(T, 'cyn');
    // Pelvy's layer off, so only time earns here (his catches have their own line)
    await page.evaluate(() => { const b = document.querySelector('#layerList input[data-ly=pelvy]'); if (b && b.checked) b.click(); });
    await pass(page, 31000);
    c.is('listening earns', (await txt(page, '#echoV')) === '2/100', await txt(page, '#echoV'));
    const quiet = await T.open({ where: 'small', proven: true });
    await quiet.click('#shapes [data-shape=cyn]');
    await pass(quiet, 31000);
    c.is('silence earns nothing', (await txt(quiet, '#echoV')) === '1/100', await txt(quiet, '#echoV'));
    return c.done();
  },
});
line({
  id: 'pelvy.stacks',
  group: 'Pelvy and the Echoes',
  where: ['pc', 'phone'],
  press: 'Nothing: the hundredth Echo arrives',
  should: "A hundred Echoes become a stack: a pip lights, the level goes up, Focus wakes, the bubble says how many he holds. At three he can't sit still (α1.5: it was a tremble). A fourth does not fit. It is all kept for the next visit.",
  proof: 'from 99 and a half Echoes one tap on the stage lights a pip, reads Lv 2, enables Focus and says "Pelvy holds 1 stack..."; from two stacks the third says "Pelvy is full and can\'t sit still..." and the plate goes eager; with three, "cannot hold more than three"; after a reload the pips are still lit',
  covers: [],
  run: async (T, where) => {
    const c = checks();
    const tapStage = (p) => (where === 'pc' ? p.mouse.click(800, 400) : p.mouse.click(201, 300));
    const page = await T.open({ where, keep: you({ echo: 99.5 }) });
    c.is('Focus sleeps with no stack', await page.isDisabled('#focusBtn'));
    await tapStage(page);
    c.is('a pip lights', (await pips(page)) === 1);
    c.is('the level goes up', (await txt(page, '#lvl')) === 'Lv 2' && (await txt(page, '#echoV')) === '0/100', await txt(page, '#lvl'));
    c.is('Focus wakes', !(await page.isDisabled('#focusBtn')) && (await has(page, '#focusBtn', 'charged')));
    c.is('the bubble counts', await bubbleSays(page, /^Pelvy holds 1 stack\. Press F when the chorus hits\.$/, 500), await bubble(page));
    await page.reload();
    await page.waitForFunction(() => window.AV, null, { polling: 50 });
    c.is('kept after a reload', (await pips(page)) === 1);
    const full = await T.open({ where, keep: you({ echo: 99.5, charges: 2 }) });
    await tapStage(full);
    c.is('the third says he is full', /^Pelvy is full and can't sit still\./.test(await bubble(full)), await bubble(full));
    await full.waitForTimeout(300);
    c.is("he can't sit still", (await pips(full)) === 3 && (await has(full, '#pelvy', 'full')));
    const over = await T.open({ where, keep: you({ echo: 99.5, charges: 3 }) });
    await tapStage(over);
    c.is('a fourth does not fit', /cannot hold more than three/.test(await bubble(over)) && (await pips(over)) === 3, await bubble(over));
    return c.done();
  },
});
line({
  id: 'pelvy.pips',
  group: 'Pelvy and the Echoes',
  where: ['pc', 'phone'],
  press: "Pelvy's first, second or third pip, while the Lab's numbers are on",
  should: 'The quiet switch for testing: sets him to that many stacks. With the numbers off a pip does nothing. It is not saved.',
  proof: 'numbers off: a click leaves 0 pips; numbers on: the second pip lights two and the bubble reads "Pelvy holds 2."; the third lights three; after a reload he holds none',
  covers: ['pip@click'],
  run: async (T, where) => {
    const c = checks();
    const page = await T.open({ where });
    await page.locator('#pips s').nth(1).click();
    c.is('numbers off: nothing', (await pips(page)) === 0);
    await tool(page, '#labBtn');
    await page.click('#numBtn');
    await page.keyboard.press('Escape');
    await page.locator('#pips s').nth(1).click();
    c.is('the second pip lights two', (await pips(page)) === 2 && (await bubble(page)) === 'Pelvy holds 2.', await bubble(page));
    await page.locator('#pips s').nth(2).click();
    c.is('the third lights three', (await pips(page)) === 3);
    await page.reload();
    await page.waitForFunction(() => window.AV, null, { polling: 50 });
    c.is('not saved', (await pips(page)) === 0);
    return c.done();
  },
});
line({
  id: 'pelvy.god',
  group: 'Pelvy and the Echoes',
  press: 'Opens the page with **?god** at the end of its address',
  should: 'Pelvy starts full, and a Focus spends nothing.',
  proof: 'three pips at the start; after F there are still three',
  covers: [],
  run: async (T) => {
    const c = checks();
    const page = await T.open({ query: '?god' });
    c.is('he starts full', (await pips(page)) === 3);
    await page.keyboard.press('f');
    c.is('a Focus fires', /Bod-e blooms/.test(await bubble(page)), await bubble(page));
    c.is('and spends nothing', (await pips(page)) === 3);
    return c.done();
  },
});

/* ---- 7 · Focus ---- */

const FOCUS_SAYS = {
  1: 'Pelvy lets go. Bod-e blooms.',
  2: 'Pelvy gives two. The room lets go.',
  3: 'Pelvy gives everything. Nothing holds her.',
  tyde: 'Pelvy lets go. Gali splits.',
  hinge: 'Pelvy lets go. Hingez comes undone.',
  cyn: 'Pelvy lets go. Wren goes up.',
};
const FOCUS_LASTS = { 1: 20, 2: 26, 3: 34 };
// the checks every Focus line shares
async function focusChecks(T, c, r, shape, level, spent, stacks) {
  c.is('the bubble', r.said === (shape === 'bode' ? FOCUS_SAYS[level] : FOCUS_SAYS[shape]), r.said);
  c.is('Pelvy gave ' + spent, r.left === stacks - spent, r.left + ' left of ' + stacks);
  c.is('it lasts ' + FOCUS_LASTS[level] + ' s', Math.abs(r.lasted - FOCUS_LASTS[level]) <= 0.5, r.lasted + ' s');
  const d = apart(r.pic, await focusBase(T, shape));
  c.is('the picture is not the one without Focus', d > 1, d.toFixed(1) + ' apart');
  c.is('the button rests while it runs', !r.charged);
  c.is('and is ready again after, if he still holds a stack', r.chargedAfter === r.left > 0);
}
line({
  id: 'focus.tap',
  group: 'Focus',
  press: 'A tap on **Focus**, Pelvy holding one stack (Bod-e)',
  should: 'One stack is spent and she blooms: out of her body, for twenty seconds, then back.',
  proof: 'the bubble reads "Pelvy lets go. Bod-e blooms."; the pip goes dark; three seconds in the picture differs from the same moment without Focus; "...and back." comes after 20 seconds of her own clock',
  covers: ['#focusBtn@click'],
  run: async (T) => {
    const c = checks();
    await focusChecks(T, c, await focusRun(T, 'bode', 1, 'tap'), 'bode', 1, 1, 1);
    return c.done();
  },
});
line({
  id: 'focus.F',
  group: 'Focus',
  press: 'The **F** key, Pelvy holding two (Bod-e)',
  should: 'F spends one stack only: the same Focus as a tap. The other stack stays.',
  proof: 'the bubble reads "Pelvy lets go. Bod-e blooms."; one pip is left; it lasts 20 seconds; Focus is ready again afterwards',
  covers: ['key:f'],
  run: async (T) => {
    const c = checks();
    await focusChecks(T, c, await focusRun(T, 'bode', 2, 'f'), 'bode', 1, 1, 2);
    return c.done();
  },
});
line({
  id: 'focus.S2',
  group: 'Focus',
  press: 'The **S** key, Pelvy holding two (Bod-e)',
  should: 'Both stacks are spent in one go: out of the room. A different Focus from one stack, and longer.',
  proof: 'the bubble reads "Pelvy gives two. The room lets go."; no pip is left; it lasts 26 seconds; three seconds in the picture differs from the one-stack Focus at the same moment',
  covers: ['key:s'],
  run: async (T) => {
    const c = checks();
    const r = await focusRun(T, 'bode', 2, 's');
    await focusChecks(T, c, r, 'bode', 2, 2, 2);
    const d = apart(r.pic, (await focusRun(T, 'bode', 1, 'tap')).pic);
    c.is('two stacks is not the one-stack Focus', d > 0.5, d.toFixed(2) + ' apart');
    return c.done();
  },
});
line({
  id: 'focus.S3',
  group: 'Focus',
  press: 'The **S** key, Pelvy holding three (Bod-e)',
  should: 'All three are spent: out of everything. Different again from two, and the longest.',
  proof: 'the bubble reads "Pelvy gives everything. Nothing holds her."; no pip is left; it lasts 34 seconds; three seconds in the picture differs from the two-stack Focus',
  covers: [],
  run: async (T) => {
    const c = checks();
    const r = await focusRun(T, 'bode', 3, 's');
    await focusChecks(T, c, r, 'bode', 3, 3, 3);
    const d = apart(r.pic, (await focusRun(T, 'bode', 2, 's')).pic);
    c.is('three stacks is not the two-stack Focus', d > 0.5, d.toFixed(2) + ' apart');
    return c.done();
  },
});
line({
  id: 'focus.hold',
  group: 'Focus',
  where: ['pc', 'phone'],
  press: 'Holds **Focus** down for a little over half a second, Pelvy holding three',
  should: 'Holding spends everything, like S. A short tap spends one. Sliding off the button before the half second spends nothing.',
  proof: 'held 0.8 s: the bubble reads "Pelvy gives everything..." and no pip is left; a tap leaves two; pressed and slid off: three pips still lit and no bubble; pressed and cancelled by the device: the same',
  covers: ['#focusBtn@pointerdown', '#focusBtn@pointerup', '#focusBtn@pointerleave', '#focusBtn@pointercancel'],
  run: async (T, where) => {
    const c = checks();
    const three = { where, keep: you({ charges: 3 }) };
    let page = await T.open(three);
    let box = await page.locator('#focusBtn').boundingBox();
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    await page.waitForTimeout(800);
    await page.mouse.up();
    c.is('held: everything', (await bubble(page)) === FOCUS_SAYS[3] && (await pips(page)) === 0, (await bubble(page)) + ' / ' + (await pips(page)) + ' left');
    page = await T.open(three);
    await pressAt(page, '#focusBtn');
    c.is('a tap: one', (await bubble(page)) === FOCUS_SAYS[1] && (await pips(page)) === 2, (await pips(page)) + ' left');
    page = await T.open(three);
    box = await page.locator('#focusBtn').boundingBox();
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width / 2, box.y - 120, { steps: 4 });
    await page.waitForTimeout(800);
    await page.mouse.up();
    c.is('slid off: nothing', (await pips(page)) === 3 && !(await bubble(page)), (await pips(page)) + ' left');
    page = await T.open(three);
    await page.evaluate(() => {
      const b = document.getElementById('focusBtn');
      b.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
      b.dispatchEvent(new PointerEvent('pointercancel', { bubbles: true }));
    });
    await page.waitForTimeout(800);
    c.is('cancelled: nothing', (await pips(page)) === 3 && !(await bubble(page)), (await pips(page)) + ' left');
    return c.done();
  },
});
for (const shape of ['tyde', 'hinge', 'cyn']) {
  // α1.5: every stack counts on Hingez and Wren too (Pelvy's part, and Wren's cascade); Gali keeps one until her redesign
  const all = shape !== 'tyde';
  line({
    id: 'focus.' + shape,
    group: 'Focus',
    press: 'The **S** key on ' + NAMES[shape] + ', Pelvy holding two',
    should: all
      ? 'S spends both stacks on ' + NAMES[shape] + ' (α1.5): a longer Focus, and Pelvy goes in harder' + (shape === 'cyn' ? ' (her cascade is the two-stack one)' : '') + '.'
      : 'Gali keeps one stack per Focus until her redesign (1.6), so S spends one, the same as F.',
    proof: 'the bubble reads "' + FOCUS_SAYS[shape] + '"; ' + (all ? 'no pip is left; it lasts 26 seconds' : 'one pip is left; it lasts 20 seconds') + '; three seconds in the picture differs from the same moment without Focus',
    covers: [],
    run: async (T) => {
      const c = checks();
      await focusChecks(T, c, await focusRun(T, shape, 2, 's'), shape, all ? 2 : 1, all ? 2 : 1, 2);
      return c.done();
    },
  });
}
line({
  id: 'focus.none',
  group: 'Focus',
  where: ['pc', 'phone'],
  press: 'F, S or the button with no stack; and F again while a Focus runs',
  should: 'With no stack nothing fires and the button sleeps. While a Focus runs a second one cannot start.',
  proof: 'no stack: the button is disabled, F and S leave the bubble empty; with two stacks, F then F again leaves one pip, not none; the guide counts one Focus fired',
  covers: [],
  run: async (T, where) => {
    const c = checks();
    let page = await T.open({ where });
    await page.keyboard.press('f');
    await page.keyboard.press('s');
    c.is('no stack: nothing', (await page.isDisabled('#focusBtn')) && !(await bubble(page)));
    page = await T.open({ where, keep: you({ charges: 2 }) });
    await page.keyboard.press('f');
    await page.keyboard.press('f');
    await page.keyboard.press('s');
    c.is('a second cannot start', (await pips(page)) === 1, (await pips(page)) + ' left');
    await tool(page, '#legendBtn');
    c.is('the guide counts it', /, 1 Focused Frequencies fired/.test(await txt(page, '#youLine')), (/\d+ Focused Frequencies fired/.exec(await txt(page, '#youLine')) || [''])[0]);
    return c.done();
  },
});

/* ---- 7b · the thread and the Hingez note (α1.5) ---- */

// holds the Thread button (or T) for ms on a playing song, the way he would
async function holdThread(page, how, ms) {
  if (how === 'key') {
    await page.keyboard.down('t');
    await page.waitForTimeout(ms);
    await page.keyboard.up('t');
    return;
  }
  const b = await page.locator('#threadBtn').boundingBox();
  await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2);
  await page.mouse.down();
  await page.waitForTimeout(ms / 2);
  const mid = { live: await has(page, '#threadBtn', 'live'), says: await txt(page, '#threadBtn') };
  await page.waitForTimeout(ms / 2);
  await page.mouse.up();
  return mid;
}
for (const how of ['button', 'key']) {
  line({
    id: 'thread.' + how,
    group: 'The thread',
    where: how === 'button' ? ['pc', 'phone'] : ['pc'],
    press: how === 'button' ? 'Holds **Thread** (by Auto) while a song plays, then lets go' : 'Holds the **T** key while a song plays, then lets go',
    should: 'While held it listens (the button reads Listening, in red). Let go, and the song has a thread: the bubble names the song and the stretch held, the button gets its dot, and every time the song reaches that stretch again the thread plays (the button lights, the woven line runs). Held too short, it asks for longer. With nothing playing, it says to play a song first.',
    proof: 'nothing playing: "Play a song first..."; held 0.3 s: "Hold it a little longer..."; held 1.6 s: the button read Listening while held, the bubble reads "Got your thread in test one, 0:0x to 0:0x...", ayvee.threads keeps it with its stretch, the dot shows; the song set back to the start of the stretch: the thread is on within a second (the button lit, the thread reading over 0.5); set to a second before it: off',
    covers: how === 'button' ? ['#threadBtn@pointerdown', '#threadBtn@pointerup', '#threadBtn@pointerleave', '#threadBtn@pointercancel'] : ['key:t', 'window@keyup'],
    run: async (T, where) => {
      const c = checks();
      const page = await T.open({ where });
      if (where === 'phone') await page.click('#moreBtn');
      await holdThread(page, how, 300);
      c.is('nothing playing: play a song first', /^Play a song first/.test(await bubble(page)), await bubble(page));
      await playing(page);
      await page.waitForTimeout(1500);
      await holdThread(page, how, 300);
      c.is('too short: hold longer', /^Hold it a little longer/.test(await bubble(page)), await bubble(page));
      const t0 = await page.evaluate(() => window.__t.audios[0].currentTime);
      const mid = await holdThread(page, how, 1600);
      if (mid) c.is('held: it reads Listening, in red', mid.live && mid.says === 'Listening', JSON.stringify(mid));
      c.is('the bubble names the song and the stretch', /^Got your thread in test one, 0:0\d to 0:0\d/.test(await bubble(page)), await bubble(page));
      const kept = JSON.parse((await stored(page, 'ayvee.threads')) || '{}')['song:test one.wav'];
      c.is('it is kept, with its stretch', !!(kept && kept.at && kept.at[1] - kept.at[0] > 1), JSON.stringify(kept && kept.at));
      c.is('the dot shows', await has(page, '#threadBtn', 'known'));
      await page.evaluate((t) => (window.__t.audios[0].currentTime = t + 0.2), kept ? kept.at[0] : t0);
      await page.waitForTimeout(1000);
      const on = await page.evaluate(() => window.MO.thread);
      c.is('at the stretch it plays', on > 0.5 && (await has(page, '#threadBtn', 'on')), 'thread ' + on.toFixed(2));
      await page.evaluate((t) => (window.__t.audios[0].currentTime = Math.max(0, t - 1.5)), kept ? kept.at[0] : t0);
      await page.waitForTimeout(400);
      c.is('before it, it does not', !(await has(page, '#threadBtn', 'on')));
      return c.done();
    },
  });
}
line({
  id: 'hingez.wip',
  group: 'The thread',
  where: ['pc', 'phone'],
  press: 'Picks **Hingez**',
  should: 'His card carries a "still being made" tag (WIP on the phone), and picking him puts up a note that says so for five seconds. Picking someone else takes it away.',
  proof: 'the tag is on his card and shows; after the pick the note shows and reads "Hingez is still being made..."; it can be seen in the window; picking Wren hides it',
  covers: [],
  run: async (T, where) => {
    const c = checks();
    const page = await T.open({ where });
    c.is('the tag is on his card', await shown(page, '#shapes [data-shape=hinge] .wip'));
    await page.click('#shapes [data-shape=hinge]');
    await page.waitForTimeout(400);
    const n = await page.evaluate(() => {
      const e = document.getElementById('wipNote'),
        r = e.getBoundingClientRect();
      return { on: e.classList.contains('show') && +getComputedStyle(e).opacity > 0.9, txt: e.textContent, inside: r.left >= 0 && r.top >= 0 && r.right <= innerWidth && r.bottom <= innerHeight };
    });
    c.is('the note shows', n.on && /^Hingez is still being made\./.test(n.txt), n.txt);
    c.is('in the window', n.inside);
    await page.click('#shapes [data-shape=cyn]');
    await page.waitForTimeout(400);
    c.is('picking Wren hides it', !(await has(page, '#wipNote', 'show')));
    return c.done();
  },
});

/* ---- 8 · mic, tab, the mood, freeze ---- */

line({
  id: 'tools.mic',
  group: 'Mic, tab, the mood, freeze',
  where: ['pc', 'phone'],
  press: '**Mic**',
  should: 'It listens to the room: the button lights, the meter reads MIC, a playing song is put away. Pressed again it stops.',
  proof: "with the test browser's made-up microphone: the button reads Mic on, the meter reads MIC, the song is unloaded; pressed again it reads Mic off and the meter goes back to IDLE",
  covers: ['#mic@click'],
  hands: 'a real microphone, the browser asking him for it, and what the room does to the picture',
  run: async (T, where) => {
    const c = checks();
    const page = await T.open({ where });
    await playing(page);
    await tool(page, '#mic');
    await page.waitForFunction(() => document.getElementById('meterState').textContent === 'MIC', null, { polling: 100, timeout: 6000 }).catch(() => {});
    c.is('the button lights', (await txt(page, '#mic')) === 'Mic on' && (await has(page, '#mic', 'live')), await txt(page, '#mic'));
    c.is('the meter reads MIC', (await txt(page, '#meterState')) === 'MIC', await txt(page, '#meterState'));
    c.is('the song is put away', (await txt(page, '#now')) === 'Nothing loaded' && (await player(page)).paused);
    await tool(page, '#mic');
    await page.waitForFunction(() => document.getElementById('meterState').textContent === 'IDLE', null, { polling: 100, timeout: 5000 }).catch(() => {});
    c.is('pressed again it stops', (await txt(page, '#mic')) === 'Mic off' && (await txt(page, '#meterState')) === 'IDLE', (await txt(page, '#mic')) + ' / ' + (await txt(page, '#meterState')));
    return c.done();
  },
});
line({
  id: 'tools.tab',
  group: 'Mic, tab, the mood, freeze',
  where: ['pc', 'phone'],
  press: '**Tab**',
  should: 'On a computer in Chrome it asks which tab to read and then listens to it. On the phone the button is not offered.',
  proof: 'on the phone the button is not on screen. on the computer the button is there and a press gets an answer (the test browser has no tab picker, so the answer is the bubble saying it could not read one)',
  covers: ['#tab@click'],
  hands: 'picking a real tab with "Also share tab audio", the picture following that tab, and the tab ending',
  run: async (T, where) => {
    const c = checks();
    const page = await T.open({ where });
    if (where === 'phone') {
      await page.click('#moreBtn');
      c.is('not offered on the phone', !(await shown(page, '#tab')));
      return c.done();
    }
    c.is('the button is there', await reachable(page, '#tab'));
    await page.click('#tab');
    const said = await bubbleSays(page, /tab|Tab/, 5000);
    const on = (await txt(page, '#tab')) === 'Tab on';
    c.is('a press gets an answer', !!said || on, said || (on ? 'Tab on' : 'nothing'));
    return c.done();
  },
});
line({
  id: 'tools.mood',
  group: 'Mic, tab, the mood, freeze',
  where: ['pc', 'phone'],
  press: '**Auto** (the mood)',
  should: 'It steps Auto, Verse, Chorus. Verse holds her low, Chorus holds her high, whatever the sound does.',
  proof: 'the button and the bubble step through all three; with no sound at all, four seconds of Chorus draw a different picture from four seconds of Verse',
  covers: ['#mode@click'],
  run: async (T, where) => {
    const c = checks();
    const page = await T.open({ where });
    const seen = [];
    for (let i = 0; i < 3; i++) {
      await tool(page, '#mode');
      seen.push((await txt(page, '#mode')) + ': ' + (await bubble(page)));
    }
    c.is('it steps', seen.join(' | ') === 'Verse: Verse: held low. | Chorus: Chorus: held high. | Auto: Auto: the sound decides.', seen.join(' | '));
    c.is('Auto is lit', await has(page, '#mode', 'on'));
    if (where === 'pc') {
      const pics = [];
      for (const presses of [1, 2]) {
        const p = await T.open({ where: 'small', proven: true });
        for (let i = 0; i < presses; i++) await p.click('#mode');
        await pass(p, 4000);
        pics.push(await picture(p));
      }
      const d = apart(pics[0], pics[1]);
      c.is('Chorus is not Verse on the stage', d > 1, d.toFixed(1) + ' apart');
    }
    return c.done();
  },
});
line({
  id: 'tools.autoArc',
  group: 'Mic, tab, the mood, freeze',
  where: ['pc'],
  press: 'Nothing: **Auto** is on, and a song with a loud part, a quiet part and a loud part again plays',
  should: 'She follows the song\'s own arc: high in the loud parts, low in the quiet part, high again. (Before α1.3.2 every part read full.)',
  proof: 'the stand-in song "arc" is loud for 22 s, 30 dB quieter for 8 s, loud again; the picture at 21 s and at 35 s is brighter than the picture at 29 s',
  covers: [],
  run: async (T, where) => {
    const c = checks();
    const page = await T.open({ where });
    await pick(page, ['arc.wav']);
    await page.keyboard.press('h'); // the HUD away, so the picture is the stage alone
    await page.waitForTimeout(21000);
    const loud1 = brightRGB(await picture(page));
    await page.waitForTimeout(8000);
    const quiet = brightRGB(await picture(page));
    await page.waitForTimeout(6000);
    const loud2 = brightRGB(await picture(page));
    c.is('the quiet part draws a quieter picture than the first loud part', quiet < loud1 * 0.95, quiet.toFixed(1) + ' against ' + loud1.toFixed(1));
    c.is('she comes back up for the second loud part', loud2 > quiet * 1.05, loud2.toFixed(1) + ' against ' + quiet.toFixed(1));
    return c.done();
  },
});
line({
  id: 'tools.freeze',
  group: 'Mic, tab, the mood, freeze',
  where: ['pc', 'phone'],
  press: '**Freeze**',
  should: 'The picture stands still, and a tap on the stage does nothing. **Unfreeze** lets it move again.',
  proof: 'frozen: two pictures a second apart are the same to the pixel, and a tap earns no Echo; unfrozen: the picture moves again',
  covers: ['#pause@click'],
  run: async (T, where) => {
    const c = checks();
    const real = await T.open({ where });
    await tool(real, '#pause');
    c.is('the button says Unfreeze', (await txt(real, '#pause')) === 'Unfreeze' && (await has(real, '#pause', 'on')));
    if (where === 'phone') return c.done();
    const page = await T.open({ where: 'small', proven: true });
    await pass(page, 1000);
    await page.click('#pause');
    const a = await picture(page);
    await page.mouse.click(600, 350);
    await pass(page, 1000);
    const b = await picture(page);
    c.is('frozen: the picture stands still', apart(a, b) === 0, apart(a, b).toFixed(3) + ' apart');
    c.is('frozen: a tap earns nothing', (await txt(page, '#echoV')) === '0/100', await txt(page, '#echoV'));
    await page.click('#pause');
    await pass(page, 1000);
    const d = apart(b, await picture(page));
    c.is('unfrozen: it moves', d > 0 && (await txt(page, '#pause')) === 'Freeze', d.toFixed(2) + ' apart');
    return c.done();
  },
});

/* ---- 9 · the layers (one line per switch) ---- */

line({
  id: 'layers.panel',
  group: 'The layers',
  where: ['pc', 'phone'],
  press: '**Layers**, the **D** key, and **Close**',
  should: 'The panel opens with the layers of whoever is on the stage, plus Pelvy\'s echo, and counts how many are lit. Pressed again, or Close, it goes. On a computer it and the Lab take turns.',
  proof: 'Bod-e: 8 rows, "8/8 lit"; Gali 7, Hingez 5, Wren 6, and every row of each can be pressed; a second press closes; D opens; Close closes; opening the Lab closes Layers',
  covers: ['#layersBtn@click', 'key:d', '#closeLayers@click'],
  run: async (T, where) => {
    const c = checks();
    const page = await T.open({ where });
    await tool(page, '#layersBtn');
    c.is('it opens', (await has(page, '#layersPanel', 'open')) && (await reachable(page, '#layerList')));
    c.is('Bod-e: 8 rows, all lit', (await page.locator('#layerList label').count()) === 8 && (await txt(page, '#layersLit')) === '8/8 lit', await txt(page, '#layersLit'));
    await page.click('#closeLayers');
    c.is('Close closes', !(await has(page, '#layersPanel', 'open')));
    await page.keyboard.press('d');
    c.is('D opens', await has(page, '#layersPanel', 'open'));
    await page.keyboard.press('d');
    c.is('D again closes', !(await has(page, '#layersPanel', 'open')));
    const counts = [];
    const stuck = [];
    for (const s of ['tyde', 'hinge', 'cyn', 'bode']) {
      await page.click('#shapes [data-shape=' + s + ']');
      await page.waitForTimeout(1900);
      await tool(page, '#layersBtn');
      await page.waitForTimeout(600); // α1.5a: Layers is a hologram on the computer, born in 0.55 s; judged once settled
      const n = await page.locator('#layerList label').count();
      counts.push(n);
      for (let i = 1; i <= n; i++) {
        const row = '#layerList label:nth-child(' + i + ')';
        await page.locator(row).scrollIntoViewIfNeeded();
        if (!(await reachable(page, row))) stuck.push(s + ' row ' + i);
      }
      c.is(s + ': Close can be reached', await reachable(page, '#closeLayers'));
      await page.click('#closeLayers');
    }
    c.is('each embodiment has its own', counts.join(',') === '7,5,6,8', counts.join(','));
    c.is('every row of every embodiment can be pressed', !stuck.length, stuck.join(', ') || 'all ' + counts.reduce((a, b) => a + b, 0));
    await page.click('#layerList label >> nth=0').catch(() => {});
    if (where === 'pc') {
      await page.click('#layersBtn');
      await page.click('#labBtn');
      c.is('the Lab takes its place', !(await has(page, '#layersPanel', 'open')) && (await has(page, '#lab', 'open')));
      await page.click('#layersBtn');
      c.is('and gives it back', (await has(page, '#layersPanel', 'open')) && !(await has(page, '#lab', 'open')));
    }
    return c.done();
  },
});
const LAYERS = {
  bode: [['swirl', 'Swirl'], ['edge', 'Edge'], ['bursts', 'Bursts'], ['grit', 'Grit'], ['lights', 'Wall lights'], ['lamp', 'Lamp'], ['floor', 'Floor'], ['pelvy', 'Pelvy’s echo']],
  tyde: [['gwater', 'Water'], ['gfish', 'Fish'], ['gfoam', 'Foam and splashes'], ['glints', 'Glints'], ['gflowers', 'Sea-flowers'], ['glights', 'Lights']],
  cyn: [['wtrail', 'Trail'], ['wshards', 'Shards and cinders'], ['wcoals', 'Coals'], ['wdust', 'Dust'], ['wfloor', 'Her light on the floor']],
  hinge: [['hstrings', 'Strings'], ['hlight', 'The light inside'], ['hveins', 'Veins and cracks'], ['hmotes', 'Motes']],
};
for (const shape of SHAPES) {
  for (const [key, name] of LAYERS[shape]) {
    line({
      id: 'layer.' + shape + '.' + key,
      group: 'The layers',
      press: 'The **' + name + '** switch in Layers (' + NAMES[shape] + ')',
      should: 'That part of the picture goes; the lamp on its row goes dark and the lit count drops by one.',
      proof: 'the row is dark and the count is one lower; five busy seconds (the made-up song, the mood on Chorus, taps on the stage) draw a different picture from the same five seconds with it on',
      covers: ['layer:' + key + '@change'],
      run: async (T) => {
        const c = checks();
        const page = await loud(T, shape);
        await page.keyboard.press('d');
        const all = await page.locator('#layerList label').count();
        await flip(page, 'input[data-ly=' + key + ']');
        c.is('the row goes dark', await page.evaluate((k) => document.querySelector('input[data-ly=' + k + ']').parentNode.classList.contains('off'), key));
        c.is('the count drops', (await txt(page, '#layersLit')) === all - 1 + '/' + all + ' lit', await txt(page, '#layersLit'));
        await page.keyboard.press('Escape');
        const d = apart2(await busy(page), await busyBase(T, shape));
        c.is('that part of the picture is gone', d > 0.01, d.toFixed(2) + ' apart');
        return c.done();
      },
    });
  }
  line({
    id: 'layer.' + shape + '.back',
    group: 'The layers',
    press: 'Every switch of ' + NAMES[shape] + ' off, then on again',
    should: 'The whole picture is back, nothing missing.',
    proof: 'after every switch has been off and on, the same five busy seconds draw the same picture as if nothing had been touched, to the pixel',
    covers: [],
    run: async (T) => {
      const c = checks();
      const page = await loud(T, shape);
      await page.keyboard.press('d');
      const n = await page.locator('#layerList label').count();
      for (const turn of [0, 1]) {
        for (let i = 0; i < n; i++) await flip(page, '#layerList label:nth-child(' + (i + 1) + ') input');
        c.is(turn ? 'all lit again' : 'all dark', (await txt(page, '#layersLit')) === (turn ? n : 0) + '/' + n + ' lit', await txt(page, '#layersLit'));
      }
      await page.keyboard.press('Escape');
      const d = apart2(await busy(page), await busyBase(T, shape));
      c.is('the picture is whole again', d === 0, d.toFixed(3) + ' apart');
      return c.done();
    },
  });
}

/* ---- 10 · the Lab ---- */

line({
  id: 'lab.panel',
  group: 'The Lab',
  where: ['pc', 'phone'],
  press: '**Lab** and its **Close**',
  should: 'The Lab opens with Record, Mark and numbers; Close puts it away.',
  proof: 'the panel is open and all three buttons can be reached; after Close it is shut',
  covers: ['#labBtn@click', '#closeLab@click'],
  run: async (T, where) => {
    const c = checks();
    const page = await T.open({ where });
    await tool(page, '#labBtn');
    // α1.5a: on the computer the Lab is a hologram born out of its button in 0.55 s; its buttons are judged once it has settled
    await page.waitForTimeout(600);
    c.is('it opens', await has(page, '#lab', 'open'));
    for (const b of ['#recBtn', '#markBtn', '#numBtn']) c.is(b + ' can be reached', await reachable(page, b));
    await page.click('#closeLab');
    c.is('Close closes', !(await has(page, '#lab', 'open')));
    return c.done();
  },
});
// records what it hears for a moment and gives back the saved file, read
async function recordOnce(page, c, start, stop, markWith) {
  const before = page.files.length;
  const from = (await player(page)).at;
  await start();
  c.is('the button says Stop rec', (await txt(page, '#recBtn')) === 'Stop rec' && (await has(page, '#recBtn', 'live')));
  c.is('the bubble says it is recording', /^Recording what it hears/.test(await bubble(page)), await bubble(page));
  await page.waitForTimeout(700);
  await markWith();
  c.is('a mark is counted', /^mark 1 at \d+\.\d\ds$/.test(await bubble(page)), await bubble(page));
  await page.waitForTimeout(600);
  await markWith();
  await page.waitForTimeout(900);
  await stop();
  const sang = (await player(page)).at - from;
  const file = await caught(page, before);
  if (!c.is('a file is saved', !!file)) return;
  const j = JSON.parse(fs.readFileSync(file.path, 'utf8'));
  c.is('it is named for the song', file.name === 'ayvee-hears-test_one.wav.json', file.name);
  c.is('it says what made it', /^Ay-Vee Utopia α\d+\.\d+(\.\d+)?[a-z]?$/.test(j.app) && /* α1.3.2: any α1.3 build, lettered or not, keeps the same check */ j.source === 'track' && j.name === 'test one.wav', j.app);
  c.is('ten steps a second of the song', j.step === 0.1 && Math.abs(j.n - sang * 10) <= 5, j.n + ' steps in ' + sang.toFixed(1) + ' s of the song');
  c.is('all four layers have every step', [j.low, j.synth, j.voice, j.highs].every((a) => a.length === j.n));
  c.is('the bass was heard', Math.max(...j.low) > 0.2, 'bass up to ' + Math.max(...j.low));
  c.is('the bass hits are in it', j.onsets.length >= 2, j.onsets.length + ' hits');
  c.is('both marks are in it', j.markers.length === 2 && j.markers[1] > j.markers[0], j.markers.join(', '));
  c.is('the bubble sums it up', new RegExp('^Saved: ' + j.n + ' steps, ' + j.onsets.length + ' bass onsets, 2 marks\\.$').test(await bubble(page)), await bubble(page));
  c.is('the button is Record again', (await txt(page, '#recBtn')) === 'Record' && !(await has(page, '#recBtn', 'live')));
}
line({
  id: 'lab.record',
  group: 'The Lab',
  where: ['pc', 'phone'],
  press: '**Record**, **Mark** twice, **Record** again',
  should: 'It writes what it hears, ten times a second, with the bass hits and the marks, to a small file. No audio. With nothing playing it says to play something first; Mark without Record says to record first.',
  proof: 'the saved file is caught and opened: named for the song, ten steps for every second of the song that passed, four layers with every step, the bass heard, the bass hits and both marks in it; the bubble sums up the same numbers',
  covers: ['#recBtn@click', '#markBtn@click'],
  run: async (T, where) => {
    const c = checks();
    const page = await T.open({ where });
    await tool(page, '#labBtn');
    await page.click('#recBtn');
    c.is('nothing playing: it says so', (await bubble(page)) === 'Play something first, then Record.', await bubble(page));
    await page.click('#markBtn');
    c.is('Mark without Record: it says so', (await bubble(page)) === 'Record first, then Mark.', await bubble(page));
    await playing(page);
    await recordOnce(page, c, () => page.click('#recBtn'), () => page.click('#recBtn'), () => page.click('#markBtn'));
    return c.done();
  },
});
line({
  id: 'lab.recordKeys',
  group: 'The Lab',
  press: 'The **R** key, **M** twice, **R** again',
  should: 'The same as Record and Mark, from the keys.',
  proof: 'the same file, caught and opened, with both marks in it',
  covers: ['key:r', 'key:m'],
  run: async (T) => {
    const c = checks();
    const page = await T.open({});
    await playing(page);
    await recordOnce(page, c, () => page.keyboard.press('r'), () => page.keyboard.press('r'), () => page.keyboard.press('m'));
    return c.done();
  },
});
line({
  id: 'lab.numbers',
  group: 'The Lab',
  where: ['pc', 'phone'],
  press: '**numbers: off**',
  should: 'The readout shows: the time in the song, the four layers as numbers, the bass pulse, the frame rate, and on Bod-e the guard. It shows when it is recording. Pressed again it hides.',
  proof: 'the readout is on screen and not under anything; it carries the time, bass, syn, voice, highs, a frame rate, and "guard" on Bod-e but not on Gali; the time moves with the song; while recording it says so; off hides it',
  covers: ['#numBtn@click'],
  run: async (T, where) => {
    const c = checks();
    const page = await T.open({ where });
    await playing(page);
    await tool(page, '#labBtn');
    await page.click('#numBtn');
    c.is('the button says on', (await txt(page, '#numBtn')) === 'numbers: on' && (await has(page, '#numBtn', 'on')));
    await page.click('#recBtn');
    await page.keyboard.press('Escape');
    await page.waitForTimeout(1200);
    const r1 = await txt(page, '#read');
    c.is('it can be seen', await reachable(page, '#read'));
    c.is('it carries the numbers', /^\d:\d\d\.\d bass \d\.\d\d syn \d\.\d\d voice \d\.\d\d highs \d\.\d\d/.test(r1) && /frame \d+ fps/.test(r1), r1.slice(0, 60));
    c.is('the guard shows on Bod-e', /guard (full|glass flat)/.test(r1), (/guard .*?(?= recording|$)/.exec(r1) || ['no guard'])[0]);
    c.is('it says it is recording', /recording \d+ steps/.test(r1));
    await page.waitForTimeout(1000);
    c.is('the time moves', (await txt(page, '#read')).slice(0, 6) !== r1.slice(0, 6), (await txt(page, '#read')).slice(0, 6));
    await page.click('#shapes [data-shape=tyde]');
    await page.waitForTimeout(600);
    c.is('no guard on Gali', !/guard/.test(await txt(page, '#read')));
    await tool(page, '#labBtn');
    await page.click('#numBtn');
    c.is('off hides it', !(await shown(page, '#read')) && (await txt(page, '#numBtn')) === 'numbers: off');
    return c.done();
  },
});
line({
  id: 'lab.guard',
  group: 'The Lab',
  press: 'Nothing: Bod-e on a machine that cannot keep up',
  should: 'The guard steps her quality down a notch at a time, the glass first, and the numbers show the notch. On a fast machine it steps back up and stays on "full".',
  proof: 'on the test machine (no graphics card, far under budget) with a song on and the mood on Chorus, the numbers leave "full" within twenty seconds and read "glass flat..."',
  covers: [],
  hands: 'on his card: that it reads "full" on Telo, and that it steps back up after a drop',
  run: async (T) => {
    const c = checks();
    const page = await T.open({});
    await playing(page, ['test one.wav', 'test two.wav', 'test three.wav']);
    await page.click('#repeatBtn');
    await page.click('#mode');
    await page.click('#mode');
    await page.click('#labBtn');
    await page.click('#numBtn');
    let read = '';
    for (let i = 0; i < 40 && !/guard glass flat/.test(read); i++) {
      await page.waitForTimeout(500);
      read = await txt(page, '#read');
    }
    c.is('the guard steps down when frames run short', /guard glass flat/.test(read), (/frame \d+ fps.*$/.exec(read) || [read])[0]);
    return c.done();
  },
});

/* ---- 11 · Clip ---- */

line({
  id: 'clip.button',
  group: 'Clip',
  press: 'The **Clip** button, then **Stop clip**',
  should: 'It records the stage as a video, with the song, and saves it when stopped.',
  proof: 'while recording: the red clip plate, the button reading Stop clip, the bubble; the saved file is caught and opened: a video that plays, as long as it recorded, with frames that are not black, with the song in it, named for the embodiment and the song',
  covers: ['#clipBtn@click'],
  run: async (T) => {
    const c = checks();
    const page = await T.open({});
    await playing(page);
    const r = await clipOnce(page, c, () => page.click('#clipBtn'), () => page.click('#clipBtn'));
    if (r) {
      c.is('the song is in it', !!r.v.audio && r.v.loudest > -40, (r.v.audio || 'no sound') + ', peak ' + r.v.loudest + ' dB');
      c.is('named for the embodiment and the song', /^ayvee-bode-test_one\.(webm|mp4)$/.test(r.file.name), r.file.name);
    }
    return c.done();
  },
});
line({
  id: 'clip.key',
  group: 'Clip',
  press: 'The **C** key, then C again',
  should: 'The same as the button.',
  proof: 'the same saved video, caught and opened, with the song in it',
  covers: ['key:c'],
  run: async (T) => {
    const c = checks();
    const page = await T.open({});
    await playing(page);
    const r = await clipOnce(page, c, () => page.keyboard.press('c'), () => page.keyboard.press('c'));
    if (r) c.is('the song is in it', !!r.v.audio && r.v.loudest > -40, (r.v.audio || 'no sound') + ', peak ' + r.v.loudest + ' dB');
    return c.done();
  },
});
line({
  id: 'clip.fromFile',
  group: 'Clip',
  press: 'Clip, with the build opened as a file from the computer (the way he opens it)',
  should: 'The same clip is saved. A page inside the claude.ai viewer may not hand over a file, so this is the place that counts.',
  proof: 'opened from a file address: the saved video is caught and opened, plays, and has the song in it',
  covers: [],
  hands: 'the file landing in his Downloads folder, and that it plays in his player',
  run: async (T) => {
    const c = checks();
    const page = await T.open({ file: true });
    await playing(page);
    const r = await clipOnce(page, c, () => page.click('#clipBtn'), () => page.click('#clipBtn'));
    if (r) c.is('the song is in it', !!r.v.audio, r.v.audio || 'no sound');
    return c.done();
  },
});
line({
  id: 'clip.noSong',
  group: 'Clip',
  press: 'Clip on Gali with nothing playing',
  should: 'A clip of the stage alone is saved, named for Gali.',
  proof: 'the saved video plays, its frames are not black, and it is named ayvee-tyde-ayvee',
  covers: [],
  run: async (T) => {
    const c = checks();
    const page = await T.open({});
    await page.click('#shapes [data-shape=tyde]');
    const r = await clipOnce(page, c, () => page.click('#clipBtn'), () => page.click('#clipBtn'));
    if (r) c.is('named for Gali', /^ayvee-tyde-ayvee\.(webm|mp4)$/.test(r.file.name), r.file.name);
    return c.done();
  },
});
line({
  id: 'clip.minute',
  group: 'Clip',
  press: 'Starts a clip and leaves it',
  should: 'It stops by itself after one minute and saves.',
  proof: "the page's clock is moved one minute on: the clip stops and the file is saved without a press",
  covers: [],
  hands: 'a real full minute: that the file holds all sixty seconds',
  run: async (T) => {
    const c = checks();
    const page = await T.open({ clock: true });
    await page.click('#clipBtn');
    await page.waitForTimeout(1000);
    c.is('it is recording', await has(page, 'body', 'clipping'));
    await page.clock.fastForward(55000);
    await page.waitForTimeout(500);
    c.is('still recording a few seconds before the minute', await has(page, 'body', 'clipping'));
    await page.clock.fastForward(5000);
    const file = await caught(page, 0, 9000);
    c.is('it stopped and saved by itself', !!file && !(await has(page, 'body', 'clipping')), file ? file.name : 'no file');
    if (file) c.is('the video plays', videoFacts(file.path).ok);
    return c.done();
  },
});
line({
  id: 'clip.phone',
  group: 'Clip',
  where: ['phone'],
  press: 'Looks for **Clip** on the phone',
  should: 'Clip is a computer thing (23 Nov 2026: "won\'t be clipping on phone"): the phone shows no Clip button and no length choice.',
  proof: 'neither the Clip button nor 1x / 2x / 3x can be seen anywhere on the phone, with the queue and the ears open or shut',
  covers: [],
  run: async (T, where) => {
    const c = checks();
    const page = await T.open({ where });
    const seen = [];
    for (const open of [null, '#trackBtn', '#moreBtn']) {
      if (open) await page.click(open);
      for (const s of ['#clipBtn', '#tools .clen button']) if (await shown(page, s)) seen.push(s + (open ? ' with ' + open : ''));
    }
    c.is('no Clip on the phone', !seen.length, seen.join(' ') || 'none');
    return c.done();
  },
});
/* ---- 12 · Immerse and Hide ---- */

line({
  id: 'hud.immerse',
  group: 'Immerse and Hide',
  where: ['pc', 'phone'],
  press: '**Immerse**, and the **I** key',
  should: 'The HUD goes, the edges of the stage darken, and one dim tab stays as the way back. I, or the tab, brings everything back.',
  proof: 'every pane is off screen and the tab is there; the picture is darker at its edges than the same moment without Immerse; I brings the panes back; pressed from I it goes again and the tab brings it back',
  covers: ['#immerseBtn@click', '#immerseP@click', 'key:i', 'document@fullscreenchange', 'document@visibilitychange'],
  hands: 'the window going fullscreen, the screen staying awake, Esc out of fullscreen bringing the HUD back, and coming back to the tab keeping the screen awake',
  run: async (T, where) => {
    const c = checks();
    const page = await T.open({ where });
    await page.click(where === 'phone' ? '#immerseP' : '#immerseBtn');
    await page.waitForTimeout(400);
    c.is('it is immersed', (await has(page, 'body', 'immersed')) && (await has(page, 'body', 'hud-off')));
    c.is('the bubble says so', /^Immersed\./.test(await bubble(page)), await bubble(page));
    const left = [];
    for (const s of ['#hud', '#title', '#meter', '#rail', '#transport']) if (await shown(page, s)) left.push(s);
    c.is('every pane is gone', !left.length, left.join(' ') || 'none left');
    c.is('the tab stays', await reachable(page, '#hudTab'));
    await page.keyboard.press('i');
    await page.waitForTimeout(300);
    c.is('I brings it back', !(await has(page, 'body', 'immersed')) && (await shown(page, '#hud')));
    await page.keyboard.press('i');
    await page.waitForTimeout(300);
    await page.click('#hudTab');
    c.is('from I, the tab brings the HUD back', await shown(page, '#hud'));
    if (where === 'pc') {
      const pics = [];
      for (const on of [false, true]) {
        const p = await T.open({ where: 'small', proven: true });
        await p.click('#mode');
        await p.click('#mode');
        if (on) await p.keyboard.press('i');
        await p.waitForTimeout(300);
        await pass(p, 3000);
        pics.push(await picture(p));
      }
      const edge = (a) => {
        let s = 0;
        for (let x = 0; x < 96; x++) for (const y of [0, 1, 54, 55]) s += a[(y * 96 + x) * 4] + a[(y * 96 + x) * 4 + 1] + a[(y * 96 + x) * 4 + 2];
        return s / (96 * 4 * 3);
      };
      c.is('the edges darken', edge(pics[1]) < edge(pics[0]) * 0.8, edge(pics[0]).toFixed(1) + ' to ' + edge(pics[1]).toFixed(1));
    }
    return c.done();
  },
});
line({
  id: 'hud.hide',
  group: 'Immerse and Hide',
  where: ['pc', 'phone'],
  press: 'The **H** key, and the **HUD** tab',
  should: 'The Hide button is gone (23 Nov 2026: you immerse, or slide away what you don\'t want). H still hides everything and shows it again; the tab is the way back.',
  proof: 'there is no Hide button; after H no pane is on screen and the tab can be pressed; the tab brings them back; H hides, H shows',
  covers: ['#hudTab@click', 'key:h'],
  run: async (T, where) => {
    const c = checks();
    const page = await T.open({ where });
    c.is('no Hide button', !(await page.locator('#hudBtn').count()));
    await page.keyboard.press('h');
    c.is('H hides everything', !(await shown(page, '#hud')));
    c.is('the tab can be pressed', await reachable(page, '#hudTab'));
    await page.click('#hudTab');
    c.is('the tab brings them back', (await shown(page, '#hud')) && (await shown(page, '#title')) && !(await shown(page, '#hudTab')));
    await page.keyboard.press('h');
    c.is('H hides', !(await shown(page, '#hud')));
    await page.keyboard.press('h');
    c.is('H shows', await shown(page, '#hud'));
    return c.done();
  },
});
line({
  id: 'tell.report',
  group: 'Tell Nate',
  where: ['pc', 'phone'],
  press: '**Tell Nate**, writes something, then **Copy it**, **Save**, **Share…**, **Close**',
  should: 'The report carries what was written with the version, the device, the window, the embodiment and what was playing. Copy puts it on the clipboard, Save writes a file, Share opens the device\'s share sheet (or saves, where there is none), Close puts the card away. Typing in the box presses no keys of the app.',
  proof: 'the clipboard is read back and holds the report with the written words, the version, the embodiment and the song; the saved file is caught and holds the same; where the browser has no share sheet, Share saves the file; typing "c h f" in the box starts no clip and hides nothing',
  covers: ['#tellBtn@click', '#tell@click', '#tellWhat', 'tell:copy', 'tell:save', 'tell:share', 'tell:close'],
  hands: "the phone's real share sheet; and Copy when the build is opened as a file, where a browser may refuse the clipboard and save the report instead",
  run: async (T, where) => {
    const c = checks();
    const page = await T.open({ where });
    await playing(page);
    await tool(page, '#tellBtn');
    c.is('the card opens', await shown(page, '#tell'));
    await page.click('#tellWhat');
    await page.keyboard.type('c h f the light never came back');
    c.is('typing presses no keys of the app', !(await has(page, 'body', 'clipping')) && !(await has(page, 'body', 'hud-off')));
    await page.click('[data-tell=copy]');
    c.is('the bubble says copied', await bubbleSays(page, /^Report copied\. Paste it to Nate\.$/, 2000), await bubble(page));
    const clip = await page.evaluate(() => navigator.clipboard.readText());
    const want = [/^AY-VEE UTOPIA · report/, /version α\d+\.\d+(\.\d+)?[a-z]?/, /embodiment bode · source song \(test one\.wav\)/, /WHAT HAPPENED\nc h f the light never came back/];
    c.is('the clipboard holds the report', want.every((re) => re.test(clip)), clip.split('\n').slice(2, 3).join(''));
    c.is('with the window it was in', where === 'pc' ? /window 1600×900 @1x/.test(clip) : /window 402×874 @3x/.test(clip), (/window .*x/.exec(clip) || [''])[0]);
    let before = page.files.length;
    await page.click('[data-tell=save]');
    let file = await caught(page, before);
    c.is('Save writes ayvee-report.txt', !!file && file.name === 'ayvee-report.txt' && want.every((re) => re.test(fs.readFileSync(file.path, 'utf8'))), file ? file.name : 'no file');
    const canShare = await page.evaluate(() => !!navigator.share);
    before = page.files.length;
    await page.click('[data-tell=share]');
    if (!canShare) {
      file = await caught(page, before);
      c.is('no share sheet here: Share saves the report', !!file && file.name === 'ayvee-report.txt');
    }
    await page.click('[data-tell=close]');
    c.is('Close puts the card away', !(await shown(page, '#tell')));
    return c.done();
  },
});

/* ---- 14 · the guide and the tour ---- */

line({
  id: 'guide.open',
  group: 'The guide and the tour',
  where: ['pc', 'phone'],
  press: 'The **?** button, and **Back to it**',
  should: 'The guide opens: where you stand with Pelvy, the tour as an index, and what each part of the picture means. Back to it closes it.',
  proof: 'the guide is on screen; the first line reads the level, Echoes, songs and minutes; the index has one line per tour step of this screen (11 on the computer, 7 on the phone); Back to it closes it',
  covers: ['#legendBtn@click', '#closeLegend@click'],
  run: async (T, where) => {
    const c = checks();
    const page = await T.open({ where, keep: you({ echo: 40, total: 240, level: 3, charges: 2 }) });
    await tool(page, '#legendBtn');
    c.is('the guide opens', await shown(page, '#legend'));
    c.is('it says where you stand', /^Level 3\. 240 Echoes gathered, 0 songs finished, 0 minutes in Utopia, 0 Focused Frequencies fired\./.test(await txt(page, '#youLine')), (await txt(page, '#youLine')).slice(0, 60));
    const n = await page.locator('#tindex [data-tstep]').count();
    c.is('the index has every step', n === (where === 'pc' ? 11 : 8), n + ' lines');
    await page.click('#closeLegend');
    c.is('Back to it closes it', !(await shown(page, '#legend')));
    return c.done();
  },
});
line({
  id: 'guide.index',
  group: 'The guide and the tour',
  where: ['pc', 'phone'],
  press: 'Every line of the tour index in the guide, one after the other',
  should: 'The guide steps aside, the control that line is about pulses, and the bubble names it.',
  proof: 'for every line: the guide is gone, a control that can be seen carries the pulse, and the bubble starts with that line\'s title',
  covers: ['tstep', '#legend@click'],
  run: async (T, where) => {
    const c = checks();
    const page = await T.open({ where });
    await tool(page, '#legendBtn');
    const n = await page.locator('#tindex [data-tstep]').count();
    for (let i = 0; i < n; i++) {
      if (!(await shown(page, '#legend'))) await tool(page, '#legendBtn');
      const head = (await txt(page, '#tindex [data-tstep="' + i + '"]')).replace(/^\d+/, '');
      await page.click('#tindex [data-tstep="' + i + '"]');
      const said = await bubble(page);
      const pulsing = await page.evaluate(() => {
        const el = document.querySelector('.pulse');
        if (!el) return 'nothing';
        const r = el.getBoundingClientRect();
        return r.width > 2 && r.height > 2 ? '#' + el.id : '#' + el.id + ' (not on screen)';
      });
      c.is(head, !(await shown(page, '#legend')) && said.startsWith(head + ': ') && /^#\w+$/.test(pulsing), pulsing);
      await page.keyboard.press('Escape');
    }
    return c.done();
  },
});
// walks the whole tour and checks every step points at something that is there
async function walkTour(page, c) {
  const first = await txt(page, '.tour-card .ts');
  const total = +first.split(' of ')[1];
  c.is('it starts at 1 of ' + total, /^1 of /.test(first), first);
  const seen = [];
  for (let i = 1; i <= total; i++) {
    await page.waitForTimeout(380);
    const s = await page.evaluate(() => {
      const spot = document.querySelector('.tour-spot').getBoundingClientRect();
      const card = document.querySelector('.tour-card').getBoundingClientRect();
      const inside = card.left >= 0 && card.top >= 0 && card.right <= innerWidth && card.bottom <= innerHeight;
      const overlap = !(card.right < spot.left || card.left > spot.right || card.bottom < spot.top || card.top > spot.bottom);
      return { step: document.querySelector('.tour-card .ts').textContent, head: document.querySelector('.tour-card .th').textContent, spot: spot.width > 8 && spot.height > 8, inside, overlap };
    });
    seen.push(s.head);
    c.is('step ' + i + ' (' + s.head + ')', s.step === i + ' of ' + total && s.spot && s.inside && !s.overlap, s.step + (s.inside ? '' : ', card off screen') + (s.overlap ? ', card over the thing it points at' : ''));
    const last = i === total;
    c.is('step ' + i + ' button', (await txt(page, '[data-tour=next]')) === (last ? 'done' : 'next'));
    await page.click('[data-tour=next]');
  }
  c.is('done ends it and says where it lives', (await page.locator('.tour-card').count()) === 0 && (await bubble(page)) === 'The tour lives under ? now.', await bubble(page));
  return seen;
}
line({
  id: 'tour.walk',
  group: 'The guide and the tour',
  where: ['pc', 'phone'],
  press: '**Take the tour** in the guide, then **next** to the end, **back**, **skip**, **Esc**',
  should: 'Every step lights the control it is about with its card beside it, on screen. back goes back, done ends it with a line, skip and Esc end it quietly. Panes that were slid away come back for the tour, and keys do nothing while it runs.',
  proof: 'every step: the spotlight has a size, the card is fully on screen and not over the thing it points at, the count reads "i of N"; done says "The tour lives under ? now."; back shows the step before; skip and Esc remove the card; a pane slid away beforehand is back; H during the tour hides nothing',
  covers: ['tourgo', 'tour:next', 'tour:back', 'tour:skip', 'key:escape'],
  run: async (T, where) => {
    const c = checks();
    const page = await T.open({ where });
    await page.click('#rail .slideBtn');
    await page.waitForTimeout(450);
    await tool(page, '#legendBtn');
    await page.click('[data-tourgo]');
    c.is('the guide steps aside', !(await shown(page, '#legend')));
    await page.waitForTimeout(450);
    c.is('the slid pane is back for the tour', !(await has(page, '#rail', 'slid')) && (await reachable(page, '#rail')));
    await page.keyboard.press('h');
    c.is('keys do nothing during the tour', !(await has(page, 'body', 'hud-off')));
    await walkTour(page, c);
    await tool(page, '#legendBtn');
    await page.click('[data-tourgo]');
    await page.click('[data-tour=next]');
    await page.click('[data-tour=next]');
    await page.click('[data-tour=back]');
    c.is('back goes back', /^2 of /.test(await txt(page, '.tour-card .ts')), await txt(page, '.tour-card .ts'));
    await page.waitForTimeout(2400);
    await page.click('[data-tour=skip]');
    c.is('skip ends it quietly', (await page.locator('.tour-card').count()) === 0 && (await bubble(page)) !== 'The tour lives under ? now.', await bubble(page));
    await tool(page, '#legendBtn');
    await page.click('[data-tourgo]');
    await page.keyboard.press('Escape');
    c.is('Esc ends it', (await page.locator('.tour-card').count()) === 0 && (await page.locator('.tour-spot').count()) === 0);
    return c.done();
  },
});
line({
  id: 'keys.escape',
  group: 'The guide and the tour',
  where: ['pc', 'phone'],
  press: 'The **Esc** key with panels and a card open',
  should: 'Everything that is open closes: Layers, the Lab, the sheets, the guide, Tell Nate, the ? card.',
  proof: 'with Layers open and then Tell Nate over it, Esc leaves neither; the same for the guide and the ? card',
  covers: [],
  run: async (T, where) => {
    const c = checks();
    const page = await T.open({ where });
    await tool(page, '#layersBtn');
    await page.evaluate(() => document.getElementById('tellBtn').click());
    await page.evaluate(() => document.getElementById('tell').classList.remove('hide'));
    await page.keyboard.press('Escape');
    c.is('Layers and Tell Nate close', !(await has(page, '#layersPanel', 'open')) && !(await shown(page, '#tell')));
    await tool(page, '#legendBtn');
    await page.keyboard.press('Escape');
    c.is('the guide closes', !(await shown(page, '#legend')));
    if (where === 'phone') await page.click('#moreBtn');
    await page.click('[data-help=sens]');
    await page.keyboard.press('Escape');
    c.is('the ? card closes', !(await shown(page, '#helpCard')));
    return c.done();
  },
});

/* ---- 15 · slide-away ---- */

const PANES = { title: 'the title', meter: 'the meter', rail: 'the embodiments', track: 'Songs', transport: 'the player', pelvy: 'Pelvy', tools: 'the buttons plate' };
for (const [id, name] of Object.entries(PANES)) {
  const onPhone = ['title', 'meter', 'rail'].includes(id);
  line({
    id: 'slide.' + id,
    group: 'Slide-away',
    where: onPhone ? ['pc', 'phone'] : ['pc'],
    press: 'The small arrow on ' + name + ', then the tab it leaves at the edge',
    should: 'The pane slides off to its edge and a tab stays there; the tab slides it back. It is remembered for the next visit.',
    proof: 'the arrow can be pressed; after it the pane is off screen and a tab is at the edge and can be pressed; after a reload the pane is still away; the tab brings it back to where it can be pressed, and the tab is gone',
    covers: ['slideBtn:' + id + '@click', 'slideTab:' + id + '@click'],
    run: async (T, where) => {
      const c = checks();
      const page = await T.open({ where });
      const arrow = '#' + id + ' > .slideBtn';
      const tab = '.slideTab[data-slide=' + id + ']';
      c.is('the arrow can be pressed', await reachable(page, arrow));
      await page.click(arrow);
      await page.waitForTimeout(500);
      const off = await page.evaluate((i) => {
        const r = document.getElementById(i).getBoundingClientRect();
        return r.right <= 1 || r.left >= innerWidth - 1 || r.top >= innerHeight - 1 || r.bottom <= 1;
      }, id);
      c.is('the pane is off screen', off && (await has(page, '#' + id, 'slid')));
      c.is('a tab is left and can be pressed', await reachable(page, tab));
      await page.reload();
      await page.waitForFunction(() => window.AV && document.querySelector('.slideTab'), null, { polling: 50, timeout: 4000 }).catch(() => {});
      c.is('remembered after a reload', (await has(page, '#' + id, 'slid')) && (await page.locator(tab).count()) === 1);
      await page.click(tab);
      await page.waitForTimeout(500);
      c.is('the tab brings it back', !(await has(page, '#' + id, 'slid')) && (await reachable(page, arrow)) && (await page.locator(tab).count()) === 0);
      return c.done();
    },
  });
}
line({
  id: 'slide.phoneDock',
  group: 'Slide-away',
  where: ['phone'],
  press: 'Looks for a slide arrow on the dock (the player, Pelvy, Songs, More)',
  should: 'On the phone only the title, the meter and the row of embodiments slide away; the dock stays, so it carries no arrow that could be pressed.',
  proof: 'no slide arrow on the player, Pelvy, Songs or the More sheet can be reached on the phone',
  covers: [],
  run: async (T, where) => {
    const c = checks();
    const page = await T.open({ where });
    const found = [];
    for (const id of ['transport', 'pelvy']) if (await reachable(page, '#' + id + ' > .slideBtn')) found.push(id);
    await page.click('#trackBtn');
    if (await reachable(page, '#track > .slideBtn')) found.push('track');
    await page.click('#moreBtn');
    if (await reachable(page, '#tools > .slideBtn')) found.push('tools');
    c.is('no arrow on the dock', !found.length, found.length ? 'an arrow that slides nothing on: ' + found.join(', ') : 'none');
    return c.done();
  },
});

/* ---- 16 · the stage, the keys, the window, the phone's drawers ---- */

for (const shape of SHAPES) {
  const what = { bode: 'a burst of colour where it lands', tyde: 'a splash where it lands', hinge: 'the hinge under it knocked open', cyn: 'Wren flying to it' }[shape];
  line({
    id: 'stage.tap.' + shape,
    group: 'The stage',
    press: 'A tap on the stage (' + NAMES[shape] + ')',
    should: 'The stage answers: ' + what + '. A tap also earns half an Echo.',
    proof: 'with the made-up song: half a second after five taps the picture differs from the same moment with no taps; two taps add one Echo',
    covers: shape === 'bode' ? ['#c@pointerdown'] : [],
    run: async (T) => {
      const c = checks();
      const pics = [];
      for (const tapped of [false, true]) {
        const page = await loud(T, shape);
        await pass(page, 1500);
        const before = await txt(page, '#echoV');
        if (tapped) for (const [u, v] of TAPS) await page.mouse.click(1200 * u, 700 * v);
        if (tapped) c.is('taps earn', parseInt(await txt(page, '#echoV')) === parseInt(before) + 2, before + ' to ' + (await txt(page, '#echoV')));
        await pass(page, 500);
        pics.push(await picture(page));
      }
      const d = apart(pics[0], pics[1]);
      c.is('the stage answers', d > 0.02, d.toFixed(2) + ' apart');
      return c.done();
    },
  });
}
line({
  id: 'stage.tapCap',
  group: 'The stage',
  press: 'Taps the stage a hundred times',
  should: 'Taps earn a little, capped at thirty Echoes a visit.',
  proof: 'after a hundred taps the count reads 30/100, not 50',
  covers: [],
  run: async (T) => {
    const c = checks();
    const page = await T.open({});
    for (let i = 0; i < 100; i++) await page.mouse.click(700 + (i % 10) * 20, 400);
    c.is('capped at thirty', (await txt(page, '#echoV')) === '30/100', await txt(page, '#echoV'));
    return c.done();
  },
});
line({
  id: 'keys.capitals',
  group: 'The keys',
  press: 'Every key with Shift or Caps Lock on: C, F, S, I, D, H, R, M',
  should: 'Capitals do the same as small letters.',
  proof: 'H hides and shows; D opens Layers; I immerses and comes back; R and M answer in the bubble; F fires one stack, S the rest; C starts a clip and C saves it',
  covers: ['window@keydown'],
  run: async (T) => {
    const c = checks();
    const page = await T.open({ keep: you({ charges: 3 }) });
    await page.keyboard.press('H');
    c.is('H hides', await has(page, 'body', 'hud-off'));
    await page.keyboard.press('H');
    await page.keyboard.press('D');
    c.is('D opens Layers', await has(page, '#layersPanel', 'open'));
    await page.keyboard.press('I');
    await page.waitForTimeout(300);
    c.is('I immerses', await has(page, 'body', 'immersed'));
    await page.keyboard.press('I');
    await page.waitForTimeout(300);
    await page.keyboard.press('M');
    c.is('M answers', (await bubble(page)) === 'Record first, then Mark.', await bubble(page));
    await page.keyboard.press('R');
    c.is('R answers', (await bubble(page)) === 'Play something first, then Record.', await bubble(page));
    await page.keyboard.press('F');
    c.is('F fires one', (await pips(page)) === 2, (await pips(page)) + ' left');
    const p2 = await T.open({ keep: you({ charges: 3 }) });
    await p2.keyboard.press('S');
    c.is('S fires everything', (await pips(p2)) === 0, (await pips(p2)) + ' left');
    await p2.keyboard.press('C');
    await p2.waitForTimeout(1500);
    c.is('C starts a clip', await has(p2, 'body', 'clipping'));
    await p2.keyboard.press('C');
    c.is('C saves it', !!(await caught(p2, 0)));
    return c.done();
  },
});
line({
  id: 'keys.withCtrl',
  group: 'The keys',
  press: 'Ctrl+H, Alt+F, Ctrl+C (the browser\'s own shortcuts)',
  should: 'The app leaves them alone: nothing hides, fires or records.',
  proof: 'after Ctrl+H, Alt+F and Ctrl+C the HUD is on, Pelvy still holds his stacks and no clip is running',
  covers: [],
  run: async (T) => {
    const c = checks();
    const page = await T.open({ keep: you({ charges: 2 }) });
    await page.keyboard.press('Control+h');
    await page.keyboard.press('Alt+f');
    await page.keyboard.press('Control+c');
    await page.waitForTimeout(200);
    c.is('nothing happened', !(await has(page, 'body', 'hud-off')) && (await pips(page)) === 2 && !(await has(page, 'body', 'clipping')));
    return c.done();
  },
});
line({
  id: 'window.resize',
  group: 'The window',
  press: 'Resizes the window, down to a narrow one and back',
  should: 'The stage refits, the tab of a pane that was slid away stays on screen, and under the width of a computer layout the phone layout takes over.',
  proof: 'the stage is as wide as the window after each resize; the tab of the slid meter is inside the window; narrow, the Songs and More buttons appear; wide again, they are gone and the meter is still away',
  covers: ['window@resize'],
  run: async (T) => {
    const c = checks();
    const page = await T.open({});
    await page.click('#meter > .slideBtn');
    await page.setViewportSize({ width: 1300, height: 800 });
    await page.waitForTimeout(400);
    c.is('the stage refits', (await page.evaluate(() => document.getElementById('c').width)) === 1300);
    const tabIn = await page.evaluate(() => {
      const r = document.querySelector('.slideTab[data-slide=meter]').getBoundingClientRect();
      return r.left >= 0 && r.top >= 0 && r.right <= innerWidth && r.bottom <= innerHeight;
    });
    c.is('the tab stays in the window', tabIn);
    await page.setViewportSize({ width: 500, height: 900 });
    await page.waitForTimeout(400);
    c.is('narrow: the phone layout', (await shown(page, '#trackBtn')) && (await shown(page, '#moreBtn')) && (await page.evaluate(() => document.getElementById('c').width)) === 500);
    await page.setViewportSize({ width: 1600, height: 900 });
    await page.waitForTimeout(400);
    c.is('wide again: the computer layout, the meter still away', !(await shown(page, '#trackBtn')) && (await has(page, '#meter', 'slid')));
    return c.done();
  },
});
line({
  id: 'window.kept',
  group: 'The window',
  where: ['pc', 'phone'],
  press: 'Closes the page and comes back',
  should: 'What was earned is still there: the Echoes, the level, the stacks.',
  proof: 'after earning one Echo and a reload the count reads 1/100; a visit that held two stacks at level 3 comes back with two pips and Lv 3',
  covers: [],
  run: async (T, where) => {
    const c = checks();
    const page = await T.open({ where, keep: you({ level: 3, charges: 2 }) });
    await page.click('#shapes [data-shape=tyde]');
    await page.reload();
    await page.waitForFunction(() => window.AV, null, { polling: 50 });
    c.is('kept', (await txt(page, '#echoV')) === '1/100' && (await txt(page, '#lvl')) === 'Lv 3' && (await pips(page)) === 2, (await txt(page, '#echoV')) + ' ' + (await txt(page, '#lvl')) + ' ' + (await pips(page)) + ' pips');
    return c.done();
  },
});
line({
  id: 'phone.songs',
  group: "The phone's drawers",
  where: ['phone'],
  press: 'The **Songs** button on the dock, and **Close** in the sheet',
  should: 'The Songs sheet opens over the dock, everything in it within reach; Close, the button again, or a tap on the stage puts it away.',
  proof: 'the sheet is open and Pick songs, the link box, Clear queue and Close can all be reached; Close shuts it; the button opens and shuts it; a tap on the stage shuts it',
  covers: ['#trackBtn@click', '#closeTrack@click'],
  run: async (T, where) => {
    const c = checks();
    const page = await T.open({ where });
    await page.click('#trackBtn');
    c.is('it opens', await has(page, '#track', 'open'));
    await page.click('#linkBtn');
    for (const s of ['#track .filebtn', '#linkBtn', '#url', '#loadUrl', '#stopTrack', '#closeTrack', '#volP', '#repeatP']) c.is(s + ' can be reached', await reachable(page, s));
    await page.click('#closeTrack');
    c.is('Close shuts it', !(await has(page, '#track', 'open')));
    await page.click('#trackBtn');
    await page.click('#trackBtn');
    c.is('the button shuts it too', !(await has(page, '#track', 'open')));
    await page.click('#trackBtn');
    await page.mouse.click(201, 120);
    c.is('a tap on the stage shuts it', !(await has(page, '#track', 'open')));
    return c.done();
  },
});
line({
  id: 'phone.more',
  group: "The phone's drawers",
  where: ['phone'],
  press: 'The four strings (**Ears**) at the top right, then **Lab**; and **Layers** above the embodiments',
  should: 'The ears open with everything about what it hears within reach. The Lab and Layers open as their own sheet, one sheet at a time.',
  proof: 'Auto, Sensitivity, Mic, Freeze and the Lab can be reached; the Lab opens and the ears shut; Layers opens and the Lab shuts; a tap on the stage shuts the sheet',
  covers: ['#moreBtn@click'],
  run: async (T, where) => {
    const c = checks();
    const page = await T.open({ where });
    await page.click('#moreBtn');
    c.is('it opens', await has(page, '#meter', 'open'));
    const out = [];
    for (const s of ['#mode', '#sens', '#mic', '#pause', '#labBtn']) if (!(await reachable(page, s))) out.push(s);
    c.is('every control can be reached', !out.length, out.join(' ') || 'all 5');
    await page.click('#labBtn');
    c.is('the Lab takes its place', (await has(page, '#lab', 'open')) && !(await has(page, '#meter', 'open')) && (await reachable(page, '#closeLab')));
    await page.click('#layersBtn');
    c.is('Layers takes its place', (await has(page, '#layersPanel', 'open')) && !(await has(page, '#lab', 'open')) && (await reachable(page, '#closeLayers')));
    await page.mouse.click(201, 120);
    c.is('a tap on the stage shuts it', !(await has(page, '#layersPanel', 'open')));
    return c.done();
  },
});

/* ---- α1.4 · the new hands ---- */
line({
  id: 'queue.rows',
  group: 'The songs',
  where: ['pc', 'phone'],
  press: 'A song row in the queue; its **x**; its grip, dragged',
  should: 'Every song is a row. Tapping a row plays that song; tapping the one playing pauses it. The x drops a song; the grip drags it to a new place, and what is playing keeps playing.',
  proof: 'three songs queued: tapping row 3 plays test three; tapping it again pauses; x on row 2 leaves two songs with the playing one still playing; dragging row 1 onto row 2 swaps them and the playing song is still marked',
  covers: ['#queue@click', '#queue@pointerdown', '#queue@pointermove', '#queue@pointerup', '#queue@pointercancel', '#queue@scroll'],
  run: async (T, where) => {
    const c = checks();
    const page = await T.open({ where });
    await playing(page, ['test one.wav', 'test two.wav', 'test three.wav']);
    if (where === 'phone') await page.click('#trackBtn');
    c.is('every song is a row, names cleaned', (await page.locator('#queue .qrow').count()) === 3 && (await txt(page, '#queue .qrow[data-qi="2"] .qt')) === 'test three', await txt(page, '#queue'));
    await page.click('#queue .qrow[data-qi="2"] .qt');
    await page.waitForTimeout(500);
    c.is('a tap plays that song', (await ttl(page, '#nowBar')) === 'test three.wav' && !(await player(page)).paused, await ttl(page, '#nowBar'));
    await page.click('#queue .qrow[data-qi="2"] .qt');
    await page.waitForTimeout(300);
    c.is('a tap on the one playing pauses it', (await player(page)).paused);
    await page.click('#queue .qrow[data-qi="2"] .qt');
    await page.click('#queue .qrow[data-qi="1"] .qx');
    await page.waitForTimeout(300);
    c.is('x drops it; the playing one plays on', (await qtxt(page)) === '1. test one.wav2. test three.wav' && !(await player(page)).paused && (await ttl(page, '#nowBar')) === 'test three.wav', await qtxt(page));
    const g = await page.locator('#queue .qrow[data-qi="0"] .qg').boundingBox();
    const r2 = await page.locator('#queue .qrow[data-qi="1"]').boundingBox();
    await page.mouse.move(g.x + g.width / 2, g.y + g.height / 2);
    await page.mouse.down();
    await page.mouse.move(g.x + g.width / 2, r2.y + r2.height / 2, { steps: 6 });
    await page.mouse.up();
    await page.waitForTimeout(300);
    c.is('the grip drags it; the playing one stays marked', (await qtxt(page)) === '1. test three.wav2. test one.wav' && (await page.locator('#queue .qrow.cur[data-qi="0"]').count()) === 1, await qtxt(page));
    return c.done();
  },
});
line({
  id: 'clip.length',
  group: 'Clip',
  press: '**1x**, **2x** or **3x** beside Clip',
  should: 'Picks how long a clip runs: one, two or three minutes. The pick lights, the bubble says it, and the browser remembers it.',
  proof: 'each press lights only its own button and the bubble reads "Clip length: N minute(s)."; after a reload 3x is still lit; a clip started at 2x says "up to 2 minutes"',
  covers: ['#clip1@click', '#clip2@click', '#clip3@click'],
  run: async (T) => {
    const c = checks();
    const page = await T.open({});
    for (const n of [2, 3, 1, 3]) {
      await page.click('#tools .clen button[data-len="' + n + '"]');
      const lit = await page.evaluate(() => [...document.querySelectorAll('#tools .clen button.on')].map((b) => b.dataset.len).join(''));
      c.is(n + 'x lights alone and is said', lit === String(n) && (await bubbleSays(page, new RegExp('^Clip length: ' + n + ' minutes?\\.$'), 1500)), lit + ' / ' + (await bubble(page)));
    }
    await page.reload();
    await page.waitForFunction(() => window.AV && document.querySelector('.slideBtn'));
    c.is('remembered after a reload', (await page.evaluate(() => document.querySelector('#tools .clen button.on').dataset.len)) === '3');
    await page.click('#tools .clen button[data-len="2"]');
    await playing(page);
    await page.click('#clipBtn');
    c.is('a clip at 2x says two minutes', await bubbleSays(page, /up to 2 minutes/, 3000), await bubble(page));
    await page.click('#clipBtn');
    return c.done();
  },
  hands: 'a real 2 and 3 minute clip on his PC, saved and opened in Edits (about 450 and 675 MB in memory while it records)',
});
line({
  id: 'hud.touchable',
  group: 'Immerse and Hide',
  where: ['pc', 'phone'],
  press: 'Looks at everything in the HUD that looks like it can be pressed',
  should: 'Nothing looks touchable that is not (23 Nov 2026, "ui ocd purposes"): whatever wears the hand cursor or a lens is a control that does something.',
  proof: 'every element of the HUD whose cursor is the hand is a button, a slider, a file picker, a queue row or the crescent seek; the meter word, the song name, the Echoes and the title words are not',
  covers: [],
  run: async (T, where) => {
    const c = checks();
    const page = await T.open({ where });
    await playing(page);
    if (where === 'phone') await page.click('#trackBtn');
    const bad = await page.evaluate(() => {
      const out = [];
      for (const el of document.querySelectorAll('#hud *')) {
        const r = el.getBoundingClientRect();
        if (r.width < 2 || r.height < 2 || getComputedStyle(el).cursor !== 'pointer') continue;
        if (el.closest('button, input, label, .qrow, #miniSeek, #pips')) continue;
        out.push((el.id ? '#' + el.id : el.tagName.toLowerCase() + '.' + el.className));
      }
      for (const s of ['#meterState', '#nowBar', '#nowTime', '#echoV', '#title .wm']) {
        const e = document.querySelector(s);
        if (e && getComputedStyle(e).cursor === 'pointer') out.push(s);
      }
      return out;
    });
    c.is('nothing pretends to be a control', !bad.length, bad.join(' ') || 'none');
    return c.done();
  },
});
line({
  id: 'pelvy.catch',
  group: 'Pelvy and the Echoes',
  press: 'Nothing: listens to a song with a beat on Bod-e',
  should: 'Pelvy roams the room on his own. Her bursts throw Echoes (at most one every three seconds); he darts after them, and each one he catches is worth a fifth of an Echo.',
  proof: 'on the stepped clock over 40 s: Echoes were thrown, he caught some, the count grew by a fifth for each catch on top of the time earnings, and he did not stay parked at her side',
  covers: [],
  run: async (T) => {
    const c = checks();
    const page = await loud(T, 'bode');
    const e0 = await page.evaluate(() => window.AVpeek.echo());
    const spots = [];
    for (let i = 0; i < 8; i++) {
      await pass(page, 5000);
      spots.push(await page.evaluate(() => window.AVpeek.pelvyAt()));
    }
    const caught = await page.evaluate(() => window.AVpeek.caught());
    const e1 = await page.evaluate(() => window.AVpeek.echo());
    c.is('he catches Echoes', caught >= 2, caught + ' caught');
    c.is('each catch is a fifth of an Echo, on top of time', Math.abs(e1 - e0 - (caught * 0.2 + 1)) < 0.21, (e1 - e0).toFixed(2) + ' gained for ' + caught + ' caught');
    let far = 0;
    for (let i = 1; i < spots.length; i++) far = Math.max(far, Math.hypot(spots[i][0] - spots[0][0], spots[i][1] - spots[0][1]));
    c.is('he roams, not parked', far > 120, 'moved up to ' + far.toFixed(0) + ' px');
    return c.done();
  },
});
line({
  id: 'focus.release',
  group: 'Focus',
  press: '**F** with a stack held',
  should: 'On release every veil of the HUD goes acute and dark and only Focus burns; when she reforms, the veils ease back.',
  proof: 'during the Focus the body carries release, the panes other than Pelvy are dimmed, the curved edge of the title has moved inward; after the Focus it is gone and the edge is back',
  covers: [],
  run: async (T) => {
    const c = checks();
    const page = await loud(T, 'bode', { keep: you({ charges: 1 }) });
    const edge = () => page.evaluate(() => document.querySelector('#title .vsvg .edge').getAttribute('d'));
    const before = await edge();
    await page.keyboard.press('f');
    await pass(page, 2500);
    const op = await page.evaluate(() => getComputedStyle(document.getElementById('title')).opacity);
    c.is('it is released', await has(page, 'body', 'release'));
    c.is('the HUD goes dark, Focus burns', parseFloat(op) < 0.5, 'title opacity ' + op);
    c.is('the curve goes acute', (await edge()) !== before);
    await pass(page, 40000);
    c.is('after it, it eases back', !(await has(page, 'body', 'release')));
    return c.done();
  },
});

export const LINES = L;
export { bright };
