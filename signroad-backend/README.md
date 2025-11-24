# SignRoad Backend API

FastAPI backend for the SignRoad wellness platform with JWT authentication, user management, and content delivery.

## Features

- **Authentication**: JWT tokens with bcrypt password hashing
- **User Management**: Registration, login, profile, progress tracking
- **Content Management**: 90-day journey content, sign logs, journal entries
- **Admin Panel**: Full CRUD for users, content, audio, cosmetics
- **Subscription System**: Tier-based access control (wanderer/seeker/master)

## Quick Start

### Prerequisites

- Python 3.11+
- Poetry (for dependency management)

### Installation

1. Install dependencies:
   ```bash
   cd signroad-backend
   poetry install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   ```

3. Generate JWT secret key:
   ```bash
   openssl rand -hex 32
   ```

4. Edit `.env` and set `JWT_SECRET_KEY` to the generated value

5. (Optional) Generate test credentials for development:
   ```bash
   poetry run python scripts/generate_test_credentials.py
   ```
   
   Copy the output to your `.env` file.

6. Run the development server:
   ```bash
   poetry run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

7. Visit the API documentation:
   - Swagger UI: http://localhost:8000/docs
   - ReDoc: http://localhost:8000/redoc

### Creating an Admin User

**Option 1: Interactive Script (Recommended for Production)**
```bash
poetry run python scripts/create_admin.py
```

This will prompt you for email and password with validation.

**Option 2: Environment Variables (Development Only)**
```bash
# Generate test credentials
poetry run python scripts/generate_test_credentials.py

# Add to .env file
DEFAULT_ADMIN_EMAIL=admin@signroad.com
DEFAULT_ADMIN_PASSWORD_HASH=<hash-from-script>
```

## Environment Variables

See `.env.example` for all available configuration options.

### Required Variables

- `JWT_SECRET_KEY`: Secret key for JWT token signing (generate with `openssl rand -hex 32`)

### Optional Variables

- `JWT_ALGORITHM`: JWT algorithm (default: HS256)
- `JWT_ACCESS_TOKEN_EXPIRE_HOURS`: Token expiration time (default: 24)
- `ALLOWED_ORIGINS`: Comma-separated list of allowed CORS origins
- `ENVIRONMENT`: Environment name (development/staging/production)

### Development Variables

- `DEFAULT_ADMIN_EMAIL`: Admin email for auto-creation on startup
- `DEFAULT_ADMIN_PASSWORD_HASH`: Admin password hash (bcrypt)
- `DEFAULT_TEST_EMAIL`: Test user email
- `DEFAULT_TEST_PASSWORD_HASH`: Test user password hash

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and get JWT token
- `GET /api/auth/me` - Get current user info

### User Management
- `GET /api/users/me` - Get current user profile
- `PUT /api/users/me` - Update current user profile
- `GET /api/users/progress` - Get user progress
- `POST /api/users/progress` - Update user progress

### Content
- `GET /api/days` - Get all day contents
- `GET /api/days/{day_number}` - Get specific day content
- `GET /api/audio` - Get all audio tracks
- `GET /api/cosmetics` - Get all cosmetic items

### Sign Logs
- `GET /api/signs` - Get user's sign logs
- `POST /api/signs` - Create new sign log

### Journal
- `GET /api/journal` - Get user's journal entries
- `POST /api/journal` - Create new journal entry
- `PUT /api/journal/{entry_id}` - Update journal entry
- `DELETE /api/journal/{entry_id}` - Delete journal entry

### Admin Panel
- `GET /api/admin/users` - List all users
- `GET /api/admin/users/{user_id}` - Get user details
- `PUT /api/admin/users/{user_id}` - Update user
- `DELETE /api/admin/users/{user_id}` - Delete user
- `POST /api/admin/days` - Create day content
- `PUT /api/admin/days/{day_number}` - Update day content
- `POST /api/admin/audio` - Create audio track
- `POST /api/admin/cosmetics` - Create cosmetic item
- `GET /api/admin/stats` - Get platform statistics

## Security

### Current Implementation (Proof of Concept)

⚠️ **WARNING**: The current implementation uses in-memory storage and is NOT production-ready.

**Known Security Issues:**
- In-memory storage (data lost on restart)
- No rate limiting
- No email verification
- No password reset
- Base64 photo storage (inefficient)

### Production Readiness Roadmap

See `docs/cto-analysis-robustness.md` for a comprehensive analysis of security improvements needed for production deployment.

**Critical Improvements Needed:**
1. Database migration (PostgreSQL)
2. Remove hardcoded secrets ✅ (DONE)
3. Authentication hardening (email verification, password reset)
4. Rate limiting and CORS hardening
5. Logging and monitoring
6. Object storage for photos
7. Horizontal scalability
8. Backups and disaster recovery

## Deployment

### Fly.io (Current)

The backend is deployed to Fly.io at: https://app-lnhrftkp.fly.dev/

**Deploy to Fly.io:**
```bash
# Install Fly CLI
curl -L https://fly.io/install.sh | sh

# Login
fly auth login

# Deploy
fly deploy
```

**Set secrets:**
```bash
# Generate JWT secret
JWT_SECRET=$(openssl rand -hex 32)

# Set secrets
fly secrets set JWT_SECRET_KEY="$JWT_SECRET"
fly secrets set ALLOWED_ORIGINS="https://pr-generator-yatdm0kx.devinapps.com"
fly secrets set ENVIRONMENT="production"
```

### Local Development

```bash
# Run with auto-reload
poetry run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Run in production mode
poetry run uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## Testing

```bash
# Run tests (when implemented)
poetry run pytest

# Run with coverage
poetry run pytest --cov=app
```

## Project Structure

```
signroad-backend/
├── app/
│   ├── __init__.py
│   ├── main.py           # FastAPI app and endpoints
│   ├── auth.py           # JWT authentication
│   ├── storage.py        # In-memory storage (temporary)
│   └── models.py         # Pydantic models
├── scripts/
│   ├── create_admin.py   # Admin user creation script
│   └── generate_test_credentials.py  # Test credentials generator
├── .env.example          # Environment variables template
├── pyproject.toml        # Poetry dependencies
├── fly.toml              # Fly.io configuration
└── README.md             # This file
```

## Default Credentials (Development Only)

**Test User:**
- Email: test@signroad.com
- Password: test123

**Admin User:**
- Create using `scripts/create_admin.py`
- Or set in `.env` for development

⚠️ **Never use default credentials in production!**

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests
4. Submit a pull request

## License

Proprietary - All rights reserved

## Support

For issues or questions, contact: subhanisbhn07@gmail.com
