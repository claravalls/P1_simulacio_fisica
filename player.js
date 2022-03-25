class Player {
  constructor(id, x, y, rgb) {
    this.id = id;
    this.position = createVector(x, y);
    this.balls = 7;
    this.color = color(rgb.r, rgb.g, rgb.b);
    this.turn = 0;
    this.shapeFilled = 1;
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

  showShape() {

    let shape_size = 20;    
    //TEXT 
    textSize(16);   
    fill(0);
    noStroke();
    text('P'+this.id, this.position.x - 40, this.position.y + 10);

    if (this.turn){
      noStroke;
      fill(this.color); 
    } else{ 
      fill(255);
      stroke(this.color);
    }
    //SHAPE
    ellipse(this.position.x, this.position.y, shape_size, shape_size);
    arc(
      this.position.x,
      this.position.y + shape_size * 2,
      shape_size * 2,
      shape_size * 2 + 10,
      PI,
      TWO_PI
    );

    //BALLS TO FILL
    let seven = 7;
    let offset = 50;
    while(seven){
      fill(255);
      stroke(this.color);
      ellipse(this.position.x + offset, this.position.y + shape_size/2, 30, 30);
      seven = seven - 1;
      offset = offset + 50;
    }

    //BALLS FILLED
    let balls_left = 7 - this.balls;

    offset = 50;
    while(balls_left){
      fill(this.color);
      ellipse(this.position.x + offset, this.position.y + shape_size/2, 30, 30);
      balls_left = balls_left - 1;
      offset = offset + 50;
    }
  }

  winnerPlayer(){
    textSize(24);
    fill('green');
    text('WINNER', this.position.x + 400, this.position.y + 20);
  }
}
