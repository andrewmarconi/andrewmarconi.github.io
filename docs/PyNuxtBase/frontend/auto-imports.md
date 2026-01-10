---
sidebar_position: 4.4
---

# Auto-Imports

Nuxt 4 auto-imports these without explicit `import` statements:

## Vue APIs

```typescript
// All automatically available:
ref, reactive, computed, watch, onMounted, onUnmounted,
nextTick, defineProps, defineEmits, etc.
```

## Composables

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

## Components

Components in `app/components/` are auto-imported:

```vue
<!-- No import needed! -->
<template>
  <UiButton @click="handleClick">
    Click me
  </UiButton>
</template>
```
