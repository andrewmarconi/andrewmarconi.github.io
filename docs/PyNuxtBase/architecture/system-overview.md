---
sidebar_position: 3.1
---

# System Overview

```mermaid
graph TB
    Client[Client Browser]

    subgraph Frontend["Nuxt 4 Frontend :3000"]
        Components[Components]
        Pages[Pages]
        Layouts[Layouts]
        Composables[Composables]
        Store[Pinia Store]
    end

    subgraph Backend["Python Backend :8000"]
        subgraph Uvicorn["Uvicorn ASGI Server"]
            subgraph FastAPI["FastAPI /api/*"]
                API[REST API]
                AsyncRoutes[Async Routes]
                Pydantic[Pydantic Schemas]
            end

            subgraph Django["Django WSGI /cp/*"]
                Admin[Admin Interface]
                ORM[ORM Models]
                Migrations[Migrations]
            end
        end
    end

    Database[(PostgreSQL 17<br/>:5432)]

    Client -->|HTTP/REST| Frontend
    Frontend -->|API Calls| FastAPI
    FastAPI -->|Queries| Database
    Django -->|Schema Management| Database

    style Frontend fill:#42b883
    style Backend fill:#3776ab
    style Database fill:#336791
```

## Key Components

### Frontend (Port 3000)

- **Nuxt 4** - Server-side rendering and static generation
- **Vue 3** - Progressive JavaScript framework
- **Tailwind CSS 4** - Utility-first styling
- **Pinia** - State management
- **Composables** - Auto-imported API and utility functions

### Backend (Port 8000)

- **FastAPI** - Async REST API at `/api/*`
- **Django** - Admin and ORM at `/cp/*`
- **Uvicorn** - ASGI server running both frameworks

### Database

- **PostgreSQL 17** - Shared database for both frameworks
- **UUID Primary Keys** - Security and uniqueness
