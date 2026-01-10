---
sidebar_position: 4.5
---

# UI Components

Located in `app/components/ui/`:

## Button

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

## Input

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

## Modal

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

## Toast Notifications

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
