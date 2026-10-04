from typing import List, Optional, Dict, Any, Union
from pydantic import BaseModel, Field, field_validator, model_validator

class ProductInfo(BaseModel):
    name: str
    category: str
    description: str
    observed_features: Optional[List[str]] = []
    inferred_notes: Optional[List[str]] = []

class IdentifiedProblem(BaseModel):
    problem: str
    severity: str = "medium"  # "low" | "medium" | "high"
    reason: str = ""
    description: Optional[str] = ""
    category: Optional[str] = "Functionality"

    @field_validator("severity", mode="before")
    @classmethod
    def normalize_severity(cls, v):
        if isinstance(v, str):
            v_lower = v.lower().strip()
            if v_lower in ["low", "medium", "high"]:
                return v_lower
            if "high" in v_lower:
                return "high"
            if "low" in v_lower:
                return "low"
            return "medium"
        return "medium"

    @model_validator(mode="after")
    def populate_reason(self):
        if not self.reason and self.description:
            self.reason = self.description
        elif not self.description and self.reason:
            self.description = self.reason
        return self

class RedesignRecommendation(BaseModel):
    area: str = "General"
    current_issue: Optional[str] = ""
    recommendation: str = ""
    proposed_solution: Optional[str] = ""
    benefit: str = ""
    expected_benefit: Optional[str] = ""
    reason: Optional[str] = ""
    category: Optional[str] = "Mechanism"

    @model_validator(mode="after")
    def normalize_fields(self):
        if not self.recommendation and self.proposed_solution:
            self.recommendation = self.proposed_solution
        if not self.proposed_solution and self.recommendation:
            self.proposed_solution = self.recommendation
            
        if not self.benefit and self.expected_benefit:
            self.benefit = self.expected_benefit
        if not self.expected_benefit and self.benefit:
            self.expected_benefit = self.benefit
        return self

class ScamperData(BaseModel):
    substitute: Union[str, List[str], Dict[str, Any]] = ""
    combine: Union[str, List[str], Dict[str, Any]] = ""
    adapt: Union[str, List[str], Dict[str, Any]] = ""
    modify: Union[str, List[str], Dict[str, Any]] = ""
    put_to_another_use: Union[str, List[str], Dict[str, Any]] = ""
    eliminate: Union[str, List[str], Dict[str, Any]] = ""
    reverse_rearrange: Union[str, List[str], Dict[str, Any]] = ""

    @model_validator(mode="before")
    @classmethod
    def normalize_scamper_fields(cls, data):
        if not isinstance(data, dict):
            return data
        
        # Handle reverse vs reverse_rearrange
        if "reverse_rearrange" not in data and "reverse" in data:
            data["reverse_rearrange"] = data["reverse"]
        elif "reverse" not in data and "reverse_rearrange" in data:
            data["reverse"] = data["reverse_rearrange"]

        for k in ["substitute", "combine", "adapt", "modify", "put_to_another_use", "eliminate", "reverse_rearrange"]:
            if k in data and isinstance(data[k], dict):
                # If dict with suggestions list, format cleanly
                if "suggestions" in data[k] and isinstance(data[k]["suggestions"], list):
                    data[k] = " ".join(data[k]["suggestions"])
                elif "description" in data[k]:
                    data[k] = str(data[k]["description"])
            elif k not in data:
                data[k] = ""
        return data

class DesignScores(BaseModel):
    comfort: int = Field(ge=0, le=100, default=85)
    portability: int = Field(ge=0, le=100, default=85)
    reliability: int = Field(ge=0, le=100, default=85)
    hygiene: int = Field(ge=0, le=100, default=85)
    performance: int = Field(ge=0, le=100, default=85)
    affordability: int = Field(ge=0, le=100, default=85)
    safety: int = Field(ge=0, le=100, default=85)
    sustainability: int = Field(ge=0, le=100, default=85)
    innovation: int = Field(ge=0, le=100, default=85)
    overall: int = Field(ge=0, le=100, default=85)
    overall_score: Optional[int] = None
    disclaimer: str = "AI-generated design assessment scores based on design heuristics and user priorities, not experimentally validated engineering measurements."

    @field_validator("comfort", "portability", "reliability", "hygiene", "performance", "affordability", "safety", "sustainability", "innovation", "overall", mode="before")
    @classmethod
    def clamp_score(cls, v):
        try:
            val = int(v)
            return max(0, min(100, val))
        except (ValueError, TypeError):
            return 85

    @model_validator(mode="after")
    def sync_overall(self):
        if self.overall_score is None:
            self.overall_score = self.overall
        return self

class SustainabilityInfo(BaseModel):
    current_material: str = "Conventional polymer"
    recommended_material: str = "Eco-friendly alternative"
    improvements: List[str] = []
    score: int = Field(ge=0, le=100, default=88)
    sustainability_score: Optional[int] = None
    reusable_design_details: Optional[str] = ""
    reduced_material_notes: Optional[str] = ""
    recyclable_components: Optional[List[str]] = []
    lifecycle_disclaimer: str = "Qualitative assessment of eco-design principles; exact environmental impact requires certified ISO 14040 Life Cycle Assessment (LCA)."

    @field_validator("score", mode="before")
    @classmethod
    def clamp_score(cls, v):
        try:
            val = int(v)
            return max(0, min(100, val))
        except (ValueError, TypeError):
            return 88

    @model_validator(mode="after")
    def sync_score(self):
        if self.sustainability_score is None:
            self.sustainability_score = self.score
        return self

class ComparisonItem(BaseModel):
    feature: str
    existing_product: str
    redesigned_product: str
    key_benefit: str

class VisualConcept(BaseModel):
    concept_title: str = "AI Redesign Concept"
    key_highlights: List[str] = []
    color_palette: List[str] = ["#0284C7", "#0D9488", "#334155"]
    model_type: str = "water_bottle"
    disclaimer: str = "Concept visual representation and 3D mockups are architectural design references, not manufacturing-ready CAD/CAM specifications."

class AnalyzeProductRequest(BaseModel):
    product_name: str
    category: str
    target_user: str
    selected_priorities: List[str]
    user_problems: Optional[str] = ""
    image_url: Optional[str] = None
    image_base64: Optional[str] = None
    image_filename: Optional[str] = None

class AnalyzeProductResponse(BaseModel):
    id: str
    product: ProductInfo
    identified_problems: List[IdentifiedProblem]
    redesign_recommendations: List[RedesignRecommendation]
    scamper: ScamperData
    scores: DesignScores
    sustainability: SustainabilityInfo
    redesign_summary: str
    comparison: List[ComparisonItem] = []
    visual_concept: VisualConcept
    is_demo_mode: bool = False
    ai_model_used: str = "AI Engine"
    target_user: str
    selected_priorities: List[str]
    user_problems: Optional[str] = ""
    image_url: Optional[str] = None
    created_at: str

# Compatibility aliases
RedesignRequest = AnalyzeProductRequest
RedesignResponse = AnalyzeProductResponse
