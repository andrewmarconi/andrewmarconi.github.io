---
sidebar_position: 4.10
---

# Testing

## Unit Tests (Vitest)

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

## E2E Tests (Playwright)

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
