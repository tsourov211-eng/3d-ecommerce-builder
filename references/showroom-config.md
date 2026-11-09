# Central Showroom Configuration

Create one typed configuration module and use it as the single source of truth for shared scene values. Presets are configuration variants, not separate hard-coded scene implementations.

## Preset identifiers

~~~ts
export type ShowroomPreset =
  | 'floating-shelf'
  | 'individual-pedestal'
  | 'minimal-gallery'
  | 'cinematic-hero'
~~~

## Floating-shelf sneaker preset

The values below are starting points for the reference-inspired 10-sneaker showroom. Tune them after measuring the supplied models, shelf geometry and target viewport.

~~~ts
export const FLOATING_SHELF_CONFIG = {
  preset: 'floating-shelf',
  grid: {
    rows: 2,
    columns: 5,
    xSpacing: 2.55,
    rowY: [1.45, -1.45] as [number, number],
    productZ: 0,
    shelfDepth: 1.7,
    shelfMarginX: 1.35,
    shelfThickness: 0.1,
  },
  camera: {
    overviewPosition: [0, 0.2, 13.2] as [number, number, number],
    overviewLookAt: [0, 0, 0] as [number, number, number],
    focusSmoothTime: 0.42,
    focusLookAtSmoothTime: 0.36,
    neighborContext: true,
  },
  lighting: {
    background: '#111016',
    shelfAccent: '#ff5a36',
    shelfGlowIdle: 0.35,
    shelfGlowHover: 1.2,
    shelfGlowActive: 2.8,
  },
} as const
~~~

These coordinates are scene units, not CSS pixels. The exact shelf width should be derived from the outer product positions plus configured margins. Ensure the full arrangement fits the camera frustum at the current aspect ratio.

## Original V2 sneaker defaults

The individual-pedestal preset retains the original V2 baseline:

- Grid: 2 rows × 5 columns.
- X spacing: 2.65.
- Y spacing: 2.15.
- Overview camera: [0, 0.15, 9.2].
- Overview pointer parallax: X 0.75, Y 0.45.
- Focus offset: [0, 0.18, 2.35].
- Camera position damping: 0.35 seconds.
- Look-at damping: 0.32 seconds.
- Glow intensity: active 4.2, hovered 2.4, idle 0.75.

Do not apply these pedestal values to the floating-shelf preset.

## Shared configuration rules

- Keep configuration in one module and import it where needed.
- Do not copy the same numeric values into camera, product, lighting and UI components.
- Validate that rows, columns and spacing are positive and all positions are finite.
- Derive layout from product count and preset configuration.
- Recalculate camera framing for viewport aspect ratio and actual model bounds.
- Keep visual configuration separate from catalog and trusted pricing data.
- Allow brand colors and user-supplied art direction to override decorative defaults.

## Floating-shelf layout formula

For a centered row with configured column count:

- column = index modulo columns
- x = (column - (columns - 1) / 2) × xSpacing
- row = floor(index / columns)
- y = rowY[row]

For a partial final row, center the populated products unless the brief requires fixed column alignment. Compute shelf length from the first and last product anchors plus shelf margins.

## Responsive overrides

Desktop may use two shelves and five products per row. Tablet should reduce spacing or visible columns when necessary. Mobile should use a horizontal product rail, one focused product or a compact carousel rather than attempting to squeeze all ten models into the viewport.

Keep shelf dimensions, product positions and camera framing derived from the same configuration so they cannot drift apart.
