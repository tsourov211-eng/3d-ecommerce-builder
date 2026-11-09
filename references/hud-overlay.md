# Synchronized 2D HUD Overlay

The HTML layer presents product information and controls while the 3D scene provides visual inspection. The interface must remain usable if the canvas is loading, hidden or unavailable.

## Layout and pointer events

A full-screen HUD wrapper may use pointer-events: none so the empty overlay area does not intercept the canvas. Apply pointer-events: auto only to actual interactive controls and panels.

Do not place an invisible full-screen element over the canvas. Ensure the product panel does not cover the active model on small screens.

## Product information

Render product name, description, price, currency, variants and availability from actual product data. Never hard-code claims such as IN STOCK, READY TO SHIP, discount, delivery estimate or guarantee.

If data is unknown, show a neutral unknown or unavailable state rather than inventing it.

## Interaction requirements

- Clear product selection with a visible back control and Escape.
- Keep keyboard focus visible.
- Use semantic buttons, labels, lists and form controls.
- Give icon-only controls accessible names.
- Ensure product variant selection is represented by a real selected state.
- Disable purchase actions when required variant or availability data is invalid.
- Show meaningful feedback after add-to-cart, remove and quantity changes.
- Do not treat a cart count increment as a functioning cart.

## Responsive behavior

Desktop may place product details and variant controls on opposite sides of the canvas. Tablet may use narrower panels or a bottom sheet. Mobile should use a compact bottom panel, drawer or product page layout that does not hide the model or make controls too small.

Do not force a desktop 12-column grid into a narrow viewport.

## Motion

Use animation for transitions that clarify context, not for every interaction. Respect prefers-reduced-motion and provide immediate state changes when motion is reduced.

## Showcase versus commerce

In showcase mode, label demo actions honestly and keep their behavior local. In commerce mode, route cart and checkout actions through the real backend contract. Do not claim that the front-end HUD validates stock, charges cards or creates orders unless those services exist and have been tested.
