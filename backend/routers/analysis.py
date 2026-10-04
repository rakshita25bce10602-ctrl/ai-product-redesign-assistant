import os
import uuid
import base64
from typing import List, Optional
from fastapi import APIRouter, HTTPException, UploadFile, File, status

from backend.config import UPLOADS_DIR, settings
from backend.database import save_redesign, get_redesign, list_redesigns
from backend.schemas import AnalyzeProductRequest, AnalyzeProductResponse
from backend.services.analysis_service import generate_demo_product_analysis

router = APIRouter(prefix="/api", tags=["Product Analysis"])

ALLOWED_MIME_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"]

@router.post("/upload")
async def upload_image(file: UploadFile = File(...)):
    """Validates and stores uploaded product images."""
    filename = file.filename or "upload.png"
    ext = os.path.splitext(filename)[1].lower()
    
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unsupported file format '{ext}'. Allowed formats: JPG, JPEG, PNG, WEBP."
        )

    if file.content_type and file.content_type.lower() not in ALLOWED_MIME_TYPES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid MIME type '{file.content_type}'. Must be image/jpeg, image/png, or image/webp."
        )

    contents = await file.read()
    if len(contents) > settings.max_file_size_bytes:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"File exceeds maximum allowed size of 10MB (Received: {len(contents) / (1024*1024):.2f}MB)."
        )

    unique_filename = f"{uuid.uuid4().hex}{ext}"
    file_path = UPLOADS_DIR / unique_filename
    
    with open(file_path, "wb") as buffer:
        buffer.write(contents)

    b64_str = base64.b64encode(contents).decode("utf-8")
    
    return {
        "filename": filename,
        "saved_as": unique_filename,
        "url": f"/uploads/{unique_filename}",
        "base64": f"data:{file.content_type or 'image/jpeg'};base64,{b64_str}",
        "size_bytes": len(contents)
    }

@router.post("/analyze-product", response_model=AnalyzeProductResponse)
def analyze_product(request: AnalyzeProductRequest):
    """
    Main product analysis endpoint.
    Processes product specs, target user, and design priorities using structured DEMO analysis.
    """
    if not request.product_name.strip():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Product name is required.")
    if not request.category.strip():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Product category is required.")
    if not request.target_user.strip():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Target user profile is required.")
    if not request.selected_priorities:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="At least one design priority must be selected.")

    try:
        result = generate_demo_product_analysis(
            product_name=request.product_name.strip(),
            category=request.category.strip(),
            target_user=request.target_user.strip(),
            selected_priorities=request.selected_priorities,
            user_problems=request.user_problems or "",
            image_url=request.image_url or request.image_base64
        )
        
        # Save into SQLite database
        save_redesign(result)
        return result
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Product redesign analysis failed: {str(e)}")

@router.post("/redesign", response_model=AnalyzeProductResponse)
def redesign_product_legacy(request: dict):
    """Compatibility endpoint for legacy /api/redesign calls."""
    p_name = request.get("product_name", "Product")
    p_cat = request.get("product_category") or request.get("category", "General")
    target_user = request.get("target_user", "Consumer")
    priorities = request.get("selected_priorities") or request.get("design_priorities") or ["Comfort", "Sustainability"]
    user_problems = request.get("user_problems", "")
    image_url = request.get("image_url") or request.get("image_data")
    image_base64 = request.get("image_base64")

    req = AnalyzeProductRequest(
        product_name=p_name,
        category=p_cat,
        target_user=target_user,
        selected_priorities=priorities,
        user_problems=user_problems,
        image_url=image_url,
        image_base64=image_base64
    )
    return analyze_product(req)

@router.get("/demo-bottle", response_model=AnalyzeProductResponse)
def get_demo_water_bottle():
    """Returns the instant demonstration analysis for the plastic water bottle reference showcase."""
    result = generate_demo_product_analysis(
        product_name="Standard Single-Use Plastic Water Bottle",
        category="Water Bottle",
        target_user="Fitness & Sports Users",
        selected_priorities=["Comfort", "Portability", "Sustainability", "Durability", "Hygiene"],
        user_problems="Slippery when sweaty, flimsy disposable cap, leaks inside gym bag, difficult to clean narrow neck.",
        image_url="/demo-bottle.svg"
    )
    save_redesign(result)
    return result

@router.get("/history")
def get_history():
    """Lists saved redesign projects from SQLite."""
    return list_redesigns(limit=30)

@router.get("/redesign/{record_id}", response_model=AnalyzeProductResponse)
def get_redesign_record(record_id: str):
    """Retrieves a single redesign project by ID."""
    record = get_redesign(record_id)
    if not record:
        raise HTTPException(status_code=404, detail="Redesign record not found.")
    return record
