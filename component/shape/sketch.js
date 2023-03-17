let theShader;
let sides = 4;
let changeCounter = 0;
let changeInterval = 5;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();

  const vert = `
    attribute vec3 aPosition;
    varying vec2 vPos;

    void main() {
      vPos = aPosition.xy;
      gl_Position = vec4(aPosition, 1.0);
    }
  `;

  const frag = `
    #ifdef GL_ES
    precision mediump float;
    #endif

    varying vec2 vPos;
    uniform vec2 resolution;
    uniform float time;
    uniform float mouse;

    void main() {
      vec2 uv = vPos * 0.5 + 0.5;
      uv *= resolution;
      vec3 col = vec3(0.0);
      float len = length(uv - resolution * 0.5);
      col.r = cos(len * 10.0 - time * mouse) * 0.5 + 0.5;
      col.g = sin(len * 10.0 - time * mouse) * 0.5 + 0.5;
      col.b = len * 2.0 / resolution.x;
      gl_FragColor = vec4(col, 1.0);
    }
  `;

  theShader = createShader(vert, frag);
}

function draw() {
  clear();

  shader(theShader);
  theShader.setUniform("resolution", [width, height]);
  theShader.setUniform("time", frameCount * 0.01);
  theShader.setUniform("mouse", map(mouseX, 0, width, 0, 7));

  let distanceFromCenter = dist(mouseX, mouseY, width / 2, height / 2);
  if (distanceFromCenter < width / 2 && distanceFromCenter < height / 2) {
    if (changeCounter >= changeInterval) {
      sides = int(random(4, 9));
      changeCounter = 0;
    } else {
      changeCounter++;
    }
  }

  let angle = TWO_PI / sides;

  beginShape(TRIANGLES);
  for (let i = 0; i < sides; i++) {
    let x1 = cos(angle * i);
    let y1 = sin(angle * i);

    let x2 = cos(angle * (i + 1));
    let y2 = sin(angle * (i + 1));

    vertex(0, 0, 0);
    vertex(x1, y1, 0);
    vertex(x2, y2, 0);
  }
  endShape(CLOSE);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
