---
name: 3d-ecommerce-builder
description: Build responsive, production-minded 3D product showrooms and e-commerce experiences with Next.js, React Three Fiber and Three.js. Use when creating or extending interactive product galleries, GLB-based showrooms, camera-focused product inspection, 3D product configurators, or synchronized 3D and 2D shopping interfaces.
---

# 3D E-Commerce Builder

Build reliable, accessible and performant 3D product experiences. Treat the original 2x5 dark sneaker gallery with glowing orange pedestals as a reusable preset, not a fixed requirement. Choose the design, layout, camera and interaction model from the product category, supplied assets, brand and user requirements.

## Operating rules

1. **Inspect before editing.** Read the existing project structure, package manifest, lockfile, routes, styling system, data layer and current conventions. Do not overwrite or reinitialize a working project.
2. **Respect the project.** Keep its package manager, framework version, aliases, lint rules, test setup, CSS framework and component conventions. Install only missing dependencies.
3. **Check compatibility.** Match React and React Three Fiber major versions and inspect peer dependencies before installing. Read [dependency compatibility](references/dependency-compatibility.md).
4. **Choose the right scope.** Decide whether the user asked for showcase, hybrid or real commerce mode. Never claim that a demo cart, stock label, checkout button or payment integration is production functionality.
5. **Design for the product.** Select the layout, materials, lighting, camera distance and inspection interactions according to the category. Read [design presets](references/design-presets.md).
6. **Keep a single source of truth.** Put shared scene dimensions, camera targets, colors and effect settings in one typed configuration. Do not duplicate magic numbers across components.
7. **Make failure safe.** A missing or invalid model must not crash the whole page. Provide a loading state, useful error state and category-appropriate fallback.
8. **Keep the interface usable without WebGL.** Important product names, prices, variants and actions must remain available as semantic HTML.
9. **Measure performance.** Do not promise 60 FPS on every device. Profile representative devices and adapt pixel ratio, model detail, shadows and post-processing.
10. **Validate the result.** Run the checks available in the project, test the primary interactions and report any checks that could not be run.

## Required workflow

### 1. Inspect and plan

- Identify the existing app structure and the correct integration point.
- Detect the package manager from the lockfile and existing project scripts.
- Check React, Next.js, Three.js, Fiber, Drei and postprocessing compatibility.
- Identify available models, images, product data, brand assets and backend APIs.
- Clarify from context whether this is showcase, hybrid or commerce mode. Ask one focused question only when a blocking requirement cannot be inferred.
- Present a short implementation plan before a broad refactor.

### 2. Establish the application architecture

Follow [architecture](references/architecture.md). In Next.js App Router, keep route metadata and server data concerns in Server Components. Put browser-only 3D loading behind a Client Component boundary. The ssr: false option for next/dynamic must be declared from a Client Component, not directly from a Server Component.

Do not add a use client directive to every file by habit. Add it at the client entry points and where a module must itself be imported as a client boundary. Keep browser APIs inside client-side effects, event handlers or client-only modules.

### 3. Define the product and scene configuration

- Create typed product data independent from scene components.
- Centralize grid columns, spacing, camera overview/focus targets, animation timing, lighting and glow values.
- Keep the original 2-row / 5-column grid as the sneaker preset only.
- Make layouts configurable for other categories and mobile viewports.
- Keep UI state separate from high-frequency animation state.

Read [showroom configuration](references/showroom-config.md) and [store blueprint](references/store-blueprint.md).

### 4. Implement the asset pipeline

Read [asset pipeline](references/asset-pipeline.md). Verify model paths and expected files before wiring assets. Support GLB / GLTF through a deliberate loading strategy, optional Draco or KTX2 only when required by the assets, progress feedback, safe error boundaries and procedural or image-based fallbacks. Normalize model origin, scale and orientation without distorting proportions.

### 5. Build the 3D scene

Implement the components in isolated responsibilities:

- Scene canvas, renderer settings and environment.
- Category-aware product gallery and reusable product presentation.
- Product pedestal or platform only when appropriate to the design.
- Camera rig with smooth, frame-rate-independent motion.
- Hover, selection and touch interaction.
- Loading, empty and failure states.

Read [camera rig](references/camera-rig.md), [pedestal and grid](references/pedestal-and-grid.md), and [lighting and bloom](references/lighting-and-bloom.md).

Do not make every product category use sneaker geometry, a 2x5 grid, neon orange accents or the same camera framing.

### 6. Build the synchronized interface

Read [HUD overlay](references/hud-overlay.md) and [responsive experience](references/responsive-experience.md). The HTML interface should expose product information and controls without blocking canvas interaction. Support mouse, keyboard and touch. On small screens, prefer a layout that preserves product visibility and usable controls over shrinking the desktop HUD.

### 7. Add commerce only when in scope

Read [e-commerce functionality](references/ecommerce-functionality.md). A demo showroom may use local demo state. Real commerce requires authoritative server-side product, variant, price, inventory, cart and order validation. Never trust client-submitted prices or stock values. Treat checkout and payments as integration work, not a visual button.

### 8. Finish production concerns

Follow:

- [Performance optimization](references/performance-optimization.md)
- [Accessibility](references/accessibility.md)
- [SEO optimization](references/seo-optimization.md)
- [Testing and validation](references/testing-and-validation.md)
- [Troubleshooting](references/troubleshooting.md)

Use [category examples](examples/sneaker-showroom.md), [watch showroom](examples/watch-showroom.md), [furniture showroom](examples/furniture-showroom.md) and [automotive showroom](examples/automotive-showroom.md) as starting points, not mandatory templates.

## Default sneaker preset

When the user gives no category-specific direction and the project is a sneaker showroom, the baseline may use:

- Dark studio background around #08090c.
- Ten products in a 2x5 gallery.
- Five columns, two rows, X spacing 2.65 and Y spacing 2.15 scene units.
- Overview camera around [0, 0.15, 9.2].
- Detail camera offset around [0, 0.18, 2.35] from the selected product.
- Orange emissive accent strips with active / hover / idle intensity of 4.2 / 2.4 / 0.75.
- Smooth camera damping around 0.35 seconds.

These are example defaults only. Store them in the shared configuration and adapt them to actual model bounds, viewport, contrast, device capability and user branding. Do not repeat these values as literals in separate components.

## Definition of done

A task is complete only when:

- The existing project conventions and user requirements are preserved.
- The app builds and type-checks, where the project provides these scripts.
- The main product selection, focus, exit and responsive interactions work.
- Model failures do not take down the full page.
- There is a meaningful non-WebGL or HTML product fallback.
- Commerce claims match the implemented backend capabilities.
- Accessibility and performance have been reviewed.
- Remaining limitations and unrun checks are stated clearly.
