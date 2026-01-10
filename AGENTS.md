# AGENTS.md

This codebase is a Docusaurus-based documentation site built with TypeScript and React.

## Build, Lint, and Test Commands

```bash
# Start development server with hot reload
npm run start

# Build for production (includes diagram generation)
npm run build

# Generate diagrams only
npm run diagrams

# Type check TypeScript files
npm run typecheck

# Serve production build locally
npm run serve

# Clear Docusaurus cache
npm run clear

# Write translations for i18n
npm run write-translations

# Generate heading IDs for markdown
npm run write-heading-ids
```

## Code Style Guidelines

### TypeScript

- Use TypeScript for all new components and utilities
- Prefer explicit types over inference for function parameters and return types
- Use `interface` for object shapes and `type` for unions, intersections, or primitives
- Avoid `any`; use `unknown` when type is truly unknown
- Use optional properties (`?`) sparingly; prefer explicit `undefined` or `null` types

### React Components

- Use functional components with hooks (no class components)
- Prefix component files with uppercase (`RepositoryCard/index.tsx`)
- Use named exports for components
- Co-locate styles with components in `*.module.css` files
- Use `import { useState, useEffect } from 'react'` (individual imports)

### Imports and Module Organization

```typescript
// 1. React imports
import React from 'react'
import { useState, useEffect } from 'react'

// 2. Docusaurus imports
import { useHistory, useLocation } from '@docusaurus/router'

// 3. Third-party library imports
import clsx from 'clsx'
import { highlight } from 'prism-react-renderer'

// 4. Absolute imports from src/ or components/
import RepositoryCard from '@site/src/components/RepositoryCard'

// 5. Relative imports
import styles from './index.module.css'
```

- Use absolute imports for project code (`@site/...` or `@site/src/...`)
- Use relative imports for sibling/adjacent files (`.`, `..`)
- Group imports by category with blank lines between groups

### Naming Conventions

- **Components**: PascalCase (`RepositoryCard`, `Sidebar`)
- **Files**: kebab-case for non-components, PascalCase for components (`my-utils.ts`, `RepositoryCard.tsx`)
- **CSS Modules**: kebab-case (`styles.module.css`)
- **Constants**: SCREAMING_SNAKE_CASE
- **Variables/functions**: camelCase
- **Props interfaces**: `<ComponentName>Props` suffix

### Error Handling

- Use try/catch for async operations
- Provide meaningful error messages
- Let errors propagate to Docusaurus error boundaries where appropriate
- Use `console.error` sparingly; prefer throwing with context

### Formatting

- Use 2 spaces for indentation
- Use single quotes for strings
- Use semicolons
- No trailing commas in multi-line objects/arrays
- Maximum line length: 100 characters
- Format on save with Prettier (Docusaurus includes it)

### CSS Modules

```css
/* index.module.css */
.container {
  /* properties */
}

.containerTitle {
  composes: container;
  font-weight: 600;
}
```

- Use CSS Modules for component-scoped styles
- Prefix state classes: `.isOpen`, `.hasError`
- Use BEM-like naming: `.card__title--large`

### Git Workflow

- Commit messages: imperative mood, max 72 chars for subject
- Branch naming: `feature/...`, `docs/...`, `fix/...`
- Use conventional commits when possible

### Docusaurus-Specific

- Use MDX for documentation pages with embedded React
- Frontmatter for page metadata (title, sidebar_position, etc.)
- Use `swizzle` for customizing theme components
- Place custom components in `src/components/`
- Place documentation in `docs/` directory
- Place blog posts in `blog/` directory (if enabled)

### Diagrams

Diagrams are pre-rendered to SVG at build time for reliable GitHub Pages rendering.

- Source files: `diagrams/mermaid/*.mmd`
- Output: `static/img/diagrams/*.svg`
- Embed in markdown: `![Diagram](/img/diagrams/diagram-name.svg)`

**Workflow**:
1. Create/edit `.mmd` files in `diagrams/mermaid/`
2. Run `npm run diagrams` to generate SVGs
3. Reference SVGs in markdown: `![Alt text](/img/diagrams/name.svg)`
4. `npm run build` automatically runs diagram generation
