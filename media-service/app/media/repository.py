"""
Media Module - Repository Layer
"""

from typing import Optional
from app import storage_adapter as storage


class StorageAudioRepository:
    """Repository for audio tracks"""
    
    async def get_all(self, session) -> list[dict]:
        return storage.get_all_audio_tracks()
    
    async def get_by_id(self, session, track_id: str) -> Optional[dict]:
        return storage.get_audio_track(track_id)
    
    async def create(self, session, track_data: dict) -> dict:
        return storage.create_audio_track(track_data)
    
    async def update(self, session, track_id: str, updates: dict) -> Optional[dict]:
        return storage.update_audio_track(track_id, updates)
    
    async def delete(self, session, track_id: str) -> bool:
        return storage.delete_audio_track(track_id)
