# Ay-Vee Utopia · changelog

## α1.3.2a · 17 Nov 2026
Base: α1.3.2. A lettered fix: Wren, from his answers on the sheet.

- Wren's body 1.75 times wider (far 0.028, near 0.07 of the window's height), his light on the floor 3.2 (was 2.2). His pick A.
- The cold light on his wall is a small lamp: same place and colour, a blue core, a tight glow, a falloff that ends.
  It was an edgeless glow a third of the window wide.
- His embers are gold, then orange, then red, drawn over the floor instead of added to it (added, they piled up into white dots).
- tools: function list unchanged (111 lines).

## α1.3.2 · 16 Nov 2026
Base: α1.3.1b. See CHANGE-NOTE.md for the full note.

- Bod-e's light is set per second (LK): the same picture on a slow and a fast machine, reference 20 fps. The Focus
  no longer runs to white (middle of the frame plain white at a 60 pace: 40-50% before, 0.00-0.01% after).
- Auto follows the song's own arc (now against the loudest so far) instead of adding up the four bands.
- Sensitivity sits by Auto: bottom bar on the computer, the row under Auto in More on the phone.
- Bod-e: wall lights small and on the walls; everyday strikes on her outline, lesser magenta rings, a middle light
  with a core; Focus without a white bloom, 3 / 4 / 5 magenta rings by stacks.
- Gali: small far lamps with light paths down the water, troughs in shadow, sea-flowers lying on the water.
- Wren: a faceted cinder body, landed cinders stay as cooling embers, gold floor lines, floor rings, wider floor light.
- Clip: 28 Mbps, faint grain, MP4 with AAC asked for first, the bubble says what was made.
- tools: Sensitivity's and Clip's lines updated, new line tools.autoArc, stand-in song "arc", probe scripts, the Auto simulation.

## α1.3.1b · 15-16 Nov 2026
Base: α1.3.1 as mended on 8-9 Oct (the build in this folder before tonight). The live site had never received
those mends: GitHub held the build from before 8 Oct, so the Clip button, dead links and Wren's floor light
were broken live until this folder goes up.

- Tab clips carry the tab's sound (his 9 Oct "Go"). A recorder keeps one sound track, so a clip has the tab's
  sound or the song's, never both. Mic clips stay silent, as ruled.
- A frozen stage refuses to start a clip ("Unfreeze first") instead of saving an empty file.
- The version reads α1.3.1b on the title, the meta tag, the top bar and in reports.
- tools/functions.mjs: the Lab record line accepted only "α1.3.1"; it now accepts a lettered re-ship.

Checks: the every-function check on α1.3.1b, 151 runs: 148 the same as α1.3.1, 3 "broken since" = the
version-pinned Lab record lines; re-run after the test fix: 3 PASS. 0 FAIL in the end.
Needs his hands: a clip with Tab on (the song in it once, in sync).
What is not in it: the clip bitrate, the Focus whiteout, the clip's Opus sound (next Ay-Vee session).

## α1.3.1 · 8-9 Oct 2026
See CHANGE-NOTE.md.
