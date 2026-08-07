import logging
from typing import List
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from backend.app.core.security import decode_access_token

security_bearer = HTTPBearer()
logger = logging.getLogger("audit_logger")

class RoleChecker:
    def __init__(self, allowed_roles: List[str]):
        self.allowed_roles = allowed_roles

    def __call__(self, credentials: HTTPAuthorizationCredentials = Depends(security_bearer)):
        token = credentials.credentials
        payload = decode_access_token(token)
        if not payload:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid or expired access token",
            )
        
        user_role = payload.get("role")
        user_email = payload.get("sub")

        # Log Audit Trail
        logger.info(f"[AUDIT LOG] User: {user_email} | Role: {user_role} | Accessing Protected Endpoint | Allowed Roles: {self.allowed_roles}")

        if user_role not in self.allowed_roles and "admin" not in self.allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Access forbidden. Role '{user_role}' lacks required permissions.",
            )
        return payload
