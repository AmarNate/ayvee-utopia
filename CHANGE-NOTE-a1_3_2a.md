# Ay-Vee Utopia α1.3.2a · change note · 17 Nov 2026

A lettered fix on α1.3.2: same number, one embodiment. The full α1.3.2 note stays in CHANGE-NOTE.md.

## 1 · What was asked

Wren made bigger, sketched first (his ruling on the α1.3.2 sheet: "Ship, then make him bigger"). On the card, 17 Nov at 07:56: size **A**; the blue glow on his wall **"Make it a small lamp"**; riding along, **"Embers gold, not white"** and **"The three statute checks"**.

## 2 · What the test before touching showed

Wren drawn by the real build at three sizes, held at the same spot at the same moment of Astro Radio Disco: now, A, B. His embers read as white dots on the α1.3.2 stills.

## 3 · What was done

- **His size.** Body 1.75 times wider. His light on the floor reaches 3.2 times its α1.3.1b width (it was 2.2). These are the values of sheet A.
- **His wall lamp.** It was an edgeless glow a third of the window wide. Now it is a small lamp in the same place and colour, with a core you can point at (it measures blue: 111, 132, 240), a tight glow, and a falloff that ends.
- **His embers.** Gold, then orange, then red. Each is drawn over the floor rather than added to it, because adding made the gold pile up into white.

## 4 · Beyond the ask

None.

## 5 · What was not touched

Everything that is not Wren. On Wren: his trail, his kin, his cinders in the air, his floor rings, his facets, his colours.

## 6 · Open

- **How he feels against a real song, at his new size.** Only you hear it.
- **Frames on your PC.** Wren drew 57 frames a second on my machine in a quiet part, 29 to 60 on a chorus (software drawing). Your PC decides.

## 7 · What each changed file is

- `index.html` · the build, α1.3.2a.
- `CHANGELOG.md` · the short copy.
- `CHANGE-NOTE-a1_3_2a.md` · this note.
- `build/a1_3_2a.diff` · every changed line against α1.3.2.
- `tools/settled.md` · his answers of 17 Nov.
- `tools/results/sheet-G-wren-a.jpg` · before and after.

## 8 · The checks

| check | result |
|---|---|
| The function list | 93 controls · 101 listeners · 10 keys · 111 lines · none without a line · PASS |
| Every function, α1.3.2a, run alone | **152 runs · 139 PASS · 13 NEEDS HIS HANDS · 0 FAIL**, the same as α1.3.2 line for line |
| Page errors | none |
| Light | plain white, whole frame: 0.00 to 0.01% (α1.3.2: 0.05%). Embers no longer white |
| Diff | 36 lines changed, every one in Wren, the db's WREN block or a version mark |
| Look | sheet G, read by eye at full size; the lamp checked close at 3x |

The first run failed 20 lines because the stand-in songs had been removed from the folder when yesterday's zip was tidied. That was setup, not the build. The songs were remade (`tools/make_test_songs.sh`) and the run was done again from the start.
