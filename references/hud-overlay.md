# Synchronized 2D HUD Overlay Blueprint (`src/components/ui/HudOverlay.tsx`)

Implements the non-blocking `pointer-events-none` 2D HUD that animates in product details on the left and a size selector + checkout CTA on the right when a 3D sneaker plinth is focused.

```tsx
'use client';

import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag, Sparkles } from 'lucide-react';
import { useStore } from '@/store/useStore';

export function HudOverlay() {
  const products = useStore((state) => state.products);
  const activeProductId = useStore((state) => state.activeProductId);
  const selectedSize = useStore((state) => state.selectedSize);
  const cartCount = useStore((state) => state.cartCount);
  const clearSelection = useStore((state) => state.clearSelection);
  const setSelectedSize = useStore((state) => state.setSelectedSize);
  const addToCart = useStore((state) => state.addToCart);

  const activeProduct = products.find((p) => p.id === activeProductId);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') clearSelection();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [clearSelection]);

  return (
    <div className="fixed inset-0 z-10 pointer-events-none flex flex-col justify-between p-6 md:p-10 text-white select-none">
      {/* Top Bar */}
      <header className="flex items-center justify-between">
        <div className="pointer-events-auto flex items-center gap-3">
          <div className="h-2.5 w-2.5 rounded-full bg-orange-500 shadow-[0_0_12px_#ff5500]" />
          <span className="font-mono text-xs tracking-[0.28em] text-zinc-300 uppercase">
            KINETIC // ARCHIVE 3D
          </span>
        </div>

        <div className="pointer-events-auto flex items-center gap-4">
          {activeProduct && (
            <button
              onClick={clearSelection}
              className="flex items-center gap-2 rounded-full border border-white/15 bg-zinc-900/80 px-4 py-2 text-xs font-mono tracking-widest text-zinc-200 backdrop-blur-md transition hover:border-orange-500/60 hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5 text-orange-500" />
              OVERVIEW [ESC]
            </button>
          )}

          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-zinc-900/75 px-4 py-2 text-xs font-mono text-zinc-300 backdrop-blur-md">
            <ShoppingBag className="h-3.5 w-3.5 text-orange-500" />
            <span>BAG ({cartCount})</span>
          </div>
        </div>
      </header>

      {/* Center Left & Right Contextual Panels on Active Focus */}
      <AnimatePresence>
        {activeProduct && (
          <div className="my-auto grid grid-cols-1 md:grid-cols-12 items-center gap-6">
            {/* Left Product Spec Sheet */}
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="pointer-events-auto md:col-span-4 rounded-2xl border border-white/10 bg-zinc-950/75 p-6 backdrop-blur-xl"
            >
              <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.25em] text-orange-400">
                <Sparkles className="h-3 w-3" />
                <span>{activeProduct.plinthCode} // {activeProduct.frameCode}</span>
              </div>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
                {activeProduct.name}
              </h1>
              <p className="mt-1 font-mono text-xs tracking-widest text-zinc-400">
                {activeProduct.subtitle}
              </p>
              <div className="mt-5 flex items-baseline gap-3 border-t border-white/10 pt-4">
                <span className="text-2xl font-semibold text-white">
                  ${activeProduct.price}.00
                </span>
                <span className="font-mono text-[11px] text-emerald-400">
                  IN STOCK // READY TO SHIP
                </span>
              </div>
            </motion.div>

            <div className="hidden md:block md:col-span-5" />

            {/* Right Size Picker & Checkout Panel */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 24 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="pointer-events-auto md:col-span-3 rounded-2xl border border-white/10 bg-zinc-950/75 p-6 backdrop-blur-xl"
            >
              <span className="block font-mono text-[11px] tracking-[0.2em] text-zinc-400 uppercase">
                SELECT EU SIZE
              </span>
              <div className="mt-3 grid grid-cols-4 gap-2">
                {activeProduct.sizes.map((size) => {
                  const selected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`rounded-lg py-2 font-mono text-xs transition ${
                        selected
                          ? 'bg-orange-500 text-black font-bold shadow-[0_0_15px_rgba(255,85,0,0.5)]'
                          : 'border border-white/10 bg-white/5 text-zinc-300 hover:border-white/30'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={addToCart}
                className="mt-5 w-full rounded-xl bg-orange-500 py-3.5 font-mono text-xs font-bold tracking-[0.2em] text-black uppercase transition hover:bg-orange-400 shadow-[0_0_24px_rgba(255,85,0,0.4)]"
              >
                ADD TO BAG — ${activeProduct.price}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bottom Footer Hint */}
      <footer className="flex items-center justify-between font-mono text-[11px] tracking-[0.2em] text-zinc-500">
        <span>
          {activeProduct
            ? `FOCUSED // ${activeProduct.name}`
            : 'CLICK ANY PLINTH TO INSPECT 3D ARTIFACT'}
        </span>
        <span>WEBGL 2.0 // R3F PIPELINE</span>
      </footer>
    </div>
  );
}
```
