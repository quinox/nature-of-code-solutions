class Walker {
    PVector location;
    PVector noiselocation = new PVector(0, 100000);
    PVector noisedirection = new PVector(0.005, 0.005);
    float max_stepsize = 3;

    // When the Perlin noise leads us outside the window
    // we'll flip the direction, as if the walker bounced
    // off on the edge of the window.
    PVector flip = new PVector(1, 1);

    Walker() {
        location = new PVector(width / 2, height / 2);
    }

    void display() {
        stroke(0);
        point(location.x, location.y);
    }

    void step() {
        start_input = 0;
        end_input = 1;
        start_output = 0 - max_stepsize;
        end_output = max_stepsize;

        PVector force = new PVector(
            map(noise(noiselocation.x), 0, 1, -max_stepsize, max_stepsize),
            map(noise(noiselocation.y), 0, 1, -max_stepsize, max_stepsize)
        );

        if (location.x > width) {
            if (force.x > 0) {
                flip.x = -1;
            } else {
                flip.x = 1;
            }
        }
        if (location.x < 0) {
            if (force.x < 0) {
                flip.x = -1;
            } else {
                flip.x = 1;
            }
        }
        if (location.y > height) {
            if (force.y > 0) {
                flip.y = -1;
            } else {
                flip.y = 1;
            }
        }
        if (location.y < 0) {
            if (force.y < 0) {
                flip.y = -1;
            } else {
                flip.y = 0;
            }
        }

        // To make the force point inwards when the dot is outside the
        // container
        force.mult(flip);

        location.add(force);

        noiselocation.add(noisedirection);
    }
}

Walker w;

void setup() {
    size(640, 360);
    w = new Walker();
    background(255);
}

void draw() {
    w.step();
    w.display();
}
