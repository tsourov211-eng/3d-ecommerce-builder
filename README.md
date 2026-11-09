# Antigravity IDE Skill: `3d-ecommerce-builder`

This package contains the complete multi-file agent skill for **Google Antigravity IDE** to build interactive 3D e-commerce showcases (2x5 WebGL product grid, glowing selective-bloom pedestals, `maath` smooth camera focus rigging, and a synchronized 2D HUD).

## Folder Structure

```text
3d-ecommerce-builder/
├── SKILL.md
├── README.md
└── references/
    ├── store-blueprint.md
    ├── camera-rig.md
    ├── pedestal-and-grid.md
    ├── lighting-and-bloom.md
    └── hud-overlay.md
```

## How to Install in Antigravity IDE

1. **Workspace-level installation (Recommended):**
   Extract the `3d-ecommerce-builder` folder into your project's `.agent/skills/` directory:
   ```text
   your-project/.agent/skills/3d-ecommerce-builder/SKILL.md
   ```
2. **Global installation (All projects):**
   Extract `3d-ecommerce-builder` into `~/.gemini/antigravity/skills/3d-ecommerce-builder/`.

## Example Trigger Prompt in Antigravity

> "Use the `3d-ecommerce-builder` skill to build a full Next.js 3D sneaker e-commerce showcase with a 2x5 interactive product grid, glowing orange neon pedestals, smooth camera zoom on click, and a synchronized 2D size selector HUD."
