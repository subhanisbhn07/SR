# Database Migration Guide

This guide explains how to migrate SignRoad backend from in-memory storage to PostgreSQL.

## Overview

The backend now supports **dual storage modes**:
- **In-memory storage** (default): Data lost on restart, no DATABASE_URL required
- **PostgreSQL storage**: Persistent data, requires DATABASE_URL environment variable

The backend automatically detects which mode to use based on the presence of DATABASE_URL.

## Local Testing with PostgreSQL

### Prerequisites
- PostgreSQL installed locally
- Python 3.12+
- Poetry

### Step 1: Install PostgreSQL

**macOS:**
```bash
brew install postgresql@15
brew services start postgresql@15
```

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### Step 2: Create Database

```bash
# Connect to PostgreSQL
psql postgres

# Create database and user
CREATE DATABASE signroad;
CREATE USER signroad_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE signroad TO signroad_user;
\q
```

### Step 3: Set Environment Variables

Create or update `.env` file in `signroad-backend/`:

```bash
# Database
DATABASE_URL=postgresql+asyncpg://signroad_user:your_secure_password@localhost/signroad

# JWT (required)
JWT_SECRET_KEY=your_secret_key_here  # Generate with: openssl rand -hex 32

# CORS
ALLOWED_ORIGINS=http://localhost:5173,https://pr-generator-yatdm0kx.devinapps.com
```

### Step 4: Install Dependencies

```bash
cd signroad-backend
poetry install
```

### Step 5: Run Initial Migration

```bash
# Create initial migration (first time only)
poetry run alembic revision --autogenerate -m "Initial migration"

# Apply migration
poetry run alembic upgrade head
```

### Step 6: Start Backend

```bash
poetry run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## Deploying to Fly.io with Fly Postgres

### Step 1: Create Fly Postgres Database

```bash
cd signroad-backend
fly postgres create --name signroad-db --region sjc
fly postgres attach signroad-db --app signroad-backend
```

### Step 2: Set Environment Variables

```bash
fly secrets set JWT_SECRET_KEY=$(openssl rand -hex 32) --app signroad-backend
fly secrets set ALLOWED_ORIGINS="https://pr-generator-yatdm0kx.devinapps.com" --app signroad-backend
```

### Step 3: Deploy Backend

```bash
fly deploy
fly status --app signroad-backend
fly logs --app signroad-backend
```

## Database Management

### Create New Migration

```bash
poetry run alembic revision --autogenerate -m "Description of changes"
poetry run alembic upgrade head
fly deploy
```

### Backup Database

```bash
fly postgres backup create --app signroad-db
fly postgres backup list --app signroad-db
```

## Troubleshooting

### "Command not found: alembic"

```bash
poetry install
poetry run alembic upgrade head
```

### "Database not configured"

```bash
# Local
echo $DATABASE_URL

# Fly.io
fly secrets list --app signroad-backend
```

### "Connection refused" to PostgreSQL

```bash
# Local
pg_isready
brew services start postgresql@15  # macOS

# Fly.io
fly status --app signroad-db
fly logs --app signroad-db
```
