"use client";
import {Canvas} from "@react-three/fiber";
import {Grid} from "@react-three/drei";
import Light from "./Light";
import {Leva} from "leva";
import Camera from "./Camera";
import * as THREE from "three";
import {Perf} from "r3f-perf";
import WaveCubes from "./WaveCubes";

// THREE.ColorManagement.legacy = false;

function Page(){
  return (
    <div className="w-full h-[100vh] bg-gray-100">
      <Leva />

      <Canvas className="w-full h-full">
        <Perf position="top-left" />
        <Light />
        <Camera />
        <WaveCubes />
        <Grid cellSize={1} sectionSize={5} infiniteGrid={true} fadeDistance={50}/>
      </Canvas>
    </div>
  );
}

export default Page;