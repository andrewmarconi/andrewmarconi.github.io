---
sidebar_position: 5.10
---

# Code Quality

## Black (Formatting)

```bash
# Format all files
black .

# Check without changing
black --check .

# Format specific file
black app/api/routers/users.py
```

## isort (Import Sorting)

```bash
# Sort all imports
isort .

# Check without changing
isort --check .
```

## flake8 (Linting)

```bash
# Lint all files
flake8 .

# Lint specific file
flake8 app/api/routers/users.py
```

## mypy (Type Checking)

```bash
# Type check all files
mypy .

# Type check specific file
mypy app/api/routers/users.py
```
