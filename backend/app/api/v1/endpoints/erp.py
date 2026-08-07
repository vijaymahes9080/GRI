from fastapi import APIRouter, Header, HTTPException
from pydantic import BaseModel
from typing import Dict, Any
from backend.app.erp.erp_middleware import erp_engine

router = APIRouter()

class ERPSyncRequest(BaseModel):
    roll_number: str

class ERPWebhookPayload(BaseModel):
    event_type: str
    data: Dict[str, Any]

@router.post("/sync")
async def trigger_erp_sync(request: ERPSyncRequest):
    if not request.roll_number:
        raise HTTPException(status_code=400, detail="Roll number is required")
    
    result = await erp_engine.sync_student_data(request.roll_number)
    return result

@router.post("/webhook")
async def receive_erp_webhook(
    payload: ERPWebhookPayload,
    x_erp_signature: str = Header(None)
):
    # Process incoming real-time ERP events
    result = await erp_engine.handle_incoming_webhook(payload.event_type, payload.data)
    return result
