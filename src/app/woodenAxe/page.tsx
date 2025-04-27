"use client";
import {Canvas} from "@react-three/fiber";
import {OrbitControls, GizmoHelper, GizmoViewport, KeyboardControls, KeyboardControlsEntry} from "@react-three/drei";
import {Physics} from "@react-three/rapier";
import {Leva} from "leva";
import {Perf} from "r3f-perf";
import Light from "@app/woodenAxe/Light";
import Stage from "@app/woodenAxe/Stage";
import {useMemo} from "react";

enum Controls {
  left = "left",
  right = "right",
  forward = "forward",
  backward = "backward",
  throw = "throw",
}

function Home() {
  const map = useMemo<KeyboardControlsEntry<Controls>[]>(() => {
    return [
      {name: Controls.left, keys: ["ArrowLeft", "KeyA"]},
      {name: Controls.right, keys: ["ArrowRight", "KeyD"]},
      {name: Controls.forward, keys: ["ArrowUp", "KeyW"]},
      {name: Controls.backward, keys: ["ArrowDown", "KeyS"]},
      {name: Controls.throw, keys: ["Space"]},
    ];
  }, []);

  return (
    <div className="w-full h-[100vh]">
      <Leva />
      <KeyboardControls map={map}>
        <Canvas
          className="w-full h-full"
          camera={{
            fov: 45,
            near: 0.1,
            far: 200,
            position: [0, 4, 8],
          }}
          // frameloop="demand"
        >
          <Perf position="top-left" />
          <OrbitControls />
          <Light />
          <color args={["#333"]} attach="background" />

          <Physics debug={true}>
            <Stage />
          </Physics>

          {/* 카메라 기즈모 */}
          <GizmoHelper
            alignment="bottom-right" // widget alignment within scene
            margin={[80, 80]} // widget margins (X, Y)
          >
            <GizmoViewport axisColors={["red", "green", "blue"]} labelColor="black" />
          </GizmoHelper>
        </Canvas>
      </KeyboardControls>
    </div>
  );
}

export default Home;
