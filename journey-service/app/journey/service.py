"""
Journey Module - Service Layer

Business logic for journey progression, signs, and journal.
"""

from typing import Optional
from fastapi import HTTPException
from app.journey.repository import StorageDayContentRepository, StorageSignLogRepository, StorageJournalRepository


class JourneyService:
    """Service for journey progression and content management"""
    
    def __init__(self):
        self.day_repo = StorageDayContentRepository()
        self.sign_repo = StorageSignLogRepository()
        self.journal_repo = StorageJournalRepository()
    
    async def get_day_content(self, session, day_number: int, subscription_tier: str) -> Optional[dict]:
        """Get day content with subscription check"""
        day = await self.day_repo.get_by_number(session, day_number)
        
        if not day:
            raise HTTPException(status_code=404, detail="Day not found")
        
        if day.get('is_premium', False) and subscription_tier == 'wanderer':
            raise HTTPException(status_code=403, detail="Premium subscription required")
        
        return day
    
    async def get_all_days(self, session, subscription_tier: str) -> list[dict]:
        """Get all days filtered by subscription tier"""
        all_days = await self.day_repo.get_all(session)
        
        if subscription_tier == 'wanderer':
            all_days = [day for day in all_days if not day.get('is_premium', False)]
        
        return all_days
    
    async def create_sign_log(self, session, user_id: str, log_data: dict) -> dict:
        """Create a sign log"""
        log_data['user_id'] = user_id
        return await self.sign_repo.create(session, log_data)
    
    async def get_user_sign_logs(self, session, user_id: str) -> list[dict]:
        """Get all sign logs for a user"""
        return await self.sign_repo.get_user_logs(session, user_id)
    
    async def create_journal_entry(self, session, user_id: str, entry_data: dict) -> dict:
        """Create a journal entry"""
        entry_data['user_id'] = user_id
        return await self.journal_repo.create(session, entry_data)
    
    async def get_user_journal_entries(self, session, user_id: str) -> list[dict]:
        """Get all journal entries for a user"""
        return await self.journal_repo.get_user_entries(session, user_id)
    
    async def update_journal_entry(self, session, entry_id: str, user_id: str, content: str) -> dict:
        """Update a journal entry with ownership check"""
        entries = await self.journal_repo.get_user_entries(session, user_id)
        entry = next((e for e in entries if e['id'] == entry_id), None)
        
        if not entry:
            raise HTTPException(status_code=404, detail="Journal entry not found")
        
        if entry['user_id'] != user_id:
            raise HTTPException(status_code=403, detail="Not authorized")
        
        updated = await self.journal_repo.update(session, entry_id, content)
        return updated
    
    async def delete_journal_entry(self, session, entry_id: str, user_id: str) -> bool:
        """Delete a journal entry with ownership check"""
        entries = await self.journal_repo.get_user_entries(session, user_id)
        entry = next((e for e in entries if e['id'] == entry_id), None)
        
        if not entry:
            raise HTTPException(status_code=404, detail="Journal entry not found")
        
        if entry['user_id'] != user_id:
            raise HTTPException(status_code=403, detail="Not authorized")
        
        return await self.journal_repo.delete(session, entry_id)
