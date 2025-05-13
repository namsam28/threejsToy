import {useThree, useFrame} from "@react-three/fiber";
import * as THREE from "three";
import {useEffect, useMemo} from "react";
import {useGesture} from "@use-gesture/react";
import {clamp} from "@utils/utils";

function Camera() {
  const camera = useThree(state=>state.camera);
  const gl = useThree(state=>state.gl);

  // 카메라 속성
  const cameraSpherical = useMemo(()=>{
    return new THREE.Spherical(20, Math.PI /2 * 0.5, Math.PI /2 * 0.86);
  },[]);
  const cameraPosition = useMemo(()=>{return new THREE.Vector3();},[]);

  useFrame((state, delta)=>{
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
