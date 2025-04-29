import {useRef} from "react";
import {useFrame} from "@react-three/fiber";
import {PresentationControls} from "@react-three/drei";
import * as THREE from "three";

const euler = new THREE.Euler();
const quaternion = new THREE.Quaternion();

function Cube(){
  const boxRef = useRef();

  useFrame((state, delta)=>{
    const rotationSpeed = delta * 0.1;

    // // 1. 직접 변경 처리
    // // boxRef.current.rotation.x += rotationSpeed;
    // // boxRef.current.rotation.y += rotationSpeed;
    // // boxRef.current.rotation.z += rotationSpeed;
    //
    // rotation에 각도는 오일러 표기
    // console.log(boxRef.current.rotation);
    //
    // // 2. 오일러 처리
    const eulerValue = euler.set(
      boxRef.current.rotation.x + rotationSpeed,
      boxRef.current.rotation.y + rotationSpeed,
      boxRef.current.rotation.z + rotationSpeed
    );
    boxRef.current.setRotationFromEuler(eulerValue);
  });

  return (
    <group position={[0,1,0]}>
      <PresentationControls
        enabled={true} // the controls can be disabled by setting this to false
        global={false} // Spin globally or by dragging the model
        cursor={true} // Whether to toggle cursor style on drag
        snap={false} // Snap-back to center (can also be a spring config)
        speed={1} // Speed factor
        zoom={1} // Zoom factor when half the polar-max is reached
        rotation={[0, 1, 0]} // Default rotation
        polar={[-Infinity, Infinity]} // Vertical limits
        azimuth={[-Infinity, Infinity]} // Horizontal limits
      >
        <mesh ref={boxRef} position={[0,0,0]} castShadow={true}>
          <boxGeometry />
          <meshStandardMaterial color="#ff9999"/>
        </mesh>
      </PresentationControls>
    </group>
  );
}

export default Cube;