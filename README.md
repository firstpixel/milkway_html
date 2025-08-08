# Milky Way Solar System — Vanilla JS/WebGL

A single-file WebGL demo that renders a small, interactive solar system. It uses textured spheres for the Sun and planets, a moon orbiting Earth, Saturn’s rings, a star field, simple lighting, and an auto-fit camera for a good initial view.

## What you’ll see

- Sun and 8 planets with textures (local images with graceful fallback colors)
- Earth’s Moon (simple circular orbit)
- Saturn’s ring mesh with translucency
- Star field (thousands of point sprites that scale by distance)
- Subtle Sun glow (billboarded quad)
- Simple Lambert lighting for planets, unlit for Sun
- Auto-fit camera that starts with all planets in view

## Controls

- Mouse: Left-drag to orbit the camera around the Sun; Scroll to zoom
- Keyboard: R to reset the view (auto-fit)
- HUD UI:
  - Time scale slider (seconds per Earth year)
  - Pause toggle
  - Debug orbits toggle (wireframe orbit lines)

## Run locally

You can usually open `index.html` directly in your browser. If your browser blocks textures from the file system, serve the folder with a simple static server.

Optional static servers (pick one):

```bash
# Python 3 (built-in)
python3 -m http.server 5500

# Node (npx)
npx serve -l 5500
```

Then open: [http://localhost:5500/](http://localhost:5500/)

## Project layout

- `index.html` — All rendering, shaders, input, UI, and scene logic (single-file app)
- `images/` — Texture files (sun, planets, moon)
- `download_textures.js` / `scripts.sh` — Helpers to fetch textures (optional)

## How it works (quick technical tour)

- Minimal math: small mat4/vec utilities for transforms, perspective, and lookAt
- Shaders:
  - Textured + lit planets (`vsCommon` + `fsTexturedLit`)
  - Unlit textured Sun (`fsUnlit`) plus a soft glow billboard
  - Rings shader with alpha falloff and lighting
  - Stars as GL points with a radial fade fragment shader
- Geometry:
  - Parametric sphere (shared by Sun/planets/moon)
  - Flat ring mesh for Saturn
  - Orbit lines (optional) as line strips
- Camera:
  - Spherical orbit camera centered on the Sun (panning disabled)
  - Auto-fit on load/resize via a system bounding radius and the current FOV
  - Current FOV is 60°, near/far set to 0.1/10000
- Scales (artistic, not to real scale):
  - `PLANET_SCALE = 8` (visual size multiplier; Earth ≈ 8 units)
  - `AU = 15` (visual orbit radii scale)
  - Orbit radii are compressed: `scaledOrbit(au) = sqrt(au) * AU`
  - Sun visual radius = `1.7` (smaller to keep the initial frame readable)

## Tips & troubleshooting

- Press R anytime to auto-fit the system into view
- If you see colored spheres instead of textures, the image couldn’t be loaded
  - Ensure files exist under `images/` (see texture names inside `index.html`)
  - Serving via a local server avoids file:// restrictions
- Black screen or console errors: check WebGL support and shader compile logs
- Resize the window: the canvas auto-resizes; if you haven’t moved the camera,
  it will re-fit to keep everything visible

## Notes

The scene is intentionally not to physical scale; sizes and distances are tuned
  for clarity so that all major bodies are visible together on screen.
