"""
Journey Module - Pydantic Schemas

Request/response models for journey, progress, signs, and journal.
"""

from pydantic import BaseModel
from typing import Optional


# Day Content Schemas
class DayContent(BaseModel):
    """Schema for day content"""
    day_number: int
    title: str
    description: str
    meditation_audio_url: str
    meditation_duration: int
    sign_challenge: str
    sign_description: str
    journal_prompt: str
    sparks_reward: int
    xp_reward: int
    is_premium: bool
    theme: str


class DayContentCreate(BaseModel):
    """Schema for creating day content (admin)"""
    day_number: int
    title: str
    description: str
    meditation_audio_url: str
    meditation_duration: int
    sign_challenge: str
    sign_description: str
    journal_prompt: str
    sparks_reward: int
    xp_reward: int
    is_premium: bool
    theme: str


class DayContentUpdate(BaseModel):
    """Schema for updating day content (admin)"""
    title: Optional[str] = None
    description: Optional[str] = None
    meditation_audio_url: Optional[str] = None
    meditation_duration: Optional[int] = None
    sign_challenge: Optional[str] = None
    sign_description: Optional[str] = None
    journal_prompt: Optional[str] = None
    sparks_reward: Optional[int] = None
    xp_reward: Optional[int] = None
    is_premium: Optional[bool] = None
    theme: Optional[str] = None


# Progress Schemas
class UserProgress(BaseModel):
    """Schema for user progress"""
    user_id: str
    completed_days: list[int]
    current_day: int
    streak: int
    lantern_health: int
    sparks: int
    owned_cosmetics: list[str]
    equipped_cosmetics: dict


class ProgressUpdate(BaseModel):
    """Schema for updating progress"""
    day_number: int
    completed: bool


# Sign Log Schemas
class SignLogCreate(BaseModel):
    """Schema for creating a sign log"""
    day_number: int
    sign_name: str
    note: Optional[str] = None
    photo_base64: Optional[str] = None


class SignLog(BaseModel):
    """Schema for sign log response"""
    id: str
    user_id: str
    day_number: int
    sign_name: str
    note: Optional[str]
    photo_url: Optional[str]
    created_at: str


# Journal Entry Schemas
class JournalEntryCreate(BaseModel):
    """Schema for creating a journal entry"""
    day_number: int
    content: str
    prompt: str
    is_public: bool = False


class JournalEntryUpdate(BaseModel):
    """Schema for updating a journal entry"""
    content: str


class JournalEntry(BaseModel):
    """Schema for journal entry response"""
    id: str
    user_id: str
    day_number: int
    content: str
    prompt: str
    is_public: bool
    created_at: str
    updated_at: Optional[str]
