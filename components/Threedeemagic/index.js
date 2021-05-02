import React, { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

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
  const gltf = useGLTF('./assets/perfectCone.glb')
  console.log(gltf)
  return <primitive object={gltf.scene} />
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
