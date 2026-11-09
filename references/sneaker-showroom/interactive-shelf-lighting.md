# Interactive Shelf Lighting

Lighting communicates product focus and showroom depth. Keep it integrated with the floating-shelf layout rather than treating every sneaker as an isolated neon pedestal.

## Lighting layers

- Low-intensity ambient fill for dark surfaces.
- Soft key light to reveal sneaker shape and materials.
- Rim light to separate shoes from the background.
- Restrained environment reflections for material realism.
- Optional shelf-edge emissive strip.
- Soft contact shadow under each sneaker and shelf.

## Shelf states

Use shared shelf geometry but product-aware accent segments or underlights. A selected product may brighten the segment beneath it and subtly emphasize its full row. Hover should be less intense than active selection.

Keep all values in the central preset configuration. Suggested state names:

- idle: default gallery presentation.
- hovered: temporary pointer emphasis.
- selected: active product focus.
- disabled: unavailable / non-interactive product, if relevant.

Do not use color alone to communicate selection; the HUD and accessible HTML must show the selected product.

## Bloom choice

Normal threshold-based Bloom affects bright pixels across the rendered scene. Use it for restrained emissive shelf edges when global threshold glow looks appropriate.

Use SelectiveBloom only if the design truly requires a strict list of glowing objects and the installed postprocessing API supports the necessary selection / light configuration. It is not the same as ordinary Bloom and may carry additional render cost.

## Material guidance

- Use emissive materials for the light strip itself.
- Avoid setting the whole acrylic shelf to a high emissive intensity.
- Keep the sneaker upper readable and preserve PBR highlights.
- Tune exposure and bloom threshold together.
- Avoid clipping bright materials into white or spreading a glow halo over the shoe silhouette.

## Performance

Prefer one or a small number of shelf lights over many shadow-casting point lights. Reuse materials and geometries. Avoid real-time reflective capture unless it is necessary and measured. Reduce bloom and shadow quality on mobile.

## Validation

Inspect the shelf from overview, focus, side and mobile angles. Check dark, white and brightly colored sneakers. Confirm the active shelf is easy to identify without overpowering the product.
