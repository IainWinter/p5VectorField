var numVectorsX;
var numVectorsY;
var offSet = 50;
var strength = 6;

var pScale = 750;
var pOffSet = 0;
var pDeltaOffSet = 5;

var particles = [];

var mouseDown = false;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  numVectorsX = round(width / offSet) + 1;
  numVectorsY = round(height / offSet) + 1;
}

function draw() {
  background(255);

  pOffSet += pDeltaOffSet;

  //Create new particles if mouse is down
  if(mouseDown) {
    particles.push(new Particle(mouseX, mouseY));
  }

  //Particles
  for (var i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();

    //Remove if off screen
    if(particles[i].isOffScreen()) {
      particles.splice(i, 1);
      i--;
    }
  }

  //Lines
  for (var x = 0; x < numVectorsX; x++) {
    for (var y = 0; y < numVectorsY; y++) {
      var v = getVector(x, y, 1);
      var x1 = x * offSet;
      var y1 = y * offSet;
      var x2 = v.x * offSet + x1;
      var y2 = v.y * offSet + y1;
      line(x1, y1, x2, y2);
    }
  }
}

function mousePressed() {
  mouseDown = true;
}

function mouseReleased() {
  mouseDown = false;
}

function getVector(x, y, scale) {
  var mx = map(x / scale, 0, numVectorsX, -width  / 2, width  / 2);
  var my = map(y / scale, 0, numVectorsY, -height / 2, height / 2);
  return f(mx, my);
}

function f(x, y) {
  var theta = map(noise((x + pOffSet) / pScale, (y + pOffSet) / pScale), 0, 1, 0, TWO_PI);
  return createVector(cos(theta), sin(theta));
}
