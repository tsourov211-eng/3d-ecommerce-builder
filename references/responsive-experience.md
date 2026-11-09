# Responsive and Touch Experience

Do not simply scale the desktop showroom down. Change the composition to preserve product visibility and control usability.

## Desktop

- Use the category's intended gallery layout.
- Support hover preview and click-to-focus when appropriate.
- Keep controls near the viewport edges without obscuring the product.
- Use a camera overview that fits the complete gallery.

## Tablet

- Reduce visible columns or switch to a carousel if the products become too small.
- Adjust camera distance and field of view.
- Keep touch targets comfortably sized.
- Avoid side panels that squeeze the canvas below a usable width.

## Mobile

- Prefer a single focused product, horizontal gallery or a small number of visible products.
- Support tap to select and touch-friendly previous / next navigation.
- Do not make hover a required interaction.
- Keep product details and variants in a bottom sheet or compact panel.
- Avoid blocking page scroll unless the 3D interaction explicitly requires it.
- Provide a normal image/product-card fallback for low-power or unsupported devices.

## Camera and layout

- Use the current viewport aspect ratio and product bounds to determine camera distance.
- Recompute framing after resize and orientation changes.
- Clamp pointer parallax and disable it on touch-only devices where it adds no value.
- Prevent model and control overlap.
- Test portrait and landscape if both are supported.
- Avoid relying on CSS viewport height alone where mobile browser chrome changes the available space.

## Interaction and accessibility

Touch, mouse and keyboard must expose equivalent core actions. A selected product should have a visible non-hover state. Keep controls at accessible touch sizes and avoid dragging conflicts between page scroll and model rotation.

## Test matrix

At minimum test one wide desktop, one tablet-sized viewport, one narrow phone in portrait and one phone in landscape. Include a device with limited graphics capability if the intended audience includes lower-end phones.
