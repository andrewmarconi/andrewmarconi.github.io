---
sidebar_position: 5.11
---

# Best Practices

## 1. Always Use Type Hints

```python
# Good
def create_user(username: str, email: str) -> User:
    return User.objects.create(username=username, email=email)

# Bad
def create_user(username, email):
    return User.objects.create(username=username, email=email)
```

## 2. Use Pydantic for Validation

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

## 3. Handle Errors Properly

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

## 4. Use UUID Primary Keys

```python
# Good
id = models.UUIDField(primary_key=True, default=uuid.uuid4)

# Bad
id = models.AutoField(primary_key=True)  # Sequential IDs
```
