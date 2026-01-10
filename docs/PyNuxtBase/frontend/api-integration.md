---
sidebar_position: 4.6
---

# API Integration

## Using API Composables

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

## Creating API Composables

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

## Authentication

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
