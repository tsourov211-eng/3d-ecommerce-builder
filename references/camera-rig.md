# Smooth Camera Rig Blueprint (`src/components/canvas/CameraRig.tsx`)

Uses `maath/easing` (`damp3`) inside `useFrame` to smoothly transition between the full 2x5 grid overview and any clicked sneaker plinth without abrupt jumps.

```tsx
'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { damp3 } from 'maath/easing';
import { useStore } from '@/store/useStore';

export function CameraRig() {
  const products = useStore((state) => state.products);
  const activeProductId = useStore((state) => state.activeProductId);

  // Persistent lookAt vector so camera rotation interpolates as smoothly as camera position
  const lookAtTarget = useRef(new THREE.Vector3(0, 0, 0));
  const goalPosition = useRef(new THREE.Vector3(0, 0.2, 9.2));
  const goalLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state, delta) => {
    const activeProduct = products.find((p) => p.id === activeProductId);

    if (activeProduct) {
      const [px, py, pz] = activeProduct.position;
      // Zoom in close to the selected product with slight pointer micro-parallax
      goalPosition.current.set(
        px + state.pointer.x * 0.18,
        py + 0.18 + state.pointer.y * 0.12,
        pz + 2.35
      );
      goalLookAt.current.set(px, py + 0.05, pz);
    } else {
      // Wide 2x5 gallery overview with responsive mouse parallax
      goalPosition.current.set(
        state.pointer.x * 0.75,
        0.15 + state.pointer.y * 0.45,
        9.2
      );
      goalLookAt.current.set(0, 0, 0);
    }

    damp3(state.camera.position, goalPosition.current, 0.35, delta);
    damp3(lookAtTarget.current, goalLookAt.current, 0.32, delta);
    state.camera.lookAt(lookAtTarget.current);
  });

  return null;
}
```
