# Ay-Vee changelog

## α1.5c · 24 Nov 2026 · the clip's sound, from a file on disk
Base: α1.5b. Nate's probe, opened from the file on his PC: "worklet module refused ... blob:null", the old reader:
1104 holes, 11.3 s lost in a 44 s clip.
- A page opened from disk has no origin of its own and refuses its own blob: address, so α1.5b's audio-thread reader
  never started there. The worker now loads from a data: address (blob: as the second try). Tested opened from disk:
  "data: loaded", 9.9 s of sound for 9.95 s of picture, 20 bass hits all 0.500 s apart.
- The old reader (used only where the worker can't start) keeps its time now: a deep queue (maxBufferSize 1000) and
  every hole filled with silence counted in whole pieces. Forced onto it: 9.6 s of sound for 9.85 s of picture.
- Checks NOT run on α1.5c (his call, to save usage): the whole function check and the frame check. Only Clip code and
  the version changed against α1.5b, which passed them.

## α1.5b · 23 Nov 2026 · the clip's sound
Base: α1.5a. Nate: "I hear scratching and it speeds up when it scratches ... I hear it at the beginning".
- **Owner, measured:** the clip's sound was read on the page's own thread, the one that draws her. Whenever a frame
  ran long (the clip starting up, a hit, a Focus), the browser dropped the sound that piled up meanwhile, and the
  encoder glued the rest together: a click at every seam, and the song running ahead of the picture. His 22hrs clip:
  172.3 s of picture, 162.0 s of sound. The test machine: 9.9 s of picture, 4.6 s of sound, 243 holes.
- **Fix:** the sound is read on the audio thread (an AudioWorklet), which never drops anything, and every piece is
  stamped by its own sample count, so it always lasts as long as the song. Where a browser can't, the old way stays.
- **Proof:** the same 10 s clip with a 3-stack Focus in it: 9.7 s of sound against 9.8 s of picture, 19 bass hits
  every one 0.500 s apart (before: 3 hits, 1.35 to 1.58 s apart).
- Not touched: the picture, the encoder settings, Mic clips (silent, as ruled), everything outside Clip.
- Checks: every-function check, 164 runs, 147 PASS, 13 NEEDS HIS HANDS, 4 FAIL, each re-run: `lab.panel` read the Lab
  mid-birth on a loaded machine; the Lab and Layers lines now wait 0.6 s for the hologram to settle (a test change,
  named), then PASS alone and under load, twice. `lab.record` ×2 and `thread.key` are the known timing lines on the
  2-core test machine (as in α1.5a). Every Clip line as in α1.5a: 4 PASS, 3 his hands.

## α1.5a · 23 Nov 2026 · the studio HUD (computer)
Base: α1.5a round 4 (the tilted crescent). Concept agreed in a fresh chat ("that's exactly it"), sketched on the real
build at his window (1904×901) with a clip, his yes on the card, then built in one pass.
- **The veils are hardware, bolted to the window's own corners** at any size: the title and the embodiments top left,
  Ears top right, the screen tools bottom right. No more dead bands at the sides (at 1904×901 they were ~150 px each).
  Each veil still scales with the window. The stage, the disc and the floating bottom stay centred on it.
- **Veils are built from shadow:** the dark side of the curve, blurred so it falls off into the room, carried past
  the window's edges so nothing lightens where it meets them. Only the lit edge (structure blue) and the pins carry
  light. The flat fill is gone. The shade is redrawn only when the veil's shape changes, not every frame.
- **Touch light:** no lens rims, no plates, just ink. Every control has its own colour: off is that colour dimmed
  (no glow, smaller), lit under the hand / for 8 s after use / while running is the same colour lit and grown.
  The single grey-violet `--unlit` is gone; nothing in the HUD is plain white or grey (ink check: 0 in four states).
- **The colour code:** the ears in their string colours, the lab and Clip in record red, playback in the live
  colour, the embodiments in their own (Bod-e green, Gali cyan, Hingez violet, Wren orange; the asleep ones in
  structure blue), and his yes on the rest: Auto teal, Thread gold, Mic pink, Tab sky, Freeze ice, Immerse
  sapphire, ? baby blue, Tell Nate citrine.
- **Holograms:** Layers, the Lab and the Hingez note have no veil, frame or box on the computer. They are born out
  of what called them (0.55 s) on a dark aura and pulled back into it on close (0.4 s after-image; the panel itself
  shuts at once). The Hingez note moved 34 out: it sat on the embodiments curve (in round 4 too).
- **The picked embodiment keeps its plate** (his ruling): the chevron rim lit in her own colour, dark inside.
  The WIP tag is ink, not a box. The message bubble is ink on its aura, in the live colour.
- **The disc's slide arrow moved off the seek arc** (found by line `songs.seekBar`, failing alone on round 4 too): it sat
  on the arc's middle, so a click there slid the disc away instead of seeking. It sits in the disc's bottom row now,
  after the volume, inside the circle.
- **The shade is its own layer:** sharing an SVG with the moving current made the browser blur it again on every
  repaint (8% of the frame at 1904×901 on the test machine). On its own layer it costs nothing measurable.
- **Veils refit at once when the embodiment changes** (Hingez's wider plate poked through the curve for up to 2 s).
- **Pelvy's trail keeps its time** (he saw a long straight line behind Pelvy): it kept twelve frames, so on a slow
  frame it drew his path as long straight chords in a fixed lime. Now a quarter second of his path, in his own
  colour, judged by speed per second; a jump clears it instead of being drawn.
- Not touched: the phone (pixel-identical HUD), the floating bottom beyond the colour code (the playing row keeps
  its soft box, his call), the crescent and its tilt, fitHeight, the title's long horn, the shrink and grow sizes,
  the current and the spark, the release, every embodiment.
- Checks (test machine: 2 cores, software drawing; his card is the truth for frames):
  veil check PASS at 1920×1080, 1904×901, 1729×927 × default, Layers, Lab, Hingez · ink check 0 near-neutral ink in
  four states · hologram check PASS · phone HUD pixel-identical to round 4 · every-function check on the shipped
  build: 164 runs, 148 PASS, 13 NEEDS HIS HANDS, 3 FAIL, every FAIL re-run alone: `lab.panel` PASS twice;
  `lab.record` the known timing line on this machine (8.7 of 10 steps a second, passed alone earlier; his hands, as
  in α1.5); `thread.button` (pc) a timing window: the button lets go 200-340 ms after a seek against a 400 ms limit
  (round 4: 60-300 ms), the thread code untouched, named for his hands · round 4 as received for comparison: 164 runs,
  141 PASS, 12 NEEDS HIS HANDS, 11 FAIL on a shared machine · frames at 1904×901, both orders: Bod-e loud 14.7 vs 15.0
  (noise), 3-stack Focus 13.6 vs 12.3 (faster).
- Tools: `veil_check.mjs` (veils against the window's edges, holograms as free things, ink room instead of lens
  padding), `ink_check.mjs`, `holo_check.mjs`, `phone_same.mjs`.

## α1.5 · 23 Nov 2026 · VeilAcute CurVessels, Patch 1.5: They Come Alive
Base: α1.4. Three sketch rounds, recorded from the real build, before anything was checked.
- **Bod-e's body moves with the song** (her frames and her insides together): the bass throbs her, the synths ripple her shape. Her reactions live in her body now: on a build both frames squeeze narrow and stretch tall; on the drop she crumples, then bursts out, overshoots and settles (1.1 s); when the song stops she freezes and dims, and exhales when it comes back; on a held note after a hit she thinks of letting go: she fades see-through into the room, holds, snaps back, and the snap reverberates as three echo frames (2.4 s, rare: 12 to 20 s apart). Her Focus is untouched.
- **Pelvy comes alive.** The tremble is gone: he warms toward the colour of whoever is on stage as he fills, moves faster and bouncier, and at three stacks hops at her (PLEASE PLEASE PLEASE). His plate hops instead of trembling. On Focus he charges (the only time he is still), rushes in and goes inside: Bod-e's core for the whole Focus, giving rings out of him (harder per stack, beams at three); the gap in Hingez; Wren for a second, then she cascades.
- **Wren all around.** On Focus, little wrens are let out over the whole screen (14 / 32 / 70 by stacks), swooping and looping, cinders fly off them, and from two stacks the embers that reach the edges of the screen stick there and smoulder about 8 s. Her own movement untouched.
- **The thread.** Hold Thread (by Auto) or T while the element woven through the song plays. In a song file the thread is the stretch held, on every play; on a tab or the mic, the same notes in the same shape (strict). While it plays Bod-e calms, and a seam runs through the room in depth, behind her, in her colour, layered with what crosses it. Kept per song in this browser (ayvee.threads).
- **Gali:** her cannonball on the drop. Her other reactions, her look and Pelvy's Focus on her wait for her redesign (1.6); she keeps one stack per Focus until then.
- **Every stack counts** on Hingez and Wren too (S spends them all).
- **Hingez is flagged as still being made:** a glowing tag on his card (WIP on the phone, under his name), a note beside his card when he is picked, a line in the guide.
- **PC fit:** the disc lifted 30 px (its lowest row 46 px off the bottom, was 16), Clear queue clear of the queue's arrow, the Ears blade 40 px wider so the sens ? sits inside a 1920 window.
- Bubble copy changed: "Pelvy is full and can't sit still. F gives one, S gives it all." (was "...He is trembling to give it back...").
- The moments, heard on 22hrs played through: the build and drop at 0:12 and the bridge (1:59, 2:05), a drop at 0:18, the held note twice (0:13, 0:41), the hush at the end (2:44).
- Checks: 164 runs, 149 PASS, 15 NEEDS HIS HANDS, 0 FAIL (four lines failed on a shared machine and were re-run alone: two passed, lab.record is timing on the two-core test machine and needs his hands).


## α1.4 · 23 Nov 2026 · the Eclipse HUD
- New look from what Ay-Vee is now (VeilAcute CurVessels): blades of veil with one curved edge ending in pinned points, lens buttons, the song in a dark disc eclipsed by a crescent of light whose arc is the seek. Live colour = whoever is on stage.
- Motion with the song: curves bow with the bass, sway with the synths, a pulse runs the edges with the voice, pins glint with the highs. Release (Focus): everything goes acute and dark, only Focus burns. Reduced motion respected.
- One home for the song: queue beside the disc (PC) / opening from the disc (phone); every row taps to play, x drops, grip drags; names cleaned; Link box behind a Link button; the debug status line and the second seek line are gone.
- Grouped by purpose: Ay-Vee in Utopia (? and Tell Nate), Embodiments + Layers, Ears (meter as strings, Auto, Sensitivity, Mic, Tab, Freeze, Lab), the song, Pelvy + Focus, the screen (Clip, Immerse). Hide button removed (H still works).
- Clip 1x / 2x / 3x (1-3 minutes), PC only.
- Bod-e: the glow behind her removed; wall lamps focused and edged in Focus.
- Pelvy roams the room, chases and catches the Echoes her bursts throw (0.2 each), rushes in on Focus; time earns 1 Echo / 30 s (was 15).
- Early lore of Ay-Vee in a comment at the top of the file.
- Checks: 159 runs, 146 PASS, 13 NEEDS HIS HANDS, 0 FAIL (3 timing lines failed on a shared machine, passed alone).


## α1.3.2 · 22 Nov 2026
Base: α1.3.1b. The first α1.3.2 (16-17 Nov) and Grok's α1.4 were rolled back by Nate's call.

- Bod-e's Focus unspools: body to room over 3.5 s, back over 6 s, from one value (`bodePhases`). The bloom is her colour and adds only what the wipe takes away, so it never runs to white (0.00% plain white on every Focus still).
- Bod-e's points: crisp spark heads; the points near her wall lunge on hits (5% against 1.8%).
- Pelvy: a lantern friend (core, blue shine, three rings for his stacks, motes he gathers, trembles when full) and her clean reflection on dark water a beat late. He catches only her, so the floor lines no longer double. His layer is full size.
- Clip: 1920×1080, up to 60 fps, 30 Mbps, H.264 on the graphics card via WebCodecs, AAC (or Opus) sound, MP4 via mp4-muxer 5.2.2 (MIT, inline). The old recorder takes over where the encoder is missing. The plate answers at once; the encoder is asked a few seconds after load.
- Carried over from the first α1.3.2: Auto follows the song's own arc, Sensitivity by Auto, the wall lights as lamps on the walls (every third one big, his note), her middle light with a core.
- Gali and Wren: back to α1.3.1b.
- Tools: `brightRGB` in lib.mjs (bright() counted the alpha channel); the Clip lines check the 1920×1080 size; `tools/probe/capture.py` records the build frame by frame.

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
