---
sidebar_position: 5.5
---

# Django Development

## Creating Models

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

## Creating Migrations

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

## Django Admin

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

Access admin at: http://localhost:8000/cp
