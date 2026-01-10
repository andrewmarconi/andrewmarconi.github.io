---
sidebar_position: 5.7
---

# Database Operations

## Using Django ORM in FastAPI

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

## Async Database Queries

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
