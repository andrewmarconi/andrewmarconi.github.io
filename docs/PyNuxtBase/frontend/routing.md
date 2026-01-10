---
sidebar_position: 4.3
---

# File-Based Routing

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

## Dynamic Routes

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
