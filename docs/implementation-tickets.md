# SignRoad Implementation Tickets
## Production Readiness Improvements

Based on the CTO-level robustness analysis, here are detailed implementation tickets for all 10 critical improvements needed to make SignRoad production-ready.

---

## Ticket #1: Database Migration (PostgreSQL)
**Priority:** 🔴 CRITICAL  
**Severity:** CRITICAL  
**Estimated Effort:** 1-2 weeks  
**Complexity:** High  
**Dependencies:** None  
**Assignee:** Backend Team

### Description
Replace in-memory storage with PostgreSQL database to enable data persistence and horizontal scalability.

### Current State
- All data stored in Python dictionaries (`storage.py`)
- Data lost on every server restart
- Cannot scale to multiple instances
- No audit trail or backup capability

### Acceptance Criteria
- [ ] PostgreSQL database set up on Fly.io or managed service (AWS RDS, Supabase)
- [ ] SQLAlchemy/SQLModel ORM models defined for all entities
- [ ] Alembic migrations created for schema management
- [ ] All `storage.py` functions refactored to use ORM queries
- [ ] Data persistence verified across server restarts
- [ ] Automated daily backups configured
- [ ] Database connection pooling implemented
- [ ] Health check endpoint includes database connectivity
- [ ] Migration script for any existing test data
- [ ] Documentation updated with database setup instructions

### Technical Details

**Database Schema:**
```sql
-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    subscription_tier VARCHAR(50) DEFAULT 'wanderer',
    current_day INTEGER DEFAULT 1,
    streak INTEGER DEFAULT 0,
    lantern_health INTEGER DEFAULT 100,
    sparks INTEGER DEFAULT 0,
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- User progress table
CREATE TABLE user_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    day_number INTEGER NOT NULL,
    completed_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, day_number)
);

-- Sign logs table
CREATE TABLE sign_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    day_number INTEGER NOT NULL,
    sign_name VARCHAR(255) NOT NULL,
    note TEXT,
    photo_url VARCHAR(500),
    logged_at TIMESTAMP DEFAULT NOW()
);

-- Journal entries table
CREATE TABLE journal_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    day_number INTEGER NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Day content table (static content)
CREATE TABLE day_content (
    day_number INTEGER PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    theme VARCHAR(255),
    meditation_script TEXT NOT NULL,
    sign_challenge VARCHAR(255) NOT NULL,
    sign_description TEXT NOT NULL,
    reflection_prompt TEXT,
    is_special_event BOOLEAN DEFAULT FALSE,
    event_type VARCHAR(50)
);

-- Audio tracks table
CREATE TABLE audio_tracks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    url VARCHAR(500) NOT NULL,
    category VARCHAR(50) NOT NULL,
    duration_seconds INTEGER,
    is_premium BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Cosmetic items table
CREATE TABLE cosmetic_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    spark_cost INTEGER NOT NULL,
    description TEXT,
    image_url VARCHAR(500),
    is_available BOOLEAN DEFAULT TRUE
);

-- User cosmetics (owned items)
CREATE TABLE user_cosmetics (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    cosmetic_id UUID REFERENCES cosmetic_items(id) ON DELETE CASCADE,
    purchased_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (user_id, cosmetic_id)
);

-- Indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX idx_sign_logs_user_id ON sign_logs(user_id);
CREATE INDEX idx_journal_entries_user_id ON journal_entries(user_id);
```

**Implementation Steps:**
1. Add dependencies to `pyproject.toml`:
   ```toml
   [tool.poetry.dependencies]
   sqlalchemy = "^2.0.0"
   alembic = "^1.13.0"
   psycopg2-binary = "^2.9.9"
   asyncpg = "^0.29.0"
   ```

2. Create `signroad-backend/app/database.py`:
   ```python
   from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
   from sqlalchemy.orm import sessionmaker, declarative_base
   import os
   
   DATABASE_URL = os.getenv("DATABASE_URL", "postgresql+asyncpg://localhost/signroad")
   
   engine = create_async_engine(DATABASE_URL, echo=True)
   async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
   Base = declarative_base()
   
   async def get_db():
       async with async_session() as session:
           yield session
   ```

3. Create SQLAlchemy models in `signroad-backend/app/models.py`

4. Initialize Alembic:
   ```bash
   cd signroad-backend
   alembic init alembic
   ```

5. Create initial migration:
   ```bash
   alembic revision --autogenerate -m "Initial schema"
   alembic upgrade head
   ```

6. Refactor all functions in `storage.py` to use database queries

7. Update `main.py` to use database dependency injection

8. Set up database on Fly.io:
   ```bash
   fly postgres create --name signroad-db
   fly postgres attach signroad-db --app signroad-api
   ```

### Testing Checklist
- [ ] Unit tests for all database models
- [ ] Integration tests for CRUD operations
- [ ] Test data persistence across server restarts
- [ ] Test concurrent access (multiple users)
- [ ] Load test with 1000+ users
- [ ] Test database connection failure handling
- [ ] Test migration rollback
- [ ] Verify backup and restore procedures

### Rollback Plan
- Keep `storage.py` as fallback for 1 week
- Add feature flag to switch between in-memory and database
- Monitor error rates after deployment
- If critical issues, revert to in-memory storage

---

## Ticket #2: Remove Hardcoded Credentials & Secrets Management
**Priority:** 🔴 CRITICAL  
**Severity:** CRITICAL  
**Estimated Effort:** 2-3 days  
**Complexity:** Medium  
**Dependencies:** None  
**Assignee:** Backend Team

### Description
Remove all hardcoded credentials and secrets from source code and move to environment variables with proper secrets management.

### Current State
- JWT secret key hardcoded in `auth.py`: `"signroad-secret-key-change-in-production"`
- Admin password hardcoded in `storage.py`: `"admin123"`
- Test user password hardcoded: `"test123"`
- No secrets management system

### Security Risks
- Anyone with repo access can see admin credentials
- JWT secret exposure allows token forgery
- Credentials may leak in logs or error messages
- Compliance violations (GDPR, SOC2)

### Acceptance Criteria
- [ ] All hardcoded secrets removed from source code
- [ ] Environment variables configured for all secrets
- [ ] Fly.io secrets management configured
- [ ] One-time admin setup script created
- [ ] Password policy implemented (min 12 chars, complexity)
- [ ] Rate limiting on login attempts (5 per 15 min per IP)
- [ ] Documentation updated with secrets setup instructions
- [ ] No secrets in git history (if needed, use git-filter-repo)

### Technical Details

**Environment Variables Needed:**
```bash
# JWT Configuration
JWT_SECRET_KEY=<random-256-bit-key>  # Generate with: openssl rand -hex 32
JWT_ALGORITHM=HS256
JWT_ACCESS_TOKEN_EXPIRE_HOURS=24

# Database
DATABASE_URL=postgresql+asyncpg://user:pass@host:5432/signroad

# Admin Setup (only for initial setup)
ADMIN_EMAIL=admin@signroad.com
ADMIN_PASSWORD_HASH=<bcrypt-hash>  # Generate with setup script

# CORS Configuration
ALLOWED_ORIGINS=https://pr-generator-yatdm0kx.devinapps.com,http://localhost:5173

# Environment
ENVIRONMENT=production  # or development, staging
```

**Implementation Steps:**

1. Update `signroad-backend/app/auth.py`:
   ```python
   import os
   
   SECRET_KEY = os.getenv("JWT_SECRET_KEY")
   if not SECRET_KEY:
       raise ValueError("JWT_SECRET_KEY environment variable not set")
   
   ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
   ACCESS_TOKEN_EXPIRE_HOURS = int(os.getenv("JWT_ACCESS_TOKEN_EXPIRE_HOURS", "24"))
   ```

2. Remove hardcoded credentials from `storage.py`:
   ```python
   # DELETE these lines:
   admin_password = "admin123"
   test_password = "test123"
   ```

3. Create `signroad-backend/scripts/create_admin.py`:
   ```python
   import asyncio
   import bcrypt
   import getpass
   from app.database import get_db
   from app.models import User
   
   async def create_admin():
       email = input("Admin email: ")
       password = getpass.getpass("Admin password: ")
       confirm = getpass.getpass("Confirm password: ")
       
       if password != confirm:
           print("Passwords don't match!")
           return
       
       if len(password) < 12:
           print("Password must be at least 12 characters!")
           return
       
       password_hash = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()
       
       async with get_db() as db:
           admin = User(
               email=email,
               password_hash=password_hash,
               name="Admin User",
               is_admin=True,
               subscription_tier="master"
           )
           db.add(admin)
           await db.commit()
       
       print(f"Admin user created: {email}")
   
   if __name__ == "__main__":
       asyncio.run(create_admin())
   ```

4. Set secrets on Fly.io:
   ```bash
   # Generate JWT secret
   JWT_SECRET=$(openssl rand -hex 32)
   
   # Set secrets
   fly secrets set JWT_SECRET_KEY="$JWT_SECRET" --app signroad-api
   fly secrets set DATABASE_URL="postgresql://..." --app signroad-api
   fly secrets set ALLOWED_ORIGINS="https://pr-generator-yatdm0kx.devinapps.com" --app signroad-api
   fly secrets set ENVIRONMENT="production" --app signroad-api
   ```

5. Update `signroad-backend/app/main.py` for CORS:
   ```python
   import os
   
   ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173").split(",")
   
   app.add_middleware(
       CORSMiddleware,
       allow_origins=ALLOWED_ORIGINS,  # No more wildcard!
       allow_credentials=True,
       allow_methods=["GET", "POST", "PUT", "DELETE"],
       allow_headers=["Authorization", "Content-Type"],
   )
   ```

6. Implement password policy in `auth.py`:
   ```python
   import re
   
   def validate_password(password: str) -> tuple[bool, str]:
       if len(password) < 12:
           return False, "Password must be at least 12 characters"
       
       if not re.search(r"[A-Z]", password):
           return False, "Password must contain uppercase letter"
       
       if not re.search(r"[a-z]", password):
           return False, "Password must contain lowercase letter"
       
       if not re.search(r"\d", password):
           return False, "Password must contain number"
       
       if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):
           return False, "Password must contain special character"
       
       return True, "Password is valid"
   ```

7. Add rate limiting on login (using slowapi):
   ```python
   from slowapi import Limiter, _rate_limit_exceeded_handler
   from slowapi.util import get_remote_address
   
   limiter = Limiter(key_func=get_remote_address)
   app.state.limiter = limiter
   
   @app.post("/api/auth/login")
   @limiter.limit("5/minute")  # Max 5 attempts per minute
   async def login(...):
       ...
   ```

### Testing Checklist
- [ ] Verify app fails to start without JWT_SECRET_KEY
- [ ] Verify admin creation script works
- [ ] Verify password policy enforcement
- [ ] Verify rate limiting on login (test with 6+ attempts)
- [ ] Verify CORS only allows whitelisted origins
- [ ] Verify no secrets in source code (grep for "admin123", "test123", etc.)
- [ ] Test on staging environment before production

### Documentation Updates
- [ ] Add `.env.example` file with all required variables
- [ ] Update README with secrets setup instructions
- [ ] Document admin creation process
- [ ] Add troubleshooting guide for common issues

---

## Ticket #3: Authentication Hardening (Email Verification, Password Reset, Refresh Tokens)
**Priority:** 🔴 CRITICAL  
**Severity:** CRITICAL  
**Estimated Effort:** 1-2 weeks  
**Complexity:** Medium-High  
**Dependencies:** #1 (Database Migration), #2 (Secrets Management)  
**Assignee:** Backend Team + Frontend Team

### Description
Implement complete authentication lifecycle including email verification, password reset, refresh tokens, and security audit logging.

### Current State
- JWT tokens valid for 24 hours (too long)
- No refresh token mechanism
- No email verification
- No password reset flow
- No session management or revocation
- No audit trail for security events

### Acceptance Criteria

**Backend:**
- [ ] Short-lived access tokens (15 minutes)
- [ ] Refresh tokens (7 days) stored in database
- [ ] Email verification on registration
- [ ] Password reset flow with time-limited tokens
- [ ] Session management with revocation
- [ ] Security audit log table
- [ ] "Logout all devices" functionality
- [ ] Email service integration (SendGrid/Mailgun/AWS SES)

**Frontend:**
- [ ] Email verification UI
- [ ] "Forgot Password" link and flow
- [ ] Password reset form
- [ ] Active sessions list in profile
- [ ] "Logout all devices" button
- [ ] Token refresh logic (automatic)

### Technical Details

**Database Schema Additions:**
```sql
-- Refresh tokens table
CREATE TABLE refresh_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(500) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    revoked_at TIMESTAMP,
    device_info JSONB
);

-- Email verification tokens
CREATE TABLE email_verification_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(100) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    used_at TIMESTAMP
);

-- Password reset tokens
CREATE TABLE password_reset_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(100) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    used_at TIMESTAMP
);

-- Security audit log
CREATE TABLE security_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    event_type VARCHAR(50) NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    success BOOLEAN NOT NULL,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Add email_verified column to users
ALTER TABLE users ADD COLUMN email_verified BOOLEAN DEFAULT FALSE;
ALTER TABLE users ADD COLUMN email_verified_at TIMESTAMP;

-- Indexes
CREATE INDEX idx_refresh_tokens_user_id ON refresh_tokens(user_id);
CREATE INDEX idx_refresh_tokens_token ON refresh_tokens(token);
CREATE INDEX idx_security_events_user_id ON security_events(user_id);
CREATE INDEX idx_security_events_created_at ON security_events(created_at);
```

**Implementation Steps:**

1. Add email service to `pyproject.toml`:
   ```toml
   [tool.poetry.dependencies]
   sendgrid = "^6.11.0"
   # OR
   python-mailgun = "^0.1.0"
   ```

2. Create `signroad-backend/app/email.py`:
   ```python
   import os
   from sendgrid import SendGridAPIClient
   from sendgrid.helpers.mail import Mail
   
   SENDGRID_API_KEY = os.getenv("SENDGRID_API_KEY")
   FROM_EMAIL = os.getenv("FROM_EMAIL", "noreply@signroad.com")
   
   async def send_verification_email(to_email: str, token: str):
       verify_url = f"https://signroad.com/verify-email?token={token}"
       
       message = Mail(
           from_email=FROM_EMAIL,
           to_emails=to_email,
           subject="Verify your SignRoad email",
           html_content=f"""
           <h1>Welcome to SignRoad!</h1>
           <p>Click the link below to verify your email:</p>
           <a href="{verify_url}">Verify Email</a>
           <p>This link expires in 24 hours.</p>
           """
       )
       
       sg = SendGridAPIClient(SENDGRID_API_KEY)
       response = sg.send(message)
       return response.status_code == 202
   
   async def send_password_reset_email(to_email: str, token: str):
       reset_url = f"https://signroad.com/reset-password?token={token}"
       
       message = Mail(
           from_email=FROM_EMAIL,
           to_emails=to_email,
           subject="Reset your SignRoad password",
           html_content=f"""
           <h1>Password Reset Request</h1>
           <p>Click the link below to reset your password:</p>
           <a href="{reset_url}">Reset Password</a>
           <p>This link expires in 1 hour.</p>
           <p>If you didn't request this, ignore this email.</p>
           """
       )
       
       sg = SendGridAPIClient(SENDGRID_API_KEY)
       response = sg.send(message)
       return response.status_code == 202
   ```

3. Update registration endpoint in `main.py`:
   ```python
   @app.post("/api/auth/register")
   async def register(user_data: RegisterData, db: AsyncSession = Depends(get_db)):
       # Create user with email_verified=False
       user = await create_user(db, user_data)
       
       # Generate verification token
       token = secrets.token_urlsafe(32)
       verification = EmailVerificationToken(
           user_id=user.id,
           token=token,
           expires_at=datetime.utcnow() + timedelta(hours=24)
       )
       db.add(verification)
       await db.commit()
       
       # Send verification email
       await send_verification_email(user.email, token)
       
       return {
           "message": "Registration successful. Please check your email to verify your account.",
           "user_id": user.id
       }
   ```

4. Add email verification endpoint:
   ```python
   @app.post("/api/auth/verify-email")
   async def verify_email(token: str, db: AsyncSession = Depends(get_db)):
       verification = await db.execute(
           select(EmailVerificationToken)
           .where(EmailVerificationToken.token == token)
           .where(EmailVerificationToken.used_at.is_(None))
           .where(EmailVerificationToken.expires_at > datetime.utcnow())
       )
       verification = verification.scalar_one_or_none()
       
       if not verification:
           raise HTTPException(400, "Invalid or expired token")
       
       # Mark user as verified
       user = await db.get(User, verification.user_id)
       user.email_verified = True
       user.email_verified_at = datetime.utcnow()
       verification.used_at = datetime.utcnow()
       await db.commit()
       
       return {"message": "Email verified successfully"}
   ```

5. Implement refresh token logic:
   ```python
   @app.post("/api/auth/refresh")
   async def refresh_token(
       refresh_token: str,
       db: AsyncSession = Depends(get_db)
   ):
       # Validate refresh token
       token_record = await db.execute(
           select(RefreshToken)
           .where(RefreshToken.token == refresh_token)
           .where(RefreshToken.revoked_at.is_(None))
           .where(RefreshToken.expires_at > datetime.utcnow())
       )
       token_record = token_record.scalar_one_or_none()
       
       if not token_record:
           raise HTTPException(401, "Invalid refresh token")
       
       # Generate new access token
       user = await db.get(User, token_record.user_id)
       access_token = create_access_token(user.id, expires_minutes=15)
       
       return {
           "access_token": access_token,
           "token_type": "bearer"
       }
   ```

6. Add password reset endpoints:
   ```python
   @app.post("/api/auth/forgot-password")
   async def forgot_password(email: str, db: AsyncSession = Depends(get_db)):
       user = await get_user_by_email(db, email)
       if not user:
           # Don't reveal if email exists
           return {"message": "If that email exists, we sent a reset link"}
       
       # Generate reset token
       token = secrets.token_urlsafe(32)
       reset = PasswordResetToken(
           user_id=user.id,
           token=token,
           expires_at=datetime.utcnow() + timedelta(hours=1)
       )
       db.add(reset)
       await db.commit()
       
       # Send reset email
       await send_password_reset_email(user.email, token)
       
       return {"message": "If that email exists, we sent a reset link"}
   
   @app.post("/api/auth/reset-password")
   async def reset_password(
       token: str,
       new_password: str,
       db: AsyncSession = Depends(get_db)
   ):
       # Validate token
       reset = await db.execute(
           select(PasswordResetToken)
           .where(PasswordResetToken.token == token)
           .where(PasswordResetToken.used_at.is_(None))
           .where(PasswordResetToken.expires_at > datetime.utcnow())
       )
       reset = reset.scalar_one_or_none()
       
       if not reset:
           raise HTTPException(400, "Invalid or expired token")
       
       # Validate password
       valid, message = validate_password(new_password)
       if not valid:
           raise HTTPException(400, message)
       
       # Update password
       user = await db.get(User, reset.user_id)
       user.password_hash = bcrypt.hashpw(new_password.encode(), bcrypt.gensalt()).decode()
       reset.used_at = datetime.utcnow()
       
       # Revoke all refresh tokens
       await db.execute(
           update(RefreshToken)
           .where(RefreshToken.user_id == user.id)
           .values(revoked_at=datetime.utcnow())
       )
       
       await db.commit()
       
       return {"message": "Password reset successfully"}
   ```

7. Add security audit logging:
   ```python
   async def log_security_event(
       db: AsyncSession,
       user_id: Optional[UUID],
       event_type: str,
       request: Request,
       success: bool,
       metadata: dict = None
   ):
       event = SecurityEvent(
           user_id=user_id,
           event_type=event_type,
           ip_address=request.client.host,
           user_agent=request.headers.get("user-agent"),
           success=success,
           metadata=metadata or {}
       )
       db.add(event)
       await db.commit()
   ```

### Frontend Implementation

1. Create email verification page (`src/pages/VerifyEmail.tsx`)
2. Create forgot password page (`src/pages/ForgotPassword.tsx`)
3. Create reset password page (`src/pages/ResetPassword.tsx`)
4. Add active sessions list to Profile page
5. Implement automatic token refresh in API client
6. Add "Logout all devices" button

### Testing Checklist
- [ ] Test registration with email verification
- [ ] Test email verification flow (valid/invalid/expired tokens)
- [ ] Test forgot password flow
- [ ] Test password reset with valid/invalid/expired tokens
- [ ] Test refresh token generation and usage
- [ ] Test refresh token expiration
- [ ] Test "logout all devices" functionality
- [ ] Test security audit logging for all events
- [ ] Test rate limiting on password reset (prevent abuse)
- [ ] Load test with 1000+ concurrent users

### Email Templates
- [ ] Design professional email templates
- [ ] Add SignRoad branding
- [ ] Test on multiple email clients (Gmail, Outlook, Apple Mail)
- [ ] Add unsubscribe link (if sending marketing emails)

---

## Ticket #4: Rate Limiting, Input Validation, and CORS Hardening
**Priority:** 🟠 HIGH  
**Severity:** HIGH  
**Estimated Effort:** 3-5 days  
**Complexity:** Medium  
**Dependencies:** #2 (Secrets Management for CORS config)  
**Assignee:** Backend Team

### Description
Implement comprehensive rate limiting, enhanced input validation, and tighter CORS configuration to protect against abuse and security vulnerabilities.

### Current State
- No rate limiting on any endpoints
- CORS allows all origins (`*`)
- Basic input validation only
- Vulnerable to DDoS, brute-force, and spam attacks

### Acceptance Criteria
- [ ] Rate limiting implemented on all endpoints
- [ ] CORS restricted to whitelisted domains
- [ ] Enhanced input validation with length limits
- [ ] XSS prevention with Content Security Policy
- [ ] Request size limits
- [ ] IP-based blocking for abusive users
- [ ] Monitoring dashboard for rate limit violations

### Technical Details

**Rate Limiting Strategy:**
```python
# Different limits for different endpoint types
LOGIN_RATE_LIMIT = "5/minute"          # Max 5 login attempts per minute per IP
REGISTER_RATE_LIMIT = "3/hour"         # Max 3 registrations per hour per IP
SIGN_LOG_RATE_LIMIT = "20/hour"        # Max 20 sign logs per hour per user
JOURNAL_RATE_LIMIT = "30/hour"         # Max 30 journal entries per hour per user
API_GENERAL_RATE_LIMIT = "100/minute"  # Max 100 API calls per minute per user
```

**Implementation Steps:**

1. Add slowapi to dependencies:
   ```toml
   [tool.poetry.dependencies]
   slowapi = "^0.1.9"
   redis = "^5.0.0"  # For distributed rate limiting
   ```

2. Set up Redis for rate limiting:
   ```bash
   fly redis create --name signroad-redis
   fly redis attach signroad-redis --app signroad-api
   ```

3. Configure slowapi in `main.py`:
   ```python
   from slowapi import Limiter, _rate_limit_exceeded_handler
   from slowapi.util import get_remote_address
   from slowapi.errors import RateLimitExceeded
   import redis.asyncio as redis
   
   # Redis connection for distributed rate limiting
   redis_client = redis.from_url(os.getenv("REDIS_URL"))
   
   limiter = Limiter(
       key_func=get_remote_address,
       storage_uri=os.getenv("REDIS_URL"),
       default_limits=["100/minute"]  # Global default
   )
   app.state.limiter = limiter
   app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
   ```

4. Apply rate limits to endpoints:
   ```python
   @app.post("/api/auth/login")
   @limiter.limit("5/minute")
   async def login(...):
       ...
   
   @app.post("/api/auth/register")
   @limiter.limit("3/hour")
   async def register(...):
       ...
   
   @app.post("/api/signs")
   @limiter.limit("20/hour")
   async def create_sign_log(...):
       ...
   
   @app.post("/api/journal")
   @limiter.limit("30/hour")
   async def create_journal_entry(...):
       ...
   ```

5. Enhanced input validation:
   ```python
   from pydantic import BaseModel, Field, validator
   import bleach
   
   class SignLogCreate(BaseModel):
       day_number: int = Field(ge=1, le=90)
       sign_name: str = Field(min_length=1, max_length=200)
       note: Optional[str] = Field(max_length=1000)
       photo_base64: Optional[str] = Field(max_length=10_000_000)  # ~7MB
       
       @validator('sign_name', 'note')
       def sanitize_text(cls, v):
           if v:
               # Remove HTML tags to prevent XSS
               return bleach.clean(v, tags=[], strip=True)
           return v
   
   class JournalEntryCreate(BaseModel):
       day_number: int = Field(ge=1, le=90)
       content: str = Field(min_length=1, max_length=10000)
       
       @validator('content')
       def sanitize_content(cls, v):
           # Allow basic formatting but strip dangerous tags
           allowed_tags = ['p', 'br', 'strong', 'em', 'u']
           return bleach.clean(v, tags=allowed_tags, strip=True)
   ```

6. Add Content Security Policy:
   ```python
   from fastapi.middleware.trustedhost import TrustedHostMiddleware
   
   app.add_middleware(
       TrustedHostMiddleware,
       allowed_hosts=["signroad.com", "*.signroad.com", "localhost"]
   )
   
   @app.middleware("http")
   async def add_security_headers(request: Request, call_next):
       response = await call_next(request)
       response.headers["Content-Security-Policy"] = (
           "default-src 'self'; "
           "script-src 'self' 'unsafe-inline'; "
           "style-src 'self' 'unsafe-inline'; "
           "img-src 'self' data: https:; "
           "font-src 'self' data:; "
           "connect-src 'self' https://app-lnhrftkp.fly.dev"
       )
       response.headers["X-Content-Type-Options"] = "nosniff"
       response.headers["X-Frame-Options"] = "DENY"
       response.headers["X-XSS-Protection"] = "1; mode=block"
       return response
   ```

7. Request size limits:
   ```python
   from fastapi.middleware.gzip import GZipMiddleware
   
   app.add_middleware(GZipMiddleware, minimum_size=1000)
   
   @app.middleware("http")
   async def limit_request_size(request: Request, call_next):
       content_length = request.headers.get("content-length")
       if content_length and int(content_length) > 10_000_000:  # 10MB
           raise HTTPException(413, "Request too large")
       return await call_next(request)
   ```

8. IP blocking for abusive users:
   ```python
   # Store in Redis
   BLOCKED_IPS_KEY = "blocked_ips"
   
   @app.middleware("http")
   async def check_blocked_ips(request: Request, call_next):
       ip = request.client.host
       is_blocked = await redis_client.sismember(BLOCKED_IPS_KEY, ip)
       if is_blocked:
           raise HTTPException(403, "Access denied")
       return await call_next(request)
   
   # Admin endpoint to block IPs
   @app.post("/api/admin/block-ip")
   async def block_ip(ip: str, current_user: dict = Depends(require_admin)):
       await redis_client.sadd(BLOCKED_IPS_KEY, ip)
       return {"message": f"IP {ip} blocked"}
   ```

### Frontend Updates
- [ ] Handle 429 (Too Many Requests) errors gracefully
- [ ] Show user-friendly messages for rate limits
- [ ] Add retry logic with exponential backoff
- [ ] Display countdown timer before retry

### Monitoring
- [ ] Dashboard showing rate limit violations by endpoint
- [ ] Alerts for suspicious activity (many failed logins from same IP)
- [ ] Metrics for blocked requests

### Testing Checklist
- [ ] Test rate limiting on all endpoints
- [ ] Test with multiple IPs (verify per-IP limits)
- [ ] Test with authenticated users (verify per-user limits)
- [ ] Test CORS with allowed and disallowed origins
- [ ] Test input validation with malicious payloads
- [ ] Test XSS prevention
- [ ] Test request size limits
- [ ] Load test to verify rate limits don't affect normal users

---

## Ticket #5: Centralized Logging, Monitoring, and Error Tracking
**Priority:** 🟠 HIGH  
**Severity:** HIGH  
**Estimated Effort:** 3-7 days  
**Complexity:** Medium  
**Dependencies:** #1 (Database for storing logs)  
**Assignee:** DevOps Team + Backend Team

### Description
Implement comprehensive observability with structured logging, error tracking, performance monitoring, and uptime monitoring.

### Current State
- Basic `print()` statements only
- No structured logging
- No error tracking
- No performance monitoring
- No uptime monitoring
- Blind to production issues

### Acceptance Criteria
- [ ] Structured logging with request IDs and context
- [ ] Error tracking with Sentry (backend + frontend + mobile)
- [ ] Performance monitoring (API latency, database queries)
- [ ] Uptime monitoring with alerts
- [ ] Metrics dashboard (Grafana + Prometheus)
- [ ] Log aggregation and search
- [ ] Alert rules for critical issues

### Technical Details

**Implementation Steps:**

1. Add logging dependencies:
   ```toml
   [tool.poetry.dependencies]
   structlog = "^24.1.0"
   sentry-sdk = {extras = ["fastapi"], version = "^1.40.0"}
   prometheus-client = "^0.19.0"
   ```

2. Configure structured logging:
   ```python
   import structlog
   import logging
   from uuid import uuid4
   
   structlog.configure(
       processors=[
           structlog.stdlib.filter_by_level,
           structlog.stdlib.add_logger_name,
           structlog.stdlib.add_log_level,
           structlog.stdlib.PositionalArgumentsFormatter(),
           structlog.processors.TimeStamper(fmt="iso"),
           structlog.processors.StackInfoRenderer(),
           structlog.processors.format_exc_info,
           structlog.processors.UnicodeDecoder(),
           structlog.processors.JSONRenderer()
       ],
       context_class=dict,
       logger_factory=structlog.stdlib.LoggerFactory(),
       cache_logger_on_first_use=True,
   )
   
   logger = structlog.get_logger()
   ```

3. Add request logging middleware:
   ```python
   import time
   
   @app.middleware("http")
   async def log_requests(request: Request, call_next):
       request_id = str(uuid4())
       request.state.request_id = request_id
       
       start_time = time.time()
       
       logger.info(
           "request_started",
           request_id=request_id,
           method=request.method,
           path=request.url.path,
           user_id=getattr(request.state, "user_id", None),
           ip=request.client.host,
       )
       
       try:
           response = await call_next(request)
           
           duration_ms = (time.time() - start_time) * 1000
           
           logger.info(
               "request_completed",
               request_id=request_id,
               status_code=response.status_code,
               duration_ms=duration_ms,
           )
           
           response.headers["X-Request-ID"] = request_id
           return response
       except Exception as e:
           logger.error(
               "request_failed",
               request_id=request_id,
               error=str(e),
               duration_ms=(time.time() - start_time) * 1000,
           )
           raise
   ```

4. Configure Sentry:
   ```python
   import sentry_sdk
   from sentry_sdk.integrations.fastapi import FastApiIntegration
   from sentry_sdk.integrations.sqlalchemy import SqlalchemyIntegration
   
   sentry_sdk.init(
       dsn=os.getenv("SENTRY_DSN"),
       integrations=[
           FastApiIntegration(),
           SqlalchemyIntegration(),
       ],
       traces_sample_rate=0.1,  # 10% of requests for performance monitoring
       profiles_sample_rate=0.1,  # 10% for profiling
       environment=os.getenv("ENVIRONMENT", "production"),
       release=os.getenv("GIT_COMMIT_SHA", "unknown"),
   )
   ```

5. Add Prometheus metrics:
   ```python
   from prometheus_client import Counter, Histogram, Gauge, generate_latest
   
   # Metrics
   request_count = Counter(
       "http_requests_total",
       "Total HTTP requests",
       ["method", "endpoint", "status"]
   )
   
   request_duration = Histogram(
       "http_request_duration_seconds",
       "HTTP request duration",
       ["method", "endpoint"]
   )
   
   active_users = Gauge(
       "active_users_total",
       "Number of active users"
   )
   
   db_query_duration = Histogram(
       "db_query_duration_seconds",
       "Database query duration",
       ["query_type"]
   )
   
   @app.get("/metrics")
   async def metrics():
       return Response(generate_latest(), media_type="text/plain")
   ```

6. Set up uptime monitoring:
   ```python
   @app.get("/healthz")
   async def health_check(db: AsyncSession = Depends(get_db)):
       checks = {}
       
       # Check database
       try:
           await db.execute(text("SELECT 1"))
           checks["database"] = "healthy"
       except Exception as e:
           checks["database"] = f"unhealthy: {str(e)}"
       
       # Check Redis
       try:
           await redis_client.ping()
           checks["redis"] = "healthy"
       except Exception as e:
           checks["redis"] = f"unhealthy: {str(e)}"
       
       # Overall status
       all_healthy = all(v == "healthy" for v in checks.values())
       status_code = 200 if all_healthy else 503
       
       return JSONResponse(
           status_code=status_code,
           content={
               "status": "healthy" if all_healthy else "unhealthy",
               "version": os.getenv("GIT_COMMIT_SHA", "unknown"),
               "timestamp": datetime.utcnow().isoformat(),
               "checks": checks
           }
       )
   ```

7. Frontend Sentry setup:
   ```typescript
   import * as Sentry from "@sentry/react";
   import { BrowserTracing } from "@sentry/tracing";
   
   Sentry.init({
     dsn: import.meta.env.VITE_SENTRY_DSN,
     integrations: [new BrowserTracing()],
     tracesSampleRate: 0.1,
     environment: import.meta.env.MODE,
   });
   ```

8. Mobile Sentry setup:
   ```typescript
   import * as Sentry from "@sentry/react-native";
   
   Sentry.init({
     dsn: process.env.SENTRY_DSN,
     tracesSampleRate: 0.1,
     environment: __DEV__ ? "development" : "production",
   });
   ```

### Monitoring Setup

1. **Uptime Monitoring** (Pingdom/UptimeRobot/Healthchecks.io):
   - Monitor `/healthz` endpoint every 1 minute
   - Alert on downtime via email/SMS/Slack
   - Set up status page for users

2. **Grafana Dashboard**:
   - Request rate (requests/second)
   - Error rate (errors/total requests)
   - Latency (p50, p95, p99)
   - Active users
   - Database connection pool usage
   - Memory and CPU usage

3. **Alert Rules**:
   - Error rate > 1% for 5 minutes
   - API latency p95 > 2 seconds for 5 minutes
   - Database connection pool > 80% for 5 minutes
   - Disk usage > 90%
   - Memory usage > 90%

### Testing Checklist
- [ ] Verify structured logs are written correctly
- [ ] Verify request IDs are propagated
- [ ] Verify Sentry captures errors
- [ ] Verify Prometheus metrics are exposed
- [ ] Verify health check endpoint works
- [ ] Verify uptime monitoring alerts work
- [ ] Load test and verify metrics accuracy

---

## Ticket #6: Object Storage for Photos (S3/R2)
**Priority:** 🟠 HIGH  
**Severity:** HIGH  
**Estimated Effort:** 1-2 weeks  
**Complexity:** Medium-High  
**Dependencies:** #1 (Database for storing URLs)  
**Assignee:** Backend Team + Frontend Team

### Description
Migrate photo storage from base64 in JSON to object storage (S3/R2) with CDN for fast delivery.

### Current State
- Photos stored as base64 strings in JSON
- 33% payload size overhead
- Large photos cause slow API responses
- No CDN for fast delivery
- Database bloated with binary data

### Acceptance Criteria
- [ ] S3/R2 buckets created and configured
- [ ] Backend photo upload endpoint with multipart/form-data
- [ ] Frontend updated to use file upload instead of base64
- [ ] Mobile app updated to use file upload
- [ ] Image compression before upload
- [ ] Thumbnail generation for list views
- [ ] CDN configured for fast delivery
- [ ] Signed URLs for private photos
- [ ] Virus scanning for uploaded files

### Technical Details

**Implementation Steps:**

1. Choose object storage provider:
   - **AWS S3**: Most mature, expensive
   - **Cloudflare R2**: S3-compatible, cheaper, no egress fees
   - **Google Cloud Storage**: Good performance, moderate pricing

2. Create buckets:
   ```bash
   # Using AWS S3
   aws s3 mb s3://signroad-user-photos --region us-west-2
   aws s3 mb s3://signroad-user-photos-thumbnails --region us-west-2
   
   # Set bucket policies (private)
   aws s3api put-bucket-policy --bucket signroad-user-photos --policy file://bucket-policy.json
   ```

3. Add dependencies:
   ```toml
   [tool.poetry.dependencies]
   boto3 = "^1.34.0"
   pillow = "^10.2.0"  # For image processing
   python-magic = "^0.4.27"  # For file type detection
   ```

4. Create `signroad-backend/app/storage_service.py`:
   ```python
   import boto3
   from PIL import Image
   import io
   from uuid import uuid4
   import magic
   
   s3_client = boto3.client(
       's3',
       aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
       aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
       region_name=os.getenv("AWS_REGION", "us-west-2")
   )
   
   BUCKET_NAME = os.getenv("S3_BUCKET_NAME", "signroad-user-photos")
   THUMBNAIL_BUCKET = os.getenv("S3_THUMBNAIL_BUCKET", "signroad-user-photos-thumbnails")
   CDN_URL = os.getenv("CDN_URL", f"https://{BUCKET_NAME}.s3.amazonaws.com")
   
   async def upload_photo(
       file: UploadFile,
       user_id: str,
       category: str = "signs"
   ) -> tuple[str, str]:
       # Validate file type
       file_content = await file.read()
       mime_type = magic.from_buffer(file_content, mime=True)
       
       if mime_type not in ["image/jpeg", "image/png", "image/webp"]:
           raise HTTPException(400, "Invalid file type")
       
       # Validate file size (max 10MB)
       if len(file_content) > 10_000_000:
           raise HTTPException(400, "File too large (max 10MB)")
       
       # Generate unique filename
       file_id = str(uuid4())
       ext = file.filename.split(".")[-1] if "." in file.filename else "jpg"
       key = f"users/{user_id}/{category}/{file_id}.{ext}"
       
       # Compress image
       image = Image.open(io.BytesIO(file_content))
       
       # Resize if too large (max 1920px width)
       if image.width > 1920:
           ratio = 1920 / image.width
           new_size = (1920, int(image.height * ratio))
           image = image.resize(new_size, Image.Resampling.LANCZOS)
       
       # Convert to RGB if necessary
       if image.mode in ("RGBA", "P"):
           image = image.convert("RGB")
       
       # Save compressed image
       output = io.BytesIO()
       image.save(output, format="JPEG", quality=85, optimize=True)
       output.seek(0)
       
       # Upload to S3
       s3_client.upload_fileobj(
           output,
           BUCKET_NAME,
           key,
           ExtraArgs={
               "ContentType": "image/jpeg",
               "CacheControl": "max-age=31536000",  # 1 year
           }
       )
       
       # Generate thumbnail
       thumbnail_key = await generate_thumbnail(image, user_id, category, file_id, ext)
       
       # Return URLs
       photo_url = f"{CDN_URL}/{key}"
       thumbnail_url = f"{CDN_URL}/{thumbnail_key}"
       
       return photo_url, thumbnail_url
   
   async def generate_thumbnail(
       image: Image.Image,
       user_id: str,
       category: str,
       file_id: str,
       ext: str
   ) -> str:
       # Create thumbnail (300x300)
       image.thumbnail((300, 300), Image.Resampling.LANCZOS)
       
       # Save thumbnail
       output = io.BytesIO()
       image.save(output, format="JPEG", quality=80, optimize=True)
       output.seek(0)
       
       # Upload to S3
       key = f"users/{user_id}/{category}/thumbnails/{file_id}.{ext}"
       s3_client.upload_fileobj(
           output,
           THUMBNAIL_BUCKET,
           key,
           ExtraArgs={
               "ContentType": "image/jpeg",
               "CacheControl": "max-age=31536000",
           }
       )
       
       return key
   
   async def generate_signed_url(key: str, expires_in: int = 3600) -> str:
       """Generate signed URL for private photos"""
       url = s3_client.generate_presigned_url(
           'get_object',
           Params={'Bucket': BUCKET_NAME, 'Key': key},
           ExpiresIn=expires_in
       )
       return url
   
   async def delete_photo(key: str):
       """Delete photo from S3"""
       s3_client.delete_object(Bucket=BUCKET_NAME, Key=key)
   ```

5. Update sign log endpoint:
   ```python
   @app.post("/api/signs/upload-photo")
   async def upload_sign_photo(
       file: UploadFile,
       current_user: dict = Depends(get_current_user)
   ):
       photo_url, thumbnail_url = await upload_photo(
           file,
           current_user['id'],
           category="signs"
       )
       
       return {
           "photo_url": photo_url,
           "thumbnail_url": thumbnail_url
       }
   
   @app.post("/api/signs")
   async def create_sign_log(
       day_number: int = Form(...),
       sign_name: str = Form(...),
       note: Optional[str] = Form(None),
       photo: Optional[UploadFile] = File(None),
       current_user: dict = Depends(get_current_user),
       db: AsyncSession = Depends(get_db)
   ):
       photo_url = None
       thumbnail_url = None
       
       if photo:
           photo_url, thumbnail_url = await upload_photo(
               photo,
               current_user['id'],
               category="signs"
           )
       
       sign_log = SignLog(
           user_id=current_user['id'],
           day_number=day_number,
           sign_name=sign_name,
           note=note,
           photo_url=photo_url,
           thumbnail_url=thumbnail_url
       )
       db.add(sign_log)
       await db.commit()
       
       return sign_log
   ```

6. Frontend updates:
   ```typescript
   // src/shared/services/api.ts
   export const signAPI = {
     createSignLog: async (data: {
       day_number: number;
       sign_name: string;
       note?: string;
       photo?: File;
     }) => {
       const formData = new FormData();
       formData.append('day_number', data.day_number.toString());
       formData.append('sign_name', data.sign_name);
       if (data.note) formData.append('note', data.note);
       if (data.photo) formData.append('photo', data.photo);
       
       const response = await fetch(`${API_BASE_URL}/api/signs`, {
         method: 'POST',
         headers: {
           'Authorization': `Bearer ${getAuthToken()}`,
         },
         body: formData,
       });
       
       if (!response.ok) throw new Error('Failed to create sign log');
       return response.json();
     },
   };
   ```

7. Mobile app updates:
   ```typescript
   // signroad-mobile/src/services/api.ts
   import * as ImagePicker from 'expo-image-picker';
   
   export const signAPI = {
     createSignLog: async (data: {
       day_number: number;
       sign_name: string;
       note?: string;
       photo?: ImagePicker.ImagePickerAsset;
     }) => {
       const formData = new FormData();
       formData.append('day_number', data.day_number.toString());
       formData.append('sign_name', data.sign_name);
       if (data.note) formData.append('note', data.note);
       
       if (data.photo) {
         const uriParts = data.photo.uri.split('.');
         const fileType = uriParts[uriParts.length - 1];
         
         formData.append('photo', {
           uri: data.photo.uri,
           name: `photo.${fileType}`,
           type: `image/${fileType}`,
         } as any);
       }
       
       const response = await fetch(`${API_BASE_URL}/api/signs`, {
         method: 'POST',
         headers: {
           'Authorization': `Bearer ${await getAuthToken()}`,
         },
         body: formData,
       });
       
       if (!response.ok) throw new Error('Failed to create sign log');
       return response.json();
     },
   };
   ```

8. Configure CDN (CloudFront):
   ```bash
   # Create CloudFront distribution
   aws cloudfront create-distribution \
     --origin-domain-name signroad-user-photos.s3.amazonaws.com \
     --default-root-object index.html
   ```

9. Add virus scanning (ClamAV or cloud service):
   ```python
   import clamd
   
   async def scan_file(file_content: bytes) -> bool:
       cd = clamd.ClamdUnixSocket()
       result = cd.scan_stream(file_content)
       return result['stream'][0] == 'OK'
   ```

### Testing Checklist
- [ ] Test photo upload from web app
- [ ] Test photo upload from mobile app
- [ ] Test large photos (>5MB)
- [ ] Test invalid file types
- [ ] Verify image compression works
- [ ] Verify thumbnail generation
- [ ] Test CDN delivery speed
- [ ] Test signed URLs for private photos
- [ ] Load test with 100+ concurrent uploads

---

## Tickets #7-10: Summary

Due to length constraints, here are summaries of the remaining tickets. Full details can be provided upon request.

### Ticket #7: Horizontal Scalability & Resilience
- Multiple Fly.io instances (min 2, auto-scale to 10)
- Redis for shared state (rate limits, sessions, cache)
- Stateless backend architecture
- Health checks and graceful shutdown
- Load balancing and connection pooling

### Ticket #8: Frontend & Mobile Reliability
- Timeout + retry logic with exponential backoff
- Offline cache (IndexedDB for web, SQLite for mobile)
- Clear UI states (synced, syncing, offline, error)
- Optimistic update reconciliation
- Service worker for offline support

### Ticket #9: Mobile App Testing & Release
- Manual testing on iOS/Android (use testing guide)
- Automated tests (unit + Detox integration)
- Expo EAS builds for iOS and Android
- CI/CD pipeline with GitHub Actions
- TestFlight and Play Store Beta release

### Ticket #10: Backups & Disaster Recovery
- Automated daily database backups
- Monthly restore testing
- Infrastructure as code (Terraform)
- Separate environments (dev, staging, prod)
- Incident response playbook

---

## Implementation Priority Order

**Phase 1 (Weeks 1-6): Foundation**
1. Ticket #1: Database Migration (2 weeks)
2. Ticket #2: Remove Hardcoded Secrets (3 days)
3. Ticket #3: Authentication Hardening (2 weeks)
4. Ticket #5: Logging & Monitoring (1 week)

**Phase 2 (Weeks 7-12): Scalability & Mobile**
5. Ticket #4: Rate Limiting & CORS (5 days)
6. Ticket #7: Horizontal Scalability (2 weeks)
7. Ticket #6: Object Storage (2 weeks)
8. Ticket #9: Mobile Testing & Release (2 weeks)

**Phase 3 (Weeks 13+): Polish & Operations**
9. Ticket #8: Frontend/Mobile Reliability (2 weeks)
10. Ticket #10: Backups & Disaster Recovery (2 weeks)

---

## Cost Summary

**Phase 1 Infrastructure:** ~$81/month
**Phase 2 Infrastructure:** ~$249/month
**Phase 3 Infrastructure:** ~$1,002/month (at 100k users)

**Total Development Time:** 12-16 weeks
**Total Development Cost:** Depends on team size and rates

---

## Success Metrics

**Technical:**
- Uptime: 99.9%
- API Latency: p95 < 500ms
- Error Rate: < 0.1%
- Mobile Crash Rate: < 0.5%

**Business:**
- User Retention: 40% Day 7, 20% Day 30
- Premium Conversion: 10% after Day 14
- Mobile Adoption: 60% of users

---

## Questions for Product Team

1. What is the target launch date?
2. What is the expected user growth rate?
3. What is the budget for infrastructure?
4. Do we need GDPR/SOC2 compliance?
5. Which email service provider should we use?
6. Which object storage provider should we use?
7. Do we need multi-region deployment?
8. What are the SLA requirements?

---

**Document Version:** 1.0  
**Last Updated:** November 24, 2025  
**Author:** Devin AI (CTO Analysis)
