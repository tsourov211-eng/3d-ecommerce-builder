# Dependency and Version Compatibility

Do not blindly install latest packages into an existing project. Inspect its manifest, lockfile, runtime version and current peer dependencies first.

## React Three Fiber major pairing

The currently documented compatibility guidance is:

| React major | React Three Fiber major |
|---|---|
| React 18 | Fiber 8 |
| React 19 | Fiber 9 |

Fiber v10 has been documented as alpha / preview; do not select it for a production project unless the user explicitly requests an experimental stack and accepts the risk. Recheck the official compatibility guidance when upgrading.

## Pre-flight checks

1. Inspect package.json and the package manager lockfile.
2. Identify the installed React, React DOM, Next.js, Three.js and Fiber versions.
3. Inspect peer dependency ranges for Drei, postprocessing and other R3F packages.
4. Preserve the existing dependency manager: pnpm, npm, yarn or Bun.
5. Avoid mixing lockfiles or regenerating a lockfile without a reason.
6. Add only packages that are missing and needed by the implementation.
7. Run the package manager's install and validation commands after changes.

## Typical capability groups

Install only the groups needed by the project:

- Core 3D: three, @types/three when required, @react-three/fiber.
- Helpers: @react-three/drei.
- Post-processing: @react-three/postprocessing and any peer package required by its selected version.
- State: zustand, unless the project already uses a suitable store.
- Animation: framer-motion or the existing motion library.
- UI utilities: lucide-react, clsx, tailwind-merge only when they fit the existing stack.
- Asset processing: command-line GLB optimization tools may be part of the asset workflow, not necessarily runtime dependencies.

Do not install every package above automatically.

## Installation rule

If the project uses pnpm, use pnpm. If it uses npm, use npm. If it uses yarn or Bun, respect that choice. If no project exists yet, ask or choose the package manager requested by the user; pnpm is a reasonable default only when no preference or repository convention exists.

Do not hardcode a package version from an old tutorial. Resolve compatible versions from current package metadata and official documentation, then keep the lockfile consistent.

## Upgrade safety

For a major version change:

- Explain why the upgrade is required.
- Review breaking changes and peer requirements.
- Make the upgrade in a focused change.
- Run type-check, lint, build and tests.
- Do not combine an unrelated framework upgrade with showroom implementation without explicit need.
