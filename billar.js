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

let holes = [];

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
}

function draw() {
  createTable();
  showPlayers();

  for (i = 0; i < holes.length; i++) {
    holes[i].render();
  }

  if (checkBallsMoving()) {
    isMoving = true;

    firstCollide = whiteBall.renderMovement(firstCollide);
    firstCollide &= blackBall.renderMovement(firstCollide);

    for (i = 0; i < yel_balls.length; i++) {
      firstCollide &= yel_balls[i].renderMovement(firstCollide);
    }

    for (i = 0; i < blue_balls.length; i++) {
      firstCollide &= blue_balls[i].renderMovement(firstCollide);
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
        console.log(
          "Two turns for player" +
            otherPlayer.turn +
            " : firstCBall = " +
            firstCBall
        );
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
}

function preload() {
  loadJSON("assets/init.json", gotData);
  loadJSON("assets/players.json", gotDataPlayers);
}
