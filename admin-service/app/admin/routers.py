"""
Admin Module - API Routes
"""

from fastapi import APIRouter, Depends, HTTPException
from typing import List

from app.admin.service import AdminService
from app.admin.schemas import PlatformStats
from app.journey.schemas import DayContent, DayContentCreate, DayContentUpdate
from app.media.schemas import AudioTrack, AudioTrackCreate, AudioTrackUpdate
from app.social.schemas import CosmeticItem, CosmeticItemCreate, CosmeticItemUpdate
from app.auth import get_current_admin
import app.storage_adapter as storage


router = APIRouter(prefix="/api/admin", tags=["admin"])
admin_service = AdminService()


# Platform Statistics
@router.get("/stats", response_model=PlatformStats)
async def get_platform_stats(
    admin: dict = Depends(get_current_admin),
    session = Depends(storage.get_storage_session)
):
    """Get platform statistics"""
    stats = await admin_service.get_platform_stats(session)
    return PlatformStats(**stats)


# Day Content Management
@router.post("/days", response_model=DayContent)
async def create_day(
    day_data: DayContentCreate,
    admin: dict = Depends(get_current_admin),
    session = Depends(storage.get_storage_session)
):
    """Create new day content"""
    day = await admin_service.create_day_content(session, day_data.dict())
    return DayContent(**day)


@router.put("/days/{day_number}", response_model=DayContent)
async def update_day(
    day_number: int,
    updates: DayContentUpdate,
    admin: dict = Depends(get_current_admin),
    session = Depends(storage.get_storage_session)
):
    """Update day content"""
    update_dict = {k: v for k, v in updates.dict().items() if v is not None}
    day = await admin_service.update_day_content(session, day_number, update_dict)
    
    if not day:
        raise HTTPException(status_code=404, detail="Day not found")
    
    return DayContent(**day)


@router.delete("/days/{day_number}")
async def delete_day(
    day_number: int,
    admin: dict = Depends(get_current_admin),
    session = Depends(storage.get_storage_session)
):
    """Delete day content"""
    success = await admin_service.delete_day_content(session, day_number)
    
    if not success:
        raise HTTPException(status_code=404, detail="Day not found")
    
    return {"success": True}


# Audio Track Management
@router.post("/audio", response_model=AudioTrack)
async def create_audio(
    track_data: AudioTrackCreate,
    admin: dict = Depends(get_current_admin),
    session = Depends(storage.get_storage_session)
):
    """Create new audio track"""
    track = await admin_service.create_audio_track(session, track_data.dict())
    return AudioTrack(**track)


@router.put("/audio/{track_id}", response_model=AudioTrack)
async def update_audio(
    track_id: str,
    updates: AudioTrackUpdate,
    admin: dict = Depends(get_current_admin),
    session = Depends(storage.get_storage_session)
):
    """Update audio track"""
    update_dict = {k: v for k, v in updates.dict().items() if v is not None}
    track = await admin_service.update_audio_track(session, track_id, update_dict)
    
    if not track:
        raise HTTPException(status_code=404, detail="Audio track not found")
    
    return AudioTrack(**track)


@router.delete("/audio/{track_id}")
async def delete_audio(
    track_id: str,
    admin: dict = Depends(get_current_admin),
    session = Depends(storage.get_storage_session)
):
    """Delete audio track"""
    success = await admin_service.delete_audio_track(session, track_id)
    
    if not success:
        raise HTTPException(status_code=404, detail="Audio track not found")
    
    return {"success": True}


# Cosmetic Item Management
@router.post("/cosmetics", response_model=CosmeticItem)
async def create_cosmetic(
    item_data: CosmeticItemCreate,
    admin: dict = Depends(get_current_admin),
    session = Depends(storage.get_storage_session)
):
    """Create new cosmetic item"""
    item = await admin_service.create_cosmetic_item(session, item_data.dict())
    return CosmeticItem(**item)


@router.put("/cosmetics/{item_id}", response_model=CosmeticItem)
async def update_cosmetic(
    item_id: str,
    updates: CosmeticItemUpdate,
    admin: dict = Depends(get_current_admin),
    session = Depends(storage.get_storage_session)
):
    """Update cosmetic item"""
    update_dict = {k: v for k, v in updates.dict().items() if v is not None}
    item = await admin_service.update_cosmetic_item(session, item_id, update_dict)
    
    if not item:
        raise HTTPException(status_code=404, detail="Cosmetic item not found")
    
    return CosmeticItem(**item)


@router.delete("/cosmetics/{item_id}")
async def delete_cosmetic(
    item_id: str,
    admin: dict = Depends(get_current_admin),
    session = Depends(storage.get_storage_session)
):
    """Delete cosmetic item"""
    success = await admin_service.delete_cosmetic_item(session, item_id)
    
    if not success:
        raise HTTPException(status_code=404, detail="Cosmetic item not found")
    
    return {"success": True}
