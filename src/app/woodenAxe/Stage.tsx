"use client";
import * as THREE from "three";
import Player from "@app/woodenAxe/Player";
import {RigidBody, CuboidCollider} from "@react-three/rapier";

const stageSize = 10;
const colliderSize = stageSize / 2;
function Stage() {
  return (
    <>
      <Player />

      <RigidBody restitution={3} colliders={false} type="fixed">
        <mesh rotation={[Math.PI * 0.5, 0, 0]}>
          <planeGeometry args={[stageSize, stageSize]} />
          <meshBasicMaterial color="#eee" side={THREE.DoubleSide} />
          <CuboidCollider args={[colliderSize, colliderSize, 0.2]} position={[0, 0, 0.2]} restitution={0.2} />
        </mesh>
      </RigidBody>
    </>
  );
}
export default Stage;
