# Smooth Camera Rig

The camera rig moves between an overview composition and a selected product. Use frame-rate-independent damping and derive all targets from the central configuration and actual product positions.

## Required behavior

### Overview mode

- Frame the current category layout, not only a fixed 2x5 sneaker grid.
- Use responsive camera distance or a fitted gallery bounds calculation.
- Keep pointer parallax subtle and clamp its maximum range.
- Avoid excessive movement on touch devices.
- Keep the look-at target stable and near the center of the products.

### Detail mode

- Resolve the selected product by ID.
- Compute a focus position from its bounds or category-specific framing metadata.
- Keep important product details inside the camera frustum.
- Add a small, restrained pointer offset only if it does not make inspection difficult.
- Allow return to overview using both a visible control and Escape.

## Damping

Use a frame-loop helper such as damp3 from maath/easing for camera position and a persistent target vector for camera orientation. Pass the frame delta. Avoid a fixed lerp multiplier that changes behavior with refresh rate.

Use the configured smooth-time values as the starting point. Tune them against the product scale and interaction feel.

## Camera safety

- Clamp pointer input and camera targets.
- Do not focus a missing product ID.
- Avoid placing the camera inside product geometry.
- Update clipping planes only when required.
- Recompute overview framing on resize.
- Disable or reduce parallax when prefers-reduced-motion is enabled.
- Do not allow focus animation to keep the render loop running forever after the scene settles if on-demand rendering is used.

## Suggested implementation shape

1. Read active product ID from a narrow store selector.
2. Read the selected product and its camera metadata.
3. Compute overview or detail target vectors.
4. Smooth camera position and look-at target with delta-aware damping.
5. Call camera lookAt with the persistent target.
6. Keep all transient vectors in refs, not global React state.

## Debugging

If the camera jumps, verify that target vectors persist across frames and that the damping function receives the frame delta. If the selected product is clipped, inspect its bounding box and camera offset instead of applying an arbitrary global zoom. If the grid is cropped, calculate framing from the actual gallery bounds and viewport aspect ratio.
