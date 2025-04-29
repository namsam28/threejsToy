"use client";
import {Clone, useGLTF} from "@react-three/drei";
import {forwardRef} from "react";

const Axe = forwardRef((props, ref) => {
  const {position = [0, 0, 0]} = props;
  const {scene} = useGLTF("/gltf/wooden_axe_2k.gltf/wooden_axe_2k.gltf");

  return (
    <group ref={ref} position={position}>
      <Clone object={scene} scale={1} />
    </group>
  );
});
export default Axe;
