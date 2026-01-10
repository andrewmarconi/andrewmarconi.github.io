---
sidebar_position: 2.4
---

# Verification

## Test the Backend

1. Visit the API documentation: http://localhost:8000/api/docs
2. Visit the Django admin: http://localhost:8000/cp/admin (login with superuser credentials)

## Test the Frontend

1. Visit http://localhost:3000
2. You should see the Nuxt welcome screen

## Test the Database

```bash
# Connect to PostgreSQL
docker compose -f docker/docker-compose.yml exec postgres psql -U pynuxtbase -d pynuxtbase

# List tables
\dt

# Exit
\q
```

## Next Steps

- 🏗️ [Architecture](../architecture/system-overview) - Understand the system design
- 🎨 [Frontend Development](../frontend/commands) - Start frontend development
- 🐍 [Backend Development](../backend/commands) - Start backend development
