import {useSelectedCube} from "./store/useSelectedCube";
import {useFrame} from "@react-three/fiber";
import {useRef, useMemo} from "react";
import * as THREE from "three";

const count = 10;
function InstancedCubes() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const meshObjects = useMemo(()=>Array.from({length: count * count},(v,i)=>{
    const obj = new THREE.Object3D();
    const positionX = Math.floor(i%count)  - Math.floor(count/2);
    const positionZ = Math.floor(i / count) - Math.floor(count/2);

    obj.position.x = positionX;
    obj.position.z = positionZ;
    obj.scale.setScalar(0.5);
    return obj;
  }),[]);


  useFrame((state,delta) => {

    const {clock} = state;
    for (let i = 0; i < count * count; i++) {
      const obj = meshObjects[i];
      const offset = (Math.floor(i % count) + Math.floor(i / count)) * 0.3;
      obj.position.y = Math.cos(clock.elapsedTime + offset);
      obj.updateMatrix();
      meshRef.current.setMatrixAt(i, obj.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count * count]} name="boxes">
      <boxGeometry args={[1,1,1]} />
      <meshStandardMaterial color="orange" />
    </instancedMesh>
  );
}

export default InstancedCubes;