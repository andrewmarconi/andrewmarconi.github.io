---
sidebar_position: 5.4
---

# Hybrid Architecture

### Entry Point (`main.py`)

The backend runs both Django and FastAPI in a single process:

```python
import os
import django
import uvicorn
from fastapi import FastAPI
from a2wsgi import ASGIMiddleware
from django.core.wsgi import get_wsgi_application

# Initialize Django FIRST
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'app.django_app.settings')
django.setup()

# Create FastAPI app
app = FastAPI(
    title="PyNuxtBase API",
    version="1.0.0"
)

# Include FastAPI routers
from app.api.routers import auth, users
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(users.router, prefix="/api/users", tags=["users"])

# Mount Django at /
django_app = get_wsgi_application()
app.mount("/", ASGIMiddleware(django_app))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

## URL Structure

- `/api/*` - FastAPI routes (async REST API)
- `/api/docs` - OpenAPI documentation
- `/cp` - Django admin interface
- `/*` - Django URLs
