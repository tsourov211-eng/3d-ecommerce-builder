# Sneaker Model Presentation and Asset Standards

This guide covers the presentation of realistic sneaker models inside the floating-shelf showroom.

## Preferred asset

Use optimized GLB / GLTF models with clear commercial-use rights. A rounded-box procedural mesh is only a temporary placeholder and should not be described as photorealistic.

For each sneaker, record:

- Product ID and model URL.
- Preview / fallback image.
- Model revision or content hash.
- Unit scale and forward-axis correction.
- Uniform fit scale.
- Ground / sole offset.
- Default yaw and display rotation.
- Camera target and focus-distance override where required.
- Optional animation metadata.

## Model quality

Prefer models with:

- Clean topology and sensible polygon count.
- Correct normals and non-overlapping surfaces.
- PBR materials with appropriate roughness and metalness.
- Optimized, correctly sized textures.
- Consistent real-world proportions.
- No hidden high-cost geometry or unnecessary interior detail.

Do not fabricate high-frequency stitching or texture detail through expensive real-time effects when it can be baked into the model.

## Normalization

At load time or asset preparation time:

1. Inspect the bounding box and dimensions.
2. Identify the sole / ground baseline.
3. Correct orientation to the showroom's forward axis.
4. Apply one uniform scale factor, preserving aspect ratio.
5. Set the product's display anchor and baseline.
6. Store corrections in catalog asset metadata.
7. Test the model on its shelf from overview and close focus views.

Never assume all GLBs have the same origin or unit system. Avoid spreading per-model rotation and scale hacks across JSX.

## Materials and variants

Use real material variants only when supported by separate materials, textures or model variants. When changing a material, avoid mutating a shared loader-cached material used by another product. Clone or use an explicit material mapping strategy.

A color selector must visibly change the correct material / asset and correspond to valid product data. Do not imply that a colorway exists when no model, image or inventory variant supports it.

## Loading and failure

Follow the core asset-pipeline reference:

- Show loading feedback when appropriate.
- Keep model errors isolated to the product.
- Provide a fallback image or simple placeholder.
- Preserve product data and shopping controls if a model fails.
- Cache assets and avoid duplicate downloads.
- Verify deployed asset paths and decoder setup.

## License and attribution

Track asset source, creator, license, required attribution and restrictions. Do not use a model commercially unless its license permits the intended use. Do not scrape or reuse branded product models without appropriate rights.
