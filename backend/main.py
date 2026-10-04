from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from backend.config import UPLOADS_DIR, settings
from backend.database import init_db
from backend.routers import analysis, meta

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize SQLite database schema on startup
    init_db()
    yield

app = FastAPI(
    title=settings.app_name,
    description="Backend API for physical product redesign analysis, SCAMPER generation, scoring, and sustainability evaluation.",
    version=settings.app_version,
    lifespan=lifespan
)

# Configure CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve static uploads
app.mount("/uploads", StaticFiles(directory=str(UPLOADS_DIR)), name="uploads")

# Include Routers
app.include_router(meta.router)
app.include_router(analysis.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host=settings.host, port=settings.port, reload=True)
