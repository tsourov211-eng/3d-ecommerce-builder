# Central Showroom Configuration

Create one typed configuration module and use it as the single source of truth for shared scene values. The numbers below reproduce the original sneaker preset; they are defaults to tune after measuring the supplied models and target viewport.

## Example configuration

~~~ts
export const SHOWROOM_CONFIG = {
  preset: 'sneaker',
  grid: {
    rows: 2,
    columns: 5,
    xSpacing: 2.65,
    ySpacing: 2.15,
    productDepth: 0,
  },
  camera: {
    overviewPosition: [0, 0.15, 9.2] as [number, number, number],
    overviewPointerX: 0.75,
    overviewPointerY: 0.45,
    focusOffset: [0, 0.18, 2.35] as [number, number, number],
    focusLookAtY: 0.05,
    positionSmoothTime: 0.35,
    lookAtSmoothTime: 0.32,
  },
  lighting: {
    background: '#08090c',
    fogNear: 11,
    fogFar: 24,
    bloomThreshold: 1.1,
    bloomIntensity: 0.85,
  },
  glow: {
    active: 4.2,
    hovered: 2.4,
    idle: 0.75,
  },
} as const
~~~

## Rules

- Keep this configuration in one module and import it where needed.
- Do not copy the same numeric values into camera, product, lighting and UI components.
- Validate that rows, columns and spacing are positive and that product positions are finite.
- Use category presets or per-project overrides rather than forcing every product type to use sneaker values.
- Prefer deriving grid positions from product count and configuration.
- Recalculate camera framing for viewport aspect ratio and actual model bounds.
- Avoid applying the exact same scale to models with very different proportions.
- Keep visual configuration separate from product catalog and trusted pricing data.

## Product grid position formula

For a centered grid with a configured column count:

- row = floor(index / columns)
- column = index modulo columns
- x = (column - (columns - 1) / 2) × xSpacing
- y = ((rows - 1) / 2 - row) × ySpacing

For incomplete final rows, decide whether to center the final row or preserve fixed columns; document the choice and test it visually.

## Responsive overrides

Desktop, tablet and mobile may use different columns, spacing, camera distance and number of simultaneously visible products. Derive or select these values from viewport breakpoints without causing layout shift or making the product impossible to inspect.

These scene units are not CSS pixels. Tune the camera based on model bounds, field of view and viewport aspect ratio.
