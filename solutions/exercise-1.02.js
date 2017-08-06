var mousevect_location; // where the vector starts
var default_vector_length = 20;

function setup() {
    createCanvas(500, 500, P2D);

    mousevect_location = createVector(width / 2, height / 2);
}

function draw() {
    background(255);
    
    var mouse_vector = createVector(mouseX, mouseY);
    mouse_vector.sub(mousevect_location); // shift reference
    mouse_vector.normalize();

    draw_mouse_vector(mouse_vector.copy());

    vector_in_vector_out = [
        ['add()', 'add'],
        ['sub()', 'sub'],
        ['cross() [results end up in the 3rd dimension]', 'cross'],
    ];

    vector_in_scalar_out = [
        ['dot()', 'dot'],
        ['dist()', 'dist'],
        ['angleBetween()', 'angleBetween'],
    ];

    scalar_in_vector_out = [
        ['mult()', 'mult'],
        ['div()', 'div'],
        ['rotate()', 'rotate'],
    ];

    scalar_in_scalar_out = [
    ];

    nothing_in_scalar_out = [
        ['mag()', 'mag'],
        ['magSq()', 'magSq'],
        ['heading()', 'heading'],
    ];

    var offset = createVector(20, 20);
    for (var i = 0; i < vector_in_vector_out.length; i++) {
        var title = vector_in_vector_out[i][0];
        var effect = vector_in_vector_out[i][1];
        push();
        draw_vector_effect(title, effect, offset.copy(), mouse_vector.copy());
        pop();
        offset.y += 80;
    }
}

function draw_mouse_vector(mouse_vector) {
    mouse_vector.mult(default_vector_length);

    // Shadow line, full length
    stroke(200);
    line(mousevect_location.x, mousevect_location.y, mouseX, mouseY);

    // Real line, normalized
    mouse_vector.add(mousevect_location); // shift reference
    strokeWeight(2);
    stroke(0, 255, 0);
    line(mousevect_location.x, mousevect_location.y, mouse_vector.x, mouse_vector.y);
    strokeWeight(1);

    // Box it in
    noFill();
    stroke(0);
    var boxsize = default_vector_length + 50;
    var half_a_boxsize = boxsize / 2;
    rect(
        mousevect_location.x - half_a_boxsize, 
        mousevect_location.y - half_a_boxsize, 
        boxsize,
        boxsize
    );
    noStroke();
    fill(0);
    text(
        'Input unit vector', 
        mousevect_location.x - half_a_boxsize, 
        mousevect_location.y - half_a_boxsize - 10
    );
}

function draw_vector_effect(title, effect, offset, input_vector) {
    // Math
    var primary_vector = createVector(1, 1);
    primary_vector.normalize();
    var secondary_vector = p5.Vector[effect](primary_vector, input_vector.normalize());
    
    // Drawing
    text(title, offset.x, offset.y);
    text('x: ' + secondary_vector.x.toFixed(2) + ' y: ' + secondary_vector.y.toFixed(2) + ' z: ' + secondary_vector.z.toFixed(2), offset.x, offset.y + 15);
    text('length: ' + secondary_vector.mag().toFixed(2) + ' units.', offset.x, offset.y + 30);

    // Scaling for UI
    primary_vector.mult(default_vector_length);
    secondary_vector.mult(default_vector_length);

    offset.y += 40;
    primary_vector_offset = primary_vector.copy();
    primary_vector_offset.add(offset);
    stroke(255, 0, 0);
    line(offset.x, offset.y, primary_vector_offset.x, primary_vector_offset.y);

    secondary_vector_offset = p5.Vector.add(secondary_vector, offset);
    stroke(0, 255, 0);
    line(primary_vector_offset.x, primary_vector_offset.y, secondary_vector_offset.x, secondary_vector_offset.y);

    stroke(0, 0, 255);
    strokeWeight(2);
    line(offset.x, offset.y, secondary_vector_offset.x, secondary_vector_offset.y);
}
