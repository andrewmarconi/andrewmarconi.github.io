---
sidebar_position: 5.3
---

# Package Management with uv

:::danger IMPORTANT
**ALWAYS use `uv` for Python package management. NEVER use `pip`, `venv`, or `virtualenv` directly!**
:::

## Why uv?

PyNuxtBase uses [uv](https://github.com/astral-sh/uv) as the Python package manager because it's:
- **10-100x faster** than pip
- **More reliable** dependency resolution
- **Better caching** across projects
- **Drop-in replacement** for pip

## Common Package Operations

### Install a package

```bash
# Add a new dependency
uv pip install fastapi

# Add a specific version
uv pip install "fastapi==0.115.0"

# Add with extras
uv pip install "pydantic[email]"

# Update requirements.txt
uv pip freeze > requirements.txt
```

### Upgrade packages

```bash
# Upgrade a specific package
uv pip install --upgrade fastapi

# Upgrade all packages
uv pip install --upgrade -r requirements.txt
```

### Remove a package

```bash
# Uninstall a package
uv pip uninstall fastapi

# Update requirements.txt
uv pip freeze > requirements.txt
```

### Check installed packages

```bash
# List all installed packages
uv pip list

# Show package details
uv pip show fastapi
```

## Development Workflow

1. **Add dependency**: `uv pip install package-name`
2. **Update requirements**: `uv pip freeze > requirements.txt`
3. **Commit changes**: `git add requirements.txt && git commit -m "feat: add package-name"`
4. **Team members sync**: `uv pip install -r requirements.txt`
