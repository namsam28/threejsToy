function Light(){
  return (
    <>
      <ambientLight color="#ffffff" intensity={4.5} />
      <directionalLight color="#ffffff" intensity={4.5} position={[1, 2, 3]} />
    </>
  );
}

export default Light;