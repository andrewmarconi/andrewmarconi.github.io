---
sidebar_position: 3.5
---

# Authentication

PyNuxtBase uses **JWT (JSON Web Tokens)** with refresh tokens:

## Token Strategy

1. **Access Token**: Short-lived (15 minutes), stored in memory
2. **Refresh Token**: Long-lived (7 days), stored in httpOnly cookie

## Login Flow

```mermaid
sequenceDiagram
    participant Client
    participant Backend
    participant Database

    Client->>Backend: POST /api/auth/login
    Backend->>Database: Verify credentials
    Database-->>Backend: User data
    Backend-->>Client: { accessToken, user }
    Backend-->>Client: Set-Cookie: refreshToken (httpOnly)

    Note over Client: Access token stored in memory
    Note over Client: Refresh token in httpOnly cookie
```

## Token Refresh Flow

When access token expires:

```mermaid
sequenceDiagram
    participant Client
    participant Backend

    Client->>Backend: Request with expired token
    Backend-->>Client: 401 Unauthorized

    Client->>Backend: POST /api/auth/refresh<br/>(Cookie: refreshToken)
    Backend-->>Client: { accessToken }

    Client->>Backend: Retry original request<br/>with new access token
    Backend-->>Client: Success response

    Note over Client: Access token refreshed<br/>automatically
```
