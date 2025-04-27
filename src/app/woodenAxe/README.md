# 도끼 투척

1. Player 캐릭터가 1인칭 시점(좌우 이동만 가능)
2. 좌클릭으로 도끼 투척(오래 누르면 강하게 던짐)
3. 도끼를 던졌을 때 대상을 맞추면 폭발(대상은 1~5개)
4. PBR 적용

## issue
1. **useGLTF colliders="hull" 에러, mesh geometry 중첩에러**  
colliders="hull, trimesh"인 경우 mesh에 geometry에 따라 충돌범위 지정.  
gltf 파일 로딩 중에는 hull(trimesh) 적용에 에러가 생기면서 props 인자에도 에러 발생.    
----  
RigidBody 내부의 mesh > primitive 순으로 구조를 가지며   
useGLTF collider 생성 시 hull, trimesh에서 얻고자 하는 geometry에 정보에 혼란이 생김.  
바깥 mesh에 geometry는 undefined, 내부 primitive에 적용된 geometry 두 개가 생성
 

**rapier collider function** 
```jsx
const createColliderPropsFromChildren // collider 생성 함수
const getColliderArgsFromGeometry // geometry get clone
```

**example**
```jsx
function Axe(props) {
  const {position = [0, 0, 0]} = props;
  const axe = useGLTF("/gltf/wooden_axe_2k.gltf/wooden_axe_2k.gltf");

  return (
    <RigidBody position={position} colliders="cuboid" canSleep={false} restitution={0.2} friction={0.4}>
      <mesh castShadow={true} receiveShadow={true}>
        <primitive object={axe.scene} scale={3} />
      </mesh>
    </RigidBody>
  );
}
```
해결 3가지 타입
- 다른 collider 타입 : colliders를 다른 타입으로 지정하면 동작(ball, cuboid)
- mesh 내부에 다른 geometry 제공(비추) 
```jsx
<RigidBody position={position} colliders="hull" canSleep={false} restitution={0.2} friction={0.4}>
  <mesh castShadow={true} receiveShadow={true}>
    <boxGeometry args={[1, 1, 1]} />
    <primitive object={axe.scene} scale={3} />
  </mesh>
</RigidBody>
```
- 에러 원인인 mesh 자체를 없애고 group 형태로 코드 변경(중첩된 mesh에 선언되지 않은 geometry=undefined 상황 자체를 제거)
```jsx
<group>
  <RigidBody position={position} colliders="hull" canSleep={false} restitution={0.2} friction={0.4}>
    <primitive object={scene} scale={3} />;
  </RigidBody>
</group>
```
