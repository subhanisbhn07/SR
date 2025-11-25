"""
Social Module - API Routes
"""

from fastapi import APIRouter, Depends
from typing import List
from app.social.schemas import CosmeticItem
from app.social.service import SocialService
from app.auth import get_current_user
from app import storage_adapter as storage

router = APIRouter(prefix="/api", tags=["social"])
social_service = SocialService()


@router.get("/cosmetics", response_model=List[CosmeticItem])
async def get_all_cosmetics(session=Depends(storage.get_storage_session)):
    """Get all cosmetic items"""
    items = await social_service.get_all_cosmetics(session)
    return items


@router.post("/cosmetics/{item_id}/purchase")
async def purchase_cosmetic(
    item_id: str,
    current_user: dict = Depends(get_current_user),
    session=Depends(storage.get_storage_session)
):
    """Purchase a cosmetic item with Sparks"""
    result = await social_service.purchase_cosmetic(session, item_id, current_user)
    await storage.update_user(session, current_user['id'], current_user)
    return result
