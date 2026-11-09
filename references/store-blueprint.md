# Product and Interaction Store Blueprint

Use the existing state solution when the project already has one. Zustand is a useful default for a standalone showroom, but the store must represent the actual requested behavior rather than a single cart counter.

## Domain types

~~~ts
export type ProductStatus = 'available' | 'out-of-stock' | 'coming-soon' | 'unknown'

export interface ProductVariant {
  id: string
  label: string
  available?: boolean
}

export interface ProductItem {
  id: string
  slug: string
  name: string
  subtitle?: string
  description?: string
  price: number
  currency: string
  status: ProductStatus
  accentColor?: string
  bodyColor?: string
  modelUrl?: string
  imageUrl?: string
  position: [number, number, number]
  variants?: ProductVariant[]
  defaultVariantId?: string
}

export interface CartItem {
  key: string
  productId: string
  variantId?: string
  quantity: number
}
~~~

Prices and availability shown in a real commerce experience must come from trusted catalog data. The client store may hold display snapshots, but the server must recalculate price and stock before accepting an order.

## State responsibilities

The showroom store may hold:

- Product collection or IDs needed for the current scene.
- Active and hovered product IDs.
- Selected variant ID per active product, or a current selection.
- Cart line items and UI drawer state.
- User-visible demo state when the application is explicitly in showcase mode.

Do not put Three.js Mesh, Object3D, Vector3, Material or Texture instances into persisted JSON state. Keep those in component refs or scene-local caches.

## Cart behavior

A cart line must represent a product plus its chosen variant. Adding the same product and same variant should update quantity rather than create confusing duplicates. Different sizes, colors or other variants must remain separate lines.

Implement explicit actions for:

- add item;
- remove line;
- update quantity;
- clear cart;
- derive total quantity and subtotal from line items.

Use a stable key based on product ID and variant ID. Do not maintain a separate mutable cart count that can drift from the items array.

## Selection behavior

- Selecting a product should resolve its product data and valid default variant.
- Switching products must not silently preserve an invalid variant from the previous product.
- A selected variant must be checked against the product's available variants.
- An unavailable item must not be addable in real commerce mode.
- Escape and the visible back control should call the same clear-selection action.
- Hover is temporary presentation state, not a substitute for keyboard focus.

## Persistence

For a showcase, in-memory state is enough unless persistence is requested.

For a real cart, persist only the minimum client state needed for convenience and revalidate it on the server. If using localStorage, avoid reading it during server rendering. Use a hydration-safe client rehydration strategy and handle malformed or stale persisted data.

## Update frequency

Subscribe UI panels to narrow selectors. Do not put rapidly changing pointer coordinates or frame-loop values in the global store. The Canvas should not re-render as a whole for every hover change.
