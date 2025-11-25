"""
Storage adapter that switches between in-memory and database storage.

This module provides a unified interface that automatically uses database storage
when DATABASE_URL is set, and falls back to in-memory storage otherwise.
"""

from app.database import USE_DATABASE, get_db
from typing import Optional, List
import app.storage as memory_storage
import app.db_storage as db_storage


async def get_storage_session():
    """Get database session if using database, otherwise return None"""
    if USE_DATABASE:
        async for session in get_db():
            yield session
    else:
        yield None


# ============================================================================
# USER OPERATIONS
# ============================================================================

async def create_user(session, user_data: dict) -> dict:
    """Create a new user"""
    if USE_DATABASE:
        return await db_storage.create_user(session, user_data)
    else:
        return memory_storage.create_user(user_data)


async def get_user_by_email(session, email: str) -> Optional[dict]:
    """Get user by email"""
    if USE_DATABASE:
        return await db_storage.get_user_by_email(session, email)
    else:
        return memory_storage.get_user_by_email(email)


async def get_user_by_id(session, user_id: str) -> Optional[dict]:
    """Get user by ID"""
    if USE_DATABASE:
        return await db_storage.get_user_by_id(session, user_id)
    else:
        return memory_storage.get_user_by_id(user_id)


async def update_user(session, user_id: str, updates: dict) -> Optional[dict]:
    """Update user"""
    if USE_DATABASE:
        return await db_storage.update_user(session, user_id, updates)
    else:
        return memory_storage.update_user(user_id, updates)


async def get_all_users(session) -> List[dict]:
    """Get all users"""
    if USE_DATABASE:
        return await db_storage.get_all_users(session)
    else:
        return memory_storage.get_all_users()


async def delete_user(session, user_id: str) -> bool:
    """Delete user"""
    if USE_DATABASE:
        return await db_storage.delete_user(session, user_id)
    else:
        return memory_storage.delete_user(user_id)


# ============================================================================
# DAY CONTENT OPERATIONS
# ============================================================================

async def create_day_content(session, content_data: dict) -> dict:
    """Create day content"""
    if USE_DATABASE:
        return await db_storage.create_day_content(session, content_data)
    else:
        return memory_storage.create_day_content(content_data)


async def get_day_content(session, day_number: int) -> Optional[dict]:
    """Get day content by day number"""
    if USE_DATABASE:
        return await db_storage.get_day_content(session, day_number)
    else:
        return memory_storage.get_day_content(day_number)


async def get_all_day_contents(session) -> List[dict]:
    """Get all day contents"""
    if USE_DATABASE:
        return await db_storage.get_all_day_contents(session)
    else:
        return memory_storage.get_all_day_contents()


async def update_day_content(session, day_number: int, updates: dict) -> Optional[dict]:
    """Update day content"""
    if USE_DATABASE:
        return await db_storage.update_day_content(session, day_number, updates)
    else:
        return memory_storage.update_day_content(day_number, updates)


async def delete_day_content(session, day_number: int) -> bool:
    """Delete day content"""
    if USE_DATABASE:
        return await db_storage.delete_day_content(session, day_number)
    else:
        return memory_storage.delete_day_content(day_number)


# ============================================================================
# SIGN LOG OPERATIONS
# ============================================================================

async def create_sign_log(session, log_data: dict) -> dict:
    """Create sign log"""
    if USE_DATABASE:
        return await db_storage.create_sign_log(session, log_data)
    else:
        return memory_storage.create_sign_log(log_data)


async def get_user_sign_logs(session, user_id: str) -> List[dict]:
    """Get all sign logs for a user"""
    if USE_DATABASE:
        return await db_storage.get_user_sign_logs(session, user_id)
    else:
        return memory_storage.get_user_sign_logs(user_id)


async def get_all_sign_logs(session) -> List[dict]:
    """Get all sign logs"""
    if USE_DATABASE:
        return await db_storage.get_all_sign_logs(session)
    else:
        return memory_storage.get_all_sign_logs()


# ============================================================================
# JOURNAL ENTRY OPERATIONS
# ============================================================================

async def create_journal_entry(session, entry_data: dict) -> dict:
    """Create journal entry"""
    if USE_DATABASE:
        return await db_storage.create_journal_entry(session, entry_data)
    else:
        return memory_storage.create_journal_entry(entry_data)


async def get_user_journal_entries(session, user_id: str) -> List[dict]:
    """Get all journal entries for a user"""
    if USE_DATABASE:
        return await db_storage.get_user_journal_entries(session, user_id)
    else:
        return memory_storage.get_user_journal_entries(user_id)


async def update_journal_entry(session, entry_id: str, content: str) -> Optional[dict]:
    """Update journal entry"""
    if USE_DATABASE:
        return await db_storage.update_journal_entry(session, entry_id, content)
    else:
        return memory_storage.update_journal_entry(entry_id, content)


async def delete_journal_entry(session, entry_id: str) -> bool:
    """Delete journal entry"""
    if USE_DATABASE:
        return await db_storage.delete_journal_entry(session, entry_id)
    else:
        return memory_storage.delete_journal_entry(entry_id)


async def get_all_journal_entries(session) -> List[dict]:
    """Get all journal entries"""
    if USE_DATABASE:
        return await db_storage.get_all_journal_entries(session)
    else:
        return memory_storage.get_all_journal_entries()


# ============================================================================
# AUDIO TRACK OPERATIONS
# ============================================================================

async def create_audio_track(session, track_data: dict) -> dict:
    """Create audio track"""
    if USE_DATABASE:
        return await db_storage.create_audio_track(session, track_data)
    else:
        return memory_storage.create_audio_track(track_data)


async def get_audio_track(session, track_id: str) -> Optional[dict]:
    """Get audio track by ID"""
    if USE_DATABASE:
        return await db_storage.get_audio_track(session, track_id)
    else:
        return memory_storage.get_audio_track(track_id)


async def get_all_audio_tracks(session) -> List[dict]:
    """Get all audio tracks"""
    if USE_DATABASE:
        return await db_storage.get_all_audio_tracks(session)
    else:
        return memory_storage.get_all_audio_tracks()


async def update_audio_track(session, track_id: str, updates: dict) -> Optional[dict]:
    """Update audio track"""
    if USE_DATABASE:
        return await db_storage.update_audio_track(session, track_id, updates)
    else:
        return memory_storage.update_audio_track(track_id, updates)


async def delete_audio_track(session, track_id: str) -> bool:
    """Delete audio track"""
    if USE_DATABASE:
        return await db_storage.delete_audio_track(session, track_id)
    else:
        return memory_storage.delete_audio_track(track_id)


# ============================================================================
# COSMETIC ITEM OPERATIONS
# ============================================================================

async def create_cosmetic_item(session, item_data: dict) -> dict:
    """Create cosmetic item"""
    if USE_DATABASE:
        return await db_storage.create_cosmetic_item(session, item_data)
    else:
        return memory_storage.create_cosmetic_item(item_data)


async def get_cosmetic_item(session, item_id: str) -> Optional[dict]:
    """Get cosmetic item by ID"""
    if USE_DATABASE:
        return await db_storage.get_cosmetic_item(session, item_id)
    else:
        return memory_storage.get_cosmetic_item(item_id)


async def get_all_cosmetic_items(session) -> List[dict]:
    """Get all cosmetic items"""
    if USE_DATABASE:
        return await db_storage.get_all_cosmetic_items(session)
    else:
        return memory_storage.get_all_cosmetic_items()


async def update_cosmetic_item(session, item_id: str, updates: dict) -> Optional[dict]:
    """Update cosmetic item"""
    if USE_DATABASE:
        return await db_storage.update_cosmetic_item(session, item_id, updates)
    else:
        return memory_storage.update_cosmetic_item(item_id, updates)


async def delete_cosmetic_item(session, item_id: str) -> bool:
    """Delete cosmetic item"""
    if USE_DATABASE:
        return await db_storage.delete_cosmetic_item(session, item_id)
    else:
        return memory_storage.delete_cosmetic_item(item_id)


# ============================================================================
# INITIALIZATION
# ============================================================================

async def initialize_default_data(session):
    """Initialize default users from environment variables (if provided)"""
    if USE_DATABASE:
        await db_storage.initialize_default_data(session)
    else:
        memory_storage.initialize_default_data()
