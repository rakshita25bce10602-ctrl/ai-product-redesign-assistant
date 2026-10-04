import uuid
from datetime import datetime
from typing import Dict, Any, List, Optional

def generate_demo_product_analysis(
    product_name: str,
    category: str,
    target_user: str,
    selected_priorities: List[str],
    user_problems: str = "",
    image_url: Optional[str] = None
) -> Dict[str, Any]:
    """
    Generates high-fidelity structured DEMO analysis for physical products.
    Tailors problem detection, SCAMPER, redesign scores, and sustainability
    based on the product category, target user persona, and selected priorities.
    """
    cat_lower = category.lower()
    user_lower = target_user.lower()
    priorities = set(p.lower() for p in selected_priorities)

    # Physical Product Category: Water Bottle (Primary Demo Showcase)
    if "water" in cat_lower or "bottle" in cat_lower or "drink" in cat_lower:
        model_type = "water_bottle"
        if "student" in user_lower:
            exec_summary = f"Redesigned the {product_name} for students focusing on ultra-lightweight impact-resistant Tritan, low-cost modular components, and leak-proof backpack geometry."
            curr_mat = "Single-use or rigid low-grade PET (Polyethylene Terephthalate)"
            rec_mat = "Eastman Tritan™ Renew (50% certified recycled content) with food-grade silicone seals"
            identified_problems = [
                {
                    "problem": "Backpack Leakage Hazard",
                    "severity": "high",
                    "reason": "Standard screw caps easily loosen under bag motion, risking textbooks and electronics.",
                    "category": "Safety"
                },
                {
                    "problem": "Heavy Weight & Bulk",
                    "severity": "medium",
                    "reason": "Rigid single-use bottles occupy excess bag volume without external anchor loops.",
                    "category": "Portability"
                },
                {
                    "problem": "Bacterial Biofilm in Crevices",
                    "severity": "medium",
                    "reason": "Narrow neck prevents standard sponge cleaning in student dorm sinks.",
                    "category": "Hygiene"
                },
                {
                    "problem": "High Full-Unit Replacement Cost",
                    "severity": "low",
                    "reason": "When a single cap or gasket fails, students are forced to replace the entire bottle.",
                    "category": "Affordability"
                }
            ]
            recommendations = [
                {
                    "area": "Cap & Sealing Mechanism",
                    "current_issue": "Screw cap loosens under backpack vibration",
                    "recommendation": "Dual-stage safety lock flip-cap with compression silicone gasket",
                    "benefit": "Guarantees zero unthreading and complete leak protection in student bookbags",
                    "category": "Mechanism"
                },
                {
                    "area": "Carrying & Transit",
                    "current_issue": "Requires taking up internal bag space",
                    "recommendation": "Integrated low-profile flexible silicone loop that clips to carabiners",
                    "benefit": "Enables external backpack mounting and easy transport between classes",
                    "category": "Ergonomics"
                },
                {
                    "area": "Dorm Cleanability",
                    "current_issue": "Narrow neck traps mildew and odor",
                    "recommendation": "Dual-threaded wide-mouth base allowing full sponge access",
                    "benefit": "Fast, tool-free wash in small sinks without specialized bottle brushes",
                    "category": "Hygiene"
                },
                {
                    "area": "Affordability & Modularity",
                    "current_issue": "Full bottle thrown away on part wear",
                    "recommendation": "Modular snap-in replaceable gasket and cap assembly",
                    "benefit": "Reduces student long-term ownership and maintenance costs by 70%",
                    "category": "Sustainability"
                }
            ]
        elif "office" in user_lower or "worker" in user_lower:
            exec_summary = f"Redesigned the {product_name} for office professionals with one-touch silent push-to-drink actuation, condensation-free double wall insulation, and a minimalist desk footprint."
            curr_mat = "Thin single-wall Polypropylene / PET plastic"
            rec_mat = "Recycled 18/8 Food-Grade 304 Stainless Steel with condensation-shield ceramic interior"
            identified_problems = [
                {
                    "problem": "Two-Handed Operation Distraction",
                    "severity": "high",
                    "reason": "Unscrewing a traditional cap breaks typing workflow and focus during desk work.",
                    "category": "Functionality"
                },
                {
                    "problem": "Desk Condensation Puddles",
                    "severity": "medium",
                    "reason": "Cold beverages create water rings that damage paperwork and wooden desk surfaces.",
                    "category": "Usability"
                },
                {
                    "problem": "Rapid Thermal Degradation",
                    "severity": "medium",
                    "reason": "Beverages lose optimal temperature within 45 minutes of a typical 8-hour workday.",
                    "category": "Performance"
                },
                {
                    "problem": "Audible Cap Squeaking",
                    "severity": "low",
                    "reason": "Plastic-on-plastic friction causes distracting squeaks in quiet meeting rooms.",
                    "category": "Aesthetics"
                }
            ]
            recommendations = [
                {
                    "area": "Actuation Mechanism",
                    "current_issue": "Two hands required to unscrew cap",
                    "recommendation": "Spring-damped one-touch push-button autoseal valve",
                    "benefit": "Allows effortless single-hand drinking without looking away from computer screens",
                    "category": "Mechanism"
                },
                {
                    "area": "Desk Thermal Barrier",
                    "current_issue": "Sweat rings on desk surfaces",
                    "recommendation": "Double-wall vacuum insulation with non-slip silicone base dampener",
                    "benefit": "Eliminates outer surface sweat and dampens noisy desk placement",
                    "category": "Ergonomics"
                },
                {
                    "area": "Thermal Retention Core",
                    "current_issue": "Beverage loses chilled temperature",
                    "recommendation": "Copper-lined vacuum chamber keeping cold 24h / hot 12h",
                    "benefit": "Consistent beverage temperature throughout extended office workdays",
                    "category": "Material"
                },
                {
                    "area": "Executive Aesthetic",
                    "current_issue": "Fingerprint smudging on glossy plastic",
                    "recommendation": "Matte powder-coated anodized finish with laser-etched subtle branding",
                    "benefit": "Clean, executive visual styling suitable for boardroom meetings",
                    "category": "Aesthetics"
                }
            ]
        elif "fitness" in user_lower or "sport" in user_lower:
            exec_summary = f"Redesigned the {product_name} for active fitness and gym athletes with fast-flow valve geometry, non-slip textured finger facets, and rapid volume intake tracking."
            curr_mat = "Standard rigid semi-gloss Polypropylene"
            rec_mat = "Ultra-durable BPA-Free Tritan with co-molded thermoplastic elastomer (TPE) grip facets"
            identified_problems = [
                {
                    "problem": "Slippery Grip When Sweaty",
                    "severity": "high",
                    "reason": "Smooth cylindrical surface easily slips out of sweaty hands during workout sets.",
                    "category": "Ergonomics"
                },
                {
                    "problem": "Restricted Fluid Flow Rate",
                    "severity": "high",
                    "reason": "Standard straws or small orifices starve breathless athletes of rapid hydration.",
                    "category": "Performance"
                },
                {
                    "problem": "Lack of Hourly Intake Milestones",
                    "severity": "medium",
                    "reason": "Athletes cannot track hourly hydration milestones without visual markers.",
                    "category": "Functionality"
                },
                {
                    "problem": "Gym Floor Impact Fractures",
                    "severity": "medium",
                    "reason": "Rigid plastics crack upon impact with gym barbells or hard rubber surfaces.",
                    "category": "Durability"
                }
            ]
            recommendations = [
                {
                    "area": "Grip Geometry",
                    "current_issue": "Slippery cylindrical body",
                    "recommendation": "Hexagonal contoured body with textured micro-grooved grip panels",
                    "benefit": "Channels sweat away and provides a firm, slip-proof hold during high-motion sets",
                    "category": "Ergonomics"
                },
                {
                    "area": "Hydration Spout",
                    "current_issue": "Slow restricted glugging flow",
                    "recommendation": "Fast-flow vented silicone spout with anti-vacuum air release",
                    "benefit": "Enables instant, effortless high-volume hydration in 3-second workout intervals",
                    "category": "Mechanism"
                },
                {
                    "area": "Intake Tracking",
                    "current_issue": "No visible measurement markers",
                    "recommendation": "Laser-etched dual milliliter (ml) and ounce (oz) milestone markings",
                    "benefit": "Effortless performance hydration monitoring and athletic fluid target tracking",
                    "category": "Functionality"
                },
                {
                    "area": "Impact Shock Armor",
                    "current_issue": "Brittle cracking on gym drops",
                    "recommendation": "Shock-absorbing reinforced TPE bumper base and cap collar",
                    "benefit": "Dissipates drop kinetic energy to prevent cracking on concrete and rubber floors",
                    "category": "Material"
                }
            ]
        elif "travel" in user_lower or "commuter" in user_lower:
            exec_summary = f"Redesigned the {product_name} for daily commuters and travelers featuring universal cupholder geometry, an aircraft cabin pressure-equalizing cap, and an articulating carry handle."
            curr_mat = "Brittle standard PET plastic"
            rec_mat = "Impact-resistant Polypropylene Copolymer with aerospace-grade silicone o-rings"
            identified_problems = [
                {
                    "problem": "Vehicle Cupholder Incompatibility",
                    "severity": "high",
                    "reason": "Bulky bottles do not fit standard automotive, train, or airplane seat cupholders.",
                    "category": "Portability"
                },
                {
                    "problem": "Altitude Pressure Splashing",
                    "severity": "medium",
                    "reason": "Atmospheric pressure shifts in flights cause liquid blowout upon opening.",
                    "category": "Safety"
                },
                {
                    "problem": "Difficult Multi-Item Transit Carry",
                    "severity": "medium",
                    "reason": "Luggage in one hand leaves no comfortable way to carry a bottle during commutes.",
                    "category": "Portability"
                },
                {
                    "problem": "Surface Abrasive Scuffing",
                    "severity": "low",
                    "reason": "Contact with train turnstiles and floors leaves unsightly scratches.",
                    "category": "Durability"
                }
            ]
            recommendations = [
                {
                    "area": "Base Silhouette",
                    "current_issue": "Does not fit standard cupholders",
                    "recommendation": "Tapered base geometry with 72mm diameter universal seat profile",
                    "benefit": "Guarantees snug, rattle-free fit in 98% of car, train, and bicycle bottle cages",
                    "category": "Ergonomics"
                },
                {
                    "area": "Decompression Cap",
                    "current_issue": "Liquid spray during flight cabin pressure shifts",
                    "recommendation": "Two-stage decompression valve in cap assembly",
                    "benefit": "Safely bleeds headspace air pressure before the drinking aperture opens",
                    "category": "Mechanism"
                },
                {
                    "area": "Transit Carry Handle",
                    "current_issue": "Awkward grip alongside carry-on bags",
                    "recommendation": "Fold-flat ergonomic articulating handle integrated flush into cap",
                    "benefit": "Pivots 180 degrees for effortless 2-finger carry or carabiner strap hook",
                    "category": "Portability"
                },
                {
                    "area": "Commuter Armor",
                    "current_issue": "Cosmetic scratching from zippers and floors",
                    "recommendation": "Armored polymer casing with stone-washed textured coat",
                    "benefit": "Prevents abrasive scratching and preserves clean look over years of daily transit",
                    "category": "Material"
                }
            ]
        else:  # Families & Children or Default
            exec_summary = f"Redesigned the {product_name} for families & children focusing on 100% certified BPA-free food contact, rounded child-safe contours, and effortless hygienic sanitation."
            curr_mat = "Conventional plastic with potential phthalate additives"
            rec_mat = "Medical-grade LFGB Platinum Silicone & BPA/BPS-Free Tritan"
            identified_problems = [
                {
                    "problem": "Chemical & Plasticizer Leaching Risk",
                    "severity": "high",
                    "reason": "Warming in dishwashers or sunlight can leach microplastics and endocrine disruptors.",
                    "category": "Safety"
                },
                {
                    "problem": "Sharp Cap Edges & Pinch Hazards",
                    "severity": "high",
                    "reason": "Hard latching mechanisms can pinch children's small fingers or hurt gums.",
                    "category": "Safety"
                },
                {
                    "problem": "Mold Colonies in Un-openable Valves",
                    "severity": "high",
                    "reason": "Complex internal straw mechanisms harbor hidden black mold colonies.",
                    "category": "Hygiene"
                },
                {
                    "problem": "High Drop Frequency & Breakage",
                    "severity": "medium",
                    "reason": "Children frequently drop bottles from high chairs and school desks.",
                    "category": "Durability"
                }
            ]
            recommendations = [
                {
                    "area": "Material Purity",
                    "current_issue": "Plasticizer and BPA leaching risk",
                    "recommendation": "100% pure food-grade Platinum Silicone and certified BPA/BPS/BPF-free Tritan",
                    "benefit": "Eliminates chemical migration for complete health peace of mind",
                    "category": "Material"
                },
                {
                    "area": "Child Ergonomics & Safety",
                    "current_issue": "Pinch points and hard plastics",
                    "recommendation": "Soft-touch rounded silicone bite spout with push-button soft-release hinge",
                    "benefit": "Cushions against sensitive teeth and gums with zero pinch hazards for small hands",
                    "category": "Safety"
                },
                {
                    "area": "Anti-Mold Cleanability",
                    "current_issue": "Inaccessible straw cavities",
                    "recommendation": "Fully detachable 3-piece valve system with zero hidden internal cavities",
                    "benefit": "Allows visual inspection and complete dishwasher sanitizing for mold prevention",
                    "category": "Hygiene"
                },
                {
                    "area": "Drop Protection",
                    "current_issue": "Cracks and leaks on hard floor drops",
                    "recommendation": "Integrated 360-degree rubberized drop-cushion sleeve",
                    "benefit": "Absorbs drop impact energy to prevent cracking fractures and spills",
                    "category": "Durability"
                }
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
        # General Physical Product Categories (Chairs, Helmets, Bags, Packaging, Containers, Phone Stands, etc.)
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
            {
                "problem": "Ergonomic Discomfort & Contact Strain",
                "severity": "high",
                "reason": f"Prolonged interaction causes strain due to rigid non-adaptive contact points for {target_user}.",
                "category": "Ergonomics"
            },
            {
                "problem": "Complex Non-Recyclable Multi-Material Assembly",
                "severity": "high",
                "reason": "Glued multi-material components prevent end-of-life recycling and circular reuse.",
                "category": "Material"
            },
            {
                "problem": "Suboptimal Portability & Dead Weight",
                "severity": "medium",
                "reason": "Excess structural bulk makes daily transit and compact storage cumbersome.",
                "category": "Portability"
            },
            {
                "problem": "Difficult Cleaning & Debris Traps",
                "severity": "medium",
                "reason": "Inaccessible crevices and textured traps collect debris and resist standard maintenance.",
                "category": "Hygiene"
            }
        ]
        
        recommendations = [
            {
                "area": "Ergonomics & Contact",
                "current_issue": "Static rigid frame causes pressure fatigue",
                "recommendation": "Adaptive pressure-distributing geometric mesh with dynamic articulation",
                "benefit": f"Substantially reduces contact fatigue and improves posture for {target_user}",
                "category": "Ergonomics"
            },
            {
                "area": "Joints & Fasteners",
                "current_issue": "Glued multi-material assembly prevents recycling",
                "recommendation": "Design-for-Disassembly (DfD) snap-fit monomaterial joints",
                "benefit": "Enables 100% closed-loop recycling at end of life without toxic solvents",
                "category": "Sustainability"
            },
            {
                "area": "Structural Geometry",
                "current_issue": "Heavy unoptimized solid walls",
                "recommendation": "Generative lattice lightweighting and collapsible interlocking geometry",
                "benefit": "Removes 35% unnecessary material volume while preserving structural load rating",
                "category": "Portability"
            },
            {
                "area": "Surface Hygiene",
                "current_issue": "Dirt traps in unsealed seams",
                "recommendation": "Antimicrobial smooth-radius surfaces with toolless detachable covers",
                "benefit": "Enables simple 30-second wipe-down cleaning and extends product lifespan",
                "category": "Hygiene"
            }
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
            "description": f"Baseline {product_name} ({category}) analyzed for {target_user} with focus on {', '.join(selected_priorities)}.",
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
        "ai_model_used": "Engineering Heuristic Demo Engine",
        "target_user": target_user,
        "selected_priorities": selected_priorities,
        "user_problems": user_problems,
        "image_url": image_url,
        "created_at": datetime.now().isoformat()
    }
