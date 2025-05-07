# OrbitControls 직접 구현하기
목표는 다음과 동일
`useGesture` 또는 직접 구현으로 마우스 드래그에 따라 카메라의 궤도 회전을 제어
`PerspectiveCamera`를 중심으로 마우스 움직임에 따라 카메라가 타겟 객체를 중심으로 회전

기능명세  
- [x] 마우스 드래그(좌우 수평 Y축 제어, 상하 수직 x축 기준 범위 제한)
- [x] `lookAt`으로 항상 중심 객체 바라보기
- [x] (선택) 줌 기능
- [x] `OrbitControls` 없이 구현해보기!

🎓 학습 포인트
카메라 위치를 **구면 좌표계(spherical)**로 다뤄보기  
마우스 움직임을 각도로 변환하는 방식 학습  
직접 카메라 컨트롤 로직을 짜보는 연습  


### issue 대응 및 과정  
이슈...  
- 처음에 camera.position을 통해서 업데이트 하려고 시도.  
- Math.sin, Math.cos을 활용한 회전 처리는 되었으나 범위 지정에 대한 부분이 어려움
  
해결...
- position 속성에 spherical을 변경해주는 setFromSphericalCoods 함수 사용 시도
- setFromSphericalCoods이 아닌 setFromSpherical을 통해 직접 선언한 Spherical 객체를 전달
- clamp 함수를 생성하여 최대최소 범위를 지정해준 후 y축을 제한하도록 범위 제한


### Refactor
1. Spherical 값 누적위치
현재는 state.delta 방식이 drag 거리일 가능성이 존재  
만약 drag 거리라면 이전 값과 비교할 수 있는 값을 통해 다시 적용이 필요  
(현재는 이전 드래그 거리간 차이값으로 확인됨)

2. 줌처리 방식 (Camera zoom vs Camera.position)
줌처리 방식으로 현재 사용방식인 zoom이 있으나 다른 방식도 존재  

zoom 방식  
```jsx
  onWheel:(state)=>{
    const [directionX, directionY] = state.direction;
    camera.zoom = clamp(camera.zoom + directionY * 0.1,1, 3);
    camera.updateProjectionMatrix(); // 처음 한번만 업데이트 처리 해주기
  }
```

position 방식(Spherical에 radian 값을 조절한다.)  
원근 투영 시에는 이 방식이 더 직관적인 수치로 제공된다!
```jsx
  onWheel:(state)=>{
    const [directionX, directionY] = state.direction;
    spherical.radius = clamp(spherical.radius+ directionY * 0.1,1, 8);
    camera.position.setFromSpherical(spherical);
  }
```

3. 유저 인터랙션 개선
요구 사항은 전부 적용했으나 회전에 대한 부분은 부드럽지만  
휠스크롤 액션에서는 끊기는 부분이 눈에 띈다. 이런 경우 lerp를 사용하여 보간처리를 해보자.
```jsx
    const cameraTargetPosition = new THREE.Vector3();
    useFrame(() => {
      camera.position.lerp(cameraTargetPosition,0.1);
    });
    onWheel:(state)=>{
        const [directionX, directionY] = state.direction;
        spherical.radius = clamp(spherical.radius+ directionY * 1,1, 10);
        cameraTargetPosition.setFromSpherical(spherical);
    }
```

4. gesture 함수 제거
gesture.destroy가 아닌 domElement가 언마운트되며 자동 정리됨.
이 외에 방식으로는 현재 공식 문서나 이슈 상에서도 보이지 않는 것으로 확인됨

5. react-spring 사용해서 damping, inertia 적용
react-spring을 적용하기 전에 기존 Vector3와 Spherical를 사용하여 구현하는 방법이 존재.
Vector3 함수에 lerp를 활용하기 위해 '카메라의 위치, 계산용 임시 Spherical 객체' 선언
이후 onDrag, onWheel에서 이벤트로 전달받은 값을 토대로 Sperical에 값을 업데이트.  
카메라 위치 Vector에 값을 반영 후 lerp 반영
```jsx
// Camera2 컴포넌트
// 변수 선언
const spherical = new THREE.Spherical(6,Math.PI/2 *0.6,Math.PI/2*0.5);
const cameraTargetPosition = new THREE.Vector3(3,5,5);

// 제스처 이벤트 처리
const gesture = new Gesture(gl.domElement, {
	onDrag: (state)=>{
		const [deltaX,deltaY] = state.delta;
		const phi =  clamp(spherical.phi + deltaY * 0.01, 0.001, Math.PI/2 * 0.86);
		const theta =  spherical.theta + deltaX * 0.01;
		spherical.set(spherical.radius,phi,theta);
		cameraTargetPosition.setFromSpherical(spherical);
	},
	onWheel:(state)=>{
		const [directionX, directionY] = state.direction;
		spherical.radius = clamp(spherical.radius+ directionY * 1,1, 10);
		cameraTargetPosition.setFromSpherical(spherical);
	},
	onDragEnd: () => {
		// spherical 갱신
		spherical.phi = phi.get();
		spherical.theta = theta.get();
	},
	onWheelEnd: () => {
		spherical.radius = radius.get();
	}
});

// lerp 처리
useFrame(() => {
	camera.position.lerp(cameraTargetPosition,0.1);
});
```

react-spring으로 처리하는 방법.
이전 방식과 다르게 Sperical나 Vector에 값은 react-spring이 모두 담당.  
애니메이션 매 프레임 계산은 react-spring에서 담당하기에 값만 업데이트 해주면 됨. 
```jsx
function Camera() {
    const camera = useThree(state => state.camera);
    const gl = useThree(state => state.gl);
    const [{radius, phi, theta}, api] = useSpring(() => ({
        radius: 6,
        phi: (Math.PI / 2) * 0.6,
        theta: (Math.PI / 2) * 0.5,
        config: {
            tension: 1200,
            friction: 10,
            mass: 1,
            precision: 0.001,
        },
    }));
    
    useFrame(() => {
        const newSpherical = new THREE.Spherical(radius.get(), phi.get(), theta.get());
        camera.position.setFromSpherical(newSpherical);
    });
    
    // 초기화 처리
    useEffect(() => {
        camera.fov = 75;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.near = 0.1;
        camera.far = 50;
        camera.updateProjectionMatrix(); // 처음 한번만 업데이트 처리 해주기
        
        const gesture = new Gesture(gl.domElement, {
            onDrag: ({delta: [dx, dy], last}) => {
                api.start({
                    phi: clamp(phi.get() + dy * 0.1, 0.001, Math.PI * 0.86),
                    theta: theta.get() + dx * 0.1,
                });
            },
            onWheel: ({direction: [, dy]}) => {
                api.start({
                    radius: clamp(radius.get() + dy, 2, 10),
                });
            },
        });
    }, []);
    return <></>;
}
```
