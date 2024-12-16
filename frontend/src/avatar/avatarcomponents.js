// Avatar.js
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';

const Avatar = () => {
  const { scene } = useGLTF('/BaseHuman.glb');  // Asegúrate de poner el camino correcto

  return (
    <Canvas style={{ width: '100%', height: '600px' }}>
      <ambientLight intensity={0.1} />
      <spotLight position={[10, 10, 10]} angle={0.15} />
      <primitive object={scene} scale={2.5} />
      <OrbitControls />
      <Environment preset="sunset" />
    </Canvas>
  );
}

export default Avatar;