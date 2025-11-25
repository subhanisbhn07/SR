"""
Identity Module - Pydantic Schemas

Request/response models for authentication and user management.
"""

from pydantic import BaseModel, EmailStr
from typing import Optional


class UserCreate(BaseModel):
    """Schema for user registration"""
    email: EmailStr
    password: str
    name: str


class UserLogin(BaseModel):
    """Schema for user login"""
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    """Schema for user response (without password)"""
    id: str
    email: str
    name: str
    is_admin: bool
    subscription_tier: str
    current_day: int
    completed_days: list[int]
    streak: int
    lantern_health: int
    sparks: int
    settings: dict
    owned_cosmetics: list[str]
    equipped_cosmetics: dict


class Token(BaseModel):
    """Schema for authentication token response"""
    access_token: str
    token_type: str
    user: UserResponse


class UserSettingsUpdate(BaseModel):
    """Schema for updating user settings"""
    settings: dict
