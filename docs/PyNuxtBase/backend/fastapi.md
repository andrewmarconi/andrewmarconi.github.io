---
sidebar_position: 5.6
---

# FastAPI Development

## Creating API Routes

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

## Pydantic Schemas

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
