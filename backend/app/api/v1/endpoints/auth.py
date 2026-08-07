from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, EmailStr
from backend.app.core.security import create_access_token, verify_password, get_password_hash

router = APIRouter()

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: str

@router.post("/login", response_model=TokenResponse)
async def login(request: LoginRequest):
    # Mock user verification for initial production scaffold
    if request.email == "student@ruraluniv.ac.in" and request.password == "password123":
        token = create_access_token({"sub": "student@ruraluniv.ac.in", "role": "student"})
        return TokenResponse(access_token=token, role="student")
    elif request.email == "faculty@ruraluniv.ac.in" and request.password == "password123":
        token = create_access_token({"sub": "faculty@ruraluniv.ac.in", "role": "faculty"})
        return TokenResponse(access_token=token, role="faculty")
    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )
