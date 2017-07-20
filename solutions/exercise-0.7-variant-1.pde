class Walker {
    float x, y;
    float tx, ty;
    float perlin_increment = 0.005;
    float max_stepsize = 3;

    // When the Perlin noise leads us outside the window
    // we'll flip the direction, as if the walker bounced
    // off on the edge of the window.
    int flipx = 1; // -1 or 1
    int flipy = 1; // -1 or 1 

    Walker() {
        x = width / 2;
        y = height / 2;
        tx = 0;
        ty = 100000;
    }

    void display() {
        stroke(0);
        point(x, y);
    }

    void step() {
        start_input = 0;
        end_input = 1;
        start_output = 0 - max_stepsize;
        end_output = max_stepsize;

        dx = map(noise(tx), start_input, end_input, start_output, end_output);
        dy = map(noise(ty), start_input, end_input, start_output, end_output);

        if (x > width) {
            if (dx > 0) {
                flipx = -1;
            } else {
                flipx = 1;
            }
        }
        if (x < 0) {
            if (dx < 0) {
                flipx = -1;
            } else {
                flipx = 1;
            }
        }
        if (y > height) {
            if (dy > 0) {
                flipy = -1;
            } else {
                flipy = 1;
            }
        }
        if (y < 0) {
            if (dy < 0) {
                flipy = -1;
            } else {
                flipy = 0;
            }
        }

        x += (flipx * dx);
        y += (flipy * dy);

        tx += perlin_increment;
        ty += perlin_increment;
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
