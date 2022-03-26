let xStart;
let ystart;

let showStick;
let shotWhite;
let reallyChecked = false;

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
  if (blue_balls.length == 0 && yel_balls.length == 0 && !whiteBall) {
    console.log("Getting data");
    jsonData = data;
    let w_ball = data[0];
    whiteBall = new Ball(
      w_ball["x"],
      w_ball["y"],
      color(w_ball["color"].r, w_ball["color"].g, w_ball["color"].b),
      w_ball["radius"],
      "W"
    );

    let black_ball = data[1];
    blackBall = new Ball(
      black_ball["x"],
      black_ball["y"],
      color(
        black_ball["color"].r,
        black_ball["color"].g,
        black_ball["color"].b
      ),
      black_ball["radius"],
      "K"
    );

    elements = data[2];
    for (let i = 0; i < elements.length; i++) {
      let element = elements[i];
      let b = new Ball(
        element["x"],
        element["y"],
        color(element["color"].r, element["color"].g, element["color"].b),
        element["radius"],
        "Y"
      );
      yel_balls.push(b);
      aux_yelBalls.push(b.copy());
    }
    elements = data[3];
    for (let i = 0; i < elements.length; i++) {
      let element = elements[i];
      let b = new Ball(
        element["x"],
        element["y"],
        color(element["color"].r, element["color"].g, element["color"].b),
        element["radius"],
        "B"
      );
      blue_balls.push(b);
      aux_blueBalls.push(b.copy());
    }
    json_holes = data[4];
    for (let i = 0; i < json_holes.length; i++) {
      let element = json_holes[i];
      let h = new Hole(element["id"], createVector(element["x"], element["y"]));
      holes.push(h);
    }
    aux_blackBall = blackBall.copy();
    aux_whiteBall = whiteBall.copy();
  }
}

function gotDataPlayers(data) {
  let element1 = data[0];
  player1 = new Player(1, element1["x"], element1["y"], element1["color"]);
  player1.myTurn();

  let element2 = data[1];
  player2 = new Player(2, element2["x"], element2["y"], element2["color"]);
}

function showPlayers() {
  player1.showShape();
  player2.showShape();
}

function createTable() {
  noStroke();
  fill(10, 130, 90);
  rect(0, 0, width, height - PLAYERS_HEIGHT);
  //background(10, 130, 90);
  fill(117, 217, 117);
  rect(borders[0], borders[1], borders[2] - frame, borders[3] - frame);
  rect(0, height - PLAYERS_HEIGHT, width, PLAYERS_HEIGHT);
}

function mousePressed() {
  shotWhite = false;
  xStart = mouseX;
  yStart = mouseY;

  if (checkWhiteClick()) {
    showStick = true;
  } else {
    showStick = false;
  }

  lastMousePressed = false;
}

function mouseReleased() {
  showStick = false;
  shotWhite = true;
}

function mouseDragged() {
  showStick = true;
}

function keyPressed() {
  if (key === "r") {
    if (gameOver) {
      gameOver = false;
      reset();
    }
  }
}

function checkWhiteClick() {
  if (
    mouseX > whiteBall.position.x - whiteBall.size &&
    mouseY > whiteBall.position.y - whiteBall.size &&
    mouseX < whiteBall.position.x + whiteBall.size &&
    mouseY < whiteBall.position.y + whiteBall.size
  ) {
    return true;
  } else {
    return false;
  }
}

function checkBallsMoving() {
  yel_balls.forEach((ball) => {
    if (ball.velocity.mag() > 0.0) {
      console.log();
      return true;
    }
  });
  blue_balls.forEach((ball) => {
    if (ball.velocity.mag() > 0.0) {
      console.log();
      return true;
    }
  });
  if (whiteBall.velocity.mag() > 0.0 || blackBall.velocity.mag() > 0.0) {
    return true;
  }
  return false;
}

function whiteBallIn() {
  console.log("White ball in!");
  aux_whiteBall.color.setAlpha(255);
  whiteBall = aux_whiteBall.copy();
  clear();
}

function drawGameOverView() {
  fill(0);
  rect(150, 150, width / 2, height / 4);
  fill("red");
  textSize(42);
  text("GAME OVER", width / 2 - textSize("GAME OVER") * 3, 200);
  fill(255);
  textSize(24);
  text(
    "Press R to restart",
    width / 2 - textSize("Press R to restart") * 4,
    250
  );
}

function blackBallIn(hole) {
  console.log("Black ball in");
  gameOver = true;
  let current_player = player1;
  if (player2.turn > 0) {
    current_player = player2;
  }
  if (current_player.balls > 0) {
    console.log("Player " + current_player.id + " loses");
    //reset();
  } else {
    if (OPPOSITE_HOLES[current_player.lastHole - 1] == hole) {
      gameOver = true;
      current_player.winnerPlayer();
    }
  }
}

async function manageTurns() {
  let moving = checkBallsMoving();
  if (moving) {
    isMoving = true;
    //await delayTime(2000);
    console.log("Moving");
  } else {
    if (isMoving && !reallyChecked) {
      reallyChecked = true;
      console.log("Really?");
      await sleep(1000);
      let moving = checkBallsMoving();
      if (moving) {
        console.log("not");
        reallyChecked = false;
        return;
      }
      isMoving = false;

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
      player1.changeTurn(player2);
      reallyChecked = false;
    }
  }
}

function sleep(millisecondsDuration) {
  return new Promise((resolve) => {
    setTimeout(resolve, millisecondsDuration);
  });
}
