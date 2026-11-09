# Product Gallery, Grid and Pedestal Blueprint

The original sneaker preset uses a 2x5 product arrangement with dark back panels and glowing pedestal strips. Reuse those ideas only when they fit the product category and brand.

## Gallery responsibilities

- Render products from typed catalog data rather than hard-coded JSX records.
- Derive positions from the central showroom configuration.
- Use a stable product ID as the React key.
- Keep model rendering separate from product interaction and HTML controls.
- Support fewer than ten products, empty catalogs and incomplete final rows.
- Recalculate layout or camera framing for tablet and mobile.
- Avoid expensive layout or bounding-box recalculations on every frame.

## Product presentation

A reusable product presentation may contain:

- A product model or category-appropriate placeholder.
- A platform, pedestal or environmental fixture when it improves the composition.
- Optional code / index labels as decorative metadata.
- Hover and active visual states.
- Pointer and keyboard-accessible selection through the HTML layer.

Do not force watches, furniture, cars or small accessories into sneaker-sized geometry. Use actual model bounds and category-specific framing metadata.

## Procedural fallback

The existing rounded-box sneaker mesh is a visual placeholder, not a photorealistic shoe. Keep procedural geometry simple, named and isolated so it can be replaced by a GLB model later.

If a model is unavailable:

1. Render a category-appropriate procedural shape or product image.
2. Keep selection and product details functional.
3. Show a clear loading or fallback state where appropriate.
4. Avoid a broken empty pedestal or unhandled model error.

## Hover and selection

- Stop event propagation only where required by scene composition.
- Reset hover state on pointer leave and when the scene unmounts.
- Prefer Drei's cursor helper or a managed interaction layer over scattered direct writes to document.body.style.cursor.
- Do not rely on hover for mobile or keyboard users.
- Prevent pointer events in the 2D HUD from accidentally selecting products underneath.

## Geometry and model fitting

Drei provides helpers such as Center and Resize in supported versions. Verify the installed Drei export and its current behavior before relying on them. Alternatively compute a model bounding box and apply a uniform scale that preserves aspect ratio.

Do not assume every supplied asset has the same origin, units, forward axis or dimensions. Normalize models at the asset boundary, not with arbitrary per-mesh transforms spread across the scene.
