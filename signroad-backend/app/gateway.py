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
    Forward request to a microservice and return FastAPI Response.
    
    Args:
        request: Original FastAPI request
        service_url: Base URL of the target microservice
        path: Path to forward to the microservice
        
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
                detail=f"Microservice unavailable: {str(e)}"
            )


async def forward_to_identity_service(request: Request, path: str) -> Response:
    """Forward request to Identity Service"""
    return await forward_to_service(request, IDENTITY_SERVICE_URL, path)


async def forward_to_journey_service(request: Request, path: str) -> Response:
    """Forward request to Journey Service"""
    return await forward_to_service(request, JOURNEY_SERVICE_URL, path)
