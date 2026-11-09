# Application Architecture

Use this guide when adding the showroom to a new or existing Next.js App Router project.

## Recommended separation

~~~text
app/
├── layout.tsx
├── page.tsx
└── products/
    └── [slug]/
        └── page.tsx

src/
├── components/
│   ├── showroom/
│   │   ├── ShowroomClient.tsx
│   │   ├── SceneCanvasLoader.tsx
│   │   └── ShowroomFallback.tsx
│   ├── canvas/
│   │   ├── SceneCanvas.tsx
│   │   ├── CameraRig.tsx
│   │   ├── ProductGallery.tsx
│   │   ├── ProductModel.tsx
│   │   └── LightingRig.tsx
│   └── ui/
│       ├── ProductDetails.tsx
│       ├── ProductControls.tsx
│       ├── CartDrawer.tsx
│       └── LoadingScreen.tsx
├── config/
│   └── showroom.ts
├── data/
│   └── products.ts
├── store/
│   └── useStore.ts
└── lib/
    ├── assets.ts
    └── commerce.ts
~~~

Adapt paths to the existing project. Do not create duplicate folders or parallel product schemas when equivalents already exist.

## Next.js client boundary

A route page is a Server Component by default. Keep metadata, server data fetching and static content there when possible. The component that declares a browser-only dynamic import should be a Client Component.

Example client loader:

~~~tsx
'use client'

import dynamic from 'next/dynamic'

const SceneCanvas = dynamic(
  () => import('@/components/canvas/SceneCanvas'),
  {
    ssr: false,
    loading: () => <div role="status">Loading 3D showroom…</div>,
  }
)

export function ShowroomClient() {
  return <SceneCanvas />
}
~~~

The route may render this client wrapper while remaining a Server Component:

~~~tsx
import { ShowroomClient } from '@/components/showroom/ShowroomClient'

export default function Page() {
  return (
    <main>
      <h1 className="sr-only">Product showroom</h1>
      <ShowroomClient />
    </main>
  )
}
~~~

The ssr: false restriction matters: do not put this dynamic declaration directly in a Server Component. Keep the import path literal so Next.js can analyze and split the bundle.

## Component responsibilities

- **Route / server layer:** metadata, product data, authorization, server actions or route handlers.
- **Client showroom shell:** dynamic scene loading, loading and WebGL error states.
- **Canvas layer:** Three.js objects, lights, camera, pointer events and frame-loop animation.
- **HTML interface:** semantic product information, keyboard controls, variant selection and cart UI.
- **Store:** shared interaction and cart state; do not store Three.js object references in serializable commerce state.
- **Asset utilities:** model URL mapping, validation metadata and loading configuration.
- **Commerce service:** server-authoritative pricing, inventory, cart and order calls.

## State boundary

Use Zustand or the project's existing state manager for cross-component state such as active product, selected variant and cart contents. Keep per-frame values in refs and Three.js objects. Avoid causing the entire Canvas subtree to re-render on every pointer move or animation frame.

Use narrow selectors and stable actions. Avoid subscribing a large canvas parent to the entire store.

## Browser API and hydration safety

- Access window, document, localStorage, navigator and WebGL capabilities only in client-only code.
- Use effects or event handlers for browser APIs that require a mounted browser.
- Do not read localStorage during server rendering.
- Avoid random IDs, current-time-dependent values or device measurements in the initial server/client render unless they are made hydration-safe.
- Clean up event listeners, observers, timers and animation resources.
- Render a useful HTML fallback while the canvas is unavailable.

## Existing application integration

Inspect before changing:

- Current routes and layout composition.
- Existing product / commerce data types.
- Tailwind or CSS module conventions.
- Authentication and permissions.
- API contracts and error-handling patterns.
- Image and asset hosting.
- Testing and lint configuration.

Do not replace a complete existing site with a standalone demo unless the user explicitly asks for a rebuild.
