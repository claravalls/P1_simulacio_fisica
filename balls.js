  class Ball {
    constructor(x,y,color,radius) {
      this.id = index;
      this.position = createVector(x,y);
      this.color = color;
      this.velocity = createVector(0, 0);
      this.acceleration = createVector(0, 0);
      this.mass = 1;
      this.size = radius;
      this.collisionLoss = 1;
    }

    render() {
      noStroke;
      fill(this.color);
      ellipse(this.position.x, this.position.y, this.size);

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
      if (this.position.y > height) {
        this.velocity.y *= -1;
        this.position.y = height;
      }
      if (this.position.y < 0) {
        this.velocity.y *= -1;
        this.position.y = 0;
      }
      if (this.position.x >= width) {
        this.velocity.x *= -1;
        this.position.x = width;
      }
      if (this.position.x < 0) {
        this.velocity.x *= -1;
        this.position.x = 0;
      }
    }

    checkCollide() {
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
