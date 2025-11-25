"""
Social Module - Pydantic Schemas
"""

from pydantic import BaseModel
from typing import Optional


class CosmeticItem(BaseModel):
    """Schema for cosmetic item"""
    id: str
    name: str
    description: str
    category: str
    spark_price: int
    is_premium: bool
    icon_url: str


class CosmeticItemCreate(BaseModel):
    """Schema for creating cosmetic item (admin)"""
    name: str
    description: str
    category: str
    spark_price: int
    is_premium: bool
    icon_url: str


class CosmeticItemUpdate(BaseModel):
    """Schema for updating cosmetic item (admin)"""
    name: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    spark_price: Optional[int] = None
    is_premium: Optional[bool] = None
    icon_url: Optional[str] = None
