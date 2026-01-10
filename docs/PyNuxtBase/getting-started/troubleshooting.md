---
sidebar_position: 2.5
---

# Troubleshooting

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
