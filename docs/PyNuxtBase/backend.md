---
sidebar_position: 5
---

# Backend Development

Complete guide to backend development with the FastAPI + Django hybrid architecture.

## Development Commands

```bash
cd src/backend

# Create virtual environment (ALWAYS use uv, NEVER use venv or virtualenv!)
uv venv

# Activate virtual environment
source .venv/bin/activate  # macOS/Linux
.venv\Scripts\activate     # Windows

# Install dependencies (ALWAYS use uv pip, NEVER use pip directly!)
uv pip install -r requirements.txt

# Add a new package
uv pip install package-name

# Remove a package
uv pip uninstall package-name

# Update requirements.txt after adding packages
uv pip freeze > requirements.txt

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Start development server
python main.py

# Code quality
black .        # Format code
isort .        # Sort imports
flake8 .       # Lint
mypy .         # Type check

# Run tests
pytest
pytest -v      # Verbose
```

## Project Structure

```
src/backend/
├── app/
│   ├── django_app/          # Django project
│   │   ├── apps/
│   │   │   ├── auth/       # Auth models
│   │   │   └── users/      # User models
│   │   ├── settings.py     # Django settings
│   │   ├── urls.py         # Django URL config
│   │   └── wsgi.py         # WSGI app
│   │
│   └── api/                 # FastAPI app
│       ├── main.py         # FastAPI instance
│       ├── routers/        # API routes
│       │   ├── auth.py
│       │   └── users.py
│       └── schemas/        # Pydantic models
│
├── main.py                  # ENTRY POINT
├── manage.py               # Django CLI
├── requirements.txt        # Dependencies
└── tests/                  # Tests (pytest)
```

## Package Management with uv

:::danger IMPORTANT
**ALWAYS use `uv` for Python package management. NEVER use `pip`, `venv`, or `virtualenv` directly!**
:::

### Why uv?

PyNuxtBase uses [uv](https://github.com/astral-sh/uv) as the Python package manager because it's:
- **10-100x faster** than pip
- **More reliable** dependency resolution
- **Better caching** across projects
- **Drop-in replacement** for pip

### Common Package Operations

#### Install a package

```bash
# Add a new dependency
uv pip install fastapi

# Add a specific version
uv pip install "fastapi==0.115.0"

# Add with extras
uv pip install "pydantic[email]"

# Update requirements.txt
uv pip freeze > requirements.txt
```

#### Upgrade packages

```bash
# Upgrade a specific package
uv pip install --upgrade fastapi

# Upgrade all packages
uv pip install --upgrade -r requirements.txt
```

#### Remove a package

```bash
# Uninstall a package
uv pip uninstall fastapi

# Update requirements.txt
uv pip freeze > requirements.txt
```

#### Check installed packages

```bash
# List all installed packages
uv pip list

# Show package details
uv pip show fastapi
```

### Development Workflow

1. **Add dependency**: `uv pip install package-name`
2. **Update requirements**: `uv pip freeze > requirements.txt`
3. **Commit changes**: `git add requirements.txt && git commit -m "feat: add package-name"`
4. **Team members sync**: `uv pip install -r requirements.txt`

## Hybrid Architecture

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

# Mount Django at /cp
django_app = get_wsgi_application()
app.mount("/cp", ASGIMiddleware(django_app))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

### URL Structure

- `/api/*` - FastAPI routes (async REST API)
- `/api/docs` - OpenAPI documentation
- `/cp/admin` - Django admin interface
- `/cp/*` - Django URLs

## Django Development

### Creating Models

All models use **UUID primary keys**:

```python
# app/django_app/apps/users/models.py
import uuid
from django.db import models

class User(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'users'
        ordering = ['-created_at']

    def __str__(self):
        return self.username
```

### Creating Migrations

```bash
# Create migration
python manage.py makemigrations

# View SQL
python manage.py sqlmigrate users 0001

# Apply migrations
python manage.py migrate

# List migrations
python manage.py showmigrations
```

### Django Admin

Register models in admin:

```python
# app/django_app/apps/users/admin.py
from django.contrib import admin
from .models import User

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email', 'created_at']
    search_fields = ['username', 'email']
    list_filter = ['created_at']
    readonly_fields = ['id', 'created_at', 'updated_at']
```

Access admin at: http://localhost:8000/cp/admin

## FastAPI Development

### Creating API Routes

```python
# app/api/routers/users.py
from fastapi import APIRouter, Depends, HTTPException
from app.api.schemas.user import UserResponse, CreateUserRequest
from app.django_app.apps.users.models import User

router = APIRouter()

@router.get("/", response_model=list[UserResponse])
async def list_users():
    """List all users."""
    users = User.objects.all()
    return [UserResponse.from_orm(user) for user in users]

@router.get("/{user_id}", response_model=UserResponse)
async def get_user(user_id: str):
    """Get a user by ID."""
    try:
        user = User.objects.get(id=user_id)
        return UserResponse.from_orm(user)
    except User.DoesNotExist:
        raise HTTPException(status_code=404, detail="User not found")

@router.post("/", response_model=UserResponse, status_code=201)
async def create_user(data: CreateUserRequest):
    """Create a new user."""
    user = User.objects.create(
        username=data.username,
        email=data.email
    )
    return UserResponse.from_orm(user)
```

### Pydantic Schemas

```python
# app/api/schemas/user.py
from pydantic import BaseModel, EmailStr, Field
from datetime import datetime

class UserResponse(BaseModel):
    id: str
    username: str
    email: EmailStr
    created_at: datetime

    class Config:
        from_attributes = True  # Pydantic v2

class CreateUserRequest(BaseModel):
    username: str = Field(..., min_length=3, max_length=150)
    email: EmailStr
    password: str = Field(..., min_length=8)
```

## Database Operations

### Using Django ORM in FastAPI

Even in FastAPI routes, use Django ORM:

```python
from app.django_app.apps.users.models import User

# Query all
users = User.objects.all()

# Filter
active_users = User.objects.filter(is_active=True)

# Get one
user = User.objects.get(id=user_id)

# Create
user = User.objects.create(
    username="john",
    email="john@example.com"
)

# Update
user.email = "newemail@example.com"
user.save()

# Delete
user.delete()
```

### Async Database Queries

For async FastAPI endpoints, wrap sync Django ORM calls:

```python
from asgiref.sync import sync_to_async

@router.get("/users")
async def list_users():
    # Wrap synchronous Django query
    users = await sync_to_async(list)(
        User.objects.all()
    )
    return users
```

## Authentication

### JWT Token Generation

```python
# app/api/routers/auth.py
from datetime import datetime, timedelta
import jwt
from fastapi import APIRouter, HTTPException, Response

router = APIRouter()

SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"

def create_access_token(user_id: str) -> str:
    """Create JWT access token (15 min expiry)."""
    payload = {
        "user_id": user_id,
        "exp": datetime.utcnow() + timedelta(minutes=15)
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

def create_refresh_token(user_id: str) -> str:
    """Create JWT refresh token (7 day expiry)."""
    payload = {
        "user_id": user_id,
        "exp": datetime.utcnow() + timedelta(days=7)
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

@router.post("/login")
async def login(username: str, password: str, response: Response):
    """Authenticate user and return tokens."""
    # Verify credentials
    user = User.objects.get(username=username)

    # Generate tokens
    access_token = create_access_token(str(user.id))
    refresh_token = create_refresh_token(str(user.id))

    # Set refresh token in httpOnly cookie
    response.set_cookie(
        key="refreshToken",
        value=refresh_token,
        httponly=True,
        max_age=7 * 24 * 60 * 60,  # 7 days
        samesite="lax"
    )

    return {
        "accessToken": access_token,
        "user": UserResponse.from_orm(user)
    }
```

### Protected Routes

```python
from fastapi import Depends, HTTPException, Header

async def get_current_user(
    authorization: str = Header(None)
) -> User:
    """Get current user from JWT token."""
    if not authorization:
        raise HTTPException(status_code=401, detail="Not authenticated")

    try:
        token = authorization.split("Bearer ")[1]
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload["user_id"]
        user = User.objects.get(id=user_id)
        return user
    except (jwt.ExpiredSignatureError, User.DoesNotExist):
        raise HTTPException(status_code=401, detail="Invalid token")

@router.get("/me", response_model=UserResponse)
async def get_me(current_user: User = Depends(get_current_user)):
    """Get current authenticated user."""
    return UserResponse.from_orm(current_user)
```

## Testing

### Unit Tests (pytest)

```python
# tests/test_users.py
import pytest
from app.django_app.apps.users.models import User

@pytest.mark.django_db
def test_create_user():
    """Test creating a user."""
    user = User.objects.create(
        username="testuser",
        email="test@example.com"
    )

    assert user.id is not None
    assert user.username == "testuser"
    assert user.email == "test@example.com"

@pytest.mark.django_db
def test_user_uniqueness():
    """Test username must be unique."""
    User.objects.create(username="john", email="john@example.com")

    with pytest.raises(Exception):
        User.objects.create(username="john", email="other@example.com")
```

### API Tests

```python
# tests/test_api_users.py
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_list_users():
    """Test GET /api/users."""
    response = client.get("/api/users")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_create_user():
    """Test POST /api/users."""
    response = client.post("/api/users", json={
        "username": "newuser",
        "email": "new@example.com",
        "password": "securepassword"
    })

    assert response.status_code == 201
    data = response.json()
    assert data["username"] == "newuser"
    assert "id" in data
```

## Code Quality

### Black (Formatting)

```bash
# Format all files
black .

# Check without changing
black --check .

# Format specific file
black app/api/routers/users.py
```

### isort (Import Sorting)

```bash
# Sort all imports
isort .

# Check without changing
isort --check .
```

### flake8 (Linting)

```bash
# Lint all files
flake8 .

# Lint specific file
flake8 app/api/routers/users.py
```

### mypy (Type Checking)

```bash
# Type check all files
mypy .

# Type check specific file
mypy app/api/routers/users.py
```

## Best Practices

### 1. Always Use Type Hints

```python
# Good
def create_user(username: str, email: str) -> User:
    return User.objects.create(username=username, email=email)

# Bad
def create_user(username, email):
    return User.objects.create(username=username, email=email)
```

### 2. Use Pydantic for Validation

```python
# Good: Automatic validation
class CreateUserRequest(BaseModel):
    username: str = Field(..., min_length=3)
    email: EmailStr

# Bad: Manual validation
def create_user(data: dict):
    if len(data["username"]) < 3:
        raise ValueError("Username too short")
```

### 3. Handle Errors Properly

```python
# Good
@router.get("/{user_id}")
async def get_user(user_id: str):
    try:
        user = User.objects.get(id=user_id)
        return UserResponse.from_orm(user)
    except User.DoesNotExist:
        raise HTTPException(status_code=404, detail="User not found")

# Bad
@router.get("/{user_id}")
async def get_user(user_id: str):
    user = User.objects.get(id=user_id)  # Can crash!
    return user
```

### 4. Use UUID Primary Keys

```python
# Good
id = models.UUIDField(primary_key=True, default=uuid.uuid4)

# Bad
id = models.AutoField(primary_key=True)  # Sequential IDs
```

## Next Steps

- 🎨 [Frontend Development Guide](./frontend) - Vue/Nuxt development
- 🏗️ [Architecture](./architecture) - Understand the system design
