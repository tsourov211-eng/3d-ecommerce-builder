---
name: 3d-ecommerce-builder
description: Build production-grade interactive 3D e-commerce websites, virtual sneaker/product showrooms, and WebGL grid showcases using Next.js (App Router), React Three Fiber (R3F), Three.js, Drei, Postprocessing, Zustand, Framer Motion, and Tailwind CSS. Use whenever the user asks to build a 3D e-commerce storefront, multi-product 3D grid with smooth camera zoom on click, glowing neon pedestals, or synchronized 3D canvas and 2D checkout UI.
---

# 3D E-Commerce Builder (Antigravity IDE Skill)

Architect and implement zero-crash, 60fps interactive 3D e-commerce storefronts with a 2x5 WebGL product showcase grid, frame-rate independent camera focus rigging, selective neon bloom pedestals, and a synchronized 2D shopping HUD.

## Mandatory Pre-Flight Rules

1. **Package Manager & Dependencies:** Always use `pnpm` unless locked otherwise. Install the exact required stack:
   ```bash
   pnpm add three @types/three @react-three/fiber @react-three/drei @react-three/postprocessing postprocessing maath zustand framer-motion lucide-react clsx tailwind-merge
   ```
2. **Next.js SSR Guardrail:** Every file importing `three`, `@react-three/fiber`, or `@react-three/drei` MUST start with `'use client';` at line 1. Dynamically import the root `<SceneCanvas />` with `{ ssr: false }` inside `app/page.tsx`.
3. **Zero-Crash Asset Policy:** Never write a bare `useGLTF('/models/shoe.glb')` without verifying the file exists in `public/models/`. If `.glb` assets are not present yet, provide a procedural 3D sneaker/product mesh fallback wrapped in `<Center>` and `<Resize>` so the application compiles and renders immediately without 404 crashes.
4. **Canvas-to-DOM State Isolation:** Never lift active/hover state into a parent React `useState` that wraps `<Canvas>`. Always use the Zustand store (`references/store-blueprint.md`) so UI updates do not re-render the WebGL scene graph.

## Implementation Workflow

### Step 1: Initialize the Shared Zustand Store
Read and implement `references/store-blueprint.md` at `src/store/useStore.ts`.
- Pre-populate 10 products arranged in a 2x5 spatial grid (`rows = 2`, `cols = 5`, `xSpacing = 2.6`, `ySpacing = 2.2`).
- Track `activeProductId`, `hoveredProductId`, `selectedSize`, and cart actions.

### Step 2: Implement the 3D Scene, Studio Lighting & Selective Bloom
Read and implement `references/lighting-and-bloom.md` at `src/components/canvas/SceneCanvas.tsx`.
- Set a dark studio background (`#08080c`) and subtle depth fog.
- Use `<Environment preset="city" />` for realistic PBR specular reflections.
- Configure `<EffectComposer disableNormalPass>` with `<Bloom luminanceThreshold={1.1} mipmapBlur intensity={0.85} />` so strictly `toneMapped={false}` emissive pedestal light bars glow.

### Step 3: Build the 2x5 Product Grid & Glowing Plinths
Read and implement `references/pedestal-and-grid.md` at `src/components/canvas/ProductGrid.tsx`.
- Render each product on a dark architectural plinth with an accent neon strip at the base.
- Drive the neon strip's `emissiveIntensity` dynamically (`4.0` when active, `2.2` when hovered, `0.6` at rest) with `toneMapped={false}`.
- Add floating idle animation and `<Center><Resize scale={1.35}>...</Resize></Center>` so any custom `.glb` model automatically fits the pedestal.

### Step 4: Add Smooth Camera Rigging (`damp3`)
Read and implement `references/camera-rig.md` at `src/components/canvas/CameraRig.tsx`.
- Inside `useFrame((state, delta) => ...)`, use `damp3` from `maath/easing` (smoothTime = `0.35`) to interpolate both `state.camera.position` and a persistent `lookAtTarget` `THREE.Vector3`.
- **Overview Mode (`activeProductId === null`):** Target `[0, 0.2, 9.5]` with subtle pointer parallax (`state.pointer.x * 0.6`, `state.pointer.y * 0.4`) and look at `[0, 0, 0]`.
- **Detail Focus Mode (`activeProductId !== null`):** Target `[px, py + 0.15, pz + 2.35]` and smoothly damp `lookAtTarget` to `[px, py + 0.05, pz]`.

### Step 5: Layer the Synchronized 2D HUD Overlay
Read and implement `references/hud-overlay.md` at `src/components/ui/HudOverlay.tsx`.
- Mount inside a `fixed inset-0 z-10 pointer-events-none` container.
- Apply `pointer-events-auto` strictly to interactive controls (top navigation bar, "BACK TO GRID" button, size selector dropdown, and "ADD TO BAG" button).
- Bind the `Escape` key to `clearSelection()` so users can exit focus mode effortlessly.

### Step 6: Terminal Verification Loop (Mandatory)
Before finishing the task in Antigravity IDE:
1. Run `pnpm tsc --noEmit` (or `pnpm run build`) in the terminal to verify zero TypeScript or R3F JSX intrinsic element errors.
2. Confirm no full-screen `div` blocks pointer events on the `<Canvas>`.
