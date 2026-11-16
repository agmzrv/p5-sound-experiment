let osc, playing, freq, amp;

function setup() {
  describe("a sketch that demonstrates the frequency and amplitude parameters of an oscillator.");
  let cnv = createCanvas(100, 100);
  cnv.mousePressed(playOscillator);
  osc = new p5.Oscillator();
}

function draw() {
  background(220)
  freq = constrain(map(mouseX, 0, width, 100, 500), 100, 500);
  amp = constrain(map(mouseY, height, 0, 0, 1), 0, 1);
  text('tap to play', 20, 20);
  text('freq: ' + freq, 20, 40);
  text('amp: ' + amp, 20, 60);

  if (playing) {
    //smooth the frequency transition over 0.1 seconds
    osc.freq(freq, 0.1);
    osc.amp(amp);
  }
}

function playOscillator() {
  // starting an oscillator on a user interaction like mousePressed() will enable audio in browsers that have a strict autoplay policy (most browsers).
  osc.start();
  playing = true;
}

function mouseReleased() {
  //lower volume to 0 over 0.1 seconds
  osc.amp(0, 0.1);
  playing = false;
}
