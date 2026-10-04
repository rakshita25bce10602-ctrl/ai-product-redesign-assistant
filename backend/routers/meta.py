from fastapi import APIRouter
from backend.config import settings

router = APIRouter(prefix="/api", tags=["Metadata & Configuration"])

@router.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": settings.app_name,
        "version": settings.app_version,
        "demo_mode_active": True,
        "database": "SQLite initialized"
    }

@router.get("/categories")
def get_categories():
    return [
        {
            "id": "Water Bottle",
            "name": "Water Bottle",
            "icon": "Droplet",
            "sample_name": "Standard Plastic Water Bottle",
            "default_problems": "Slippery grip when wet, cap leaks in bags, narrow neck hard to clean, single-use plastic waste."
        },
        {
            "id": "Chair",
            "name": "Chair / Ergonomic Seating",
            "icon": "Armchair",
            "sample_name": "Standard Office Task Chair",
            "default_problems": "Poor lumbar support, non-recyclable multi-material foam, heat trapping."
        },
        {
            "id": "Helmet",
            "name": "Helmet / Safety Gear",
            "icon": "Shield",
            "sample_name": "Urban Commuter Bike Helmet",
            "default_problems": "Restricted airflow ventilation, bulky storage footprint, non-detachable padding."
        },
        {
            "id": "Bag",
            "name": "Bag / Backpack",
            "icon": "Briefcase",
            "sample_name": "Daily Commuter Backpack",
            "default_problems": "Uneven shoulder pressure, difficult access to essentials, zipper wear."
        },
        {
            "id": "Packaging",
            "name": "Packaging / Box",
            "icon": "Box",
            "sample_name": "E-Commerce Delivery Shipping Box",
            "default_problems": "Excess plastic adhesive tape, oversized box volume, non-collapsible after delivery."
        },
        {
            "id": "Container",
            "name": "Food Container",
            "icon": "Utensils",
            "sample_name": "Plastic Lunch Box Container",
            "default_problems": "Food grease staining, broken lid snap tabs, warping in microwave."
        },
        {
            "id": "Phone Stand",
            "name": "Phone Stand / Desk Accessory",
            "icon": "Smartphone",
            "sample_name": "Universal Desk Phone Cradle",
            "default_problems": "Fixed viewing angle, tip-over instability, charging cables get pinched."
        },
        {
            "id": "Other",
            "name": "Other Physical Product",
            "icon": "Package",
            "sample_name": "Custom Hardware Product",
            "default_problems": "High material waste, poor ergonomic reach, difficult maintenance."
        }
    ]

@router.get("/user-profiles")
def get_user_profiles():
    return [
        {
            "id": "Students",
            "name": "Students",
            "icon": "GraduationCap",
            "description": "High mobility, budget-conscious, frequent backpack transit.",
            "default_priorities": ["Portability", "Affordability", "Durability", "Safety"],
            "example_needs": "Lightweight, Low cost, Leak-proof, Easy to carry, Backpack fit."
        },
        {
            "id": "Office Workers",
            "name": "Office Workers",
            "icon": "Building2",
            "description": "Desk-focused, quiet professional environment, multi-tasking.",
            "default_priorities": ["Comfort", "Functionality", "Appearance", "Hygiene"],
            "example_needs": "One-hand operation, Temperature retention, Clean appearance, Desk-friendly design."
        },
        {
            "id": "Fitness & Sports Users",
            "name": "Fitness & Sports Users",
            "icon": "Activity",
            "description": "High-motion athletic activity, rapid fluid replenishment, rugged use.",
            "default_priorities": ["Comfort", "Durability", "Functionality", "Portability"],
            "example_needs": "Ergonomic grip, Quick-sip operation, Measurement markings, Easy handling."
        },
        {
            "id": "Travellers & Commuters",
            "name": "Travellers & Commuters",
            "icon": "Plane",
            "description": "Transit across cars, trains, flights; cupholder and luggage compatibility.",
            "default_priorities": ["Portability", "Durability", "Safety", "Functionality"],
            "example_needs": "Secure sealing, Carry handle, Durability, Portability, Cupholder fit."
        },
        {
            "id": "Families & Children",
            "name": "Families & Children",
            "icon": "Users",
            "description": "Non-toxic chemical safety, high drop tolerance, easy sanitation for parents.",
            "default_priorities": ["Safety", "Hygiene", "Durability", "Sustainability"],
            "example_needs": "Safe materials, BPA-free concept, Easy cleaning, Safe rounded edges."
        }
    ]

@router.get("/priorities")
def get_priorities():
    return [
        {"id": "Comfort", "name": "Comfort & Ergonomics", "description": "Ease of holding and natural body interface"},
        {"id": "Portability", "name": "Portability & Transit", "description": "Compact footprint, lightweight, easy carry"},
        {"id": "Durability", "name": "Durability & Longevity", "description": "Impact resistance and long lifecycle"},
        {"id": "Sustainability", "name": "Sustainability & Circularity", "description": "Recycled materials, low waste, recyclability"},
        {"id": "Affordability", "name": "Affordability & Cost", "description": "Accessible pricing and economical maintenance"},
        {"id": "Safety", "name": "Safety & Non-Toxicity", "description": "Safe food-contact, no chemical leaching, rounded corners"},
        {"id": "Appearance", "name": "Appearance & Aesthetics", "description": "Modern minimalist visual styling"},
        {"id": "Functionality", "name": "Functionality & Performance", "description": "High-speed actuation, modular features, utility"},
        {"id": "Hygiene", "name": "Hygiene & Cleanability", "description": "Dishwasher-safe, anti-mildew, easy disassembly"}
    ]
