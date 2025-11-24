from fastapi import FastAPI, HTTPException, Depends, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
import base64
import os

from app.models import (
    UserCreate, UserLogin, UserResponse, Token,
    DayContent, DayContentCreate, DayContentUpdate,
    SignLogCreate, SignLog,
    JournalEntryCreate, JournalEntryUpdate, JournalEntry,
    AudioTrack, AudioTrackCreate, AudioTrackUpdate,
    CosmeticItem, CosmeticItemCreate, CosmeticItemUpdate,
    ProgressUpdate, UserProgress
)
from app.auth import (
    hash_password, verify_password, create_access_token,
    get_current_user, get_current_admin
)
from app.database import USE_DATABASE, init_db, close_db
import app.storage_adapter as storage

app = FastAPI(title="SignRoad API", version="1.0.0")

# Load allowed origins from environment variable
ALLOWED_ORIGINS = os.getenv(
    "ALLOWED_ORIGINS",
    "http://localhost:5173,https://pr-generator-yatdm0kx.devinapps.com"
).split(",")

# CORS middleware with explicit whitelist (no more wildcard!)
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,  # Explicit whitelist
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],  # Explicit methods
    allow_headers=["Authorization", "Content-Type"],  # Explicit headers
)

# Initialize database and default data on startup
@app.on_event("startup")
async def startup_event():
    if USE_DATABASE:
        await init_db()
        async for session in storage.get_storage_session():
            await storage.initialize_default_data(session)
    else:
        async for session in storage.get_storage_session():
            await storage.initialize_default_data(session)
    print("✅ SignRoad API started successfully")

# Close database connections on shutdown
@app.on_event("shutdown")
async def shutdown_event():
    if USE_DATABASE:
        await close_db()
    print("✅ SignRoad API shut down successfully")

@app.get("/healthz")
async def healthz():
    return {"status": "ok", "message": "SignRoad API is running"}

# ============================================================================
# AUTHENTICATION ENDPOINTS
# ============================================================================

@app.post("/api/auth/register", response_model=Token)
async def register(user_data: UserCreate, session=Depends(storage.get_storage_session)):
    """Register a new user"""
    # Check if user already exists
    existing_user = await storage.get_user_by_email(session, user_data.email)
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create new user
    password_hash = hash_password(user_data.password)
    user = await storage.create_user(session, {
        'email': user_data.email,
        'password_hash': password_hash,
        'name': user_data.name,
        'is_admin': False,
        'subscription_tier': 'wanderer',
        'current_day': 1
    })
    
    # Create access token
    access_token = create_access_token(user['id'], user['email'], user['is_admin'])
    
    return {
        'access_token': access_token,
        'token_type': 'bearer',
        'user': UserResponse(**user)
    }

@app.post("/api/auth/login", response_model=Token)
async def login(credentials: UserLogin, session=Depends(storage.get_storage_session)):
    """Login with email and password"""
    user = await storage.get_user_by_email(session, credentials.email)
    
    if not user or not verify_password(credentials.password, user['password_hash']):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    # Create access token
    access_token = create_access_token(user['id'], user['email'], user['is_admin'])
    
    return {
        'access_token': access_token,
        'token_type': 'bearer',
        'user': UserResponse(**user)
    }

@app.get("/api/auth/me", response_model=UserResponse)
async def get_me(current_user: dict = Depends(get_current_user)):
    """Get current user profile"""
    return UserResponse(**current_user)

# ============================================================================
# USER ENDPOINTS
# ============================================================================

@app.get("/api/users/progress", response_model=UserProgress)
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

@app.post("/api/users/progress")
async def update_user_progress(
    progress: ProgressUpdate,
    current_user: dict = Depends(get_current_user)
):
    """Update user's progress for a day"""
    if progress.completed and progress.day_number not in current_user['completed_days']:
        current_user['completed_days'].append(progress.day_number)
        current_user['current_day'] = max(current_user['current_day'], progress.day_number + 1)
        
        # Get day content to award sparks
        day_content = storage.get_day_content(progress.day_number)
        if day_content:
            current_user['sparks'] += day_content.get('sparks_reward', 10)
        
        # Update streak
        current_user['streak'] += 1
        
        storage.update_user(current_user['id'], current_user)
    
    return {"success": True, "progress": UserProgress(**{
        'user_id': current_user['id'],
        'completed_days': current_user['completed_days'],
        'current_day': current_user['current_day'],
        'streak': current_user['streak'],
        'lantern_health': current_user['lantern_health'],
        'sparks': current_user['sparks'],
        'owned_cosmetics': current_user.get('owned_cosmetics', []),
        'equipped_cosmetics': current_user.get('equipped_cosmetics', {})
    })}

@app.put("/api/users/settings")
async def update_user_settings(
    settings: dict,
    current_user: dict = Depends(get_current_user)
):
    """Update user settings"""
    current_user['settings'] = settings
    storage.update_user(current_user['id'], current_user)
    return {"success": True, "settings": settings}

# ============================================================================
# DAY CONTENT ENDPOINTS
# ============================================================================

@app.get("/api/days", response_model=List[DayContent])
async def get_all_days(current_user: dict = Depends(get_current_user)):
    """Get all day contents (filtered by subscription tier)"""
    all_days = storage.get_all_day_contents()
    
    # Filter premium content for non-subscribers
    if current_user['subscription_tier'] == 'wanderer':
        all_days = [day for day in all_days if not day.get('is_premium', False)]
    
    return all_days

@app.get("/api/days/{day_number}", response_model=DayContent)
async def get_day(day_number: int, current_user: dict = Depends(get_current_user)):
    """Get specific day content"""
    day = storage.get_day_content(day_number)
    
    if not day:
        raise HTTPException(status_code=404, detail="Day not found")
    
    # Check if user has access to premium content
    if day.get('is_premium', False) and current_user['subscription_tier'] == 'wanderer':
        raise HTTPException(status_code=403, detail="Premium subscription required")
    
    return day

# ============================================================================
# SIGN LOG ENDPOINTS
# ============================================================================

@app.post("/api/signs", response_model=SignLog)
async def create_sign_log(
    sign_data: SignLogCreate,
    current_user: dict = Depends(get_current_user)
):
    """Log a sign sighting"""
    log_data = {
        'user_id': current_user['id'],
        'day_number': sign_data.day_number,
        'sign_name': sign_data.sign_name,
        'note': sign_data.note,
        'photo_url': sign_data.photo_base64  # Store base64 directly for now
    }
    
    log = storage.create_sign_log(log_data)
    return SignLog(**log)

@app.get("/api/signs", response_model=List[SignLog])
async def get_user_signs(current_user: dict = Depends(get_current_user)):
    """Get all sign logs for current user"""
    logs = storage.get_user_sign_logs(current_user['id'])
    return [SignLog(**log) for log in logs]

# ============================================================================
# JOURNAL ENDPOINTS
# ============================================================================

@app.post("/api/journal", response_model=JournalEntry)
async def create_journal_entry(
    entry_data: JournalEntryCreate,
    current_user: dict = Depends(get_current_user)
):
    """Create a journal entry"""
    entry = storage.create_journal_entry({
        'user_id': current_user['id'],
        'day_number': entry_data.day_number,
        'content': entry_data.content,
        'prompt': entry_data.prompt,
        'is_public': entry_data.is_public
    })
    return JournalEntry(**entry)

@app.get("/api/journal", response_model=List[JournalEntry])
async def get_user_journal(current_user: dict = Depends(get_current_user)):
    """Get all journal entries for current user"""
    entries = storage.get_user_journal_entries(current_user['id'])
    return [JournalEntry(**entry) for entry in entries]

@app.put("/api/journal/{entry_id}", response_model=JournalEntry)
async def update_journal_entry(
    entry_id: str,
    update_data: JournalEntryUpdate,
    current_user: dict = Depends(get_current_user)
):
    """Update a journal entry"""
    entry = storage.update_journal_entry(entry_id, update_data.content)
    
    if not entry:
        raise HTTPException(status_code=404, detail="Journal entry not found")
    
    # Verify ownership
    if entry['user_id'] != current_user['id']:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    return JournalEntry(**entry)

@app.delete("/api/journal/{entry_id}")
async def delete_journal_entry(
    entry_id: str,
    current_user: dict = Depends(get_current_user)
):
    """Delete a journal entry"""
    # Get entry to verify ownership
    entries = storage.get_user_journal_entries(current_user['id'])
    entry = next((e for e in entries if e['id'] == entry_id), None)
    
    if not entry:
        raise HTTPException(status_code=404, detail="Journal entry not found")
    
    if entry['user_id'] != current_user['id']:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    storage.delete_journal_entry(entry_id)
    return {"success": True}

# ============================================================================
# AUDIO ENDPOINTS
# ============================================================================

@app.get("/api/audio", response_model=List[AudioTrack])
async def get_all_audio(current_user: dict = Depends(get_current_user)):
    """Get all audio tracks"""
    tracks = storage.get_all_audio_tracks()
    
    # Filter premium tracks for non-subscribers
    if current_user['subscription_tier'] == 'wanderer':
        tracks = [track for track in tracks if not track.get('is_premium', False)]
    
    return tracks

# ============================================================================
# COSMETICS ENDPOINTS
# ============================================================================

@app.get("/api/cosmetics", response_model=List[CosmeticItem])
async def get_all_cosmetics():
    """Get all cosmetic items"""
    return storage.get_all_cosmetic_items()

@app.post("/api/cosmetics/{item_id}/purchase")
async def purchase_cosmetic(
    item_id: str,
    current_user: dict = Depends(get_current_user)
):
    """Purchase a cosmetic item with Sparks"""
    item = storage.get_cosmetic_item(item_id)
    
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    
    # Check if user has enough Sparks
    if current_user['sparks'] < item['spark_price']:
        raise HTTPException(status_code=400, detail="Not enough Sparks")
    
    # Check if item is premium and user has subscription
    if item.get('is_premium', False) and current_user['subscription_tier'] == 'wanderer':
        raise HTTPException(status_code=403, detail="Premium subscription required")
    
    # Deduct Sparks and add item to owned cosmetics
    current_user['sparks'] -= item['spark_price']
    if 'owned_cosmetics' not in current_user:
        current_user['owned_cosmetics'] = []
    current_user['owned_cosmetics'].append(item_id)
    
    storage.update_user(current_user['id'], current_user)
    
    return {"success": True, "remaining_sparks": current_user['sparks']}

# ============================================================================
# ADMIN PANEL ENDPOINTS
# ============================================================================

@app.get("/api/admin/users", response_model=List[UserResponse])
async def admin_get_all_users(admin: dict = Depends(get_current_admin)):
    """Admin: Get all users"""
    users = storage.get_all_users()
    return [UserResponse(**user) for user in users]

@app.post("/api/admin/days", response_model=DayContent)
async def admin_create_day(
    day_data: DayContentCreate,
    admin: dict = Depends(get_current_admin)
):
    """Admin: Create new day content"""
    day = storage.create_day_content(day_data.dict())
    return DayContent(**day)

@app.put("/api/admin/days/{day_number}", response_model=DayContent)
async def admin_update_day(
    day_number: int,
    updates: DayContentUpdate,
    admin: dict = Depends(get_current_admin)
):
    """Admin: Update day content"""
    # Only update fields that are provided
    update_dict = {k: v for k, v in updates.dict().items() if v is not None}
    day = storage.update_day_content(day_number, update_dict)
    
    if not day:
        raise HTTPException(status_code=404, detail="Day not found")
    
    return DayContent(**day)

@app.delete("/api/admin/days/{day_number}")
async def admin_delete_day(
    day_number: int,
    admin: dict = Depends(get_current_admin)
):
    """Admin: Delete day content"""
    success = storage.delete_day_content(day_number)
    
    if not success:
        raise HTTPException(status_code=404, detail="Day not found")
    
    return {"success": True}

@app.post("/api/admin/audio", response_model=AudioTrack)
async def admin_create_audio(
    track_data: AudioTrackCreate,
    admin: dict = Depends(get_current_admin)
):
    """Admin: Create new audio track"""
    track = storage.create_audio_track(track_data.dict())
    return AudioTrack(**track)

@app.put("/api/admin/audio/{track_id}", response_model=AudioTrack)
async def admin_update_audio(
    track_id: str,
    updates: AudioTrackUpdate,
    admin: dict = Depends(get_current_admin)
):
    """Admin: Update audio track"""
    update_dict = {k: v for k, v in updates.dict().items() if v is not None}
    track = storage.update_audio_track(track_id, update_dict)
    
    if not track:
        raise HTTPException(status_code=404, detail="Audio track not found")
    
    return AudioTrack(**track)

@app.delete("/api/admin/audio/{track_id}")
async def admin_delete_audio(
    track_id: str,
    admin: dict = Depends(get_current_admin)
):
    """Admin: Delete audio track"""
    success = storage.delete_audio_track(track_id)
    
    if not success:
        raise HTTPException(status_code=404, detail="Audio track not found")
    
    return {"success": True}

@app.post("/api/admin/cosmetics", response_model=CosmeticItem)
async def admin_create_cosmetic(
    item_data: CosmeticItemCreate,
    admin: dict = Depends(get_current_admin)
):
    """Admin: Create new cosmetic item"""
    item = storage.create_cosmetic_item(item_data.dict())
    return CosmeticItem(**item)

@app.put("/api/admin/cosmetics/{item_id}", response_model=CosmeticItem)
async def admin_update_cosmetic(
    item_id: str,
    updates: CosmeticItemUpdate,
    admin: dict = Depends(get_current_admin)
):
    """Admin: Update cosmetic item"""
    update_dict = {k: v for k, v in updates.dict().items() if v is not None}
    item = storage.update_cosmetic_item(item_id, update_dict)
    
    if not item:
        raise HTTPException(status_code=404, detail="Cosmetic item not found")
    
    return CosmeticItem(**item)

@app.delete("/api/admin/cosmetics/{item_id}")
async def admin_delete_cosmetic(
    item_id: str,
    admin: dict = Depends(get_current_admin)
):
    """Admin: Delete cosmetic item"""
    success = storage.delete_cosmetic_item(item_id)
    
    if not success:
        raise HTTPException(status_code=404, detail="Cosmetic item not found")
    
    return {"success": True}

@app.get("/api/admin/stats")
async def admin_get_stats(admin: dict = Depends(get_current_admin)):
    """Admin: Get platform statistics"""
    users = storage.get_all_users()
    days = storage.get_all_day_contents()
    signs = storage.get_all_sign_logs()
    journals = storage.get_all_journal_entries()
    
    return {
        "total_users": len(users),
        "total_days": len(days),
        "total_signs_logged": len(signs),
        "total_journal_entries": len(journals),
        "active_subscribers": len([u for u in users if u['subscription_tier'] != 'wanderer'])
    }
