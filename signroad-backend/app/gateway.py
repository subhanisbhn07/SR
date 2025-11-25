"""
API Gateway - Routes requests to appropriate microservices

This gateway forwards authentication requests to the Identity Service
and handles all other requests locally.
"""

import httpx
import os
from fastapi import Request, HTTPException, Response
from typing import Dict

# Microservice URLs (internal communication)
IDENTITY_SERVICE_URL = os.getenv("IDENTITY_SERVICE_URL", "http://localhost:8001")
JOURNEY_SERVICE_URL = os.getenv("JOURNEY_SERVICE_URL", "http://localhost:8002")

# Hop-by-hop headers that should not be forwarded
HOP_BY_HOP_HEADERS = {
    "connection",
    "keep-alive",
    "proxy-authenticate",
    "proxy-authorization",
    "te",
    "trailers",
    "transfer-encoding",
    "upgrade",
    "host",
}


async def forward_to_service(request: Request, service_url: str, path: str) -> Response:
    """
    Forward request to Identity Service and return FastAPI Response.
    
    Args:
        request: Original FastAPI request
        path: Path to forward to Identity Service
        
    Returns:
        FastAPI Response object with status, headers, and content from Identity Service
    """
    # Build full URL
    url = f"{IDENTITY_SERVICE_URL}{path}"
    
    # Get request body if present
    body = None
    if request.method in ["POST", "PUT", "PATCH"]:
        body = await request.body()
    
    # Forward headers (excluding hop-by-hop headers)
    headers = {
        k: v for k, v in request.headers.items()
        if k.lower() not in HOP_BY_HOP_HEADERS
    }
    
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
            
            # Filter response headers (remove hop-by-hop headers)
            response_headers = {
                k: v for k, v in response.headers.items()
                if k.lower() not in HOP_BY_HOP_HEADERS
            }
            
            # Return FastAPI Response
            return Response(
                content=response.content,
                status_code=response.status_code,
                headers=response_headers,
                media_type=response.headers.get("content-type")
            )
            
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
        "/api/users/settings",
        "/api/admin/users"
    ]
    
    return any(path.startswith(prefix) for prefix in auth_prefixes)
