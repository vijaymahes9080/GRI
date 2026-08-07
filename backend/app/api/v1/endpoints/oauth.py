from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, EmailStr
from backend.app.core.security import create_access_token

router = APIRouter()

class OAuthSSORequest(BaseModel):
    provider: str # google | microsoft
    id_token: str

class OTPRequest(BaseModel):
    email: EmailStr

class OTPVerifyRequest(BaseModel):
    email: EmailStr
    otp_code: str

class MFATOTPVerifyRequest(BaseModel):
    user_id: str
    totp_code: str

@router.post("/sso")
async def oauth_sso_login(request: OAuthSSORequest):
    if request.provider not in ["google", "microsoft"]:
        raise HTTPException(status_code=400, detail="Unsupported OAuth provider")
    
    # Mock OAuth SSO Token Validation & User Provisioning
    user_email = f"sso_user@{request.provider}.com"
    token = create_access_token({"sub": user_email, "role": "student"})
    
    return {
        "status": "success",
        "provider": request.provider,
        "email": user_email,
        "access_token": token,
        "token_type": "bearer",
        "mfa_required": False,
    }

@router.post("/send-otp")
async def send_email_otp(request: OTPRequest):
    # Mock sending 6-digit OTP via Email/SMS
    return {"status": "otp_sent", "email": request.email, "valid_for_seconds": 300}

@router.post("/verify-otp")
async def verify_email_otp(request: OTPVerifyRequest):
    if request.otp_code == "123456":
        token = create_access_token({"sub": request.email, "role": "student"})
        return {"status": "verified", "access_token": token}
    raise HTTPException(status_code=400, detail="Invalid or expired OTP code")

@router.post("/verify-mfa")
async def verify_totp_mfa(request: MFATOTPVerifyRequest):
    if request.totp_code == "654321":
        token = create_access_token({"sub": request.user_id, "role": "student", "mfa_verified": True})
        return {"status": "mfa_success", "access_token": token}
    raise HTTPException(status_code=400, detail="Invalid MFA TOTP code")
