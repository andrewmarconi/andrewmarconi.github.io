# Andrew Marconi on GitHub

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Installation

```bash
npm install
```

## Local Development

```bash
npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

If port 3000 is already in use, you can specify a different port:

```bash
npm start -- --port 3001
```

## Build

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

### Automatic Deployment (Recommended)

The site is automatically deployed to GitHub Pages when you push to the `main` branch. The GitHub Actions workflow (`.github/workflows/deploy.yml`) handles:

1. Building the Docusaurus site
2. Deploying to the `gh-pages` branch
3. Publishing to https://andrewmarconi.github.io

Just commit and push your changes:

```bash
git add .
git commit -m "Update content"
git push origin main
```

The site will be live within a few minutes.

**First-time setup:** Ensure GitHub Pages is configured in your repository settings:
1. Go to repository Settings → Pages
2. Set Source to "Deploy from a branch"
3. Select branch: `gh-pages` and folder: `/ (root)`
4. Save

### Manual Deployment

You can also deploy manually using the Docusaurus CLI:

```bash
GIT_USER=andrewmarconi npm run deploy
```

This command builds the website and pushes it to the `gh-pages` branch.

## Project Structure

- `docs/` - Documentation pages
- `src/` - Custom React components and pages
- `static/` - Static assets (images, fonts, etc.)
- `docusaurus.config.ts` - Site configuration
- `sidebars.ts` - Documentation sidebar configuration
