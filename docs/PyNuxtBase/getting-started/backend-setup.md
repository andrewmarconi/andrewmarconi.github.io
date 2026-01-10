---
sidebar_position: 2.2
---

# Backend Setup

:::warning Use uv for Python
PyNuxtBase uses **uv** for Python package management. Do NOT use `pip`, `venv`, or `virtualenv` directly.
:::

## 1. Create Python virtual environment

```bash
cd src/backend
uv venv
```

## 2. Activate virtual environment

**macOS/Linux:**
```bash
source .venv/bin/activate
```

**Windows:**
```bash
.venv\Scripts\activate
```

## 3. Install dependencies

```bash
uv pip install -r requirements.txt
```

## 4. Run Django migrations

```bash
python manage.py migrate
```

## 5. Create a superuser (for Django admin)

```bash
python manage.py createsuperuser
```

Follow the prompts to create an admin account.

## 6. Start the development server

```bash
python main.py
```

The server will start at:
- **API**: http://localhost:8000/api
- **API Docs**: http://localhost:8000/api/docs
- **Django Admin**: http://localhost:8000/cp/admin

## Next Steps

- [Frontend Setup](./frontend-setup) - Set up the Nuxt frontend
- [Verification](./verification) - Test your setup
