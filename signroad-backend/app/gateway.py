"""
API Gateway - Routes requests to appropriate microservices

This gateway forwards authentication requests to the Identity Service
and handles all other requests locally.
"""

import httpx
import os
from fastapi import Request, HTTPException
from typing import Optional

# Identity Service URL (internal communication)
IDENTITY_SERVICE_URL = os.getenv("IDENTITY_SERVICE_URL", "http://localhost:8001")


async def forward_to_identity_service(request: Request, path: str):
    """
    Forward request to Identity Service.
    
    Args:
        request: Original FastAPI request
        path: Path to forward to Identity Service
        
    Returns:
        Response from Identity Service
    """
    # Build full URL
    url = f"{IDENTITY_SERVICE_URL}{path}"
    
    # Get request body if present
    body = None
    if request.method in ["POST", "PUT", "PATCH"]:
        body = await request.body()
    
    # Forward headers (excluding host)
    headers = dict(request.headers)
    headers.pop("host", None)
    
    # Make request to Identity Service
    async with httpx.AsyncClient(timeout=30.0) as client:
        try:
            response = await client.request(
                method=request.method,
                url=url,
                headers=headers,
                content=body,
                params=request.query_params
            )
            
            return response
            
        except httpx.RequestError as e:
            raise HTTPException(
                status_code=503,
                detail=f"Identity Service unavailable: {str(e)}"
            )


def should_forward_to_identity_service(path: str) -> bool:
    """
    Determine if request should be forwarded to Identity Service.
    
    Args:
        path: Request path
        
    Returns:
        True if should forward to Identity Service
    """
    # Forward all auth and user-related requests
    auth_prefixes = [
        "/api/auth/",
        "/api/users/settings"
    ]
    
    return any(path.startswith(prefix) for prefix in auth_prefixes)
