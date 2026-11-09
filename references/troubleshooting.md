# Troubleshooting

Use this guide to diagnose the cause before changing multiple parts of the app.

## Blank canvas

Check:

- Browser console for WebGL and shader errors.
- Whether the Canvas is mounted inside a Client Component.
- Whether a dynamic import with ssr false was declared inside a Client Component.
- Renderer size and parent element height.
- Whether a full-screen overlay is hiding the canvas.
- Whether a model or environment suspends forever.

## Model does not load

Check the actual public path, network status, CORS headers, GLB validity, decoder configuration, texture references and server hosting path. Confirm the asset exists in the deployed build, not only locally. Ensure the product-level error boundary renders a fallback.

## Model appears too large, tiny or rotated

Inspect its bounds, units, origin and forward axis. Apply a uniform scale and orientation at the asset boundary. Avoid adding arbitrary transforms to many child meshes.

## Bloom does not appear

Verify emissive material settings, tone mapping, luminance threshold, effect ordering and renderer color management. If using SelectiveBloom, verify that the intended meshes are actually in its selection and required light references are supplied.

## Entire scene glows

A normal Bloom effect is threshold-based across the rendered image. Use SelectiveBloom when a strict object selection is required, or tune material brightness and threshold if global bright-pixel bloom is intended.

## Camera jumps or jitters

Keep target vectors persistent, pass frame delta to damping, clamp pointer input and avoid recreating camera state on each React render. Check resize logic and whether another control is also driving the camera.

## Hover state gets stuck

Clear hover on pointer leave, product unmount and scene exit. Ensure pointer events are not swallowed by the HUD. Do not make hover the only selection mechanism.

## Low frame rate

Profile before optimizing. Check pixel ratio, model triangle counts, draw calls, transparent materials, real-time shadows, post-processing, texture sizes and continuous animations. Reduce the most expensive cause first.

## Mobile controls are unusable

Check touch targets, viewport camera framing, scroll conflict, panel overlap and landscape behavior. Replace hover-only affordances with tap and keyboard alternatives.

## Hydration mismatch

Do not read browser-only values during the server render. Avoid random or time-dependent initial markup. Defer browser measurements and local persistence until the client has mounted using a hydration-safe strategy.

## Cart or availability mismatch

Treat the server catalog, variant, price and inventory as authoritative. Revalidate on every server cart / checkout operation. Never trust stale localStorage or client-supplied prices.
