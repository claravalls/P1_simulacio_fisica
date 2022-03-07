class Hole {
  constructor(id, position) {
    this.size = 25;
    this.position = position;
    this.id = id;
  }

  render() {
    noStroke;
    fill(color(0, 0, 0));
    ellipse(this.position.x, this.position.y, this.size);
  }

  isInside(ball_position) {
    if (ball_position.sub(this.position) == 0) {
      return true;
    } else {
      return false;
    }
  }
}
