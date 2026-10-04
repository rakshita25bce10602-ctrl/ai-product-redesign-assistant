# AI Product Redesign Assistant

An AI-powered engineering and industrial design assistant that transforms existing physical products into smarter, more ergonomic, and sustainable designs using multi-factor heuristics, circular material selection, and the **SCAMPER** lateral innovation framework.

---

## 🌟 Core Workflow

```
Existing Product  ──►  Backend API  ──►  Problem Identification  ──►  SCAMPER Analysis  ──►  Improved Product (3D & Specs)
```

1. **Existing Product Baseline**: Input specifications, upload photo/sketch (JPG, PNG, WEBP), category, and target user profile constraints.
2. **Backend Analysis (`POST /api/analyze-product`)**: Evaluates ergonomics, load fatigue, thermal characteristics, and material recyclability.
3. **Problem Identification**: Detects failure points, leakage risks, slippage, and single-use waste.
4. **SCAMPER Lateral Redesign**: Systematically applies *Substitute, Combine, Adapt, Modify, Put to another use, Eliminate, and Reverse/Rearrange*.
5. **Improved Product Deliverables**:
   - 3D Interactive WebGL Inspection Canvas (Three.js)
   - 9-Dimension Redesign Score Dashboard (Comfort, Portability, Reliability, Hygiene, Performance, Affordability, Safety, Sustainability, Innovation)
   - Circular Sustainability & Eco-Material Matrix
   - Side-by-Side Existing vs. Redesigned Comparative Benchmarks
   - JSON & Printable Engineering Report Export

---

## 🏗️ Backend Architecture

The backend is built with FastAPI and follows a modular separation of concerns:

- **`backend/config.py`**: Settings, environment variables, directory paths, and file upload limits using Pydantic Settings.
- **`backend/database.py`**: SQLite database operations, table schema management, and query helpers.
- **`backend/schemas.py`**: Pydantic models for request validation, structured responses, scores, SCAMPER, and sustainability metadata.
- **`backend/services/analysis_service.py`**: Domain-knowledge physical product redesign engine generating structured analyses.
- **`backend/routers/analysis.py`**: API route controllers for `POST /api/analyze-product`, `POST /api/upload`, `GET /api/demo-bottle`, `GET /api/history`, and `GET /api/redesign/{id}`.
- **`backend/routers/meta.py`**: System metadata route controllers for `GET /api/health`, `GET /api/categories`, `GET /api/user-profiles`, and `GET /api/priorities`.
- **`backend/main.py`**: FastAPI application entrypoint with lifespan events, CORS middleware, and static file mounting.

---

## 🚀 How to Run the Application

### 1. Prerequisites
- **Node.js** v18+ & **npm**
- **Python** 3.10+

### 2. Backend Setup & Run
```powershell
# From project root:
cd ai-product-redesign-assistant

# Activate Python virtual environment:
# Windows:
.\venv\Scripts\activate
# macOS / Linux:
source venv/bin/activate

# Install dependencies:
pip install -r backend/requirements.txt

# Start FastAPI backend:
python -m uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
```
*API documentation available at: `http://localhost:8000/docs`*

### 3. Frontend Setup & Run
In a second terminal:
```powershell
cd frontend
npm install
npm run dev
```
*Open your browser at: `http://localhost:5173`*

---

## 🧪 Testing

Run backend tests:
```powershell
.\venv\Scripts\python -m pytest backend\tests\test_backend.py -v
```

Run frontend production build test:
```powershell
cd frontend
npm run build
```
