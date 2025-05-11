function Cube(props) {
  const {position=[0,0,0]} = props;

  return (
    <mesh position={position} name="cube">
      <boxGeometry />
      <meshStandardMaterial />
    </mesh>
  );
}

export default Cube;
