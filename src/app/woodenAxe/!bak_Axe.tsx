"use client";
import {useFrame} from "@react-three/fiber";
import {useGLTF, useKeyboardControls} from "@react-three/drei";
import {RigidBody} from "@react-three/rapier";
import {useRef} from "react";

function Axe(props) {
  const {position = [0, 1, 0]} = props;
  const {scene} = useGLTF("/gltf/wooden_axe_2k.gltf/wooden_axe_2k.gltf");
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const axeRef = useRef();

  useFrame(() => {
    const keys = getKeys();

    // player 체크
    if (axeRef?.current === null) return;

    if (keys.throw) {
      console.log(keys.throw);
      axeRef.current.setNextKinematicTranslation({x: 0, y: 2, z: 0});
    }
  });

  // return (
  //   <RigidBody ref={axeRef} type="kinematicPosition" position={position} colliders="hull" canSleep={false} restitution={0.2} friction={0.4} mass={3}>
  //     <primitive object={scene} scale={1} />;
  //   </RigidBody>
  // );
  return (
    <mesh position={position}>
      <primitive object={scene} scale={1} />;
    </mesh>
  );
}
export default Axe;
