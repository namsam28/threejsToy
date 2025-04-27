function Anvil(props) {
  const {position} = props;
  return (
    <>
      <mesh position={position}>
        <boxGeometry />
        <meshStandardMaterial color="#aaffff" />
      </mesh>
    </>
  );
}

export default Anvil;
