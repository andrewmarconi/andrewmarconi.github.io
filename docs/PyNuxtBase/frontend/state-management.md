---
sidebar_position: 4.7
---

# State Management (Pinia)

## Creating a Store

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

## Using a Store

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
