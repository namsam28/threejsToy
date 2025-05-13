import * as THREE from "three"
import {useMemo, useRef} from "react";
import {useFrame} from "@react-three/fiber";

const COUNT = 10;
function WaveCubes() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const position = useMemo(()=>{
    return Array.from({length:COUNT*COUNT},(_,i)=>{
      const offsetX = Math.floor(i % COUNT) - Math.floor(COUNT/2);
      const offsetZ = Math.floor(i / COUNT) - Math.floor(COUNT/2);
      return new THREE.Vector3(offsetX,0,offsetZ);
    })
  },[]);
  const dummyObject = useMemo(()=>new THREE.Object3D(), []);
  const dummyColor = useMemo(()=>new THREE.Color(), []);

  useFrame((state)=>{
    const {elapsedTime} = state.clock;
    for(let i=0;i<COUNT*COUNT;i++){
      dummyObject.position.copy(position[i]);
      const offsetX = Math.floor(i % COUNT) - Math.floor(COUNT/2);
      const offsetZ = Math.floor(i / COUNT) - Math.floor(COUNT/2);
      const offset = Math.abs(Math.sin(elapsedTime + (offsetX + offsetZ) * 0.1));
      dummyObject.scale.setScalar(offset);
      dummyColor.setHSL(offset, 1.0, 0.5);
      dummyObject.updateMatrix();

      meshRef.current.setMatrixAt(i,dummyObject.matrix);
      meshRef.current.setColorAt(i,dummyColor);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    meshRef.current.instanceColor.needsUpdate = true;

  });

  return (
    <instancedMesh ref={meshRef} args={[null,null,COUNT*COUNT]}>
      <boxGeometry />
      <meshStandardMaterial />
    </instancedMesh>
  )
}

export default WaveCubes;