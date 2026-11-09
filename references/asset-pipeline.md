# 3D Asset Pipeline

A robust asset pipeline is essential for real product catalogs. Treat model loading as asynchronous and failure-prone.

## Supported input

Prefer optimized GLB / GLTF assets. Keep product metadata and model URLs in a catalog or asset manifest rather than hard-coding paths inside scene components.

An asset manifest may record:

- Product ID and model URL.
- Preview image URL.
- Expected format and optional compression.
- Intended forward axis and unit scale.
- Optional framing center, scale multiplier or camera target.
- Asset revision or content hash for cache invalidation.

## Preflight validation

Before implementation:

1. Confirm each referenced model file exists at the expected path or remote URL.
2. Verify file size and loading headers where possible.
3. Open supplied assets in a viewer or inspect them with an available GLTF validator.
4. Confirm textures, materials, normals, animations and orientation.
5. Check that the model has usable bounds and no unexpected huge or invisible geometry.
6. Confirm licensing and usage rights for third-party models.

Never reference a placeholder path as though the asset exists. Never leave a bare useGLTF call with a missing file and no error boundary.

## Loading strategy

- Use the project's chosen loader approach, commonly Drei useGLTF.
- Show a useful loading indicator and progress when loading takes noticeable time.
- Catch failures at the product boundary so one bad model does not crash the full showroom.
- Keep an error fallback and allow retry where appropriate.
- Cache reusable assets; avoid downloading the same GLB repeatedly for every product instance.
- Clone scene graphs safely when the same model is rendered more than once.
- Do not mutate shared cached materials or geometry unintentionally.
- Dispose of resources only when they are owned by the component; avoid disposing shared cached assets still in use.

## Compression

- Use Draco only when model geometry is actually encoded with Draco and configure the decoder path/version correctly.
- Use KTX2 only when textures are encoded accordingly and configure the transcoder and renderer support correctly.
- Consider meshopt when the asset pipeline uses it.
- Keep a compatible fallback if the deployment environment cannot load the chosen decoder.
- Test production hosting paths, caching and CORS for remote assets.

Compression is a pipeline choice, not a switch that can be enabled without preparing the source files.

## Normalization

Normalize model origin, scale, orientation and framing once at the asset boundary:

- Compute or read model bounds.
- Center the model according to category rules.
- Apply a uniform scale to fit its presentation area; preserve proportions.
- Set a known forward direction.
- Keep the ground contact point consistent when required.
- Store model-specific overrides in metadata, not scattered component conditionals.

Drei Center and Resize can help, but verify the installed version and measure the result. Use custom Box3 fitting when the asset needs more control.

## Fallback hierarchy

1. Real optimized product model.
2. Simplified model or lower-detail LOD.
3. Category-appropriate procedural mesh.
4. Optimized product image in a normal HTML product card.
5. Clear unavailable-3D state while retaining product information and actions.

Never let a missing GLB remove product name, price, variant choices or accessible purchase controls.
