"use client";
import {Canvas} from "@react-three/fiber";
import {Grid} from "@react-three/drei";
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
        <Grid cellSize={1} sectionSize={5} infiniteGrid={true} fadeDistance={50}/>
      </Canvas>
    </div>
  );
}

export default Page;