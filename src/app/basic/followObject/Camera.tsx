import {useThree, useFrame} from "@react-three/fiber";
import { useCameraTarget } from "./store/useCameraTarget";
import {useEffect, useRef, useMemo} from "react";
import * as THREE from "three";
import {useGesture} from "@use-gesture/react";
import {clamp} from "@utils/utils";

const cameraSpherical = new THREE.Spherical(6, Math.PI / 2.3, Math.PI / 2.5);
function Camera() {
  const camera = useThree(state => state.camera);
  const gl = useThree(state => state.gl);
  const raycaster = useThree(state => state.raycaster);
  const { target } = useCameraTarget();
  const dragging = useRef(false);

  // 카메라 속성
  const cameraPosition = useMemo(()=>new THREE.Vector3(),[]);
  const cameraTarget = useMemo(()=>new THREE.Vector3(),[]);

  useFrame((state, delta) => {
    if(dragging.current === false) {
      cameraSpherical.theta = cameraSpherical.theta + delta * 0.1;
    }

    // 카메라 위치 spherical을 적용하고 add로 추가할 target 원점 기준 위치를 더해서 반영
    cameraPosition.setFromSpherical(cameraSpherical).add(target);
    camera.position.lerp(cameraPosition, 0.05);

    cameraTarget.lerp(target, 0.05);
    camera.lookAt(cameraTarget);
  });

  useGesture(
    {
      onDrag: state => {
        if(state.first){
          dragging.current = true;
        }
        const [deltaX, deltaY] = state.delta;
        const phi = clamp(cameraSpherical.phi + deltaY * 0.01,0.001,Math.PI / 2 * 0.86);
        const theta =  cameraSpherical.theta + deltaX * 0.01;
        cameraSpherical.set(cameraSpherical.radius, phi, theta)
        // camera.position.setFromSpherical(cameraSpherical);
      },
      onDragEnd: state => {
        dragging.current = false;
      },
    },
    {target: gl.domElement},
  );

  useEffect(() => {
    camera.fov = 75;
    camera.near = 0.01;
    camera.far = 100;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    // camera.position.setFromSpherical(cameraSpherical);

    camera.position.setFromSpherical(cameraSpherical);
  }, []);

  return null;
}

export default Camera;
