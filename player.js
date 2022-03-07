class Player {
  constructor(id) {
    this.id = id;
    this.balls = 7;
    this.color = "";
    this.turn = 0;
  }

  setColor(color) {
    this.color = color;
  }

  myTurn() {
    this.turn++;
  }

  endTurn() {
    this.turn--;
  }
}
