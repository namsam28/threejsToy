# 회전하는 큐브 + 마우스 인터랙션
- [x] Three.js 씬에 박스 하나를 생성한다.
- [x] 프레임마다 천천히 회전하게 만든다.
- [x] 마우스를 클릭하고 드래그할 때, 박스가 사용자의 마우스 움직임에 따라 회전해야 한다.
- [x] (선택) 조명을 추가하고 색상이나 강도도 조절할 수 있도록 UI를 추가해본다.

## 객체 회전 - ver. drei
PresentationControls 사용해서 구현.  
감싼 mesh에 대해 회전을 적용 가능, 일정 구간 돌아가면 회전이 이벤트가 상이함

## 객체 마우스 회전 예시
https://discourse.threejs.org/t/rotatable-object-with-right-click-drag/58468/4

## 마우스 이벤트처리 useDrag, useGesture
마우스이벤트 처리 로직 useDrag 설정하기  
[useGesture로 multiple 이벤트 처리](https://use-gesture.netlify.app/docs/gestures/#handling-multiple-gestures-at-once)

`@use-gesture/react` 라이브러리를 통해 mesh 객체 마우스 이벤트 처리가 가능하고 `bind`를 통해서 이벤트 처리.  
useDrag로는 한계가 있기에 다른 이벤트 처리도 포함하여 처리하려면  
`useGesture`를 통해서 다른 이벤트를 통합시켜서 적용 필요

