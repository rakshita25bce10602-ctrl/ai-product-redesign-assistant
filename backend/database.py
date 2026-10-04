import sqlite3
import json
import uuid
from datetime import datetime
from typing import List, Optional, Dict, Any
from backend.config import DATABASE_PATH

def get_connection():
    conn = sqlite3.connect(DATABASE_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS redesigns (
        id TEXT PRIMARY KEY,
        product_name TEXT NOT NULL,
        product_category TEXT NOT NULL,
        target_user TEXT NOT NULL,
        design_priorities TEXT NOT NULL,
        user_problems TEXT,
        image_url TEXT,
        is_demo_mode INTEGER DEFAULT 0,
        ai_model_used TEXT,
        executive_summary TEXT,
        identified_problems TEXT NOT NULL,
        recommendations TEXT NOT NULL,
        scamper TEXT NOT NULL,
        scores TEXT NOT NULL,
        sustainability TEXT NOT NULL,
        comparison TEXT NOT NULL,
        visual_concept TEXT NOT NULL,
        raw_product TEXT,
        created_at TEXT NOT NULL
    )
    """)
    # Check if raw_product column exists (migration helper)
    try:
        cursor.execute("ALTER TABLE redesigns ADD COLUMN raw_product TEXT")
    except Exception:
        pass  # Column already exists
    conn.commit()
    conn.close()

def save_redesign(data: Dict[str, Any]) -> str:
    record_id = data.get("id") or str(uuid.uuid4())
    conn = get_connection()
    cursor = conn.cursor()
    
    # Extract fields with safe fallbacks
    product_dict = data.get("product") or {
        "name": data.get("product_name", "Product"),
        "category": data.get("product_category") or data.get("category", "General"),
        "description": data.get("redesign_summary") or data.get("executive_summary", "")
    }
    product_name = product_dict.get("name") or data.get("product_name", "Product")
    category = product_dict.get("category") or data.get("product_category") or data.get("category", "General")
    target_user = data.get("target_user", "Consumer")
    priorities = data.get("selected_priorities") or data.get("design_priorities") or []
    user_problems = data.get("user_problems", "")
    image_url = data.get("image_url", "")
    is_demo = 1 if data.get("is_demo_mode", False) else 0
    ai_model = data.get("ai_model_used", "AI Redesign Engine")
    summary = data.get("redesign_summary") or data.get("executive_summary", "")

    problems = data.get("identified_problems", [])
    recommendations = data.get("redesign_recommendations") or data.get("recommendations", [])
    scamper = data.get("scamper", {})
    scores = data.get("scores", {})
    sustainability = data.get("sustainability", {})
    comparison = data.get("comparison", [])
    visual_concept = data.get("visual_concept", {})

    cursor.execute("""
    INSERT OR REPLACE INTO redesigns (
        id, product_name, product_category, target_user,
        design_priorities, user_problems, image_url,
        is_demo_mode, ai_model_used, executive_summary,
        identified_problems, recommendations, scamper,
        scores, sustainability, comparison, visual_concept, raw_product, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        record_id,
        product_name,
        category,
        target_user,
        json.dumps(priorities),
        user_problems,
        image_url,
        is_demo,
        ai_model,
        summary,
        json.dumps(problems),
        json.dumps(recommendations),
        json.dumps(scamper),
        json.dumps(scores),
        json.dumps(sustainability),
        json.dumps(comparison),
        json.dumps(visual_concept),
        json.dumps(product_dict),
        data.get("created_at", datetime.now().isoformat())
    ))
    conn.commit()
    conn.close()
    return record_id

def get_redesign(record_id: str) -> Optional[Dict[str, Any]]:
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM redesigns WHERE id = ?", (record_id,))
    row = cursor.fetchone()
    conn.close()
    if not row:
        return None
    
    priorities = json.loads(row["design_priorities"]) if row["design_priorities"] else []
    problems = json.loads(row["identified_problems"]) if row["identified_problems"] else []
    recommendations = json.loads(row["recommendations"]) if row["recommendations"] else []
    scamper = json.loads(row["scamper"]) if row["scamper"] else {}
    scores = json.loads(row["scores"]) if row["scores"] else {}
    sustainability = json.loads(row["sustainability"]) if row["sustainability"] else {}
    comparison = json.loads(row["comparison"]) if row["comparison"] else []
    visual_concept = json.loads(row["visual_concept"]) if row["visual_concept"] else {}
    
    raw_product = None
    try:
        if "raw_product" in row.keys() and row["raw_product"]:
            raw_product = json.loads(row["raw_product"])
    except Exception:
        pass
    
    if not raw_product:
        raw_product = {
            "name": row["product_name"],
            "category": row["product_category"],
            "description": row["executive_summary"],
            "observed_features": [],
            "inferred_notes": []
        }

    # Normalize overall score and sustainability score if needed
    if "overall" not in scores and "overall_score" in scores:
        scores["overall"] = scores["overall_score"]
    elif "overall" in scores:
        scores["overall_score"] = scores["overall"]

    if "score" not in sustainability and "sustainability_score" in sustainability:
        sustainability["score"] = sustainability["sustainability_score"]
    elif "score" in sustainability:
        sustainability["sustainability_score"] = sustainability["score"]

    return {
        "id": row["id"],
        "product": raw_product,
        "product_name": row["product_name"],
        "product_category": row["product_category"],
        "target_user": row["target_user"],
        "selected_priorities": priorities,
        "design_priorities": priorities,
        "user_problems": row["user_problems"],
        "image_url": row["image_url"],
        "is_demo_mode": bool(row["is_demo_mode"]),
        "ai_model_used": row["ai_model_used"],
        "redesign_summary": row["executive_summary"],
        "executive_summary": row["executive_summary"],
        "identified_problems": problems,
        "redesign_recommendations": recommendations,
        "recommendations": recommendations,
        "scamper": scamper,
        "scores": scores,
        "sustainability": sustainability,
        "comparison": comparison,
        "visual_concept": visual_concept,
        "created_at": row["created_at"]
    }

def list_redesigns(limit: int = 30) -> List[Dict[str, Any]]:
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, product_name, product_category, target_user, is_demo_mode, created_at, scores FROM redesigns ORDER BY created_at DESC LIMIT ?", (limit,))
    rows = cursor.fetchall()
    conn.close()
    results = []
    for r in rows:
        score_val = 88
        try:
            score_data = json.loads(r["scores"])
            score_val = score_data.get("overall") or score_data.get("overall_score", 88)
        except Exception:
            pass
        results.append({
            "id": r["id"],
            "product_name": r["product_name"],
            "product_category": r["product_category"],
            "target_user": r["target_user"],
            "is_demo_mode": bool(r["is_demo_mode"]),
            "overall_score": score_val,
            "created_at": r["created_at"]
        })
    return results
