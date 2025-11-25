"""
Media Module - Service Layer
"""

from app.media.repository import StorageAudioRepository


class MediaService:
    """Service for media management"""
    
    def __init__(self):
        self.audio_repo = StorageAudioRepository()
    
    async def get_all_audio(self, session, subscription_tier: str) -> list[dict]:
        """Get all audio tracks filtered by subscription"""
        tracks = await self.audio_repo.get_all(session)
        
        if subscription_tier == 'wanderer':
            tracks = [track for track in tracks if not track.get('is_premium', False)]
        
        return tracks
