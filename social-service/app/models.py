from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, EmailStr

# User Models
class User(BaseModel):
    id: str
    email: EmailStr
    password_hash: str
    name: str
    created_at: datetime
    is_admin: bool = False
    subscription_tier: str = "wanderer"  # wanderer, seeker, master
    current_day: int = 1
    completed_days: List[int] = []
    streak: int = 0
    lantern_health: int = 100
    sparks: int = 0
    settings: dict = {}

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    name: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: str
    email: str
    name: str
    is_admin: bool
    subscription_tier: str
    current_day: int
    completed_days: List[int]
    streak: int
    lantern_health: int
    sparks: int
    settings: dict

# Journey Content Models
class DayContent(BaseModel):
    id: str
    day_number: int
    title: str
    description: str
    sign_challenge: str
    sign_description: str
    meditation_script: str
    meditation_audio_url: Optional[str] = None
    duration_options: List[int] = [180, 300, 600]  # 3m, 5m, 10m
    sparks_reward: int = 10
    is_premium: bool = False
    special_event: Optional[str] = None

class DayContentCreate(BaseModel):
    day_number: int
    title: str
    description: str
    sign_challenge: str
    sign_description: str
    meditation_script: str
    meditation_audio_url: Optional[str] = None
    duration_options: List[int] = [180, 300, 600]
    sparks_reward: int = 10
    is_premium: bool = False
    special_event: Optional[str] = None

class DayContentUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    sign_challenge: Optional[str] = None
    sign_description: Optional[str] = None
    meditation_script: Optional[str] = None
    meditation_audio_url: Optional[str] = None
    duration_options: Optional[List[int]] = None
    sparks_reward: Optional[int] = None
    is_premium: Optional[bool] = None
    special_event: Optional[str] = None

# Sign Log Models
class SignLog(BaseModel):
    id: str
    user_id: str
    day_number: int
    sign_name: str
    note: Optional[str] = None
    photo_url: Optional[str] = None
    logged_at: datetime

class SignLogCreate(BaseModel):
    day_number: int
    sign_name: str
    note: Optional[str] = None
    photo_base64: Optional[str] = None

# Journal Entry Models
class JournalEntry(BaseModel):
    id: str
    user_id: str
    day_number: int
    content: str
    prompt: str
    is_public: bool = False
    created_at: datetime

class JournalEntryCreate(BaseModel):
    day_number: int
    content: str
    prompt: str
    is_public: bool = False

class JournalEntryUpdate(BaseModel):
    content: str

# Audio Track Models
class AudioTrack(BaseModel):
    id: str
    name: str
    category: str  # meditation, ambience, sound_effect
    url: str
    duration: int
    is_premium: bool = False

class AudioTrackCreate(BaseModel):
    name: str
    category: str
    url: str
    duration: int
    is_premium: bool = False

class AudioTrackUpdate(BaseModel):
    name: Optional[str] = None
    url: Optional[str] = None
    duration: Optional[int] = None
    is_premium: Optional[bool] = None

# Cosmetic Item Models
class CosmeticItem(BaseModel):
    id: str
    name: str
    description: str
    category: str  # avatar, lantern, badge, frame
    rarity: str  # common, rare, epic, legendary
    spark_price: int
    is_premium: bool = False

class CosmeticItemCreate(BaseModel):
    name: str
    description: str
    category: str
    rarity: str
    spark_price: int
    is_premium: bool = False

class CosmeticItemUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    spark_price: Optional[int] = None
    is_premium: Optional[bool] = None

# User Progress Models
class UserProgress(BaseModel):
    user_id: str
    completed_days: List[int]
    current_day: int
    streak: int
    lantern_health: int
    sparks: int
    owned_cosmetics: List[str] = []
    equipped_cosmetics: dict = {}

class ProgressUpdate(BaseModel):
    day_number: int
    completed: bool = True

# Token Models
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse
