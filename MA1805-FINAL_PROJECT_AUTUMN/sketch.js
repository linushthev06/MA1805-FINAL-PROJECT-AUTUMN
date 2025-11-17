// arrays to store the particle "data shadows"
let particles = [];
let dataWords = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(10);   // dark background for glowing effect
}

function draw() {
  background(10, 10, 10, 25);  // low alpha to create fade effect

  // Draw all particles
  for (let p of particles) {
    p.update();
    p.show();
  }

  // Draw all data words
  for (let w of dataWords) {
    w.update();
    w.show();
  }
}

// When mouse moves, add particles to simulate a data shadow
function mouseMoved() {
  for (let i = 0; i < 5; i++) {
    particles.push(new Particle(mouseX, mouseY));
  }
}

// When user types, add their text as floating “data”
function keyTyped() {
  dataWords.push(new DataWord(key, mouseX, mouseY));
}

// Particle class for shadow traces
class Particle {
  constructor(x, y) {
    this.x = x + random(-5, 5);
    this.y = y + random(-5, 5);
    this.size = random(5, 20);
    this.alpha = 255;
    this.xSpeed = random(-1, 1);
    this.ySpeed = random(-1, 1);
  }

  update() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    this.alpha -= 3; // fade
  }

  show() {
    noStroke();
    fill(100, 200, 255, this.alpha); // glowing blue
    ellipse(this.x, this.y, this.size);
  }
}

// DataWord class for floating text from keypresses
class DataWord {
  constructor(letter, x, y) {
    this.letter = letter;
    this.x = x;
    this.y = y;
    this.alpha = 255;
    this.ySpeed = random(-0.5, -2);
  }

  update() {
    this.y += this.ySpeed;
    this.alpha -= 2;
  }

  show() {
    noStroke();
    fill(255, 255, 255, this.alpha);
    textSize(24);
    text(this.letter, this.x, this.y);
  }
}

// Resize canvas if window changes
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
