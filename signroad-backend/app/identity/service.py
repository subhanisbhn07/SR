"""
Identity Module - Service Layer

Business logic for authentication and user management.
Follows Single Responsibility Principle - only handles identity concerns.
"""

from typing import Optional
from fastapi import HTTPException
from app.auth import hash_password, verify_password, create_access_token
from app.identity.repository import StorageUserRepository
from app.identity.schemas import UserCreate, UserLogin, UserResponse, Token


class IdentityService:
    """
    Service for authentication and user management.
    
    Follows Single Responsibility Principle: only handles identity-related operations.
    Follows Dependency Inversion Principle: depends on UserRepository abstraction.
    """
    
    def __init__(self, user_repository: StorageUserRepository = None):
        """
        Initialize service with repository dependency.
        
        Args:
            user_repository: Repository for user data access (defaults to StorageUserRepository)
        """
        self.user_repo = user_repository or StorageUserRepository()
    
    async def register_user(self, session, user_data: UserCreate) -> Token:
        """
        Register a new user.
        
        Args:
            session: Database session
            user_data: User registration data
            
        Returns:
            Token with access token and user info
            
        Raises:
            HTTPException: If email already registered
        """
        # Check if user already exists
        existing_user = await self.user_repo.get_by_email(session, user_data.email)
        if existing_user:
            raise HTTPException(status_code=400, detail="Email already registered")
        
        # Create new user with hashed password
        password_hash = hash_password(user_data.password)
        user = await self.user_repo.create(session, {
            'email': user_data.email,
            'password_hash': password_hash,
            'name': user_data.name,
            'is_admin': False,
            'subscription_tier': 'wanderer',
            'current_day': 1
        })
        
        # Create access token
        access_token = create_access_token(user['id'], user['email'], user['is_admin'])
        
        return Token(
            access_token=access_token,
            token_type='bearer',
            user=UserResponse(**user)
        )
    
    async def login_user(self, session, credentials: UserLogin) -> Token:
        """
        Authenticate user and create session.
        
        Args:
            session: Database session
            credentials: User login credentials
            
        Returns:
            Token with access token and user info
            
        Raises:
            HTTPException: If credentials are invalid
        """
        user = await self.user_repo.get_by_email(session, credentials.email)
        
        if not user or not verify_password(credentials.password, user['password_hash']):
            raise HTTPException(status_code=401, detail="Invalid email or password")
        
        # Create access token
        access_token = create_access_token(user['id'], user['email'], user['is_admin'])
        
        return Token(
            access_token=access_token,
            token_type='bearer',
            user=UserResponse(**user)
        )
    
    async def get_user_by_id(self, session, user_id: str) -> Optional[UserResponse]:
        """
        Get user by ID.
        
        Args:
            session: Database session
            user_id: User ID
            
        Returns:
            User data or None if not found
        """
        user = await self.user_repo.get_by_id(session, user_id)
        if user:
            return UserResponse(**user)
        return None
    
    async def update_user_settings(self, session, user_id: str, settings: dict) -> UserResponse:
        """
        Update user settings.
        
        Args:
            session: Database session
            user_id: User ID
            settings: New settings
            
        Returns:
            Updated user data
            
        Raises:
            HTTPException: If user not found
        """
        user = await self.user_repo.get_by_id(session, user_id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        user['settings'] = settings
        updated_user = await self.user_repo.update(session, user_id, user)
        
        return UserResponse(**updated_user)
    
    async def get_all_users(self, session) -> list[UserResponse]:
        """
        Get all users (admin only).
        
        Args:
            session: Database session
            
        Returns:
            List of all users
        """
        users = await self.user_repo.get_all(session)
        return [UserResponse(**user) for user in users]
