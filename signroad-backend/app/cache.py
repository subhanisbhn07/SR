"""
Redis Caching Module
"""

import redis
import json
import os
from typing import Optional, Any
import structlog

logger = structlog.get_logger(__name__)

# Redis configuration
REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379")
CACHE_ENABLED = os.getenv("CACHE_ENABLED", "true").lower() == "true"

# Cache TTL configurations (in seconds)
CACHE_TTL = {
    "day_content": 3600,      # 1 hour
    "audio_track": 3600,      # 1 hour
    "cosmetic_item": 3600,    # 1 hour
    "user_profile": 300,      # 5 minutes
}

class CacheManager:
    """Redis cache manager with automatic serialization"""
    
    def __init__(self):
        self.redis_client = None
        self.enabled = CACHE_ENABLED
        
        if self.enabled:
            try:
                self.redis_client = redis.from_url(
                    REDIS_URL,
                    decode_responses=True,
                    socket_connect_timeout=2,
                    socket_timeout=2
                )
                # Test connection
                self.redis_client.ping()
                logger.info("redis_connected", url=REDIS_URL)
            except Exception as e:
                logger.warning("redis_connection_failed", error=str(e))
                self.enabled = False
                self.redis_client = None
    
    def get(self, key: str) -> Optional[Any]:
        """Get value from cache"""
        if not self.enabled or not self.redis_client:
            return None
        
        try:
            value = self.redis_client.get(key)
            if value:
                logger.debug("cache_hit", key=key)
                return json.loads(value)
            logger.debug("cache_miss", key=key)
            return None
        except Exception as e:
            logger.error("cache_get_error", key=key, error=str(e))
            return None
    
    def set(self, key: str, value: Any, ttl: int = 300) -> bool:
        """Set value in cache with TTL"""
        if not self.enabled or not self.redis_client:
            return False
        
        try:
            serialized = json.dumps(value)
            self.redis_client.setex(key, ttl, serialized)
            logger.debug("cache_set", key=key, ttl=ttl)
            return True
        except Exception as e:
            logger.error("cache_set_error", key=key, error=str(e))
            return False
    
    def delete(self, key: str) -> bool:
        """Delete value from cache"""
        if not self.enabled or not self.redis_client:
            return False
        
        try:
            self.redis_client.delete(key)
            logger.debug("cache_delete", key=key)
            return True
        except Exception as e:
            logger.error("cache_delete_error", key=key, error=str(e))
            return False
    
    def delete_pattern(self, pattern: str) -> bool:
        """Delete all keys matching pattern"""
        if not self.enabled or not self.redis_client:
            return False
        
        try:
            keys = self.redis_client.keys(pattern)
            if keys:
                self.redis_client.delete(*keys)
                logger.debug("cache_delete_pattern", pattern=pattern, count=len(keys))
            return True
        except Exception as e:
            logger.error("cache_delete_pattern_error", pattern=pattern, error=str(e))
            return False
    
    def get_stats(self) -> dict:
        """Get cache statistics"""
        if not self.enabled or not self.redis_client:
            return {"enabled": False}
        
        try:
            info = self.redis_client.info("stats")
            return {
                "enabled": True,
                "hits": info.get("keyspace_hits", 0),
                "misses": info.get("keyspace_misses", 0),
                "hit_rate": self._calculate_hit_rate(
                    info.get("keyspace_hits", 0),
                    info.get("keyspace_misses", 0)
                )
            }
        except Exception as e:
            logger.error("cache_stats_error", error=str(e))
            return {"enabled": True, "error": str(e)}
    
    def _calculate_hit_rate(self, hits: int, misses: int) -> float:
        """Calculate cache hit rate percentage"""
        total = hits + misses
        if total == 0:
            return 0.0
        return round((hits / total) * 100, 2)

# Global cache instance
cache = CacheManager()

# Cache key generators
def user_cache_key(user_id: str) -> str:
    """Generate cache key for user profile"""
    return f"user:{user_id}"

def day_content_cache_key(day_number: int) -> str:
    """Generate cache key for day content"""
    return f"day:{day_number}"

def audio_track_cache_key(track_id: str) -> str:
    """Generate cache key for audio track"""
    return f"audio:{track_id}"

def cosmetic_item_cache_key(item_id: str) -> str:
    """Generate cache key for cosmetic item"""
    return f"cosmetic:{item_id}"
