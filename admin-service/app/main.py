"""
Admin Service - Standalone FastAPI Application

Handles content management and platform statistics.
This service is independently deployable and scalable.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

# Import admin router
from app.admin.routers import router as admin_router

# Import database
from app.database import USE_DATABASE, init_db, close_db
import app.storage_adapter as storage

# Create FastAPI app
app = FastAPI(
    title="SignRoad Admin Service",
    version="1.0.0",
    description="Content management and platform statistics service"
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
    if USE_DATABASE:
        await init_db()
    print("✅ Admin Service started successfully")

@app.on_event("shutdown")
async def shutdown_event():
    if USE_DATABASE:
        await close_db()
    print("✅ Admin Service shut down successfully")

@app.get("/healthz")
async def healthz():
    return {
        "status": "ok",
        "service": "admin",
        "version": "1.0.0"
    }

# Include admin router
app.include_router(admin_router)
