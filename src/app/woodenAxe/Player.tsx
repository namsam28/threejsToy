"use client";
import {useFrame, addEffect} from "@react-three/fiber";
import {useKeyboardControls} from "@react-three/drei";
import {RigidBody, CuboidCollider} from "@react-three/rapier";
import {useRef, useEffect} from "react";
import {Euler, Quaternion, Vector3} from "three";
import Axe from "@app/woodenAxe/Axe";
import woodenAxeStore from "@store/woodenAxeStore";

const eulerRotation = new Euler(0, 0, 0);
const quaternion = new Quaternion();
function Player() {
  const playerRef = useRef<typeof RigidBody | null>(null);
  const axeRef = useRef();
  const thrownAxeRef = useRef();
  const [subscribeKeys, getKeys] = useKeyboardControls();

  const isThrownAxe = woodenAxeStore(state => state.isThrownAxe);
  const coolTime = woodenAxeStore(state => state.coolTime);
  const throwTimestamp = woodenAxeStore(state => state.throwTimestamp);
  const onThrownAxe = woodenAxeStore(state => state.onThrownAxe);
  const setReloadAxe = woodenAxeStore(state => state.setReloadAxe);


  // 상태가 변경되었을 때 진행할 애니메이션
  useFrame((state, delta) => {
    const keys = getKeys();

    // player 체크
    if (playerRef?.current === null) return;

    const playerOrigin = playerRef.current.translation();
    const thrownAxeOrigin = thrownAxeRef.current.translation();
    const speed = delta * 2;
    // const attackSpeed = delta * 10;
    const attackSpeed = delta * 10;
    const translation = {
      x: playerOrigin.x,
      y: playerOrigin.y,
      z: playerOrigin.z,
    };
    if (keys.left) {
      translation.x -= speed;
    }
    if (keys.right) {
      translation.x += speed;
    }
    if (keys.forward) {
      translation.z -= speed;
    }
    if (keys.backward) {
      translation.z += speed;
    }

    // 투척!
    if (throwTimestamp !== null && isThrownAxe) {
      const throwElapsedTime = Date.now() - throwTimestamp;
      if (coolTime > throwElapsedTime) {
        const time = state.clock.getElapsedTime();
        eulerRotation.set(throwElapsedTime * 0.02, 0, 0);
        quaternion.setFromEuler(eulerRotation);
        thrownAxeRef.current.setNextKinematicTranslation({x: -0.3, y: 1, z: thrownAxeOrigin.z + attackSpeed});
        thrownAxeRef.current.setNextKinematicRotation(quaternion);
      } else {
        setReloadAxe();
        const axePosition = axeRef.current.position;
        const axeRotation = axeRef.current.rotation;
        quaternion.setFromEuler(axeRotation);
        console.log(axePosition,axeRotation);
        thrownAxeRef.current.setTranslation(axePosition);
        thrownAxeRef.current.setRotation(quaternion);
        console.log(thrownAxeRef.current);
      }
    }
    playerRef.current.setNextKinematicTranslation(translation);
  });

  // 상태 변화에 대한 조건과 처리되는 함수
  /*
   * throw -> onThrownAxe -> cool
   * */
  useEffect(() => {
    // 투척 구독
    const unSubscribeKeys = subscribeKeys(
      state => {
        return state.throw;
      },
      value => {
        // console.log(value);
        const axePosition = playerRef.current.position;
        console.log(axePosition);

        console.log(playerRef.current);
        onThrownAxe();
      },
    );

    // const unWoodenAxeStore = woodenAxeStore.subscribe(
    //   state => state.isThrownAxe,
    //   value => {
    //     console.log("canThrow changed:", value);
    //   },
    // );
    return () => {
      unSubscribeKeys();
    };
  }, []);

  return (
    <>
      <RigidBody ref={playerRef} type="kinematicPosition" colliders={false} position={[0, 0, 0]} mass={20}>
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[0.5, 1, 0.5]} />
          <meshBasicMaterial color="#ff7777" />
          <CuboidCollider args={[0.25, 0.5, 0.25]} />
        </mesh>
        <Axe ref={axeRef} position={[-0.3, 1, 0.6]} />
      </RigidBody>

      <RigidBody ref={thrownAxeRef} type="kinematicPosition" position={[-1, 1, 0.6]}>
        <Axe />
      </RigidBody>
    </>
  );
}
export default Player;
