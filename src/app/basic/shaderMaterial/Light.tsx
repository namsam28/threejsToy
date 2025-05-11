function Light(){

  return <>
    <ambientLight intensity={1.0} />
    <directionalLight color={"#ffeeee"} position={[3, 4, 4]} intensity={3.0} />
  </>
}

export default Light;