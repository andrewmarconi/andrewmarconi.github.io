---
sidebar_position: 2.1
---

# Installation

## 1. Clone the repository

```bash
git clone https://github.com/andrewmarconi/PyNuxtBase.git
cd PyNuxtBase
```

## 2. Set up environment variables

```bash
cp .env.example .env
# Edit .env with your configuration (optional for development)
```

The default values in `.env.example` work for local development.

## 3. Start infrastructure services

```bash
cd docker
docker compose up -d
```

This starts:
- **PostgreSQL 17** (port 5432)
- **Caddy** reverse proxy (ports 80, 443)
- **Mailpit** email testing (SMTP: 1025, Web UI: 8025)

## 4. Verify setup

```bash
# Check services are running
docker compose ps

# All services should show "running" status
```

Access Mailpit web interface (for email testing):
```bash
open http://localhost:8025
```

## Next Steps

- [Backend Setup](./backend-setup) - Set up the Python backend
- [Frontend Setup](./frontend-setup) - Set up the Nuxt frontend
