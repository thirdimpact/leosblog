import React, { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { useGLTF, useTexture } from '@react-three/drei'

function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (mesh.current.rotation.x += 0.02))
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
      onDoubleClick={(e) => console.log('doubleclicktest', e)}
    >
      <boxGeometry args={[1, 1, 1]} />
      {/* <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} /> */}
      <meshPhongMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

function Scene() {
  const { nodes } = useGLTF('./assets/perfectCone.glb')
  const [
    colorMap,
    displacementMap,
    normalMap,
    roughnessMap,
    aoMap,
  ] = useTexture([
    './assets/PavingStones/PavingStones092_1K_Color.jpg',
    './assets/PavingStones/PavingStones092_1K_Displacement.jpg',
    './assets/PavingStones/PavingStones092_1K_Normal.jpg',
    './assets/PavingStones/PavingStones092_1K_Roughness.jpg',
    './assets/PavingStones/PavingStones092_1K_AmbientOcclusion.jpg',
  ])
  return (
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.Cone.geometry}
      position={[0, 0, -5]}
    >
      <meshStandardMaterial
        displacementScale={0.2}
        map={colorMap}
        displacementMap={displacementMap}
        normalMap={normalMap}
        roughnessMap={roughnessMap}
        aoMap={aoMap}
      />
    </mesh>
  )
}

export default function Threedeemagic() {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
        <Box position={[0, -1.2, 0]} />
        <Scene />
      </Suspense>
    </Canvas>
  )
}
