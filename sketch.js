let osc, playing, freq, amp;



const WAVE_TYPES = ['sine', 'triangle', 'sawtooth', 'square'];
let currentWaveIndex = 0;
let wavePhase = 0;

function setup() {
  
  describe("An interactive visual synthesizer that modifies frequency, amplitude, and wave types.");
  let cnv = createCanvas(600, 400);
  cnv.mousePressed(playOscillator);
  osc = new p5.Oscillator('sine');

}

function draw() {
  
  freq = constrain(map(mouseX, 0, width, 110, 880), 110, 880);
  amp = constrain(map(mouseY, height, 0, 0, 0.8), 0, 0.8);
  

  let bgRed = map(freq, 110, 880, 20, 180);
  let bgBlue = map(freq, 110, 880, 120, 220);
  background(bgRed, 35, bgBlue);

  drawSoundWave();
  drawInterface();

  // BEGIN cited code
  if (playing) {
    osc.freq(freq, 0.1);
    osc.amp(amp);
  }
  
}

function drawSoundWave() {
  noFill();
  stroke(0, 255, 180);
  strokeWeight(3);

  beginShape();
  for (let x = 0; x <= width; x += 10) {
    let angle = wavePhase + (x * freq) * 0.0005;
    let waveHeight = playing ? amp * 140 : 5;
    let y = height / 2 + sin(angle) * waveHeight;
    vertex(x, y);
  }
  endShape();

  if (playing) {
    wavePhase += 0.15;
  }
}

function drawInterface() {
  noStroke();
  fill(255);
  textSize(16);
  text('Hold mouse button to play | Press SPACE to change wave type', 20, 30);
  
  textSize(14);
  fill(0, 255, 180);
  text('Frequency: ' + Math.round(freq) + ' Hz', 20, 65);
  text('Volume (Amp): ' + amp.toFixed(2), 20, 90);
  text('Wave Type: ' + WAVE_TYPES[currentWaveIndex].toUpperCase(), 20, 115);
  text('Status: ' + (playing ? 'PLAYING' : 'PAUSED'), 20, 140);
}

function keyPressed() {
  if (key === ' ') {
    currentWaveIndex = (currentWaveIndex + 1) % WAVE_TYPES.length;
    osc.setType(WAVE_TYPES[currentWaveIndex]);
  }
}


function playOscillator() {
  osc.start();
  playing = true;
}

function mouseReleased() {
  osc.amp(0, 0.1);
  playing = false;
}
