class Walker {
    float x, y;
    float tx, ty;
    float perlin_increment = 0.005;
    float max_stepsize = 3;

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
    
        x += dx;
        y += dy;

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
