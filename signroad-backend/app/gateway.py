"""
API Gateway - Routes requests to appropriate microservices

This gateway forwards authentication requests to the Identity Service
and handles all other requests locally.
"""

import httpx
import os
from fastapi import Request, HTTPException, Response
from typing import Dict
import structlog
from app.circuit_breaker import (
    identity_breaker,
    journey_breaker,
    social_breaker,
    media_breaker,
    admin_breaker
)

logger = structlog.get_logger(__name__)

# Microservice URLs (internal communication)
IDENTITY_SERVICE_URL = os.getenv("IDENTITY_SERVICE_URL", "http://localhost:8001")
JOURNEY_SERVICE_URL = os.getenv("JOURNEY_SERVICE_URL", "http://localhost:8002")
SOCIAL_SERVICE_URL = os.getenv("SOCIAL_SERVICE_URL", "http://localhost:8003")
MEDIA_SERVICE_URL = os.getenv("MEDIA_SERVICE_URL", "http://localhost:8004")
ADMIN_SERVICE_URL = os.getenv("ADMIN_SERVICE_URL", "http://localhost:8005")

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


async def forward_to_service(request: Request, service_url: str, path: str, breaker=None) -> Response:
    """
    Forward request to a microservice and return FastAPI Response.
    
    Args:
        request: Original FastAPI request
        service_url: Base URL of the target microservice
        path: Path to forward to the microservice
        breaker: Circuit breaker instance (optional)
        
    Returns:
        FastAPI Response object with status, headers, and content from microservice
    """
    # Build full URL
    url = f"{service_url}{path}"
    
    # Get request body if present
    body = None
    if request.method in ["POST", "PUT", "PATCH"]:
        body = await request.body()
    
    # Forward headers (excluding hop-by-hop headers)
    headers = {
        k: v for k, v in request.headers.items()
        if k.lower() not in HOP_BY_HOP_HEADERS
    }
    
    async def make_request():
        """Make the actual HTTP request"""
        async with httpx.AsyncClient(timeout=30.0) as client:
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
    
    try:
        # Use circuit breaker if provided
        if breaker:
            # pybreaker's call_async has issues, so we use call with async function
            # The breaker will track failures but we handle the async execution
            return await breaker.call(make_request)
        else:
            return await make_request()
            
    except httpx.RequestError as e:
        logger.error("service_request_error", url=url, error=str(e))
        raise HTTPException(
            status_code=503,
            detail=f"Microservice unavailable: {str(e)}"
        )
    except Exception as e:
        logger.error("circuit_breaker_error", url=url, error=str(e))
        raise HTTPException(
            status_code=503,
            detail=f"Service temporarily unavailable: {str(e)}"
        )


async def forward_to_identity_service(request: Request, path: str) -> Response:
    """Forward request to Identity Service with circuit breaker"""
    return await forward_to_service(request, IDENTITY_SERVICE_URL, path, identity_breaker)


async def forward_to_journey_service(request: Request, path: str) -> Response:
    """Forward request to Journey Service with circuit breaker"""
    return await forward_to_service(request, JOURNEY_SERVICE_URL, path, journey_breaker)


async def forward_to_social_service(request: Request, path: str) -> Response:
    """Forward request to Social Service with circuit breaker"""
    return await forward_to_service(request, SOCIAL_SERVICE_URL, path, social_breaker)


async def forward_to_media_service(request: Request, path: str) -> Response:
    """Forward request to Media Service with circuit breaker"""
    return await forward_to_service(request, MEDIA_SERVICE_URL, path, media_breaker)


async def forward_to_admin_service(request: Request, path: str) -> Response:
    """Forward request to Admin Service with circuit breaker"""
    return await forward_to_service(request, ADMIN_SERVICE_URL, path, admin_breaker)
