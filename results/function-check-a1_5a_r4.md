# The every-function check · a1_5a_r4

**164 runs of 119 lines** (a line that lives on the PC and the phone runs on both): **141 PASS · 12 NEEDS HIS HANDS · 11 FAIL**

| line | where | result | what was really there |
|---|---|---|---|
| first.card | pc | PASS | the card shows; C does nothing behind the card; Just start puts it away; the browser remembers; it stays away after a reload |
| first.card | phone | PASS | the card shows; C does nothing behind the card; Just start puts it away; the browser remembers; it stays away after a reload |
| first.tour | pc | PASS | the card is gone; the tour is on its first step [1 of 11The embodimentsEach one hears the same song differently. Pick one. The dark sockets are still asleep.nextskip] |
| first.tour | phone | PASS | the card is gone; the tour is on its first step [1 of 8The embodimentsEach one hears the same song differently. Pick one. The dark sockets are still asleep.nextskip] |
| emb.bode | pc | PASS | the bubble greets [Bod-e. Hold the shape.]; only that button is lit [bode]; the title follows [α1.5 · BOD-E]; Layers follows; the guide follows; the guide shows only that part [#legBode]; the picture is not Gali [46.7 apart]; the picture is not Hingez [13.8 apart]; the picture is not Wren [14.3 apart] |
| emb.bode | phone | PASS | the bubble greets [Bod-e. Hold the shape.]; only that button is lit [bode]; the title follows [α1.5 · BOD-E]; Layers follows; the guide follows; the guide shows only that part [#legBode] |
| emb.tyde | pc | PASS | the bubble greets [Gali. Get in, it's fine.]; only that button is lit [tyde]; the title follows [α1.5 · GALI]; Layers follows; the guide follows; the guide shows only that part [#legTyde]; the picture is not Bod-e [46.7 apart]; the picture is not Hingez [46.4 apart]; the picture is not Wren [48.4 apart] |
| emb.tyde | phone | PASS | the bubble greets [Gali. Get in, it's fine.]; only that button is lit [tyde]; the title follows [α1.5 · GALI]; Layers follows; the guide follows; the guide shows only that part [#legTyde] |
| emb.hinge | pc | PASS | the bubble greets [Hingez. Just about holding it together.]; only that button is lit [hinge]; the title follows [α1.5 · HINGEZ]; Layers follows; the guide follows; the guide shows only that part [#legHinge]; the picture is not Bod-e [13.8 apart]; the picture is not Gali [46.4 apart]; the picture is not Wren [7.5 apart] |
| emb.hinge | phone | PASS | the bubble greets [Hingez. Just about holding it together.]; only that button is lit [hinge]; the title follows [α1.5 · HINGEZ]; Layers follows; the guide follows; the guide shows only that part [#legHinge] |
| emb.cyn | pc | PASS | the bubble greets [Wren. Try and keep up.]; only that button is lit [cyn]; the title follows [α1.5 · WREN]; Layers follows; the guide follows; the guide shows only that part [#legCyn]; the picture is not Bod-e [14.3 apart]; the picture is not Gali [48.4 apart]; the picture is not Hingez [7.5 apart] |
| emb.cyn | phone | PASS | the bubble greets [Wren. Try and keep up.]; only that button is lit [cyn]; the title follows [α1.5 · WREN]; Layers follows; the guide follows; the guide shows only that part [#legCyn] |
| emb.asleep.infility | pc | PASS | the bubble says so [In-Fil-Ity is still asleep. Soon.]; Bod-e stays |
| emb.asleep.infility | phone | PASS | the bubble says so [In-Fil-Ity is still asleep. Soon.]; Bod-e stays |
| emb.asleep.kora | pc | PASS | the bubble says so [Juno is still asleep. Soon.]; Bod-e stays |
| emb.asleep.kora | phone | PASS | the bubble says so [Juno is still asleep. Soon.]; Bod-e stays |
| emb.asleep.zeph | pc | PASS | the bubble says so [Zeph is still asleep. Soon.]; Bod-e stays |
| emb.asleep.zeph | phone | PASS | the bubble says so [Zeph is still asleep. Soon.]; Bod-e stays |
| emb.duringFocus | pc | PASS | the bubble asks to wait [Let the Focused Frequency finish first.]; Bod-e stays |
| songs.pick | pc | PASS | Pick songs can be reached; the song is playing [0.60 s of 12 s]; its name is in the panel [Loaded: test one.wav]; the queue marks it [1. test one.wav]; Play says Pause; the name is in the bar and in More; the bass bar of the meter rises [up to 84%]; the meter reads LIVE [LIVE] |
| songs.pick | phone | PASS | Pick songs can be reached; the song is playing [0.47 s of 12 s]; its name is in the panel [Loaded: test one.wav]; the queue marks it [1. test one.wav]; Play says Pause; the name is in the bar and in More; the bass bar of the meter rises [up to 87%]; the meter reads LIVE [LIVE] |
| songs.pickMany | pc | PASS | three in the queue [1. test one.wav2. test two.wav3. test three.wav]; the bubble counts the new one [1 added to queue.]; Next reaches the fourth [short a.wav] |
| songs.drop | pc | NEEDS HIS HANDS | the drop frame shows; it goes when the drag leaves; a text file is left alone [Queue empty]; the dropped songs queue and play [1. test one.wav2. test two.wav]; one more dropped is counted [1 added to the queue.] **His to try:** a real drag from a folder on his computer (the test hands the window the same event with the same files) |
| songs.link | pc | PASS | Link opens the box; an empty box does nothing; the linked song plays [0.52 s]; the meter hears it [bass up to 86%]; a dead link says so [the bubble reads: Could not play that link. Streaming and share links do not work - it needs a direct audio file, or use Pick an audio file. / the panel reads: Nothing loaded]; Play is Play again, with its icon [Play]; nothing says Loaded [Nothing loaded / Nothing playing]; a good link after a dead one plays [Loaded: test%20one.mp3] |
| songs.seek | pc | PASS | the song is at about 9 s [9.56 s]; the head of the crescent follows [2.6 px off] |
| songs.seek | phone | PASS | the song is at about 9 s [9.49 s]; the head of the crescent follows [6.0 px off] |
| songs.seekBar | pc | FAIL | WRONG: the song is at about 6 s [0.91 s]; the small fill follows [6%] |
| songs.sensitivity | pc | PASS | it can be reached, by Auto; the number follows [1.7]; the fill follows; the build is using 1.7 [sensitivity 1.7] |
| songs.sensitivity | phone | PASS | it can be reached, by Auto; the number follows [1.7]; the fill follows; the build is using 1.7 [sensitivity 1.7] |
| help.sens | pc | PASS | the card shows; it explains [Every layer (bass, synths, voice, highs) is read a]; Got it closes it |
| help.sens | phone | PASS | the card shows; it explains [Every layer (bass, synths, voice, highs) is read a]; Got it closes it |
| help.lab | pc | PASS | the card shows; it explains [The Lab is for measuring, not for watching. Record]; Got it closes it |
| help.lab | phone | PASS | the card shows; it explains [The Lab is for measuring, not for watching. Record]; Got it closes it |
| songs.clear | pc | PASS | the player is stopped and empty [no song]; the queue is empty; nothing is named; Play is Play; the bubble says so [Track unloaded.] |
| songs.clear | phone | PASS | the player is stopped and empty [no song]; the queue is empty; nothing is named; Play is Play; the bubble says so [Track unloaded.] |
| play.button | pc | PASS | with no songs it says so [Add some songs first.]; it pauses [stood at 0.70 s]; the button says Play, the meter PAUSED [PAUSED]; it plays again [1.41 s]; the button says Pause |
| play.button | phone | PASS | with no songs it says so [Add some songs first.]; and opens Songs; it pauses [stood at 1.16 s]; the button says Play, the meter PAUSED [PAUSED]; it plays again [2.16 s]; the button says Pause |
| play.space | pc | PASS | Space pauses; Space plays |
| play.next | pc | PASS | Next plays test two.wav [test two.wav]; Next plays test three.wav [test three.wav]; Next plays test one.wav [test one.wav] |
| play.next | phone | PASS | Next plays test two.wav [test two.wav]; Next plays test three.wav [test three.wav]; Next plays test one.wav [test one.wav] |
| play.previous | pc | PASS | early: the song before [test three.wav]; later: this song from its start [0.64 s] |
| play.previous | phone | PASS | early: the song before [test three.wav]; later: this song from its start [0.60 s] |
| play.repeat | pc | PASS | it steps off, all, one, off [off all* one* off]; off: plays through and stops [short b.wav, stopped]; a finished song earns 8 Echoes [16/100]; all: back on the first [short a.wav, playing]; one: still the first, started over [short a.wav at 2.09 s] |
| play.volume | pc | PASS | the real volume is 0.6 [0.6000000238418579]; the labels follow; all the way down is silent [0]; a volume set before the first song holds [0.30000001192092896] |
| play.volumePhone | phone | PASS | the slider can be reached; the real volume is 0.25 [0.25]; the label follows [25%] |
| play.repeatPhone | phone | PASS | it steps all, one, off [all/all* one/one* off/repeat off] |
| pelvy.staying | pc | PASS | listening earns [2/100]; silence earns nothing [1/100] |
| pelvy.stacks | pc | PASS | Focus sleeps with no stack; a pip lights; the level goes up [Lv 2]; Focus wakes; the bubble counts [Pelvy holds 1 stack. Press F when the chorus hits.]; kept after a reload; the third says he is full [Pelvy is full and can't sit still. F gives one, S gives it all.]; he can't sit still; a fourth does not fit [Pelvy cannot hold more than three. Let him give it back: F.] |
| pelvy.stacks | phone | PASS | Focus sleeps with no stack; a pip lights; the level goes up [Lv 2]; Focus wakes; the bubble counts [Pelvy holds 1 stack. Press F when the chorus hits.]; kept after a reload; the third says he is full [Pelvy is full and can't sit still. F gives one, S gives it all.]; he can't sit still; a fourth does not fit [Pelvy cannot hold more than three. Let him give it back: F.] |
| pelvy.pips | pc | PASS | numbers off: nothing; the second pip lights two [Pelvy holds 2.]; the third lights three; not saved |
| pelvy.pips | phone | PASS | numbers off: nothing; the second pip lights two [Pelvy holds 2.]; the third lights three; not saved |
| pelvy.god | pc | PASS | he starts full; a Focus fires [Pelvy lets go. Bod-e blooms.]; and spends nothing |
| focus.tap | pc | PASS | the bubble [Pelvy lets go. Bod-e blooms.]; Pelvy gave 1 [0 left of 1]; it lasts 20 s [20.13 s]; the picture is not the one without Focus [25.1 apart]; the button rests while it runs; and is ready again after, if he still holds a stack |
| focus.F | pc | PASS | the bubble [Pelvy lets go. Bod-e blooms.]; Pelvy gave 1 [1 left of 2]; it lasts 20 s [20.13 s]; the picture is not the one without Focus [25.1 apart]; the button rests while it runs; and is ready again after, if he still holds a stack |
| focus.S2 | pc | PASS | the bubble [Pelvy gives two. The room lets go.]; Pelvy gave 2 [0 left of 2]; it lasts 26 s [26.13 s]; the picture is not the one without Focus [27.2 apart]; the button rests while it runs; and is ready again after, if he still holds a stack; two stacks is not the one-stack Focus [28.74 apart] |
| focus.S3 | pc | FAIL | the test could not finish: took longer than 6 minutes |
| focus.hold | pc | FAIL | WRONG: held: everything [Pelvy lets go. Bod-e blooms. / 2 left] |
| focus.hold | phone | FAIL | WRONG: held: everything [Pelvy lets go. Bod-e blooms. / 2 left] |
| focus.tyde | pc | PASS | the bubble [Pelvy lets go. Gali splits.]; Pelvy gave 1 [1 left of 2]; it lasts 20 s [20.13 s]; the picture is not the one without Focus [31.1 apart]; the button rests while it runs; and is ready again after, if he still holds a stack |
| focus.hinge | pc | PASS | the bubble [Pelvy lets go. Hingez comes undone.]; Pelvy gave 2 [0 left of 2]; it lasts 26 s [26.13 s]; the picture is not the one without Focus [60.1 apart]; the button rests while it runs; and is ready again after, if he still holds a stack |
| focus.cyn | pc | PASS | the bubble [Pelvy lets go. Wren goes up.]; Pelvy gave 2 [0 left of 2]; it lasts 26 s [26.13 s]; the picture is not the one without Focus [8.9 apart]; the button rests while it runs; and is ready again after, if he still holds a stack |
| focus.none | pc | PASS | no stack: nothing; a second cannot start [1 left]; the guide counts it [1 Focused Frequencies fired] |
| focus.none | phone | PASS | no stack: nothing; a second cannot start [1 left]; the guide counts it [1 Focused Frequencies fired] |
| thread.button | pc | FAIL | WRONG: the bubble names the song and the stretch [Got your thread in test one, 0:08 to 0:11. Every time it plays, they will feel it.] |
| thread.button | phone | PASS | nothing playing: play a song first [Play a song first, then hold Thread while your element plays.]; too short: hold longer [Hold it a little longer, for as long as your element plays.]; held: it reads Listening, in red [{"live":true,"says":"Listening"}]; the bubble names the song and the stretch [Got your thread in test one, 0:05 to 0:07. Every time it plays, they will feel it.]; it is kept, with its stretch [[5.56,7.39]]; the dot shows; at the stretch it plays [thread 0.71]; before it, it does not |
| thread.key | pc | FAIL | WRONG: at the stretch it plays [thread 0.52] |
| hingez.wip | pc | FAIL | WRONG: the note shows [Hingez is still being made. He will change, and some of him isn't there yet.] |
| hingez.wip | phone | PASS | the tag is on his card; the note shows [Hingez is still being made. He will change, and some of him isn't there yet.]; in the window; picking Wren hides it |
| tools.mic | pc | NEEDS HIS HANDS | the button lights [Mic on]; the meter reads MIC [MIC]; the song is put away; pressed again it stops [Mic off / IDLE] **His to try:** a real microphone, the browser asking him for it, and what the room does to the picture |
| tools.mic | phone | NEEDS HIS HANDS | the button lights [Mic on]; the meter reads MIC [MIC]; the song is put away; pressed again it stops [Mic off / IDLE] **His to try:** a real microphone, the browser asking him for it, and what the room does to the picture |
| tools.tab | pc | NEEDS HIS HANDS | the button is there; a press gets an answer [Reading that tab. Load a playlist and leave it running - it never stops.] **His to try:** picking a real tab with "Also share tab audio", the picture following that tab, and the tab ending |
| tools.tab | phone | NEEDS HIS HANDS | not offered on the phone **His to try:** picking a real tab with "Also share tab audio", the picture following that tab, and the tab ending |
| tools.mood | pc | PASS | it steps [Verse: Verse: held low. / Chorus: Chorus: held high. / Auto: Auto: the sound decides.]; Auto is lit; Chorus is not Verse on the stage [9.7 apart] |
| tools.mood | phone | PASS | it steps [Verse: Verse: held low. / Chorus: Chorus: held high. / Auto: Auto: the sound decides.]; Auto is lit |
| tools.autoArc | pc | PASS | the quiet part draws a quieter picture than the first loud part [4.2 against 10.7]; she comes back up for the second loud part [27.8 against 4.2] |
| tools.freeze | pc | PASS | the button says Unfreeze; frozen: the picture stands still [0.000 apart]; frozen: a tap earns nothing [0/100]; unfrozen: it moves [4.00 apart] |
| tools.freeze | phone | PASS | the button says Unfreeze |
| layers.panel | pc | PASS | it opens; Bod-e: 8 rows, all lit [8/8 lit]; Close closes; D opens; D again closes; tyde: Close can be reached; hinge: Close can be reached; cyn: Close can be reached; bode: Close can be reached; each embodiment has its own [7,5,6,8]; every row of every embodiment can be pressed [all 26]; the Lab takes its place; and gives it back |
| layers.panel | phone | PASS | it opens; Bod-e: 8 rows, all lit [8/8 lit]; Close closes; D opens; D again closes; tyde: Close can be reached; hinge: Close can be reached; cyn: Close can be reached; bode: Close can be reached; each embodiment has its own [7,5,6,8]; every row of every embodiment can be pressed [all 26] |
| layer.bode.swirl | pc | PASS | the row goes dark; the count drops [7/8 lit]; that part of the picture is gone [7.30 apart] |
| layer.bode.edge | pc | PASS | the row goes dark; the count drops [7/8 lit]; that part of the picture is gone [1.93 apart] |
| layer.bode.bursts | pc | PASS | the row goes dark; the count drops [7/8 lit]; that part of the picture is gone [1.27 apart] |
| layer.bode.grit | pc | PASS | the row goes dark; the count drops [7/8 lit]; that part of the picture is gone [4.57 apart] |
| layer.bode.lights | pc | PASS | the row goes dark; the count drops [7/8 lit]; that part of the picture is gone [3.34 apart] |
| layer.bode.lamp | pc | PASS | the row goes dark; the count drops [7/8 lit]; that part of the picture is gone [0.16 apart] |
| layer.bode.floor | pc | PASS | the row goes dark; the count drops [7/8 lit]; that part of the picture is gone [0.57 apart] |
| layer.bode.pelvy | pc | PASS | the row goes dark; the count drops [7/8 lit]; that part of the picture is gone [5.09 apart] |
| layer.bode.back | pc | FAIL | WRONG: the picture is whole again [0.051 apart] |
| layer.tyde.gwater | pc | PASS | the row goes dark; the count drops [6/7 lit]; that part of the picture is gone [13.25 apart] |
| layer.tyde.gfish | pc | PASS | the row goes dark; the count drops [6/7 lit]; that part of the picture is gone [18.49 apart] |
| layer.tyde.gfoam | pc | PASS | the row goes dark; the count drops [6/7 lit]; that part of the picture is gone [20.10 apart] |
| layer.tyde.glints | pc | PASS | the row goes dark; the count drops [6/7 lit]; that part of the picture is gone [17.79 apart] |
| layer.tyde.gflowers | pc | PASS | the row goes dark; the count drops [6/7 lit]; that part of the picture is gone [2.08 apart] |
| layer.tyde.glights | pc | PASS | the row goes dark; the count drops [6/7 lit]; that part of the picture is gone [19.17 apart] |
| layer.tyde.back | pc | PASS | all dark [0/7 lit]; all lit again [7/7 lit]; the picture is whole again [0.000 apart] |
| layer.hinge.hstrings | pc | PASS | the row goes dark; the count drops [4/5 lit]; that part of the picture is gone [2.69 apart] |
| layer.hinge.hlight | pc | PASS | the row goes dark; the count drops [4/5 lit]; that part of the picture is gone [1.60 apart] |
| layer.hinge.hveins | pc | PASS | the row goes dark; the count drops [4/5 lit]; that part of the picture is gone [0.08 apart] |
| layer.hinge.hmotes | pc | PASS | the row goes dark; the count drops [4/5 lit]; that part of the picture is gone [1.50 apart] |
| layer.hinge.back | pc | PASS | all dark [0/5 lit]; all lit again [5/5 lit]; the picture is whole again [0.000 apart] |
| layer.cyn.wtrail | pc | PASS | the row goes dark; the count drops [5/6 lit]; that part of the picture is gone [0.08 apart] |
| layer.cyn.wshards | pc | PASS | the row goes dark; the count drops [5/6 lit]; that part of the picture is gone [0.67 apart] |
| layer.cyn.wcoals | pc | PASS | the row goes dark; the count drops [5/6 lit]; that part of the picture is gone [0.05 apart] |
| layer.cyn.wdust | pc | PASS | the row goes dark; the count drops [5/6 lit]; that part of the picture is gone [0.02 apart] |
| layer.cyn.wfloor | pc | PASS | the row goes dark; the count drops [5/6 lit]; that part of the picture is gone [0.10 apart] |
| layer.cyn.back | pc | PASS | all dark [0/6 lit]; all lit again [6/6 lit]; the picture is whole again [0.000 apart] |
| lab.panel | pc | PASS | it opens; #recBtn can be reached; #markBtn can be reached; #numBtn can be reached; Close closes |
| lab.panel | phone | PASS | it opens; #recBtn can be reached; #markBtn can be reached; #numBtn can be reached; Close closes |
| lab.record | pc | PASS | nothing playing: it says so [Play something first, then Record.]; Mark without Record: it says so [Record first, then Mark.]; the button says Stop rec; the bubble says it is recording [Recording what it hears. M drops a mark. Press Record again to save.]; a mark is counted [mark 1 at 2.32s]; a file is saved; it is named for the song [ayvee-hears-test_one.wav.json]; it says what made it [Ay-Vee Utopia α1.5]; ten steps a second of the song [40 steps in 4.3 s of the song]; all four layers have every step; the bass was heard [bass up to 1]; the bass hits are in it [6 hits]; both marks are in it [2.322, 3.27]; the bubble sums it up [Saved: 40 steps, 6 bass onsets, 2 marks.]; the button is Record again |
| lab.record | phone | FAIL | WRONG: ten steps a second of the song [57 steps in 6.9 s of the song] |
| lab.recordKeys | pc | PASS | the button says Stop rec; the bubble says it is recording [Recording what it hears. M drops a mark. Press Record again to save.]; a mark is counted [mark 1 at 1.21s]; a file is saved; it is named for the song [ayvee-hears-test_one.wav.json]; it says what made it [Ay-Vee Utopia α1.5]; ten steps a second of the song [29 steps in 3.2 s of the song]; all four layers have every step; the bass was heard [bass up to 1]; the bass hits are in it [3 hits]; both marks are in it [1.208, 2.241]; the bubble sums it up [Saved: 29 steps, 3 bass onsets, 2 marks.]; the button is Record again |
| lab.numbers | pc | PASS | the button says on; it can be seen; it carries the numbers [0:02.8 bass 0.84 syn 0.43 voice 0.00 highs 0.00bass pulse: l]; the guard shows on Bod-e [guard glass flat]; it says it is recording; the time moves [0:04.4]; no guard on Gali; off hides it |
| lab.numbers | phone | PASS | the button says on; it can be seen; it carries the numbers [0:05.4 bass 0.85 syn 0.46 voice 0.00 highs 0.00bass pulse 10]; the guard shows on Bod-e [guard glass flat, tails shorter]; it says it is recording; the time moves [0:06.1]; no guard on Gali; off hides it |
| lab.guard | pc | NEEDS HIS HANDS | the guard steps down when frames run short [frame 13 fps · guard glass flat, tails shorter] **His to try:** on his card: that it reads "full" on Telo, and that it steps back up after a drop |
| clip.button | pc | PASS | the red clip plate shows; the button says Stop clip [Stop clip]; the bubble says it is recording [Recording the stage (up to a minute). C or Stop clip to finish.]; a file is saved; the bubble says Clip saved and what it is [Clip saved: MP4, Opus sound (some players play it mute), 1920×1080.]; what it says is what the file is [Clip saved: MP4, Opus sound (some players play it mute), 1920×1080. / 1795466531906-ayvee-bode-test_one.mp4]; it is 1920×1080 [h264 1920x1080]; it is a video that plays [h264 1920x1080, 22 frames, 4.38 s, 1382 KB]; it is as long as it recorded [4.38 s saved, 4.6 s recorded]; the stage is in it (not a black frame) [brightness 8.46701]; the button is Clip again; the song is in it [opus, peak -7.8 dB]; named for the embodiment and the song [ayvee-bode-test_one.mp4] |
| clip.key | pc | PASS | the red clip plate shows; the button says Stop clip [Stop clip]; the bubble says it is recording [Recording the stage (up to a minute). C or Stop clip to finish.]; a file is saved; the bubble says Clip saved and what it is [Clip saved: MP4, Opus sound (some players play it mute), 1920×1080.]; what it says is what the file is [Clip saved: MP4, Opus sound (some players play it mute), 1920×1080. / 1795466535830-ayvee-bode-test_one.mp4]; it is 1920×1080 [h264 1920x1080]; it is a video that plays [h264 1920x1080, 21 frames, 5.25 s, 1321 KB]; it is as long as it recorded [5.25 s saved, 5.4 s recorded]; the stage is in it (not a black frame) [brightness 7.90278]; the button is Clip again; the song is in it [opus, peak -8.7 dB] |
| clip.fromFile | pc | NEEDS HIS HANDS | the red clip plate shows; the button says Stop clip [Stop clip]; the bubble says it is recording [Recording the stage (up to a minute). C or Stop clip to finish.]; a file is saved; the bubble says Clip saved and what it is [Clip saved: MP4, Opus sound (some players play it mute), 1920×1080.]; what it says is what the file is [Clip saved: MP4, Opus sound (some players play it mute), 1920×1080. / 1795466544981-ayvee-bode-test_one.mp4]; it is 1920×1080 [h264 1920x1080]; it is a video that plays [h264 1920x1080, 26 frames, 5.7 s, 1631 KB]; it is as long as it recorded [5.7 s saved, 5.4 s recorded]; the stage is in it (not a black frame) [brightness 6.20312]; the button is Clip again; the song is in it [opus] **His to try:** the file landing in his Downloads folder, and that it plays in his player |
| clip.noSong | pc | PASS | the red clip plate shows; the button says Stop clip [Stop clip]; the bubble says it is recording [Recording the stage (up to a minute). C or Stop clip to finish.]; a file is saved; the bubble says Clip saved and what it is [Clip saved: MP4, no sound, 1920×1080.]; what it says is what the file is [Clip saved: MP4, no sound, 1920×1080. / 1795466548958-ayvee-tyde-ayvee.mp4]; it is 1920×1080 [h264 1920x1080]; it is a video that plays [h264 1920x1080, 35 frames, 6.95 s, 2131 KB]; it is as long as it recorded [6.95 s saved, 6.9 s recorded]; the stage is in it (not a black frame) [brightness 22.7205]; the button is Clip again; named for Gali [ayvee-tyde-ayvee.mp4] |
| clip.minute | pc | NEEDS HIS HANDS | it is recording; still recording a few seconds before the minute; it stopped and saved by itself [ayvee-bode-ayvee.mp4]; the video plays **His to try:** a real full minute: that the file holds all sixty seconds |
| clip.phone | phone | PASS | no Clip on the phone [none] |
| hud.immerse | pc | FAIL | the test could not finish: page.click: Timeout 30000ms exceeded. **His to try:** the window going fullscreen, the screen staying awake, Esc out of fullscreen bringing the HUD back, and coming back to the tab keeping the screen awake |
| hud.immerse | phone | NEEDS HIS HANDS | it is immersed; the bubble says so [Immersed. (Screen lock needs a secure page - the PC may still sleep.) Esc or I to come back.]; every pane is gone [none left]; the tab stays; I brings it back; from I, the tab brings the HUD back **His to try:** the window going fullscreen, the screen staying awake, Esc out of fullscreen bringing the HUD back, and coming back to the tab keeping the screen awake |
| hud.hide | pc | PASS | no Hide button; H hides everything; the tab can be pressed; the tab brings them back; H hides; H shows |
| hud.hide | phone | PASS | no Hide button; H hides everything; the tab can be pressed; the tab brings them back; H hides; H shows |
| tell.report | pc | NEEDS HIS HANDS | the card opens; typing presses no keys of the app; the bubble says copied [Report copied. Paste it to Nate.]; the clipboard holds the report [version α1.5]; with the window it was in [window 1600×900 @1x]; Save writes ayvee-report.txt [ayvee-report.txt]; no share sheet here: Share saves the report; Close puts the card away **His to try:** the phone's real share sheet; and Copy when the build is opened as a file, where a browser may refuse the clipboard and save the report instead |
| tell.report | phone | NEEDS HIS HANDS | the card opens; typing presses no keys of the app; the bubble says copied [Report copied. Paste it to Nate.]; the clipboard holds the report [version α1.5]; with the window it was in [window 402×874 @3x]; Save writes ayvee-report.txt [ayvee-report.txt]; no share sheet here: Share saves the report; Close puts the card away **His to try:** the phone's real share sheet; and Copy when the build is opened as a file, where a browser may refuse the clipboard and save the report instead |
| guide.open | pc | PASS | the guide opens; it says where you stand [Level 3. 240 Echoes gathered, 0 songs finished, 0 minutes in]; the index has every step [11 lines]; Back to it closes it |
| guide.open | phone | PASS | the guide opens; it says where you stand [Level 3. 240 Echoes gathered, 0 songs finished, 0 minutes in]; the index has every step [8 lines]; Back to it closes it |
| guide.index | pc | PASS | The embodiments [#rail]; Your songs [#rail]; Play [#track]; Pelvy [#track]; Focus [#transport]; The mood [#mode]; Layers [#layersBtn]; Clip [#layersBtn]; Tell Nate [#tellBtn]; Your hands [#tellBtn]; This ? brings it back [#legendBtn] |
| guide.index | phone | PASS | The embodiments [#rail]; Your songs [#rail]; Play [#transport]; Pelvy [#transport]; Focus [#transport]; Ears [#moreBtn]; Layers [#layersBtn]; This ? brings it back [#legendBtn] |
| tour.walk | pc | FAIL | WRONG: step 8 (Clip) [8 of 11, card over the thing it points at]; step 10 (Your hands) [10 of 11, card over the thing it points at] |
| tour.walk | phone | PASS | the guide steps aside; the slid pane is back for the tour; keys do nothing during the tour; it starts at 1 of 8 [1 of 8]; step 1 (The embodiments) [1 of 8]; step 1 button; step 2 (Your songs) [2 of 8]; step 2 button; step 3 (Play) [3 of 8]; step 3 button; step 4 (Pelvy) [4 of 8]; step 4 button; step 5 (Focus) [5 of 8]; step 5 button; step 6 (Ears) [6 of 8]; step 6 button; step 7 (Layers) [7 of 8]; step 7 button; step 8 (This ? brings it back) [8 of 8]; step 8 button; done ends it and says where it lives [The tour lives under ? now.]; back goes back [2 of 8]; skip ends it quietly []; Esc ends it |
| keys.escape | pc | PASS | Layers and Tell Nate close; the guide closes; the ? card closes |
| keys.escape | phone | PASS | Layers and Tell Nate close; the guide closes; the ? card closes |
| slide.title | pc | PASS | the arrow can be pressed; the pane is off screen; a tab is left and can be pressed; remembered after a reload; the tab brings it back |
| slide.title | phone | PASS | the arrow can be pressed; the pane is off screen; a tab is left and can be pressed; remembered after a reload; the tab brings it back |
| slide.meter | pc | PASS | the arrow can be pressed; the pane is off screen; a tab is left and can be pressed; remembered after a reload; the tab brings it back |
| slide.meter | phone | PASS | the arrow can be pressed; the pane is off screen; a tab is left and can be pressed; remembered after a reload; the tab brings it back |
| slide.rail | pc | PASS | the arrow can be pressed; the pane is off screen; a tab is left and can be pressed; remembered after a reload; the tab brings it back |
| slide.rail | phone | PASS | the arrow can be pressed; the pane is off screen; a tab is left and can be pressed; remembered after a reload; the tab brings it back |
| slide.track | pc | PASS | the arrow can be pressed; the pane is off screen; a tab is left and can be pressed; remembered after a reload; the tab brings it back |
| slide.transport | pc | PASS | the arrow can be pressed; the pane is off screen; a tab is left and can be pressed; remembered after a reload; the tab brings it back |
| slide.pelvy | pc | PASS | the arrow can be pressed; the pane is off screen; a tab is left and can be pressed; remembered after a reload; the tab brings it back |
| slide.tools | pc | PASS | the arrow can be pressed; the pane is off screen; a tab is left and can be pressed; remembered after a reload; the tab brings it back |
| slide.phoneDock | phone | PASS | no arrow on the dock [none] |
| stage.tap.bode | pc | PASS | taps earn [0/100 to 2/100]; the stage answers [8.68 apart] |
| stage.tap.tyde | pc | PASS | taps earn [1/100 to 3/100]; the stage answers [19.61 apart] |
| stage.tap.hinge | pc | PASS | taps earn [1/100 to 3/100]; the stage answers [0.31 apart] |
| stage.tap.cyn | pc | PASS | taps earn [1/100 to 3/100]; the stage answers [1.80 apart] |
| stage.tapCap | pc | PASS | capped at thirty [30/100] |
| keys.capitals | pc | PASS | H hides; D opens Layers; I immerses; M answers [Record first, then Mark.]; R answers [Play something first, then Record.]; F fires one [2 left]; S fires everything [0 left]; C starts a clip; C saves it |
| keys.withCtrl | pc | PASS | nothing happened |
| window.resize | pc | PASS | the stage refits; the tab stays in the window; narrow: the phone layout; wide again: the computer layout, the meter still away |
| window.kept | pc | PASS | kept [1/100 Lv 3 2 pips] |
| window.kept | phone | PASS | kept [1/100 Lv 3 2 pips] |
| phone.songs | phone | PASS | it opens; #track .filebtn can be reached; #linkBtn can be reached; #url can be reached; #loadUrl can be reached; #stopTrack can be reached; #closeTrack can be reached; #volP can be reached; #repeatP can be reached; Close shuts it; the button shuts it too; a tap on the stage shuts it |
| phone.more | phone | PASS | it opens; every control can be reached [all 5]; the Lab takes its place; Layers takes its place; a tap on the stage shuts it |
| queue.rows | pc | PASS | every song is a row, names cleaned [⋮⋮1test one×⋮⋮2test two×⋮⋮3test three×]; a tap plays that song [test three.wav]; a tap on the one playing pauses it; x drops it; the playing one plays on [1. test one.wav2. test three.wav]; the grip drags it; the playing one stays marked [1. test three.wav2. test one.wav] |
| queue.rows | phone | PASS | every song is a row, names cleaned [⋮⋮1test one×⋮⋮2test two×⋮⋮3test three×]; a tap plays that song [test three.wav]; a tap on the one playing pauses it; x drops it; the playing one plays on [1. test one.wav2. test three.wav]; the grip drags it; the playing one stays marked [1. test three.wav2. test one.wav] |
| clip.length | pc | NEEDS HIS HANDS | 2x lights alone and is said [2 / Clip length: 2 minutes.]; 3x lights alone and is said [3 / Clip length: 3 minutes.]; 1x lights alone and is said [1 / Clip length: 1 minute.]; 3x lights alone and is said [3 / Clip length: 3 minutes.]; remembered after a reload; a clip at 2x says two minutes [Recording the stage (up to 2 minutes). C or Stop clip to finish.] **His to try:** a real 2 and 3 minute clip on his PC, saved and opened in Edits (about 450 and 675 MB in memory while it records) |
| hud.touchable | pc | PASS | nothing pretends to be a control [none] |
| hud.touchable | phone | PASS | nothing pretends to be a control [none] |
| pelvy.catch | pc | PASS | he catches Echoes [12 caught]; each catch is a fifth of an Echo, on top of time [3.40 gained for 12 caught]; he roams, not parked [moved up to 738 px] |
| focus.release | pc | PASS | it is released; the HUD goes dark, Focus burns [title opacity 0.32]; the curve goes acute; after it, it eases back |
