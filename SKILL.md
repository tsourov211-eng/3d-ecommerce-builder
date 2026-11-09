---
name: 3d-ecommerce-builder
description: Build responsive, production-minded 3D product showrooms and e-commerce experiences with Next.js, React Three Fiber and Three.js. Use when creating or extending interactive product galleries, GLB-based showrooms, camera-focused product inspection, 3D product configurators, or synchronized 3D and 2D shopping interfaces.
---

# 3D E-Commerce Builder

Build reliable, accessible and performant 3D product experiences. Select a showroom preset based on the product category, supplied references, brand and user requirements. Do not force every project into one layout.

## Operating rules

1. **Inspect before editing.** Read the existing project structure, package manifest, lockfile, routes, styling system, data layer and current conventions. Do not overwrite or reinitialize a working project.
2. **Respect the project.** Keep its package manager, framework version, aliases, lint rules, test setup, CSS framework and component conventions. Install only missing dependencies.
3. **Check compatibility.** Match React and React Three Fiber major versions and inspect peer dependencies before installing. Read [dependency compatibility](references/dependency-compatibility.md).
4. **Choose the right scope.** Decide whether the user asked for showcase, hybrid or real commerce mode. Never claim that a demo cart, stock label, checkout button or payment integration is production functionality.
5. **Honor supplied references.** When a user provides a video, screenshot or design reference, inspect its layout, proportions, materials, camera movement, lighting, typography and interaction states before implementation. Translate the observed design into original components; do not copy protected branding or assets.
6. **Choose a preset deliberately.** Use [design presets](references/design-presets.md). For a reference like the floating-shelf sneaker video, use the dedicated [sneaker showroom guide](references/sneaker-showroom/floating-shelf-layout.md) and read all six sneaker-showroom references.
7. **Keep a single source of truth.** Put shared scene dimensions, camera targets, colors and effect settings in one typed configuration. Do not duplicate magic numbers across components.
8. **Make failure safe.** A missing or invalid model must not crash the whole page. Provide a loading state, useful error state and category-appropriate fallback.
9. **Keep the interface usable without WebGL.** Important product names, prices, variants and actions must remain available as semantic HTML.
10. **Measure performance.** Do not promise 60 FPS on every device. Profile representative devices and adapt pixel ratio, model detail, shadows and post-processing.
11. **Validate the result.** Run the checks available in the project, test the primary interactions and report any checks that could not be run.

## Required workflow

### 1. Inspect and plan

- Identify the existing app structure and the correct integration point.
- Detect the package manager from the lockfile and existing project scripts.
- Check React, Next.js, Three.js, Fiber, Drei and postprocessing compatibility.
- Identify available models, images, product data, brand assets and backend APIs.
- Clarify from context whether this is showcase, hybrid or commerce mode. Ask one focused question only when a blocking requirement cannot be inferred.
- If a design reference is supplied, document the visual and interaction requirements before coding.
- Present a short implementation plan before a broad refactor.

### 2. Establish the application architecture

Follow [architecture](references/architecture.md). In Next.js App Router, keep route metadata and server data concerns in Server Components. Put browser-only 3D loading behind a Client Component boundary. The ssr: false option for next/dynamic must be declared from a Client Component, not directly from a Server Component.

Do not add a use client directive to every file by habit. Add it at the client entry points and where a module must itself be imported as a client boundary. Keep browser APIs inside client-side effects, event handlers or client-only modules.

### 3. Define the product and scene configuration

- Create typed product data independent from scene components.
- Centralize grid columns, spacing, shelf dimensions, camera overview/focus targets, animation timing, lighting and glow values.
- Keep layouts configurable for desktop, tablet and mobile.
- Keep UI state separate from high-frequency animation state.

Read [showroom configuration](references/showroom-config.md) and [store blueprint](references/store-blueprint.md).

### 4. Select the showroom preset

Choose the least complex preset that satisfies the brief:

- **floating-shelf:** two continuous horizontal shelves with five sneakers per row; use for the supplied sneaker-video style. Follow all six files in [references/sneaker-showroom](references/sneaker-showroom/floating-shelf-layout.md).
- **individual-pedestal:** separate illuminated product platforms; retain the original V2 showroom behavior.
- **minimal-gallery:** understated product presentation with more whitespace and less visual machinery.
- **cinematic-hero:** one featured product with secondary products or navigation around it.

Do not combine shelf and pedestal systems by default. A hybrid layout is allowed only when the design brief calls for it.

### 5. Implement the asset pipeline

Read [asset pipeline](references/asset-pipeline.md). Verify model paths and expected files before wiring assets. Support GLB / GLTF through a deliberate loading strategy, optional Draco or KTX2 only when required by the assets, progress feedback, safe error boundaries and procedural or image-based fallbacks. Normalize model origin, scale and orientation without distorting proportions.

For sneaker projects, also read [sneaker model presentation](references/sneaker-showroom/sneaker-model-presentation.md).

### 6. Build the 3D scene

Implement the components in isolated responsibilities:

- Scene canvas, renderer settings and environment.
- Category-aware product gallery and reusable product presentation.
- Shelf or pedestal architecture chosen by the preset.
- Camera rig with smooth, frame-rate-independent motion.
- Hover, selection, touch and product-inspection interactions.
- Loading, empty and failure states.

Read [camera rig](references/camera-rig.md), [pedestal and grid](references/pedestal-and-grid.md), and [lighting and bloom](references/lighting-and-bloom.md). For floating-shelf sneakers, also read the [cinematic focus](references/sneaker-showroom/cinematic-camera-focus.md), [shelf lighting](references/sneaker-showroom/interactive-shelf-lighting.md) and [product inspection](references/sneaker-showroom/product-inspection.md) guides.

### 7. Build the synchronized interface

Read [HUD overlay](references/hud-overlay.md) and [responsive experience](references/responsive-experience.md). The HTML interface should expose product information and controls without blocking canvas interaction. Support mouse, keyboard and touch.

For the floating-shelf sneaker preset, follow [sneaker HUD interface](references/sneaker-showroom/sneaker-hud-interface.md). On small screens, use a composition that preserves product visibility and usable controls rather than shrinking the desktop HUD.

### 8. Add commerce only when in scope

Read [e-commerce functionality](references/ecommerce-functionality.md). A demo showroom may use local demo state. Real commerce requires authoritative server-side product, variant, price, inventory, cart and order validation. Never trust client-submitted prices or stock values. Treat checkout and payments as integration work, not a visual button.

### 9. Finish production concerns

Follow:

- [Performance optimization](references/performance-optimization.md)
- [Accessibility](references/accessibility.md)
- [SEO optimization](references/seo-optimization.md)
- [Testing and validation](references/testing-and-validation.md)
- [Troubleshooting](references/troubleshooting.md)

Use category examples in [examples](examples/sneaker-showroom.md) as starting points, not mandatory templates.

## Definition of done

A task is complete only when:

- The existing project conventions and user requirements are preserved.
- The selected preset matches the brief and supplied reference.
- The app builds and type-checks, where the project provides these scripts.
- Product selection, focus, exit and responsive interactions work.
- Model failures do not take down the full page.
- There is a meaningful non-WebGL or HTML product fallback.
- Commerce claims match the implemented backend capabilities.
- Accessibility and performance have been reviewed.
- Remaining limitations and unrun checks are stated clearly.
