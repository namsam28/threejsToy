uniform float uTime;
varying vec2 vUv;
attribute vec3 aOffset;

void main() {
  vUv = uv;
  vec3 pos = position;
  pos.x += aOffset.x;
  pos.z += aOffset.z;

  // 예제: sine 파동으로 y 이동
  pos.y += sin(uTime + aOffset.x * 0.5 + aOffset.z * 0.5) * 0.5;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}