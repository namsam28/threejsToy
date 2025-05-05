"use client";
import {useSpring} from "react-spring";
import Box from "@components/Box";
import {useState, useEffect} from "react";

function Section(props) {
  const {title, children} = props;
  return (
    <div className="py-30 px-20 border-dotted border-b-4 border-gray-600">
      <h2 className="text-18 font-bold">{title}</h2>
      <div className="mt-10">{children}</div>
    </div>
  );
}

function Page() {
  const [springs, api] = useSpring(() => ({
    from: { x: 0, opacity: 0.5 },
  }))

  // 클릭 이동
  const handleClick = () => {
    api.start({
      from: {x:0, opacity: 0},
      to: {x:100, opacity:1},
    })
  }

  return (
    <div className="w-full h-[100vh] bg-gray-100">
      <Section title="클릭 시 이동">
        <Box style={...springs} onClick={handleClick} />
      </Section>
    </div>
  );
}

export default Page;
