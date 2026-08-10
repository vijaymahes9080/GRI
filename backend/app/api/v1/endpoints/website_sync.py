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

@router.get("/events", response_model=dict)
async def get_live_events():
    data = await website_sync_service.fetch_latest_events()
    return {
        "success": True,
        "statusCode": 200,
        "message": "Live events and conferences fetched",
        "data": data
    }

@router.get("/tenders", response_model=dict)
async def get_live_tenders():
    data = await website_sync_service.fetch_latest_tenders()
    return {
        "success": True,
        "statusCode": 200,
        "message": "Live tenders and RFPs fetched",
        "data": data
    }

@router.get("/careers", response_model=dict)
async def get_live_careers():
    data = await website_sync_service.fetch_latest_careers()
    return {
        "success": True,
        "statusCode": 200,
        "message": "Live career notifications and recruitment openings fetched",
        "data": data
    }

@router.get("/student-corner", response_model=dict)
async def get_student_corner():
    data = await website_sync_service.fetch_student_corner_services()
    return {
        "success": True,
        "statusCode": 200,
        "message": "Student Corner services taxonomy fetched",
        "data": data
    }

