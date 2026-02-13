"use client";

import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";

/* ===============================
   PRODUCT MESH
================================ */
function Product({
  data,
  setHovered,
  setActive,
  active,
}) {
  const mesh = useRef();
  const texture = useLoader(THREE.TextureLoader, data.image);

  useFrame((state) => {
    if (!mesh.current) return;

    const isActive = active?.id === data.id;

    // Subtle mouse rotation
    mesh.current.rotation.y = state.mouse.x * 0.15;

    const targetScale = isActive ? 1.18 : 1;
    mesh.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.08
    );

    mesh.current.material.opacity =
      active && !isActive ? 0.35 : 1;
  });

  return (
    <Float speed={2} floatIntensity={0.4}>
      <mesh
        ref={mesh}
        position={data.position}
        onPointerOver={(e) => {
          e.stopPropagation();
          if (!active)
            setHovered({ id: data.id, mesh });
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
        }}
        onClick={(e) => {
          e.stopPropagation();
          setActive(data);
          setHovered({ id: data.id, mesh });
        }}
      >
        <planeGeometry args={[5, 2.5]} />
        <meshBasicMaterial
          map={texture}
          transparent
        />
      </mesh>
    </Float>
  );
}

/* ===============================
   3D TO SCREEN POSITION
================================ */
function PopupTracker({ hovered, setScreenPos }) {
  const { camera, size } = useThree();

  useFrame(() => {
    if (!hovered?.mesh?.current) return;

    const vector = new THREE.Vector3();
    vector.setFromMatrixPosition(
      hovered.mesh.current.matrixWorld
    );
    vector.project(camera);

    const x = (vector.x * 0.5 + 0.5) * size.width;
    const y = (-vector.y * 0.5 + 0.5) * size.height;

    setScreenPos({ x, y });
  });

  return null;
}

/* ===============================
   MAIN PRODUCT STAGE
================================ */
export default function UltraProductStage() {
  const [hovered, setHovered] = useState(null);
  const [active, setActive] = useState(null);
  const [screenPos, setScreenPos] = useState({
    x: 0,
    y: 0,
  });

  const products = [
    {
      id: "validate",
      image: "/validaite.png",
      position: [0, 0, 0],
      title: "ValidAIte",
      desc: "Enterprise-grade validation for Generative AI governance and compliance.",
    },
    {
      id: "nexa",
      image: "/nexa.png",
      position: [6, 0, -2],
      title: "NexaAI",
      desc: "AI systems boards approve and CIOs scale.",
    },
    {
      id: "qmentis",
      image: "/qmentis.webp",
      position: [-6, 0, -2],
      title: "QMentisAI",
      desc: "GenAI-driven intelligent quality engineering.",
    },
  ];

  const currentProduct =
    active ||
    (hovered &&
      products.find((p) => p.id === hovered.id));

  /* Click outside close */
  useEffect(() => {
    const handleClick = () => {
      setActive(null);
      setHovered(null);
    };

    window.addEventListener("pointerdown", handleClick);
    return () =>
      window.removeEventListener(
        "pointerdown",
        handleClick
      );
  }, []);

  return (
    <div className="relative h-screen z-10">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 35 }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight
          position={[0, 5, 5]}
          intensity={1.5}
        />

        {products.map((product) => (
          <Product
            key={product.id}
            data={product}
            setHovered={setHovered}
            setActive={setActive}
            active={active}
          />
        ))}

        <PopupTracker
          hovered={hovered}
          setScreenPos={setScreenPos}
        />

        <EffectComposer>
          <Bloom intensity={0.6} luminanceThreshold={0.2} />
          <Vignette
            eskil={false}
            offset={0.2}
            darkness={0.9}
          />
        </EffectComposer>
      </Canvas>

      {/* ===============================
         POPUP UI (NO BLINK)
      =============================== */}
      {currentProduct && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "absolute",
            left: screenPos.x,
            top: screenPos.y - 140,
            transform: "translate(-50%, -50%)",
          }}
          className="bg-white/5 backdrop-blur-xl border border-white/20 p-6 rounded-2xl text-white w-72 transition-all duration-300 shadow-2xl"
        >
          <h3 className="text-xl font-semibold mb-3">
            {currentProduct.title}
          </h3>

          <p className="text-gray-300 text-sm mb-5">
            {currentProduct.desc}
          </p>

          <button className="w-full py-2 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg text-sm font-medium hover:scale-105 transition-all duration-300">
            Learn More
          </button>
        </div>
      )}
    </div>
  );
}
