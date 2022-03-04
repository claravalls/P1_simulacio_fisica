let balls = [];
let data = {};

let index = 0;
let border = 30;

let player1;
let player2;

function setup() {
  createCanvas(600, 360);
  preload();
}

function draw() {
  createTable();

  for (i = 0; i < balls.length; i++) {
    balls[i].checkCollide();
    balls[i].update();
    balls[i].render();
    balls[i].checkEdges();

    balls[i].addFriction(0.1);
  }
}

function preload() {
  loadJSON("assets/init.json", gotData);
}

function gotData(data) {
  for (let i = 0; i < data.length; i++) {
    console.log(i);
    const element = data[i];
    let m = new Ball(
      element["x"],
      element["y"],
      element["color"],
      element["radius"]
    );
    balls.push(m);
  }
}

function createTable() {
  background(10, 130, 90);
  fill(33, 204, 33);
  noStroke();
  rect(border, border, width - 2 * border, height - 2 * border);
}
