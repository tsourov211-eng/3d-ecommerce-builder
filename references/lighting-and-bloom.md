# WebGL Canvas, Lighting & Selective Bloom Blueprint (`src/components/canvas/SceneCanvas.tsx`)

Configures the R3F `<Canvas>`, studio HDRI reflections, soft ground contact shadows, and selective post-processing bloom.

```tsx
'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Environment } from '@react-three/drei';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { CameraRig } from './CameraRig';
import { ProductGrid } from './ProductGrid';

export default function SceneCanvas() {
  return (
    <div className="fixed inset-0 z-0 bg-[#08090c]">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0.2, 9.2], fov: 38, near: 0.1, far: 100 }}
      >
        <color attach="background" args={['#08090c']} />
        <fog attach="fog" args={['#08090c', 11, 24]} />

        <ambientLight intensity={0.45} />
        <directionalLight
          position={[5, 8, 6]}
          intensity={1.4}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <spotLight position={[0, 6, 4]} intensity={0.9} angle={0.5} penumbra={1} />

        <Suspense fallback={null}>
          <Environment preset="city" />
          <ProductGrid />
          <ContactShadows
            position={[0, -2.1, 0]}
            opacity={0.55}
            scale={22}
            blur={2.4}
            far={4.5}
          />
        </Suspense>

        <CameraRig />

        <EffectComposer disableNormalPass>
          <Bloom
            luminanceThreshold={1.1}
            mipmapBlur
            intensity={0.85}
            radius={0.55}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
```
