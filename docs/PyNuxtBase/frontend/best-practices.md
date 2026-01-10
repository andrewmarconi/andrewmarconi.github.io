---
sidebar_position: 4.11
---

# Best Practices

## Component Composition

Prefer composition over mixins:

```vue
<script setup lang="ts">
// Good: Composable
const { count, increment } = useCounter()
const { user, loading } = useAuth()

// Bad: Mixins (don't use)
</script>
```

## Reactive State

Always use `ref()` or `reactive()` for reactive data:

```typescript
// Good
const count = ref(0)
const user = reactive({ name: 'John' })

// Bad
let count = 0  // Not reactive!
```

## Async Data

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
