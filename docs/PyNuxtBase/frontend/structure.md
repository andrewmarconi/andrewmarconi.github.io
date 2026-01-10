---
sidebar_position: 4.2
---

# Project Structure

```
src/frontend/
├── app/
│   ├── assets/          # Global styles (main.css)
│   ├── components/      # Vue components
│   │   └── ui/         # Design system components
│   ├── composables/    # Composition API functions
│   │   └── api/       # API client composables
│   ├── constants/      # App constants
│   ├── layouts/        # Nuxt layouts
│   ├── middleware/     # Route middleware
│   ├── pages/          # File-based routing
│   ├── store/          # Pinia stores
│   └── types/          # TypeScript types
├── public/             # Static assets
├── nuxt.config.ts      # Nuxt configuration
├── package.json
└── tsconfig.json
```
