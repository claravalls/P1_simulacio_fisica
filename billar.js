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
let isMoving;

let whiteBall;
let blackBall;

let aux_whiteBall;
let aux_blackBall;

let holes = [];
const PLAYERS_HEIGHT = 150;

function setup() {
  createCanvas(600, 360 + PLAYERS_HEIGHT);
  preload();
  background(255, 255, 255);
  borders.push(frame, frame, width - frame, height - frame - PLAYERS_HEIGHT);
  firstBall = true;
  isMoving = false;
}

function draw() {
  createTable();
  showPlayers();

  for (i = 0; i < holes.length; i++) {
    holes[i].render();
  }

  if (checkBallsMoving()) {
    isMoving = true;

    whiteBall.renderMovement();
    blackBall.renderMovement();

    for (i = 0; i < yel_balls.length; i++) {
      yel_balls[i].renderMovement();
    }

    for (i = 0; i < blue_balls.length; i++) {
      blue_balls[i].renderMovement();
    }
  } else {
    if (isMoving == true) {
      player1.changeTurn(player2);
      isMoving = false;
    }

    whiteBall.renderStop();
    blackBall.renderStop();

    for (i = 0; i < yel_balls.length; i++) {
      yel_balls[i].renderStop();
    }

    for (i = 0; i < blue_balls.length; i++) {
      blue_balls[i].renderStop();
    }
  }
}

function preload() {
  loadJSON("assets/init.json", gotData);
  loadJSON("assets/players.json", gotDataPlayers);
}
