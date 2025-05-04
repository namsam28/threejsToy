"use client";
import {Canvas } from "@react-three/fiber";
import {Grid} from "@react-three/drei";
import Light from "./Light";
import Cube from "./Cube";
import {Leva} from "leva";
import Camera from "./Camera";

function Page(){

  return (
    <div className="w-full h-[100vh] bg-gray-100">
      <Leva />

      <Canvas className="w-full h-full">
        <Light />
        <Camera />
        <Cube />
        <Grid cellSize={1} sectionSize={5} infiniteGrid={true} fadeDistance={50}/>
      </Canvas>
    </div>
  );
}

export default Page;