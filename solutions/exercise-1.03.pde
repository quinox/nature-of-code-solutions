PVector location;
PVector stationary_location = new PVector(140, 140, 0);

PVector velocity;
int spinner_radius = 8;
int stationary_radius = 90;
int depth;

void setup() {
    size(500, 500, P3D);
    depth = 90; // z-plane

    location = new PVector(100, 100, 100);
    velocity = new PVector(1.3,   2, 0.01); // We'll use the Z index for rotation, not position.

    ortho(-width/2, width/2, -height/2, height/2, -500, 500);
}

void draw() {
    background(255);
    noFill();

    pushMatrix();
    draw_spinning_cube();
    popMatrix();

    pushMatrix();
    draw_stationary_cube();
    popMatrix();
}

void draw_stationary_cube() {
    translate(stationary_location.x, stationary_location.y, -20);
    box(stationary_radius * 2);
}

void draw_spinning_cube() {
    location.add(velocity);

    // Don't hit the borders
    if ((location.x + spinner_radius > width) || (location.x - spinner_radius < 0)) {
        velocity.x = velocity.x * -1;
    }
    if ((location.y + spinner_radius > height) || (location.y - spinner_radius < 0)) {
        velocity.y = velocity.y * -1;
    }

    // Don't hit the stationary cube
    if (
        (location.x + spinner_radius > stationary_location.x - stationary_radius) &&
        (location.x - spinner_radius < stationary_location.x + stationary_radius) &&
        (location.y + spinner_radius > stationary_location.y - stationary_radius) &&
        (location.y - spinner_radius < stationary_location.y + stationary_radius)
    ) {
        // Moving left made us crash into the stationary cube
        if (velocity.x > 0 && location.x + spinner_radius - velocity.x <= stationary_location.x - stationary_radius) {
            velocity.x = velocity.x * -1;
        }
        // Moving right made us crash into the stationary cube // OK
        if (velocity.x < 0 && location.x - spinner_radius - velocity.x >= stationary_location.x + stationary_radius) {
            velocity.x = velocity.x * -1;
        }
        // Moving down made us crash into the stationary cube
        if (velocity.y > 0 && location.y + spinner_radius - velocity.y <= stationary_location.y - stationary_radius) {
            velocity.y = velocity.y * -1;
        }
        // Moving up made us crash into the stationary cube
        if (velocity.y < 0 && location.y - spinner_radius - velocity.y >= stationary_location.y + stationary_radius) {
            velocity.y = velocity.y * -1;
        }
    }

    translate(location.x, location.y, -20);
    rotateX(location.z * 2);
    rotateY(location.z * 3);
    box(spinner_radius * 2);
}
