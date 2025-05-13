import * as THREE from "three";
import {useRef} from "react";
import {useFrame,extend} from "@react-three/fiber";
import {shaderMaterial} from "@react-three/drei";
import glsl from "glslify";

const WaveMaterial = shaderMaterial(
  { uTime: 0 },
  // Vertex Shader
  glsl`
    uniform float uTime;
    varying vec2 vUv;

    void main() {
      vUv = uv;
      vec3 pos = position;
      pos.y += sin(pos.x * 4.0 + uTime * 2.0) * 0.4;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // Fragment Shader
  glsl`
    varying vec2 vUv;

    void main() {
      gl_FragColor = vec4(vUv, 1.0, 1.0);
    }
  `
);
extend({WaveMaterial});

function Plane() {
  const materialRef = useRef<THREE.Plane>(null);

  useFrame((state)=>{
    if(materialRef.current){
      materialRef.current.uTime = state.clock.elapsedTime*3;
    }
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} scale={4.0}>
      <planeGeometry args={[5, 5, 50, 50]}/>
      <waveMaterial ref={materialRef} />
    </mesh>
  );
}

export default Plane;
