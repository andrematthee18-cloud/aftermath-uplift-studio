import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Suspense, useMemo, useRef, useEffect, useState } from "react";
import * as THREE from "three";

/**
 * Gaming-themed morphing background.
 * As the user scrolls the page, the central object crossfades between
 * four iconic gaming forms:
 *   0. D20 die        (tabletop / RPG)
 *   1. Torus knot     (portal / loot ring)
 *   2. Wireframe skull-ish dodecahedron (survival / danger)
 *   3. Wireframe planet sphere (open world / Ubuntu: The Fall)
 *
 * The active form is driven by scroll progress (0..1) across the page.
 */

type FormProps = {
  scrollProgress: React.MutableRefObject<number>;
  index: number;
  children: React.ReactNode;
};

function MorphSlot({ scrollProgress, index, children }: FormProps) {
  const ref = useRef<THREE.Group>(null);
  const FORMS = 4;

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    const p = scrollProgress.current * (FORMS - 1); // 0..3
    const dist = Math.abs(p - index);
    // Smooth bell-curve weight per slot
    const weight = Math.max(0, 1 - dist);
    const eased = weight * weight * (3 - 2 * weight);

    ref.current.scale.setScalar(eased * 1.6 + 0.001);
    const mat = (ref.current.children[0] as THREE.Mesh)?.material as
      | THREE.MeshStandardMaterial
      | THREE.MeshBasicMaterial
      | undefined;
    if (mat && "opacity" in mat) {
      mat.opacity = eased;
      mat.transparent = true;
    }

    ref.current.rotation.y = t * 0.3 + index * 1.7;
    ref.current.rotation.x = Math.sin(t * 0.4 + index) * 0.4;
    ref.current.position.y = Math.sin(t * 0.5 + index) * 0.15;
  });

  return <group ref={ref}>{children}</group>;
}

function ScrollMorph({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  return (
    <group>
      {/* 0 — D20 die */}
      <MorphSlot scrollProgress={scrollProgress} index={0}>
        <mesh>
          <icosahedronGeometry args={[1.2, 0]} />
          <meshStandardMaterial
            color="#e85d3a"
            emissive="#e85d3a"
            emissiveIntensity={0.35}
            metalness={0.6}
            roughness={0.25}
            flatShading
          />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[1.22, 0]} />
          <meshBasicMaterial color="#ffd9c8" wireframe transparent opacity={0.4} />
        </mesh>
      </MorphSlot>

      {/* 1 — Torus knot / portal */}
      <MorphSlot scrollProgress={scrollProgress} index={1}>
        <mesh>
          <torusKnotGeometry args={[0.9, 0.28, 180, 24, 2, 3]} />
          <meshStandardMaterial
            color="#4cc9f0"
            emissive="#4cc9f0"
            emissiveIntensity={0.6}
            metalness={0.85}
            roughness={0.15}
          />
        </mesh>
      </MorphSlot>

      {/* 2 — Dodecahedron (survival relic) */}
      <MorphSlot scrollProgress={scrollProgress} index={2}>
        <mesh>
          <dodecahedronGeometry args={[1.15, 0]} />
          <meshStandardMaterial
            color="#9b5de5"
            emissive="#9b5de5"
            emissiveIntensity={0.4}
            metalness={0.7}
            roughness={0.3}
            flatShading
          />
        </mesh>
        <mesh>
          <dodecahedronGeometry args={[1.35, 0]} />
          <meshBasicMaterial color="#e0aaff" wireframe transparent opacity={0.35} />
        </mesh>
      </MorphSlot>

      {/* 3 — Wireframe planet */}
      <MorphSlot scrollProgress={scrollProgress} index={3}>
        <mesh>
          <sphereGeometry args={[1.3, 32, 24]} />
          <meshBasicMaterial color="#06d6a0" wireframe transparent opacity={0.7} />
        </mesh>
        <mesh>
          <sphereGeometry args={[1.28, 48, 32]} />
          <meshStandardMaterial
            color="#073b4c"
            emissive="#06d6a0"
            emissiveIntensity={0.15}
            metalness={0.4}
            roughness={0.6}
            transparent
            opacity={0.5}
          />
        </mesh>
      </MorphSlot>
    </group>
  );
}

function Starfield({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(900 * 3);
    for (let i = 0; i < 900; i++) {
      const r = 6 + Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi) - 2;
    }
    return arr;
  }, []);

  useFrame((s) => {
    if (!ref.current) return;
    const t = s.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.03;
    ref.current.rotation.x = scrollProgress.current * Math.PI * 0.4;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#ffffff" transparent opacity={0.75} />
    </points>
  );
}

function HudGrid({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const ref = useRef<THREE.GridHelper>(null);
  useFrame((s) => {
    if (!ref.current) return;
    const t = s.clock.getElapsedTime();
    ref.current.position.z = ((t * 0.6) % 2) - 1;
    ref.current.rotation.z = scrollProgress.current * 0.4;
  });
  return (
    <gridHelper
      ref={ref}
      args={[40, 40, "#e85d3a", "#1a2238"]}
      position={[0, -3, 0]}
      rotation={[0, 0, 0]}
    />
  );
}

export function Logo3D() {
  const scrollProgress = useRef(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress.current = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  if (!mounted) return null;

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.45} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <directionalLight position={[-4, -2, 3]} intensity={0.7} color="#e85d3a" />
        <pointLight position={[0, 0, 3]} intensity={0.9} color="#4cc9f0" />
        <ScrollMorph scrollProgress={scrollProgress} />
        <Starfield scrollProgress={scrollProgress} />
        <HudGrid scrollProgress={scrollProgress} />
        <Environment preset="night" />
      </Suspense>
    </Canvas>
  );
}
