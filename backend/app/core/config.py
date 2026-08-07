from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "GRI Backend API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # Database Settings
    POSTGRES_HOST: str = "localhost"
    POSTGRES_PORT: int = 5432
    POSTGRES_USER: str = "gri_user"
    POSTGRES_PASSWORD: str = "gri_password"
    POSTGRES_DB: str = "gri_db"
    
    @property
    def ASYNC_DATABASE_URL(self) -> str:
        return f"postgresql+asyncpg://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_HOST}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"

    # Redis Settings
    REDIS_HOST: str = "localhost"
    REDIS_PORT: int = 6379

    # JWT Security Settings
    SECRET_KEY: str = "SUPER_SECRET_PRODUCTION_KEY_GRI_2026_CHANGE_IN_ENV"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 # 24 Hours
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    # Celery & RabbitMQ
    RABBITMQ_URL: str = "amqp://guest:guest@localhost:5672//"

    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings()
