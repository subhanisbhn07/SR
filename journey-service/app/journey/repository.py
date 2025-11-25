"""
Journey Module - Repository Layer

Data access layer for journey, progress, signs, and journal.
Follows Dependency Inversion Principle.
"""

from typing import Optional, Protocol
from app import storage_adapter as storage


class DayContentRepository(Protocol):
    """Interface for day content data access"""
    
    async def get_by_number(self, session, day_number: int) -> Optional[dict]:
        """Get day content by number"""
        ...
    
    async def get_all(self, session) -> list[dict]:
        """Get all day contents"""
        ...
    
    async def create(self, session, day_data: dict) -> dict:
        """Create day content"""
        ...
    
    async def update(self, session, day_number: int, updates: dict) -> Optional[dict]:
        """Update day content"""
        ...
    
    async def delete(self, session, day_number: int) -> bool:
        """Delete day content"""
        ...


class SignLogRepository(Protocol):
    """Interface for sign log data access"""
    
    async def create(self, session, log_data: dict) -> dict:
        """Create sign log"""
        ...
    
    async def get_user_logs(self, session, user_id: str) -> list[dict]:
        """Get all sign logs for a user"""
        ...
    
    async def get_all(self, session) -> list[dict]:
        """Get all sign logs"""
        ...


class JournalRepository(Protocol):
    """Interface for journal entry data access"""
    
    async def create(self, session, entry_data: dict) -> dict:
        """Create journal entry"""
        ...
    
    async def get_user_entries(self, session, user_id: str) -> list[dict]:
        """Get all journal entries for a user"""
        ...
    
    async def update(self, session, entry_id: str, content: str) -> Optional[dict]:
        """Update journal entry"""
        ...
    
    async def delete(self, session, entry_id: str) -> bool:
        """Delete journal entry"""
        ...
    
    async def get_all(self, session) -> list[dict]:
        """Get all journal entries"""
        ...


class StorageDayContentRepository:
    """Concrete implementation using storage adapter"""
    
    async def get_by_number(self, session, day_number: int) -> Optional[dict]:
        return storage.get_day_content(day_number)
    
    async def get_all(self, session) -> list[dict]:
        return storage.get_all_day_contents()
    
    async def create(self, session, day_data: dict) -> dict:
        return storage.create_day_content(day_data)
    
    async def update(self, session, day_number: int, updates: dict) -> Optional[dict]:
        return storage.update_day_content(day_number, updates)
    
    async def delete(self, session, day_number: int) -> bool:
        return storage.delete_day_content(day_number)


class StorageSignLogRepository:
    """Concrete implementation using storage adapter"""
    
    async def create(self, session, log_data: dict) -> dict:
        return storage.create_sign_log(log_data)
    
    async def get_user_logs(self, session, user_id: str) -> list[dict]:
        return storage.get_user_sign_logs(user_id)
    
    async def get_all(self, session) -> list[dict]:
        return storage.get_all_sign_logs()


class StorageJournalRepository:
    """Concrete implementation using storage adapter"""
    
    async def create(self, session, entry_data: dict) -> dict:
        return storage.create_journal_entry(entry_data)
    
    async def get_user_entries(self, session, user_id: str) -> list[dict]:
        return storage.get_user_journal_entries(user_id)
    
    async def update(self, session, entry_id: str, content: str) -> Optional[dict]:
        return storage.update_journal_entry(entry_id, content)
    
    async def delete(self, session, entry_id: str) -> bool:
        storage.delete_journal_entry(entry_id)
        return True
    
    async def get_all(self, session) -> list[dict]:
        return storage.get_all_journal_entries()
