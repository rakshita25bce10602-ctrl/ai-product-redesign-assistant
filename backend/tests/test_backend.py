import io
import pytest
from fastapi.testclient import TestClient
from backend.main import app
from backend.database import init_db, list_redesigns, get_redesign

client = TestClient(app)

def setup_module():
    init_db()

def test_health():
    res = client.get("/api/health")
    assert res.status_code == 200
    data = res.json()
    assert data["status"] == "healthy"
    assert "demo_mode_active" in data

def test_categories_and_profiles():
    res = client.get("/api/categories")
    assert res.status_code == 200
    categories = res.json()
    assert len(categories) >= 6

    res2 = client.get("/api/user-profiles")
    assert res2.status_code == 200
    profiles = res2.json()
    assert len(profiles) >= 5

    res3 = client.get("/api/priorities")
    assert res3.status_code == 200
    priorities = res3.json()
    assert len(priorities) >= 5

def test_image_upload_valid_and_invalid():
    # Valid PNG image upload
    fake_png = io.BytesIO(b"\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x06\x00\x00\x00\x1f\x15c4")
    res = client.post(
        "/api/upload",
        files={"file": ("test_bottle.png", fake_png, "image/png")}
    )
    assert res.status_code == 200
    data = res.json()
    assert "url" in data
    assert "filename" in data
    assert "base64" in data

    # Invalid file extension upload
    fake_txt = io.BytesIO(b"malicious script")
    res_bad = client.post(
        "/api/upload",
        files={"file": ("test.txt", fake_txt, "text/plain")}
    )
    assert res_bad.status_code == 400
    assert "Unsupported file format" in res_bad.json()["detail"]

def test_analyze_product_endpoint_water_bottle_student():
    payload = {
        "product_name": "Standard Plastic Water Bottle",
        "category": "Water Bottle",
        "target_user": "Students",
        "selected_priorities": ["Affordability", "Portability", "Safety"],
        "user_problems": "Screw cap loosens inside backpack"
    }
    res = client.post("/api/analyze-product", json=payload)
    assert res.status_code == 200
    data = res.json()

    # Verify structured fields
    assert "product" in data
    assert data["product"]["name"] == "Standard Plastic Water Bottle"
    assert "identified_problems" in data
    assert len(data["identified_problems"]) > 0
    assert "redesign_recommendations" in data
    assert len(data["redesign_recommendations"]) > 0
    
    # Verify SCAMPER
    assert "scamper" in data
    assert "substitute" in data["scamper"]
    assert "combine" in data["scamper"]
    assert "adapt" in data["scamper"]
    assert "modify" in data["scamper"]
    assert "put_to_another_use" in data["scamper"]
    assert "eliminate" in data["scamper"]
    assert "reverse_rearrange" in data["scamper"] or "reverse" in data["scamper"]

    # Verify Scores
    assert "scores" in data
    assert 0 <= data["scores"]["comfort"] <= 100
    assert 0 <= data["scores"]["portability"] <= 100
    assert 0 <= data["scores"]["sustainability"] <= 100
    assert 0 <= data["scores"]["overall"] <= 100

    # Verify Sustainability
    assert "sustainability" in data
    assert "current_material" in data["sustainability"]
    assert "recommended_material" in data["sustainability"]
    assert 0 <= data["sustainability"]["score"] <= 100

    # Verify Redesign Summary
    assert "redesign_summary" in data and len(data["redesign_summary"]) > 10

def test_analyze_product_endpoint_fitness_user():
    payload = {
        "product_name": "Gym Plastic Bottle",
        "category": "Water Bottle",
        "target_user": "Fitness & Sports Users",
        "selected_priorities": ["Comfort", "Performance", "Durability"],
        "user_problems": "Slippery with sweaty hands"
    }
    res = client.post("/api/analyze-product", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["target_user"] == "Fitness & Sports Users"
    # Should emphasize grip / flow in recommendations
    recs_text = str(data["redesign_recommendations"]).lower()
    assert "grip" in recs_text or "flow" in recs_text or "spout" in recs_text

def test_analyze_product_validation_errors():
    # Empty product name
    res1 = client.post("/api/analyze-product", json={
        "product_name": "",
        "category": "Water Bottle",
        "target_user": "Students",
        "selected_priorities": ["Portability"]
    })
    assert res1.status_code == 400

    # Empty priorities
    res2 = client.post("/api/analyze-product", json={
        "product_name": "Test Bottle",
        "category": "Water Bottle",
        "target_user": "Students",
        "selected_priorities": []
    })
    assert res2.status_code == 400

def test_legacy_redesign_alias():
    payload = {
        "product_name": "Ergonomic Task Chair",
        "product_category": "Chair",
        "target_user": "Office Workers",
        "design_priorities": ["Comfort", "Durability", "Sustainability"],
        "user_problems": "Poor lumbar support"
    }
    res = client.post("/api/redesign", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["product"]["name"] == "Ergonomic Task Chair"

def test_history_and_get_record():
    res = client.get("/api/history")
    assert res.status_code == 200
    history = res.json()
    assert len(history) >= 1
    
    first_id = history[0]["id"]
    res_record = client.get(f"/api/redesign/{first_id}")
    assert res_record.status_code == 200
    rec = res_record.json()
    assert rec["id"] == first_id
    assert "product" in rec
    assert "scamper" in rec
