import {useThree, useFrame} from "@react-three/fiber";
import {useRef} from "react";

function Cube() {
  const cubeRef = useRef();
  const {camera} = useThree();

  useFrame(()=>{
    // 객체 위치 바라보기
    camera.lookAt(cubeRef.current.position);
  });

  return <>
    <mesh ref={cubeRef}>
      <boxGeometry args={[1,1,1]} />
      <meshStandardMaterial color="#ff0000" />
    </mesh>
  </>;
}

export default Cube;