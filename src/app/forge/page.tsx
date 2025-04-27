"use client";
import {Canvas} from "@react-three/fiber";
import {OrbitControls, GizmoHelper, GizmoViewport} from "@react-three/drei";
import {Leva} from "leva";
import {Perf} from "r3f-perf";
import Light from "@app/forge/Light";
import Stage from "@app/forge/Stage";

export default function Home() {
  return (
    <div className="w-full h-[100vh]">
      <Leva />

      <Canvas
        className="w-full h-full"
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [4, 8, 10],
        }}>
        <Perf position="top-left" />
        <OrbitControls />
        <Light />
        <color args={["#333"]} attach="background" />

        <Stage />

        {/* 카메라 기즈모 */}
        <GizmoHelper
          alignment="bottom-right" // widget alignment within scene
          margin={[80, 80]} // widget margins (X, Y)
        >
          <GizmoViewport axisColors={["red", "green", "blue"]} labelColor="black" />
        </GizmoHelper>
      </Canvas>
    </div>
  );
}
