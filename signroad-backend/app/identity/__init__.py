"""
Identity Module

Handles user authentication, authorization, and profile management.

This module follows SOLID principles:
- Single Responsibility: Only handles identity-related concerns
- Open/Closed: Can extend with new auth methods without modifying existing code
- Liskov Substitution: Repository implementations are interchangeable
- Interface Segregation: Separate interfaces for different concerns
- Dependency Inversion: Depends on abstractions (repositories, storage adapter)
"""

from app.identity.routers import router
from app.identity.service import IdentityService
from app.identity.schemas import UserCreate, UserLogin, UserResponse, Token

__all__ = ['router', 'IdentityService', 'UserCreate', 'UserLogin', 'UserResponse', 'Token']
