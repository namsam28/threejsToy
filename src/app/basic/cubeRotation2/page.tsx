"use client";
import {Canvas} from "@react-three/fiber";
import {Grid} from "@react-three/drei";
import Light from "./Light";
import Cube from "./Cube";
import {Leva} from "leva";
import {cubeRotationStore} from "./store/cubeRotationStore";

function Page(){
  const setIsQuaternion = cubeRotationStore(state=>state.setIsQuaternion);
  const isQuaternion = cubeRotationStore(state=>state.isQuaternion);

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
      <button type="button" className={`absolute right-20 bottom-30 min-w-130 text-white text-20 p-6 px-12 rounded-4 ${isQuaternion ? "bg-red-800" : "bg-black"} hover:opacity-80`} onClick={()=>setIsQuaternion(!isQuaternion)}>
        {isQuaternion ? "Quaternion" : "Eular"}
      </button>
    </div>
  );
}

export default Page;