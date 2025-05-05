# react-spring
현재 react-spring에 버그가 있는 것으로 확인됨.  
마운트 시 적용되야되는 이벤트 처리가 제대로 발생이 안되는 것으로 보이며,   
편법으로 state 변경을 통한 컴포넌트 재렌더링을 통해서 업데이트를 처리
```jsx
const springs = useSpring({
	from: {x:0, opacity: 0},
	to: {x:100, opacity: 1},
});

const [isLoading, setIsLoading] = useState(false);

useEffect(()=>{
	setIsLoading(true);
},[]);
```
