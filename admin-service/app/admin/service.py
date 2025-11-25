"""
Admin Module - Service Layer
"""

from typing import List, Optional
import app.storage_adapter as storage


class AdminService:
    """Admin service for content management and statistics"""
    
    async def get_platform_stats(self, session) -> dict:
        """Get platform statistics"""
        users = await storage.get_all_users(session)
        days = await storage.get_all_day_contents(session)
        signs = await storage.get_all_sign_logs(session)
        journals = await storage.get_all_journal_entries(session)
        
        return {
            "total_users": len(users),
            "total_days": len(days),
            "total_signs_logged": len(signs),
            "total_journal_entries": len(journals),
            "active_subscribers": len([u for u in users if u.get('subscription_tier') != 'wanderer'])
        }
    
    # Day Content Management
    async def create_day_content(self, session, day_data: dict) -> dict:
        """Create new day content"""
        return await storage.create_day_content(session, day_data)
    
    async def update_day_content(self, session, day_number: int, updates: dict) -> Optional[dict]:
        """Update day content"""
        return await storage.update_day_content(session, day_number, updates)
    
    async def delete_day_content(self, session, day_number: int) -> bool:
        """Delete day content"""
        return await storage.delete_day_content(session, day_number)
    
    # Audio Track Management
    async def create_audio_track(self, session, track_data: dict) -> dict:
        """Create new audio track"""
        return await storage.create_audio_track(session, track_data)
    
    async def update_audio_track(self, session, track_id: str, updates: dict) -> Optional[dict]:
        """Update audio track"""
        return await storage.update_audio_track(session, track_id, updates)
    
    async def delete_audio_track(self, session, track_id: str) -> bool:
        """Delete audio track"""
        return await storage.delete_audio_track(session, track_id)
    
    # Cosmetic Item Management
    async def create_cosmetic_item(self, session, item_data: dict) -> dict:
        """Create new cosmetic item"""
        return await storage.create_cosmetic_item(session, item_data)
    
    async def update_cosmetic_item(self, session, item_id: str, updates: dict) -> Optional[dict]:
        """Update cosmetic item"""
        return await storage.update_cosmetic_item(session, item_id, updates)
    
    async def delete_cosmetic_item(self, session, item_id: str) -> bool:
        """Delete cosmetic item"""
        return await storage.delete_cosmetic_item(session, item_id)
