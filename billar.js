let yel_balls = [];
let blue_balls = [];
let data = {};

let index = 0;
let frame = 35;
let borders = [];

let player1;
let player2;

let whiteBall;
let blackBall;

let holes = [];

function setup() {
  createCanvas(600, 360);
  preload();
  player1 = new Player(1);
  player2 = new Player(2);
  borders.push(frame, frame, width - frame, height - frame);
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
  for (i = 0; i < holes.length; i++) {
    holes[i].render();
  }
}

function preload() {
  loadJSON("assets/aux_init.json", gotData);
}
