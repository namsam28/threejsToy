import vertex from "./shader/vertex.glsl";
import fragment from "./shader/fragment.glsl";
import {shaderMaterial} from "@react-three/drei";
const WaveMaterial = shaderMaterial(
  {uTime:0},
  vertex,
  fragment,
)

export {WaveMaterial};