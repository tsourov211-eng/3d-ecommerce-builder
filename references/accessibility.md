# Accessibility and Non-WebGL Fallback

The 3D canvas must enhance the shopping experience, not become the only way to access important product information or actions.

## Semantic HTML product interface

Provide an accessible product list or detail interface outside the canvas containing:

- Product name and meaningful image alternative text.
- Description and price with currency.
- Variant controls with labels and selected states.
- Availability where it is known.
- Add-to-cart and navigation buttons.
- Clear error and loading messages.

The HTML interface should remain useful while WebGL loads and when the WebGL context is lost or unavailable.

## Keyboard

- All product and cart actions must be keyboard operable.
- Provide visible focus indicators.
- Support Escape to close focus mode or the relevant dialog.
- Do not trap focus in a panel unless it is a true modal dialog.
- Use logical focus order and return focus to the opening control when closing a modal/drawer.
- Do not make hover the only way to reveal product details.

## Screen readers

Use semantic headings, buttons, lists and form controls. Label icon-only buttons. Announce meaningful cart updates and errors using an appropriate live region without announcing every animation frame.

Do not attempt to expose the WebGL scene as if every mesh were a navigable document element. Provide an equivalent semantic product interface.

## Motion and visual contrast

- Respect prefers-reduced-motion.
- Provide a way to stop or reduce non-essential motion.
- Keep text and controls readable over the scene.
- Do not use color alone to communicate selected, unavailable or error states.
- Avoid flashing or high-frequency visual effects.

## Touch

Use adequately sized touch targets, visible selected states and alternatives to hover. Avoid gestures that conflict with page scrolling or standard browser navigation.

## WebGL fallback

If WebGL is unavailable or the context is lost, keep the product list and product information usable. Display product images or a 2D gallery, explain that 3D preview is unavailable and allow the user to continue browsing.
