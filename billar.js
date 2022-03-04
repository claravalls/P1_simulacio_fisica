let balls = [];
let data = {};

let index = 0;
let hintBall = 0;
let hintLine = 0;
let border = 30;

let player1;
let player2;

function setup() {
  createCanvas(600, 400);
  preload();
}

function draw() {
  createTable();
  
  let gravity = createVector(0, 0);
  for (i = 0; i < index; i++) {
    balls[i].addForce(gravity);
    balls[i].checkCollide();    
    balls[i].update();
    balls[i].render();
    balls[i].checkEdges();

    balls[i].addFriction(0.1);
  }
  /*if (hintBall != 0) {
    hintBall.position = createVector(mouseX, mouseY);
    hintBall.render();
    hintLine.updateLine();
    hintLine.render();
  }*/
  
}

function preload(){
  //loadJSON('assets/init.json',gotData);
  
  //lo que cargaria el JSON, entre otras cosas
    player1 = new Ball(100,150,color(230, 230, 20),30);
    balls[index++] = player1;
  
    player2 = new Ball(100,250,color(255, 255, 255),30);
    balls[index++] = player2;
  
    redball = new Ball(400,200,color(230, 20, 20),30);
    balls[index++] = redball;
}
function gotData(data){
  for(let i = 0; i < data.length;i++){
    console.log(i);
    const element = data[i];
    let m = new Ball();
  m.init(createVector(element['x'],element['y'],element['color'],element['radius']));
    balls.push(m);
  }
}

function createTable(){
    background(10,130,90);
    fill(33,204,33)
    noStroke();
    rect(border, border, width-2*border,height-2*border);
}

