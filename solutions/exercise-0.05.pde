class Walker {
    float x;
    float y;
    int std = 3;

    Walker() {
        x = width / 2;
        y = height / 2;
    }

    void display() {
        stroke(0);
        point(x, y);
    }

    void step() {
        int stepX = randomGaussian() * std;
        int stepY = randomGaussian() * std;
     
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
