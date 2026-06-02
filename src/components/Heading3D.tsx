import { Canvas, useFrame } from "@react-three/fiber";
import { Center, Text3D } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

// Helvetiker is the canonical three.js typeface; load via CDN so we
// don't need to bundle a font file.
const FONT_URL =
  "https://threejs.org/examples/fonts/helvetiker_bold.typeface.json";

type Props = {
  text: string;
  color?: string;
  emissive?: string;
  className?: string;
  height?: number; // CSS px
  size?: number; // 3D unit size of the text
  depth?: number; // extrusion depth
};

function SpinningText({
  text,
  color = "#f5f5f7",
  emissive = "#e85d3a",
  size = 1,
  depth = 0.25,
}: Required<Pick<Props, "text">> & {
  color?: string;
  emissive?: string;
  size?: number;
  depth?: number;
}) {
  const ref = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    const targetY = pointer.current.x * 0.6 + Math.sin(t * 0.5) * 0.1;
    const targetX = -pointer.current.y * 0.4 + Math.sin(t * 0.7) * 0.05;
    ref.current.rotation.y += (targetY - ref.current.rotation.y) * 0.08;
    ref.current.rotation.x += (targetX - ref.current.rotation.x) * 0.08;
  });

  return (
    <group
      ref={ref}
      onPointerMove={(e) => {
        const { x, y } = e.unprojectedPoint;
        pointer.current = { x: x * 0.15, y: y * 0.15 };
      }}
    >
      <Center>
        <Text3D
          font={FONT_URL}
          size={size}
          height={depth}
          curveSegments={8}
          bevelEnabled
          bevelThickness={0.03}
          bevelSize={0.02}
          bevelSegments={4}
        >
          {text}
          <meshStandardMaterial
            color={color}
            emissive={emissive}
            emissiveIntensity={0.25}
            metalness={0.7}
            roughness={0.25}
          />
        </Text3D>
      </Center>
    </group>
  );
}

export function Heading3D({
  text,
  color,
  emissive,
  className,
  height = 180,
  size = 1,
  depth = 0.25,
}: Props) {
  return (
    <div className={className} style={{ height, width: "100%" }} aria-label={text} role="img">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 35 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[3, 4, 5]} intensity={1.1} />
          <directionalLight position={[-4, -2, 2]} intensity={0.6} color="#4cc9f0" />
          <pointLight position={[0, 0, 4]} intensity={0.8} color="#e85d3a" />
          <SpinningText text={text} color={color} emissive={emissive} size={size} depth={depth} />
        </Suspense>
      </Canvas>
    </div>
  );
}
