let xStart;
let ystart;

/*function mousePressed() {
  xStart = mouseX;
  yStart = mouseY;
  hintBall = new Ball();
  hintBall.color = color(255, 255, 255);
  hintLine = new Line();
}

function mouseReleased() {
  let a = createVector((xStart - mouseX) / 5, (yStart - mouseY) / 5);
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

function gotData(data) {
  jsonData = data;
  let w_ball = data[0];
  whiteBall = new Ball(
    w_ball["x"],
    w_ball["y"],
    w_ball["color"],
    w_ball["radius"]
  );

  let black_ball = data[1];
  blackBall = new Ball(
    black_ball["x"],
    black_ball["y"],
    black_ball["color"],
    black_ball["radius"]
  );

  elements = data[2];
  for (let i = 0; i < elements.length; i++) {
    let element = elements[i];
    let b = new Ball(
      element["x"],
      element["y"],
      element["color"],
      element["radius"]
    );
    yel_balls.push(b);
  }
  elements = data[3];
  for (let i = 0; i < elements.length; i++) {
    let element = elements[i];
    let b = new Ball(
      element["x"],
      element["y"],
      element["color"],
      element["radius"]
    );
    blue_balls.push(b);
  }
  json_holes = data[4];
  for (let i = 0; i < json_holes.length; i++) {
    let element = json_holes[i];
    let h = new Hole(element["id"], createVector(element["x"], element["y"]));
    holes.push(h);
  }
}

function createTable() {
  background(10, 130, 90);
  fill(117, 217, 117);
  noStroke();
  rect(borders[0], borders[1], borders[2], borders[3]);
}
