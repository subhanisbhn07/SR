"""
Social Module - Service Layer
"""

from fastapi import HTTPException
from app.social.repository import StorageCosmeticRepository


class SocialService:
    """Service for social features and cosmetics"""
    
    def __init__(self):
        self.cosmetic_repo = StorageCosmeticRepository()
    
    async def get_all_cosmetics(self, session) -> list[dict]:
        """Get all cosmetic items"""
        return await self.cosmetic_repo.get_all(session)
    
    async def purchase_cosmetic(self, session, item_id: str, user: dict) -> dict:
        """Purchase a cosmetic item"""
        item = await self.cosmetic_repo.get_by_id(session, item_id)
        
        if not item:
            raise HTTPException(status_code=404, detail="Item not found")
        
        if user['sparks'] < item['spark_price']:
            raise HTTPException(status_code=400, detail="Not enough Sparks")
        
        if item.get('is_premium', False) and user['subscription_tier'] == 'wanderer':
            raise HTTPException(status_code=403, detail="Premium subscription required")
        
        user['sparks'] -= item['spark_price']
        if 'owned_cosmetics' not in user:
            user['owned_cosmetics'] = []
        user['owned_cosmetics'].append(item_id)
        
        return {"success": True, "remaining_sparks": user['sparks']}
