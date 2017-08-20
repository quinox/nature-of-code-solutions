function willEnterSquare() {
  alert('not yet implemented');
}

function willEscapeSquare(location, velocity, boundary) {
  // Returns false if location+velocity is within the boundaries
  //
  // Returns a Vector with the same angle as velocity and the
  // magnitude of the excess part after crossing the boundaries.

  let left_side_x = boundary.x;
  let right_side_x = boundary.x + boundary.width;
  let top_side_y = boundary.y;
  let bottom_side_y = boundary.y + boundary.height;

  let after_moving = p5.Vector.add(location, velocity);

  // Escape on the right side
  if (after_moving.x > right_side_x) {
    let angle = velocity.angleBetween(createVector(1, 0));
    let adjacent = (after_moving.x - right_side_x);
    let opposite = tan(angle) * adjacent;
    return createVector(adjacent, opposite);
  }

  // Escape on the left side
  if (after_moving.x < left_side_x) {
    let angle = velocity.angleBetween(createVector(-1, 0));
    let adjacent = after_moving.x - left_side_x;
    let opposite = tan(angle) * adjacent;
    return createVector(adjacent, opposite);
  }

  // Escape on the bottom side
  if (after_moving.y > bottom_side_y) {
    let angle = velocity.angleBetween(createVector(0, 1));
    let adjacent = after_moving.y - bottom_side_y;
    let opposite = tan(angle) * adjacent
    return createVector(opposite, adjacent);
  }

  // Escape on the top side
  if (after_moving.y < top_side_y) {
    let angle = velocity.angleBetween(createVector(0, -1));
    let adjacent = after_moving.y - top_side_y;
    let opposite = tan(angle) * adjacent;
    return createVector(opposite, adjacent);
  }
  return false;
}
