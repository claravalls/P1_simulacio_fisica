const MAX_SPEED = 15;
const MIN_SPEED = 0.09;

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
    this.collisionLoss = 0.95;
  }

  iAmWhite() {
    return this.type == "W";
  }

  renderMovement(first) {
    this.checkCollide(yel_balls);
    this.checkCollide(blue_balls);

    let c = this.checkCollide([whiteBall]);

    if (c != "None") {
      first = false;
      firstCBall = c;
    }
    this.checkCollide([blackBall]);

    this.update();
    this.draw();

    this.checkEdges();
    this.addFriction(0.2);

    if (this.iAmWhite()) {
      if (showStick) {
        this.drawStick();
      }
      if (shotWhite) {
        this.shotWhiteBall();
      }
    }

    this.checkHoles();
    return first;
  }

  renderStop() {
    this.update();
    this.draw();

    this.addFriction(0.2);

    if (this.iAmWhite()) {
      if (showStick) {
        this.drawStick();
      }
      if (shotWhite) {
        this.shotWhiteBall();
      }
    }
  }

  draw() {
    noStroke();
    fill(color(this.color));
    ellipse(this.position.x, this.position.y, this.size);
  }

  update() {
    this.velocity.add(this.acceleration);
    if (this.velocity.mag() < MIN_SPEED) {
      this.velocity.mult(0);
    }
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
      this.velocity.y *= -1;
      this.position.y = borders[3] - this.size / 2;
    }
    if (this.position.y < borders[1] + this.size / 2) {
      this.velocity.y *= -1;
      this.position.y = borders[1] + this.size / 2;
    }
    if (this.position.x >= borders[2] - this.size / 2) {
      this.velocity.x *= -1;
      this.position.x = borders[2] - this.size / 2;
    }
    if (this.position.x < borders[0] + this.size / 2) {
      this.velocity.x *= -1;
      this.position.x = borders[0] + this.size / 2;
    }
  }

  checkCollide(balls) {
    let collide = "None";
    balls.forEach((other) => {
      if (other.id != this.id) {
        let distance = p5.Vector.sub(this.position, other.position);
        let minDistance = (this.size + other.size) / 2;
        if (distance.mag() <= minDistance) {
          if (collide == "None" && other.iAmWhite()) {
            console.log(
              "Collision between " + other.type + " and " + this.type
            );
            collide = this.type;
          }
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
    return collide;
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
    noStroke();
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
        if (firstBall && this.type != "W" && this.type != "K") {
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

        let otherPlayer;
        if (player2.turn != 0) {
          otherPlayer = player1;
        } else {
          otherPlayer = player2;
        }

        let color_player;
        if (player2.type == this.type) {
          color_player = player2;
        } else {
          color_player = player1;
        }

        switch (this.type) {
          case "Y":
            index = yel_balls.indexOf(this);
            yel_balls.splice(index, 1);

            color_player.balls--;
            console.log(
              color_player.balls +
                " balls remaining for player " +
                color_player.id
            );

            if (color_player.balls == 0) {
              color_player.lastHole = other.id;
            }
            break;

          case "B":
            index = blue_balls.indexOf(this);
            blue_balls.splice(index, 1);

            color_player.balls--;
            console.log(
              color_player.balls +
                " balls remaining for player " +
                color_player.id
            );

            if (color_player.balls == 0) {
              color_player.lastHole = other.id;
            }
            break;
          case "K":
            this.color.setAlpha(0);
            blackBallIn(other.id);
            break;

          case "W":
            this.color.setAlpha(0);
            whiteBallIn();
            otherPlayer.doubleTurn();
            break;
        }
      }
    });
  }
}
