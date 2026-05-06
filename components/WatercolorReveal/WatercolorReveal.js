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

function ShaderQuad({ onComplete, onFirstFrame, duration, blobTexture, inView }) {
  const meshRef = useRef();
  const { viewport, size } = useThree();
  const startTimeRef = useRef(null);
  const completedRef = useRef(false);
  const firstFrameFiredRef = useRef(false);
  const inViewRef = useRef(inView);
  inViewRef.current = inView;

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

    // Hold the reveal until the canvas is actually visible. Otherwise
    // the timer runs offscreen on a deep refresh and the watercolor
    // animation has already finished by the time the user scrolls back.
    // gardenImage stays at opacity 0 (firstFrameFired hasn't fired) so
    // there's nothing to flash; the cream whiteBase shows underneath.
    if (!inViewRef.current) return;

    if (startTimeRef.current === null) {
      startTimeRef.current = state.clock.elapsedTime;
    }

    const elapsed = state.clock.elapsedTime - startTimeRef.current;
    const durationSec = duration / 1000;
    const progress = Math.min(elapsed / durationSec, 1.0);

    uniforms.uTime.value = elapsed;
    uniforms.uRevealProgress.value = progress;

    // Fire once on the first in-view paint so the parent can flip the
    // garden image visible only after the cream overlay is actually
    // drawing.
    if (!firstFrameFiredRef.current) {
      firstFrameFiredRef.current = true;
      if (onFirstFrame) onFirstFrame();
    }

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
  // Garden image is held invisible until the WebGL canvas paints its
  // first frame (which is the solid cream overlay). Without this gate,
  // the CSS background paints instantly while the canvas waits for the
  // blob texture to load -- producing a flash of the bare garden image
  // before the cream covers it.
  const [firstFrameReady, setFirstFrameReady] = useState(false);
  // Track whether the canvas container is in the viewport. The reveal
  // animation pauses while offscreen so it doesn't burn its 18s timer
  // when the user has refreshed deep in the page; scrolling back to
  // the top then naturally replays the watercolor.
  const containerRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

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
    <div ref={containerRef} className={styles.container}>
      {/* Garden image -- rendered by the browser, no WebGL involvement.
          background-size: cover handles aspect ratio. Colors are untouched.
          Held at opacity 0 until the canvas paints its first cream frame
          (or immediately under reduced motion, where there's no canvas). */}
      <div
        className={styles.gardenImage}
        style={{ opacity: firstFrameReady || reducedMotion ? 1 : 0 }}
      />

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
              onFirstFrame={() => setFirstFrameReady(true)}
              duration={duration}
              blobTexture={blobTexture}
              inView={inView}
            />
          )}
        </Canvas>
      </div>
      )}
    </div>
  );
}
