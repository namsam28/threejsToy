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