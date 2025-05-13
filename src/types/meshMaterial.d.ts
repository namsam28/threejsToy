import { WaveMaterial } from "@app/shader/instanceMeshWave2/WaveMaterial";
import { extend, Object3DNode, MaterialNode } from "@react-three/fiber";

declare module "@react-three/fiber" {
  interface ThreeElements {
    waveMaterial: MaterialNode<WaveMaterial, typeof WaveMaterial>;
  }
}

extend({ WaveMaterial });