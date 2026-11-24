# Ay-Vee · the studio (α1.5a)

Ay-Vee's own design system for the computer, written 23 Nov 2026. Its rules come from this design, not from a
textbook. It replaces the Eclipse doc. The layout underneath is still the Eclipse (α1.4): balance in
disproportion. What changed is what each piece *is*.

Nate, on the concept: "that's exactly it". On why there was a round 5: rounds 1 to 4 solved numbers (curve fits,
gaps, a check that passed) instead of the picture he described. A passing check is not a picture.

## The concept: a sci-fi studio

**The room is the room. The HUD is hardware in it. What you touch is light.**

Three kinds of thing, and nothing else:

| kind | what it is | where it lives |
|---|---|---|
| **hardware** | the veils: the title, the embodiments, Ears, the screen tools | bolted to the window's own corners |
| **light** | every control, every word | on the veils, or floating (the queue, Pelvy, the disc's song) |
| **hologram** | Layers, the Lab, the Hingez note | spawned out of what called them, floating free in the room |

The stage (the 1920 × 1080 room the embodiment lives in) stays centred and scaled to the window. The disc and the
floating bottom (queue, disc, Pelvy with his aura) stay on it. Only the hardware leaves the stage for the window.

## 1 · The veils are hardware

- **Bolted to the window's corners at any size.** Each veil scales with the window (the stage's scale) but anchors
  to its own corner: the title and the embodiments top left, Ears top right, the screen tools bottom right. No
  dead bands at the sides. In stage pixels the window runs past the stage by `--ax` on each side and `--ay` top and
  bottom; a corner veil is pulled out by exactly that.
- **Built from shadow.** A veil is the dark side of its curve: black at 72%, blurred 26 so the dark falls off past
  the curve into the room. The shade runs on past the window's edges (90 stage px) so the blur never lightens it
  where it meets the window. Never a flat fill, never a visible cut edge.
- **Only the lit edge and the pins carry light.** The edge in structure blue `#8fd6ff`, the pins a paler blue.
- **The crescent is α1.4's curve** (k = 0), about 15% bigger, **tilted toward its stack** (both horns pinned, the
  belly leans, `lean` from -0.3 to 0.3 by leanFit). Never bent into a corner.
- **Each veil is only as tall as its stack needs** (fitHeight, `data-fit="h"`, 21 clear). No empty tail.
- **The title veil's long top horn stays.**
- **The current runs the edges; a press sends a spark down its veil.**
- The shade follows the veil's rest shape, not every bow of the bass, so it is redrawn only when that shape
  changes (a new size, a new tilt, the picked embodiment, the release). A blurred path is dear to redraw.
- A veil refits at once when the picked embodiment changes (a wider plate must never poke through its curve).

## 2 · What sits on the veils is touch light

- **No boxes and no plates, just ink.** A control has no lens rim and no face at rest. Its box is only where the
  hand lands.
- **Every control has its own colour** (`--c`). Two states of one colour:
  - **off** (`--off`): that colour mixed 58% into the dark. Muted, no glow, smaller (0.9; inside a veil the small
    size is the rest size).
  - **lit** (`--lit`): that colour with 18% light, a glow in its own colour, grown: 1.14 under the hand or for
    8 s after use (`.warm`), 1.18 while running. Behind lit ink, a soft round of its own colour, never a shape.
  - Everything grows by transform, so nothing around it moves.
- **Nothing in the HUD is plain white or grey.** Words that are only read take their family's colour, dimmed
  (38% into the dark). The ink check (`tools/scripts/ink_check.mjs`) fails any visible ink whose colour is
  near-neutral.
- **The picked embodiment is the big plate** (his ruling): its chevron rim lit in her own colour, dark inside.
  The others are small names, off.
- The release (Focus) keeps α1.4's ruling: every curve goes acute, the HUD goes dark, the edges flare.

## 3 · What spawns is a hologram

- Layers, the Lab and the Hingez note **come out of the thing that called them** (Layers of …, Lab, Hingez's
  name): they grow from its centre in 0.55 s, bright and a little blurred, then settle.
- **No veil, no frame, no box.** A dark aura under the ink (3, 9 and 18 px of black) so it reads over the room.
- **Closing pulls it back into its source** (0.4 s). The panel shuts at once, so every way of closing (Close,
  the D key, opening the other panel) sees it shut; an after-image plays the way back with nothing to press on it.
- Holograms are free things: they sit on no veil's curve. They float beside their source's corner.
- Reduced motion: no growing, no pulling back; they simply appear and go.

## 4 · The colour code

Every family gets a hue. Off is the dark version of that hue; on is the hue lit.

| family | colour | who |
|---|---|---|
| the ears | their string colours | bass `#ff4d6a`, synths `#ff9c3a`, voice `#62f58a`, highs `#b07bff` |
| the lab | record red `#ff3d66` | Lab, Record, Mark, numbers, the Lab hologram, Clip and its lengths |
| playback | the live colour | play, previous, next, repeat, volume, the queue, the song in the disc, Pelvy's words |
| the embodiments | their own | Bod-e `#62f58a`, Gali `#2ad4ff`, Hingez `#b07bff`, Wren `#ff8a2a`; the asleep ones in structure blue |
| the controls of their own (his yes, 23 Nov) | | Auto `#3fe0c5`, Thread `#ffd64a`, Mic `#ff5c8a`, Tab `#5ab8ff`, Freeze `#a8e6ff`, Immerse `#4a8cff`, ? `#8fd6ff`, Tell Nate `#ffd64a` |
| structure | `#8fd6ff` | veil edges and pins, section labels, sensitivity, the title |

## 5 · Two ladders, like a curve (kept from the Eclipse)

- **Space** steps by about ×1.6: **5 · 8 · 13 · 21 · 34 · 55**.
- **Type** steps by ×1.25 from the song's name: **26 · 21 · 17 · 13 · 11**, section labels whisper at 10 in
  tracked capitals.

## 6 · The disc holds its song (kept)

Everything in the disc keeps **13** inside its circle; its lowest row keeps **21** above the stage's bottom. The
floating bottom is his favourite part: only the colour code touches it.

## 7 · Pieces are sized by what they hold (kept)

No piece has a size of its own choosing: each is its content plus its breath, so they differ.

## 8 · How it is checked

- `tools/scripts/veil_check.mjs` at 1920 × 1080, 1904 × 901 and 1729 × 927, with nothing open, Layers open, the
  Lab open and Hingez picked:
  0. every veil's straight sides sit on the window's own edges (its corner);
  1. everything held sits on the dark side of its veil's curve, at least 13 clear;
  2. free things and holograms sit on no curve;
  3. every control's ink keeps 6 px from its touch box on each side;
  4. the disc rules above;
  5. no two controls overlap, no control sits on a label, nothing is cut by the window.
- `tools/scripts/ink_check.mjs`: no plain white or grey ink in the HUD, in the same four states.
- One hit fails.

## Phone

The phone layout keeps α1.4's and moves onto its own system in its own pass.

## For the next system

Every new UI gets its own DESIGN.md with rules born from its own design. Traditional techniques are tools for
making rules, not the rules themselves.
