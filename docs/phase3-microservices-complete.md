# Phase 3 Complete - Journey Service Extraction

## Architecture Overview

SignRoad now runs as 3 independent microservices:

### 1. Identity Service (Port 8001)
- **Endpoints**: /api/auth/*, /api/users/*, /api/admin/users
- **Responsibilities**: Authentication, user management, JWT tokens
- **Technology**: FastAPI, Poetry, PostgreSQL

### 2. Journey Service (Port 8002)
- **Endpoints**: /api/journey/*
- **Responsibilities**: Journey progression, days, signs, journal entries
- **Technology**: FastAPI, Poetry, PostgreSQL

### 3. Main Backend (Port 8000)
- **Endpoints**: /api/social/*, /api/media/*, /api/admin/* (content management)
- **Responsibilities**: API Gateway, Social features, Media, Admin panel
- **Technology**: FastAPI, Poetry, PostgreSQL

## Communication Pattern

```
Frontend → Main Backend (Gateway) → Identity Service
                                  → Journey Service
                                  → Local (Social/Media)
```

All requests go through the main backend gateway, which:
- Forwards auth requests to Identity Service
- Forwards journey requests to Journey Service
- Handles social/media requests locally

## Local Testing

All 3 services tested and working:
- ✅ Identity Service: Healthcheck passing
- ✅ Journey Service: Healthcheck passing
- ✅ Main Backend: Healthcheck passing
- ✅ Gateway forwarding: Journey days endpoint working

## Deployment

Each service can be deployed independently to Fly.io:

```bash
# Deploy Identity Service
cd identity-service
fly deploy

# Deploy Journey Service
cd journey-service
fly deploy

# Deploy Main Backend
cd signroad-backend
fly secrets set IDENTITY_SERVICE_URL=https://signroad-identity-service.fly.dev
fly secrets set JOURNEY_SERVICE_URL=https://signroad-journey-service.fly.dev
fly deploy
```

## Benefits

1. **Independent Scaling**: Scale journey service separately from auth
2. **Independent Deployment**: Deploy services without affecting others
3. **Clear Boundaries**: Each service owns its domain
4. **Technology Flexibility**: Can use different tech stacks per service
5. **Team Autonomy**: Different teams can own different services

## Next Steps

- Phase 4: Extract Social Service (optional)
- Phase 5: Extract Media Service (optional)
- Add service discovery (Consul, etcd)
- Add API versioning
- Add circuit breakers for resilience
