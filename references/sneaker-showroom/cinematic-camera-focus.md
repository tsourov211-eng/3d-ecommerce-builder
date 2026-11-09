# Cinematic Sneaker Camera Focus

The camera transition is a defining interaction of the floating-shelf preset. Focus a selected shoe while retaining the showroom context.

## Interaction sequence

1. User selects a sneaker by clicking or tapping its product target.
2. Resolve the selected product and its camera framing metadata.
3. Slightly emphasize the selected sneaker and its shelf accent.
4. Smoothly move the camera position and look-at target toward the selected model.
5. Keep a portion of neighboring products / shelf visible where the viewport permits.
6. Reveal the product HUD after selection starts or reaches its useful focus state.
7. Return to the saved overview composition when the user closes focus mode.

Do not abruptly replace the entire scene with a new isolated product page.

## Framing strategy

Compute the model bounds and derive an appropriate focus distance from its bounding sphere, camera field of view and viewport aspect ratio. A model-specific framing override may adjust target, yaw, pitch or distance.

The selected shoe should become large enough to inspect, but the camera should not crop the toe, heel or sole. In the desktop reference style, try to retain surrounding shelf context and at least a hint of adjacent products. On narrow screens, prioritizing the selected shoe over neighboring context is acceptable.

Do not use one fixed Z offset for every model: high-tops, low-tops and unusually wide shoes have different bounding volumes.

## Motion

- Use persistent target vectors and frame-delta-aware damping.
- Ease the camera position and look-at direction together.
- Keep focus transitions smooth and restrained; avoid overshoot and elastic wobble.
- Use the same camera state source for overview, focus and return.
- Avoid conflicts with OrbitControls or custom drag controls.
- Respect prefers-reduced-motion by reducing or removing non-essential movement.

## Input behavior

- Click / tap selects a product.
- Escape and a visible back control clear selection.
- Keyboard-operable product buttons in the HTML interface must select the same product as canvas interaction.
- Ignore selection events that originate from interactive HUD controls.
- On touch devices, offer explicit previous / next product controls if the gallery is not directly swipeable.

## Focus state integrity

If a product is removed from the catalog while selected, clear selection safely. If a GLB fails, keep the camera target based on product metadata or show the product image fallback. Never leave the camera targeting a deleted object.

## Validation

Test products at the left, center and right positions of both rows. Test the smallest and largest models. Confirm that the active shoe remains visible, the shelf does not obstruct it and the overview return is exact.
