---
sidebar_position: 5.2
---

# Project Structure

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
