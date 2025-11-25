"""
Journey Service - Standalone FastAPI Application

Handles journey progression, day content, signs, and journal entries.
This service is independently deployable and scalable.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

# Import journey router
from app.journey import router as journey_router

# Create FastAPI app
app = FastAPI(
    title="SignRoad Journey Service",
    version="1.0.0",
    description="Journey progression and content service"
)

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

@app.on_event("startup")
async def startup_event():
    print("✅ Journey Service started successfully")

@app.on_event("shutdown")
async def shutdown_event():
    print("✅ Journey Service shut down successfully")

@app.get("/healthz")
async def healthz():
    return {
        "status": "ok",
        "service": "journey",
        "version": "1.0.0"
    }

# Include journey router (keeps /api/journey prefix for consistency with gateway)
app.include_router(journey_router, tags=["journey"])
