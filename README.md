# Andrew Harrison's portfolio

Source repository: https://github.com/andrewharrisonGH/portfolio

Intended public address: https://andrew-harrison.dev

Astro generates static pages from Markdown. Cloudflare Workers serves the output,
with deployments connected to the GitHub repository. The domain and Worker were
confirmed working by the owner during setup.

Design: a minimal bioinformatics developer portfolio with a dark background,
clean typography, and restrained mint accents. The homepage includes a biography,
project tiles grouped by category, and personal interests. Protein Pirouettes has
a dedicated project page with the supplied abstract, reported benchmark results,
and an interactive rotational augmentation schematic.

## Editing the website

- `src/content/about.md`: introduction, full bio, and interests.
- `src/content/projects/*.md`: project metadata and detailed write-ups.
- `src/styles/global.css`: site-wide design and responsive layouts.
- `src/components/RotationDemo.astro`: interactive schematic.
- `src/lib/rotation.ts`: rotation maths and synthetic fragment geometry.

The thesis results come from the owner's conference abstract. The demo and SVG
illustration use synthetic geometry, not PDB coordinates or model predictions.
No research dependencies, uploads, or inference services run in the website.

## Validate and publish changes

```bash
npm test
npm run build
git add src public tests package.json package-lock.json README.md
git commit -m "Update portfolio content and design"
git push origin main
```

Cloudflare builds and deploys changes pushed to `main`. The dependency lockfile
is tracked. Review changes before committing and do not force-push over remote
history. If commits are already created, only the push is needed.

## WSL development

Install a Linux Node.js runtime in Ubuntu, rather than using npm from
`/mnt/c/Program Files/nodejs`. The project selects Node 24 via `.nvmrc`.
With nvm already installed:

```bash
nvm install
nvm use
node --version
command -v node npm npx
npm install
npm run build
npm run dev
```

All three executable paths should refer to the Linux installation. Open the local
address printed by Astro. Commit the generated `package-lock.json` so subsequent
local and Cloudflare installs use the same dependency versions. Use `npm ci` after
the lockfile has been committed.

## Editing projects

Each file in `src/content/projects/` provides both a landing-page entry and a
detail page at `/projects/<filename>/`. Entries are grouped by `category`, then
sorted by `order` and title. Markdown body content becomes the detail page.

Supported frontmatter:

```yaml
title: A project title
shortTitle: Optional shorter tile heading
subtitle: Optional subtitle
kind: Research project
description: A short description for the tile and page metadata.
category: Research
tags: [Python]
order: 2
draft: true
image:
  src: /images/projects/example.webp
  alt: A useful description of the image.
repository: https://github.com/andrewharrisonGH/example
demonstration: https://example.com/demo
```

`shortTitle`, `subtitle`, `image`, `repository`, `demonstration`, `demo`, and
`results` are optional. `results` accepts an array of `dataset`, `baseline`, and
`augmented` values for direct RMSE in kcal/mol. Store images in
`public/images/projects/` and videos in `public/videos/`. Regular Markdown supports
images and links; inline HTML can embed short video clips. Bespoke interactive
demonstrations use Astro components. Set `demo: rotation` for the rotation schematic.

Protein Pirouettes is included in production builds (`draft: false`).

Draft entries appear in `npm run dev`, but are excluded from production pages,
including direct detail-page routes. Set `draft: false` when ready to publish.
Draft Markdown is still visible in the public GitHub repository.

## Connect Cloudflare to GitHub

After the production build succeeds and the source and lockfile are in GitHub:

1. In Cloudflare, create a Worker by importing the `andrewharrisonGH/portfolio`
   GitHub repository. Authorize the Cloudflare GitHub application for this repo.
2. Use Worker name `portfolio` (matching `wrangler.jsonc`), root directory `/`,
   production branch `main`, build command `npm run build`, and deploy command
   `npx wrangler deploy`. Set build environment variable `NODE_VERSION` to `24`.
3. Verify the resulting workers.dev deployment before connecting the domain.
4. In the Worker's Settings > Domains & Routes, add the Custom Domain
   `andrew-harrison.dev`. Cloudflare manages the required DNS record and TLS.
   Inspect any existing records first. Email records do not need changing.
5. Verify HTTPS, project links, and the missing-page response on the public domain.

Subsequent pushes to `main` build and deploy automatically. Feature branches and
pull requests can be used to review design and content changes before merging.

Domain attachment is intentionally a dashboard step after a verified deployment;
`wrangler.jsonc` does not attach or change domains automatically.

## References

- https://docs.astro.build/en/guides/content-collections/
- https://developers.cloudflare.com/workers/framework-guides/web-apps/astro/
- https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/
- https://developers.cloudflare.com/workers/configuration/routing/custom-domains/

