"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Environment,
  Stars,
} from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  DepthOfField,
} from "@react-three/postprocessing";
import { useRef } from "react";
import * as THREE from "three";

function Platforms() {
  const group = useRef();

  useFrame((state) => {
    group.current.rotation.y = state.mouse.x * 0.25;
    group.current.rotation.x = state.mouse.y * 0.12;
  });

  return (
    <group ref={group}>
      <Float speed={2} floatIntensity={0.6}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[3.5, 1.8, 0.25]} />
          <meshPhysicalMaterial
            color="#00AEEF"
            metalness={0.8}
            roughness={0.1}
            transmission={0.9}
            thickness={1}
            clearcoat={1}
            clearcoatRoughness={0}
          />
        </mesh>
      </Float>

      <Float speed={2} floatIntensity={0.6}>
        <mesh position={[4, -1, -6]}>
          <boxGeometry args={[3.5, 1.8, 0.25]} />
          <meshPhysicalMaterial
            color="#A855F7"
            metalness={0.8}
            roughness={0.1}
            transmission={0.9}
            thickness={1}
            clearcoat={1}
          />
        </mesh>
      </Float>

      <Float speed={2} floatIntensity={0.6}>
        <mesh position={[-4, 1, -12]}>
          <boxGeometry args={[3.5, 1.8, 0.25]} />
          <meshPhysicalMaterial
            color="#10B981"
            metalness={0.8}
            roughness={0.1}
            transmission={0.9}
            thickness={1}
            clearcoat={1}
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function AISolutionsCinematic() {
  return (
    <div className="h-screen w-full bg-black relative">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
      >
        {/* Atmosphere */}
        <color attach="background" args={["#020617"]} />
        <fog attach="fog" args={["#020617", 8, 25]} />

        <ambientLight intensity={0.4} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={2}
        />

        <Environment preset="city" />

        <Stars
          radius={100}
          depth={50}
          count={3000}
          factor={4}
          fade
        />

        <Platforms />

        {/* CINEMATIC EFFECTS */}
        <EffectComposer>
          <Bloom
            intensity={1.2}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
          />
          <DepthOfField
            focusDistance={0.02}
            focalLength={0.03}
            bokehScale={4}
          />
        </EffectComposer>
      </Canvas>

      <div className="absolute top-24 w-full text-center text-white">
        <h1 className="text-6xl font-semibold tracking-tight">
          Immersive AI Platforms
        </h1>
        <p className="text-gray-400 mt-6 text-lg">
          Explore the next dimension of AI
        </p>
      </div>
    </div>
  );
}
