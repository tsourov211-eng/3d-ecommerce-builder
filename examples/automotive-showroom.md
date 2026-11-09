# Example: Automotive Showroom

## Goal

Create a large-format vehicle showroom focused on exterior inspection and supported trim / paint configurations.

## Visual direction

- A single hero vehicle or a small number of spacious display bays.
- Accurate reflections and clear body-panel silhouettes.
- Controlled orbit limits and camera collision awareness.
- Optional interior / exterior inspection modes when assets support them.

## Interactions

- Select a vehicle and focus the camera.
- Orbit within safe boundaries.
- Change paint, trim or wheel options only when corresponding variants are available.
- Display actual specifications and availability from trusted product data.
- Keep navigation and product information available outside the WebGL scene.

## Performance and fallback

Use optimized GLB files, appropriate LODs and mobile-specific quality. Offer a 2D gallery when 3D is unavailable. Test loading, model scale, camera clipping and graphics performance on target devices.
