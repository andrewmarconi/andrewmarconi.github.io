---
sidebar_position: 3.4
---

# Database Schema

## UUID Primary Keys

All models use **UUID primary keys** instead of auto-incrementing integers:

```python
# Django model
class User(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
```

Benefits:
- ✅ Prevents ID enumeration attacks
- ✅ Globally unique identifiers
- ✅ No conflicts when merging databases

## PostgreSQL 17

PyNuxtBase uses **PostgreSQL 17**, which provides:
- Advanced indexing (B-tree, GiST, SP-GiST, GIN, BRIN)
- Full-text search
- JSON/JSONB support
- Row-level security
- Partitioning
