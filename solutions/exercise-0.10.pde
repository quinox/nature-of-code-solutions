// Tweakable
int HEIGHT = 360;
int WIDTH = 640;
int MAX_ROWS = 10;
int MAX_COLS = 20;
int cell_size = 30;
float perlin_resolution_factor = 0.09;
float perlin_time_increment = 0.003;
int BACKGROUND_COLOR = 0;
int max_cell_height = 190;

// Non-tweakable
float time = 0;

void setup() {
    size(WIDTH, HEIGHT, P3D);
    noFill();
    noiseDetail(2);
    strokeWeight(10);
}

void draw() {
    background(BACKGROUND_COLOR);
    translate(WIDTH / 2, HEIGHT / 2, 0);
    rotateX(PI/4); // look down a bit
    rotateZ(PI * 0.1 * time); // around and around she goes

    for (int row = 0; row < MAX_ROWS; row++) {
        for (int col = 0; col < MAX_COLS; col++) {
            // The middle row/col should end up at the origin (0,0)
            float topleft_x = col * cell_size - (cell_size * MAX_COLS / 2);
            float topleft_y = row * cell_size - (cell_size * MAX_ROWS / 2);

            // Make low cells black-ish, make high points blue-ish
            float avg_height = noise(time, perlin_resolution_factor * (col + 0.5), perlin_resolution_factor * (row + 0.5));
            stroke(color(0, 0, map(avg_height, 0, 1, 0, 255)));

            beginShape();
            vertex(topleft_x,             topleft_y,               max_cell_height * noise(time, perlin_resolution_factor * col,       perlin_resolution_factor * row));
            vertex(topleft_x + cell_size, topleft_y,               max_cell_height * noise(time, perlin_resolution_factor * (col + 1), perlin_resolution_factor * row));
            vertex(topleft_x + cell_size, topleft_y + cell_size,   max_cell_height * noise(time, perlin_resolution_factor * (col + 1), perlin_resolution_factor * (row + 1)));
            vertex(topleft_x,             topleft_y + cell_size,   max_cell_height * noise(time, perlin_resolution_factor * col,       perlin_resolution_factor * (row + 1)));
            vertex(topleft_x,             topleft_y,               max_cell_height * noise(time, perlin_resolution_factor * col,       perlin_resolution_factor * row));
            endShape();
        }
    }
    time += perlin_time_increment;
}
