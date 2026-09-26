# Assay

Assay is a mobile-first financial health copilot that turns financial history into clear, explainable actions.

The product goes beyond tracking expenses. It consolidates transactions, income, recurring obligations, debt pressure, savings behaviour, and cash-flow patterns, then helps users understand what is happening and what they can do next.

> The project documentation also refers to the product as **Spendify**. The current Expo app package is named `assay`.

## Product Loop

```text
Financial data
  -> Normalize
  -> Categorize
  -> Financial health
  -> Prediction
  -> Recommendation
  -> Impact simulation
  -> Action
  -> Recalculate
```

Assay is designed to keep four kinds of information distinct:

- **Observed**: directly supported by the user's data.
- **Predicted**: calculated or estimated future outcomes.
- **Recommended**: an action Assay suggests considering.
- **Impact**: the expected change if an assumption is applied.

## What It Includes

### Mobile experience

The Expo Router application currently includes screens and flows for:

- Financial dashboard
- Spending insights and analytics
- Transactions and transaction details
- Receipt or UPI upload flows
- Settings and account preferences
- Financial copilot
- Affordability analysis
- Debt and obligation views
- Smart split flows
- Simulator flows

### Planned financial intelligence

The product architecture defines services for:

- Mock financial-account data for the prototype
- Transaction normalization and categorization
- Financial health metrics
- Cash-flow forecasting
- Recurring-obligation detection
- Recommendations based on observed data
- Recommendation impact simulation
- Natural-language copilot answers grounded in structured calculations
- Receipt and UPI screenshot processing through OCR

The LLM should explain structured financial results; it must not be the source of truth for financial calculations.

## Technology

### Current mobile app

- Expo SDK 57
- React Native 0.86
- TypeScript
- Expo Router
- React Native Reanimated
- React Query
- Axios
- Lucide React Native
- Expo Blur
- DM Sans and Antic Didone fonts

### Target backend architecture

The documented backend architecture uses:

- FastAPI
- PostgreSQL
- SQLAlchemy
- A provider abstraction for financial data
- A mock Account Aggregator provider for the prototype
- A separate LLM provider for copilot explanations

Production Account Aggregator access is intentionally not a prerequisite for the prototype.

## Getting Started

### Prerequisites

- Node.js (v18+) & npm
- Python (v3.10+)
- Expo-compatible development environment
- iOS Simulator, Android emulator, or Expo Go for device testing

### Monorepo Scripts (Root)

```bash
# Start frontend mobile app
npm run dev:frontend

# Start backend FastAPI server
npm run dev:backend

# Platform shortcuts
npm run ios
npm run android
npm run web
```

### Frontend (Expo Mobile App)

```bash
cd frontend
npm install
npm start
```

Expo native modules should be installed or repaired with `npx expo install` so their versions stay compatible with the Expo SDK.

### Backend (FastAPI Service)

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --port 8000
```

- Swagger API Docs: `http://localhost:8000/api/v1/docs`
- Health Check: `http://localhost:8000/health`

## Project Structure

```text
assay/
├── frontend/             # Expo React Native mobile application
│   ├── app/              # Expo Router screens and route layouts
│   ├── components/       # Reusable UI, auth, aa, and feature components
│   ├── constants/        # Theme, color, typography, and spacing tokens
│   ├── hooks/            # Reusable React hooks
│   ├── services/         # API, authentication, and state services
│   ├── types/            # Shared TypeScript domain types
│   ├── utils/            # Currency, date, and parsing helpers
│   ├── assets/           # Fonts, avatars, and image assets
│   └── package.json      # Frontend package configuration
│
├── backend/              # FastAPI Python backend service
│   ├── app/
│   │   ├── main.py       # FastAPI application entrypoint
│   │   ├── core/         # Config, security (JWT), and database setup
│   │   ├── api/v1/       # Versioned API routes (auth, accounts, copilot, etc.)
│   │   ├── models/       # SQLAlchemy database models
│   │   ├── schemas/      # Pydantic data validation schemas
│   │   ├── services/     # Financial health, forecasting, categorization logic
│   │   └── providers/    # Account Aggregator & LLM provider interfaces
│   ├── tests/            # Pytest test suite
│   ├── requirements.txt  # Python package dependencies
│   └── pyproject.toml    # Python project configuration
│
├── docs/                 # Architecture, API specification, and design blueprints
└── package.json          # Root orchestration scripts
```

The main navigation areas are organized under `app/(tabs)`. Detail and focused workflows live in route groups such as `app/copilot`, `app/debt`, `app/simulator`, `app/split`, and `app/transaction`.

## Design Direction

Assay is intended to feel like a quiet, premium financial analysis product rather than a generic expense tracker.

- Use shared theme tokens instead of component-level colour decisions.
- Follow the 8-point spacing system.
- Prefer clarity and evidence over decoration.
- Keep financial values prominent, readable, and on one line.
- Use Antic Didone for editorial headings and DM Sans for the financial interface.
- Provide loading, empty, error, partial-data, and success states for data-driven screens.
- Make analytics lead to an understandable action.

## API Contract

The documented API is versioned under `/api/v1` and covers:

- Authentication
- Connected accounts and synchronization
- Transactions
- Financial health
- Cash-flow analytics
- Obligations
- Recommendations and impact simulation
- Copilot queries
- Receipt and UPI uploads
- Spending and leak analytics

See [docs/Spendify API Spec.md](docs/Spendify%20API%20Spec.md) for the endpoint contract and example payloads.

## Development Principles

- Keep important financial calculations deterministic and backend-owned.
- Preserve provenance for financial facts and confidence where it has a defined meaning.
- Keep external providers behind interfaces.
- Do not expose LLM or API secrets in the mobile app.
- Do not commit `.env` files or sensitive financial data.
- Keep route handlers thin when implementing the backend: validate, authenticate, call services, and return responses.
- Build the smallest architecture that demonstrates data flowing into understanding, prediction, recommendation, and impact.

## Roadmap

### P0

- Mock or sandbox financial data
- Transaction normalization and categorization
- Financial health engine
- Cash-flow projection
- Dashboard
- Grounded natural-language copilot
- Recommendation engine
- Impact simulation
- Confidence and provenance presentation

### P1

- Receipt OCR
- UPI screenshot parser
- Improved recurring-payment detection
- Advanced analytics and charts

### P2

- Smart Split improvements
- Retrieval-augmented generation
- Custom machine-learning models
- Production Account Aggregator integration

The prototype explicitly does not depend on production bank onboarding, direct bank login, automated payments, investment management, full accounting, or complex tax filing.