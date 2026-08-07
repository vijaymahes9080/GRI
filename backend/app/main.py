from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from prometheus_fastapi_instrumentator import Instrumentator

from backend.app.core.config import settings
from backend.app.api.v1.endpoints import auth, students, files

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    docs_url="/docs",            # Swagger UI
    redoc_url="/redoc",          # ReDoc UI
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Prometheus Monitoring Instrumentation
Instrumentator().instrument(app).expose(app)

# Include Routers
app.include_router(auth.router, prefix=f"{settings.API_V1_STR}/auth", tags=["Authentication"])
app.include_router(oauth.router, prefix=f"{settings.API_V1_STR}/oauth", tags=["OAuth, OTP & MFA"])
app.include_router(rag.router, prefix=f"{settings.API_V1_STR}/rag", tags=["AI Chatbot & RAG Engine"])
app.include_router(students.router, prefix=f"{settings.API_V1_STR}/students", tags=["Students"])
app.include_router(files.router, prefix=f"{settings.API_V1_STR}/files", tags=["Files & Parsing"])

@app.get("/health", tags=["Health"])
async def health_check():
    return {
        "status": "healthy",
        "service": settings.PROJECT_NAME,
        "version": settings.VERSION,
    }
