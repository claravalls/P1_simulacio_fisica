const OPPOSITE_HOLES = [6, 5, 4, 3, 2, 1];

class Hole {
  constructor(id, position) {
    this.size = 30;
    this.position = position;
    this.id = id;
  }

  render() {
    noStroke();
    fill(color(0, 0, 0));
    ellipse(this.position.x, this.position.y, this.size);
  }
}
