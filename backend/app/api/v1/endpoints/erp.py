from fastapi import APIRouter, Query, HTTPException, BackgroundTasks
from pydantic import BaseModel
from typing import Dict, Any, Optional

from backend.app.erp.erp_middleware import erp_engine

router = APIRouter()

class WebhookEvent(BaseModel):
    event_type: str
    payload: Dict[str, Any]

@router.get("/sync/{roll_number}", response_model=dict)
async def sync_student_full(roll_number: str):
    data = await erp_engine.sync_student_data(roll_number)
    return {
        "success": True,
        "statusCode": 200,
        "message": f"Full ERP synchronization completed for roll number {roll_number}",
        "data": data
    }

@router.get("/sync/{roll_number}/attendance", response_model=dict)
async def sync_student_attendance(roll_number: str):
    data = await erp_engine.sync_attendance(roll_number)
    return {
        "success": True,
        "statusCode": 200,
        "message": "Attendance records synchronized from ERP SOAP endpoint",
        "data": data
    }

@router.get("/sync/{roll_number}/results", response_model=dict)
async def sync_student_results(roll_number: str, semester: int = Query(default=3)):
    data = await erp_engine.sync_exam_results(roll_number, semester)
    return {
        "success": True,
        "statusCode": 200,
        "message": f"Semester {semester} results synchronized from legacy database",
        "data": data
    }

@router.get("/sync/assignments/{course_code}", response_model=dict)
async def sync_assignments(course_code: str):
    data = await erp_engine.sync_assignments(course_code)
    return {
        "success": True,
        "statusCode": 200,
        "message": f"Assignments synchronized for {course_code}",
        "data": data
    }

@router.post("/webhook", response_model=dict)
async def handle_erp_webhook(event: WebhookEvent, background_tasks: BackgroundTasks):
    result = await erp_engine.handle_incoming_webhook(event.event_type, event.payload)
    return {
        "success": True,
        "statusCode": 200,
        "message": "Webhook received",
        "data": result
    }
