"use client";
import {Canvas} from "@react-three/fiber";
import {KeyboardControls, OrbitControls} from "@react-three/drei";
import {useMemo} from "react";
import {Leva} from "leva";
import {Perf} from "r3f-perf";
import Light from "@app/move/Light";
import Cube from "@app/move/Cube";
import {useControls} from "leva";

enum Controls {
  left = "left",
  right = "right",
  forward = "forward",
  backward = "backward",
  throw = "throw",
}

function Page() {
  const map = useMemo(() => {
    return [
      {name: Controls.left, keys: ["ArrowLeft", "KeyA"]},
      {name: Controls.right, keys: ["ArrowRight", "KeyD"]},
      {name: Controls.forward, keys: ["ArrowUp", "KeyW"]},
      {name: Controls.backward, keys: ["ArrowDown", "KeyS"]},
      {name: Controls.throw, keys: ["Space"]},
    ];
  }, []);

  const {cameraPosition} = useControls({
    cameraPosition: [1, 1, 1],
  });

  return (
    <div className="w-full h-[100vh]">
      <Leva />
      <KeyboardControls map={map}>
        <Canvas
          className="w-full h-full"
          orthographic
          camera={{
            // fov: 15,
            // near: 0.1,
            // far: 50,
            // position: [0, 4, 8],
            zoom:80,
            position:cameraPosition
          }}>
          <Light />
          <Perf position="top-left" />
          <OrbitControls />

          <Cube />
        </Canvas>
      </KeyboardControls>
    </div>
  );
}

export default Page;
