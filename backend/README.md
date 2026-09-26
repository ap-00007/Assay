# Assay - Backend Service

FastAPI-powered Financial Intelligence Copilot API.

## Features
- **Deterministic Financial Engine**: Cash flow calculation, recurring obligations, affordability, and recommendations.
- **Account Aggregator Sandbox**: Mock AA provider & ingestion pipeline.
- **Copilot Query Engine**: LLM explanation wrapper for structured financial data.
- **OCR Ingestion**: Receipt & UPI screenshot endpoints.

## Local Setup

### 1. Create and Activate Virtual Environment
```bash
python3 -m venv .venv
source .venv/bin/activate
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### 4. Run the Dev Server
```bash
uvicorn app.main:app --reload --port 8000
```

- API Docs: `http://localhost:8000/api/v1/docs`
- Health Check: `http://localhost:8000/health`

## Running Tests
```bash
pytest
```
