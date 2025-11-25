# SignRoad Microservices Deployment Guide

## Overview
SignRoad has been transformed into a production-ready microservices architecture with 6 independent services, Redis caching, and circuit breakers.

## Architecture

### Services
1. **Gateway** (Port 8000) - API Gateway with circuit breakers
2. **Identity Service** (Port 8001) - Authentication & user management
3. **Journey Service** (Port 8002) - Journey progression & content
4. **Social Service** (Port 8003) - Social features & cosmetics
5. **Media Service** (Port 8004) - Audio & media content
6. **Admin Service** (Port 8005) - Admin operations

### Infrastructure
- **Redis** - Caching layer for all services
- **Circuit Breakers** - Fault tolerance for inter-service communication
- **Rate Limiting** - API protection (100 requests/minute per IP)
- **Structured Logging** - JSON logs with correlation IDs
- **Health Checks** - Basic and detailed health endpoints

## Deployment to Fly.io

### Prerequisites
- Fly.io account and CLI installed (`fly auth login`)

### Step 1: Deploy Redis
```bash
fly redis create signroad-redis --region sjc
```

### Step 2: Deploy Services (in order)

#### 1. Identity Service
```bash
cd identity-service
fly deploy
fly secrets set JWT_SECRET_KEY=$(openssl rand -hex 32)
fly secrets set REDIS_URL=<redis-connection-string>
```

#### 2. Journey Service
```bash
cd journey-service
fly deploy
fly secrets set JWT_SECRET_KEY=<same-as-identity>
fly secrets set REDIS_URL=<redis-connection-string>
```

#### 3. Social Service
```bash
cd social-service
fly deploy
fly secrets set JWT_SECRET_KEY=<same-as-identity>
fly secrets set REDIS_URL=<redis-connection-string>
```

#### 4. Media Service
```bash
cd media-service
fly deploy
fly secrets set JWT_SECRET_KEY=<same-as-identity>
fly secrets set REDIS_URL=<redis-connection-string>
```

#### 5. Admin Service
```bash
cd admin-service
fly deploy
fly secrets set JWT_SECRET_KEY=<same-as-identity>
fly secrets set REDIS_URL=<redis-connection-string>
```

#### 6. Gateway
```bash
cd signroad-backend
fly deploy
fly secrets set JWT_SECRET_KEY=<same-as-identity>
fly secrets set IDENTITY_SERVICE_URL=https://signroad-identity-service.fly.dev
fly secrets set JOURNEY_SERVICE_URL=https://signroad-journey-service.fly.dev
fly secrets set SOCIAL_SERVICE_URL=https://signroad-social-service.fly.dev
fly secrets set MEDIA_SERVICE_URL=https://signroad-media-service.fly.dev
fly secrets set ADMIN_SERVICE_URL=https://signroad-admin-service.fly.dev
```

### Step 3: Update Frontend
```bash
VITE_API_BASE_URL=https://<your-gateway-url>.fly.dev
```

## Health Checks
- `GET /healthz` - Basic health check
- `GET /health/detailed` - Detailed health with system metrics
- `GET /health/circuit-breakers` - Circuit breaker status (Gateway only)

## API Documentation
- `/docs` - Swagger UI
- `/redoc` - ReDoc UI
- `/openapi.json` - OpenAPI spec
