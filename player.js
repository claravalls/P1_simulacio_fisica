class Player {
  constructor(id, x, y, rgb) {
    this.id = id;
    this.position = createVector(x, y);
    this.balls = 7;
    this.color = 255; //color(rgb.r, rgb.g, rgb.b);
    this.turn = 0;
    this.shape = 1;
    this.type = "";
    this.lastHole = 0;
  }

  setColor(type) {
    this.type = type;
    if (this.type == "Y") {
      return "B";
    } else {
      return "Y";
    }
  }

  myTurn() {
    if (this.turn < 2) {
      this.turn++;
    }
  }

  endTurn() {
    this.turn--;
  }

  doubleTurn() {
    this.turn = -1;
  }

  changeTurn(otherPlayer) {
    switch (this.turn) {
      case -1:
        this.turn = 2;
        otherPlayer.turn = 0;
        console.log("Player " + this.id + " turn");
        break;

      case 0:
        switch (otherPlayer.turn) {
          case 1:
            this.myTurn();
            otherPlayer.endTurn();
            console.log("Player " + this.id + " turn");
            break;

          case 2:
            otherPlayer.endTurn();
            console.log("Player " + otherPlayer.id + " turn");
            break;

          default:
            console.log(
              "Invalid turns: player" +
                this.id +
                " = " +
                this.turn +
                " and player" +
                otherPlayer.id +
                " = " +
                otherPlayer.turn
            );
            break;
        }
        break;
      case 1:
        switch (otherPlayer.turn) {
          case 0:
            this.endTurn();
            otherPlayer.myTurn();
            console.log("Player " + otherPlayer.id + " turn");
            break;

          case -1:
            otherPlayer.turn = 2;
            this.turn = 0;
            console.log("Player " + otherPlayer.id + " turn");
            break;
          default:
            console.log(
              "Invalid turns: player" +
                this.id +
                " = " +
                this.turn +
                " and player" +
                otherPlayer.id +
                " = " +
                otherPlayer.turn
            );
            break;
        }
        break;

      case 2:
        switch (otherPlayer.turn) {
          case 0:
            this.endTurn();
            console.log("Player " + this.id + " turn");
            break;
          case -1:
            this.turn = 0;
            otherPlayer.turn = 2;
            console.log("Player " + otherPlayer.id + " turn");
            break;

          default:
            console.log(
              "Invalid turns: player" +
                this.id +
                " = " +
                this.turn +
                " and player" +
                otherPlayer.id +
                " = " +
                otherPlayer.turn
            );
            break;
        }
    }
  }

  ballFilled() {
    this.balls = this.balls - 1;
    if (this.balls < 0) this.balls = 0;
  }

  showShape() {
    //noStroke;
    let shape_size = 20;
    fill(this.color);
    stroke(0);
    ellipse(this.position.x, this.position.y, shape_size, shape_size);
    arc(
      this.position.x,
      this.position.y + shape_size * 2,
      shape_size * 2,
      shape_size * 2 + 10,
      PI,
      TWO_PI
    );
  }
}
