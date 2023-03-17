attribute vec3 aPosition;

uniform vec2 resolution;

varying vec3 vertPosition;

void main() {
  vertPosition = aPosition;
  gl_Position = vec4(2.0 * aPosition.xy / resolution - 1.0, 0, 1);
}
