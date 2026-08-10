"""
GRI Enterprise Security & WAF Middleware
Implements OWASP Top 10 Mitigations, Rate Limiting, Security Headers, and Input Sanitization

Author  : Chief Information Security Officer (Vijay Mahes)
Version : 1.0.0
"""

import re
import time
import logging
from fastapi import Request, HTTPException, status
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import Response

logging.basicConfig(level=logging.INFO)
security_logger = logging.getLogger("security_waf")


class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    """Enforce OWASP Recommended Security Headers on all HTTP responses."""

    async def dispatch(self, request: Request, call_next) -> Response:
        response = await call_next(request)

        # OWASP Security Headers
        response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains; preload"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        response.headers["Content-Security-Policy"] = (
            "default-src 'self'; "
            "script-src 'self'; "
            "style-src 'self' 'unsafe-inline'; "
            "img-src 'self' data: https:; "
            "font-src 'self'; "
            "connect-src 'self' https://api.ruraluniv.ac.in;"
        )
        response.headers["Permissions-Policy"] = "geolocation=(self), camera=(), microphone=()"

        return response


import json
from starlette.responses import JSONResponse

class RateLimiterWAFMiddleware(BaseHTTPMiddleware):
    """Sliding Window Rate Limiter (Max 100 requests / minute per IP)."""

    def __init__(self, app, max_requests: int = 100, window_seconds: int = 60):
        super().__init__(app)
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self.ip_history = {}

    async def dispatch(self, request: Request, call_next) -> Response:
        client_ip = request.client.host if request.client else "unknown"
        current_time = time.time()

        # Clean old timestamps and prevent dictionary memory growth
        if len(self.ip_history) > 10000:
            # Purge stale keys if tracking memory expands
            self.ip_history = {
                ip: timestamps for ip, timestamps in self.ip_history.items()
                if any(current_time - t < self.window_seconds for t in timestamps)
            }

        if client_ip in self.ip_history:
            self.ip_history[client_ip] = [
                t for t in self.ip_history[client_ip] if current_time - t < self.window_seconds
            ]
        else:
            self.ip_history[client_ip] = []

        if len(self.ip_history[client_ip]) >= self.max_requests:
            security_logger.warning(f"[WAF RATE LIMIT EXCEEDED] IP: {client_ip} | Path: {request.url.path}")
            return JSONResponse(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                content={"detail": "Rate limit exceeded. Maximum 100 requests per minute allowed."},
            )

        self.ip_history[client_ip].append(current_time)
        return await call_next(request)


def sanitize_input(text: str) -> str:
    """Sanitize input string against XSS & SQL Injection attack vectors."""
    if not text:
        return text
    # Strip dangerous HTML script tags & SQL injection patterns
    cleaned = re.sub(r"<script.*?>.*?</script>", "", text, flags=re.IGNORECASE)
    cleaned = re.sub(r"(--|;|/\*|\*/|@@|char|nchar|alter|drop|truncate)", "", cleaned, flags=re.IGNORECASE)
    return cleaned.strip()
