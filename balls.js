let MAX_SPEED = 15;

class Ball {
  constructor(x, y, color, radius, type) {
    this.id = index++;
    this.type = type;
    this.position = createVector(x, y);
    this.color = color;
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.mass = 1;
    this.size = radius;
    this.collisionLoss = 0.9;
    //this.iAmWhite = rgb.r == 255 && rgb.g == 255 && rgb.b == 255;
  }

  iAmWhite() {
    return this.type == "W";
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

    this.checkEdges();
    this.addFriction(0.1);

    if (this.iAmWhite()) {
      if (showStick) {
        this.drawStick();
      }
      if (shotWhite) {
        this.shotWhiteBall();
      }
    }
    this.checkHoles();
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  addForce(force) {
    if (force.mag() > MAX_SPEED) {
      force.setMag(MAX_SPEED);
    }
    var f = force.div(this.mass);
    this.acceleration.add(f);
  }
  checkEdges() {
    if (this.position.y > borders[3] - this.size / 2) {
      this.velocity.y *= -0.9;
      this.position.y = borders[3] - this.size / 2;
    }
    if (this.position.y < borders[1] + this.size / 2) {
      this.velocity.y *= -0.9;
      this.position.y = borders[1] + this.size / 2;
    }
    if (this.position.x >= borders[2] - this.size / 2) {
      this.velocity.x *= -0.9;
      this.position.x = borders[2] - this.size / 2;
    }
    if (this.position.x < borders[0] + this.size / 2) {
      this.velocity.x *= -0.9;
      this.position.x = borders[0] + this.size / 2;
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

  drawStick() {
    //palo mejorable
    let stickLength = 200;
    let whiteStickLength = 30;

    push();
    //translate(center.x, center.y);
    //Falta aplicar el angulo para tener el palo pues eso angulado xd
    fill(color(140, 20, 20));
    rect(mouseX - stickLength, mouseY - 5, stickLength, 10);
    fill(color(255, 255, 255));
    rect(mouseX - whiteStickLength, mouseY - 5, whiteStickLength, 10);

    //hint line
    stroke(255, 255, 255);
    line(this.position.x, this.position.y, mouseX, mouseY);
    pop();
  }

  shotWhiteBall() {
    let mousePos = createVector(mouseX, mouseY);
    let vx = (this.position.x - mousePos.x) / 5;
    let vy = (this.position.y - mousePos.y) / 5;
    let direction = createVector(vx, vy);

    this.addForce(direction);
    shotWhite = false;
  }

  copy() {
    return new Ball(
      this.position.x,
      this.position.y,
      this.color,
      this.size,
      this.type
    );
  }

  checkHoles() {
    holes.forEach((other) => {
      let distance = p5.Vector.sub(this.position, other.position);
      let minDistance = other.size;
      if (distance.mag() < minDistance) {
        if (firstBall && this.type != "W" && this.type != "K  ") {
          if (player1.turn > 0) {
            let otherColor = player1.setColor(this.type);
            player2.setColor(otherColor);
            firstBall = false;
          } else {
            let otherColor = player2.setColor(this.type);
            player1.setColor(otherColor);
          }
          firstBall = false;
        }

        switch (this.type) {
          case "Y":
            index = yel_balls.indexOf(this);
            console.log(index + ": Yel deleted with id " + this.id);
            yel_balls.splice(index, 1);
            break;
          case "B":
            index = blue_balls.indexOf(this);
            console.log(index + ": Blue deleted with id " + this.id);
            blue_balls.splice(index, 1);
            break;
          case "K":
            this.color.setAlpha(0);
            //blackBallIn();
            break;
          case "W":
            this.color.setAlpha(0);
            whiteBallIn();
            break;

          default:
            break;
        }
        //this.dissappear;

        //this.color = color(150, 150, 150);
      }
    });
  }
}
