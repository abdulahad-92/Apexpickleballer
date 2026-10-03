'use client';
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';

function createPickleballTexture() {
  if (typeof document === 'undefined') return null;

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  // Optic Neon Yellow Base
  ctx.fillStyle = '#d8f800';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Perforated Holes Grid Pattern
  ctx.fillStyle = '#3f5200';
  const rows = 8;
  const cols = 16;
  const radius = 14;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const offsetX = (r % 2 === 1) ? canvas.width / cols / 2 : 0;
      const x = (c * canvas.width) / cols + offsetX + canvas.width / cols / 2;
      const y = (r * canvas.height) / rows + canvas.height / rows / 2;

      ctx.beginPath();
      ctx.arc(x % canvas.width, y, radius, 0, Math.PI * 2);
      ctx.fill();

      // Darker inner hole ring
      ctx.strokeStyle = '#283600';
      ctx.lineWidth = 3;
      ctx.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

interface PickleballProps {
  position?: [number, number, number];
  small?: boolean;
}

function PickleballModel({ position = [2.6, 2.3, 0], small = true }: PickleballProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useMemo(() => createPickleballTexture(), []);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Smoothly tilt and rotate towards mouse pointer
      meshRef.current.rotation.x += (state.pointer.y * 0.25 - meshRef.current.rotation.x) * 0.08;
      meshRef.current.rotation.y += (state.pointer.x * 0.35 - meshRef.current.rotation.y) * 0.08;
      
      // Continuous orbital spin
      meshRef.current.rotation.y += delta * 0.45;
      meshRef.current.rotation.z += delta * 0.2;
    }
  });

  const radius = small ? 0.58 : 2.0;
  const scale = small ? 0.95 : 1.2;

  return (
    <Float speed={small ? 2.0 : 2.5} rotationIntensity={0.3} floatIntensity={small ? 0.4 : 0.8}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <sphereGeometry args={[radius, 48, 48]} />
        <meshStandardMaterial
          color="#e4ff1a"
          roughness={0.25}
          metalness={0.12}
          map={texture || undefined}
          bumpMap={texture || undefined}
          bumpScale={small ? 0.025 : 0.04}
        />
      </mesh>
    </Float>
  );
}

interface Animation3DProps {
  small?: boolean;
  position?: [number, number, number];
}

export default function Animation3D({ small = true, position }: Animation3DProps) {
  const ballPos = position || (small ? [2.5, 2.0, 0] : [2.4, 0.1, -1.2]);
  const shadowPos: [number, number, number] = [ballPos[0], ballPos[1] - (small ? 0.85 : 2.9), ballPos[2]];

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        background: 'transparent',
        pointerEvents: 'none',
        overflow: 'hidden'
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 48 }}
        gl={{ alpha: true, antialias: true }}
        style={{ pointerEvents: 'none' }}
      >
        <ambientLight intensity={1.3} />
        <directionalLight position={[8, 12, 6]} intensity={2.5} color="#ffffff" />
        <directionalLight position={[-8, -6, -4]} intensity={1.8} color="#dfff00" />
        <pointLight position={[ballPos[0], ballPos[1] + 1.2, 2]} intensity={1.4} color="#ffffaa" />
        
        {/* Balanced 3D Pickleball Accent */}
        <PickleballModel position={ballPos} small={small} />
        
        {/* Subtle Glowing Contact Shadow */}
        <ContactShadows
          position={shadowPos}
          opacity={small ? 0.35 : 0.65}
          scale={small ? 2.4 : 12}
          blur={small ? 1.5 : 2.5}
          far={small ? 2.2 : 5}
          color="#dfff00"
        />
      </Canvas>
    </div>
  );
}
