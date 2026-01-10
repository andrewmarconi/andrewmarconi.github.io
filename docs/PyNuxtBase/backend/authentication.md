---
sidebar_position: 5.8
---

# Authentication

## JWT Token Generation

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

## Protected Routes

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
