import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";

/* ===============================
   GLOBAL MOUSE TRACKER (WINDOW)
================================ */
function useMouse() {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return mouse;
}

/* ===============================
   CAMERA PARALLAX
================================ */
function CameraParallax({ mouse }) {
  useFrame(({ camera }) => {
    camera.position.x += (mouse.current.x * 0.6 - camera.position.x) * 0.05;
    camera.position.y += (mouse.current.y * 0.6 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* ===============================
   NEURAL PARTICLES
================================ */
function NeuralParticles({ mouse }) {
  const ref = useRef();

  const particles = useMemo(() => {
    const count = window.innerWidth < 768 ? 1500 : 3000;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 6;
    }
    return positions;
  }, []);

  useFrame(() => {
    if (!ref.current) return;

    // CLEAR, VISIBLE MOTION
    ref.current.rotation.y += (mouse.current.x * 0.8 - ref.current.rotation.y) * 0.08;
    ref.current.rotation.x += (mouse.current.y * 0.8 - ref.current.rotation.x) * 0.08;
  });

  return (
    <>
      {/* BASE PARTICLES */}
      <Points ref={ref} positions={particles} stride={3}>
        <PointMaterial
          transparent
          color="#00AEEF"
          size={0.015}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>

      {/* GLOW LAYER */}
      <Points positions={particles} stride={3}>
        <PointMaterial
          transparent
          color="#00E5FF"
          size={0.035}
          sizeAttenuation
          opacity={0.18}
          depthWrite={false}
        />
      </Points>
    </>
  );
}

/* ===============================
   HERO SCENE BACKGROUND
================================ */
export default function HeroScene() {
  const mouse = useMouse();

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6], fov: 55 }}
      >
        <ambientLight intensity={0.6} />
        <CameraParallax mouse={mouse} />
        <NeuralParticles mouse={mouse} />
      </Canvas>
    </div>
  );
}
