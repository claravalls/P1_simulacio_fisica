class Player {
  constructor(id, x, y, rgb) {
    this.id = id;
    this.position = createVector(x, y);
    this.balls = 7;
    this.color = 255; //color(rgb.r, rgb.g, rgb.b);
    this.turn = 0;
    this.shape = 1;
    this.type = "";
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
    this.turn++;
  }

  endTurn() {
    this.turn--;
  }

  changeTurn(otherPlayer) {
    switch (this.turn) {
      case 0:
        if (otherPlayer.turn > 1) {
          otherPlayer.endTurn();
          console.log("Player " + otherPlayer.id + " turn");
        } else {
          this.myTurn();
          console.log("Player " + this.id + " turn");
          otherPlayer.endTurn();
        }
        break;
      case 1:
        this.endTurn();
        otherPlayer.myTurn();
        console.log("Player " + otherPlayer.id + " turn");

        break;

      default:
        this.endTurn();
        console.log("Player " + this.id + " turn");
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
