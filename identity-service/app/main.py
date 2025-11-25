"""
Identity Service - Standalone FastAPI Application

Handles authentication, authorization, and user management.
This service is independently deployable and scalable.
"""

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
import os

# Import identity router
from app.identity import router as identity_router

# Import rate limiter
from app.rate_limit import limiter

# Import logging configuration
from app.logging_config import configure_logging
from app.logging_middleware import LoggingMiddleware

# Create FastAPI app
app = FastAPI(
    title="SignRoad Identity Service",
    version="1.0.0",
    description="Authentication and user management service"
)

# Add rate limiter
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Load allowed origins from environment variable
ALLOWED_ORIGINS = os.getenv(
    "ALLOWED_ORIGINS",
    "http://localhost:5173,https://pr-generator-yatdm0kx.devinapps.com,http://localhost:8000"
).split(",")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["Authorization", "Content-Type"],
)

# Add logging middleware
app.add_middleware(LoggingMiddleware)

@app.on_event("startup")
async def startup_event():
    configure_logging()
    print("✅ Identity Service started successfully with structured logging")

@app.on_event("shutdown")
async def shutdown_event():
    print("✅ Identity Service shut down successfully")

@app.get("/healthz")
async def healthz():
    return {
        "status": "ok",
        "service": "identity",
        "version": "1.0.0"
    }

# Include identity router (removes /api prefix since this is a dedicated service)
app.include_router(identity_router, prefix="", tags=["identity"])
