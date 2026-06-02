import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, MeshTransmissionMaterial } from "@react-three/drei";
import { Suspense, useMemo, useRef, useEffect, useState } from "react";
import * as THREE from "three";

/**
 * Builds the Aftermath "AM" mark as two extruded 3D shapes:
 *  - A large angular "A" with an inner triangular cutout
 *  - A smaller offset parallelogram on the right with its own cutout
 * Approximated from the brand mark, centered around origin.
 */
function useLogoGeometry() {
  return useMemo(() => {
    // ----- Main A -----
    const a = new THREE.Shape();
    a.moveTo(0.05, 1.35);       // apex
    a.lineTo(0.95, -0.35);      // upper right shoulder
    a.lineTo(0.55, -0.35);      // step in
    a.lineTo(0.30, 0.10);       // inner right top
    a.lineTo(-0.45, 0.10);      // inner left top
    a.lineTo(-1.45, -1.45);     // sharp bottom-left tip
    a.lineTo(-0.20, -0.25);     // back up along left inner
    a.lineTo(-0.05, 0.05);      // close toward apex base
    a.closePath();

    // Inner triangular highlight cutout
    const aHole = new THREE.Path();
    aHole.moveTo(0.05, 0.95);
    aHole.lineTo(0.55, -0.05);
    aHole.lineTo(-0.20, -0.05);
    aHole.closePath();
    a.holes.push(aHole);

    // ----- Right parallelogram piece -----
    const m = new THREE.Shape();
    m.moveTo(0.85, 0.25);
    m.lineTo(1.55, 0.55);
    m.lineTo(1.55, -0.75);
    m.lineTo(0.85, -0.55);
    m.closePath();

    const mHole = new THREE.Path();
    mHole.moveTo(1.05, 0.15);
    mHole.lineTo(1.40, 0.30);
    mHole.lineTo(1.40, -0.55);
    mHole.lineTo(1.05, -0.40);
    mHole.closePath();
    m.holes.push(mHole);

    const extrude = {
      depth: 0.32,
      bevelEnabled: true,
      bevelSize: 0.045,
      bevelThickness: 0.05,
      bevelSegments: 5,
      curveSegments: 8,
    };

    const gA = new THREE.ExtrudeGeometry(a, extrude);
    const gM = new THREE.ExtrudeGeometry(m, extrude);
    // Center the combined silhouette
    gA.translate(0, 0, -0.16);
    gM.translate(0, 0, -0.16);
    return { gA, gM };
  }, []);
}

function LogoMesh({ scrollY }: { scrollY: React.MutableRefObject<number> }) {
  const ref = useRef<THREE.Group>(null);
  const { gA, gM } = useLogoGeometry();

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    const s = scrollY.current;
    ref.current.rotation.y = t * 0.35 + s * 0.004;
    ref.current.rotation.x = Math.sin(t * 0.3) * 0.15 + s * 0.001;
    ref.current.position.y = Math.sin(t * 0.6) * 0.12 - s * 0.002;
  });

  return (
    <Float speed={1.1} rotationIntensity={0.25} floatIntensity={0.5}>
      <group ref={ref} scale={1.15} position={[-0.05, 0, 0]}>
        <mesh geometry={gA} castShadow>
          <MeshTransmissionMaterial
            samples={6}
            thickness={0.5}
            roughness={0.18}
            transmission={0.25}
            ior={1.45}
            chromaticAberration={0.05}
            backside
            color="#d8dde3"
          />
        </mesh>
        <mesh geometry={gM} castShadow>
          <MeshTransmissionMaterial
            samples={6}
            thickness={0.5}
            roughness={0.18}
            transmission={0.25}
            ior={1.45}
            chromaticAberration={0.05}
            backside
            color="#d8dde3"
          />
        </mesh>
      </group>
    </Float>
  );
}

function Particles({ scrollY }: { scrollY: React.MutableRefObject<number> }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(600 * 3);
    for (let i = 0; i < 600; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 16;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
    }
    return arr;
  }, []);
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.y = s.clock.getElapsedTime() * 0.04;
    ref.current.position.z = scrollY.current * 0.003;
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
  const scrollY = useRef(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => {
      scrollY.current = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!mounted) return null;

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 42 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.45} />
        <directionalLight position={[5, 5, 5]} intensity={1.3} />
        <directionalLight position={[-4, -2, 3]} intensity={0.7} color="#e85d3a" />
        <pointLight position={[0, 0, 3]} intensity={0.9} color="#ffffff" />
        <LogoMesh scrollY={scrollY} />
        <Particles scrollY={scrollY} />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}
