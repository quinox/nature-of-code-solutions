function willEnterSquare() {
  alert('not yet implemented');
}

function willEscapeSquare(location, velocity, boundary) {
  let after_moving = p5.Vector.add(location, velocity);
  if (after_moving.x < boundary.x) {
    return createVector(-1, 0);
  }
  if (after_moving.x > boundary.x + boundary.width) {
    return createVector(1, 0);
  }
  if (after_moving.y < boundary.y) {
    return createVector(0, -1);
  }
  if (after_moving.y > boundary.y + boundary.height) {
    return createVector(0, 1);
  }
  return false;
}
