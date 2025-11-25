"""
Identity Module - API Routes

FastAPI routes for authentication and user management.
Follows Open/Closed Principle - can add new endpoints without modifying existing ones.
"""

from fastapi import APIRouter, Depends, HTTPException
from app.identity.schemas import UserCreate, UserLogin, UserResponse, Token, UserSettingsUpdate
from app.identity.service import IdentityService
from app.auth import get_current_user, get_current_admin
from app import storage_adapter as storage


# Create router for identity endpoints
router = APIRouter(prefix="/api", tags=["identity"])

# Create service instance (Dependency Injection)
identity_service = IdentityService()


@router.post("/auth/register", response_model=Token)
async def register(
    user_data: UserCreate,
    session=Depends(storage.get_storage_session)
):
    """
    Register a new user.
    
    Creates a new user account with the provided email, password, and name.
    Returns an access token for immediate login.
    """
    return await identity_service.register_user(session, user_data)


@router.post("/auth/login", response_model=Token)
async def login(
    credentials: UserLogin,
    session=Depends(storage.get_storage_session)
):
    """
    Login with email and password.
    
    Authenticates the user and returns an access token.
    """
    return await identity_service.login_user(session, credentials)


@router.get("/auth/me", response_model=UserResponse)
async def get_me(current_user: dict = Depends(get_current_user)):
    """
    Get current user profile.
    
    Returns the authenticated user's profile information.
    """
    return UserResponse(**current_user)


@router.put("/users/settings")
async def update_user_settings(
    settings_update: UserSettingsUpdate,
    current_user: dict = Depends(get_current_user),
    session=Depends(storage.get_storage_session)
):
    """
    Update user settings.
    
    Updates the authenticated user's settings.
    """
    updated_user = await identity_service.update_user_settings(
        session,
        current_user['id'],
        settings_update.settings
    )
    return {"success": True, "settings": settings_update.settings}


@router.get("/admin/users", response_model=list[UserResponse])
async def admin_get_all_users(
    admin: dict = Depends(get_current_admin),
    session=Depends(storage.get_storage_session)
):
    """
    Admin: Get all users.
    
    Returns a list of all registered users. Admin access required.
    """
    return await identity_service.get_all_users(session)
