class Player {
  constructor(id, x, y, rgb) {
    this.id = id;
    this.position = createVector(x, y);
    this.balls = 7;
    this.color = 255;//color(rgb.r, rgb.g, rgb.b);
    this.turn = 0;
    this.shape = 1;
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

  ballFilled(){
    this.balls = this.balls - 1;
    if (this.balls < 0) this.balls = 0;
  }

  showShape(){    
    let shape_size = 20;
    fill(this.color);
    stroke(0);
    ellipse(this.position.x, this.position.y, shape_size, shape_size);
    arc(this.position.x, this.position.y + shape_size*2, shape_size*2, shape_size*2+10, PI, TWO_PI);
  }
}
