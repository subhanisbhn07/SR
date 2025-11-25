"""
Identity Module - Repository Layer

Data access layer for user management following Dependency Inversion Principle.
Uses the storage adapter to work with both in-memory and database storage.
"""

from typing import Optional, Protocol
from app import storage_adapter as storage


class UserRepository(Protocol):
    """
    Interface for user data access (Interface Segregation Principle).
    
    This protocol defines the contract for user data operations.
    Implementations can use different storage backends (in-memory, PostgreSQL, etc.)
    """
    
    async def get_by_id(self, session, user_id: str) -> Optional[dict]:
        """Get user by ID"""
        ...
    
    async def get_by_email(self, session, email: str) -> Optional[dict]:
        """Get user by email"""
        ...
    
    async def create(self, session, user_data: dict) -> dict:
        """Create a new user"""
        ...
    
    async def update(self, session, user_id: str, updates: dict) -> Optional[dict]:
        """Update user data"""
        ...
    
    async def get_all(self, session) -> list[dict]:
        """Get all users (admin only)"""
        ...


class StorageUserRepository:
    """
    Concrete implementation of UserRepository using the storage adapter.
    
    This class follows Dependency Inversion Principle by depending on the
    storage adapter abstraction rather than concrete storage implementations.
    """
    
    async def get_by_id(self, session, user_id: str) -> Optional[dict]:
        """Get user by ID"""
        return await storage.get_user_by_id(session, user_id)
    
    async def get_by_email(self, session, email: str) -> Optional[dict]:
        """Get user by email"""
        return await storage.get_user_by_email(session, email)
    
    async def create(self, session, user_data: dict) -> dict:
        """Create a new user"""
        return await storage.create_user(session, user_data)
    
    async def update(self, session, user_id: str, updates: dict) -> Optional[dict]:
        """Update user data"""
        return await storage.update_user(session, user_id, updates)
    
    async def get_all(self, session) -> list[dict]:
        """Get all users (admin only)"""
        return await storage.get_all_users(session)
