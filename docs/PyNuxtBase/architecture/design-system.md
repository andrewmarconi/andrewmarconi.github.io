---
sidebar_position: 3.6
---

# Design System

The frontend includes a comprehensive design system with:

## UI Components

Located in `app/components/ui/`:

- **Button**: Multiple variants (primary, secondary, outline, ghost, danger)
- **Input**: Form inputs with validation states
- **Select**: Searchable dropdown
- **Modal**: Dialog with teleport
- **Card**: Content containers
- **Toast**: Notifications (success, error, warning, info)
- **Loading**: Spinners and skeleton loaders
- **ErrorState**: Error display with retry

## Design Tokens

CSS custom properties in `app/assets/main.css`:

```css
:root {
  --color-primary: oklch(65% 0.25 270);
  --color-neutral-50: oklch(98% 0 0);
  --spacing-1: 0.25rem;
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
}
```
