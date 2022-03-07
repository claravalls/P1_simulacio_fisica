class Ball {
  constructor(x, y, rgb, radius) {
    this.id = index++;
    this.position = createVector(x, y);
    this.color = color(rgb.r, rgb.g, rgb.b);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.mass = 1;
    this.size = radius;
    this.collisionLoss = 1;
    this.iAmWhite = rgb.r == 255 && rgb.g == 255 && rgb.b == 255;
  }

  render() {
    this.checkCollide(yel_balls);
    this.checkCollide(blue_balls);
    this.checkCollide([whiteBall]);
    this.checkCollide([blackBall]);

    this.update();

    noStroke;
    fill(color(this.color));
    ellipse(this.position.x, this.position.y, this.size);

    holes.forEach((element) => {
      element.isInside(this.position);
    });
    this.checkEdges();
    this.addFriction(0.1);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  addForce(force) {
    var f = force.div(this.mass);
    this.acceleration.add(f);
  }
  checkEdges() {
    if (this.position.y > borders[3]) {
      this.velocity.y *= -0.9;
      this.position.y = borders[3];
    }
    if (this.position.y < borders[1]) {
      this.velocity.y *= -0.9;
      this.position.y = borders[1];
    }
    if (this.position.x >= borders[2]) {
      this.velocity.x *= -0.9;
      this.position.x = borders[2];
    }
    if (this.position.x < borders[0]) {
      this.velocity.x *= -0.9;
      this.position.x = borders[0];
    }
  }

  checkCollide(balls) {
    balls.forEach((other) => {
      if (other.id != this.id) {
        let distance = p5.Vector.sub(this.position, other.position);
        let minDistance = (this.size + other.size) / 2;
        if (distance.mag() < minDistance) {
          let distanceVect = p5.Vector.sub(other.position, this.position);
          let distanceCorrection = (minDistance - distance.mag()) / 2.0;
          let d = distanceVect.copy();
          let correctionVector = d.normalize().mult(distanceCorrection);

          other.position.add(correctionVector);
          this.position.sub(correctionVector);

          let currentVelocity = this.velocity.copy();
          let otherCurrentVelocity = other.velocity.copy();

          this.addForce(currentVelocity.mult(-1));
          this.addForce(otherCurrentVelocity.mult(this.collisionLoss));

          other.addForce(otherCurrentVelocity.mult(-1));
          other.addForce(otherCurrentVelocity.mult(this.collisionLoss));
        }
      }
    });
  }

  addFriction(c) {
    let friction = this.velocity.copy();
    friction.mult(-1);
    friction.setMag(c);
    this.addForce(friction);
  }
}
