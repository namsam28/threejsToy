import {create} from "zustand";
import {combine} from "zustand/middleware";

export const cubeRotationStore = create(
  combine(
    {
      isRotation: false,
    },
    (set) => ({
      setIsRotation: (isBoolean:boolean) => {
        set(state=>({
          isRotation: isBoolean,
        }))
      },
    }),
  ),
);
