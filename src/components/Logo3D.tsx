import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, MeshTransmissionMaterial } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

function AMShape() {
  const ref = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    // Build the stylized "A" shape from the logo (sharp triangle with inner cutout
    // and a second leg that reads as an "M"). Coordinates roughly match the
    // uploaded monogram, recentered to origin.
    const shape = new THREE.Shape();
    shape.moveTo(-1.4, -1.2);
    shape.lineTo(0.05, 1.3);
    shape.lineTo(1.4, -1.2);
    shape.lineTo(0.95, -1.2);
    shape.lineTo(0.55, -0.4);
    shape.lineTo(-0.55, -0.4);
    shape.lineTo(-0.95, -1.2);
    shape.closePath();

    // Inner triangular cutout
    const hole = new THREE.Path();
    hole.moveTo(-0.35, -0.7);
    hole.lineTo(0.05, 0.4);
    hole.lineTo(0.35, -0.7);
    hole.closePath();
    shape.holes.push(hole);

    // Diagonal slash that creates the "M" reading
    const slashShape = new THREE.Shape();
    slashShape.moveTo(-1.1, -1.15);
    slashShape.lineTo(1.05, 0.15);
    slashShape.lineTo(1.15, -0.05);
    slashShape.lineTo(-1.0, -1.35);
    slashShape.closePath();

    const extrude = { depth: 0.35, bevelEnabled: true, bevelSize: 0.04, bevelThickness: 0.04, bevelSegments: 4, curveSegments: 8 };
    const g1 = new THREE.ExtrudeGeometry(shape, extrude);
    const g2 = new THREE.ExtrudeGeometry(slashShape, extrude);
    g1.center();
    g2.center();

    // Merge by adding as separate; simpler: return a group via single geometry list
    return { main: g1, slash: g2 };
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = Math.sin(t * 0.4) * 0.6;
    ref.current.rotation.x = Math.sin(t * 0.3) * 0.15;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.6}>
      <group ref={ref as unknown as React.RefObject<THREE.Group>} scale={1.1}>
        <mesh geometry={geometry.main} castShadow>
          <MeshTransmissionMaterial
            samples={6}
            thickness={0.6}
            roughness={0.15}
            transmission={0.4}
            ior={1.4}
            chromaticAberration={0.04}
            backside
            color="#cfd6df"
          />
        </mesh>
        <mesh geometry={geometry.slash} position={[0, 0, 0.02]}>
          <meshStandardMaterial color="#9aa3ad" metalness={1} roughness={0.25} />
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
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <directionalLight position={[-4, -2, 3]} intensity={0.6} color="#e85d3a" />
        <pointLight position={[0, 0, 3]} intensity={0.8} color="#ffffff" />
        <AMShape />
        <Particles />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}
