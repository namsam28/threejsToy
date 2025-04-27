import {create} from "zustand";
import {combine} from "zustand/middleware";

// const woodenAxeStore = create(
//   () => ({
//   isThrownAxe: false,
//   coolTime: 1000,
// }));
const woodenAxeStore = create(
  combine(
    {
      isThrownAxe: false,
      throwTimestamp: null,
      coolTime: 1000,
    },
    (set, get) => ({
      // 투척
      onThrownAxe: () => {
        if (get().isThrownAxe === false) {
          console.log("던지기");
          set(state => ({
            isThrownAxe: true,
            throwTimestamp: Date.now(),
          }));
        }
      },
      // 장전
      setReloadAxe: () => {
        set(state => ({
          isThrownAxe: false,
          throwTimestamp: null,
        }));
      },
    }),
  ),
);

export default woodenAxeStore;
