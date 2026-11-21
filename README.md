# Mike Cho — Interactive Software Engineering Portfolio

A recruiter-friendly portfolio with an optional, lazily loaded 3D experience in the Meridian Foundry.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Create a production build with `npm run build`; run ESLint with `npm run lint`.

## Update portfolio content

Portfolio copy and case-study details live in `src/content/portfolio.ts`. Keep claims, impact figures, and technologies grounded in verified resume or project information. Add verified social/contact URLs there; until then the interface explicitly marks those details as unavailable.

Replace `public/resume.pdf` to update the downloadable resume. Do not add a project or profile link until it has been confirmed.

## Structure

- `src/app/` — App Router page, metadata, and global styles.
- `src/components/portfolio/` — recruiter-first landing experience and navigation.
- `src/components/game/` — lazy-loaded 3D overlay, panels, and mobile input.
- `src/game/scene/` — Foundry environment, areas, interaction range, and camera follow.
- `src/game/player/` — physics-backed movement and procedural idle/walk animation.
- `src/game/state/` — shared interaction state.
- `src/content/` — typed, data-driven portfolio details.
- `public/` — downloadable resume and static assets.

The Quick View is rendered as normal page content and does not require WebGL. Select **Start exploring** to load the R3F/Rapier scene. In the world, use WASD or arrow keys to move, drag to orbit the camera, and press E near an area to interact. Touch devices get on-screen movement controls.
