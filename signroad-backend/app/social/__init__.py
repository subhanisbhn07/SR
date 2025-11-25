"""
Social Module

Handles social features, cosmetics shop, and community.
"""

from app.social.routers import router
from app.social.service import SocialService

__all__ = ['router', 'SocialService']
