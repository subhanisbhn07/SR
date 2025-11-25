"""
Rate Limiting Configuration
"""

from slowapi import Limiter
from slowapi.util import get_remote_address

# Create limiter instance
limiter = Limiter(key_func=get_remote_address)

# Rate limit configurations
RATE_LIMITS = {
    "auth_login": "5/15minute",      # 5 login attempts per 15 minutes
    "auth_register": "3/hour",       # 3 registrations per hour
    "api_default": "100/minute",     # 100 API calls per minute
}
