var tiny_location;
var stationary_location;
var velocity;
var spinner_radius = 8;
var stationary_radius = 90;
var stationary_max_hits = 4;
var stationary_hit_counter = stationary_max_hits + 1; // trigger random location from the start
var border_hit_counter = 0;
var border_max_hits = 30 * stationary_max_hits; // 'watchdog', in case we never hit the cube

function setup() {
    stationary_location = createVector(140, 140, 0);
    createCanvas(500, 500, WEBGL);
    background(0);

    tiny_location = createVector(140 + stationary_radius + 4, 140 + stationary_radius, 100);
    velocity = createVector(1.3,   2, 0.01); // We'll use the Z index for rotation, not position.
}

function draw() {
    ortho(0.1, width, -height, 0.1, -500, 500);

    push();
    draw_debug();
    pop();

    push();
    draw_spinning_cube();
    pop();

    push();
    draw_stationary_cube();
    pop();
}

function draw_stationary_cube() {
    if (stationary_hit_counter > stationary_max_hits || border_hit_counter > border_max_hits) {
        stationary_hit_counter = 0;
        border_hit_counter = 0;
        stationary_location.x = random(0, width);
        stationary_location.y = random(0, height);
        stationary_radius = random(10, min(width, height) / 3);
    }

    translate(stationary_location.x, stationary_location.y, -20);
    fill(
        0 + (255 / stationary_max_hits * stationary_hit_counter),
        255 - (255 / stationary_max_hits * stationary_hit_counter),
        255 - (255 / stationary_max_hits * stationary_hit_counter)
    );
    box(stationary_radius * 2);
}

function draw_debug() {
    translate(0, 0, -20);
    fill(255, 0, 0);
    box(10);

    translate(width, height, -20);
    fill(0, 255, 0);
    box(10);

    translate(width, 0.1, -20);
    fill(0, 0, 255);
    box(10);

    translate(0.1, height, -20);
    fill(0, 255, 255);
    box(10);
}

function draw_spinning_cube() {
    tiny_location.add(velocity);

    // Don't hit the borders
    if ((tiny_location.x + spinner_radius > width) || (tiny_location.x - spinner_radius < 0)) {
        border_hit_counter += 1;
        velocity.x = velocity.x * -1;
    }
    if ((tiny_location.y + spinner_radius > height) || (tiny_location.y - spinner_radius < 0)) {
        border_hit_counter += 1;
        velocity.y = velocity.y * -1;
    }

    // Don't hit the stationary cube
    if (
        (tiny_location.x + spinner_radius > stationary_location.x - stationary_radius) &&
        (tiny_location.x - spinner_radius < stationary_location.x + stationary_radius) &&
        (tiny_location.y + spinner_radius > stationary_location.y - stationary_radius) &&
        (tiny_location.y - spinner_radius < stationary_location.y + stationary_radius)
    ) {
        stationary_hit_counter += 1;
        // Moving left made us crash into the stationary cube
        if (velocity.x > 0 && tiny_location.x + spinner_radius - velocity.x <= stationary_location.x - stationary_radius) {
            velocity.x = velocity.x * -1;
        }
        // Moving right made us crash into the stationary cube
        if (velocity.x < 0 && tiny_location.x - spinner_radius - velocity.x >= stationary_location.x + stationary_radius) {
            velocity.x = velocity.x * -1;
        }
        // Moving down made us crash into the stationary cube
        if (velocity.y > 0 && tiny_location.y + spinner_radius - velocity.y <= stationary_location.y - stationary_radius) {
            velocity.y = velocity.y * -1;
        }
        // Moving up made us crash into the stationary cube
        if (velocity.y < 0 && tiny_location.y - spinner_radius - velocity.y >= stationary_location.y + stationary_radius) {
            velocity.y = velocity.y * -1;
        }
    }

    translate(tiny_location.x, tiny_location.y, -20);
    rotateX(tiny_location.z * 3.001);
    rotateY(tiny_location.z * 2.001);

    fill(255, 255, 0);
    box(spinner_radius * 2);
    return;
}
