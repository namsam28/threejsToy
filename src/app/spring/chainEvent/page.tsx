"use client";
import {useSpring, useChain, useTransition, config, useSpringRef, animated} from "react-spring";
import Box from "@components/Box";
import {useState, useEffect, useMemo} from "react";
import data from "./config";

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
  const [open, setOpen] = useState(false);
  const springApi = useSpringRef();

  const {size, ...rest} = useSpring({
    ref: springApi,
    config: config.default,
    from: {size: "20%", background: "hotpink"},
    to: {
      size: open ? "100%" : "20%",
      background: open ? "white" : "hotpink",
    },
  });

  /**
   * useTransition
   * in/out 이벤트 처리
   * useTransition(데이터영역, spring 이벤트 작성)
   * 데이터의 전/후를 비교하여 데이터 변화에 따라 애니메이션을 진행하도록 적용한다. useSpring과 기능은 비슷하지만 데이터를 비교하여 적용
   */
  const transApi = useSpringRef();
  const transition = useTransition(open ? data:[], {
    ref: transApi,
    trail: 400 / data.length, // 데이터 간 이벤트 딜레이 값(100당 100ms, 0.1초), 모든 대상 애니메이션 적용
    from: {opacity: 0, scale: 0},
    enter: {opacity: 1, scale: 1},
    leave: {opacity: 0, scale: 0},
    expires: 100, //항목이 사라지고 500ms 후 실제로 제거
    // exitBeforeEnter: true, // 기존 항목의 leave 애니메이션이 끝난 후 에만 새 항목이 enter 애니메이션을 시작(state가 변경되면서 오류가 나는 경우가 존재)
    // config: {
    //   tension: 100,   // 스프링의 "강도" (높을 수록 빠르고 강한 힘)
    //   friction: 10,   // 마찰 (높을수록 천천히 멈춤)
    //   mass: 10,        // 질량 (높을수록 무거운 느낌, 관성이 생김)
    // }
    config:(key)=>{
      console.log(key);
      return {}
    }
  });

  /**
  * useChain
  * hooks를 순차적으로 오케스트레이 하는데 사용(애니메이션을 비동기적으로 순차 진행)
  * useChain([애니메이션 배열], [delay 시간비율], 체인 시간 비율)
   * delay 시간 배율은 (0 ~ 1.0) 값을 입력, 1000ms 기준으로 [0.4, 0.6]값을 가진 비율이면 0.4초, 0.6초에 애니메이션이 진행
   * 체인 시간 비율은 기본값 1000(1초), 늘어날 수록 delay도 비례해서 커짐
  */
  useChain(open ? [springApi, transApi] : [transApi, springApi], [0, open ? 0.1 : 0.6],1000);

  return (
    <div className="w-full h-[100vh] bg-blue-200 p-20 flex items-center justify-center">
      <animated.div onClick={()=>{setOpen(!open)}} className="relative grid grid-cols-[repeat(4,minmax(100px,1fr))] gap-25 p-25 bg-white rounded-5 cursor-pointer shadow-[0px 10px 10px -5px rgba(0, 0, 0, 0.05)]" style={{...rest, width:size, height:size}}>
        {transition((style, item) => (
          <Box className="w-full h-full bg-white rounded-5 will-change-transform will-change-opacity" style={{...style, background: item.css}}/>
        ))}
      </animated.div>
    </div>
  );
}

export default Page;
