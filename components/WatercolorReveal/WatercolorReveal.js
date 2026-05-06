'use client';

import { useRef, useEffect, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { vertexShader, fragmentShader } from '@/shaders/watercolorReveal';
import styles from './WatercolorReveal.module.css';

// ============================================================================
// SHADER QUAD -- Cream overlay with alpha holes (watercolor mask)
// Samples a real watercolor blob texture for authentic edge quality.
// ============================================================================

function ShaderQuad({ onComplete, duration, blobTexture }) {
  const meshRef = useRef();
  const { viewport, size } = useThree();
  const startTimeRef = useRef(null);
  const completedRef = useRef(false);

  const seeds = useMemo(() => [
    new THREE.Vector2(Math.random() * 2.0 - 1.0, Math.random() * 2.0 - 1.0),
    new THREE.Vector2(Math.random() * 2.0 - 1.0, Math.random() * 2.0 - 1.0),
  ], []);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
    uRevealProgress: { value: 0 },
    uSeed0: { value: seeds[0] },
    uSeed1: { value: seeds[1] },
    uBlobTexture: { value: blobTexture },
  }), [seeds, size.width, size.height, blobTexture]);

  useEffect(() => {
    uniforms.uResolution.value.set(size.width, size.height);
  }, [size, uniforms]);

  useFrame((state) => {
    if (!meshRef.current) return;

    if (startTimeRef.current === null) {
      startTimeRef.current = state.clock.elapsedTime;
    }

    const elapsed = state.clock.elapsedTime - startTimeRef.current;
    const durationSec = duration / 1000;
    const progress = Math.min(elapsed / durationSec, 1.0);

    uniforms.uTime.value = elapsed;
    uniforms.uRevealProgress.value = progress;

    if (progress >= 1.0 && !completedRef.current) {
      completedRef.current = true;
      if (onComplete) onComplete();
    }
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

// ============================================================================
// WATERCOLOR REVEAL
// Garden image is a CSS background behind the canvas.
// The WebGL canvas only renders the dissolving cream overlay.
// ============================================================================

export default function WatercolorReveal({ onComplete, duration = 6000 }) {
  const [blobTexture, setBlobTexture] = useState(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Detect reduced-motion. Skip the WebGL canvas entirely when set --
  // garden image stays visible via CSS, and we fire onComplete immediately
  // so downstream sequencing isn't blocked waiting for a reveal that won't run.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setReducedMotion(true);
      if (onComplete) onComplete();
    }
  }, [onComplete]);

  // Load the watercolor blob texture before mounting the shader
  useEffect(() => {
    if (reducedMotion) return;
    const loader = new THREE.TextureLoader();
    loader.load('/watercolor-blob-1024.jpg', (texture) => {
      texture.wrapS = THREE.ClampToEdgeWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = true;
      // Keep texture in sRGB -- we handle conversion in the shader
      texture.colorSpace = THREE.SRGBColorSpace;
      setBlobTexture(texture);
    });
    return () => {
      if (blobTexture) blobTexture.dispose();
    };
  }, [reducedMotion]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={styles.container}>
      {/* Garden image -- rendered by the browser, no WebGL involvement.
          background-size: cover handles aspect ratio. Colors are untouched. */}
      <div className={styles.gardenImage} />

      {/* WebGL canvas -- only renders the cream alpha overlay.
          Skip the canvas entirely under reduced motion so we don't spin up
          a GL context just to do nothing. */}
      {!reducedMotion && (
      <div className={styles.canvasLayer}>
        <Canvas
          orthographic
          camera={{ zoom: 1, position: [0, 0, 1], near: 0.1, far: 10 }}
          gl={{
            antialias: false,
            alpha: true,
            premultipliedAlpha: true,
            powerPreference: 'high-performance',
          }}
          dpr={[1, 1.5]}
          style={{ background: 'transparent' }}
          onCreated={({ gl }) => {
            gl.outputColorSpace = THREE.LinearSRGBColorSpace;
          }}
        >
          {blobTexture && (
            <ShaderQuad
              onComplete={onComplete}
              duration={duration}
              blobTexture={blobTexture}
            />
          )}
        </Canvas>
      </div>
      )}
    </div>
  );
}
