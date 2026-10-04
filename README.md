<<<<<<< HEAD
# AI Product Redesign Assistant

> **Transform existing physical products into smarter, more sustainable, and user-centric designs with Artificial Intelligence.**

[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688.svg?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/Frontend-React%2019-61DAFB.svg?logo=react&logoColor=black)](https://react.dev)
[![TailwindCSS](https://img.shields.io/badge/Styling-Tailwind%20v4-38B2AC.svg?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Three.js](https://img.shields.io/badge/3D%20Graphics-Three.js-black.svg?logo=three.js&logoColor=white)](https://threejs.org)
[![Python](https://img.shields.io/badge/Python-3.11%2B-3776AB.svg?logo=python&logoColor=white)](https://python.org)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 📌 Table of Contents
1. [Project Overview](#-project-overview)
2. [Problem Statement](#-problem-statement)
3. [The Solution](#-the-solution)
4. [Key Features](#-key-features)
5. [System Architecture](#-system-architecture)
6. [Technology Stack](#-technology-stack)
7. [Project Structure](#-project-structure)
8. [Installation & Setup](#-installation--setup)
   - [Prerequisites](#prerequisites)
   - [Environment Variables](#environment-variables)
   - [Backend Setup](#backend-setup)
   - [Frontend Setup](#frontend-setup)
9. [How to Run Locally](#-how-to-run-locally)
10. [AI Integration & Demo Mode](#-ai-integration--demo-mode)
11. [API Reference](#-api-reference)
12. [Testing](#-testing)
13. [Known Limitations & Roadmap](#-known-limitations--roadmap)
14. [License](#-license)

---

## 💡 Project Overview

**AI Product Redesign Assistant** is an end-to-end web application that accepts an existing physical product (via image upload and user requirements) and performs a deep engineering, ergonomic, and sustainability redesign analysis. 

The application evaluates physical products across multiple target user personas (Students, Office Workers, Fitness Enthusiasts, Travellers, Families) and outputs prioritized redesign recommendations, formal **SCAMPER** ideation frameworks, multi-dimensional design scoring, sustainability lifecycle improvements, before/after comparative matrices, and interactive 3D WebGL visualizations.

---

## 🚨 Problem Statement

Industrial and consumer product design cycles are traditionally slow, costly, and often overlook critical user ergonomics and environmental impacts:
- **Generic Mass Production**: Physical products frequently fail to address the specific ergonomic and functional needs of distinct personas (e.g., student mobility vs. desk-bound office work).
- **Environmental Impact**: Traditional designs rely heavily on virgin, non-biodegradable plastics and non-modular assemblies that complicate recycling.
- **Fragmented Ideation**: Design teams struggle to systematically apply proven creative methodologies (such as SCAMPER) alongside quantifiable metrics and lifecycle assessments in early ideation stages.

---

## ✨ The Solution

The **AI Product Redesign Assistant** bridges early-stage concepting and sustainable industrial engineering:
1. **Multi-Modal Input Analysis**: Ingests product photos alongside user constraints, target demographic profiles, and specific pain points.
2. **AI-Driven Problem Extraction**: Automatically diagnoses mechanical, ergonomic, hygiene, and thermal shortcomings.
3. **Structured Creative Frameworks**: Generates actionable engineering improvements mapped to each phase of the **SCAMPER** model.
4. **Quantified Evaluation**: Calculates holistic design scores across 9 core vectors and delivers material lifecycle recommendations (e.g., transitioning from single-use PET to Tritan / recycled ocean-bound rPET).
5. **Interactive 3D WebGL Visualization**: Renders interactive parametric 3D models with real-time orbit controls, wireframe toggles, and aesthetic material previews.

```
Existing Product  ──►  AI Analysis  ──►  Problem Diagnosis  ──►  Redesign Solutions  ──►  Improved Product
```

---

## 🚀 Key Features

- **Product Intake Engine**:
  - Drag-and-drop image upload supporting JPEG, PNG, and WEBP formats with server-side MIME and size validation (up to 10MB).
  - Target persona selection: *Students, Office Workers, Fitness & Sports, Travellers & Commuters, Families & Children*.
  - Multi-priority selection: *Comfort, Portability, Durability, Sustainability, Affordability, Safety, Appearance, Functionality*.
- **Structured Redesign Analysis**:
  - **Identified Problems**: Tagged with severity ratings (`high`, `medium`, `low`) and technical rationales.
  - **Redesign Recommendations**: Actionable solutions detailing problem statement, engineering mechanism, and direct user benefits.
  - **SCAMPER Section**: Full breakdown across Substitute, Combine, Adapt, Modify, Put to another use, Eliminate, and Reverse/Rearrange.
  - **Multi-Vector Scoring**: Spider/Radar chart and progress bars evaluating Comfort, Portability, Reliability, Hygiene, Performance, Affordability, Safety, Sustainability, Innovation, and Overall Design.
  - **Sustainability Scorecard**: Material lifecycle comparison, carbon footprint reduction strategies, and circular economy recommendations.
  - **Before vs. After Matrix**: Side-by-side comparative table highlighting baseline vs. redesigned features.
- **Interactive 3D WebGL Viewer**:
  - Embedded Three.js viewer with orbit controls, pan/zoom, wireframe mode, and ambient studio lighting.
- **Design Export & History**:
  - Instant JSON redesign specification export.
  - Print-ready engineering summary reports.
  - SQLite session persistence for reviewing previous redesigns.

---

## 🏛 System Architecture

The application follows a clean, decoupled client-server architecture:

```
┌────────────────────────────────────────────────────────┐
│                   React 19 Frontend                    │
│   (Tailwind CSS v4 + Lucide Icons + Three.js WebGL)    │
└───────────────────────────┬────────────────────────────┘
                            │  HTTP / REST JSON
                            ▼
┌────────────────────────────────────────────────────────┐
│                   FastAPI Backend                      │
│   (Pydantic v2 + SQLite Persistence + Async Handlers)  │
└─────────────┬────────────────────────────┬─────────────┘
              │                            │
   [Live Gemini API Key]          [No API Key Provided]
              │                            │
              ▼                            ▼
┌───────────────────────────┐ ┌──────────────────────────┐
│   Google Gemini 1.5 Pro   │ │ Dynamic Heuristic Engine │
│    Multimodal Analysis    │ │  (High-Fidelity Offline) │
└───────────────────────────┘ └──────────────────────────┘
```

---

## 🛠 Technology Stack

### Frontend
- **Framework**: React 19 + Vite 8
- **Styling**: Tailwind CSS v4
- **3D Graphics**: Three.js WebGL
- **Icons**: Lucide React
- **Animations**: Canvas Confetti & CSS3 Transitions

### Backend
- **Framework**: FastAPI (Python 3.11+)
- **Server**: Uvicorn (ASGI)
- **Validation**: Pydantic v2 & Pydantic-Settings
- **Database**: SQLite with thread-safe connection pooling
- **AI Client**: Google Gemini Multimodal REST API (with httpx/requests)
- **Testing**: Pytest & Starlette TestClient

---

## 📁 Project Structure

```
ai-product-redesign-assistant/
├── .env.example                  # Environment configuration template
├── .gitignore                    # Git exclusion rules
├── README.md                     # Comprehensive project documentation
├── backend/                      # Python FastAPI application
│   ├── config.py                 # Pydantic settings & environment management
│   ├── database.py               # SQLite schema & query operations
│   ├── main.py                   # FastAPI app instance, CORS & routing
│   ├── requirements.txt          # Backend dependencies
│   ├── schemas.py                # Pydantic request & response models
│   ├── routers/
│   │   ├── analysis.py           # Product analysis, uploads & history routes
│   │   └── meta.py               # Health checks & metadata endpoints
│   ├── services/
│   │   ├── ai_service.py         # Google Gemini Multimodal integration
│   │   └── analysis_service.py   # Heuristic product analysis engine
│   ├── tests/
│   │   └── test_backend.py       # Automated Pytest suite
│   └── uploads/                  # Secure temporary uploaded image directory
│       └── .gitkeep
├── database/                     # SQLite database storage directory
│   └── .gitkeep
└── frontend/                     # React 19 Vite application
    ├── package.json              # Frontend dependencies and scripts
    ├── vite.config.js            # Vite configuration with Tailwind plugin
    ├── index.html                # Single-page application entry HTML
    ├── public/                   # Static SVG assets & demo media
    └── src/
        ├── App.jsx               # Application routing & state management
        ├── main.jsx              # React DOM entry point
        ├── index.css             # Tailwind styling and design tokens
        └── components/
            ├── AnalysisProgress.jsx  # Multi-stage loading progress
            ├── ComparisonMatrix.jsx  # Before vs. After comparison table
            ├── HistoryPage.jsx       # Past redesigns history drawer
            ├── LandingPage.jsx       # Hero landing page & workflow visualizer
            ├── Navbar.jsx            # Top navigation bar
            ├── ProductInputPage.jsx  # Form intake with image upload
            ├── RedesignResultPage.jsx# Complete redesign dashboard
            ├── ScamperSection.jsx    # SCAMPER analysis card grid
            ├── ScoreRadar.jsx        # Multi-axis spider & bar score charts
            ├── SustainabilityCard.jsx# Material lifecycle analysis
            ├── ThreeDViewer.jsx      # Three.js 3D WebGL model viewer
            └── WorkflowVisual.jsx    # Visual pipeline diagram
```

---

## ⚙️ Installation & Setup

### Prerequisites
- **Python**: Version 3.11 or higher
- **Node.js**: Version 18.0 or higher (Node 20+ recommended)
- **npm**: Version 9.0 or higher

---

### Environment Variables

1. Copy `.env.example` in the project root to `.env`:

```bash
cp .env.example .env
```

2. Configure the variables:

```env
# Optional: Google Gemini API Key
# If omitted, the system seamlessly operates in Heuristic Demo Mode.
GEMINI_API_KEY=your_gemini_api_key_here

# Backend Server Configuration
HOST=0.0.0.0
PORT=8000

# Database Configuration
DATABASE_PATH=database/redesign.db

# Demo Fallback Switch
ENABLE_DEMO_FALLBACK=true

# Allowed CORS Origins (Comma-separated)
CORS_ORIGINS=http://localhost:5173,http://localhost:3000,http://127.0.0.1:5173,http://127.0.0.1:3000
```

---

### Backend Setup

1. Create and activate a Python virtual environment:

```bash
# On Windows (PowerShell):
python -m venv venv
.\venv\Scripts\Activate.ps1

# On Linux / macOS:
python3 -m venv venv
source venv/bin/activate
```

2. Install Python dependencies:

```bash
pip install -r backend/requirements.txt
```

---

### Frontend Setup

1. Navigate to the `frontend` directory:

```bash
cd frontend
```

2. Install Node dependencies:

```bash
npm install
```

---

## 🏃 How to Run Locally

### 1. Start the Backend API Server
From the project root directory (with your virtual environment activated):

```bash
uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload
```
The FastAPI backend will start at `http://127.0.0.1:8000`.  
API Documentation (Swagger UI) is available at `http://127.0.0.1:8000/docs`.

### 2. Start the Frontend Development Server
In a separate terminal window:

```bash
cd frontend
npm run dev
```
The React frontend will be accessible at `http://localhost:5173`.

---

## 🤖 AI Integration & Demo Mode

### Real AI Mode
When a valid `GEMINI_API_KEY` is provided in `.env`:
- The backend forwards the product image (base64 encoded) and contextual requirements to the **Google Gemini Multimodal API**.
- Gemini performs visual feature recognition, evaluates ergonomic weaknesses, and outputs structured redesign recommendations conforming to the backend Pydantic schema.

### Dynamic Demo Mode (Zero-Config)
If no API key is set, or if API quotas are exceeded:
- The system automatically triggers the **Dynamic Heuristic Analysis Engine**.
- The engine synthesizes product-specific recommendations tailored to the selected category (e.g., *Water Bottle, Chair, Helmet, Backpack*) and target user persona (*Student, Fitness, Office Worker, Traveller*).
- An explicit notice banner informs the user that the system is operating in high-fidelity Demo Mode.

---

## 📡 API Reference

### `POST /api/analyze-product`
Performs redesign analysis for an uploaded physical product.

**Request Body (`multipart/form-data` or `application/json`):**
| Field | Type | Description |
| :--- | :--- | :--- |
| `name` | `string` | Product name (e.g., "Plastic Water Bottle") |
| `category` | `string` | Category (e.g., "Water Bottle", "Chair", "Helmet") |
| `target_user` | `string` | Persona (e.g., "Students", "Fitness & Sports") |
| `priorities` | `array[string]` | Selected design goals (e.g., `["Comfort", "Sustainability"]`) |
| `user_problems`| `string` | *(Optional)* User-described pain points |
| `image_url` | `string` | *(Optional)* Uploaded image path or URL |

**Sample Response (`200 OK`):**
```json
{
  "id": "c1f7a08b-9831-419b-b9f0-21d15a99e2f4",
  "product": {
    "name": "Standard Plastic Water Bottle",
    "category": "Water Bottle",
    "target_user": "Students",
    "priorities": ["Sustainability", "Portability", "Affordability"],
    "description": "Single-use PET disposable bottle with standard screw cap."
  },
  "identified_problems": [
    {
      "problem": "Disposable Single-Use PET Material",
      "severity": "high",
      "reason": "High environmental waste and potential microplastic leaching with reuse."
    }
  ],
  "redesign_recommendations": [
    {
      "area": "Material & Body",
      "current_issue": "Flimsy disposable plastic body",
      "recommendation": "Switch to durable BPA-free Eastman Tritan with protective silicone boot",
      "benefit": "Extended product lifespan, drop resistance, and zero microplastic toxicity."
    }
  ],
  "scamper": {
    "substitute": "Replace virgin PET with 100% recycled ocean-bound rPET or shatterproof borosilicate glass.",
    "combine": "Integrate an ergonomic carry loop directly into the lid locking mechanism.",
    "adapt": "Incorporate silicone squeeze-valve technology inspired by athletic hydration flasks.",
    "modify": "Add contoured dual-finger grip indents and tactile volume measurement debossing.",
    "put_to_another_use": "Design modular removable base that doubles as a storage capsule for keys/pills.",
    "eliminate": "Remove separate adhesive paper labels in favor of direct laser-etched branding.",
    "reverse_rearrange": "Invert internal cleaning access with a wide-mouth bottom-detachable base."
  },
  "scores": {
    "comfort": 88,
    "portability": 94,
    "reliability": 90,
    "hygiene": 92,
    "performance": 85,
    "affordability": 82,
    "safety": 95,
    "sustainability": 96,
    "innovation": 89,
    "overall": 90
  },
  "sustainability": {
    "current_material": "Virgin PET Plastic",
    "recommended_material": "100% Post-Consumer Recycled Tritan / rPET",
    "improvements": [
      "80% reduction in carbon footprint",
      "Elimination of single-use disposal lifecycle",
      "Modular disassembly for mono-material recycling"
    ],
    "score": 96
  },
  "redesign_summary": "Transformed from a fragile disposable container into an ergonomic, ultra-durable reusable hydration vessel.",
  "is_demo_mode": false
}
```

### Additional Endpoints
- `POST /api/upload`: Upload and validate product images (returns file path).
- `GET /api/demo-bottle`: Retrieve immediate demonstration analysis for the baseline water bottle.
- `GET /api/history`: Retrieve previous redesign runs saved in SQLite.
- `GET /api/redesign/{id}`: Retrieve a specific redesign session by UUID.
- `GET /api/health`: Health status and backend uptime verification.
- `GET /api/categories`, `GET /api/user-profiles`, `GET /api/priorities`: Metadata lookup.

---

## 🧪 Testing

### Running Backend Unit & Integration Tests
Execute the Pytest test suite from the project root:

```bash
pytest backend/tests/test_backend.py -v
```

### Frontend Code Quality Check
Run the Oxlint linter and production build check:

```bash
cd frontend
npm run lint
npm run build
```

---

## 🔍 Known Limitations & Roadmap

- **Parametric 3D Geometry**: The current Three.js viewer procedurally renders stylized 3D meshes based on product category. Future versions will support dynamic `.gltf` / `.obj` neural mesh reconstruction directly from uploaded photos.
- **CAD Export**: Future roadmap includes exporting redesign dimensions directly to `.STEP` or `.DXF` formats for CAD modeling software.
- **Cost Estimation**: Automated bill of materials (BOM) cost projection based on proposed manufacturing processes.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
=======
# ai-product-redesign-assistant
>>>>>>> f8ab6b58c4f69baedbd3497dc2c4f30148a777d4
