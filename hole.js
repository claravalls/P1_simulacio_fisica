class Hole {
  constructor(id, position) {
    this.size = 30;
    this.position = position;
    this.id = id;
  }

  render() {
    noStroke;
    fill(color(0, 0, 0));
    ellipse(this.position.x, this.position.y, this.size);
  }

  isInside(ball_position) {
    let aux_vec = ball_position.copy();
    if (aux_vec.sub(this.position) == 0) {
      return true;
    } else {
      return false;
    }
  }
}
