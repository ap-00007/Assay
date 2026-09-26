from typing import List, Union
from pydantic_settings import BaseSettings
from pydantic import AnyHttpUrl, field_validator
import os


class Settings(BaseSettings):
    PROJECT_NAME: str = "Assay Financial Health API"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = "assay-secret-key-change-in-production-0123456789"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    ENVIRONMENT: str = "development"
    
    # CORS
    CORS_ORIGINS: List[str] = ["*"]

    # Database
    DATABASE_URL: str = "sqlite:///./assay.db"

    # Providers
    LLM_PROVIDER: str = "mock"
    AA_PROVIDER: str = "mock"

    class Config:
        case_sensitive = True
        env_file = ".env"
        extra = "allow"


settings = Settings()
