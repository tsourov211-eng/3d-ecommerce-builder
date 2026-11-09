# Sneaker Showroom HUD Interface

The HUD is the shopping layer paired with the 3D floating-shelf scene. It must look premium while remaining legible, responsive and accessible.

## Overview state

Keep navigation lightweight:

- Brand mark / store name.
- Collection navigation.
- Search control if search exists.
- Shopping bag with derived item count.
- Minimal footer or interaction hint.

Do not fill the overview with large panels that hide the ten sneaker models.

## Focus state

When a sneaker is selected, reveal a product information panel and shopping controls. On a wide screen these may sit on opposite sides of the viewport, leaving the product as the central visual focus.

Product information may include:

- Product name and reference code.
- Short description / collection.
- Price and currency from catalog data.
- Product status when known.
- Available colors and sizes.

Shopping controls may include:

- Color variant selector.
- Size selector with labels.
- Quantity selector.
- Add to bag.
- Clear return-to-collection action.

Only show fields that exist in the actual catalog. Do not invent stock claims, shipping details, ratings or discounts.

## Interaction and state

- Keep selected product and variant synchronized with the 3D scene.
- Switching to another product must select a valid variant for that product.
- Cart quantity must be derived from cart line items.
- Cart lines must distinguish different sizes / color variants.
- Show a clear result after adding an item.
- Disable invalid or unavailable options only when trustworthy availability data exists.
- Keep focus and selected states visually distinguishable.

## Layering and pointer events

A full-screen overlay may use pointer-events: none so empty regions allow interaction with the canvas. Apply pointer-events: auto only to actual interactive panels and controls. Verify that invisible wrappers do not block canvas clicks or drags.

## Responsive composition

- Desktop: slim top bar, contextual side panels and central sneaker focus.
- Tablet: narrower information panel or a bottom drawer, with camera reframing.
- Mobile: compact bottom sheet / product panel, visible add-to-bag action and explicit previous / next controls when necessary.
- Avoid overlaying the product with full-screen opaque UI.
- Respect safe areas and dynamic mobile viewport height.

## Accessibility and motion

Use semantic headings, buttons, fieldsets and labels. Make all controls keyboard reachable. Give icon-only controls accessible names. Support Escape and reduced-motion preferences. Do not depend on hover-only product information.

## Showcase versus live store

In showcase mode, clearly treat cart actions as local demo state. In commerce mode, use the application's real cart and backend contracts; never confirm a real order or payment from a local HUD action.
