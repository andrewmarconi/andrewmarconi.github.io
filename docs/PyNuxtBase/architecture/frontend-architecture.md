---
sidebar_position: 3.3
---

# Frontend Architecture

The frontend is built with **Nuxt 4**, providing both server-side rendering (SSR) and client-side navigation.

## Directory Structure

```
src/frontend/app/
├── assets/           # Global styles (Tailwind CSS 4 config)
├── components/       # Vue components
│   └── ui/          # Design system components
├── composables/     # Composition API functions (auto-imported)
│   └── api/        # API client functions
├── constants/       # App constants (API endpoints, config)
├── layouts/         # Nuxt layouts
├── middleware/      # Route middleware
├── pages/           # File-based routing
├── store/           # Pinia stores
└── types/           # TypeScript types
```

## Key Concepts

### Auto-Imports

Nuxt 4 auto-imports:
- Vue APIs (`ref`, `computed`, `onMounted`, etc.)
- Composables from `composables/`
- Components from `components/`

**No manual imports needed!**

### API Integration

All API calls use composables from `composables/api/`:

```typescript
// In a component
const { login } = useAuth()
const { fetchUsers } = useUsers()

// Automatically includes auth tokens
await login({ username, password })
const users = await fetchUsers()
```

### State Management

Pinia stores handle global state:

```typescript
// app/store/auth.ts
export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    accessToken: null,
  }),
  actions: {
    async login(credentials) {
      // Login logic
    }
  }
})
```
