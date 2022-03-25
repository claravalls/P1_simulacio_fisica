let yel_balls = [];
let blue_balls = [];
let data = {};

let index = 0;
let frame = 35;
let tableHeight = 360;
let borders = [];

let player1;
let player2;
let firstCBall;
let firstCollide;
let firstBall;
let isMoving;

let whiteBall;
let blackBall;

let aux_whiteBall;
let aux_blackBall;
let aux_yelBalls = [];
let aux_blueBalls = [];

let holes = [];
let gameOver;
let doubleTurn;
let showDoubleTurn;

const PLAYERS_HEIGHT = 150;

function setup() {
  createCanvas(600, 360 + PLAYERS_HEIGHT);
  preload();
  background(255, 255, 255);
  borders.push(frame, frame, width - frame, height - frame - PLAYERS_HEIGHT);
  firstCollide = true;
  firstBall = true;
  firstCBall = "None";
  isMoving = false;
  gameOver = 0;
  doubleTurn = false;
}

function draw() {
  createTable();
  showPlayers();

  for (i = 0; i < holes.length; i++) {
    holes[i].render();
  }

  if (checkBallsMoving()) {
    isMoving = true;
    doubleTurn = false;

    firstCollide = whiteBall.renderMovement(firstCollide);
    blackBall.renderMovement(false);

    for (i = 0; i < yel_balls.length; i++) {
      yel_balls[i].renderMovement(false);
    }

    for (i = 0; i < blue_balls.length; i++) {
      blue_balls[i].renderMovement(false);
    }
  } else {
    if (isMoving == true) {
      let otherPlayer;
      if (player2.turn != 0) {
        otherPlayer = player1;
      } else {
        otherPlayer = player2;
      }

      //Comprovo si ha tocat alguna bola i quina ha tocat primer
      if (
        firstCBall == "None" ||
        firstCBall == "K" ||
        firstCBall == otherPlayer.type
      ) {
        console.log("Fault: firstCBall = " + firstCBall);
        otherPlayer.doubleTurn();
      }
      firstCBall = "None";
      firstCollide = true;

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

  if (showDoubleTurn) {
    textSize(24);
    if (showDoubleTurn == 1) {
      fill(player1.color);
      text("double turn", player1.position.x + 385, player1.position.y + 20);
    } else if (showDoubleTurn == 2) {
      fill(player2.color);
      text("double turn", player2.position.x + 385, player2.position.y + 20);
    }
  }

  if (gameOver) {
    drawGameOverView();
  }
}

function preload() {
  loadJSON("assets/init.json", gotData);
  loadJSON("assets/players.json", gotDataPlayers);
}

function reset() {
  blue_balls = [];
  yel_balls = [];
  whiteBall = aux_whiteBall.copy();
  blackBall = aux_blackBall.copy();
  blackBall.color.setAlpha(1);

  aux_yelBalls.forEach((ball) => {
    yel_balls.push(ball.copy());
  });

  aux_blueBalls.forEach((ball) => {
    blue_balls.push(ball.copy());
  });

  background(255, 255, 255);
  firstCollide = true;
  firstBall = true;
  firstCBall = "None";
  gameOver = false;
  isMoving = false;
}
