# Floating-Shelf Sneaker Showroom Layout

This guide defines the main geometry and composition for the reference-inspired sneaker showroom. It is a dedicated preset, not a replacement for the individual-pedestal gallery.

## Desktop composition

- Use a dark studio environment with a muted charcoal / purple tone.
- Arrange ten sneakers in two horizontal rows, five per row.
- Place each row on one continuous floating shelf.
- Use transparent or smoked acrylic for the shelf surface, with a slim metallic underside or support.
- Give each sneaker enough separation to read as an individual product.
- Keep shelf edges, supports and background geometry visually quiet.
- Use product-specific selection targets, even though the shelf is shared by the row.
- The active product should be the strongest focal point without making the other products disappear completely.

The scene should feel like a premium exhibition space rather than ten unrelated miniature podiums.

## Positioning and dimensions

Use the central showroom configuration. Do not duplicate spacing and dimensions in the gallery components.

For each row, derive the sneaker X position from the configured column count and spacing. Derive the continuous shelf width from the first and last product anchors plus left and right margins. Keep the shelf depth and sneaker Z offset in the same configuration.

Measure each sneaker model's bounding box. Align it to a consistent display baseline and adjust the model's local presentation transform without distorting proportions.

Do not assume that every GLB origin is at the sole. Model metadata may include a normalized ground offset, scale factor and yaw correction.

## Shelf construction

A shelf may use layered geometry:

1. Thin acrylic / smoked-glass top surface.
2. Dark metal or translucent underside.
3. Narrow emissive front or side edge.
4. Minimal supports, brackets or suspended elements.
5. Soft shadow beneath the shelf.

Keep transparent surfaces simple. Transparent glass can create sorting, depth-write and reflection artifacts; inspect from front, side and focus angles. If a realistic glass material causes instability, use a carefully tuned translucent material or a mostly opaque smoked surface instead of adding more effects.

Avoid expensive real-time reflections unless profiling proves they are affordable.

## Camera and perspective

Frame both shelves with enough vertical margin for the navigation and footer. Avoid a perfectly flat orthographic catalog unless the reference or brand requires it; a subtle perspective helps communicate depth.

The default ten-product desktop layout should be tested at the target wide viewport. At smaller widths, reduce the number of visible columns or transition to a horizontal product rail / focused-product experience.

## Empty and partial catalogs

The layout must work with zero products, fewer than ten products and incomplete final rows. Do not render empty product labels or broken shelf anchors. Center the final partial row unless the catalog design explicitly calls for left alignment.

## Visual hierarchy

Product silhouette and material should remain more prominent than shelf hardware. Avoid text labels, floating decorations or background elements that compete with the footwear.

## Acceptance criteria

- Two clear continuous shelves on the desktop preset.
- Five product anchors per row when ten products are available.
- Consistent baseline and spacing.
- No visible model / shelf intersections.
- Camera can frame the complete layout.
- Selection and focus targets map to the correct product IDs.
- Layout gracefully adapts to fewer products and smaller viewports.
