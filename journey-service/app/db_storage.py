"""
Database storage operations using SQLAlchemy.

This module provides CRUD operations for all entities using the database.
Falls back to in-memory storage if DATABASE_URL is not set.
"""

from sqlalchemy import select, delete
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional
import bcrypt

from app import db_models
from app.database import USE_DATABASE


# ============================================================================
# USER OPERATIONS
# ============================================================================

async def create_user(db: AsyncSession, user_data: dict) -> dict:
    """Create a new user in the database"""
    user = db_models.User(**user_data)
    db.add(user)
    await db.flush()
    await db.refresh(user)
    return user.to_dict()


async def get_user_by_email(db: AsyncSession, email: str) -> Optional[dict]:
    """Get user by email"""
    result = await db.execute(select(db_models.User).where(db_models.User.email == email))
    user = result.scalar_one_or_none()
    return user.to_dict() if user else None


async def get_user_by_id(db: AsyncSession, user_id: str) -> Optional[dict]:
    """Get user by ID"""
    result = await db.execute(select(db_models.User).where(db_models.User.id == user_id))
    user = result.scalar_one_or_none()
    return user.to_dict() if user else None


async def update_user(db: AsyncSession, user_id: str, updates: dict) -> Optional[dict]:
    """Update user"""
    result = await db.execute(select(db_models.User).where(db_models.User.id == user_id))
    user = result.scalar_one_or_none()
    if not user:
        return None
    
    for key, value in updates.items():
        setattr(user, key, value)
    
    await db.flush()
    await db.refresh(user)
    return user.to_dict()


async def get_all_users(db: AsyncSession) -> List[dict]:
    """Get all users"""
    result = await db.execute(select(db_models.User))
    users = result.scalars().all()
    return [user.to_dict() for user in users]


async def delete_user(db: AsyncSession, user_id: str) -> bool:
    """Delete user"""
    result = await db.execute(delete(db_models.User).where(db_models.User.id == user_id))
    return result.rowcount > 0


# ============================================================================
# DAY CONTENT OPERATIONS
# ============================================================================

async def create_day_content(db: AsyncSession, content_data: dict) -> dict:
    """Create day content"""
    content = db_models.DayContent(**content_data)
    db.add(content)
    await db.flush()
    await db.refresh(content)
    return {
        "id": content.id,
        "day_number": content.day_number,
        "title": content.title,
        "theme": content.theme,
        "meditation_script": content.meditation_script,
        "sign_challenge": content.sign_challenge,
        "sign_description": content.sign_description,
        "reflection_prompt": content.reflection_prompt,
        "is_special_event": content.is_special_event,
        "event_type": content.event_type,
        "is_premium": content.is_premium,
        "sparks_reward": content.sparks_reward,
    }


async def get_day_content(db: AsyncSession, day_number: int) -> Optional[dict]:
    """Get day content by day number"""
    result = await db.execute(
        select(db_models.DayContent).where(db_models.DayContent.day_number == day_number)
    )
    content = result.scalar_one_or_none()
    if not content:
        return None
    return {
        "id": content.id,
        "day_number": content.day_number,
        "title": content.title,
        "theme": content.theme,
        "meditation_script": content.meditation_script,
        "sign_challenge": content.sign_challenge,
        "sign_description": content.sign_description,
        "reflection_prompt": content.reflection_prompt,
        "is_special_event": content.is_special_event,
        "event_type": content.event_type,
        "is_premium": content.is_premium,
        "sparks_reward": content.sparks_reward,
    }


async def get_all_day_contents(db: AsyncSession) -> List[dict]:
    """Get all day contents"""
    result = await db.execute(select(db_models.DayContent).order_by(db_models.DayContent.day_number))
    contents = result.scalars().all()
    return [
        {
            "id": content.id,
            "day_number": content.day_number,
            "title": content.title,
            "theme": content.theme,
            "meditation_script": content.meditation_script,
            "sign_challenge": content.sign_challenge,
            "sign_description": content.sign_description,
            "reflection_prompt": content.reflection_prompt,
            "is_special_event": content.is_special_event,
            "event_type": content.event_type,
            "is_premium": content.is_premium,
            "sparks_reward": content.sparks_reward,
        }
        for content in contents
    ]


async def update_day_content(db: AsyncSession, day_number: int, updates: dict) -> Optional[dict]:
    """Update day content"""
    result = await db.execute(
        select(db_models.DayContent).where(db_models.DayContent.day_number == day_number)
    )
    content = result.scalar_one_or_none()
    if not content:
        return None
    
    for key, value in updates.items():
        setattr(content, key, value)
    
    await db.flush()
    await db.refresh(content)
    return {
        "id": content.id,
        "day_number": content.day_number,
        "title": content.title,
        "theme": content.theme,
        "meditation_script": content.meditation_script,
        "sign_challenge": content.sign_challenge,
        "sign_description": content.sign_description,
        "reflection_prompt": content.reflection_prompt,
        "is_special_event": content.is_special_event,
        "event_type": content.event_type,
        "is_premium": content.is_premium,
        "sparks_reward": content.sparks_reward,
    }


async def delete_day_content(db: AsyncSession, day_number: int) -> bool:
    """Delete day content"""
    result = await db.execute(
        delete(db_models.DayContent).where(db_models.DayContent.day_number == day_number)
    )
    return result.rowcount > 0


# ============================================================================
# SIGN LOG OPERATIONS
# ============================================================================

async def create_sign_log(db: AsyncSession, log_data: dict) -> dict:
    """Create sign log"""
    log = db_models.SignLog(**log_data)
    db.add(log)
    await db.flush()
    await db.refresh(log)
    return {
        "id": log.id,
        "user_id": log.user_id,
        "day_number": log.day_number,
        "sign_name": log.sign_name,
        "note": log.note,
        "photo_url": log.photo_url,
        "logged_at": log.logged_at,
    }


async def get_user_sign_logs(db: AsyncSession, user_id: str) -> List[dict]:
    """Get all sign logs for a user"""
    result = await db.execute(
        select(db_models.SignLog)
        .where(db_models.SignLog.user_id == user_id)
        .order_by(db_models.SignLog.logged_at.desc())
    )
    logs = result.scalars().all()
    return [
        {
            "id": log.id,
            "user_id": log.user_id,
            "day_number": log.day_number,
            "sign_name": log.sign_name,
            "note": log.note,
            "photo_url": log.photo_url,
            "logged_at": log.logged_at,
        }
        for log in logs
    ]


async def get_all_sign_logs(db: AsyncSession) -> List[dict]:
    """Get all sign logs"""
    result = await db.execute(select(db_models.SignLog).order_by(db_models.SignLog.logged_at.desc()))
    logs = result.scalars().all()
    return [
        {
            "id": log.id,
            "user_id": log.user_id,
            "day_number": log.day_number,
            "sign_name": log.sign_name,
            "note": log.note,
            "photo_url": log.photo_url,
            "logged_at": log.logged_at,
        }
        for log in logs
    ]


# ============================================================================
# JOURNAL ENTRY OPERATIONS
# ============================================================================

async def create_journal_entry(db: AsyncSession, entry_data: dict) -> dict:
    """Create journal entry"""
    entry = db_models.JournalEntry(**entry_data)
    db.add(entry)
    await db.flush()
    await db.refresh(entry)
    return {
        "id": entry.id,
        "user_id": entry.user_id,
        "day_number": entry.day_number,
        "content": entry.content,
        "prompt": entry.prompt,
        "is_public": entry.is_public,
        "created_at": entry.created_at,
        "updated_at": entry.updated_at,
    }


async def get_user_journal_entries(db: AsyncSession, user_id: str) -> List[dict]:
    """Get all journal entries for a user"""
    result = await db.execute(
        select(db_models.JournalEntry)
        .where(db_models.JournalEntry.user_id == user_id)
        .order_by(db_models.JournalEntry.created_at.desc())
    )
    entries = result.scalars().all()
    return [
        {
            "id": entry.id,
            "user_id": entry.user_id,
            "day_number": entry.day_number,
            "content": entry.content,
            "prompt": entry.prompt,
            "is_public": entry.is_public,
            "created_at": entry.created_at,
            "updated_at": entry.updated_at,
        }
        for entry in entries
    ]


async def update_journal_entry(db: AsyncSession, entry_id: str, content: str) -> Optional[dict]:
    """Update journal entry"""
    result = await db.execute(select(db_models.JournalEntry).where(db_models.JournalEntry.id == entry_id))
    entry = result.scalar_one_or_none()
    if not entry:
        return None
    
    entry.content = content
    await db.flush()
    await db.refresh(entry)
    return {
        "id": entry.id,
        "user_id": entry.user_id,
        "day_number": entry.day_number,
        "content": entry.content,
        "prompt": entry.prompt,
        "is_public": entry.is_public,
        "created_at": entry.created_at,
        "updated_at": entry.updated_at,
    }


async def delete_journal_entry(db: AsyncSession, entry_id: str) -> bool:
    """Delete journal entry"""
    result = await db.execute(delete(db_models.JournalEntry).where(db_models.JournalEntry.id == entry_id))
    return result.rowcount > 0


async def get_all_journal_entries(db: AsyncSession) -> List[dict]:
    """Get all journal entries"""
    result = await db.execute(select(db_models.JournalEntry).order_by(db_models.JournalEntry.created_at.desc()))
    entries = result.scalars().all()
    return [
        {
            "id": entry.id,
            "user_id": entry.user_id,
            "day_number": entry.day_number,
            "content": entry.content,
            "prompt": entry.prompt,
            "is_public": entry.is_public,
            "created_at": entry.created_at,
            "updated_at": entry.updated_at,
        }
        for entry in entries
    ]


# ============================================================================
# AUDIO TRACK OPERATIONS
# ============================================================================

async def create_audio_track(db: AsyncSession, track_data: dict) -> dict:
    """Create audio track"""
    track = db_models.AudioTrack(**track_data)
    db.add(track)
    await db.flush()
    await db.refresh(track)
    return {
        "id": track.id,
        "name": track.name,
        "url": track.url,
        "category": track.category,
        "duration_seconds": track.duration_seconds,
        "is_premium": track.is_premium,
    }


async def get_audio_track(db: AsyncSession, track_id: str) -> Optional[dict]:
    """Get audio track by ID"""
    result = await db.execute(select(db_models.AudioTrack).where(db_models.AudioTrack.id == track_id))
    track = result.scalar_one_or_none()
    if not track:
        return None
    return {
        "id": track.id,
        "name": track.name,
        "url": track.url,
        "category": track.category,
        "duration_seconds": track.duration_seconds,
        "is_premium": track.is_premium,
    }


async def get_all_audio_tracks(db: AsyncSession) -> List[dict]:
    """Get all audio tracks"""
    result = await db.execute(select(db_models.AudioTrack))
    tracks = result.scalars().all()
    return [
        {
            "id": track.id,
            "name": track.name,
            "url": track.url,
            "category": track.category,
            "duration_seconds": track.duration_seconds,
            "is_premium": track.is_premium,
        }
        for track in tracks
    ]


async def update_audio_track(db: AsyncSession, track_id: str, updates: dict) -> Optional[dict]:
    """Update audio track"""
    result = await db.execute(select(db_models.AudioTrack).where(db_models.AudioTrack.id == track_id))
    track = result.scalar_one_or_none()
    if not track:
        return None
    
    for key, value in updates.items():
        setattr(track, key, value)
    
    await db.flush()
    await db.refresh(track)
    return {
        "id": track.id,
        "name": track.name,
        "url": track.url,
        "category": track.category,
        "duration_seconds": track.duration_seconds,
        "is_premium": track.is_premium,
    }


async def delete_audio_track(db: AsyncSession, track_id: str) -> bool:
    """Delete audio track"""
    result = await db.execute(delete(db_models.AudioTrack).where(db_models.AudioTrack.id == track_id))
    return result.rowcount > 0


# ============================================================================
# COSMETIC ITEM OPERATIONS
# ============================================================================

async def create_cosmetic_item(db: AsyncSession, item_data: dict) -> dict:
    """Create cosmetic item"""
    item = db_models.CosmeticItem(**item_data)
    db.add(item)
    await db.flush()
    await db.refresh(item)
    return {
        "id": item.id,
        "name": item.name,
        "type": item.type,
        "spark_price": item.spark_price,
        "description": item.description,
        "image_url": item.image_url,
        "is_premium": item.is_premium,
        "is_available": item.is_available,
    }


async def get_cosmetic_item(db: AsyncSession, item_id: str) -> Optional[dict]:
    """Get cosmetic item by ID"""
    result = await db.execute(select(db_models.CosmeticItem).where(db_models.CosmeticItem.id == item_id))
    item = result.scalar_one_or_none()
    if not item:
        return None
    return {
        "id": item.id,
        "name": item.name,
        "type": item.type,
        "spark_price": item.spark_price,
        "description": item.description,
        "image_url": item.image_url,
        "is_premium": item.is_premium,
        "is_available": item.is_available,
    }


async def get_all_cosmetic_items(db: AsyncSession) -> List[dict]:
    """Get all cosmetic items"""
    result = await db.execute(select(db_models.CosmeticItem))
    items = result.scalars().all()
    return [
        {
            "id": item.id,
            "name": item.name,
            "type": item.type,
            "spark_price": item.spark_price,
            "description": item.description,
            "image_url": item.image_url,
            "is_premium": item.is_premium,
            "is_available": item.is_available,
        }
        for item in items
    ]


async def update_cosmetic_item(db: AsyncSession, item_id: str, updates: dict) -> Optional[dict]:
    """Update cosmetic item"""
    result = await db.execute(select(db_models.CosmeticItem).where(db_models.CosmeticItem.id == item_id))
    item = result.scalar_one_or_none()
    if not item:
        return None
    
    for key, value in updates.items():
        setattr(item, key, value)
    
    await db.flush()
    await db.refresh(item)
    return {
        "id": item.id,
        "name": item.name,
        "type": item.type,
        "spark_price": item.spark_price,
        "description": item.description,
        "image_url": item.image_url,
        "is_premium": item.is_premium,
        "is_available": item.is_available,
    }


async def delete_cosmetic_item(db: AsyncSession, item_id: str) -> bool:
    """Delete cosmetic item"""
    result = await db.execute(delete(db_models.CosmeticItem).where(db_models.CosmeticItem.id == item_id))
    return result.rowcount > 0


# ============================================================================
# INITIALIZATION
# ============================================================================

async def initialize_default_data(db: AsyncSession):
    """Initialize default users from environment variables (if provided)"""
    import os
    
    # Only create default users if environment variables are set
    admin_email = os.getenv("DEFAULT_ADMIN_EMAIL")
    admin_password_hash = os.getenv("DEFAULT_ADMIN_PASSWORD_HASH")
    
    if admin_email and admin_password_hash:
        # Check if admin already exists
        existing_admin = await get_user_by_email(db, admin_email)
        if not existing_admin:
            # Create admin user from environment
            await create_user(db, {
                'email': admin_email,
                'password_hash': admin_password_hash,
                'name': 'Admin User',
                'is_admin': True,
                'subscription_tier': 'master'
            })
            print(f"✓ Created admin user: {admin_email}")
        else:
            print(f"✓ Admin user already exists: {admin_email}")
    else:
        print("⚠️  No default admin configured. Use scripts/create_admin.py to create one.")
    
    # Create test user only in development
    test_email = os.getenv("DEFAULT_TEST_EMAIL")
    test_password_hash = os.getenv("DEFAULT_TEST_PASSWORD_HASH")
    
    if test_email and test_password_hash:
        existing_test = await get_user_by_email(db, test_email)
        if not existing_test:
            await create_user(db, {
                'email': test_email,
                'password_hash': test_password_hash,
                'name': 'Test User',
                'is_admin': False,
                'subscription_tier': 'wanderer'
            })
            print(f"✓ Created test user: {test_email}")
        else:
            print(f"✓ Test user already exists: {test_email}")
