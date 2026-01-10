---
sidebar_position: 3.5
---

# Authentication

PyNuxtBase uses **JWT (JSON Web Tokens)** with refresh tokens:

## Token Strategy

1. **Access Token**: Short-lived (15 minutes), stored in memory
2. **Refresh Token**: Long-lived (7 days), stored in httpOnly cookie

## Login Flow

![Authentication Login Flow](/img/diagrams/authentication-login-flow.svg)

## Token Refresh Flow

When access token expires:

![Authentication Token Refresh](/img/diagrams/authentication-token-refresh.svg)
