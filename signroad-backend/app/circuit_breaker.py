"""
Circuit Breaker Pattern for Inter-Service Communication
"""

import pybreaker
import structlog
from typing import Callable, Any

logger = structlog.get_logger(__name__)

# Circuit breaker configuration
FAILURE_THRESHOLD = 5  # Number of failures before opening circuit
TIMEOUT_DURATION = 60  # Seconds to wait before attempting recovery

class CircuitBreakerListener(pybreaker.CircuitBreakerListener):
    """Custom listener for circuit breaker events"""
    
    def state_change(self, cb, old_state, new_state):
        """Called when circuit breaker state changes"""
        logger.warning(
            "circuit_breaker_state_change",
            circuit_breaker=cb.name,
            old_state=str(old_state),
            new_state=str(new_state),
            failure_count=cb.fail_counter
        )
    
    def failure(self, cb, exc):
        """Called when a failure occurs"""
        logger.error(
            "circuit_breaker_failure",
            circuit_breaker=cb.name,
            error=str(exc),
            failure_count=cb.fail_counter
        )
    
    def success(self, cb):
        """Called when a success occurs"""
        logger.debug(
            "circuit_breaker_success",
            circuit_breaker=cb.name,
            failure_count=cb.fail_counter
        )

# Create circuit breakers for each microservice
# Note: pybreaker uses 'reset_timeout' not 'timeout_duration'
# pybreaker doesn't have 'expected_exception' parameter - it catches all exceptions by default
identity_breaker = pybreaker.CircuitBreaker(
    fail_max=FAILURE_THRESHOLD,
    reset_timeout=TIMEOUT_DURATION,
    name="identity_service",
    listeners=[CircuitBreakerListener()]
)

journey_breaker = pybreaker.CircuitBreaker(
    fail_max=FAILURE_THRESHOLD,
    reset_timeout=TIMEOUT_DURATION,
    name="journey_service",
    listeners=[CircuitBreakerListener()]
)

social_breaker = pybreaker.CircuitBreaker(
    fail_max=FAILURE_THRESHOLD,
    reset_timeout=TIMEOUT_DURATION,
    name="social_service",
    listeners=[CircuitBreakerListener()]
)

media_breaker = pybreaker.CircuitBreaker(
    fail_max=FAILURE_THRESHOLD,
    reset_timeout=TIMEOUT_DURATION,
    name="media_service",
    listeners=[CircuitBreakerListener()]
)

admin_breaker = pybreaker.CircuitBreaker(
    fail_max=FAILURE_THRESHOLD,
    reset_timeout=TIMEOUT_DURATION,
    name="admin_service",
    listeners=[CircuitBreakerListener()]
)

def get_breaker_for_service(service_name: str) -> pybreaker.CircuitBreaker:
    """Get circuit breaker for a specific service"""
    breakers = {
        "identity": identity_breaker,
        "journey": journey_breaker,
        "social": social_breaker,
        "media": media_breaker,
        "admin": admin_breaker,
    }
    return breakers.get(service_name, identity_breaker)

def get_all_breaker_states() -> dict:
    """Get current state of all circuit breakers"""
    breakers = {
        "identity": identity_breaker,
        "journey": journey_breaker,
        "social": social_breaker,
        "media": media_breaker,
        "admin": admin_breaker,
    }
    
    return {
        name: {
            "state": str(breaker.current_state),
            "failure_count": breaker.fail_counter
        }
        for name, breaker in breakers.items()
    }
