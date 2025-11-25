"""
Media Service - Standalone FastAPI Application

Handles audio tracks and media content.
This service is independently deployable and scalable.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

# Import media router
from app.media import router as media_router

# Create FastAPI app
app = FastAPI(
    title="SignRoad Media Service",
    version="1.0.0",
    description="Media and audio tracks service"
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
    print("✅ Media Service started successfully")

@app.on_event("shutdown")
async def shutdown_event():
    print("✅ Media Service shut down successfully")

@app.get("/healthz")
async def healthz():
    return {
        "status": "ok",
        "service": "media",
        "version": "1.0.0"
    }

# Include media router
app.include_router(media_router, tags=["media"])
