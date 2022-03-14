let yel_balls = [];
let blue_balls = [];
let data = {};

let index = 0;
let frame = 35;
let tableHeight = 360;
let borders = [];

let player1;
let player2;
let firstBall;

let whiteBall;
let blackBall;

let aux_whiteBall;
let aux_blackBall;

let holes = [];

function setup() {
  createCanvas(600, 460);
  preload();
  player1 = new Player(1);
  player2 = new Player(2);
  player1.myTurn();
  borders.push(frame, frame, width - frame, height - frame);
  firstBall = true;
}

function draw() {
  createTable();
  showPlayers();
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
  loadJSON("assets/init_holes_aux.json", gotData);
  loadJSON("assets/players.json", gotDataPlayers);
}
