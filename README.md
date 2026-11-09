# 3D E-Commerce Builder

A reusable agent skill for planning and building polished, responsive 3D product showrooms and e-commerce storefronts with Next.js, React Three Fiber, Three.js, Drei and a carefully separated 2D interface.

The skill keeps the original dark studio / glowing pedestal sneaker-showroom concept as one preset, while allowing the agent to adapt the experience to watches, furniture, automotive products and other catalogs.

## What it helps build

- Interactive 3D product galleries with camera focus and clear navigation.
- Category-aware presentation, lighting, product framing and model fallbacks.
- GLB / GLTF asset loading, validation, progress and failure handling.
- Responsive desktop, tablet and touch-first mobile experiences.
- Accessible HTML product controls and a non-WebGL fallback.
- Optional real commerce features: variants, cart, inventory, checkout and order flow.
- Performance, SEO, testing and production-readiness checks.

## Skill structure

~~~text
3d-ecommerce-builder/
├── SKILL.md
├── README.md
├── references/
│   ├── architecture.md
│   ├── dependency-compatibility.md
│   ├── store-blueprint.md
│   ├── showroom-config.md
│   ├── camera-rig.md
│   ├── pedestal-and-grid.md
│   ├── asset-pipeline.md
│   ├── lighting-and-bloom.md
│   ├── hud-overlay.md
│   ├── responsive-experience.md
│   ├── performance-optimization.md
│   ├── ecommerce-functionality.md
│   ├── accessibility.md
│   ├── seo-optimization.md
│   ├── testing-and-validation.md
│   ├── design-presets.md
│   └── troubleshooting.md
├── examples/
│   ├── sneaker-showroom.md
│   ├── watch-showroom.md
│   ├── furniture-showroom.md
│   └── automotive-showroom.md
├── scripts/
│   └── validate-skill.mjs
└── .github/
    └── workflows/
        └── validate-skill.yml
~~~

## Install in Google Antigravity

### Workspace installation (recommended)

Copy the complete skill folder into the target project's:

~~~text
your-project/.agent/skills/3d-ecommerce-builder/
~~~

Confirm that the main file is at:

~~~text
your-project/.agent/skills/3d-ecommerce-builder/SKILL.md
~~~

### Global installation

Copy the complete folder into:

~~~text
~/.gemini/antigravity/skills/3d-ecommerce-builder/
~~~

Keep the full folder. Do not copy only SKILL.md because the main instructions link to the reference files.

## Example prompts

**Sneaker showcase**

> Use the 3d-ecommerce-builder skill to create a premium sneaker showroom. Start with the 2x5 product gallery preset, dark studio lighting, orange emissive pedestal strips, smooth camera focus, and a responsive product HUD. Use real GLB assets when supplied and a procedural fallback otherwise.

**Watch store**

> Use the 3d-ecommerce-builder skill to build a luxury watch showroom. Choose a product presentation suitable for detailed watch inspection, with material variants, close-up camera controls, accessible product details and a real cart only if commerce functionality is in scope.

**Existing project**

> Inspect this project first, then use the 3d-ecommerce-builder skill to add a 3D product showroom. Preserve its current framework, package manager, design system, routes and working features. Explain the implementation plan before changing files.

## Operating modes

- **Showcase mode:** a visual product experience with demo interactions. Do not present demo cart state as real checkout or confirmed inventory.
- **Commerce mode:** a real catalog and cart integrated with the project's trusted backend, inventory and payment provider.
- **Hybrid mode:** a 3D showcase connected to selected real catalog and cart capabilities.

The agent must confirm scope from the user's request and must not silently invent backend services, credentials, payment flows or stock status.

## Validate the skill package

This repository contains a dependency-free link and frontmatter validator:

~~~bash
node scripts/validate-skill.mjs
~~~

A GitHub Actions workflow runs the validator for pushes and pull requests.

## Documentation

Start with [SKILL.md](SKILL.md). The architecture, compatibility, assets, performance, accessibility, commerce and validation rules are documented in the [references](references/architecture.md) directory. Category examples are in [examples](examples/sneaker-showroom.md).

## Design principle

The skill defines reliable engineering constraints, not one mandatory visual design. The product category, supplied assets, user's brand, target devices and requested commerce scope determine the final showroom.
