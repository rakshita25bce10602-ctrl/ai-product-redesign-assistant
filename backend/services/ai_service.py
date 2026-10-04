import os
import json
import uuid
import re
import base64
from datetime import datetime
from typing import Dict, Any, List, Optional
import requests
from backend.config import GEMINI_API_KEY

SYSTEM_INSTRUCTION = """You are a Lead Product Design, User Experience, and Sustainability Analysis Assistant.
Your task is to analyze physical products (using visible image characteristics, category, target user persona, design priorities, and user-described problems) and generate a comprehensive, structured redesign proposal.

Follow these strict principles:
1. Distinguish between:
   - Observed: Features and characteristics clearly visible in the product image.
   - Inferred: Functional characteristics that are likely for this category but cannot be 100% confirmed visually.
   - User-provided: Information explicitly provided by the user (target user, priorities, stated problems).
2. Do NOT invent unverified laboratory/engineering claims (e.g., exact material molecular grades, exact dimensional tolerances, exact carbon offset numbers). Use phrases like "appears to be", "likely", "recommended", "conceptually", "estimated".
3. Deeply align your redesign with the chosen Target User and Selected Priorities. (For example, Students prioritize low cost and backpack portability; Fitness users prioritize high-flow spouts and sweaty tactile grip; Office workers prioritize one-hand actuation and zero desk condensation).
4. Provide concrete, product-specific SCAMPER lateral thinking suggestions (S, C, A, M, P, E, R).
5. All scores must be integers strictly between 0 and 100.
6. Return ONLY valid JSON matching the exact schema provided.
"""

def build_prompt(
    product_name: str,
    category: str,
    target_user: str,
    selected_priorities: List[str],
    user_problems: str = "",
    has_image: bool = False
) -> str:
    priorities_str = ", ".join(selected_priorities)
    image_context = "An image of the product has been provided. Analyze its visible structural features, geometry, cap/sealing, grip, and finish." if has_image else "No image was provided; rely on the product name, category, and user context."

    return f"""{SYSTEM_INSTRUCTION}

PRODUCT TO ANALYZE:
- Product Name: {product_name}
- Product Category: {category}
- Target User Profile: {target_user}
- Selected Design Priorities: {priorities_str}
- User-Described Problems / Limitations: {user_problems if user_problems else "General consumer usability, ergonomics, and single-use environmental concerns."}
- Image Context: {image_context}

You MUST respond strictly with valid JSON with this exact structure:
{{
  "product": {{
    "name": "{product_name}",
    "category": "{category}",
    "description": "2-3 sentences describing the observed baseline product, its visible or typical shape, and its primary limitations for {target_user}.",
    "observed_features": ["Observed visual feature 1", "Observed visual feature 2"],
    "inferred_notes": ["Inferred usability factor 1", "Inferred lifecycle factor 2"]
  }},
  "identified_problems": [
    {{
      "problem": "Clear problem name",
      "severity": "low" | "medium" | "high",
      "reason": "Why this creates friction or failure specifically for {target_user}.",
      "category": "Ergonomics" | "Material" | "Functionality" | "Hygiene" | "Portability" | "Safety"
    }}
  ],
  "redesign_recommendations": [
    {{
      "area": "Grip / Cap / Body / Material / Mechanism",
      "current_issue": "Brief description of current flaw",
      "recommendation": "Concrete engineering and design redesign solution",
      "benefit": "Specific functional or UX benefit for {target_user}",
      "category": "Ergonomics" | "Mechanism" | "Material" | "Sustainability" | "UX"
    }}
  ],
  "scamper": {{
    "substitute": "Concrete suggestion for material, component, or process substitution",
    "combine": "Functions or features that could be combined",
    "adapt": "Design concept from another domain that can be adapted",
    "modify": "Geometric, ergonomic, or sizing modifications",
    "put_to_another_use": "Alternative secondary use or lifecycle repurpose",
    "eliminate": "Unnecessary component, virgin plastic, or steps to eliminate",
    "reverse_rearrange": "Rearrangement of sequence, orientation, or usage mechanics"
  }},
  "scores": {{
    "comfort": 88,
    "portability": 92,
    "reliability": 86,
    "hygiene": 90,
    "performance": 89,
    "affordability": 82,
    "safety": 94,
    "sustainability": 91,
    "innovation": 90,
    "overall": 89,
    "disclaimer": "AI-generated design assessment scores based on design heuristics and user priorities, not experimentally validated engineering measurements."
  }},
  "sustainability": {{
    "current_material": "Likely current material (e.g. Disposable PET, unibody polypropylene)",
    "recommended_material": "Recommended sustainable alternative (e.g. Eastman Tritan Renew 50% PCR, 100% recyclable mono-PP)",
    "improvements": [
      "Reusable architecture extending product lifespan",
      "Reduced virgin polymer mass through structural ribbing",
      "Mono-material design for closed-loop recyclability"
    ],
    "score": 90,
    "lifecycle_disclaimer": "Qualitative assessment of eco-design principles; exact environmental impact requires certified ISO 14040 Life Cycle Assessment (LCA)."
  }},
  "comparison": [
    {{
      "feature": "Grip & Handling",
      "existing_product": "Smooth slippery surface prone to drops",
      "redesigned_product": "Contoured tactile grip channels",
      "key_benefit": "Zero slippage under dynamic movement"
    }},
    {{
      "feature": "Cap & Sealing",
      "existing_product": "Standard unthreaded or friction cap with leak risk",
      "redesigned_product": "One-touch flip-lock mechanism with silicone compression seal",
      "key_benefit": "Guaranteed leak-proof transit in bags"
    }},
    {{
      "feature": "Material Circularity",
      "existing_product": "Virgin petroleum polymer, single-use lifecycle",
      "redesigned_product": "Certified recycled circular polymer, 10-year durability",
      "key_benefit": "Dramatically reduces single-use plastic waste"
    }},
    {{
      "feature": "Cleanability & Hygiene",
      "existing_product": "Narrow neck hard to reach with sponge",
      "redesigned_product": "Dual-opening wide base for effortless dishwasher washing",
      "key_benefit": "Eliminates bacterial mold buildup"
    }}
  ],
  "visual_concept": {{
    "concept_title": "ErgoEco NextGen Redesign",
    "key_highlights": ["Contoured tactile grip", "Modular cleanable base", "One-touch safety lid"],
    "color_palette": ["#0284C7", "#0D9488", "#334155"],
    "model_type": "water_bottle",
    "disclaimer": "Concept visual representation and 3D mockups are architectural design references, not manufacturing-ready CAD/CAM specifications."
  }},
  "redesign_summary": "A concise 2-sentence summary of the redesigned concept and core user value."
}}"""

def clean_json_response(raw_text: str) -> Dict[str, Any]:
    """Cleans markdown code fences and parses JSON safely."""
    text = raw_text.strip()
    if text.startswith("```"):
        # Strip ```json ... ```
        text = re.sub(r"^```(?:json)?\s*", "", text, flags=re.IGNORECASE)
        text = re.sub(r"\s*```$", "", text)
    
    # Extract outermost JSON object if surrounding prose exists
    match = re.search(r"(\{[\s\S]*\})", text)
    if match:
        text = match.group(1)
        
    return json.loads(text)

def generate_heuristic_redesign(
    product_name: str,
    category: str,
    target_user: str,
    selected_priorities: List[str],
    user_problems: str = ""
) -> Dict[str, Any]:
    """High-fidelity heuristic demo engine for physical products."""
    cat_lower = category.lower()
    user_lower = target_user.lower()
    priorities = set(p.lower() for p in selected_priorities)

    # Water bottle showcase
    if "water" in cat_lower or "bottle" in cat_lower or "drink" in cat_lower:
        model_type = "water_bottle"
        if "student" in user_lower:
            exec_summary = f"Redesigned the {product_name} specifically for students with lightweight impact-resistant Tritan, low-cost modular components, and leak-proof backpack geometry."
            curr_mat = "Single-use or rigid low-grade PET (Polyethylene Terephthalate)"
            rec_mat = "Eastman Tritan™ Renew (50% certified recycled content) with food-grade silicone seals"
            identified_problems = [
                {"problem": "Backpack Leakage Risk", "severity": "high", "reason": "Standard screw caps unthread under backpack vibration, risking books and electronics.", "category": "Safety"},
                {"problem": "Excess Weight & Bulk", "severity": "medium", "reason": "Rigid bottles occupy disproportionate bag volume without easy anchor points.", "category": "Portability"},
                {"problem": "Biofilm in Crevices", "severity": "medium", "reason": "Narrow neck prevents standard sponge cleaning in student dorm sinks.", "category": "Hygiene"},
                {"problem": "High Replacement Cost", "severity": "low", "reason": "When a single cap breaks, students must replace the entire bottle.", "category": "Affordability"}
            ]
            recommendations = [
                {"area": "Cap & Seal", "current_issue": "Vibration unthreads cap", "recommendation": "Dual-stage safety lock flip-cap with compression silicone gasket", "benefit": "Guaranteed zero-leak transport in student bags", "category": "Mechanism"},
                {"area": "Carrying Loop", "current_issue": "No hands-free option", "recommendation": "Integrated flexible silicone loop that clips to carabiners", "benefit": "Frees internal bag space by mounting to backpack straps", "category": "Ergonomics"},
                {"area": "Base & Neck", "current_issue": "Narrow sponge access", "recommendation": "Dual-threaded wide-mouth base allowing full pass-through cleaning", "benefit": "Fast, tool-free wash in small dorm sinks", "category": "Hygiene"},
                {"area": "Modular Spares", "current_issue": "Full bottle disposal on breakage", "recommendation": "Modular snap-in replaceable gasket and lid assembly", "benefit": "Reduces student maintenance cost by over 70%", "category": "Sustainability"}
            ]
        elif "office" in user_lower or "worker" in user_lower:
            exec_summary = f"Redesigned the {product_name} for office professionals with one-touch silent push-to-drink actuation, condensation-free double wall insulation, and a minimalist desk footprint."
            curr_mat = "Thin single-wall Polypropylene / PET plastic"
            rec_mat = "Recycled 18/8 Food-Grade 304 Stainless Steel with condensation-shield ceramic interior"
            identified_problems = [
                {"problem": "Two-Handed Cap Operation", "severity": "high", "reason": "Unscrewing a traditional cap breaks workflow and keyboard focus during desk work.", "category": "Functionality"},
                {"problem": "Desk Condensation Water Rings", "severity": "medium", "reason": "Cold beverages create water puddles that damage paperwork and wooden desks.", "category": "Usability"},
                {"problem": "Thermal Loss Over Work Hours", "severity": "medium", "reason": "Beverages lose optimal temperature within 45 minutes of a typical 8-hour workday.", "category": "Performance"},
                {"problem": "Audible Cap Squeaks", "severity": "low", "reason": "Stiff plastic threads create distracting squeaks in quiet meeting rooms.", "category": "Aesthetics"}
            ]
            recommendations = [
                {"area": "Actuation Mechanism", "current_issue": "Requires two hands", "recommendation": "Spring-damped one-touch push-button autoseal valve", "benefit": "Effortless single-hand drinking without looking away from monitors", "category": "Mechanism"},
                {"area": "Thermal Insulation", "current_issue": "Sweating outer wall", "recommendation": "Double-wall vacuum insulation with non-slip silicone base pad", "benefit": "Protects documents and dampens desk clatter", "category": "Ergonomics"},
                {"area": "Thermal Core", "current_issue": "Rapid beverage warming", "recommendation": "Copper-lined vacuum chamber keeping cold 24h / hot 12h", "benefit": "Consistent beverage temperature throughout the workday", "category": "Material"},
                {"area": "Aesthetic Finish", "current_issue": "Fingerprint smudging", "recommendation": "Matte powder-coated anodized finish with subtle branding", "benefit": "Professional aesthetic in boardroom meetings", "category": "Aesthetics"}
            ]
        elif "fitness" in user_lower or "sport" in user_lower:
            exec_summary = f"Redesigned the {product_name} for active fitness users with high-flow valve geometry, non-slip textured finger facets, and rapid volume intake tracking."
            curr_mat = "Standard rigid semi-gloss Polypropylene"
            rec_mat = "Ultra-durable BPA-Free Tritan with co-molded thermoplastic elastomer (TPE) grip facets"
            identified_problems = [
                {"problem": "Slippery Grip When Sweaty", "severity": "high", "reason": "Smooth cylindrical surface easily slips out of sweaty hands during workout sets.", "category": "Ergonomics"},
                {"problem": "Restricted Flow Rate", "severity": "high", "reason": "Standard small orifices starve breathless athletes of rapid hydration.", "category": "Performance"},
                {"problem": "Lack of Intake Markings", "severity": "medium", "reason": "Athletes cannot track hourly fluid milestones without visual markers.", "category": "Functionality"},
                {"problem": "Gym Floor Impact Fractures", "severity": "medium", "reason": "Rigid plastics crack upon impact with gym barbells or hard rubber flooring.", "category": "Durability"}
            ]
            recommendations = [
                {"area": "Grip Geometry", "current_issue": "Slippery when wet", "recommendation": "Hexagonal contoured body with textured micro-grooved grip panels", "benefit": "Firm, slip-proof hold during high-intensity workout sets", "category": "Ergonomics"},
                {"area": "Drinking Spout", "current_issue": "Slow fluid delivery", "recommendation": "Fast-flow vented silicone spout with anti-vacuum air release", "benefit": "Instant glug-free hydration in 3-second breaks", "category": "Mechanism"},
                {"area": "Volume Scale", "current_issue": "No hydration tracking", "recommendation": "Laser-etched dual milliliter (ml) and ounce (oz) milestone markings", "benefit": "Effortless performance hydration monitoring", "category": "Functionality"},
                {"area": "Impact Bumper", "current_issue": "Brittle bottom edge", "recommendation": "Shock-absorbing reinforced TPE bumper base and cap collar", "benefit": "Zero shattering on concrete and gym rubber surfaces", "category": "Material"}
            ]
        elif "travel" in user_lower or "commuter" in user_lower:
            exec_summary = f"Redesigned the {product_name} for daily commuters and travelers featuring a universal cupholder taper, lockable spout, and an aircraft cabin pressure-equalizing cap."
            curr_mat = "Brittle standard PET plastic"
            rec_mat = "Impact-resistant Polypropylene Copolymer with aerospace-grade silicone o-rings"
            identified_problems = [
                {"problem": "Vehicle Cupholder Incompatibility", "severity": "high", "reason": "Bulky bottles do not fit standard automotive, train, or airplane seat cupholders.", "category": "Portability"},
                {"problem": "Cabin Pressure Splashing", "severity": "medium", "reason": "Altitude shifts in flights cause pressure blowout when opened.", "category": "Safety"},
                {"problem": "Difficult Multi-Item Transit Carry", "severity": "medium", "reason": "Luggage in one hand leaves no comfortable way to hold a bottle during commutes.", "category": "Portability"},
                {"problem": "Abrasive Scuffing", "severity": "low", "reason": "Contact with train floors and turnstiles scratches exterior surfaces.", "category": "Durability"}
            ]
            recommendations = [
                {"area": "Base Silhouette", "current_issue": "Fails to fit cup holders", "recommendation": "Tapered base geometry with 72mm diameter universal profile", "benefit": "Rattle-free fit in 98% of car, train, and bicycle cages", "category": "Ergonomics"},
                {"area": "Cap Pressure Valve", "current_issue": "Pressure spray on opening", "recommendation": "Two-stage decompression valve in cap assembly", "benefit": "Zero liquid spray during flight cabin depressurization", "category": "Mechanism"},
                {"area": "Carrying Handle", "current_issue": "Awkward handheld transit", "recommendation": "Fold-flat ergonomic articulating handle integrated flush into cap", "benefit": "Comfortable transport alongside carry-on luggage", "category": "Portability"},
                {"area": "Armored Coating", "current_issue": "Scratching and cosmetic wear", "recommendation": "Armored polymer casing with stone-washed textured coat", "benefit": "Maintains clean appearance over years of daily travel", "category": "Material"}
            ]
        else:  # Families & Children or Default
            exec_summary = f"Redesigned the {product_name} for families & children focusing on 100% certified BPA-free food contact, rounded child-safe contours, and effortless hygienic sanitation."
            curr_mat = "Conventional plastic with potential phthalate additives"
            rec_mat = "Medical-grade LFGB Platinum Silicone & BPA/BPS-Free Tritan"
            identified_problems = [
                {"problem": "Chemical & Plasticizer Leaching Risk", "severity": "high", "reason": "Warming in dishwashers or sunlight can leach microplastics and endocrine disruptors.", "category": "Safety"},
                {"problem": "Sharp Cap Edges & Pinch Hazards", "severity": "high", "reason": "Hard latching mechanisms can pinch children's small fingers.", "category": "Safety"},
                {"problem": "Hidden Mold in Valves", "severity": "high", "reason": "Complex un-openable bite valves harbor hidden black mold colonies.", "category": "Hygiene"},
                {"problem": "High Drop Frequency & Breakage", "severity": "medium", "reason": "Children frequently drop bottles from high chairs and school desks.", "category": "Durability"}
            ]
            recommendations = [
                {"area": "Material Purity", "current_issue": "Plasticizer leaching", "recommendation": "100% food-grade Platinum Silicone and certified BPA/BPS/BPF-free Tritan", "benefit": "Complete health and non-toxic peace of mind for parents", "category": "Material"},
                {"area": "Child Ergonomics", "current_issue": "Hard pinch points", "recommendation": "Soft-touch rounded silicone bite spout with push-button soft-release hinge", "benefit": "Safe opening for small hands without dental or finger injury", "category": "Safety"},
                {"area": "Disassembly Hygiene", "current_issue": "Hidden mold cavities", "recommendation": "Fully detachable 3-piece valve system with zero hidden internal cavities", "benefit": "Guaranteed mold-free hygiene and complete dishwasher sterilizing", "category": "Hygiene"},
                {"area": "Drop Armor", "current_issue": "Crack fractures on drop", "recommendation": "Integrated 360-degree rubberized drop-cushion sleeve", "benefit": "Prevents breakage and catastrophic liquid spills", "category": "Durability"}
            ]

        scamper = {
            "substitute": "Substitute virgin petrochemical PET with 100% certified ocean-bound recycled polymer (rPET) or Eastman Tritan Renew.",
            "combine": "Combine the carrying handle, carabiner latch, and pressure-relief cap into a single monomaterial molded head unit.",
            "adapt": "Adapt aerospace-grade quick-disconnect valve mechanisms for instant one-handed drink actuation.",
            "modify": "Modify the base cross-section into a softly faceted rounded-hexagonal profile for anti-roll stability and 60mm wide sponge cleaning.",
            "put_to_another_use": "Design the detachable protective bottom bumper to double as a portable dog/pet water dish or snack bowl.",
            "eliminate": "Eliminate secondary plastic sleeves and chemical adhesive stickers by laser-etching graduations directly into the wall.",
            "reverse_rearrange": "Reverse traditional bottom-sealed bottle design by enabling a dual-end unscrewable base for 100% pass-through cleaning."
        }

        scores = {
            "comfort": 92 if "comfort" in priorities else 86,
            "portability": 95 if "portability" in priorities else 88,
            "reliability": 90 if "durability" in priorities else 87,
            "hygiene": 94 if "hygiene" in priorities or "safety" in priorities else 89,
            "performance": 91 if "functionality" in priorities else 85,
            "affordability": 84 if "affordability" in priorities else 79,
            "safety": 96 if "safety" in priorities else 90,
            "sustainability": 93 if "sustainability" in priorities else 88,
            "innovation": 90,
            "overall": 91,
            "overall_score": 91,
            "disclaimer": "AI-generated design assessment scores based on design heuristics and user priorities, not experimentally validated engineering measurements."
        }

        sustainability = {
            "current_material": curr_mat,
            "recommended_material": rec_mat,
            "improvements": [
                "100% Reusable modular architecture engineered for 5+ years of continuous daily use",
                "40% reduction in overall polymer mass through structural ribbing optimization",
                "Closed-loop recyclable components that disassemble in under 10 seconds without glue",
                "Eliminates approximately 320 single-use plastic bottles per active user annually"
            ],
            "score": 93,
            "sustainability_score": 93,
            "lifecycle_disclaimer": "Qualitative assessment of eco-design principles; exact environmental impact requires certified ISO 14040 Life Cycle Assessment (LCA)."
        }

        comparison = [
            {
                "feature": "Grip & Ergonomics",
                "existing_product": "Smooth slippery plastic prone to sliding when wet or in motion",
                "redesigned_product": "Ergonomic hexagonal body with tactile dual-molded grip grooves",
                "key_benefit": "Zero slip during high-motion activity or sweaty handling"
            },
            {
                "feature": "Portability & Transit",
                "existing_product": "Requires two hands, awkward shape for backpacks and cupholders",
                "redesigned_product": "Universal 72mm tapered profile with integrated 180° articulating carry loop",
                "key_benefit": "Hands-free clipping to luggage, bags, and standard vehicle consoles"
            },
            {
                "feature": "Material & Safety",
                "existing_product": "Single-use PET plastic with chemical degradation and microplastic risk",
                "redesigned_product": "Certified BPA/BPS-Free Tritan Renew and Platinum-cured silicone",
                "key_benefit": "100% non-toxic, zero leaching even under hot temperatures"
            },
            {
                "feature": "Hygiene & Maintenance",
                "existing_product": "Narrow 25mm neck prone to internal mildew and impossible to reach with sponge",
                "redesigned_product": "Dual-opening 60mm wide mouth with quick-release removable seal gaskets",
                "key_benefit": "100% dishwasher safe and eliminates hidden bacterial reservoirs"
            },
            {
                "feature": "Cap Mechanism & Flow",
                "existing_product": "Slow screw cap that causes splashing and requires both hands",
                "redesigned_product": "One-touch flip-lock spout with anti-vacuum air valve and flow limiter",
                "key_benefit": "Instant splash-free single-hand hydration without breaking concentration"
            },
            {
                "feature": "Sustainability & Lifecycle",
                "existing_product": "Single-use or short lifespan with landfill/ocean pollution outcome",
                "redesigned_product": "50% certified circular recycled polymer engineered for 1,500+ refilling cycles",
                "key_benefit": "Dramatically cuts personal plastic footprint by over 300 bottles/year"
            }
        ]

        visual_concept = {
            "concept_title": f"ErgoEco {product_name.title()} Pro",
            "key_highlights": [
                "Sculpted Hex-Grip Body with tactile matte zones",
                "Modular Quick-Twist Wide Clean Base",
                "One-Touch Spout with Dual Mechanical Lock",
                "Integrated Low-Profile Carabiner Handle"
            ],
            "color_palette": ["#0284C7", "#0D9488", "#334155"],
            "model_type": "water_bottle",
            "disclaimer": "Concept visual representation and 3D mockups are architectural design references, not manufacturing-ready CAD/CAM specifications."
        }

    else:
        # General Physical Product Fallback (Chairs, Helmets, Bags, Containers, etc.)
        model_type = "generic"
        if "chair" in cat_lower:
            model_type = "chair"
        elif "helmet" in cat_lower:
            model_type = "helmet"
        elif "bag" in cat_lower or "backpack" in cat_lower:
            model_type = "bag"
        elif "container" in cat_lower or "pack" in cat_lower:
            model_type = "container"

        exec_summary = f"Comprehensive redesign of {product_name} tailored for {target_user}, prioritizing {', '.join(selected_priorities)} using modular sustainable construction and enhanced ergonomic interfaces."
        curr_mat = "Standard multi-material composite with non-recyclable adhesives"
        rec_mat = "Bio-circular polymer / Recycled aluminum monomaterial with mechanical fasteners"
        
        identified_problems = [
            {"problem": "Ergonomic Discomfort & Fatigue", "severity": "high", "reason": f"Prolonged interaction causes strain due to rigid non-adaptive contact points for {target_user}.", "category": "Ergonomics"},
            {"problem": "Complex Non-Recyclable Assembly", "severity": "high", "reason": "Glued multi-material components prevent end-of-life recycling and circular reuse.", "category": "Material"},
            {"problem": "Suboptimal Portability & Weight", "severity": "medium", "reason": "Excess structural bulk makes transport and daily storage cumbersome.", "category": "Portability"},
            {"problem": "Difficult Cleaning & Maintenance", "severity": "medium", "reason": "Crevices and textured traps collect debris and resist standard maintenance.", "category": "Hygiene"}
        ]
        
        recommendations = [
            {"area": "Ergonomics", "current_issue": "Static rigid frame", "recommendation": "Adaptive pressure-distributing geometric mesh with dynamic articulation", "benefit": f"Substantially reduces fatigue for {target_user}", "category": "Ergonomics"},
            {"area": "Assembly & Fasteners", "current_issue": "Glued multi-materials", "recommendation": "Design-for-Disassembly (DfD) snap-fit monomaterial joints", "benefit": "Enables 100% closed-loop recycling at end of life", "category": "Sustainability"},
            {"area": "Chassis Structure", "current_issue": "Excess dead mass", "recommendation": "Generative lattice lightweighting and collapsible interlocking geometry", "benefit": "Lightweight, easy one-hand transport", "category": "Portability"},
            {"area": "Surface Detailing", "current_issue": "Hard-to-clean seams", "recommendation": "Antimicrobial smooth-radius surfaces with toolless detachable covers", "benefit": "Effortless cleaning and extended product lifespan", "category": "Hygiene"}
        ]

        scamper = {
            "substitute": "Substitute petroleum-based plastics with ocean-bound recycled polymers or biodegradable bio-composites.",
            "combine": "Combine structural load frame and handle into a continuous single-piece generative mold.",
            "adapt": "Adapt aerospace structural ribbing principles to increase stiffness while cutting weight.",
            "modify": "Modify sharp pinch angles into generous ergonomic radii for comfortable user contact.",
            "put_to_another_use": "Design modular sub-components to be repurposed into utility organizers when retired.",
            "eliminate": "Eliminate secondary paint and chrome coatings that interfere with polymer recyclability.",
            "reverse_rearrange": "Invert traditional assembly order to make high-wear parts accessible without taking the unit apart."
        }

        scores = {
            "comfort": 90 if "comfort" in priorities else 84,
            "portability": 92 if "portability" in priorities else 83,
            "reliability": 91 if "durability" in priorities else 86,
            "hygiene": 89 if "hygiene" in priorities else 85,
            "performance": 93 if "functionality" in priorities else 87,
            "affordability": 82 if "affordability" in priorities else 78,
            "safety": 94 if "safety" in priorities else 88,
            "sustainability": 91 if "sustainability" in priorities else 86,
            "innovation": 89,
            "overall": 89,
            "overall_score": 89,
            "disclaimer": "AI-generated design assessment scores based on design heuristics and user priorities, not experimentally validated engineering measurements."
        }

        sustainability = {
            "current_material": curr_mat,
            "recommended_material": rec_mat,
            "improvements": [
                "Design for Disassembly (DfD) architecture enabling 95% material recovery",
                "35% material reduction via topology-optimized lattice wall structures",
                "Elimination of hazardous finishes, toxic glues, and phthalates",
                "Modular repair-friendly parts extending practical product life by 200%"
            ],
            "score": 90,
            "sustainability_score": 90,
            "lifecycle_disclaimer": "Qualitative assessment of eco-design principles; exact environmental impact requires certified ISO 14040 Life Cycle Assessment (LCA)."
        }

        comparison = [
            {
                "feature": "Ergonomics & Comfort",
                "existing_product": "Rigid static contours causing pressure fatigue",
                "redesigned_product": "Anatomically adaptive contours with dynamic pressure relief",
                "key_benefit": "Zero fatigue during prolonged daily use"
            },
            {
                "feature": "Material Sustainability",
                "existing_product": "Multi-material glued construction bound for landfill",
                "redesigned_product": "Monomaterial bio-polymer with mechanical toolless snap joints",
                "key_benefit": "100% circular recyclability and 35% lower carbon footprint"
            },
            {
                "feature": "Portability & Footprint",
                "existing_product": "Bulky awkward geometry difficult to store and transport",
                "redesigned_product": "Streamlined collapsible silhouette with integrated carry grip",
                "key_benefit": "50% smaller storage footprint and easy single-hand transport"
            },
            {
                "feature": "Durability & Longevity",
                "existing_product": "Single failure point forces entire unit replacement",
                "redesigned_product": "Modular component swap architecture with field-replaceable parts",
                "key_benefit": "Extends product lifespan by 3x and cuts lifecycle cost"
            },
            {
                "feature": "Hygiene & Cleanability",
                "existing_product": "Inaccessible dirt traps and seams that collect grime",
                "redesigned_product": "Smooth rounded continuous surfaces with antimicrobial coating",
                "key_benefit": "Simple 30-second wipe-down sanitation"
            }
        ]

        visual_concept = {
            "concept_title": f"NextGen Modular {product_name.title()}",
            "key_highlights": [
                "Generative Lattice Lightweight Structure",
                "Tool-Free Modular Disassembly Snap-Joints",
                "Adaptive Ergonomic User Contact Points",
                "Eco-Friendly Recycled Monomaterial Body"
            ],
            "color_palette": ["#0284C7", "#10B981", "#1E293B"],
            "model_type": model_type,
            "disclaimer": "Concept visual representation and 3D mockups are architectural design references, not manufacturing-ready CAD/CAM specifications."
        }

    return {
        "id": str(uuid.uuid4()),
        "product": {
            "name": product_name,
            "category": category,
            "description": f"Baseline {product_name} in {category} evaluated for {target_user} with focus on {', '.join(selected_priorities)}.",
            "observed_features": ["Standard cylindrical or modular geometry", "Molded polymer shell with standard seals"],
            "inferred_notes": ["Likely single-use or conventional material lifecycle", "Limited user-specific ergonomic features"]
        },
        "identified_problems": identified_problems,
        "redesign_recommendations": recommendations,
        "scamper": scamper,
        "scores": scores,
        "sustainability": sustainability,
        "redesign_summary": exec_summary,
        "comparison": comparison,
        "visual_concept": visual_concept,
        "is_demo_mode": True,
        "ai_model_used": "Engineering Heuristic AI Engine (Demo/Fallback)",
        "target_user": target_user,
        "selected_priorities": selected_priorities,
        "user_problems": user_problems,
        "created_at": datetime.now().isoformat()
    }

def call_gemini_api(
    product_name: str,
    category: str,
    target_user: str,
    selected_priorities: List[str],
    user_problems: str = "",
    image_base64: Optional[str] = None
) -> Dict[str, Any]:
    """Calls live Google Gemini 1.5 Flash API with multimodal image support and structured JSON response."""
    if not GEMINI_API_KEY:
        raise ValueError("GEMINI_API_KEY is not configured.")

    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={GEMINI_API_KEY}"
    
    parts = []
    
    # If image base64 is present, add inlineData part for Gemini Vision
    if image_base64:
        clean_b64 = image_base64
        mime_type = "image/jpeg"
        if "," in image_base64:
            header, clean_b64 = image_base64.split(",", 1)
            if "png" in header.lower():
                mime_type = "image/png"
            elif "webp" in header.lower():
                mime_type = "image/webp"
            elif "jpg" in header.lower() or "jpeg" in header.lower():
                mime_type = "image/jpeg"

        parts.append({
            "inlineData": {
                "mimeType": mime_type,
                "data": clean_b64.strip()
            }
        })

    prompt_text = build_prompt(
        product_name=product_name,
        category=category,
        target_user=target_user,
        selected_priorities=selected_priorities,
        user_problems=user_problems,
        has_image=bool(image_base64)
    )
    parts.append({"text": prompt_text})

    payload = {
        "contents": [
            {
                "parts": parts
            }
        ],
        "generationConfig": {
            "temperature": 0.2,
            "responseMimeType": "application/json"
        }
    }

    response = requests.post(url, json=payload, timeout=40)
    response.raise_for_status()
    res_json = response.json()
    
    candidates = res_json.get("candidates", [])
    if not candidates:
        raise ValueError("Gemini API returned an empty candidate list.")
    
    raw_text = candidates[0]["content"]["parts"][0]["text"]
    parsed = clean_json_response(raw_text)

    # Validate and normalize scores & sustainability fields
    scores = parsed.get("scores", {})
    if "overall" not in scores and "overall_score" in scores:
        scores["overall"] = scores["overall_score"]
    elif "overall" in scores:
        scores["overall_score"] = scores["overall"]
    parsed["scores"] = scores

    sustainability = parsed.get("sustainability", {})
    if "score" not in sustainability and "sustainability_score" in sustainability:
        sustainability["score"] = sustainability["sustainability_score"]
    elif "score" in sustainability:
        sustainability["sustainability_score"] = sustainability["score"]
    parsed["sustainability"] = sustainability

    # Populate top-level fields
    parsed["id"] = str(uuid.uuid4())
    parsed["target_user"] = target_user
    parsed["selected_priorities"] = selected_priorities
    parsed["user_problems"] = user_problems
    parsed["is_demo_mode"] = False
    parsed["ai_model_used"] = "Google Gemini 1.5 Flash (Vision & Reasoning)"
    parsed["created_at"] = datetime.now().isoformat()

    return parsed

def process_product_analysis(
    product_name: str,
    category: str,
    target_user: str,
    selected_priorities: List[str],
    user_problems: str = "",
    image_url: Optional[str] = None,
    image_base64: Optional[str] = None
) -> Dict[str, Any]:
    """
    Main entrypoint for product analysis.
    Attempts Gemini API with vision/multimodal reasoning if GEMINI_API_KEY is available;
    otherwise falls back cleanly to the heuristic demo engine.
    """
    if GEMINI_API_KEY:
        try:
            result = call_gemini_api(
                product_name=product_name,
                category=category,
                target_user=target_user,
                selected_priorities=selected_priorities,
                user_problems=user_problems,
                image_base64=image_base64
            )
            result["image_url"] = image_url or image_base64
            return result
        except Exception as e:
            print(f"[AI Service] Gemini API call error: {str(e)}. Falling back to Heuristic Engine.")

    # High-fidelity heuristic fallback
    result = generate_heuristic_redesign(
        product_name=product_name,
        category=category,
        target_user=target_user,
        selected_priorities=selected_priorities,
        user_problems=user_problems
    )
    result["image_url"] = image_url or image_base64
    return result

# Compatibility wrapper
process_redesign = process_product_analysis
