"use client";
import {forwardRef} from "react";
import {animated} from "react-spring";

const Box = forwardRef((props, ref) => {
  const {children, ...others} = props;
  return (
    <animated.div className="w-100 h-100 bg-red-800" ref={ref} {...others}>
      {children}
    </animated.div>
  );
});

export default Box;
