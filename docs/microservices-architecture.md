# SignRoad Microservices Architecture

## Overview

This document outlines the transformation of SignRoad from a monolithic FastAPI application into a microservices architecture following SOLID principles and domain-driven design.

## Current State (Monolithic Architecture)

### Backend Structure
- **Single FastAPI application** (`signroad-backend/app/main.py`)
- **~30 API endpoints** in one file
- **Flat file structure**: All business logic in main.py
- **Storage layer**: Dual-mode (in-memory + PostgreSQL via storage_adapter)

### Current Domains (Identified from Endpoints)
1. **Authentication & Identity** (3 endpoints)
   - `/api/auth/register` - User registration
   - `/api/auth/login` - User login
   - `/api/auth/me` - Get current user

2. **User Management** (3 endpoints)
   - `/api/users/progress` - Get user progress
   - `/api/users/progress` (POST) - Update progress
   - `/api/users/settings` - Update settings

3. **Journey & Content** (2 endpoints)
   - `/api/days` - Get all days
   - `/api/days/{day_number}` - Get specific day

4. **Sign Logging** (2 endpoints)
   - `/api/signs` (POST) - Create sign log
   - `/api/signs` (GET) - Get user's sign logs

5. **Journal** (4 endpoints)
   - `/api/journal` (POST) - Create entry
   - `/api/journal` (GET) - Get entries
   - `/api/journal/{entry_id}` (PUT) - Update entry
   - `/api/journal/{entry_id}` (DELETE) - Delete entry

6. **Audio** (1 endpoint)
   - `/api/audio` - Get all audio tracks

7. **Cosmetics** (2 endpoints)
   - `/api/cosmetics` - Get all items
   - `/api/cosmetics/{item_id}/purchase` - Purchase item

8. **Admin Panel** (13 endpoints)
   - User management, content management, analytics

### Problems with Current Architecture
1. **Tight Coupling**: All domains in one file, hard to modify independently
2. **No Clear Boundaries**: Business logic mixed with HTTP handling
3. **Difficult to Scale**: Can't scale individual domains independently
4. **Testing Challenges**: Hard to test domains in isolation
5. **Deployment Risk**: One bug can bring down entire system
6. **Team Coordination**: Multiple developers can't work independently

## Target State (Microservices Architecture)

### Service Boundaries (Domain-Driven Design)

#### 1. Identity Service
**Responsibility**: User authentication, authorization, and profile management

**Bounded Context**:
- User registration and login
- JWT token issuance and validation
- User profiles and settings
- Subscription tier management

**Endpoints**:
- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`
- `GET /users/{user_id}`
- `PUT /users/{user_id}/settings`
- `GET /users/{user_id}/subscription`
- `PUT /users/{user_id}/subscription`

**Data Ownership**:
- `users` table
- `subscriptions` table (if separate)
- `user_settings` table

**SOLID Principles Applied**:
- **Single Responsibility**: Only handles identity and access
- **Open/Closed**: Extensible for new auth methods (OAuth, SSO)
- **Liskov Substitution**: Auth providers are interchangeable
- **Interface Segregation**: Separate interfaces for auth vs. profile
- **Dependency Inversion**: Depends on abstractions (UserRepository interface)

#### 2. Journey Service
**Responsibility**: Core product domain - 90-day journey, progress tracking, meditation

**Bounded Context**:
- Day content management
- User progress tracking
- Meditation sessions
- Sign logging
- Journal entries
- Streak and lantern health

**Endpoints**:
- `GET /journey/days`
- `GET /journey/days/{day_number}`
- `GET /journey/progress`
- `POST /journey/progress`
- `POST /journey/signs`
- `GET /journey/signs`
- `POST /journey/journal`
- `GET /journey/journal`
- `PUT /journey/journal/{entry_id}`
- `DELETE /journey/journal/{entry_id}`

**Data Ownership**:
- `day_content` table
- `user_progress` table
- `sign_logs` table
- `journal_entries` table

**SOLID Principles Applied**:
- **Single Responsibility**: Manages journey progression only
- **Open/Closed**: New journey types can be added without modifying core
- **Liskov Substitution**: Different progress trackers are interchangeable
- **Interface Segregation**: Separate interfaces for content vs. progress
- **Dependency Inversion**: Depends on ProgressRepository, ContentRepository interfaces

#### 3. Social Service (Phase 3 - Optional)
**Responsibility**: Social features, engagement, and community

**Bounded Context**:
- Tribes and communities
- Global feed
- Hall of fame
- Cosmetics shop
- Viral features (receipts, twin flames)

**Endpoints**:
- `GET /social/tribes`
- `POST /social/tribes`
- `GET /social/feed`
- `POST /social/feed`
- `GET /social/cosmetics`
- `POST /social/cosmetics/{item_id}/purchase`
- `GET /social/hall-of-fame`

**Data Ownership**:
- `tribes` table
- `feed_posts` table
- `cosmetics` table
- `user_cosmetics` table

**SOLID Principles Applied**:
- **Single Responsibility**: Handles social interactions only
- **Open/Closed**: New social features can be added
- **Liskov Substitution**: Different feed algorithms are interchangeable
- **Interface Segregation**: Separate interfaces for tribes vs. feed vs. shop
- **Dependency Inversion**: Depends on SocialRepository interface

#### 4. Media Service (Phase 3 - Optional)
**Responsibility**: Audio tracks, photo uploads, file management

**Bounded Context**:
- Audio track management
- Photo uploads and storage
- File URL generation
- Media transcoding (future)

**Endpoints**:
- `GET /media/audio`
- `GET /media/audio/{track_id}`
- `POST /media/photos`
- `GET /media/photos/{photo_id}`

**Data Ownership**:
- `audio_tracks` table
- `media_assets` table

**SOLID Principles Applied**:
- **Single Responsibility**: Manages media assets only
- **Open/Closed**: New media types can be added
- **Liskov Substitution**: Different storage providers (S3, R2) are interchangeable
- **Interface Segregation**: Separate interfaces for audio vs. photos
- **Dependency Inversion**: Depends on MediaRepository, StorageProvider interfaces

### API Gateway Pattern

**Purpose**: Single entry point for all client requests

**Responsibilities**:
- Route requests to appropriate services
- Aggregate responses from multiple services
- Handle cross-cutting concerns (CORS, rate limiting, logging)
- JWT validation (can delegate to Identity Service)
- Request/response transformation

**Technology**: Keep existing FastAPI app as gateway, gradually move logic to services

## Implementation Phases

### Phase 1: Modular Monolith (2-3 days)

**Goal**: Restructure backend into clean modules with SOLID principles, keeping single deployment

**Steps**:

1. **Create Module Structure**
   ```
   signroad-backend/
   ├── app/
   │   ├── identity/
   │   │   ├── __init__.py
   │   │   ├── routers.py        # FastAPI routes
   │   │   ├── service.py        # Business logic
   │   │   ├── repository.py     # Data access
   │   │   ├── schemas.py        # Pydantic models
   │   │   └── models.py         # Domain models
   │   ├── journey/
   │   │   ├── __init__.py
   │   │   ├── routers.py
   │   │   ├── service.py
   │   │   ├── repository.py
   │   │   ├── schemas.py
   │   │   └── models.py
   │   ├── social/
   │   │   └── ... (same structure)
   │   ├── media/
   │   │   └── ... (same structure)
   │   ├── shared/
   │   │   ├── database.py       # Shared DB connection
   │   │   ├── dependencies.py   # Shared dependencies
   │   │   └── exceptions.py     # Custom exceptions
   │   └── main.py               # App entry point
   ```

2. **Extract Identity Module**
   - Move auth endpoints to `identity/routers.py`
   - Create `IdentityService` class with business logic
   - Create `UserRepository` interface and implementation
   - Update main.py to include identity router

3. **Extract Journey Module**
   - Move journey/days/signs/journal endpoints to `journey/routers.py`
   - Create `JourneyService`, `ProgressService`, `SignService`, `JournalService`
   - Create repository interfaces and implementations
   - Update main.py to include journey router

4. **Extract Social Module**
   - Move cosmetics endpoints to `social/routers.py`
   - Create `SocialService`, `CosmeticsService`
   - Create repository interfaces
   - Update main.py to include social router

5. **Extract Media Module**
   - Move audio endpoints to `media/routers.py`
   - Create `MediaService`, `AudioService`
   - Create repository interfaces
   - Update main.py to include media router

6. **Update Admin Module**
   - Create `admin/` module with routers for each domain
   - Admin endpoints call domain services

**Benefits**:
- Clear domain boundaries
- SOLID principles applied
- Easier testing (can test services independently)
- Microservice-ready (can extract later)
- Single deployment (low risk)

**Testing**:
- Unit tests for each service
- Integration tests for each module
- End-to-end tests for full flows

### Phase 2: Extract Identity Service (2-3 days)

**Goal**: Create first independent microservice for authentication

**Steps**:

1. **Create New FastAPI App**
   ```
   identity-service/
   ├── app/
   │   ├── main.py
   │   ├── routers.py
   │   ├── service.py
   │   ├── repository.py
   │   ├── schemas.py
   │   └── models.py
   ├── tests/
   ├── Dockerfile
   ├── pyproject.toml
   └── README.md
   ```

2. **Database Schema**
   - Create separate Alembic migrations for identity service
   - Tables: `users`, `subscriptions`, `user_settings`
   - Use same PostgreSQL instance, different schema or prefix

3. **Deploy Identity Service**
   - Deploy to Fly.io as separate app
   - Internal URL: `https://identity-service.fly.dev`
   - Not exposed publicly (only gateway can access)

4. **Update Gateway**
   - Keep existing FastAPI app as gateway
   - Forward `/api/auth/*` and `/api/users/*` to Identity Service
   - Use `httpx` for internal HTTP calls
   - Cache JWT validation results

5. **Update Other Services**
   - Journey/Social/Media services call Identity Service for user info
   - Use JWT claims for basic info (user_id, subscription_tier)
   - Call Identity API for detailed user info when needed

**Benefits**:
- Independent deployment of auth changes
- Can scale Identity Service separately
- Isolated failures (auth issues don't affect journey)
- Team can work on identity independently

**Challenges**:
- Network latency for inter-service calls
- Distributed tracing needed
- More complex deployment

### Phase 3: Extract Additional Services (As Needed)

**Goal**: Extract Journey and Social services if needed

**When to Extract**:
- Team size grows (multiple teams working on different domains)
- Different scaling needs (e.g., social features need more resources)
- Different SLAs (e.g., journey must be 99.9% uptime, social can be 99%)
- Independent release cycles needed

**Steps**: Similar to Phase 2 for each service

## SOLID Principles in Practice

### Single Responsibility Principle (SRP)
- Each service has one reason to change
- `IdentityService` only changes for auth/user requirements
- `JourneyService` only changes for journey requirements
- Each class/function has one job

**Example**:
```python
# BAD: Multiple responsibilities
class UserService:
    def register(self, email, password):
        # Validates email
        # Hashes password
        # Saves to DB
        # Sends welcome email
        # Creates default progress
        pass

# GOOD: Single responsibility
class UserRegistrationService:
    def __init__(self, user_repo, email_service, progress_service):
        self.user_repo = user_repo
        self.email_service = email_service
        self.progress_service = progress_service
    
    def register(self, email, password):
        user = self.user_repo.create(email, password)
        self.email_service.send_welcome(user)
        self.progress_service.initialize(user.id)
        return user
```

### Open/Closed Principle (OCP)
- Services are open for extension, closed for modification
- Use interfaces/protocols for extensibility

**Example**:
```python
# Interface for storage providers
class StorageProvider(Protocol):
    async def upload(self, file: bytes, path: str) -> str:
        ...
    
    async def download(self, path: str) -> bytes:
        ...

# Implementations
class S3StorageProvider(StorageProvider):
    async def upload(self, file: bytes, path: str) -> str:
        # S3 upload logic
        pass

class LocalStorageProvider(StorageProvider):
    async def upload(self, file: bytes, path: str) -> str:
        # Local file system logic
        pass

# Service depends on interface, not implementation
class MediaService:
    def __init__(self, storage: StorageProvider):
        self.storage = storage
    
    async def upload_photo(self, photo: bytes) -> str:
        return await self.storage.upload(photo, "photos/")
```

### Liskov Substitution Principle (LSP)
- Subtypes must be substitutable for their base types
- All repository implementations must honor the interface contract

**Example**:
```python
class UserRepository(Protocol):
    async def get_by_id(self, user_id: str) -> Optional[User]:
        ...
    
    async def create(self, user_data: dict) -> User:
        ...

# Both implementations honor the contract
class PostgresUserRepository(UserRepository):
    async def get_by_id(self, user_id: str) -> Optional[User]:
        # Returns User or None, never raises
        pass

class InMemoryUserRepository(UserRepository):
    async def get_by_id(self, user_id: str) -> Optional[User]:
        # Returns User or None, never raises
        pass
```

### Interface Segregation Principle (ISP)
- Clients shouldn't depend on interfaces they don't use
- Split large interfaces into smaller, focused ones

**Example**:
```python
# BAD: Fat interface
class UserRepository:
    def get_by_id(self, user_id): ...
    def get_by_email(self, email): ...
    def create(self, user_data): ...
    def update_progress(self, user_id, progress): ...
    def update_settings(self, user_id, settings): ...
    def get_all_for_admin(self): ...

# GOOD: Segregated interfaces
class UserReader:
    def get_by_id(self, user_id): ...
    def get_by_email(self, email): ...

class UserWriter:
    def create(self, user_data): ...
    def update(self, user_id, updates): ...

class UserProgressWriter:
    def update_progress(self, user_id, progress): ...

class AdminUserReader:
    def get_all(self): ...
```

### Dependency Inversion Principle (DIP)
- High-level modules shouldn't depend on low-level modules
- Both should depend on abstractions

**Example**:
```python
# BAD: Service depends on concrete implementation
class JourneyService:
    def __init__(self):
        self.db = PostgresDatabase()  # Concrete dependency
    
    def get_day(self, day_number):
        return self.db.query("SELECT * FROM days WHERE number = ?", day_number)

# GOOD: Service depends on abstraction
class JourneyService:
    def __init__(self, day_repo: DayRepository):  # Abstract dependency
        self.day_repo = day_repo
    
    async def get_day(self, day_number: int) -> Day:
        return await self.day_repo.get_by_number(day_number)
```

## Inter-Service Communication

### Synchronous (HTTP/REST)
- Use for real-time operations (login, get user info)
- Gateway forwards requests to services
- Services call each other via HTTP when needed

**Example**:
```python
# Journey Service calling Identity Service
class JourneyService:
    def __init__(self, identity_client: IdentityClient):
        self.identity_client = identity_client
    
    async def get_day_with_user_info(self, day_number: int, user_id: str):
        day = await self.day_repo.get_by_number(day_number)
        user = await self.identity_client.get_user(user_id)
        return {**day, "user": user}
```

### Asynchronous (Events) - Future
- Use for non-critical operations (analytics, notifications)
- Pub/sub pattern with message queue (RabbitMQ, Redis)
- Services publish events, other services subscribe

**Example**:
```python
# User registered event
@app.post("/auth/register")
async def register(user_data: UserCreate):
    user = await identity_service.register(user_data)
    await event_bus.publish("user.registered", {"user_id": user.id})
    return user

# Journey Service subscribes to user.registered
@event_bus.subscribe("user.registered")
async def initialize_journey(event):
    await journey_service.initialize_progress(event["user_id"])
```

## Database Strategy

### Phase 1 (Modular Monolith)
- Single PostgreSQL database
- Each module owns its tables
- No cross-module table access (use services)

### Phase 2 (Identity Service Extracted)
- Single PostgreSQL instance
- Separate schemas: `identity`, `journey`, `social`, `media`
- Each service only accesses its schema

### Phase 3 (Multiple Services)
- Option A: Single PostgreSQL with schemas (simpler ops)
- Option B: Separate databases per service (true isolation)

**Data Sharing**:
- No direct database access across services
- Use APIs for data access
- Denormalize when needed (e.g., cache user names in Social Service)
- Use events for eventual consistency

## Deployment Architecture

### Current (Monolith)
```
[Web App] → [FastAPI Backend] → [PostgreSQL]
[Mobile App] ↗
```

### Phase 1 (Modular Monolith)
```
[Web App] → [FastAPI Backend (modular)] → [PostgreSQL]
[Mobile App] ↗
```

### Phase 2 (Identity Service Extracted)
```
[Web App] → [API Gateway] → [Identity Service] → [PostgreSQL]
[Mobile App] ↗         ↓
                  [Journey Service] → [PostgreSQL]
```

### Phase 3 (Full Microservices)
```
[Web App] → [API Gateway] → [Identity Service] → [PostgreSQL]
[Mobile App] ↗         ↓
                  [Journey Service] → [PostgreSQL]
                       ↓
                  [Social Service] → [PostgreSQL]
                       ↓
                  [Media Service] → [S3/R2]
```

## Testing Strategy

### Unit Tests
- Test each service class in isolation
- Mock dependencies (repositories, external services)
- Fast, run on every commit

### Integration Tests
- Test service + repository + database
- Use test database
- Run before deployment

### Contract Tests
- Test API contracts between services
- Ensure Identity Service API matches what Journey Service expects
- Use tools like Pact

### End-to-End Tests
- Test full user flows across services
- Use staging environment
- Run before production deployment

## Monitoring & Observability

### Logging
- Structured logging (JSON format)
- Correlation IDs for tracing requests across services
- Log levels: DEBUG, INFO, WARNING, ERROR

### Metrics
- Request rate, latency, error rate per service
- Database query performance
- Inter-service call latency

### Tracing
- Distributed tracing with OpenTelemetry
- Trace requests from gateway through all services
- Identify bottlenecks

### Alerting
- Alert on high error rates
- Alert on slow response times
- Alert on service downtime

## Migration Checklist

### Phase 1: Modular Monolith
- [ ] Create module structure (identity, journey, social, media)
- [ ] Extract Identity module with routers, services, repositories
- [ ] Extract Journey module with routers, services, repositories
- [ ] Extract Social module with routers, services, repositories
- [ ] Extract Media module with routers, services, repositories
- [ ] Update main.py to include all routers
- [ ] Write unit tests for each service
- [ ] Write integration tests for each module
- [ ] Run full test suite
- [ ] Deploy to staging
- [ ] Run end-to-end tests
- [ ] Deploy to production
- [ ] Monitor for issues

### Phase 2: Extract Identity Service
- [ ] Create identity-service repository
- [ ] Set up FastAPI app for identity service
- [ ] Create Alembic migrations for identity schema
- [ ] Deploy identity service to Fly.io
- [ ] Update gateway to forward auth requests
- [ ] Update Journey/Social/Media to call Identity Service
- [ ] Write contract tests between gateway and identity service
- [ ] Deploy to staging
- [ ] Run end-to-end tests
- [ ] Deploy to production
- [ ] Monitor inter-service communication
- [ ] Set up distributed tracing

### Phase 3: Extract Additional Services
- [ ] Repeat Phase 2 steps for Journey Service
- [ ] Repeat Phase 2 steps for Social Service
- [ ] Repeat Phase 2 steps for Media Service

## Timeline Estimates

- **Phase 1 (Modular Monolith)**: 2-3 days
- **Phase 2 (Identity Service)**: 2-3 days
- **Phase 3 (Additional Services)**: 3-5 days per service

**Total**: 7-11 days for full microservices architecture

## Benefits Summary

### Technical Benefits
- **Scalability**: Scale services independently based on load
- **Resilience**: Isolated failures (one service down doesn't affect others)
- **Maintainability**: Clear boundaries, easier to understand and modify
- **Testability**: Test services in isolation
- **Deployment**: Deploy services independently, reduce risk

### Business Benefits
- **Team Autonomy**: Teams can work on different services independently
- **Faster Development**: Parallel development on different domains
- **Technology Flexibility**: Use different tech stacks per service if needed
- **Cost Optimization**: Scale only what needs scaling

### SOLID Benefits
- **Single Responsibility**: Each service has one job
- **Open/Closed**: Easy to extend without modifying existing code
- **Liskov Substitution**: Implementations are interchangeable
- **Interface Segregation**: Clean, focused interfaces
- **Dependency Inversion**: Loosely coupled, testable code

## Risks & Mitigation

### Risk: Increased Complexity
**Mitigation**: Start with modular monolith, extract services only when needed

### Risk: Network Latency
**Mitigation**: Use caching, async communication where possible, co-locate services

### Risk: Distributed Transactions
**Mitigation**: Design for eventual consistency, use saga pattern for complex flows

### Risk: Debugging Difficulty
**Mitigation**: Implement distributed tracing, structured logging, correlation IDs

### Risk: Deployment Overhead
**Mitigation**: Use CI/CD pipelines, infrastructure as code, automated testing

## Next Steps

1. **Review this architecture document** with team/stakeholders
2. **Start Phase 1**: Create modular monolith structure
3. **Test thoroughly** at each phase
4. **Monitor and iterate** based on real-world usage
5. **Extract services** only when there's a clear need

---

**Document Version**: 1.0  
**Last Updated**: 2025-11-25  
**Author**: Devin AI  
**Status**: Draft - Ready for Implementation
