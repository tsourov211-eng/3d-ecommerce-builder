# Testing and Validation

Do not finish after the first successful render. Verify the existing project and the actual user journey.

## Automated checks

Run scripts that exist in the repository. Common checks include:

~~~bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
~~~

These are examples for a pnpm project only. Use the project's package manager and actual script names. Do not invent scripts that are absent.

## Unit and component tests

Cover:

- Product position generation and layout math.
- Shelf length and product alignment derived from shared configuration.
- Product selection and selection reset.
- Variant validation.
- Cart line merging and quantity updates.
- Price formatting and total derivation.
- Missing / invalid asset metadata.
- Fallback states and error handling.

## Browser / end-to-end tests

Verify:

1. The route loads without console or hydration errors.
2. The scene reaches its ready state.
3. A product can be selected and focused.
4. The camera transitions smoothly and returns to overview.
5. Keyboard Escape and visible back controls work.
6. Variant selection is visible and valid.
7. Cart actions produce the expected line items.
8. Unavailable or invalid products cannot be purchased in commerce mode.
9. Touch controls work without hover.
10. The app remains usable when a model fails or WebGL is unavailable.

## Floating-shelf sneaker acceptance

When this preset is selected, additionally verify:

- Desktop shows two continuous shelves with five sneaker positions per row when ten products are supplied.
- Shelf length and product anchors align; no sneaker floats visibly above or intersects the shelf.
- Shelf transparency, edge lighting and reflections remain legible from overview and focus angles.
- Selecting any sneaker focuses the correct model and highlights its shelf / product location.
- Neighboring products remain partially visible in focus mode where viewport geometry allows.
- Back-to-collection and Escape restore the full gallery.
- A long product name, missing GLB or incomplete catalog does not break layout.
- Tablet and mobile use an intentional alternate composition rather than a squeezed desktop grid.

## Responsive tests

Test a wide desktop, tablet-sized viewport, narrow phone portrait and phone landscape. Check product clipping, text overflow, horizontal scrolling, touch targets and panel overlap.

## Asset checks

Confirm model files exist, load from production asset paths, use the intended decoder configuration and do not generate 404 / CORS errors. Test at least one failure path.

## Production review

- Inspect browser console and network failures.
- Check WebGL context-loss behavior if relevant.
- Check accessible controls and reduced-motion behavior.
- Measure representative performance rather than guessing.
- Confirm SEO metadata and structured data where included.
- Verify no credentials or private API keys appear in client code.
- Review the final diff for unrelated changes.

## Final report

Summarize what was built, commands that passed, interactions tested, target devices checked and any limitations. Clearly identify checks that could not be run. Never report a test as passing unless it actually ran successfully.
