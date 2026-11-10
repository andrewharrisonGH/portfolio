# Andrew Harrison's portfolio

Source repository: https://github.com/andrewharrisonGH/portfolio

Intended public address: https://andrew-harrison.dev

Astro generates static pages from Markdown. Cloudflare Workers serves the output.
This starter establishes content and deployment structure; visual design follows separately.

Design direction: a minimal bioinformatics developer portfolio with a dark background,
clean typography, and restrained accents.

## Current setup state

Dependencies are installed with Linux Node 24, and `npm run build` has passed.
The dependency lockfile is included. The production output contains the landing
page and 404 page; the thesis draft is excluded as intended.

The local Git repository uses branch `main` with `origin` pointing to
`https://github.com/andrewharrisonGH/portfolio.git`. These files were prepared
locally rather than cloned. No push has been verified: the setup session cannot
resolve github.com, so existing remote contents have not been inspected.
No Cloudflare resources or DNS records have been changed.

From a network-enabled Ubuntu terminal, publish the local branch with:

```bash
cd ~/portfolio
git push -u origin main
```

If GitHub rejects the push because the repository already has commits, fetch and
review that history before merging it. Do not force-push over existing history.

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

`image`, `repository`, and `demonstration` are optional. Store images in
`public/images/projects/` and videos in `public/videos/`. Regular Markdown supports
images and links; inline HTML can embed short video clips. Bespoke interactive
demonstrations can later use Astro components or MDX.

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
The first deployment will show the scaffold until the design and content are ready.

Domain attachment is intentionally a dashboard step after a verified deployment;
`wrangler.jsonc` does not attach or change domains automatically.

## References

- https://docs.astro.build/en/guides/content-collections/
- https://developers.cloudflare.com/workers/framework-guides/web-apps/astro/
- https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/
- https://developers.cloudflare.com/workers/configuration/routing/custom-domains/

