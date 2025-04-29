import {useControls} from "leva";

function Light(){

  const {color,intensity} = useControls("directionalLight",{
    color: "#ffeeee",
    intensity:{
      value:4.0,
      min:0,
      max:10,
      step:0.1,
    }
  });

  return <>
    <ambientLight intensity={1.0} />
    <directionalLight color={color} position={[3, 4, 4]} intensity={intensity} />
  </>
}

export default Light;