let xStart;
let ystart;

let showStick;
let shotWhite;

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


function mousePressed(){
  shotWhite = false;
  xStart = mouseX;
  yStart = mouseY;
  
  console.log
  if(checkWhiteClick()){
    showStick = true;
  }else{
    showStick = false;
  }

  lastMousePressed = false;
}

function mouseReleased(){
  showStick = false;
  shotWhite = true;
}
function mouseDragged() {
  showStick = true;
}


function checkWhiteClick(){
  if(mouseX > (whiteBall.position.x - whiteBall.size) && 
  mouseY > (whiteBall.position.y - whiteBall.size) && 
  mouseX < (whiteBall.position.x + whiteBall.size) && 
  mouseY < (whiteBall.position.y + whiteBall.size)){
    return true;
  }else{
    return false;
  }
  
}
