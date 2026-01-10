---
sidebar_position: 4.8
---

# Tailwind CSS 4

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

## Usage

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
