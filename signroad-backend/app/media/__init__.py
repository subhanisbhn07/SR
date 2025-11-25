"""
Media Module

Handles audio tracks and media assets.
"""

from app.media.routers import router
from app.media.service import MediaService

__all__ = ['router', 'MediaService']
