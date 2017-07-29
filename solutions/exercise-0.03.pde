class Walker {
    int x;
    int y;
    // How a big a change that the Walk goes in the direction of the mouse
    float chance_mouse_direction = 0.5;

    Walker() {
        x = width / 2;
        y = height / 2;
    }

    void display() {
        stroke(0);
        point(x, y);
    }

    void step_towards_mouse() {
        x += max(-1, min(1, mouseX - x));
        y += max(-1, min(1, mouseY - y));
    }

    void step_randomly() {
        x += random(3) - 1;
        y += random(3) - 1;
    }

    void step() {
        // Walk towards the mouse with an X% change
        // If the dot is already at the right X/Y
        // line then that particular axis is ignored

        // If mouse is at (0,0) we assume the user hasn't moved the mouse yet,
        // and thus the <canvas> doesn't know where the mouse is
        if (random(1) < chance_mouse_direction) {
            if (mouseX == 0 && mouseY == 0) {
                println("I wanted to walk towards the mouse bug I suspect we don't know where it is; walking randomly.");
                step_randomly();
            } else {
                step_towards_mouse();
            }
        } else {
            step_randomly();
        }
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
