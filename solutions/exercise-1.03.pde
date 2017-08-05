PVector location;
PVector stationary_location = new PVector(140, 140, 0);

PVector velocity;
int spinner_radius = 8;
int stationary_radius = 90;
int stationary_max_hits = 3;
int stationary_hit_counter = stationary_max_hits + 1; // trigger random location from the start
int border_hit_counter = 0;
int border_max_hits = 30 * stationary_max_hits; // 'watchdog', in case we never hit the cube

void setup() {
    size(500, 500, P3D);

    location = new PVector(140 + stationary_radius + 4, 140 + stationary_radius, 100);
    velocity = new PVector(1.3,   2, 0.01); // We'll use the Z index for rotation, not position.

    ortho(-width/2, width/2, -height/2, height/2, -500, 500);
}

void draw() {
    background(255);

    pushMatrix();
    draw_spinning_cube();
    popMatrix();

    pushMatrix();
    draw_stationary_cube();
    popMatrix();
}

void draw_stationary_cube() {
    if (stationary_hit_counter > stationary_max_hits || border_hit_counter > border_max_hits) {
        stationary_hit_counter = 0;
        border_hit_counter = 0;
        stationary_location.x = random(0, width);
        stationary_location.y = random(0, height);
        stationary_radius = random(10, min(width, height) / 3);
    }

    translate(stationary_location.x, stationary_location.y, -20);
    fill(
        255,
        255 - (255 / stationary_max_hits * stationary_hit_counter),
        255 - (255 / stationary_max_hits * stationary_hit_counter)
    );
    box(stationary_radius * 2);
}

void draw_spinning_cube() {
    location.add(velocity);

    // Don't hit the borders
    if ((location.x + spinner_radius > width) || (location.x - spinner_radius < 0)) {
        border_hit_counter += 1;
        velocity.x = velocity.x * -1;
    }
    if ((location.y + spinner_radius > height) || (location.y - spinner_radius < 0)) {
        border_hit_counter += 1;
        velocity.y = velocity.y * -1;
    }

    // Don't hit the stationary cube
    if (
        (location.x + spinner_radius > stationary_location.x - stationary_radius) &&
        (location.x - spinner_radius < stationary_location.x + stationary_radius) &&
        (location.y + spinner_radius > stationary_location.y - stationary_radius) &&
        (location.y - spinner_radius < stationary_location.y + stationary_radius)
    ) {
        stationary_hit_counter += 1;
        // Moving left made us crash into the stationary cube
        if (velocity.x > 0 && location.x + spinner_radius - velocity.x <= stationary_location.x - stationary_radius) {
            velocity.x = velocity.x * -1;
        }
        // Moving right made us crash into the stationary cube
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
    rotateX(location.z * 3.001);
    rotateY(location.z * 2.001);

    noFill();
    box(spinner_radius * 2);
}
