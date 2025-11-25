"""
Media Module - Pydantic Schemas
"""

from pydantic import BaseModel
from typing import Optional


class AudioTrack(BaseModel):
    """Schema for audio track"""
    id: str
    title: str
    description: str
    url: str
    duration: int
    category: str
    is_premium: bool


class AudioTrackCreate(BaseModel):
    """Schema for creating audio track (admin)"""
    title: str
    description: str
    url: str
    duration: int
    category: str
    is_premium: bool


class AudioTrackUpdate(BaseModel):
    """Schema for updating audio track (admin)"""
    title: Optional[str] = None
    description: Optional[str] = None
    url: Optional[str] = None
    duration: Optional[int] = None
    category: Optional[str] = None
    is_premium: Optional[bool] = None
