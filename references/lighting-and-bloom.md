# Lighting, Materials and Bloom

Create lighting for the selected product category and art direction. The dark city-environment sneaker preset is a starting point, not a universal setup.

## Base lighting

- Choose a background and environment that maintain product contrast.
- Use a small, intentional set of key, fill and rim lights.
- Tune roughness and metalness to the actual material rather than making every surface glossy.
- Use contact shadows only when they improve grounding and remain performant.
- Keep fog subtle and ensure it does not hide product details.
- Respect color management and tone mapping.

## Bloom behavior

There are two different effects:

- **Bloom:** threshold-based glow applied to bright pixels in the rendered image. It suits the current emissive-strip preset when the scene is designed around a luminance threshold.
- **SelectiveBloom:** an object-selection effect for cases where only explicitly selected meshes or lights should bloom. It requires an explicit selection and relevant light references according to the installed postprocessing API.

Do not describe ordinary Bloom as strictly object-isolated selective bloom. Choose the simpler Bloom effect when strict object selection is not needed; it is generally cheaper.

## Emissive materials

- Use emissive color and controlled intensity for luminous accents.
- Set toneMapped to false only on elements intentionally designed to exceed the bloom threshold.
- Keep non-emissive surfaces below the intended threshold where possible.
- Tune threshold, smoothing, radius and intensity together.
- Avoid clipping large product surfaces into white.

## Quality tiers

Provide a quality strategy rather than enabling every effect everywhere:

- High: environment reflections, selected shadows and carefully tuned bloom.
- Balanced: lower shadow resolution and reduced post-processing.
- Performance: minimal effects, lower pixel ratio and simpler materials.

Use measured device performance to select or adapt quality. Do not use GPU detection alone as a guarantee of actual frame rate.

## Validation

Inspect the product under light and dark materials, at overview and detail distances, and on the target mobile device. Confirm that color, roughness and shape remain legible with post-processing enabled.
