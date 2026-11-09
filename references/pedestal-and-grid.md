# 2x5 Product Grid & Glowing Pedestal Blueprint (`src/components/canvas/ProductGrid.tsx`)

Renders the 2x5 sneaker showcase grid with architectural dark plinths, selective bloom neon strips (`toneMapped={false}`), and an interactive stylized 3D sneaker mesh (ready to swap with `useGLTF`).

```tsx
'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Center, Resize, RoundedBox, Text } from '@react-three/drei';
import * as THREE from 'three';
import { ProductItem, useStore } from '@/store/useStore';

function ProceduralSneakerMesh({
  bodyColor,
  accentColor,
  isActive,
  isHovered,
}: {
  bodyColor: string;
  accentColor: string;
  isActive: boolean;
  isHovered: boolean;
}) {
  const shoeRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!shoeRef.current) return;
    const t = state.clock.getElapsedTime();
    shoeRef.current.position.y = Math.sin(t * 2.2) * 0.035;
    const targetRotY = isActive
      ? -0.45 + Math.sin(t * 0.9) * 0.25
      : isHovered
      ? -0.35
      : -0.55;
    shoeRef.current.rotation.y = THREE.MathUtils.lerp(shoeRef.current.rotation.y, targetRotY, delta * 5);
  });

  return (
    <group ref={shoeRef} rotation={[0.08, -0.55, -0.06]}>
      <Center>
        <Resize scale={1.25}>
          <group>
            {/* Sculpted Midsole */}
            <RoundedBox args={[1.65, 0.26, 0.62]} radius={0.11} smoothness={4} position={[0, -0.18, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#f8fafc" roughness={0.35} metalness={0.1} />
            </RoundedBox>

            {/* Glowing Air/Accent Unit in Heel */}
            <RoundedBox args={[0.55, 0.1, 0.64]} radius={0.04} position={[-0.45, -0.18, 0]}>
              <meshStandardMaterial
                color={accentColor}
                emissive={accentColor}
                emissiveIntensity={isActive ? 2.5 : 1.2}
                toneMapped={false}
              />
            </RoundedBox>

            {/* Main Upper Body */}
            <RoundedBox args={[1.45, 0.42, 0.56]} radius={0.18} smoothness={4} position={[-0.05, 0.08, 0]} castShadow receiveShadow>
              <meshStandardMaterial color={bodyColor} roughness={0.4} metalness={0.25} />
            </RoundedBox>

            {/* Ankle Collar & Tongue */}
            <RoundedBox args={[0.68, 0.36, 0.52]} radius={0.14} smoothness={4} position={[-0.32, 0.32, 0]} rotation={[0, 0, -0.25]} castShadow>
              <meshStandardMaterial color="#111827" roughness={0.6} />
            </RoundedBox>

            {/* Side Accent Swoop */}
            <RoundedBox args={[0.85, 0.12, 0.59]} radius={0.04} position={[0.05, 0.08, 0]} rotation={[0, 0, 0.12]}>
              <meshStandardMaterial color={accentColor} roughness={0.25} metalness={0.4} />
            </RoundedBox>
          </group>
        </Resize>
      </Center>
    </group>
  );
}

function ProductPlinth({ product }: { product: ProductItem }) {
  const activeProductId = useStore((state) => state.activeProductId);
  const hoveredProductId = useStore((state) => state.hoveredProductId);
  const selectProduct = useStore((state) => state.selectProduct);
  const setHoveredProduct = useStore((state) => state.setHoveredProduct);

  const isActive = activeProductId === product.id;
  const isHovered = hoveredProductId === product.id;
  const neonIntensity = isActive ? 4.2 : isHovered ? 2.4 : 0.75;

  return (
    <group
      position={product.position}
      onClick={(e) => {
        e.stopPropagation();
        selectProduct(product.id);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHoveredProduct(product.id);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHoveredProduct(null);
        document.body.style.cursor = 'auto';
      }}
    >
      {/* Back Framing Wall Panel */}
      <RoundedBox args={[1.95, 1.55, 0.08]} radius={0.03} position={[0, 0.05, -0.55]} receiveShadow>
        <meshStandardMaterial color="#0f1117" roughness={0.7} metalness={0.3} />
      </RoundedBox>

      {/* Top Frame Index Label */}
      <Text
        position={[-0.78, 0.68, -0.49]}
        fontSize={0.065}
        color="#6b7280"
        anchorX="left"
        anchorY="middle"
      >
        {product.frameCode}
      </Text>

      {/* 3D Product Mesh */}
      <group position={[0, 0.08, 0.05]}>
        <ProceduralSneakerMesh
          bodyColor={product.bodyColor}
          accentColor={product.accentColor}
          isActive={isActive}
          isHovered={isHovered}
        />
      </group>

      {/* Floating Pedestal Shelf */}
      <RoundedBox args={[1.75, 0.14, 0.95]} radius={0.025} position={[0, -0.45, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#161922" roughness={0.35} metalness={0.6} />
      </RoundedBox>

      {/* Selective Bloom Neon Bar (toneMapped={false} exceeds luminanceThreshold 1.1) */}
      <mesh position={[0, -0.45, 0.48]}>
        <boxGeometry args={[1.45, 0.035, 0.02]} />
        <meshStandardMaterial
          color={product.accentColor}
          emissive={product.accentColor}
          emissiveIntensity={neonIntensity}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

export function ProductGrid() {
  const products = useStore((state) => state.products);
  const clearSelection = useStore((state) => state.clearSelection);

  return (
    <group onPointerMissed={() => clearSelection()}>
      {products.map((product) => (
        <ProductPlinth key={product.id} product={product} />
      ))}
    </group>
  );
}
```
