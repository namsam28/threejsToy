import {useThree, useFrame} from "@react-three/fiber";
import * as THREE from "three";
import {useEffect, useMemo, useRef} from "react";
import {useGesture} from "@use-gesture/react";
import {useSelectedCube} from "./store/useSelectedCube";
import {clamp} from "@utils/utils";

function Camera() {
  const camera = useThree(state=>state.camera);
  const gl = useThree(state=>state.gl);
  // const selected = useSelectedCube(state=>state.selected);
  // const cameraTarget = useSelectedCube(state=>state.cameraTarget);

  // 카메라 속성
  const cameraSpherical = useMemo(()=>{
    return new THREE.Spherical(10, Math.PI /2 * 0.5, Math.PI /2 * 0.86);
  },[]);
  const cameraPosition = useMemo(()=>{return new THREE.Vector3();},[]);
  // const cameraTargetLerp = useMemo(()=>new THREE.Vector3(),[]);

  useFrame((state, delta)=>{
    // if(selected!==null){
    //   cameraSpherical.theta = cameraSpherical.theta + delta * 0.1;
    // }
    // cameraPosition.setFromSpherical(cameraSpherical).add(cameraTarget);
    // camera.position.lerp(cameraPosition,0.01);
    // cameraTargetLerp.lerp(cameraTarget,0.01);
    // camera.lookAt(cameraTargetLerp);

    cameraPosition.setFromSpherical(cameraSpherical)
    camera.position.lerp(cameraPosition,0.1);
    camera.lookAt(0,0,0);
  });

  useGesture({
    onDrag:(state)=>{
      const [deltaX, deltaY] = state.delta;

      cameraSpherical.theta = cameraSpherical.theta + deltaX * 0.01;
      cameraSpherical.phi = clamp(cameraSpherical.phi + deltaY * 0.01, 0, Math.PI / 2 - 0.1);
    },
    onDragEnd:()=>{
    }
  },{target:gl.domElement})

  useEffect(() => {
    camera.far = 100;
    camera.near = 0.1;
    camera.fov = 75;
    camera.position.setFromSpherical(cameraSpherical);

    camera.updateProjectionMatrix();
  },[]);

  return null;
}

export default Camera;
