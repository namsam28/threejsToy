import Anvil from "@app/forge/Anvil";
import Hammer from "@app/forge/Hammer";
import * as THREE from "three";

function Stage() {
  return (
    <>
      <Anvil position={[0, 0.5, 0]} />
      <Hammer position={[0, 4.5, 0]} />
      <mesh rotation={[Math.PI * 0.5, 0, 0]}>
        <planeGeometry args={[5, 5, 5, 5]} />
        <meshBasicMaterial color="#ff00ff" side={THREE.DoubleSide} />
      </mesh>
    </>
  );
}
export default Stage;
