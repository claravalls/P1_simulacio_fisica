class Player {
  constructor(id) {
    this.id = id;
    this.balls = 7;
    this.color = "";
    this.turn = 0;
  }

  setColor(color) {
    this.color = color;
    console.log(this.color == "Y");
    if (this.color == "Y") {
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
}
