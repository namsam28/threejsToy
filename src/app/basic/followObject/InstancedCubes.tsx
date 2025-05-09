import {useRef, useMemo} from "react";
import * as THREE from "three";
import {useFrame, useThree} from "@react-three/fiber";
import {useCameraTarget} from "./store/useCameraTarget";

function InstancedCubes() {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const count = useCameraTarget(state=>state.count);
  const cubePositions = useCameraTarget(state=>state.cubePositions);
  const setTarget = useCameraTarget(state=>state.setTarget);
  const {raycaster, camera, gl, scene} = useThree();
  const color = new THREE.Color();

  const onClick = (e: THREE.Event) => {
    if (!meshRef.current) return;

    const instanceId = e.instanceId;

    if (instanceId !== undefined) {
      const dummy = new THREE.Object3D();
      meshRef.current.getMatrixAt(instanceId, dummy.matrix);
      dummy.matrix.decompose(dummy.position, dummy.quaternion, dummy.scale);  // decompose
      setTarget(dummy.position.clone());  // 값 저장할 때는 무조건 clone
    }
  };

  const onPointerMissed = (e) => {
    const dummy = new THREE.Object3D();
    setTarget(dummy.position.clone());
  };

  const onPointerEnter = ()=>{
    document.body.style.cursor = "pointer";
  }
  const onPointerLeave = ()=>{
    document.body.style.cursor = "default";
  }

  // Three object 객체 선언(리렌더링 block처리)
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(()=>{
    for(let i = 0; i < count; i++) {
      dummy.position.copy(cubePositions[i]);
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
      meshRef.current.setColorAt(i, color);
    }

    // 업데이트 처리
    meshRef.current.instanceMatrix.needsUpdate = true;
    meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} name="boxes" onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave} onClick={onClick} onPointerMissed={onPointerMissed} >
      <boxGeometry args={[1,1,1]} />
      <meshStandardMaterial color="orange" />
    </instancedMesh>
  );
}

export default InstancedCubes;