uniform float uTime;
varying vec2 vUv;

void main() {
    float v3Color = sin(uTime + vUv.x * 2.0);
    gl_FragColor = vec4(vUv, v3Color, 1.0);
}