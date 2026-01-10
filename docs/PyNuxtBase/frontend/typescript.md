---
sidebar_position: 4.9
---

# TypeScript

## Strict Type Safety

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

## Defining Types

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

## Type-Safe API Calls

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
