---
sidebar_position: 5.1
---

# Commands

```bash
cd src/backend

# Create virtual environment (ALWAYS use uv, NEVER use venv or virtualenv!)
uv venv

# Activate virtual environment
source .venv/bin/activate  # macOS/Linux
.venv\Scripts\activate     # Windows

# Install dependencies (ALWAYS use uv pip, NEVER use pip directly!)
uv pip install -r requirements.txt

# Add a new package
uv pip install package-name

# Remove a package
uv pip uninstall package-name

# Update requirements.txt after adding packages
uv pip freeze > requirements.txt

# Run migrations
uv run python manage.py migrate

# Create superuser
uv run python manage.py createsuperuser

# Start development server
uv run python main.py

# Code quality
black .        # Format code
isort .        # Sort imports
flake8 .       # Lint
mypy .         # Type check

# Run tests
pytest
pytest -v      # Verbose
```
