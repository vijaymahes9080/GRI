from typing import List, Dict, Any, Optional

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field

from backend.app.core.rbac import RoleChecker
from backend.app.notifications.notification_engine import notification_engine

router = APIRouter()

admin_or_staff = RoleChecker(allowed_roles=["admin", "staff"])
authenticated = RoleChecker(allowed_roles=["student", "faculty", "admin", "staff"])


class SendNotificationRequest(BaseModel):
    user_id: str = Field(..., min_length=1, max_length=200)
    title: str = Field(..., min_length=1, max_length=200)
    body: str = Field(..., min_length=1, max_length=2000)
    category: str  # emergency | placement | exam | attendance | fee | ai_recommendation
    channels: List[str] = Field(..., min_length=1, max_length=4)  # push | sms | email | whatsapp
    payload: Optional[Dict[str, Any]] = None


class EmergencyBroadcastRequest(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    message: str = Field(..., min_length=1, max_length=2000)


@router.post("/send")
async def send_targeted_notification(
    request: SendNotificationRequest,
    _=Depends(authenticated),
):
    result = await notification_engine.dispatch_notification(
        user_id=request.user_id,
        title=request.title,
        body=request.body,
        category=request.category,
        channels=request.channels,
        payload=request.payload,
    )
    return result


@router.post("/broadcast-emergency")
async def trigger_emergency_broadcast(
    request: EmergencyBroadcastRequest,
    _=Depends(admin_or_staff),
):
    result = await notification_engine.broadcast_emergency_alert(
        title=request.title,
        message=request.message,
    )
    return result


@router.get("/analytics")
async def get_notification_analytics(
    _=Depends(admin_or_staff),
):
    return {
        "total_dispatched_24h": 28450,
        "push_delivery_rate": "99.2%",
        "sms_delivery_rate": "98.7%",
        "email_open_rate": "74.3%",
        "whatsapp_delivery_rate": "99.8%",
        "channel_breakdown": {
            "push": 18200,
            "sms": 5100,
            "email": 3800,
            "whatsapp": 1350,
        }
    }
