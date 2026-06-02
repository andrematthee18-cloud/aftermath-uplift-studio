import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import logo from "@/assets/am-logo.png.asset.json";

function LogoMesh() {
  const ref = useRef<THREE.Group>(null);
  const texture = useLoader(THREE.TextureLoader, logo.url);

  useMemo(() => {
    texture.anisotropy = 8;
    texture.colorSpace = THREE.SRGBColorSpace;
  }, [texture]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.5;
    ref.current.rotation.x = Math.sin(t * 0.4) * 0.2;
  });

  // Logo image aspect ~ 3:2
  const w = 3.6;
  const h = 2.4;

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.6}>
      <group ref={ref} scale={1}>
        {/* Front face */}
        <mesh>
          <planeGeometry args={[w, h]} />
          <meshStandardMaterial
            map={texture}
            transparent
            alphaTest={0.5}
            metalness={0.9}
            roughness={0.25}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Back face (mirrored) */}
        <mesh rotation={[0, Math.PI, 0]} position={[0, 0, -0.001]}>
          <planeGeometry args={[w, h]} />
          <meshStandardMaterial
            map={texture}
            transparent
            alphaTest={0.5}
            metalness={0.9}
            roughness={0.25}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </Float>
  );
}

function Particles() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(400 * 3);
    for (let i = 0; i < 400; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
    }
    return arr;
  }, []);
  useFrame((s) => {
    if (ref.current) ref.current.rotation.y = s.clock.getElapsedTime() * 0.03;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#e8a87c" transparent opacity={0.7} />
    </points>
  );
}

export function Logo3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 42 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.4} />
        <directionalLight position={[-4, -2, 3]} intensity={0.7} color="#e85d3a" />
        <pointLight position={[0, 0, 3]} intensity={0.8} color="#ffffff" />
        <LogoMesh />
        <Particles />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}
