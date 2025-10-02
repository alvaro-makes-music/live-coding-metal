/*
===================================================
                GOJIRA - THE CELL
===================================================
Strudel cover by cute::wire (Alvaro Caceres)
Oct 2 2025. Tlanepaltla, Mexico

https://instagram.com/cutewiremusic
https://instagram.com/alvaro.makes.music
===================================================
*/

setcpm(155/4)

let snare = "<[0 0 0 1]*4>",
// let snare = "{0 0 1}%16",
    accents  = "[1 0.65 0.8 0.65]*4",
    s1       = "F:dorian",
    dyn      = (baseGain=1, pattern=accents) => pattern.mul(baseGain),
    curve    = (signal,min,max) => signal.slow(11).rangex(min,max)

$: stack(
    n(stack(
      "<2 2  1  1 2 2  1  1  1  1  1>".gain(dyn(1)).pan(0.2),
      "<0 0 -1 -2 0 0 -1 -2 -2 -2 -2>".gain(dyn(0.8)).pan(0.5),
      "<6 6  6  5 6 6  6  5  5  5  5>".gain(dyn(1)).pan(0.8)
      ))
        .ply(16)
        .scale(s1)
        .s("square").lpf(6000).hpf(375).decay(curve(cosine,0.09,0.12))
        .orbit(1),
    n("<0 0 -1 -2 0 0 -1 -2 -2 -2 -2>".sub(7))
      .scale(s1)
      .s("sawtooth")
      .shape(0.25)
      .lpf(curve(cosine,1000,12000))
      .gain(0.5)
      .orbit(2),
    n("<0 0 -1 -2 0 0 -1 -2 -2 -2 -2>".sub("7,14"))
      .scale(s1)
      .s("sine")
      .attack(0.2)
      .orbit(3)
      .gain(0.6),
    s("sd:3").struct(snare).speed(rand.range(1,0.96).fast(16)).cut(0.7)
      .bank("bossdr550")
      .pan(0.25)
      .gain(0.35),
    s("hh:4*8").speed("[0.95 0.9]*4")
      .gain(dyn(0.8,"[1 0.3]*4"))
      .pan(0.75),
    s("bd*16")
      .bank("bossdr550")
      .shape(0.15)
      .mask(inv(snare))
      .gain(dyn(0.5))
      .duckorbit("1:2:3")
      .duckattack(0.01)
      .duckdepth(0.2),
    s("cr:1/11")
      .attack(0.0125)
      .lpf(10000)
      .gain(0.8)
)