import {create} from "zustand";
import * as THREE from "three";

// 카메라 state
type CameraTargetState = {
  count: number;
  cubePositions: THREE.Vector3[]
  target: THREE.Vector3,
  setTarget: (v: THREE.Vector3) => void;
}

export const useCameraTarget = create<CameraTargetState>((set,get) => ({
  count:3,
  cubePositions: Array.from({ length: 3 }, (_, i) => {
    return new THREE.Vector3(
      (i-1) * 3,
      0,
      (i-1) * 3,
    );
  }),
  target: new THREE.Vector3(0, 0, 0), // 기본은 원점
  setTarget: (v) => set({ target: v }),
}))
