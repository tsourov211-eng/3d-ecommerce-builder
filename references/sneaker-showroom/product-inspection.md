# Sneaker Product Inspection

The focus view should let users inspect the selected sneaker without making navigation confusing or inaccessible.

## Inspection capabilities

Implement only controls that fit the product assets and brief:

- Controlled rotation around the product.
- Optional zoom within safe minimum / maximum limits.
- Reset view.
- Return to collection.
- Optional detail hotspots for material, sole or construction information.

Do not add every interaction by default. A focused camera plus subtle drag rotation may be enough.

## Rotation behavior

- Clamp orbit angles to prevent upside-down or awkward views.
- Set distance limits from model bounds.
- Prevent the camera from passing through the sneaker or shelf.
- Keep a stable target near the model center.
- Avoid conflict between pointer selection and drag-to-rotate.
- On touch, distinguish tap-to-select from drag-to-rotate.

If using Drei OrbitControls or another control, coordinate it with the cinematic camera rig. Disable or configure controls during camera transitions so two systems do not fight over the camera.

## Detail hotspots

If hotspots are requested, attach them to model-local coordinates or a normalized product annotation map. Make them keyboard accessible through corresponding HTML controls. Do not position labels using hard-coded screen coordinates that break on resize.

## Mobile

Provide visible rotate / reset controls or a clear one-finger drag affordance. Keep product selection and page scrolling usable. If 3D inspection is too expensive, use a small image gallery as fallback.

## Validation

Test tap, drag, click, keyboard selection, focus animation and reset separately. Confirm that inspection cannot leave the camera stuck or prevent return to the overview.
