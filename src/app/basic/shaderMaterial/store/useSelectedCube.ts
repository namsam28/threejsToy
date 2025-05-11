import { create } from 'zustand'
import * as THREE from 'three'

interface State {
  selected: number | null
  setSelected: (index: number | null) => void
  cameraTarget: THREE.Vector3
  setCameraTarget: (pos: THREE.Vector3) => void
}

export const useSelectedCube = create<State>((set) => ({
  selected: null,
  cameraTarget: new THREE.Vector3(0, 0, 0),
  setSelected: (index) => set({ selected: index }),
  setCameraTarget: (pos) => set({ cameraTarget: pos }),
}))