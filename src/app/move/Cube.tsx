import {useControls} from "leva";

function Cube() {
  const {cubeColor} = useControls({
    cubeColor: "#ff0000",
  });

  return (
    <>
      <mesh>
        <boxGeometry args={[1,1,1]} />
        <meshStandardMaterial color={cubeColor} />
      </mesh>
    </>
  );
}

export default Cube;
