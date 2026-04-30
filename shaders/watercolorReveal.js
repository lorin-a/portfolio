// ============================================================================
// WATERCOLOR REVEAL SHADER
//
// Cream overlay (#F8EBE5) dissolves to reveal the garden image behind it.
//
// HYBRID APPROACH: Procedural timing + sampled texture for edge quality.
//
// The distance field answers "where is the edge right now?" (procedural,
// animated). The sampled watercolor texture answers "what does the edge
// look like?" (real paint on paper).
//
// Each pool samples a real watercolor blob texture at per-pool rotated/
// scaled UVs. As the pool expands, the texture zooms out, revealing the
// blob's irregular boundary with authentic bristle marks, dry-brush gaps,
// pigment density variation, and paper grain interaction.
//
// Quintic ease-out (1-(1-t)^5) for deceleration. All timing, origins,
// stagger, and easing UNCHANGED from approved version.
//
// Noise functions proven Safari-compatible (from petalShader.js).
// ============================================================================

export const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const fragmentShader = `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform float uRevealProgress;   // 0..1

  uniform vec2 uSeed0;
  uniform vec2 uSeed1;
  uniform sampler2D uBlobTexture;

  varying vec2 vUv;

  #define PI 3.14159265359

  // -------------------------------------------------------------------------
  // NOISE (from petalShader.js -- Safari-proven)
  // -------------------------------------------------------------------------

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float vnoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  // -------------------------------------------------------------------------
  // TEXTURE-BASED POOL MASK
  //
  // Samples the watercolor blob texture at per-pool rotated/scaled UVs.
  // The texture's luminance defines the pool shape: dark blob interior
  // = revealed, light background = masked. The texture's own edge quality
  // (bristle marks, dry-brush, pigment grain) appears naturally at the
  // pool boundary.
  //
  // poolRadius controls the zoom: small radius = zoomed in (only center
  // visible), large radius = zoomed out (full blob shape with edges).
  // -------------------------------------------------------------------------

  float samplePool(
    vec2 p,            // aspect-corrected pixel position
    vec2 origin,       // pool center
    float poolRadius,  // current expansion radius
    float angle,       // per-pool rotation (static, for variety)
    float fit,         // texture scale factor
    vec2 noiseSeed     // per-pool noise seed for crawling edge
  ) {
    if (poolRadius <= 0.0) return 0.0;

    // Local coordinates relative to pool center
    vec2 lp = p - origin;

    // Static rotation for per-pool variety (no animation -- just different
    // bristle directions per pool)
    float ca = cos(angle), sa = sin(angle);
    vec2 rp = vec2(ca * lp.x + sa * lp.y, -sa * lp.x + ca * lp.y);

    // Scale: map pool radius to texture blob
    vec2 texUV = rp / (poolRadius * fit) + 0.5;

    // Outside texture bounds = background = masked
    if (texUV.x < 0.0 || texUV.x > 1.0 || texUV.y < 0.0 || texUV.y > 1.0) {
      return 0.0;
    }

    // Sample texture, convert to luminance
    vec3 texColor = texture2D(uBlobTexture, texUV).rgb;
    float lum = dot(texColor, vec3(0.299, 0.587, 0.114));

    // ---- Crawling edge ----
    // Spatially-varying noise shifts the luminance value so the boundary
    // crawls -- advancing in some spots, holding back in others.
    // Where noise is negative, lum reads darker = edge pushes forward.
    // Where positive, lum reads lighter = edge retreats.
    //
    // Evolves with poolRadius so the crawl pattern shifts as the pool
    // expands -- tendrils reach, bays form, edges find new paths.
    // Active from the very start (no gating on poolRadius).
    float crawl = (vnoise(p * 4.0 + noiseSeed + poolRadius * 5.0) - 0.5) * 0.30
                + (vnoise(p * 8.0 + noiseSeed * 2.0 + poolRadius * 3.0) - 0.5) * 0.12;
    // Gate crawl to blob interior -- fades to zero on paper background
    // so noise can't pull background pixels into the revealed zone
    float crawlMask = smoothstep(0.88, 0.65, lum);
    float adjustedLum = lum + crawl * crawlMask;

    // Dark (blob interior) = revealed, light (background) = masked
    float mask = smoothstep(0.82, 0.28, adjustedLum);

    return mask;
  }

  // -------------------------------------------------------------------------
  // MAIN
  //
  // Timeline (rawProgress 0..1):
  //   0.00 - 0.55  Reveal action (quintic ease-out compresses most here)
  //   0.55 - 0.62  Hold -- painting is "wet", texture effects at full
  //   0.62 - 0.78  Tonal variance dissolves (pigment evening out)
  //   0.68 - 0.88  Edge blooms dissolve (last artifact to dry)
  //   0.75 - 0.92  Brush texture smooths out (bristle marks fill in)
  //   0.92 - 1.00  Clean image, flows into next transition
  // -------------------------------------------------------------------------

  void main() {
    vec2 uv = vUv;
    float screenAspect = uResolution.x / uResolution.y;
    float rawProgress = uRevealProgress;
    vec2 seed = uSeed0;

    // ---- Ease-out: confident momentum that settles into place ----
    // Quintic ease-out: 1 - (1 - t)^5  (LOCKED -- do not change)
    float inv = 1.0 - rawProgress;
    float progress = 1.0 - inv * inv * inv * inv * inv;

    // Cream overlay (#F8EBE5) -- the blank canvas
    vec3 cream = vec3(0.973, 0.922, 0.898);

    // Aspect-corrected pixel position
    vec2 p = vec2(uv.x * screenAspect, uv.y);

    // ---- Origin points (LOCKED -- do not change) ----
    vec2 o0 = vec2(0.28 + seed.x * 0.05, 0.72 + seed.y * 0.04) * vec2(screenAspect, 1.0);
    vec2 o1 = vec2(0.75 + seed.y * 0.04, 0.68 + seed.x * 0.04) * vec2(screenAspect, 1.0);
    vec2 o2 = vec2(0.48 + seed.x * 0.04, 0.48 + seed.y * 0.04) * vec2(screenAspect, 1.0);
    vec2 o3 = vec2(0.15 + seed.y * 0.04, 0.32 + seed.x * 0.04) * vec2(screenAspect, 1.0);
    vec2 o4 = vec2(0.82 - seed.x * 0.03, 0.28 - seed.y * 0.03) * vec2(screenAspect, 1.0);
    vec2 o5 = vec2(0.45 + seed.y * 0.03, 0.15 + seed.x * 0.03) * vec2(screenAspect, 1.0);

    // ---- Threshold (LOCKED timing values) ----
    float maxRange = 4.8;
    float threshold = progress * maxRange;

    // ---- Pool radii: derived from threshold with LOCKED offsets/multipliers ----
    // poolRadius = (threshold - offset) / multiplier
    float r0 = (threshold - 0.00) / 2.8;
    float r1 = (threshold - 0.35) / 2.9;
    float r2 = (threshold - 0.70) / 2.6;
    float r3 = (threshold - 1.05) / 2.9;
    float r4 = (threshold - 1.40) / 2.8;
    float r5 = (threshold - 1.75) / 2.9;

    // ---- Per-pool texture sampling ----
    // Each pool samples the watercolor blob texture at a different rotation
    // and scale. The texture's own edge quality -- bristle marks, dry-brush,
    // pigment grain -- appears naturally at each pool's boundary.
    //
    // Angles spread across 2PI + seed jitter for randomization.
    // Fit values vary slightly so grain size differs per pool.

    float totalMask = 0.0;

    // Pool 0: upper-left, first drop
    totalMask = max(totalMask, samplePool(p, o0, r0,
      0.0 + seed.x * 0.5, 3.0, vec2(2.0, 9.0)));

    // Pool 1: upper-right
    totalMask = max(totalMask, samplePool(p, o1, r1,
      1.05 + seed.y * 0.5, 3.2, vec2(14.0, 3.0)));

    // Pool 2: center
    totalMask = max(totalMask, samplePool(p, o2, r2,
      2.20 + seed.x * 0.4, 2.8, vec2(7.0, 11.0)));

    // Pool 3: left
    totalMask = max(totalMask, samplePool(p, o3, r3,
      3.40 + seed.y * 0.4, 3.3, vec2(3.0, 18.0)));

    // Pool 4: lower-right
    totalMask = max(totalMask, samplePool(p, o4, r4,
      4.60 + seed.x * 0.5, 3.0, vec2(16.0, 7.0)));

    // Pool 5: bottom
    totalMask = max(totalMask, samplePool(p, o5, r5,
      5.50 + seed.y * 0.4, 3.1, vec2(6.0, 14.0)));

    // ---- Gap fill: ensure full coverage by end ----
    // Late in the reveal, any remaining gaps get filled with a noise-based soak
    {
      float fillT = smoothstep(0.70, 0.92, progress);
      float fillNoise = vnoise(p * 3.0 + seed * 5.0);
      float fill = smoothstep(0.2, 0.6, fillNoise + fillT * 0.8);
      totalMask = mix(totalMask, 1.0, fill * fillT);
    }

    totalMask = clamp(totalMask, 0.0, 1.0);

    // ================================================================
    // WATERCOLOR TEXTURE EFFECTS
    // Tonal variance + cauliflower bloom, driven by depth into pool.
    // Both dissolve during the "drying" phase.
    // ================================================================

    // Depth: geometric distance to nearest origin, normalized
    float nearDist = length(p - o0);
    nearDist = min(nearDist, length(p - o1));
    nearDist = min(nearDist, length(p - o2));
    nearDist = min(nearDist, length(p - o3));
    nearDist = min(nearDist, length(p - o4));
    nearDist = min(nearDist, length(p - o5));
    float depthInPool = clamp(1.0 - nearDist / 0.4, 0.0, 1.0) * totalMask;

    // ---- Tonal variance ----
    float tonalStrength = (1.0 - depthInPool * depthInPool) * 0.04 * totalMask;

    // ---- Cauliflower edge bloom ----
    float bloomZone = smoothstep(0.22, 0.0, depthInPool);
    float bloomNoise = vnoise(p * 6.0 + seed * 2.0);
    float bloomStrength = bloomZone * (0.6 + bloomNoise * 0.4) * 0.03 * totalMask;

    // ---- Drying choreography ----
    float dryTonal = smoothstep(0.62, 0.78, rawProgress);
    float dryBloom = smoothstep(0.68, 0.88, rawProgress);

    tonalStrength *= (1.0 - dryTonal);
    bloomStrength *= (1.0 - dryBloom);

    // ---- Compose output ----
    float creamAlpha = 1.0 - totalMask;

    vec3 tonalColor = vec3(0.82, 0.74, 0.68);
    vec3 bloomColor = vec3(0.68, 0.58, 0.50);

    vec3 creamPremul = cream * creamAlpha;
    vec3 fxPremul = tonalColor * tonalStrength + bloomColor * bloomStrength;
    float fxAlpha = tonalStrength + bloomStrength;

    float finalAlpha = creamAlpha + fxAlpha;
    vec3 finalPremul = creamPremul + fxPremul;

    gl_FragColor = vec4(finalPremul, finalAlpha);
  }
`;
