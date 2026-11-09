# Zustand Store Blueprint (`src/store/useStore.ts`)

Use this exact blueprint to manage 3D grid coordinates, active camera focus target, hover state, and product size selection without triggering React Canvas re-renders.

```tsx
'use client';

import { create } from 'zustand';

export interface ProductItem {
  id: string;
  frameCode: string;
  plinthCode: string;
  name: string;
  subtitle: string;
  price: number;
  accentColor: string;
  bodyColor: string;
  position: [number, number, number];
  sizes: number[];
  modelUrl?: string;
}

interface ShowroomState {
  products: ProductItem[];
  activeProductId: string | null;
  hoveredProductId: string | null;
  selectedSize: number;
  cartCount: number;
  selectProduct: (id: string) => void;
  clearSelection: () => void;
  setHoveredProduct: (id: string | null) => void;
  setSelectedSize: (size: number) => void;
  addToCart: () => void;
}

const createGridProducts = (): ProductItem[] => {
  const items = [
    { name: 'AERO PULSE X1', subtitle: 'CARBON SERIES', price: 240, accent: '#ff5500', body: '#e5e7eb' },
    { name: 'VORTEX NITRO', subtitle: 'STUDIO EDITION', price: 265, accent: '#ff6b00', body: '#1f2937' },
    { name: 'KINETIC DRIFT', subtitle: 'HYPER RUNNER', price: 220, accent: '#ff4500', body: '#f3f4f6' },
    { name: 'STRATOS ZERO', subtitle: 'AERO LABS', price: 290, accent: '#ff7700', body: '#d1d5db' },
    { name: 'PHANTOM GLIDE', subtitle: 'STEALTH PACK', price: 255, accent: '#ff5500', body: '#374151' },
    { name: 'APEX VECTOR', subtitle: 'PROTOTYPE 06', price: 310, accent: '#ff6600', body: '#f9fafb' },
    { name: 'SOLARIS MAX', subtitle: 'INFRARED CORE', price: 275, accent: '#ff4400', body: '#e2e8f0' },
    { name: 'CHRONO SHIFT', subtitle: 'FUTURE CRAFT', price: 235, accent: '#ff5500', body: '#4b5563' },
    { name: 'NEBULA FORCE', subtitle: 'ORBITAL LINE', price: 285, accent: '#ff6a00', body: '#f1f5f9' },
    { name: 'ZENITH PRIME', subtitle: 'FLAGSHIP DROP', price: 340, accent: '#ff5000', body: '#cbd5e1' },
  ];

  const cols = 5;
  const xSpacing = 2.65;
  const ySpacing = 2.15;

  return items.map((item, idx) => {
    const row = Math.floor(idx / cols); // 0 (top) or 1 (bottom)
    const col = idx % cols;             // 0..4
    const x = (col - (cols - 1) / 2) * xSpacing;
    const y = (0.5 - row) * ySpacing;
    const z = 0;
    const indexNum = String(idx + 1).padStart(2, '0');

    return {
      id: `product-${indexNum}`,
      frameCode: `FRAME ${indexNum}`,
      plinthCode: `PLINTH ${indexNum}`,
      name: item.name,
      subtitle: item.subtitle,
      price: item.price,
      accentColor: item.accent,
      bodyColor: item.body,
      position: [x, y, z],
      sizes: [39, 40, 41, 42, 43, 44, 45],
    };
  });
};

export const useStore = create<ShowroomState>((set) => ({
  products: createGridProducts(),
  activeProductId: null,
  hoveredProductId: null,
  selectedSize: 42,
  cartCount: 0,
  selectProduct: (id) => set({ activeProductId: id }),
  clearSelection: () => set({ activeProductId: null }),
  setHoveredProduct: (id) => set({ hoveredProductId: id }),
  setSelectedSize: (size) => set({ selectedSize: size }),
  addToCart: () => set((state) => ({ cartCount: state.cartCount + 1 })),
}));
```
