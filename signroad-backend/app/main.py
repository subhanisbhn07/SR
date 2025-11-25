"""
SignRoad API - Modular Monolith Architecture

This is the main FastAPI application that includes all module routers.
Following SOLID principles with clear separation of concerns.
"""

from fastapi import FastAPI, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import os

# Import gateway for microservice forwarding
from app.gateway import (
    forward_to_identity_service,
    forward_to_journey_service,
    forward_to_social_service,
    forward_to_media_service,
    forward_to_admin_service
)

# Import database
from app.database import USE_DATABASE, init_db, close_db
import app.storage_adapter as storage

# Create FastAPI app
app = FastAPI(title="SignRoad API", version="2.0.0 - Modular Architecture")

# Load allowed origins from environment variable
ALLOWED_ORIGINS = os.getenv(
    "ALLOWED_ORIGINS",
    "http://localhost:5173,https://pr-generator-yatdm0kx.devinapps.com"
).split(",")

# CORS middleware with explicit whitelist
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["Authorization", "Content-Type"],
)

# Initialize database and default data on startup
@app.on_event("startup")
async def startup_event():
    if USE_DATABASE:
        await init_db()
        async for session in storage.get_storage_session():
            await storage.initialize_default_data(session)
    else:
        async for session in storage.get_storage_session():
            await storage.initialize_default_data(session)
    print("✅ SignRoad API started successfully (Modular Architecture)")

# Close database connections on shutdown
@app.on_event("shutdown")
async def shutdown_event():
    if USE_DATABASE:
        await close_db()
    print("✅ SignRoad API shut down successfully")

@app.get("/")
async def root():
    """Root endpoint - API information"""
    return {
        "name": "SignRoad API",
        "version": "2.0.0",
        "architecture": "microservices_gateway",
        "status": "running",
        "endpoints": {
            "health": "/healthz",
            "docs": "/docs",
            "openapi": "/openapi.json",
            "circuit_breakers": "/health/circuit-breakers"
        },
        "services": {
            "identity": "Authentication & user management",
            "journey": "Journey progression & content",
            "social": "Social features & cosmetics",
            "media": "Audio & media content",
            "admin": "Admin operations"
        }
    }

@app.get("/healthz")
async def healthz():
    return {
        "status": "ok",
        "message": "SignRoad API is running",
        "architecture": "microservices_gateway",
        "version": "2.0.0"
    }

@app.get("/health/circuit-breakers")
async def circuit_breakers_status():
    """Get status of all circuit breakers"""
    from app.circuit_breaker import get_all_breaker_states
    return get_all_breaker_states()

# All module routers now proxied to microservices (Identity, Journey, Social, Media, Admin)

# ============================================================================
# IDENTITY SERVICE GATEWAY ENDPOINTS
# ============================================================================
# These endpoints proxy authentication requests to the standalone Identity Service

@app.post("/api/auth/register")
async def auth_register_proxy(request: Request):
    """Proxy: Register new user via Identity Service"""
    return await forward_to_identity_service(request, "/api/auth/register")


@app.post("/api/auth/login")
async def auth_login_proxy(request: Request):
    """Proxy: Login via Identity Service"""
    return await forward_to_identity_service(request, "/api/auth/login")


@app.get("/api/auth/me")
async def auth_me_proxy(request: Request):
    """Proxy: Get current user via Identity Service"""
    return await forward_to_identity_service(request, "/api/auth/me")


@app.put("/api/users/settings")
async def users_settings_proxy(request: Request):
    """Proxy: Update user settings via Identity Service"""
    return await forward_to_identity_service(request, "/api/users/settings")


@app.get("/api/admin/users")
async def admin_users_proxy(request: Request):
    """Proxy: Get all users via Identity Service (admin only)"""
    return await forward_to_identity_service(request, "/api/admin/users")


# ============================================================================
# JOURNEY SERVICE GATEWAY ENDPOINTS
# ============================================================================
# These endpoints proxy journey requests to the standalone Journey Service

# Compatibility routes for frontend (old paths)
@app.get("/api/days")
async def days_compat_proxy(request: Request):
    """Proxy: Get all journey days via Journey Service (compatibility route)"""
    return await forward_to_journey_service(request, "/api/journey/days")

@app.get("/api/days/{day_number}")
async def day_detail_compat_proxy(request: Request, day_number: int):
    """Proxy: Get specific day details via Journey Service (compatibility route)"""
    return await forward_to_journey_service(request, f"/api/journey/days/{day_number}")

@app.get("/api/users/progress")
async def users_progress_compat_proxy(request: Request):
    """Proxy: Get user progress via Journey Service (compatibility route)"""
    return await forward_to_journey_service(request, "/api/journey/progress")

@app.post("/api/users/progress")
async def users_update_progress_compat_proxy(request: Request):
    """Proxy: Update user progress via Journey Service (compatibility route)"""
    return await forward_to_journey_service(request, "/api/journey/progress")

@app.get("/api/signs")
async def signs_compat_proxy(request: Request):
    """Proxy: Get user signs via Journey Service (compatibility route)"""
    return await forward_to_journey_service(request, "/api/journey/signs")

@app.post("/api/signs")
async def log_sign_compat_proxy(request: Request):
    """Proxy: Log a sign via Journey Service (compatibility route)"""
    return await forward_to_journey_service(request, "/api/journey/signs")

@app.get("/api/journal")
async def journal_compat_proxy(request: Request):
    """Proxy: Get journal entries via Journey Service (compatibility route)"""
    return await forward_to_journey_service(request, "/api/journey/journal")

@app.post("/api/journal")
async def create_journal_compat_proxy(request: Request):
    """Proxy: Create journal entry via Journey Service (compatibility route)"""
    return await forward_to_journey_service(request, "/api/journey/journal")

@app.get("/api/journal/{entry_id}")
async def journal_detail_compat_proxy(request: Request, entry_id: str):
    """Proxy: Get specific journal entry via Journey Service (compatibility route)"""
    return await forward_to_journey_service(request, f"/api/journey/journal/{entry_id}")

@app.put("/api/journal/{entry_id}")
async def update_journal_compat_proxy(request: Request, entry_id: str):
    """Proxy: Update journal entry via Journey Service (compatibility route)"""
    return await forward_to_journey_service(request, f"/api/journey/journal/{entry_id}")

@app.delete("/api/journal/{entry_id}")
async def delete_journal_compat_proxy(request: Request, entry_id: str):
    """Proxy: Delete journal entry via Journey Service (compatibility route)"""
    return await forward_to_journey_service(request, f"/api/journey/journal/{entry_id}")

# New microservice routes (for future use)
@app.get("/api/journey/days")
async def journey_days_proxy(request: Request):
    """Proxy: Get all journey days via Journey Service"""
    return await forward_to_journey_service(request, "/api/journey/days")


@app.get("/api/journey/days/{day_number}")
async def journey_day_detail_proxy(request: Request, day_number: int):
    """Proxy: Get specific day details via Journey Service"""
    return await forward_to_journey_service(request, f"/api/journey/days/{day_number}")


@app.get("/api/journey/progress")
async def journey_progress_proxy(request: Request):
    """Proxy: Get user progress via Journey Service"""
    return await forward_to_journey_service(request, "/api/journey/progress")


@app.post("/api/journey/progress")
async def journey_update_progress_proxy(request: Request):
    """Proxy: Update user progress via Journey Service"""
    return await forward_to_journey_service(request, "/api/journey/progress")


@app.get("/api/journey/signs")
async def journey_signs_proxy(request: Request):
    """Proxy: Get user signs via Journey Service"""
    return await forward_to_journey_service(request, "/api/journey/signs")


@app.post("/api/journey/signs")
async def journey_log_sign_proxy(request: Request):
    """Proxy: Log a sign via Journey Service"""
    return await forward_to_journey_service(request, "/api/journey/signs")


@app.get("/api/journey/journal")
async def journey_journal_proxy(request: Request):
    """Proxy: Get journal entries via Journey Service"""
    return await forward_to_journey_service(request, "/api/journey/journal")


@app.post("/api/journey/journal")
async def journey_create_journal_proxy(request: Request):
    """Proxy: Create journal entry via Journey Service"""
    return await forward_to_journey_service(request, "/api/journey/journal")


@app.get("/api/journey/journal/{entry_id}")
async def journey_journal_detail_proxy(request: Request, entry_id: str):
    """Proxy: Get specific journal entry via Journey Service"""
    return await forward_to_journey_service(request, f"/api/journey/journal/{entry_id}")


@app.put("/api/journey/journal/{entry_id}")
async def journey_update_journal_proxy(request: Request, entry_id: str):
    """Proxy: Update journal entry via Journey Service"""
    return await forward_to_journey_service(request, f"/api/journey/journal/{entry_id}")


# ============================================================================
# SOCIAL SERVICE GATEWAY ENDPOINTS
# ============================================================================
# These endpoints proxy social requests to the standalone Social Service

@app.get("/api/cosmetics")
async def social_cosmetics_proxy(request: Request):
    """Proxy: Get all cosmetics via Social Service"""
    return await forward_to_social_service(request, "/api/cosmetics")


@app.post("/api/cosmetics/{item_id}/purchase")
async def social_purchase_proxy(request: Request, item_id: str):
    """Proxy: Purchase cosmetic via Social Service"""
    return await forward_to_social_service(request, f"/api/cosmetics/{item_id}/purchase")


# ============================================================================
# MEDIA SERVICE GATEWAY ENDPOINTS
# ============================================================================
# These endpoints proxy media requests to the standalone Media Service

@app.get("/api/audio")
async def media_audio_proxy(request: Request):
    """Proxy: Get all audio tracks via Media Service"""
    return await forward_to_media_service(request, "/api/audio")


# ============================================================================
# ADMIN SERVICE GATEWAY ENDPOINTS
# ============================================================================
# These endpoints proxy admin requests to the standalone Admin Service

@app.get("/api/admin/stats")
async def admin_stats_proxy(request: Request):
    """Proxy: Get platform statistics via Admin Service"""
    return await forward_to_admin_service(request, "/api/admin/stats")


@app.post("/api/admin/days")
async def admin_create_day_proxy(request: Request):
    """Proxy: Create day content via Admin Service"""
    return await forward_to_admin_service(request, "/api/admin/days")


@app.put("/api/admin/days/{day_number}")
async def admin_update_day_proxy(request: Request, day_number: int):
    """Proxy: Update day content via Admin Service"""
    return await forward_to_admin_service(request, f"/api/admin/days/{day_number}")


@app.delete("/api/admin/days/{day_number}")
async def admin_delete_day_proxy(request: Request, day_number: int):
    """Proxy: Delete day content via Admin Service"""
    return await forward_to_admin_service(request, f"/api/admin/days/{day_number}")


@app.post("/api/admin/audio")
async def admin_create_audio_proxy(request: Request):
    """Proxy: Create audio track via Admin Service"""
    return await forward_to_admin_service(request, "/api/admin/audio")


@app.put("/api/admin/audio/{track_id}")
async def admin_update_audio_proxy(request: Request, track_id: str):
    """Proxy: Update audio track via Admin Service"""
    return await forward_to_admin_service(request, f"/api/admin/audio/{track_id}")


@app.delete("/api/admin/audio/{track_id}")
async def admin_delete_audio_proxy(request: Request, track_id: str):
    """Proxy: Delete audio track via Admin Service"""
    return await forward_to_admin_service(request, f"/api/admin/audio/{track_id}")


@app.post("/api/admin/cosmetics")
async def admin_create_cosmetic_proxy(request: Request):
    """Proxy: Create cosmetic item via Admin Service"""
    return await forward_to_admin_service(request, "/api/admin/cosmetics")


@app.put("/api/admin/cosmetics/{item_id}")
async def admin_update_cosmetic_proxy(request: Request, item_id: str):
    """Proxy: Update cosmetic item via Admin Service"""
    return await forward_to_admin_service(request, f"/api/admin/cosmetics/{item_id}")


@app.delete("/api/admin/cosmetics/{item_id}")
async def admin_delete_cosmetic_proxy(request: Request, item_id: str):
    """Proxy: Delete cosmetic item via Admin Service"""
    return await forward_to_admin_service(request, f"/api/admin/cosmetics/{item_id}")
