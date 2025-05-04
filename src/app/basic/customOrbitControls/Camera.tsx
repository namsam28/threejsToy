import {useThree, useFrame} from "@react-three/fiber";
import {useEffect} from "react";
import * as THREE from "three";
import {Gesture} from "@use-gesture/vanilla"

/**
 threejs 애드온 기능
 FlyControls : blender와 같은 DCC 비행도구와 유사한 기능(3D 공간에 카메라 이동을 자유롭게 변형)
 FirstPersonControls : 1인칭 컨트롤(FlyControls에 대체 구현)
 */
const spherical = new THREE.Spherical(6,Math.PI/2 *0.6,Math.PI/2*0.5);
function clamp( value, min, max ) {
  return Math.max( min, Math.min( max, value ) );
}
function Camera() {
  const camera = useThree(state => state.camera);
  const gl = useThree(state => state.gl);
  const scene = useThree(state => state.scene);

  useFrame(() => {
    // camera.lookAt(0,0,0);
  });

  // 초기화 처리
  useEffect(() => {
    camera.fov = 75
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.near = 0.1;
    camera.far = 50;
    // 구형 좌표계
    /*
    * r: 원점으로 부터의 거리(0,0,0)
    * phi : y축의 각도
    * theta : z축의 각도
    */
    camera.position.setFromSpherical(spherical);
    camera.updateProjectionMatrix(); // 처음 한번만 업데이트 처리 해주기

    const gesture = new Gesture(gl.domElement, {
      onDrag: (state)=>{
        const [deltaX,deltaY] = state.delta;
        const phi =  clamp(spherical.phi + deltaY * 0.01, 0.001, Math.PI/2 * 0.86);
        const theta =  spherical.theta + deltaX * 0.01;
        spherical.set(spherical.radius,phi,theta);
        camera.position.setFromSpherical(spherical);
      },
      onWheel:(state)=>{
        const [directionX, directionY] = state.direction;
        camera.zoom = clamp(camera.zoom + directionY * 0.1,1, 3);
        camera.updateProjectionMatrix(); // 처음 한번만 업데이트 처리 해주기
      }
    });

    return ()=>{
      gesture.destroy();
    }
  }, []);

  return <></>;
}

export default Camera;
