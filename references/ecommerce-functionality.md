# E-Commerce Functionality and Trust Boundaries

A visually convincing showroom is not automatically a functioning store. Scope the implementation into showcase, hybrid or commerce mode.

## Showcase mode

A showcase may support local product selection, demo variants and a demo cart count or drawer. Label demo behavior honestly. Do not create fake payment, inventory or order confirmation screens that imply a real transaction.

## Hybrid mode

A hybrid showroom may use real product data and images, but some actions may remain demos. State which catalog, variant, cart and checkout services are real and which are illustrative.

## Commerce mode

A real store requires trusted services for:

- Product and variant catalog.
- Currency, price and discount calculation.
- Inventory and purchase eligibility.
- Cart validation.
- Shipping, tax and delivery rules where applicable.
- Checkout session creation.
- Payment provider integration.
- Order creation and status.
- Authentication / authorization where required.
- Idempotency, rate limiting and abuse prevention.

The browser is not authoritative for price, stock, discount, tax or order status.

## Cart contract

Each cart line should identify the product and chosen variant and hold a quantity. A product with different sizes or colors should produce separate lines. The server must re-fetch the canonical product and variant before accepting checkout.

## Security and reliability

- Validate every submitted identifier and quantity server-side.
- Recalculate totals on the server.
- Never expose secret keys in client bundles.
- Do not trust a client-supplied price or availability value.
- Use idempotency for order or payment creation where supported.
- Handle expired products, changed prices and inventory races.
- Protect sensitive endpoints with the project's authentication and abuse controls.
- Return clear errors without exposing secrets or internal traces.

## Checkout

Do not invent a payment provider or ask the agent to create real charges without the user's choice and credentials. Use the existing provider integration when present. Otherwise, build a clearly labeled integration boundary or ask which provider should be used before implementing live payments.

## Completion claims

Only claim a real order was placed, payment completed or stock reserved after the actual backend/provider confirms success. A button click or local cart update is not proof of a completed transaction.
