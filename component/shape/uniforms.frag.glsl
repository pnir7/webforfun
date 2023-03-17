#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 resolution;
uniform float mouse;
uniform float time;

varying vec3 vertPosition;

void main() {
  vec2 st = vertPosition.xy / resolution;
  vec3 color = vec3(0.0);
  color.r = step(fract(st.x * mouse + time), 0.5);
  color.g = step(fract(st.y * mouse + time), 0.5);
  gl_FragColor = vec4(color, 1.0);
}
