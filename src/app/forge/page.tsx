"use client";
import {Canvas} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
export default function Home() {
  return (
    <div className="w-full h-[100vh]">
      <Canvas
        className="w-full h-full"
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [-4, 3, 6],
        }}>
        <ambientLight color="#ffffff" intensity={0.2} />
        <directionalLight color="#ffffff" intensity={2.5} position={[1, 2, 3]} />
        <OrbitControls />

        <mesh>
          <boxGeometry />
          <meshStandardMaterial color="#aaffff" />
        </mesh>
      </Canvas>
    </div>
  );
}
