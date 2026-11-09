# SEO, Metadata and Product Content

A 3D canvas is not a replacement for indexable product content. Render important product information as semantic HTML and use the server-rendering capabilities of the existing Next.js application.

## Route and metadata

- Use stable, descriptive product URLs where individual product pages are in scope.
- Generate page title and description from trusted product data.
- Set canonical URLs when the site architecture requires them.
- Provide appropriate Open Graph and social preview images.
- Keep metadata generation in the appropriate server route or metadata API.
- Avoid making every product share the same generic title and description.

## Product content

Expose product names, descriptions, specifications, price and availability as actual HTML. Do not put essential text only inside the WebGL canvas or render it as a texture.

## Structured data

When product pages meet the requirements, add valid Product structured data using current schema.org and search-engine guidance. Include only factual fields supported by the catalog, such as name, image, description, brand, SKU, price, currency and availability.

- Keep JSON-LD values synchronized with the visible page.
- Escape / serialize JSON safely.
- Do not invent reviews, ratings, offers, stock or seller details.
- Validate structured data before release.

## Images and loading

Use the framework's image optimization conventions for product images where possible. Provide meaningful alt text for informative images and empty alt text for purely decorative images. Lazy-load non-critical gallery images without delaying the primary product content.

## Performance and crawling

Ensure essential product information is available without executing WebGL. Avoid blocking the first render on large model downloads. Use descriptive links and avoid client-only navigation for content that should be crawlable.
