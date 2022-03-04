let yel_balls = [];
let blue_balls = [];
let data = {};

let index = 0;
let frame = 30;
let borders = [];

let player1;
let player2;

let whiteBall;
let blackBall;

function setup() {
  createCanvas(600, 360);
  preload();
  player1 = new Player(1);
  player2 = new Player(2);
  borders.push(frame, frame, width - 2 * frame, height - 2 * frame);
}

function draw() {
  createTable();
  whiteBall.render();
  blackBall.render();
  for (i = 0; i < yel_balls.length; i++) {
    yel_balls[i].render();
  }
  for (i = 0; i < blue_balls.length; i++) {
    blue_balls[i].render();
  }
}

function preload() {
  loadJSON("assets/init.json", gotData);
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
}

function createTable() {
  background(10, 130, 90);
  fill(117, 217, 117);
  noStroke();
  rect(borders[0], borders[1], borders[2], borders[3]);
}
