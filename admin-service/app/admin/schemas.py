"""
Admin Module - Pydantic Schemas
"""

from pydantic import BaseModel
from typing import Optional


class PlatformStats(BaseModel):
    """Platform statistics"""
    total_users: int
    total_days: int
    total_signs_logged: int
    total_journal_entries: int
    active_subscribers: int
