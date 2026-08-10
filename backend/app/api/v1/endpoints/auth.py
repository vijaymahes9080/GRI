import os
from typing import Dict

from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, EmailStr

from backend.app.core.config import settings
from backend.app.core.security import (
    create_access_token,
    create_refresh_token,
    decode_access_token,
    get_password_hash,
    verify_password,
)

router = APIRouter()


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class RefreshRequest(BaseModel):
    refreshToken: str


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    role: str


def _load_mock_users() -> Dict[str, Dict[str, str]]:
    """Development-only mock accounts, gated behind ALLOW_MOCK_USERS.

    Credentials are supplied via environment variables (never hardcoded) and the
    feature is fully disabled unless ALLOW_MOCK_USERS=true.
    """
    if not settings.ALLOW_MOCK_USERS:
        return {}

    users: Dict[str, Dict[str, str]] = {}
    for role in ("student", "faculty"):
        email = os.getenv(f"MOCK_{role.upper()}_EMAIL", f"{role}@ruraluniv.ac.in")
        password = os.getenv(f"MOCK_{role.upper()}_PASSWORD", "")
        if not password:
            continue
        users[email] = {
            "password_hash": get_password_hash(password),
            "role": role,
        }
    return users


DEFAULT_USERS = _load_mock_users()


@router.post("/login", response_model=TokenResponse)
async def login(request: LoginRequest):
    user_info = DEFAULT_USERS.get(request.email)
    if not user_info or not verify_password(request.password, user_info["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )

    access_token = create_access_token({"sub": request.email, "role": user_info["role"]})
    refresh_token = create_refresh_token({"sub": request.email, "role": user_info["role"]})
    return TokenResponse(
        access_token=access_token,
        refresh_token=refresh_token,
        role=user_info["role"],
    )


@router.post("/refresh", response_model=TokenResponse)
async def refresh_access_token(request: RefreshRequest):
    payload = decode_access_token(request.refreshToken, expected_type="refresh")
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired refresh token",
        )

    user_email = payload.get("sub")
    user_role = payload.get("role", "student")
    access_token = create_access_token({"sub": user_email, "role": user_role})
    refresh_token = create_refresh_token({"sub": user_email, "role": user_role})
    return TokenResponse(
        access_token=access_token,
        refresh_token=refresh_token,
        role=user_role,
    )
