# burnworks-guidelines

Burnworks Inc. Web Development Guidelines

https://burnworks.com/docs/guidelines/

This document is licensed under a [Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0) License](https://creativecommons.org/licenses/by-nc/4.0/).

## Tech Stack

- [Astro](https://astro.build/) v5 — Static site generator
- [Tailwind CSS](https://tailwindcss.com/) v4 — Utility-first CSS
- [@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin) — Prose styles for Markdown content
- Content Collections — Markdown-based content management

## Development

### Requirements

- Node.js 22+
- npm 11+

### Setup

```bash
git clone https://github.com/burnworks/burnworks-guidelines.git
cd burnworks-guidelines
npm install
```

Before running locally or deploying, update the following fields in `astro.config.mjs` to match your environment:

```js
base: "/docs/guidelines", // Path prefix if hosted in a subdirectory (use "/" if at root)
```

### Local development

```bash
npm run dev
```

Open http://localhost:4321 in your browser.

### Build

```bash
npm run build
```

Output: `dist/`

### Preview build

```bash
npm run preview
```

## Deployment

### Netlify (recommended)

Connect the GitHub repository to Netlify. The `netlify.toml` configuration handles the build automatically.

### Vercel

Import the GitHub repository to Vercel. Astro is auto-detected.

## Content

Guidelines are managed as Markdown files in `src/content/guidelines/`. Each file has frontmatter for metadata (title, section ID, order, subsections) and Markdown body content.

To add or update content, edit the corresponding `.md` file.
