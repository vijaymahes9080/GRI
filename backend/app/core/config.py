import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "GRI Unified University Backend API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # Free Cloud Stack Integrations
    RAILWAY_ENVIRONMENT: str = os.getenv("RAILWAY_ENVIRONMENT", "production")
    SUPABASE_DB_URL: str = os.getenv("DATABASE_URL", "postgresql://postgres:supa_pass@db.xyz.supabase.co:5432/postgres")
    VERCEL_ADMIN_URL: str = os.getenv("VERCEL_ADMIN_URL", "https://admin.ruraluniv.ac.in")
    CLOUDFLARE_CDN_URL: str = os.getenv("CLOUDFLARE_CDN_URL", "https://cdn.ruraluniv.ac.in")
    FIREBASE_SERVER_KEY: str = os.getenv("FIREBASE_SERVER_KEY", "dummy_fcm_key")
    UPTIME_KUMA_WEBHOOK: str = os.getenv("UPTIME_KUMA_WEBHOOK", "https://monitoring.ruraluniv-app.com/api/push/key")

    # Database Settings
    POSTGRES_HOST: str = "localhost"
    POSTGRES_PORT: int = 5432
    POSTGRES_USER: str = "gri_user"
    POSTGRES_PASSWORD: str = "gri_password"
    POSTGRES_DB: str = "gri_db"
    
    @property
    def ASYNC_DATABASE_URL(self) -> str:
        if "postgresql://" in self.SUPABASE_DB_URL:
            return self.SUPABASE_DB_URL.replace("postgresql://", "postgresql+asyncpg://")
        return f"postgresql+asyncpg://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_HOST}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"

    # Redis Settings
    REDIS_HOST: str = os.getenv("REDIS_HOST", "localhost")
    REDIS_PORT: int = int(os.getenv("REDIS_PORT", 6379))

    # JWT Security Settings
    SECRET_KEY: str = os.getenv("SECRET_KEY", "SUPER_SECRET_PRODUCTION_KEY_GRI_2026_CHANGE_IN_ENV")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 # 24 Hours
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings()
