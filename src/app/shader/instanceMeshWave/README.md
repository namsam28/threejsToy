# ShaderMaterial
## 🎯 InstancedMesh + Time-based Scale Animation + ShaderMaterial
- InstancedMesh를 사용해 다수의 오브젝트 렌더링
- 각 인스턴스가 시간에 따라 scale 값이 변하도록 애니메이션
- 각 인스턴스마다 색상을 다르게 주기 위해 instanceColor 사용
- Shader를 사용하지 않고, CPU 측에서 scale 조절

기능명세
- [x] 큐브들이 격자 형태로 배치됨
- [x] 각각의 큐브가 시간에 따라 크기가 작아졌다 커짐 (sin 곡선 기반)
- [x] 각 큐브는 고유한 색을 가짐 (HSV → RGB 변환을 사용)

🎓 학습 포인트
- useMemo를 통해 Object3D를 한 번만 생성하고 재사용
- useFrame에서 position, scale, matrix 업데이트
- Color.setHSL을 이용해 인스턴스별로 다양한 색상 적용


