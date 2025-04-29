"use client";
import {Canvas, useFrame} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import * as THREE from "three";
import Light from "./Light";
import Cube from "./Cube";
import {Leva} from "leva";

function Page(){

  return (
    <div className="w-full h-[100vh] bg-gray-100">
      <Leva />
      <Canvas className="w-full h-full" camera={{
        fov:75,
        near:1,
        far:50,
        position:[3,5,5],
      }}>
        <Light />
        {/*<OrbitControls />*/}

        <Cube />
        <mesh position={[0,-1,0]} rotation={[-Math.PI * 0.5,0, 0]} receiveShadow={true}>
          <planeGeometry args={[10,10]} />
          <meshPhysicalMaterial color="#999" side={THREE.DoubleSide}  />
        </mesh>
      </Canvas>
    </div>
  );
}

export default Page;