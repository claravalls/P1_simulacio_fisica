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
}

function mousePressed() {
  if (!checkBallsMoving()) {
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
}

function mouseReleased() {
  showStick = false;
  shotWhite = true;
  while (checkBallsMoving()) {}
  player1.changeTurn();
  player2.changeTurn();
}

function mouseDragged() {
  showStick = true;
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
    if (ball.velocity.mag() != 0) {
      return true;
    }
  });
  blue_balls.forEach((ball) => {
    if (ball.velocity.mag() != 0) {
      return true;
    }
  });
  if (whiteBall.velocity.mag() != 0 || blackBall.velocity.mag() != 0) {
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
