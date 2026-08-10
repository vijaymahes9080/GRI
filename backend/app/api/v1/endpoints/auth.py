from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, EmailStr
from backend.app.core.security import create_access_token, verify_password, get_password_hash
from backend.app.core.config import settings

router = APIRouter()

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: str

# Default pre-hashed credentials for initial setup (avoiding hardcoded plaintext in code)
DEFAULT_USERS = {
    "student@ruraluniv.ac.in": {
        "password_hash": "$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeg6Lruj3vjPGga31lW", # hashed 'password123'
        "role": "student"
    },
    "faculty@ruraluniv.ac.in": {
        "password_hash": "$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeg6Lruj3vjPGga31lW", # hashed 'password123'
        "role": "faculty"
    }
}

@router.post("/login", response_model=TokenResponse)
async def login(request: LoginRequest):
    user_info = DEFAULT_USERS.get(request.email)
    if user_info and verify_password(request.password, user_info["password_hash"]):
        token = create_access_token({"sub": request.email, "role": user_info["role"]})
        return TokenResponse(access_token=token, role=user_info["role"])
    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )
