/* exported draw */
/* exported setup */

let reversed_gravity;
let normal_gravity;
let gravity;
let bouyancy;
let balloon;
let ball;
let gravity_arrow;

function setup() {
  createCanvas(500, 500, P2D);
  background(255);

  normal_gravity = createVector(0, 1);
  reversed_gravity = createVector(0, -0.1);
  bouyancy = p5.Vector.mult(
    p5.Vector.add(normal_gravity, createVector(0, 0.1)),
    -1
  );
  gravity = createVector(0, 0);

  balloon = new Sphere();
  balloon.color = [0, 255, 0];
  balloon.height = 40;
  balloon.width = 20;
  balloon.location.x = width / 2 - 100;
  balloon.location.y = height / 2;
  balloon.forces.push(gravity);
  balloon.forces.push(bouyancy);

  ball = new Sphere();
  ball.color = [0, 0, 255];
  ball.height = 10;
  ball.width = 10;
  ball.location.x = width / 2 + 100;
  ball.location.y = height / 2;
  ball.forces.push(gravity);

  gravity_arrow = new Arrow();
  gravity_arrow.location.x = width / 2;
  gravity_arrow.location.y = height / 2;
  gravity_arrow.vector = gravity;
  gravity_arrow.text = 'Gravity (press mouse button)';
}

function draw() {
  background(255);

  if (mouseIsPressed) {
    gravity.set(reversed_gravity);
  } else {
    gravity.set(normal_gravity);
  }

  let objects = [balloon, ball, gravity_arrow];

  objects.forEach(function(object) {
    object.applyForces();
    push();
    object.display();
    pop();
  });

}

function Arrow() {
  this.location = createVector(0, 0);
  this.vector = null;
  this.scaling_factor = 10;
  this.text = '';

  this.applyForces = function() { };

  this.display = function() {
    let endpoint = p5.Vector.add(
      this.location,
      p5.Vector.mult(this.vector, this.scaling_factor)
    );
    if (this.text) {
      fill(255, 0, 0);
      text(this.text, this.location.x, this.location.y);
    }
    line(this.location.x, this.location.y, endpoint.x, endpoint.y);

    translate(endpoint.x, endpoint.y);
    rotate(this.vector.angleBetween(createVector(0, 1)));
    triangle(
      0 - (this.scaling_factor / 4),
      0,
      0 + (this.scaling_factor / 4),
      0,
      0,
      0 + (this.scaling_factor / 4)
    );
  };

}

function Sphere() {
  this.location = createVector(0, 0);
  this.velocity = createVector(0, 0);
  this.width = 3;
  this.height = 3;
  this.color = [255, 0, 0];
  this.forces = [];
  this.boundary = {x: 0, y: 0, width: width, height: height};
  this.previous_escape_vector = null;

  this.display = function() {
    fill(...this.color);
    ellipse(this.location.x, this.location.y, this.width, this.height);
  };

  this.applyForces = function() {
    let old_speed = this.velocity.mag();

    let acceleration = createVector(0, 0);
    this.forces.forEach(function(force) {
      acceleration.add(force);
    });

    this.velocity.add(acceleration);
    let escape_vector = willEscapeSquare(this.location, this.velocity, this.boundary);

    if (escape_vector) {
      if (this.color[2] == 255) {
        console.log(
          'Previous', this.previous_escape_vector,
          'current', escape_vector
        );
      }

      if (this.previous_escape_vector) {
        let difference_in_escape = p5.Vector.sub(this.previous_escape_vector, escape_vector).mag();
        if (this.color[2] == 255) {
          console.log('difference_in_escape', difference_in_escape);
        }

        if (p5.Vector.sub(this.previous_escape_vector, escape_vector).normalize().mag() < 1) {
          // Two frames in a row we're about to escape in the same way... silly.
          return;
        }
      }

      this.previous_escape_vector = escape_vector.copy();
      // when this Sphere is about to exit the bounding box it will
      // bounce off the wall. This bouncing consumes energy.
      //
      // The closer the velocity is to 0 the bigger the damping,
      // to prevent objects from twiching forever
      this.velocity.mult(0 - (this.velocity.mag() / (this.velocity.mag() + 2)));
    } else {
      this.previous_escape_vector = null;
    }
    this.location.add(this.velocity);
  };
}
