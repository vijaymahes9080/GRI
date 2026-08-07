from fastapi import APIRouter
from backend.app.services.website_sync_service import website_sync_service

router = APIRouter()

@router.get("/circulars", response_model=dict)
async def get_live_circulars():
    data = await website_sync_service.fetch_latest_circulars()
    return {
        "success": True,
        "statusCode": 200,
        "message": "Live circulars fetched from ruraluniv.ac.in",
        "data": data
    }

@router.get("/departments", response_model=dict)
async def get_departments():
    data = await website_sync_service.fetch_department_directory()
    return {
        "success": True,
        "statusCode": 200,
        "message": "Department directory fetched",
        "data": data
    }
