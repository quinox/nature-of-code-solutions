describe("willEscapeSquare", function() {
  // The square is located at position 100, 100 and it's 20 tall and 20 wide.
  // The location is smack in the middle at 110, 110, so it has 10 pixels
  // clearing on both sides

  map_of_points = `
            .     . 
            .     .
           A.  B  .C
            .     .
      L     .     .     D
............._____.............
            |     |
      K     |  x  |     E
............|_____|............  
      J     .     .     F
            .     .  
            .     .
          I .  H  . G
            .     .
            .     .
    `;
  blank_map = map_of_points.replace(/[A-Z]/g, ' ');
  
  test_points = [
    {
      point: 'A',
      title: 'Just past the left of the boundary, all the way to the top',
      velocity: [-11, -20],
      expected_y: -10
    },
    {
      point: 'B',
      title: 'Vertical to the top',
      velocity: [0, -20],
      expected_x: 0,
      expected_y: -10,
    },
    {
      point: 'C',
      title: 'Just past the right of the boundary, all the way to the top',
      velocity: [11, -20],
      expected_y: -10,
    },
    {
      point: 'D',
      title: 'Just past the top of the boundary, all the way to the right',
      velocity: [20, -11],
      expected_x: 10,
    },
    {
      point: 'E',
      title: 'Horizontal to the right',
      velocity: [20, 0],
      expected_x: 10,
      expected_y: 0,
    },
    {
      point: 'F',
      title: 'Just past the bottom of the boundary, all the way to the right',
      velocity: [20, 11],
      expected_x: 10,
    },
    {
      point: 'G',
      title: 'Just past the right of the boundary, all the way to the bottom',
      velocity: [11, 20],
      expected_y: 10,
    },
    {
      point: 'H',
      title: 'vertical to the bottom',
      velocity: [0, 20],
      expected_x: 0,
      expected_y: 10,
    },
    {
      point: 'I',
      title: 'Just past the left of the boundary, all the way to the bottom',
      velocity: [-11, 20],
      expected_y: 10,
    },
    {
      point: 'J',
      title: 'Just past the bottom of the boundary, all the way to the left',
      velocity: [-20, 11],
      expected_x: -10,
    },
    {
      point: 'K',
      title: 'Horizontal to the left',
      velocity: [-20, 0],
      expected_x: -10,
      expected_y: 0,
    },
    {
      point: 'L',
      title: 'Just past the top of the boundary, all the way to the left',
      velocity: [-20, -11],
      expected_x: -10,
    },
    
  ]

  beforeEach(function() {
    this.p5 = new p5();
    this.location = this.p5.createVector(110, 110);
    this.boundary = {x: 100, y: 100, width: 20, height: 20}
  });

  test_points.forEach(function(test) {
    it('Point ' + test.point + ': ' + test.title, function(done) {
      let velocity = this.p5.createVector(...test.velocity);
      let outcome = willEscapeSquare(this.location, velocity, this.boundary);
      let point_location_on_map = map_of_points.indexOf(test.point);
      let map = blank_map.substr(0, point_location_on_map) + test.point + blank_map.substr(point_location_on_map + 1);
      expect(outcome).not.toEqual(false, 'The outcome should be a vector. Map:\n' + map);
      expect(velocity.angleBetween(outcome)).toBe(0, 'Angle difference was not zero. Map:\n' + map);
      if (test.expected_y !== undefined) {
        expect(outcome.y).toBe(test.expected_y, 'Y coordinate not as expected. Map:\n' + map);
      }
      if (test.expected_x !== undefined) {
        expect(outcome.x).toBe(test.expected_x, 'X coordinate not as expected. Map:\n' + map);
      }
      done();
    });
  });

  ///it('to the left barely escaping', function() {
  ///  let velocity = createVector(-12, 0);
  ///  let expected = createVector(-2, 0);
  ///  let outcome = willEscapeSquare(this.location, velocity, this.boundary);
  ///  expect(outcome).toEqual(expected);
  ///});

  ///it('to the top barely escaping', function() {
  ///  let velocity = createVector(0, -13);
  ///  let expected = createVector(0, -3);
  ///  let outcome = willEscapeSquare(this.location, velocity, this.boundary);
  ///  expect(outcome).toEqual(expected);
  ///});

  ///it('to the bottom barely escaping', function() {
  ///  let velocity = createVector(0, 12.5);
  ///  let expected = createVector(0, 2.5);
  ///  let outcome = willEscapeSquare(this.location, velocity, this.boundary);
  ///  expect(outcome).toEqual(expected);
  ///});

  ///it("to the right majorly escaping", function() {
  ///  let velocity = createVector(16, 0);
  ///  let expected = createVector(6, 0);
  ///  let outcome =  willEscapeSquare(this.location, velocity, this.boundary);
  ///  expect(outcome).toEqual(expected);
  ///});

  ///it('to the bottom right barely not escaping', function() {
  ///  let velocity = createVector(9, 9);
  ///  let outcome = willEscapeSquare(this.location, velocity, this.boundary);
  ///  expect(outcome).toBe(false);
  ///});

  ///it('to the bottom right barely escaping', function() {
  ///  let velocity = createVector(11, 11);
  ///  let outcome = willEscapeSquare(this.location, velocity, this.boundary);
  ///  let expected = this.p5.createVector(1, 1);
  ///  expect(outcome.x).toBeCloseTo(expected.x);
  ///  expect(outcome.y).toBeCloseTo(expected.y);
  ///});

  ///it('to the bottom right majorly escaping', function() {
  ///  let velocity = createVector(19, 19);
  ///  let outcome = willEscapeSquare(this.location, velocity, this.boundary);
  ///  let expected = this.p5.createVector(9, 9);
  ///  expect(outcome.x).toBeCloseTo(expected.x);
  ///  expect(outcome.y).toBeCloseTo(expected.y);
  ///});

  ///it('to the bottom right majorly escaping where the angle isnt perfectly 45 degrees', function() {
  ///  let velocity = createVector(11, 20);
  ///  let outcome = willEscapeSquare(this.location, velocity, this.boundary);
  ///  let expected = this.p5.createVector(11, 10);
  ///  //expect(outcome.x).toBeCloseTo(expected.x);
  ///  expect(outcome.y).toBeCloseTo(expected.y);
  ///});

  ///it('to the bottom left majorly escaping where the angle isnt perfectly 45 degrees', function() {
  ///  let velocity = createVector(-11, 20);
  ///  let outcome = willEscapeSquare(this.location, velocity, this.boundary);
  ///  let expected = this.p5.createVector(-11, 10);
  ///  //expect(outcome.x).toBeCloseTo(expected.x);
  ///  expect(outcome.y).toBeCloseTo(expected.y);
  ///});

  ///it('to the top right majorly escaping where the angle isnt perfectly 45 degrees', function() {
  ///  let velocity = createVector(11, -20);
  ///  let outcome = willEscapeSquare(this.location, velocity, this.boundary);
  ///  let expected = this.p5.createVector(11, -10);
  ///  //expect(outcome.x).toBeCloseTo(expected.x);
  ///  expect(outcome.y).toBeCloseTo(expected.y);
  ///});

  ///it('to the bottom left majorly escaping where the angle isnt perfectly 45 degrees', function() {
  ///  let velocity = createVector(-11, -20);
  ///  let outcome = willEscapeSquare(this.location, velocity, this.boundary);
  ///  let expected = this.p5.createVector(-11, -10);
  ///  //expect(outcome.x).toBeCloseTo(expected.x);
  ///  expect(outcome.y).toBeCloseTo(expected.y);
  ///});

  ///it('blabla', function() {
  ///  let velocity = createVector(20, 11);
  ///  let outcome = willEscapeSquare(this.location, velocity, this.boundary);
  ///  let expected = this.p5.createVector(10,  -10);
  ///  expect(outcome.x).toBeCloseTo(expected.x);
  ///  //expect(outcome.y).toBeCloseTo(expected.y);
  ///});


});
