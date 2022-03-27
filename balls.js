const MAX_SPEED = 12;
const MIN_SPEED = 0.098;

const MAX_STICK=250;

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
    this.collisionLoss = 0.98;
  }

  iAmWhite() {
    return this.type == "W";
  }

  render() {
    this.draw();
    this.update();
    
    this.checkEdges();
    //cambiar la friccion en el primer tiro para todas menos la blanca?
    this.addFriction(0.2);

    this.checkCollide(yel_balls);
    this.checkCollide(blue_balls);
    this.checkCollide([whiteBall]);
    this.checkCollide([blackBall]);

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
    balls.forEach((other) => {
      if (other.id != this.id) {
        //let distance = p5.Vector.sub(this.position, other.position);
        let distance = dist(this.position.x, this.position.y, other.position.x, other.position.y);
        let minDistance = this.size+1;        
        if (distance <= minDistance) {
          if (
            firstCBall == "None" &&
            (other.iAmWhite() || this.iAmWhite()) &&
            isMoving
          ) {
            console.log(
              "Collision between " + other.type + " and " + this.type
            );
            firstCBall = this.iAmWhite() ? other.type : this.type;
          }

          //if(!this.iAmWhite && firstShot) this.addFriction(0.5);

          this.checkCollision(this, other);

          /*let distanceVect = p5.Vector.sub(other.position, this.position);
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
          other.addForce(currentVelocity.mult(this.collisionLoss));*/
        }
      }
    });
  }

  checkCollision(particle1, particle2) {
    let distVec = particle2.position.copy().sub(particle1.position);

    // calculate the angle
    let angle = Math.atan2(distVec.y, distVec.x);

    let mat = Ball.createRotationMatrixFromAngle(angle);
    let inverseRotation = Ball.transposeMatrix2x2(mat);

    // rotate the velocities of the particles so that the collision
    // happens on a single axis (x-axis) rather than 2 axes
    let vel1 = Ball.matrix2x2MultiplyVector2(mat, particle1.velocity.copy());
    let vel2 = Ball.matrix2x2MultiplyVector2(mat, particle2.velocity.copy());

    // collision reacton
    let vxTotal = vel1.x - vel2.x;

    vel1.x = Ball.collisionReboundSingleAxis(particle1, particle2, vel1, vel2);
    vel2.x = vxTotal + vel1.x;

    // particles often get stuck if they are going the same direction
    // a dot product greater than zero means they are going the same direction
    // reversing the velocity of one of the particles helps to keep them from getting stuck
    if (vel1.dot(vel2) > 0) vel1.x *= -1;

    // position adjustment
    let particle1Adjustment = Ball.matrix2x2MultiplyVector2(
      inverseRotation,
      createVector(0, 0)
    );
    particle1.position = particle1.position.copy().add(particle1Adjustment);
    particle2.position = particle1.position.copy().add(distVec);

    // rotate velocity back
    let reboundVelocity1 = Ball.matrix2x2MultiplyVector2(inverseRotation, vel1);        
    let reboundVelocity2 = Ball.matrix2x2MultiplyVector2(inverseRotation, vel2);

    if (reboundVelocity1.mag() > MAX_SPEED) {
      reboundVelocity1.setMag(MAX_SPEED);
    }

    if (reboundVelocity2.mag() > MAX_SPEED) {
      reboundVelocity2.setMag(MAX_SPEED);
    }
    particle1.velocity = reboundVelocity1;
    particle2.velocity = reboundVelocity2;
  }

  addFriction(c) {
    let friction = this.velocity.copy();
    friction.mult(-1);
    friction.setMag(c);
    this.addForce(friction);
  }

  drawStick() {
    push();
      let begin = new p5.Vector();
      begin = whiteBall.position.copy();

      let mousePos = createVector(mouseX, mouseY);
      let vx = (begin.x - mousePos.x);
      let vy = (begin.y - mousePos.y);
      let direction = createVector(vx, vy);

      if (direction.mag() > MAX_STICK) {
        direction.setMag(MAX_STICK);
      }

      //HINT LINE
      strokeWeight(1);
      stroke(255);    
      line(begin.x, begin.y, begin.x + direction.x, begin.y + direction.y);

      //STICK      
      strokeWeight(15);
      stroke(color(140, 20, 20));
      line(mouseX, mouseY, begin.x - direction.x/5, begin.y - direction.y/5);

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
              color_player.setLastHole(other.id);
            }
            break;

          case "B":
            index = blue_balls.indexOf(this);
            blue_balls.splice(index, 1);

            color_player.balls--;

            if (color_player.balls == 0) {
              color_player.setLastHole(other.id);
            }
            break;
          case "K":
            this.color.setAlpha(0);
            blackBallIn(other.id);
            gameOver = true;
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






  //eliminar todas las funciones static de aquí abajo
  static createRotationMatrixFromAngle(theta) {
    let c = Math.cos(theta);
    let s = Math.sin(theta);
    return [c, s, -s, c];
  }

  static matrix2x2MultiplyVector2(matrix, vector) {
    let MatrixRow1Vec = createVector(matrix[0], matrix[1]);
    let MatrixRow2Vec = createVector(matrix[2], matrix[3]);

    return createVector(vector.dot(MatrixRow1Vec), vector.dot(MatrixRow2Vec));
  }

  static transposeMatrix2x2(matrix) {
    return [matrix[0], matrix[2], matrix[1], matrix[3]];
  }

  static collisionReboundSingleAxis(particle1, particle2) {
    let collisionForce = particle2.velocity.x;
    return collisionForce;
  }
}
