import {useThree, useFrame} from "@react-three/fiber";
import {useEffect, useRef} from "react";
import * as THREE from "three";
import {Gesture} from "@use-gesture/vanilla";
import {useSpring} from "@react-spring/three";

/**
 threejs 애드온 기능
 FlyControls : blender와 같은 DCC 비행도구와 유사한 기능(3D 공간에 카메라 이동을 자유롭게 변형)
 FirstPersonControls : 1인칭 컨트롤(FlyControls에 대체 구현)
 */
function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function Camera() {
  const camera = useThree(state => state.camera);
  const gl = useThree(state => state.gl);
  const [{radius, phi, theta}, api] = useSpring(() => ({
    radius: 6,
    phi: (Math.PI / 2) * 0.6,
    theta: (Math.PI / 2) * 0.5,
    config: {
      tension: 1200,
      friction: 10,
      mass: 1,
      precision: 0.001,
    },
  }));

  useFrame(() => {
    const newSpherical = new THREE.Spherical(radius.get(), phi.get(), theta.get());
    camera.position.setFromSpherical(newSpherical);
  });

  // 초기화 처리
  useEffect(() => {
    camera.fov = 75;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.near = 0.1;
    camera.far = 50;
    camera.updateProjectionMatrix(); // 처음 한번만 업데이트 처리 해주기

    const gesture = new Gesture(gl.domElement, {
      onDrag: ({delta: [dx, dy], last}) => {
        api.start({
          phi: clamp(phi.get() + dy * 0.1, 0.001, Math.PI * 0.86),
          theta: theta.get() + dx * 0.1,
        });
      },
      onWheel: ({direction: [, dy]}) => {
        api.start({
          radius: clamp(radius.get() + dy, 2, 10),
        });
      },
    });
  }, []);

  return <></>;
}

export default Camera;
