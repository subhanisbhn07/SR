"""
Media Module - API Routes
"""

from fastapi import APIRouter, Depends
from typing import List
from app.media.schemas import AudioTrack
from app.media.service import MediaService
from app.auth import get_current_user
from app import storage_adapter as storage

router = APIRouter(prefix="/api", tags=["media"])
media_service = MediaService()


@router.get("/audio", response_model=List[AudioTrack])
async def get_all_audio(
    current_user: dict = Depends(get_current_user),
    session=Depends(storage.get_storage_session)
):
    """Get all audio tracks"""
    tracks = await media_service.get_all_audio(session, current_user['subscription_tier'])
    return tracks
