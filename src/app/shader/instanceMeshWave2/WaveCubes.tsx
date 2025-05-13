import * as THREE from "three"
import {useMemo, useRef, useEffect} from "react";
import {useFrame, extend} from "@react-three/fiber";
import { WaveMaterial } from "./WaveMaterial";
extend({WaveMaterial});

const COUNT = 10;
function WaveCubes() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const materialRef = useRef(null);

  const gridOffset = useMemo(() => {
    const arr = new Float32Array(COUNT * COUNT * 3); // (x, z) per instance
    for (let i = 0; i < COUNT * COUNT; i++) {
      const x = i % COUNT - COUNT / 2;
      const z = Math.floor(i / COUNT) - COUNT / 2;
      arr[i * 3] = x;
      arr[i * 3 + 1] = 0;
      arr[i * 3 + 2] = z;
    }
    return arr;
  }, []);
  
  useFrame((state)=>{
    const {elapsedTime} = state.clock;

    if(materialRef.current){
      materialRef.current.uTime = elapsedTime;
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null,null,COUNT*COUNT]}>
      <boxGeometry args={[1,1,1]}>
        <instancedBufferAttribute
          attach="attributes-aOffset"
          args={[gridOffset, 3]}
        />
      </boxGeometry>
      <waveMaterial ref={materialRef} />
    </instancedMesh>
  )
}

export default WaveCubes;