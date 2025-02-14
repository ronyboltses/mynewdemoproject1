import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, useHelper, Text, Sky, Cloud, Sphere, Cylinder } from '@react-three/drei';
import { DirectionalLightHelper, DirectionalLight } from 'three';
import { useCalculatorStore } from '../store/calculatorStore';

function CloudsLayer() {
  return (
    <group position={[0, 30, 0]}>
      <Cloud position={[-10, 0, -10]} speed={0.2} opacity={0.5} />
      <Cloud position={[10, 2, -8]} speed={0.1} opacity={0.3} />
      <Cloud position={[-8, 1, 10]} speed={0.3} opacity={0.4} />
      <Cloud position={[12, -1, 5]} speed={0.2} opacity={0.5} />
    </group>
  );
}

function Floor({ 
  width, 
  length, 
  height, 
  position, 
  floorNumber,
  doors = 1,
  windows = 0
}: { 
  width: number;
  length: number;
  height: number;
  position: [number, number, number];
  floorNumber: number;
  doors?: number;
  windows?: number;
}) {
  const windowWidth = 0.8;
  const windowHeight = 1.2;
  
  // Calculate window positions for all sides
  const getWindowPositions = () => {
    const positions = [];
    if (windows <= 0) return positions;

    // Distribute windows evenly across all sides
    const totalSides = 4;
    let remainingWindows = windows;
    const sides = ['front', 'right', 'back', 'left'];
    
    sides.forEach((side, index) => {
      if (remainingWindows <= 0) return;
      
      // Calculate windows for this side
      const windowsForSide = Math.ceil(remainingWindows / (totalSides - index));
      remainingWindows -= windowsForSide;
      
      const spacing = (side === 'front' || side === 'back') ? width : length;
      const gap = spacing / (windowsForSide + 1);
      
      for (let i = 0; i < windowsForSide; i++) {
        const position = gap * (i + 1);
        
        switch(side) {
          case 'front':
            positions.push({ side, x: -width/2 + position, z: length/2 });
            break;
          case 'right':
            positions.push({ side, x: width/2, z: length/2 - position });
            break;
          case 'back':
            positions.push({ side, x: width/2 - position, z: -length/2 });
            break;
          case 'left':
            positions.push({ side, x: -width/2, z: -length/2 + position });
            break;
        }
      }
    });
    
    return positions;
  };

  const windowPositions = getWindowPositions();

  return (
    <group position={position}>
      {/* Floor Structure */}
      <Box args={[width, height, length]}>
        <meshStandardMaterial color="#f1f5f9" metalness={0.2} roughness={0.8} />
      </Box>

      {/* Windows */}
      {windowPositions.map((pos, i) => {
        const isSide = pos.side === 'left' || pos.side === 'right';
        return (
          <Box 
            key={`window-${i}`}
            args={[isSide ? 0.1 : windowWidth, windowHeight, isSide ? windowWidth : 0.1]} 
            position={[pos.x, 0, pos.z]}
          >
            <meshStandardMaterial color="#bfdbfe" metalness={0.8} roughness={0.2} />
          </Box>
        );
      })}

      {/* Door (only on ground floor) */}
      {floorNumber === 0 && (
        <Box 
          args={[1.4, 2.2, 0.2]} 
          position={[0, -0.4, length/2 + 0.1]}
        >
          <meshStandardMaterial color="#334155" metalness={0.3} roughness={0.7} />
        </Box>
      )}

      {/* Floor Label */}
      <Text
        position={[-width/2 - 1, 0, 0]}
        rotation={[0, Math.PI/2, 0]}
        fontSize={0.5}
        color="#475569"
      >
        {`Floor ${floorNumber + 1}`}
      </Text>
    </group>
  );
}

function House() {
  const { advancedCalc } = useCalculatorStore();
  const lightRef = useRef<DirectionalLight>();
  useHelper(lightRef, DirectionalLightHelper, 5);

  const scaleFactor = 8;
  const width = Math.max(advancedCalc.width / scaleFactor, 6) || 6;
  const length = Math.max(advancedCalc.length / scaleFactor, 6) || 6;
  const floorHeight = 3.2;
  const totalHeight = advancedCalc.floors * floorHeight;

  return (
    <group position={[0, 0, 0]}>
      {/* Foundation */}
      <Box args={[width + 0.4, 0.5, length + 0.4]} position={[0, 0.2, 0]}>
        <meshStandardMaterial color="#94a3b8" />
      </Box>

      {/* Floors */}
      {Array.from({ length: advancedCalc.floors || 1 }).map((_, i) => (
        <Floor
          key={`floor-${i}`}
          width={width}
          length={length}
          height={floorHeight - 0.2}
          position={[0, i * floorHeight + floorHeight/2, 0]}
          floorNumber={i}
          windows={advancedCalc.windows}
          doors={advancedCalc.doors}
        />
      ))}

      {/* Roof */}
      <group position={[0, totalHeight, 0]}>
        <Box 
          args={[width * 1.2, floorHeight * 0.3, length * 1.2]} 
          position={[0, floorHeight * 0.15, 0]}
        >
          <meshStandardMaterial color="#64748b" metalness={0.4} roughness={0.6} />
        </Box>
      </group>

      {/* Parking */}
      {advancedCalc.parking && (
        <group position={[width * 0.7, 0, 0]}>
          <Box args={[width * 0.8, 0.1, length]} position={[0, 0.05, 0]}>
            <meshStandardMaterial color="#e2e8f0" />
          </Box>
          {/* Parking Pillars */}
          {[-1, 1].map((x) => (
            <Box 
              key={`pillar-${x}`}
              args={[0.2, 2.5, 0.2]} 
              position={[x * (width * 0.4), 1.25, 0]}
            >
              <meshStandardMaterial color="#94a3b8" />
            </Box>
          ))}
          {/* Parking Roof */}
          <Box args={[width * 0.9, 0.1, length * 1.1]} position={[0, 2.5, 0]}>
            <meshStandardMaterial color="#94a3b8" />
          </Box>
        </group>
      )}

      {/* Water Tanks */}
      {Array.from({ length: advancedCalc.tanks || 0 }).map((_, i) => (
        <group 
          key={`tank-${i}`} 
          position={[
            -width/2 + 1 + (i * 1.5), 
            totalHeight + floorHeight * 0.3, 
            -length/2 + 1
          ]}
        >
          <Box args={[1, 1.5, 1]}>
            <meshStandardMaterial color="#0ea5e9" metalness={0.6} roughness={0.4} />
          </Box>
          <Box args={[1.2, 0.1, 1.2]} position={[0, 0.8, 0]}>
            <meshStandardMaterial color="#0369a1" metalness={0.6} roughness={0.4} />
          </Box>
        </group>
      ))}

      {/* Enhanced Lighting */}
      <directionalLight
        ref={lightRef}
        position={[10, 10, 10]}
        intensity={1.2}
        castShadow
      />
      <directionalLight position={[-5, 5, -5]} intensity={0.6} />
      <ambientLight intensity={0.5} />
    </group>
  );
}

export default function ThreeDModel() {
  const { advancedCalc } = useCalculatorStore();
  
  return (
    <div className="space-y-4">
      <div className="relative w-full h-[600px] bg-gradient-to-b from-blue-50 to-gray-100 rounded-xl overflow-hidden shadow-inner">
        <div className="absolute inset-0">
          <Canvas
            shadows
            camera={{ position: [20, 20, 20], fov: 50 }}
            className="rounded-xl"
          >
            <Sky sunPosition={[100, 20, 100]} />
            <House />
            <OrbitControls
              enableZoom={true}
              maxPolarAngle={Math.PI * 0.6}
              minDistance={10}
              maxDistance={100}
            />
            <gridHelper args={[80, 80, "#e5e7eb", "#d1d5db"]} />
          </Canvas>
        </div>
      </div>
      
      <div className="bg-white rounded-lg p-4 shadow-md">
        <h4 className="text-sm font-medium text-gray-600 mb-2">Model Information</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Floors:</span>
            <span className="ml-2 font-medium">{advancedCalc.floors || 1}</span>
          </div>
          <div>
            <span className="text-gray-500">Dimensions:</span>
            <span className="ml-2 font-medium">{advancedCalc.length || 0}' × {advancedCalc.width || 0}'</span>
          </div>
          <div>
            <span className="text-gray-500">Windows per Floor:</span>
            <span className="ml-2 font-medium">{advancedCalc.windows || 0}</span>
          </div>
          <div>
            <span className="text-gray-500">Doors:</span>
            <span className="ml-2 font-medium">{advancedCalc.doors || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
}