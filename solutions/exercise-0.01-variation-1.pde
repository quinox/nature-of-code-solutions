class Walker {
    int x;
    int y;

    int horizontal_tendency;
    int vertical_tendency;

    Walker() {
        x = width / 2;
        y = height / 2;
        horizontal_tendency = 1;
        vertical_tendency = 1;
    }

    void display() {
        stroke(0);
        point(x, y);
    }

    void step() {
        if (x <= 0) {
            horizontal_tendency = 1; // prefer going right
        }
        if (x >= width) {
            horizontal_tendency = -1; // prefer going left
        }
        if (y <= 0) {
            vertical_tendency = 1; // prefer going down
        }
        if (y >= height) {
            vertical_tendency = -1; // prefer going up
        }

        print("width=" + width + " height=" + height);
        print(" horizontal_tendency=" + horizontal_tendency + " vertical_tendency=" + vertical_tendency);
        print(" x=" + x + " y=" + y);
        println("");

        int stepX = int((random(6) + horizontal_tendency) / 2) - 1;
        int stepY = int((random(6) + vertical_tendency) / 2) - 1;
     
        x += stepX;
        y += stepY;
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
