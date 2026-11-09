# Smooth Camera Rig

The camera rig moves between an overview composition and a selected product. Use frame-rate-independent damping and derive all targets from the central configuration and actual product bounds.

## Required behavior

### Overview mode

- Frame the current preset layout, not only a fixed 2x5 sneaker grid.
- Use responsive camera distance or fitted gallery bounds.
- Keep pointer parallax subtle and clamp its maximum range.
- Avoid excessive movement on touch devices.
- Keep the look-at target stable and near the center of the showroom.

### Detail mode

- Resolve the selected product by ID.
- Compute focus position from its bounds and category-specific framing metadata.
- Keep the product fully visible while allowing contextual shelf and neighboring products to remain partially visible when the selected preset requires it.
- Do not zoom so tightly that the viewer loses the sense of place in the floating-shelf showroom.
- Use a restrained pointer offset only when it does not make inspection difficult.
- Allow return to overview using both a visible control and Escape.

## Floating-shelf focus composition

For the floating-shelf sneaker preset:

1. Animate the camera toward the selected sneaker's framing target; do not simply scale the selected mesh.
2. Shift the look-at target toward the selected shoe while keeping enough horizontal and vertical context to reveal its shelf and nearby sneakers.
3. Keep the selected product as the strongest visual focal point.
4. Keep neighboring products partially visible when the viewport permits; on narrow screens, prioritize the selected product and expose neighbors through explicit next / previous controls.
5. Preserve the two-shelf depth and perspective during the transition.
6. Return smoothly to the exact overview composition when selection clears.

Use a configurable focus distance or bounds-derived framing, not a fixed camera offset that only works for one GLB model. Model-specific framing metadata may override the generic target.

## Damping

Use a frame-loop helper such as damp3 from maath/easing for camera position and a persistent target vector for camera orientation. Pass the frame delta. Avoid a fixed lerp multiplier that changes behavior with refresh rate.

Use configured smooth-time values as starting points. Tune them against product scale and interaction feel.

## Camera safety

- Clamp pointer input and camera targets.
- Do not focus a missing product ID.
- Avoid placing the camera inside product geometry or shelf surfaces.
- Update clipping planes only when required.
- Recompute overview framing on resize.
- Disable or reduce parallax when prefers-reduced-motion is enabled.
- Avoid conflicts between the focus rig and any orbit / drag inspection controls.
- If using on-demand rendering, ensure camera transitions and control updates invalidate frames until settled.

## Suggested implementation shape

1. Read active product ID from a narrow store selector.
2. Resolve the product and its framing metadata.
3. Compute overview or detail target vectors using the active preset.
4. Smooth camera position and look-at target with delta-aware damping.
5. Apply camera lookAt with the persistent target.
6. Keep transient vectors in refs, not global React state.

## Debugging

If the camera jumps, verify that target vectors persist across frames and that damping receives frame delta. If the selected product is clipped, inspect its bounding box and camera offset instead of applying an arbitrary global zoom. If neighboring products disappear, reduce focus distance or widen the framing target rather than duplicating product meshes without a clear reason.
