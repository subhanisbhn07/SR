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
    forward_to_media_service
)

# Import models for admin endpoints
from app.journey.schemas import DayContent, DayContentCreate, DayContentUpdate
from app.media.schemas import AudioTrack, AudioTrackCreate, AudioTrackUpdate
from app.social.schemas import CosmeticItem, CosmeticItemCreate, CosmeticItemUpdate

# Import auth and storage
from app.auth import get_current_admin
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

@app.get("/healthz")
async def healthz():
    return {
        "status": "ok",
        "message": "SignRoad API is running",
        "architecture": "modular_monolith",
        "version": "2.0.0"
    }

# All module routers now proxied to microservices (Identity, Journey, Social, Media)

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
# ADMIN PANEL ENDPOINTS
# ============================================================================
# Admin endpoints remain in main.py for now (could be extracted to admin module later)

@app.post("/api/admin/days", response_model=DayContent)
async def admin_create_day(
    day_data: DayContentCreate,
    admin: dict = Depends(get_current_admin)
):
    """Admin: Create new day content"""
    day = storage.create_day_content(day_data.dict())
    return DayContent(**day)


@app.put("/api/admin/days/{day_number}", response_model=DayContent)
async def admin_update_day(
    day_number: int,
    updates: DayContentUpdate,
    admin: dict = Depends(get_current_admin)
):
    """Admin: Update day content"""
    update_dict = {k: v for k, v in updates.dict().items() if v is not None}
    day = storage.update_day_content(day_number, update_dict)
    
    if not day:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Day not found")
    
    return DayContent(**day)


@app.delete("/api/admin/days/{day_number}")
async def admin_delete_day(
    day_number: int,
    admin: dict = Depends(get_current_admin)
):
    """Admin: Delete day content"""
    success = storage.delete_day_content(day_number)
    
    if not success:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Day not found")
    
    return {"success": True}


@app.post("/api/admin/audio", response_model=AudioTrack)
async def admin_create_audio(
    track_data: AudioTrackCreate,
    admin: dict = Depends(get_current_admin)
):
    """Admin: Create new audio track"""
    track = storage.create_audio_track(track_data.dict())
    return AudioTrack(**track)


@app.put("/api/admin/audio/{track_id}", response_model=AudioTrack)
async def admin_update_audio(
    track_id: str,
    updates: AudioTrackUpdate,
    admin: dict = Depends(get_current_admin)
):
    """Admin: Update audio track"""
    update_dict = {k: v for k, v in updates.dict().items() if v is not None}
    track = storage.update_audio_track(track_id, update_dict)
    
    if not track:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Audio track not found")
    
    return AudioTrack(**track)


@app.delete("/api/admin/audio/{track_id}")
async def admin_delete_audio(
    track_id: str,
    admin: dict = Depends(get_current_admin)
):
    """Admin: Delete audio track"""
    success = storage.delete_audio_track(track_id)
    
    if not success:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Audio track not found")
    
    return {"success": True}


@app.post("/api/admin/cosmetics", response_model=CosmeticItem)
async def admin_create_cosmetic(
    item_data: CosmeticItemCreate,
    admin: dict = Depends(get_current_admin)
):
    """Admin: Create new cosmetic item"""
    item = storage.create_cosmetic_item(item_data.dict())
    return CosmeticItem(**item)


@app.put("/api/admin/cosmetics/{item_id}", response_model=CosmeticItem)
async def admin_update_cosmetic(
    item_id: str,
    updates: CosmeticItemUpdate,
    admin: dict = Depends(get_current_admin)
):
    """Admin: Update cosmetic item"""
    update_dict = {k: v for k, v in updates.dict().items() if v is not None}
    item = storage.update_cosmetic_item(item_id, update_dict)
    
    if not item:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Cosmetic item not found")
    
    return CosmeticItem(**item)


@app.delete("/api/admin/cosmetics/{item_id}")
async def admin_delete_cosmetic(
    item_id: str,
    admin: dict = Depends(get_current_admin)
):
    """Admin: Delete cosmetic item"""
    success = storage.delete_cosmetic_item(item_id)
    
    if not success:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Cosmetic item not found")
    
    return {"success": True}


@app.get("/api/admin/stats")
async def admin_get_stats(admin: dict = Depends(get_current_admin)):
    """Admin: Get platform statistics"""
    users = storage.get_all_users()
    days = storage.get_all_day_contents()
    signs = storage.get_all_sign_logs()
    journals = storage.get_all_journal_entries()
    
    return {
        "total_users": len(users),
        "total_days": len(days),
        "total_signs_logged": len(signs),
        "total_journal_entries": len(journals),
        "active_subscribers": len([u for u in users if u['subscription_tier'] != 'wanderer'])
    }
