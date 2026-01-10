---
sidebar_position: 3.2
---

# Hybrid Backend

The backend architecture is the most unique aspect of PyNuxtBase. It runs **both Django and FastAPI in a single process**.

## Why Hybrid?

This design combines:
- **Django's strengths**: Mature ORM, built-in admin, robust migrations, authentication
- **FastAPI's strengths**: Modern async API, automatic documentation, high performance

## How It Works

### 1. Single Entry Point (`src/backend/main.py`)

```python
from fastapi import FastAPI
from a2wsgi import ASGIMiddleware
from django.core.wsgi import get_wsgi_application

# Initialize Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'app.django_app.settings')
django.setup()

# Create FastAPI app
app = FastAPI()

# Mount FastAPI routes at /api
app.include_router(api_router, prefix="/api")

# Mount Django WSGI at /
django_app = get_wsgi_application()
app.mount("/", ASGIMiddleware(django_app))

# Run with Uvicorn
uvicorn.run(app, host="0.0.0.0", port=8000)
```

### 2. Django Responsibilities

- **Database Models**: Define all models in `app/django_app/apps/*/models.py`
- **Migrations**: Use `python manage.py migrate` to manage schema
- **Admin Interface**: Available at `/cp` for data management
- **ORM**: All database queries use Django ORM

### 3. FastAPI Responsibilities

- **API Endpoints**: REST API routes in `app/api/routers/`
- **Request Handling**: Async request/response processing
- **Validation**: Pydantic schemas for request/response validation
- **Documentation**: Auto-generated OpenAPI docs at `/api/docs`

### 4. Shared Database

Both frameworks share the same PostgreSQL database:
- Django manages the schema (migrations)
- FastAPI imports Django models for queries
- All database operations use Django ORM (even in FastAPI)

## URL Structure

- `/api/*` - FastAPI routes (async REST API)
- `/api/docs` - OpenAPI documentation
- `/cp` - Django admin interface
- `/*` - Django URLs
