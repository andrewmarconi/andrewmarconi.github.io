---
sidebar_position: 2
---

# Getting Started

This guide will help you set up PyNuxtBase for local development.

## Prerequisites

Before you begin, ensure you have the following installed:

### Required

- **Docker** (v20.10+) and **Docker Compose** (v2.0+)
  - [Install Docker Desktop](https://www.docker.com/products/docker-desktop)
- **Git** (v2.30+)
  - [Install Git](https://git-scm.com/downloads)
- **uv** (Python package manager)
  - Install: `curl -LsSf https://astral.sh/uv/install.sh | sh`

### Optional (for local development)

- **Node.js** (v20 LTS+) - for frontend development
- **Python** 3.12 - for backend development

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/andrewmarconi/PyNuxtBase.git
cd PyNuxtBase
```

### 2. Set up environment variables

```bash
cp .env.example .env
# Edit .env with your configuration (optional for development)
```

The default values in `.env.example` work for local development.

### 3. Start infrastructure services

```bash
cd docker
docker compose up -d
```

This starts:
- **PostgreSQL 17** (port 5432)
- **Caddy** reverse proxy (ports 80, 443)
- **Mailpit** email testing (SMTP: 1025, Web UI: 8025)

### 4. Verify setup

```bash
# Check services are running
docker compose ps

# All services should show "running" status
```

Access Mailpit web interface (for email testing):
```bash
open http://localhost:8025
```

## Backend Setup

:::warning Use uv for Python
PyNuxtBase uses **uv** for Python package management. Do NOT use `pip`, `venv`, or `virtualenv` directly.
:::

### 1. Create Python virtual environment

```bash
cd src/backend
uv venv
```

### 2. Activate virtual environment

**macOS/Linux:**
```bash
source .venv/bin/activate
```

**Windows:**
```bash
.venv\Scripts\activate
```

### 3. Install dependencies

```bash
uv pip install -r requirements.txt
```

### 4. Run Django migrations

```bash
python manage.py migrate
```

### 5. Create a superuser (for Django admin)

```bash
python manage.py createsuperuser
```

Follow the prompts to create an admin account.

### 6. Start the development server

```bash
python main.py
```

The server will start at:
- **API**: http://localhost:8000/api
- **API Docs**: http://localhost:8000/api/docs
- **Django Admin**: http://localhost:8000/cp/admin

## Frontend Setup

### 1. Navigate to frontend directory

```bash
cd src/frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start development server

```bash
npm run dev
```

The frontend will be available at http://localhost:3000

## Verification

### Test the Backend

1. Visit the API documentation: http://localhost:8000/api/docs
2. Visit the Django admin: http://localhost:8000/cp/admin (login with superuser credentials)

### Test the Frontend

1. Visit http://localhost:3000
2. You should see the Nuxt welcome screen

### Test the Database

```bash
# Connect to PostgreSQL
docker compose -f docker/docker-compose.yml exec postgres psql -U pynuxtbase -d pynuxtbase

# List tables
\dt

# Exit
\q
```

## Next Steps

- 📖 Read the [Architecture Guide](./architecture) to understand the hybrid backend design
- 🎨 Explore the [Frontend Guide](./frontend) for Vue/Nuxt development
- 🐍 Check out the [Backend Guide](./backend) for FastAPI/Django development

## Troubleshooting

### Docker services won't start

```bash
# Stop all services
docker compose down

# Remove volumes (WARNING: deletes database data)
docker compose down -v

# Restart services
docker compose up -d
```

### Backend server fails to start

1. Ensure PostgreSQL is running: `docker compose ps`
2. Check database connection in `.env`
3. Verify migrations have run: `python manage.py showmigrations`

### Frontend build errors

```bash
# Clear Nuxt cache
rm -rf .nuxt node_modules/.cache

# Reinstall dependencies
rm -rf node_modules
npm install
```

### Port already in use

If port 8000, 3000, or 5432 is already in use:

1. Find the process: `lsof -ti:PORT_NUMBER`
2. Kill it: `kill -9 PID`
3. Or change the port in the respective configuration files

## Getting Help

- Check the [PyNuxtBase Repository](https://github.com/andrewmarconi/PyNuxtBase) for issues and discussions
- Review the [Architecture](./architecture) documentation for design decisions
