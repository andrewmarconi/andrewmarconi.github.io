---
sidebar_position: 4
---

# Frontend Development

Complete guide to frontend development with Nuxt 4, Vue 3, and TypeScript in PyNuxtBase.

## Development Commands

```bash
cd src/frontend

# Install dependencies
npm install

# Start dev server (hot-reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type check
npm run typecheck

# Lint code
npm run lint
npm run lint:fix
```

## Project Structure

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

## File-Based Routing

Nuxt uses file-based routing. Files in `app/pages/` automatically become routes:

```
app/pages/
├── index.vue          → /
├── about.vue          → /about
├── users/
│   ├── index.vue      → /users
│   ├── [id].vue       → /users/:id (dynamic)
│   └── create.vue     → /users/create
└── [...slug].vue      → /* (catch-all)
```

### Dynamic Routes

```vue
<!-- app/pages/users/[id].vue -->
<script setup lang="ts">
const route = useRoute()
const userId = route.params.id

const { data: user } = await useFetch(`/api/users/${userId}`)
</script>

<template>
  <div>
    <h1>User: {{ user.username }}</h1>
  </div>
</template>
```

## Auto-Imports

Nuxt 4 auto-imports these without explicit `import` statements:

### Vue APIs
```typescript
// All automatically available:
ref, reactive, computed, watch, onMounted, onUnmounted,
nextTick, defineProps, defineEmits, etc.
```

### Composables

All files in `app/composables/` are auto-imported:

```typescript
// app/composables/useCounter.ts
export const useCounter = () => {
  const count = ref(0)
  const increment = () => count.value++
  return { count, increment }
}

// Use anywhere without import
const { count, increment } = useCounter()
```

### Components

Components in `app/components/` are auto-imported:

```vue
<!-- No import needed! -->
<template>
  <UiButton @click="handleClick">
    Click me
  </UiButton>
</template>
```

## Design System

### UI Components

Located in `app/components/ui/`:

#### Button

```vue
<template>
  <UiButton variant="primary" size="lg" @click="handleClick">
    Primary Button
  </UiButton>

  <UiButton variant="secondary">
    Secondary
  </UiButton>

  <UiButton variant="outline" disabled>
    Disabled
  </UiButton>

  <UiButton variant="danger" loading>
    Loading...
  </UiButton>
</template>
```

Props:
- `variant`: `primary` | `secondary` | `outline` | `ghost` | `danger`
- `size`: `sm` | `md` | `lg`
- `disabled`: boolean
- `loading`: boolean

#### Input

```vue
<template>
  <UiInput
    v-model="email"
    type="email"
    label="Email Address"
    placeholder="you@example.com"
    :error="emailError"
  />
</template>

<script setup lang="ts">
const email = ref('')
const emailError = ref('')

watch(email, (value) => {
  emailError.value = value.includes('@') ? '' : 'Invalid email'
})
</script>
```

#### Modal

```vue
<template>
  <UiButton @click="isOpen = true">
    Open Modal
  </UiButton>

  <UiModal v-model="isOpen" title="Confirm Action">
    <p>Are you sure you want to proceed?</p>

    <template #footer>
      <UiButton variant="outline" @click="isOpen = false">
        Cancel
      </UiButton>
      <UiButton variant="primary" @click="handleConfirm">
        Confirm
      </UiButton>
    </template>
  </UiModal>
</template>

<script setup lang="ts">
const isOpen = ref(false)

const handleConfirm = () => {
  // Do something
  isOpen.value = false
}
</script>
```

#### Toast Notifications

```vue
<script setup lang="ts">
const { showToast } = useNotifications()

const handleSuccess = () => {
  showToast({
    type: 'success',
    message: 'User created successfully!',
    duration: 3000
  })
}

const handleError = () => {
  showToast({
    type: 'error',
    message: 'Failed to create user',
    duration: 5000
  })
}
</script>
```

## API Integration

### Using API Composables

All API calls use composables from `app/composables/api/`:

```vue
<script setup lang="ts">
import { useAuth } from '~/composables/api/useAuth'
import { useUsers } from '~/composables/api/useUsers'

const { login, logout } = useAuth()
const { fetchUsers, createUser } = useUsers()

// Login
await login({
  username: 'john',
  password: 'secret'
})

// Fetch users
const users = await fetchUsers()

// Create user
await createUser({
  username: 'jane',
  email: 'jane@example.com'
})
</script>
```

### Creating API Composables

```typescript
// app/composables/api/usePosts.ts
import { apiClient } from './base'

export const usePosts = () => {
  const fetchPosts = async () => {
    return await apiClient.get('/posts')
  }

  const createPost = async (data: CreatePostRequest) => {
    return await apiClient.post('/posts', data)
  }

  return {
    fetchPosts,
    createPost
  }
}
```

### Authentication

Auth tokens are automatically included in requests:

```typescript
// app/composables/api/base.ts
const apiClient = {
  async get(url: string) {
    const authStore = useAuthStore()
    return await $fetch(url, {
      baseURL: '/api',
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`
      }
    })
  }
}
```

## State Management (Pinia)

### Creating a Store

```typescript
// app/store/posts.ts
import { defineStore } from 'pinia'

export const usePostsStore = defineStore('posts', {
  state: () => ({
    posts: [] as Post[],
    loading: false,
    error: null as string | null
  }),

  getters: {
    publishedPosts: (state) => {
      return state.posts.filter(p => p.published)
    }
  },

  actions: {
    async fetchPosts() {
      this.loading = true
      try {
        this.posts = await usePosts().fetchPosts()
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    }
  }
})
```

### Using a Store

```vue
<script setup lang="ts">
const postsStore = usePostsStore()

onMounted(() => {
  postsStore.fetchPosts()
})
</script>

<template>
  <div v-if="postsStore.loading">
    <UiLoading />
  </div>

  <div v-else>
    <div v-for="post in postsStore.publishedPosts" :key="post.id">
      {{ post.title }}
    </div>
  </div>
</template>
```

## Tailwind CSS 4

Tailwind CSS 4 uses **CSS-only configuration** in `app/assets/main.css`:

```css
@import "tailwindcss";

@theme {
  --color-primary: oklch(65% 0.25 270);
  --color-success: oklch(70% 0.20 145);
  --color-error: oklch(60% 0.25 25);

  --font-sans: 'Inter', system-ui, sans-serif;

  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
}
```

### Usage

```vue
<template>
  <div class="bg-primary text-white p-md rounded-lg shadow-lg">
    <h1 class="text-2xl font-bold mb-sm">
      Hello World
    </h1>
    <p class="text-neutral-600">
      This uses custom design tokens
    </p>
  </div>
</template>
```

## TypeScript

### Strict Type Safety

TypeScript is configured with the strictest settings:

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true
  }
}
```

### Defining Types

```typescript
// app/types/user.ts
export interface User {
  id: string
  username: string
  email: string
  createdAt: string
}

export interface CreateUserRequest {
  username: string
  email: string
  password: string
}
```

### Type-Safe API Calls

```typescript
// app/composables/api/useUsers.ts
export const useUsers = () => {
  const fetchUsers = async (): Promise<User[]> => {
    return await apiClient.get<User[]>('/users')
  }

  const createUser = async (
    data: CreateUserRequest
  ): Promise<User> => {
    return await apiClient.post<User>('/users', data)
  }

  return { fetchUsers, createUser }
}
```

## Testing

### Unit Tests (Vitest)

```typescript
// app/composables/__tests__/useCounter.test.ts
import { describe, it, expect } from 'vitest'
import { useCounter } from '../useCounter'

describe('useCounter', () => {
  it('increments count', () => {
    const { count, increment } = useCounter()
    expect(count.value).toBe(0)

    increment()
    expect(count.value).toBe(1)
  })
})
```

### E2E Tests (Playwright)

```typescript
// tests/e2e/login.spec.ts
import { test, expect } from '@playwright/test'

test('user can log in', async ({ page }) => {
  await page.goto('http://localhost:3000/login')

  await page.fill('[name=username]', 'testuser')
  await page.fill('[name=password]', 'password')
  await page.click('button[type=submit]')

  await expect(page).toHaveURL('/dashboard')
})
```

## Best Practices

### Component Composition

Prefer composition over mixins:

```vue
<script setup lang="ts">
// Good: Composable
const { count, increment } = useCounter()
const { user, loading } = useAuth()

// Bad: Mixins (don't use)
</script>
```

### Reactive State

Always use `ref()` or `reactive()` for reactive data:

```typescript
// Good
const count = ref(0)
const user = reactive({ name: 'John' })

// Bad
let count = 0  // Not reactive!
```

### Async Data

Use `useFetch` or `useAsyncData` for SSR-compatible data fetching:

```vue
<script setup lang="ts">
// Good: SSR-compatible
const { data: user } = await useFetch('/api/user')

// Bad: Client-only
onMounted(async () => {
  user.value = await fetch('/api/user')
})
</script>
```

## Next Steps

- 🐍 [Backend Development Guide](./backend) - API development with FastAPI + Django
- 🏗️ [Architecture](./architecture) - Understand the system design
