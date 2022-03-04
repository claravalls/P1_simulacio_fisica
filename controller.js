let xStart;
let ystart;

function newBall(a) {
  balls[index++] = new Ball(a);
}

/*function mousePressed() {
  xStart = mouseX;
  yStart = mouseY;
  hintBall = new Ball();
  hintBall.color = color(255, 255, 255);
  hintLine = new Line();
}

function mouseReleased() {
  let a = createVector((xStart - mouseX) / 5, (yStart - mouseY) / 5);
  newBall(a);
  hintBall = 0;
}
*/
class Line {
  constructor() {
    this.origin = createVector(mouseX, mouseY);
    this.end = createVector(mouseX, mouseY);
  }

  updateLine() {
    this.end = createVector(mouseX, mouseY);
  }

  render() {
    line(this.origin.x, this.origin.y, this.end.x, this.end.y);
  }
}
