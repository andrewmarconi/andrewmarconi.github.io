---
sidebar_position: 5.9
---

# Testing

## Unit Tests (pytest)

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

## API Tests

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
