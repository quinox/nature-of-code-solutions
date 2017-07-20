float time = 0;
float perlin_time_increment = 0.04;
float perlin_resolution_factor = 0.09;

void setup() {
    size(640, 360);
    noiseDetail(1);
    draw(); // force first frame
}

void draw() {
    println('Framerate: ' + frameRate);

    float bright;
    loadPixels();
    for (int x = 0; x < width; x++) {
        for (int y = 0; y < height; y++) {
            bright = map(noise(x * perlin_resolution_factor, y * perlin_resolution_factor, time), 0, 1, 0, 255);
            pixels[x+y*width] = color(bright);
        }
    }
    updatePixels();
    time += perlin_time_increment;
}
