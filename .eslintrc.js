module.exports = {
  'env': {
    'browser': true,
    'es6': true
  },
  'extends': 'eslint:recommended',
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ]
  },
  'globals': {
    // From library.js
    'willEscapeSquare': false,
    'willEnterSquare': false,
    // Scraped from https://p5js.org/reference/
    // false means you're not allowed to override it
    'blue': false,
    'brightness': false,
    'color': false,
    'green': false,
    'hue': false,
    'lerpColor': false,
    'lightness': false,
    'red': false,
    'saturation': false,
    'background': false,
    'clear': false,
    'colorMode': false,
    'fill': false,
    'noFill': false,
    'noStroke': false,
    'stroke': false,
    'arc': false,
    'ellipse': false,
    'line': false,
    'point': false,
    'quad': false,
    'rect': false,
    'triangle': false,
    'ellipseMode': false,
    'noSmooth': false,
    'rectMode': false,
    'smooth': false,
    'strokeCap': false,
    'strokeJoin': false,
    'strokeWeight': false,
    'bezier': false,
    'bezierPoint': false,
    'bezierTangent': false,
    'curve': false,
    'curveTightness': false,
    'curvePoint': false,
    'curveTangent': false,
    'beginContour': false,
    'beginShape': false,
    'bezierVertex': false,
    'curveVertex': false,
    'endContour': false,
    'endShape': false,
    'quadraticVertex': false,
    'vertex': false,
    'loadModel': false,
    'model': false,
    'plane': false,
    'box': false,
    'sphere': false,
    'cylinder': false,
    'cone': false,
    'ellipsoid': false,
    'torus': false,
    'HALF_PI': false,
    'PI': false,
    'QUARTER_PI': false,
    'TAU': false,
    'TWO_PI': false,
    'preload': true,
    'setup': true,
    'draw': true,
    'remove': false,
    'noLoop': false,
    'loop': false,
    'push': false,
    'pop': false,
    'redraw': false,
    'print': false,
    'frameCount': false,
    'focused': false,
    'cursor': false,
    'frameRate': false,
    'noCursor': false,
    'displayWidth': false,
    'displayHeight': false,
    'windowWidth': false,
    'windowHeight': false,
    'windowResized': false,
    'width': false,
    'height': false,
    'fullscreen': false,
    'pixelDensity': false,
    'displayDensity': false,
    'getURL': false,
    'getURLPath': false,
    'getURLParams': false,
    'createCanvas': false,
    'resizeCanvas': false,
    'noCanvas': false,
    'createGraphics': false,
    'blendMode': false,
    'applyMatrix': false,
    'resetMatrix': false,
    'rotate': false,
    'rotateX': false,
    'rotateY': false,
    'rotateZ': false,
    'scale': false,
    'shearX': false,
    'shearY': false,
    'translate': false,
    'append': false,
    'arrayCopy': false,
    'concat': false,
    'reverse': false,
    'shorten': false,
    'shuffle': false,
    'sort': false,
    'splice': false,
    'subset': false,
    'float': false,
    'int': false,
    'str': false,
    'boolean': false,
    'byte': false,
    'char': false,
    'unchar': false,
    'hex': false,
    'unhex': false,
    'join': false,
    'match': false,
    'matchAll': false,
    'nf': false,
    'nfc': false,
    'nfp': false,
    'nfs': false,
    'split': false,
    'splitTokens': false,
    'trim': false,
    'deviceOrientation': false,
    'accelerationX': false,
    'accelerationY': false,
    'accelerationZ': false,
    'pAccelerationX': false,
    'pAccelerationY': false,
    'pAccelerationZ': false,
    'rotationX': false,
    'rotationY': false,
    'rotationZ': false,
    'pRotationX': false,
    'pRotationY': false,
    'pRotationZ': false,
    'setMoveThreshold': false,
    'setShakeThreshold': false,
    'deviceMoved': false,
    'deviceTurned': false,
    'deviceShaken': false,
    'keyIsPressed': false,
    'key': false,
    'keyCode': false,
    'keyPressed': false,
    'keyReleased': false,
    'keyTyped': false,
    'keyIsDown': false,
    'mouseX': false,
    'mouseY': false,
    'pmouseX': false,
    'pmouseY': false,
    'winMouseX': false,
    'winMouseY': false,
    'pwinMouseX': false,
    'pwinMouseY': false,
    'mouseButton': false,
    'mouseIsPressed': false,
    'mouseMoved': false,
    'mouseDragged': false,
    'mousePressed': false,
    'mouseReleased': false,
    'mouseClicked': false,
    'doubleClicked': false,
    'mouseWheel': false,
    'touches': false,
    'touchStarted': false,
    'touchMoved': false,
    'touchEnded': false,
    'createImage': false,
    'saveCanvas': false,
    'saveFrames': false,
    'loadImage': false,
    'image': false,
    'tint': false,
    'noTint': false,
    'imageMode': false,
    'pixels': false,
    'blend': false,
    'copy': false,
    'filter': false,
    'get': false,
    'loadPixels': false,
    'set': false,
    'updatePixels': false,
    'loadJSON': false,
    'loadStrings': false,
    'loadTable': false,
    'loadXML': false,
    'httpGet': false,
    'httpPost': false,
    'httpDo': false,
    'save': false,
    'saveJSON': false,
    'saveStrings': false,
    'saveTable': false,
    'day': false,
    'hour': false,
    'minute': false,
    'millis': false,
    'month': false,
    'second': false,
    'year': false,
    'createVector': false,
    'abs': false,
    'ceil': false,
    'constrain': false,
    'dist': false,
    'exp': false,
    'floor': false,
    'lerp': false,
    'log': false,
    'mag': false,
    'map': false,
    'max': false,
    'min': false,
    'norm': false,
    'pow': false,
    'round': false,
    'sq': false,
    'sqrt': false,
    'noise': false,
    'noiseDetail': false,
    'noiseSeed': false,
    'randomSeed': false,
    'random': false,
    'randomGaussian': false,
    'acos': false,
    'asin': false,
    'atan': false,
    'atan2': false,
    'cos': false,
    'sin': false,
    'tan': false,
    'degrees': false,
    'radians': false,
    'angleMode': false,
    'textAlign': false,
    'textLeading': false,
    'textSize': false,
    'textStyle': false,
    'textWidth': false,
    'textAscent': false,
    'textDescent': false,
    'loadFont': false,
    'text': false,
    'textFont': false,
    'camera': false,
    'perspective': false,
    'ortho': false,
    'ambientLight': false,
    'directionalLight': false,
    'pointLight': false,
    'normalMaterial': false,
    'texture': false,
    'ambientMaterial': false,
    'specularMaterial': false,
    // Added manually
    'P2D': false,
    'P3D': false,
    'WEBGL': false,
    'p5': {
        'Vector': false,
    },
  }
}
