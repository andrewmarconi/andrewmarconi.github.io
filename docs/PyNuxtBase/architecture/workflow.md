---
sidebar_position: 3.7
---

# Development Workflow

## Local Development

1. **Start infrastructure**: `docker compose up -d`
2. **Start backend**: `python main.py` (port 8000)
3. **Start frontend**: `npm run dev` (port 3000)

## API Development

1. Define Django models in `app/django_app/apps/*/models.py`
2. Create migrations: `python manage.py makemigrations`
3. Run migrations: `python manage.py migrate`
4. Create Pydantic schemas in `app/api/schemas/`
5. Create FastAPI routes in `app/api/routers/`
6. Test at `/api/docs`

## Frontend Development

1. Create components in `app/components/`
2. Define pages in `app/pages/` (file-based routing)
3. Add composables in `app/composables/api/` for API calls
4. Use Pinia stores for global state
5. Hot-reload at `localhost:3000`
