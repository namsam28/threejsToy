import {useRef} from "react";
import {useFrame} from "@react-three/fiber";
import * as THREE from "three";
import {useGesture} from "@use-gesture/react";
import {cubeRotationStore} from "./store/cubeRotation";

const euler = new THREE.Euler();
const tempEuler = new THREE.Euler();

function Cube() {
  const boxRef = useRef();
  const setIsRotation = cubeRotationStore(state => state.setIsRotation);
  const isRotation = cubeRotationStore(state => state.isRotation);

  /**
   useDrag에 onPointerDown, onPointerUp과 같은 이벤트처리가 되어있어
   해당 이벤트를 후처리로 넣게 되면 useDrag에 이벤트 처리가 망가지게 됨
   따라서 이벤트 처리 시 제스처를 한번에 묶어주는 기능을 사용하여 적용
   */
  const bind = useGesture({
    onDrag: params => {
      const {
        movement: [mx, my],
      } = params;
      const rotationMx = mx * 0.01;
      const rotationMy = my * 0.01;
      const eulerValue = euler.set(tempEuler.x + rotationMy , tempEuler.y + rotationMx, tempEuler.z);
      boxRef.current.setRotationFromEuler(eulerValue);
    },
    onDragStart: () => {
      setIsRotation(true);
      tempEuler.copy(boxRef.current.rotation);
    },
    onDragEnd: () => {
      setIsRotation(false);
    },
  });

  useFrame((state, delta) => {
    const rotationSpeed = delta * 0.1;

    // 2. 오일러 처리
    if (!isRotation) {
      console.log("회전!");
      const eulerValue = euler.set(boxRef.current.rotation.x + rotationSpeed, boxRef.current.rotation.y + rotationSpeed, boxRef.current.rotation.z + rotationSpeed);
      boxRef.current.setRotationFromEuler(eulerValue);
    }
  });

  return (
    <mesh ref={boxRef} {...bind()} position={[0, 1, 0]} castShadow={true}>
      <boxGeometry />
      <meshStandardMaterial color="#ff9999" />
    </mesh>
  );
}

export default Cube;
