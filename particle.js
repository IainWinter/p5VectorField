function Particle(x, y) {
  this.x = x;
  this.y = y;
  this.size = 10;
  this.halfSize = this.size / 2;
}

Particle.prototype.update = function () {
  this.v = getVector(this.x, this.y, offSet);
  this.x += this.v.x * strength;
  this.y += this.v.y * strength;
};

Particle.prototype.draw = function () {
  var x = this.x - this.halfSize;
  var y = this.y - this.halfSize;
  ellipse(x, y, this.size, this.size);
  line(x, y, x + this.v.x * offSet, y + this.v.y * offSet);
};

Particle.prototype.isOffScreen = function () {
  return this.x - this.halfSize > width
      || this.x + this.halfSize < 0
      || this.y - this.halfSize > height
      || this.y + this.halfSize < 0;
};
