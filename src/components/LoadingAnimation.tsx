import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box, useHelper } from '@react-three/drei';
import { DirectionalLight } from 'three';
import { useRef } from 'react';

function RotatingCube() {
  const cubeRef = useRef();
  
  return (
    <Box
      ref={cubeRef}
      args={[1, 2, 1]}
      position={[0, 0, 0]}
    >
      <meshStandardMaterial
        color="#2563eb"
        metalness={0.5}
        roughness={0.2}
      />
    </Box>
  );
}

function BuildingBlocks() {
  const group = useRef();

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (group.current) {
        group.current.rotation.y += 0.01;
      }
    }, 16);

    return () => clearInterval(interval);
  }, []);

  return (
    <group ref={group}>
      {/* Base */}
      <Box args={[3, 0.2, 3]} position={[0, -1.5, 0]}>
        <meshStandardMaterial color="#94a3b8" metalness={0.5} roughness={0.5} />
      </Box>

      {/* Main Building */}
      <Box args={[2, 2.5, 2]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#e2e8f0" metalness={0.3} roughness={0.7} />
      </Box>

      {/* Windows */}
      <Box args={[0.4, 0.4, 0.1]} position={[-0.5, 0.5, 1]}>
        <meshStandardMaterial color="#60a5fa" metalness={0.8} roughness={0.2} />
      </Box>
      <Box args={[0.4, 0.4, 0.1]} position={[0.5, 0.5, 1]}>
        <meshStandardMaterial color="#60a5fa" metalness={0.8} roughness={0.2} />
      </Box>
      <Box args={[0.4, 0.4, 0.1]} position={[-0.5, -0.2, 1]}>
        <meshStandardMaterial color="#60a5fa" metalness={0.8} roughness={0.2} />
      </Box>
      <Box args={[0.4, 0.4, 0.1]} position={[0.5, -0.2, 1]}>
        <meshStandardMaterial color="#60a5fa" metalness={0.8} roughness={0.2} />
      </Box>

      {/* Roof */}
      <Box args={[2.2, 0.2, 2.2]} position={[0, 1.35, 0]}>
        <meshStandardMaterial color="#475569" metalness={0.6} roughness={0.4} />
      </Box>
    </group>
  );
}

export default function LoadingAnimation() {
  return (
    <div className="w-full h-[400px] bg-gradient-to-b from-blue-50 to-indigo-50 rounded-xl overflow-hidden">
      <Canvas
        camera={{ position: [5, 5, 5], fov: 50 }}
        shadows
      >
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 10]}
          intensity={1}
          castShadow
        />
        <BuildingBlocks />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={4}
        />
      </Canvas>
      <div className="absolute left-1/2 bottom-8 -translate-x-1/2 text-center">
        <p className="text-lg font-semibold text-gray-700 mb-3">
          Calculating Construction Estimates
        </p>
        <div className="flex justify-center space-x-2">
          <div className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
          <div className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          <div className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>
    </div>
  );
}