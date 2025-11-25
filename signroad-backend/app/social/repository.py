"""
Social Module - Repository Layer
"""

from typing import Optional
from app import storage_adapter as storage


class StorageCosmeticRepository:
    """Repository for cosmetic items"""
    
    async def get_all(self, session) -> list[dict]:
        return storage.get_all_cosmetic_items()
    
    async def get_by_id(self, session, item_id: str) -> Optional[dict]:
        return storage.get_cosmetic_item(item_id)
    
    async def create(self, session, item_data: dict) -> dict:
        return storage.create_cosmetic_item(item_data)
    
    async def update(self, session, item_id: str, updates: dict) -> Optional[dict]:
        return storage.update_cosmetic_item(item_id, updates)
    
    async def delete(self, session, item_id: str) -> bool:
        return storage.delete_cosmetic_item(item_id)
