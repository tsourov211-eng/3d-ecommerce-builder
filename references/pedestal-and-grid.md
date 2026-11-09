# Product Gallery, Grid, Pedestals and Floating Shelves

The gallery renderer should support multiple presentation systems. Select one from the active showroom preset; do not render shelves and individual pedestals together unless the design explicitly calls for a hybrid.

## Gallery responsibilities

- Render products from typed catalog data rather than hard-coded JSX records.
- Derive positions from the central showroom configuration.
- Use stable product IDs as React keys.
- Keep model rendering separate from product interaction and HTML controls.
- Support fewer products, empty catalogs and incomplete rows.
- Recalculate layout and camera framing for tablet and mobile.
- Avoid expensive bounds or layout calculations on every frame.

## Floating-shelf preset

Read [floating shelf layout](sneaker-showroom/floating-shelf-layout.md) for geometry, arrangement and responsive behavior.

The reference-inspired desktop composition uses two continuous horizontal display shelves with five sneakers per row. Each sneaker has an individual visual anchor and selection target, but the shelf is a shared architectural element for that row.

The shelf system may combine:

- Transparent acrylic or smoked-glass top surface.
- Slim dark metallic support or underside.
- Restrained emissive edge strip.
- Soft contact shadow and subtle reflections.
- Small product-specific accent lights.
- Background depth and studio framing.

Avoid overbuilding the shelf with heavy rails, thick columns or decorative objects that compete with the sneakers. Transparent materials can cause sorting and depth issues; verify rendering from the intended camera angles and provide a simpler opaque/translucent fallback if needed.

## Individual-pedestal preset

The original V2 design uses a separate platform per product. Preserve this as a selectable preset. Each pedestal may contain its own plinth, index label and accent strip, with active / hover / idle states.

Do not use pedestal dimensions or glow settings as floating-shelf defaults.

## Product presentation

A reusable product presentation may contain:

- A product model or category-appropriate placeholder.
- A shelf, platform or environmental fixture only when it improves the composition.
- Optional decorative index labels.
- Hover and active visual states.
- Pointer selection and equivalent accessible HTML controls.

Use actual model bounds and category-specific framing metadata. Do not force watches, furniture, cars or accessories into sneaker-sized geometry.

## Procedural fallback

The rounded-box sneaker mesh is a visual placeholder, not a photorealistic shoe. Keep procedural geometry isolated so it can be replaced by a GLB model.

If a model is unavailable, render a category-appropriate procedural shape or product image, preserve the product details and controls, and show a useful fallback state. Do not leave a broken empty shelf.

## Interaction and resource safety

- Stop event propagation only where required.
- Reset hover state on pointer leave, product unmount and scene exit.
- Do not rely on hover for mobile or keyboard users.
- Prevent HUD pointer events from accidentally selecting products underneath.
- Reuse geometry and materials where safe.
- Avoid mutating shared cached GLB materials unintentionally.
- Do not dispose shared resources still used by other product instances.
