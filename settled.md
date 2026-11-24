# Ay-Vee Utopia α1.3.1 · the settled list

Statute, article 21.3. Every correction he gives becomes one line here: what he said, and what proves it holds.
Every pass re-runs the whole list before anything ships.

The settled list of the earlier α1.3.1 session lives in the folder on his computer. That computer could not be
reached in the session of 8 Oct 2026, so those lines were not re-run here. They join this file when the folder is.

## 8 Oct 2026 · the Clip fix

| what he said | what proves it holds | result |
|---|---|---|
| "Clip is broken in α1.3.1 ... the block that starts the recording ended up inside `clipRec.onstop`, so recording never starts. Put it back after `onstop` is set." | function list lines `clip.key`, `clip.button`, `clip.noSong`, `clip.fromFile`, `clip.minute`, `clip.phone`: a clip starts, and the saved video is caught, opened, plays, is as long as it recorded and has the song in it | holds |
| "`clipSaved(ty)` uses `tp`, which no longer exists: restore `const tp = clipRec.mimeType \|\| ty \|\| 'video/webm';` at its top." | the same lines: the file is saved with no page error and is named `.webm` or `.mp4` by the type the recorder really used | holds |
| "Then build the function list (Article 23) and run it on α1.3.1 before anything else." | `tools/functions.md` (110 lines, generated from the file and held against it), `tools/results/function-check-*.md` for α1.3.1 as received and α1.3.1 fixed | done |

## Found by the list, the same day

| what was found | what proves it holds | result |
|---|---|---|
| The Clip button had nothing listening to it (only the C key started a clip). Wired back to the same function. | the list's own check "a button nothing listens to" (fails on α1.3.1 as received, passes on the fixed build), and line `clip.button` | holds |

## 9 Oct 2026 · his rulings on what the list found

| what he said | what proves it holds | result |
|---|---|---|
| The Clip button: "Keep it" | line `clip.button`, and the list's own check "a button nothing listens to" | holds |
| The dead-link message: "Mend it" | line `songs.link`: a dead link reads "Could not play that link...", the panel reads "Nothing loaded", Play keeps its icon, a good link afterwards plays | holds |
| Wren's light on the floor: "Yes, B" (sheet `wren-floor-light-A-B.jpg`) | line `layer.cyn.wfloor`: the switch changes the picture; the sheet in `tools/results/` | holds |
| The list on α1.3: "Skip it for this fix" | not run, by his ruling | - |

## 15 Nov 2026 · α1.3.1b

| what he said | what proves it holds | result |
|---|---|---|
| "Nothing happens when I press Clip" (on the live site, which had never received the Oct mends) | this folder's build goes live; line `clip.button` PASS | holds |
| Tab clips: the tab's sound goes in (9 Oct "Go") | line `clip.tab`-type check needs his hands: a clip with Tab on has the song once, in sync | needs his hands |
| Remind him: after every upload to Pages, hard refresh (Ctrl+Shift+R) before testing | said at every handoff | standing |

## 16-17 Nov 2026 · the first α1.3.2 / α1.3.2a, rolled back on 22 Nov

That build was rolled back (22 Nov: "pull shit back to 1.3.1 and bake from there"). Its rows are kept here only for
what was carried over onto the new α1.3.2; the rest no longer applies.

| what he said then | carried? | what proves it holds now |
|---|---|---|
| Auto: "Auto follows the song's own arc" / "Yes, build that" | yes | line `tools.autoArc` |
| Sensitivity "to the bottom bar by Auto"; on the computer "In the row, by Auto" | yes | line `songs.sensitivity` (reachable, by Auto, PC and phone); line `phone.more` |
| Wall lights "kept off the middle" | yes, then reshaped (see 22 Nov) | `bodeWallLights`, sheet 4 |
| Bod-e's light: "the dark, crisp one, on every machine" | as a goal, met another way | 22 Nov row on white |
| Gali, Wren redrawn (16-17 Nov) | no: back to α1.3.1b's Gali and Wren until their own pass | - |

## 22 Nov 2026 · the new α1.3.2

| what he said | what proves it holds | result |
|---|---|---|
| "pull shit back to 1.3.1 and bake ... from there"; base 1.3.1b (card) | this build's diff is against α1.3.1b (`build/a1_3_2.diff`) | holds |
| The plan: 1.3.1's issues fixed, then what Fable made that "didn't turn monstrous", called 1.3.2; the UI overhaul is 1.4 | this build; 1.4 not started | holds |
| Gali and Wren: "1.3.1 versions" until their redesign | their code is α1.3.1b's, unchanged (diff) | holds |
| Bod-e's Focus unspools (video sheet 1): "yes"; "wooooow i am in lovee with the new focus freq" | `bodePhases`: body→room over 3.5 s, back over 6 s; Focus stills: plain white 0.00-0.01% of the frame | holds |
| Bod-e's everyday, crisp heads and the carried lamps (sheet 2): "like it" | `drawPins`; stills | holds |
| "enlarge the wall lights a tad bit, and not even all of them" | `AV.BODE.wallLight.big` = 0.26 on every third lamp; sheet 4 | his feel |
| Pelvy: "as long as he doesn't look like pixels from the 90s"; the lantern + water (sheet 3): "oooooh I love that yes" | `pelvyLantern`, `pelvyWater`; his layer at full size; he catches only her, never the room | holds |
| Floor lines multiplying on beat hits | owned by the old Pelvy (a copy of the whole stage laid near the floor); stills with Pelvy on/off; the new water catches only her | holds |
| Clip: "always standard 1920x1080" | lines `clip.*` check 1920x1080; Chrome test: H.264 1920x1080 MP4 with sound | holds; AAC on his Windows Chrome needs his hands |
| The chat's sketch box did not animate for him (22 Nov) | sketches go to him as recordings of the real build | standing |

## 23 Nov 2026 · α1.4 (the Eclipse HUD)

| what he said | what proves it holds | result |
|---|---|---|
| A fresh UI, "really modern, really sleek", alive with the song; no house style (sketch round 2: "for PC I'm leaning mostly C", freedom to borrow from A and B; sheet: "Yes, ship it") | sheets `a1_4_sheet1_pc.jpg`, `a1_4_sheet2_phone.jpg`; line `focus.release` | holds |
| The song list tappable, controls and list in one place ("it's confusing cause it's not at the same place") | line `queue.rows` (tap plays, tap again pauses, x drops, grip drags); the queue sits beside the disc on the PC and opens from the disc on the phone | holds |
| Remove + reorder in the queue (card) | line `queue.rows` | holds |
| Nothing that looks touchable and isn't ("ui ocd purposes") | line `hud.touchable` | holds |
| Hide goes ("you either immerse or remove what you don't want individually"); slide-away tabs stay | line `hud.hide` (no button; H and the tab still work); `slide.*` | holds |
| Clip 2x / 3x ("longer clip"); not on the phone ("won't be clipping on phone") | lines `clip.length`, `clip.phone` | holds; a real 2x/3x clip in Edits needs his hands |
| Lamps "great"; the light behind Bod-e goes; in Focus the lights go focused and edged | `bodeLamp` (no glow behind her; her middle light and pool stay); `bodeWallLights` (tight core + rim in Focus) | holds |
| Pelvy's size right; he roams, chases her Echoes, rushes in on Focus; catching counts ("1 + 2 pwease"); economy "Keep it" | line `pelvy.catch`; `pelvy.staying` (1 Echo / 30 s); db `AV.PELVY.throwEvery 3, echoLife 2.6, catchWorth 0.2` | holds |
| Release: veils go acute and dark, only Focus burns ("Yes, build that"; recording: "Yes, that's it") | line `focus.release`; recording in chat | holds |
| Name stays Ay-Vee; VeilAcute CurVessel as early lore in the code; Utopia is the room | the lore block at the top of `index.html`; title reads "Ay-Vee · in Utopia" | holds |

## 23 Nov 2026 · α1.5 (They Come Alive)

| what he said | what proves it holds | result |
|---|---|---|
| "Just update the hud to fixed position now for PC ... just reposition them, everything is great as is. Maybe scale them to fit all the buttons" | `tools/scripts/fit.mjs` at 1915×908, 1729×927, 1920×1080: no control cut or overlapping, disc 46 px off the bottom; sheet `a1_5_sheet1_pc_fit.jpg` | holds |
| Bod-e: her whole body must react, not only her insides; "Yes + frames move always" | `bodeBody` (BODY in `bound3`, the shape both frames and her points share); recording `sketch_round3` | holds |
| The drop: "pull in quickly then bam burst out" | `bodeSlam`: crumple, burst to 1.6×, settle; her points keep up (`keepUp`) | holds |
| The held note: fade "not like POOF gone", see-through, snap back, "that snap back reverberates" | `bodeLetGo` (0.85 s fade, hold, snap, three echo frames); rare (`susCool` 12-20 s); twice in 22hrs | holds |
| Pelvy and Bod-e in Focus "awesome" | `pelvyLantern`, `pelvyGiving`; line `pelvy.stacks` | holds |
| Wren: cinders "all across the screen", "ember sticking to the edges ... the room doesn't have to do anything, but he does" | `wrenStorm` (screen space), `wrenFly`; the room untouched | holds |
| "the thread is about the mark moment" | `fp.at`: in a file the thread is the stretch held; lines `thread.button`, `thread.key` | holds |
| The seam: not "plastered to the screen", "too saturated" | `threadLine`: in the room in depth, before her, her colour quieted; sheet `a1_5_sheet2_seam.jpg` | his yes |
| Gali: "Redesign in its own pass"; "I love her cannonball" | only `galiCannonball` is new on her; one stack per Focus (line `focus.tyde`) | holds |
| Hingez: a WIP tag, "too faint ... a pop-up or smth" | tag + `wipNote`; line `hingez.wip` | holds |

## 23 Nov 2026 · α1.5a (the studio HUD, computer)

Rounds 1 to 4 (same day) solved numbers instead of the picture; round 5 started from the concept. Rows from round 4
that he kept are proven here too.

| what he said | what proves it holds | result |
|---|---|---|
| An 8 px grid with corner boards "SMOTHERS the room"; keep the Eclipse layout, a system of Claude's own under it | `DESIGN.md` (the studio); no grid, the Eclipse pieces where they were | holds |
| The concept, "that's exactly it": the room is the room, the HUD is hardware, what you touch is light | sheets `a1_5a_sheet*`; this build | his yes on the sheets |
| Veils bolted to the real corners of the window at any size, no dead bands; each scales but anchors to its corner | `veil_check.mjs` rule 0 (WINDOW) at 1920×1080, 1904×901, 1729×927 | holds |
| Veils built from shadow, no flat fill with a cut edge; only the lit edge and the pins carry light | `veilShade` (shade carried past the window's edges, blurred); sheet 1 | holds |
| No boxes and no plates on the veils, just ink; every control its own colour; off = dimmed, no glow, smaller; touched or running = lit and grown | the colour code in the stylesheet (`--c`, `--off`, `--lit`); sheet 4 | holds |
| Nothing in the HUD is plain white | `ink_check.mjs`: 0 near-neutral ink in four states | holds |
| Layers, Lab and the Hingez note come out of what called them, float free, no veil, frame or box; closing pulls them back | `holo_check.mjs` (born at the source's centre, no veil, shuts at once, after-image 0.4 s, no box); sheets 2-3; clip | holds |
| The colour code (ears in string colours, lab red, playback live, embodiments their own) and "Keep these" for the rest | the stylesheet's colour code block; `DESIGN.md` §4 | holds |
| The picked embodiment: "Keep the lit rim" | `#hud #shapes button.on::before` | holds |
| The playing row in the queue: "Leave the box" | `.qrow.cur` unchanged | holds |
| The crescent is α1.4's curve, ~15% bigger, tilted toward its stack, never bent into a corner (round 4) | `veilCurve` k = 0, `leanFit`; veil check rule 1 | holds |
| Each veil only as tall as its stack needs, "space taking up room from the room" (round 4) | `fitHeight`, `data-fit="h"`, 21 clear | holds |
| The title veil's long top horn stays (round 4) | `#title` width 620 | holds |
| The shrink: small at rest, ~1.3x under the hand or for 8 s, the running one stays grown, on transforms (round 4) | `.blade button` scale 1 / 1.14 / 1.18 on a small base; `.warm` 8 s | holds |
| The floating bottom (queue, disc, Pelvy with his aura): "don't touch it beyond the colour code" | only colour rules touch `#track`, `#transport`, `#pelvy` | holds |
| The current on the veil edges and the spark on press: kept | `.vcurrent`, `B.boost` | holds |
| Pelvy "leaves a weird trail, kind of like a straight line ... I'd rather we address it before shipping" | `pelvyTrail` keeps 0.25 s of path by time, in his colour, a jump clears it; sheet 5 (round 4 against this build, the same 10 s) | holds |
| The phone keeps α1.4's layout for now | `phone_same.mjs`: HUD pixel-identical to round 4 | holds |
| Found by the list (not his words): the small seek line at the middle of the arc must seek | line `songs.seekBar` PASS (the disc's slide arrow moved into its bottom row; slide lines all PASS) | holds |

## 23 Nov 2026 · α1.5b (the clip's sound)

| what he said | what proves it holds | result |
|---|---|---|
| "I hear scratching and it speeds up when it scratches ... I hear it at the beginning" | `clipTap` / `clipTapSound`; a clip's sound as long as its picture, the test song's bass hits all 0.500 s apart (`tools/scripts/clip_sound.mjs`) | holds; a real Tab clip needs his hands |
