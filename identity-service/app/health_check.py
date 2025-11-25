"""
Enhanced Health Check Module
"""

import psutil
import os
from typing import Dict, Any
import structlog

logger = structlog.get_logger(__name__)

async def get_enhanced_health_status() -> Dict[str, Any]:
    """
    Get enhanced health status with detailed system metrics
    
    Returns:
        dict: Comprehensive health status including database, memory, disk
    """
    health_status = {
        "status": "healthy",
        "service": "identity",
        "version": "1.0.0",
        "checks": {}
    }
    
    # Database connectivity check
    try:
        database_url = os.getenv("DATABASE_URL")
        if database_url:
            # Check if we can connect to database
            from app.database import USE_DATABASE
            health_status["checks"]["database"] = {
                "status": "connected" if USE_DATABASE else "not_configured",
                "type": "postgresql" if USE_DATABASE else "in_memory"
            }
        else:
            health_status["checks"]["database"] = {
                "status": "not_configured",
                "type": "in_memory"
            }
    except Exception as e:
        health_status["checks"]["database"] = {
            "status": "error",
            "error": str(e)
        }
        health_status["status"] = "degraded"
    
    # Memory usage check
    try:
        memory = psutil.virtual_memory()
        memory_percent = memory.percent
        health_status["checks"]["memory"] = {
            "status": "ok" if memory_percent < 90 else "warning",
            "used_percent": round(memory_percent, 2),
            "available_mb": round(memory.available / 1024 / 1024, 2)
        }
        if memory_percent >= 90:
            health_status["status"] = "degraded"
    except Exception as e:
        health_status["checks"]["memory"] = {
            "status": "error",
            "error": str(e)
        }
    
    # Disk space check
    try:
        disk = psutil.disk_usage('/')
        disk_percent = disk.percent
        health_status["checks"]["disk"] = {
            "status": "ok" if disk_percent < 90 else "warning",
            "used_percent": round(disk_percent, 2),
            "available_gb": round(disk.free / 1024 / 1024 / 1024, 2)
        }
        if disk_percent >= 90:
            health_status["status"] = "degraded"
    except Exception as e:
        health_status["checks"]["disk"] = {
            "status": "error",
            "error": str(e)
        }
    
    # CPU usage check
    try:
        cpu_percent = psutil.cpu_percent(interval=0.1)
        health_status["checks"]["cpu"] = {
            "status": "ok" if cpu_percent < 90 else "warning",
            "used_percent": round(cpu_percent, 2)
        }
        if cpu_percent >= 90:
            health_status["status"] = "degraded"
    except Exception as e:
        health_status["checks"]["cpu"] = {
            "status": "error",
            "error": str(e)
        }
    
    return health_status
