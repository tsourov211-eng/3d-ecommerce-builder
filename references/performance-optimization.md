# Performance Optimization

Performance must be measured on representative devices. A 60 FPS target is a useful aspiration for a smooth desktop experience, not a guarantee across every GPU, browser and mobile device.

## Measure first

Record:

- Initial route and JavaScript loading behavior.
- Model download size and decode time.
- GPU frame time or observed frame rate during overview and focus.
- Number of draw calls and visible meshes.
- Texture memory and render resolution.
- Long tasks, layout shifts and console errors.
- Mobile battery / thermal behavior during longer sessions.

Compare before and after optimizations.

## Rendering

- Use adaptive DPR or a performance monitor when useful.
- Reduce post-processing, shadow quality and model detail on weaker devices.
- Consider demand rendering only when the scene can become idle and animations explicitly invalidate frames when needed.
- Do not set frameloop to demand while continuous useFrame animations still require frames.
- Avoid unnecessary React state updates from the render loop.
- Use refs and delta-aware updates for transient animation.

## Scene complexity

- Reuse geometries and materials where safe.
- Use instancing for repeated meshes with compatible geometry/material.
- Cache loaded models and textures.
- Use LOD or simplified models for distant objects when appropriate.
- Avoid rendering all high-detail models when they are far outside the active view, if profiling shows a benefit.
- Reduce transparent layers and expensive material features.
- Keep shadow-casting lights and shadow maps intentional.

## Asset optimization

- Compress and resize textures for their actual display size.
- Use Draco, meshopt or KTX2 only with properly prepared assets and working decoders.
- Remove unused geometry, materials and animations.
- Create lower-detail assets for mobile where justified.
- Lazy-load detail models or non-visible products when it improves first interaction time.

## Performance profiles

Implement project-appropriate quality tiers:

- High: full approved asset detail and selected effects.
- Balanced: moderate DPR, fewer shadow updates and lighter post-processing.
- Low: simplified materials, minimal shadows / effects, reduced model detail or 2D fallback.

Allow the app to respond to observed frame-time changes. Device classification is only an initial hint.

## Battery and cleanup

Stop idle animations when possible. Clean up observers and event handlers. Do not dispose shared loader-cache resources while another product still uses them. Profile memory during repeated product selection and navigation.

## Reporting

State the devices and browsers tested, what was measured, and any remaining bottlenecks. Never write “60 FPS guaranteed” without reproducible measurement on the target hardware.
