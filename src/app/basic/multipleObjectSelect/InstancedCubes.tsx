import {useSelectedCube} from "./store/useSelectedCube";
import {useFrame} from "@react-three/fiber";
import {useRef, useMemo} from "react";
import * as THREE from "three";

const count = 100;
function InstancedCubes() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const selected = useSelectedCube(state=>state.selected);
  const setSelected = useSelectedCube(state=>state.setSelected);
  const setCameraTarget = useSelectedCube(state=>state.setCameraTarget);
  const meshObjects = useMemo(()=>Array.from({length: count},(v,i)=>{
    const obj = new THREE.Object3D();
    obj.position.set((Math.random() - 0.5) * 40,0,(Math.random() - 0.5) * 40);
    return obj;
  }),[]);
  const meshColor = new THREE.Color(0xff0000);

  const handleClickTarget = (event)=> {
    const dummyObject = new THREE.Object3D();
    if(selected === event.instanceId) {
      setCameraTarget(dummyObject.position);
      setSelected(null);
      return;
    }

    meshRef.current.getMatrixAt(event.instanceId, dummyObject.matrix);
    dummyObject.matrix.decompose(dummyObject.position,dummyObject.quaternion,dummyObject.scale);
    setCameraTarget(dummyObject.position);
    setSelected(event.instanceId);
  }

  const handlePointerMissed = ()=>{
    const initVector = new THREE.Object3D();
    setCameraTarget(initVector.position.clone());
    setSelected(null);
  }

  const onPointerEnter = ()=>{
    document.body.style.cursor = "pointer";
  }
  const onPointerLeave = ()=>{
    document.body.style.cursor = "default";
  }

  useFrame(() => {
    const defaultColor = new THREE.Color(0xffff00);
    for (let i = 0; i < count; i++) {
      const obj = meshObjects[i];

      // 선택된 큐브만 회전
      if (i === selected) {
        const targetQuat = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,1,0), Math.PI/2 * 0.5 / 90);
        obj.quaternion.multiply(targetQuat);
        meshRef.current.setColorAt(i, meshColor);

        // rotaion 방식
        // obj.rotation.y += 0.1;
        // meshRef.current.setColorAt(i, meshColor);
      } else {
        meshRef.current.setColorAt(i, defaultColor);
      }

      obj.updateMatrix();
      meshRef.current.setMatrixAt(i, obj.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
    meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} name="boxes" onClick={handleClickTarget} onPointerMissed={handlePointerMissed} onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave}>
      <boxGeometry args={[1,1,1]} />
      <meshStandardMaterial color="orange" />
    </instancedMesh>
  );
}

export default InstancedCubes;