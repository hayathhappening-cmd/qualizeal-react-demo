import { useEffect, useRef, useMemo, Suspense, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import * as THREE from "three";

/* ---------------- IMAGES ---------------- */
const row1Images = [
  "/images/row1-1.webp",
  "/images/row1-2.webp",
  "/images/row1-3.webp",
  "/images/row1-4.webp",
  "/images/row1-5.webp",
];

const row2Images = [
  "/images/row2-1.webp",
  "/images/row2-2.webp",
  "/images/row2-3.webp",
];

const row3Images = [
  "/images/row3-1.png",
  "/images/row3-2.webp",
  "/images/row3-3.png",
  "/images/row3-4.png",
  "/images/row3-5.png",
];

/* ---------------- ROW ---------------- */
function Row({ y, phase, rotation, radius, images }) {
  const group = useRef();
  const textures = useLoader(TextureLoader, images);

  const baseAngles = useMemo(
    () => textures.map((_, i) => (i / textures.length) * Math.PI * 2),
    [textures]
  );

  useFrame(() => {
    group.current.children.forEach((child, i) => {
      const angle = baseAngles[i] + rotation.current + phase;

      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius - radius;

      const depth = (Math.cos(angle) + 1) / 2;
      const scale = THREE.MathUtils.lerp(0.8, 1.15, depth);
      const opacity = THREE.MathUtils.lerp(0.45, 1, depth);

      child.position.set(x, y, z);
      child.scale.set(scale, scale, scale);
      child.rotation.y = -angle;
      child.material.opacity = opacity;
    });
  });

  return (
    <group ref={group}>
      {textures.map((tex, i) => (
        <mesh key={i}>
          <planeGeometry args={[1.45, 0.9]} />
          <meshBasicMaterial
            map={tex}
            transparent
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ---------------- CAROUSEL ---------------- */
function OsmoCarousel() {
  const { camera, gl } = useThree();
  const rotation = useRef(0);
  const velocity = useRef(0);

  const RADIUS = 6.2;
  const AUTO = 0.001;
  const DRAG = 0.002;
  const DAMP = 0.92;

  useEffect(() => {
    const dom = gl.domElement;
    let lastX = 0;
    let dragging = false;

    const onDown = (e) => {
      dragging = true;
      lastX = e.clientX;
    };

    const onMove = (e) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      velocity.current += dx * DRAG;
    };

    const onUp = () => (dragging = false);

    dom.addEventListener("pointerdown", onDown);
    dom.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);

    return () => {
      dom.removeEventListener("pointerdown", onDown);
      dom.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [gl]);

  useFrame(() => {
    rotation.current += AUTO;
    rotation.current += velocity.current;
    velocity.current *= DAMP;
    camera.lookAt(0, 0, -RADIUS);
  });

  const GAP = 1.35;

  return (
    <>
      <Row y={GAP} phase={0} rotation={rotation} radius={RADIUS} images={row1Images} />
      <Row y={0} phase={0} rotation={rotation} radius={RADIUS} images={row2Images} />
      <Row y={-GAP} phase={0} rotation={rotation} radius={RADIUS} images={row3Images} />
    </>
  );
}

/* ---------------- SPLASH SCREEN ---------------- */
export default function SplashScreen() {
  const navigate = useNavigate();
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const totalTime = 7000; // 7 seconds

    const fadeTimer = setTimeout(() => {
      setFade(true); // start fade
    }, totalTime - 800);

    const navTimer = setTimeout(() => {
      navigate("/home");
    }, totalTime);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(navTimer);
    };
  }, [navigate]);

  return (
    <div
      style={{
        height: "100vh",
        background: "#000",
        transition: "opacity 0.8s ease",
        opacity: fade ? 0 : 1,
      }}
    >
      <Canvas camera={{ position: [0, 0.45, 7.2], fov: 45 }}>
        <ambientLight intensity={1.1} />
        <Suspense fallback={null}>
          <OsmoCarousel />
        </Suspense>
      </Canvas>
    </div>
  );
}
