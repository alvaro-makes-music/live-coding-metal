// Meshuggah - New Millenium Cyanide Christ
// Intro riff
// Transcribed by Alvaro Caceres
// alvaro.makes.music@gmail.com

let
  bd = note("c2"), ch = note("a5"), sn = note("cs2"),
  c1 = note("f5"), c2 = note("g5"),
  bass = 1, synth = 3, drums = 2

setcpm(154/4)

let
  shuggify = x => x.pace(16).restart("t/8"),
  riff = shuggify("0 0 0 1 @ @ 0 @ 0 @ 0 0 0 1 @ @ 0 @ 0 @ 0 0 0"),
  pitch = riff.mul(2).add("bf1"),
  rhythm = riff.range(1,1)

$chorus: stack( 
  note(stack(riff,pitch)).midichan(bass),
  note(pitch.add(12))
    .ccn("0").ccv(riff)
    .midichan(synth),
  stack(
    bd.struct(rhythm),
    ch.struct("1*4"),
    c1.struct("1/8"),
    c2.struct("<1 ~ ~ ~ 1 ~ ~ 1>"),
    sn.struct("~ <1!7 [1 0 0 1 0 0 1 1]>")
      .gain("~ <1!7 [1 ~ ~ 0.9 ~ 0.8 0.9 1]>"),
  ).midichan(drums)
).velocity(1).midi()