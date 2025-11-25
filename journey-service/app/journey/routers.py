"""
Journey Module - API Routes

FastAPI routes for journey, signs, and journal.
"""

from fastapi import APIRouter, Depends
from typing import List
from app.journey.schemas import (
    DayContent, SignLogCreate, SignLog,
    JournalEntryCreate, JournalEntry, JournalEntryUpdate,
    UserProgress, ProgressUpdate
)
from app.journey.service import JourneyService
from app.auth import get_current_user
from app import storage_adapter as storage

router = APIRouter(prefix="/api/journey", tags=["journey"])
journey_service = JourneyService()


@router.get("/days", response_model=List[DayContent])
async def get_all_days(
    current_user: dict = Depends(get_current_user),
    session=Depends(storage.get_storage_session)
):
    """Get all day contents (filtered by subscription tier)"""
    days = await journey_service.get_all_days(session, current_user['subscription_tier'])
    return days


@router.get("/days/{day_number}", response_model=DayContent)
async def get_day(
    day_number: int,
    current_user: dict = Depends(get_current_user),
    session=Depends(storage.get_storage_session)
):
    """Get specific day content"""
    day = await journey_service.get_day_content(session, day_number, current_user['subscription_tier'])
    return day


@router.get("/users/progress", response_model=UserProgress)
async def get_user_progress(current_user: dict = Depends(get_current_user)):
    """Get user's journey progress"""
    return UserProgress(
        user_id=current_user['id'],
        completed_days=current_user['completed_days'],
        current_day=current_user['current_day'],
        streak=current_user['streak'],
        lantern_health=current_user['lantern_health'],
        sparks=current_user['sparks'],
        owned_cosmetics=current_user.get('owned_cosmetics', []),
        equipped_cosmetics=current_user.get('equipped_cosmetics', {})
    )


@router.post("/users/progress")
async def update_user_progress(
    progress: ProgressUpdate,
    current_user: dict = Depends(get_current_user),
    session=Depends(storage.get_storage_session)
):
    """Update user's progress for a day"""
    if progress.completed and progress.day_number not in current_user['completed_days']:
        current_user['completed_days'].append(progress.day_number)
        current_user['current_day'] = max(current_user['current_day'], progress.day_number + 1)
        
        day_content = storage.get_day_content(progress.day_number)
        if day_content:
            current_user['sparks'] += day_content.get('sparks_reward', 10)
        
        current_user['streak'] += 1
        await storage.update_user(session, current_user['id'], current_user)
    
    return {"success": True, "progress": UserProgress(
        user_id=current_user['id'],
        completed_days=current_user['completed_days'],
        current_day=current_user['current_day'],
        streak=current_user['streak'],
        lantern_health=current_user['lantern_health'],
        sparks=current_user['sparks'],
        owned_cosmetics=current_user.get('owned_cosmetics', []),
        equipped_cosmetics=current_user.get('equipped_cosmetics', {})
    )}


@router.post("/signs", response_model=SignLog)
async def create_sign_log(
    sign_data: SignLogCreate,
    current_user: dict = Depends(get_current_user),
    session=Depends(storage.get_storage_session)
):
    """Log a sign sighting"""
    log_data = {
        'day_number': sign_data.day_number,
        'sign_name': sign_data.sign_name,
        'note': sign_data.note,
        'photo_url': sign_data.photo_base64
    }
    log = await journey_service.create_sign_log(session, current_user['id'], log_data)
    return SignLog(**log)


@router.get("/signs", response_model=List[SignLog])
async def get_user_signs(
    current_user: dict = Depends(get_current_user),
    session=Depends(storage.get_storage_session)
):
    """Get all sign logs for current user"""
    logs = await journey_service.get_user_sign_logs(session, current_user['id'])
    return [SignLog(**log) for log in logs]


@router.post("/journal", response_model=JournalEntry)
async def create_journal_entry(
    entry_data: JournalEntryCreate,
    current_user: dict = Depends(get_current_user),
    session=Depends(storage.get_storage_session)
):
    """Create a journal entry"""
    entry = await journey_service.create_journal_entry(session, current_user['id'], {
        'day_number': entry_data.day_number,
        'content': entry_data.content,
        'prompt': entry_data.prompt,
        'is_public': entry_data.is_public
    })
    return JournalEntry(**entry)


@router.get("/journal", response_model=List[JournalEntry])
async def get_user_journal(
    current_user: dict = Depends(get_current_user),
    session=Depends(storage.get_storage_session)
):
    """Get all journal entries for current user"""
    entries = await journey_service.get_user_journal_entries(session, current_user['id'])
    return [JournalEntry(**entry) for entry in entries]


@router.put("/journal/{entry_id}", response_model=JournalEntry)
async def update_journal_entry(
    entry_id: str,
    update_data: JournalEntryUpdate,
    current_user: dict = Depends(get_current_user),
    session=Depends(storage.get_storage_session)
):
    """Update a journal entry"""
    entry = await journey_service.update_journal_entry(
        session, entry_id, current_user['id'], update_data.content
    )
    return JournalEntry(**entry)


@router.delete("/journal/{entry_id}")
async def delete_journal_entry(
    entry_id: str,
    current_user: dict = Depends(get_current_user),
    session=Depends(storage.get_storage_session)
):
    """Delete a journal entry"""
    await journey_service.delete_journal_entry(session, entry_id, current_user['id'])
    return {"success": True}
