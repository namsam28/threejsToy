"use client";
import {forwardRef} from "react";
import {animated} from "react-spring";

const Box = forwardRef((props, ref) => {
  return <animated.div className="w-100 h-100 bg-red-800" ref={ref} {...props} />
});

export default Box;
