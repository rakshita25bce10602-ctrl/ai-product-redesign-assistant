import os
from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict

BASE_DIR = Path(__file__).resolve().parent.parent
DB_DIR = BASE_DIR / "database"
UPLOADS_DIR = BASE_DIR / "backend" / "uploads"

# Ensure directories exist
DB_DIR.mkdir(exist_ok=True)
UPLOADS_DIR.mkdir(exist_ok=True)

class Settings(BaseSettings):
    app_name: str = "AI Product Redesign Assistant API"
    app_version: str = "1.1.0"
    debug: bool = False
    port: int = 8000
    host: str = "0.0.0.0"
    cors_origins: list = ["*"]
    database_path: str = str(DB_DIR / "redesign.db")
    gemini_api_key: str = ""
    demo_mode_active: bool = True
    max_file_size_bytes: int = 10 * 1024 * 1024  # 10 MB

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

settings = Settings()

# Direct variables for easy import
DATABASE_PATH = settings.database_path
PORT = settings.port
HOST = settings.host
GEMINI_API_KEY = settings.gemini_api_key
